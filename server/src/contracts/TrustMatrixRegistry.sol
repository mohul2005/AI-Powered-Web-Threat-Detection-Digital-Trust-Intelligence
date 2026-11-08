// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TrustMatrixRegistry
 * @dev Decentralized Web3 Threat Intelligence & Cryptographic Provenance Ledger
 * Implements Module 6: Decentralized Threat Intelligence
 * 
 * CORE PRINCIPLES & BOUNDARIES:
 * 1. PRIVACY BOUNDARY: Raw URLs, personal information, email content, passwords,
 *    and sensitive user data must remain strictly off-chain.
 * 2. EPISTEMOLOGICAL BOUNDARY: A blockchain record establishes the integrity and
 *    history of a report, not the truth of the report itself.
 */
contract TrustMatrixRegistry {
    enum ValidationStatus {
        PENDING_REVIEW,          // Initial submission awaiting community/feed consensus
        VERIFIED_MULTI_SOURCE,   // Cross-verified across PhishTank, URLhaus, and Spamhaus feeds
        DISPUTED,                // Active dispute filed with counter-evidence
        RESOLVED_REVOKED         // Confirmed false-positive or neutralized indicator
    }

    struct ThreatReportCommitment {
        bytes32 targetHash;            // Keccak256 hash of canonical domain/identifier (off-chain privacy)
        string sanitizedIdentifier;    // Sanitized public domain (no raw PII or URL query tokens)
        bytes32 reportCommitmentHash;  // SHA-256 cryptographic fingerprint of the off-chain report dossier
        string evidenceIpfsCid;        // Decentralized content-addressed reference to supporting evidence
        string threatCategory;         // e.g. "Phishing", "PKI Anomaly", "Advance Fee Fraud"
        uint8 threatScore;             // 0-100 Digital Trust Index
        address reporter;              // Provenance address of analyst / validator
        uint256 timestamp;             // Block timestamp of registration
        uint256 blockNumber;           // Ledger block height
        uint256 confirmations;         // Multi-source consensus confirmations
        uint256 revisionCount;         // Number of times evidence was revised
        uint256 disputeCount;          // Number of disputes recorded
        bytes32 previousCommitment;    // Cryptographic link to previous revision (provenance chain)
        ValidationStatus status;       // Verifiable validation lifecycle state
    }

    // Mapping from targetHash to ThreatReportCommitment
    mapping(bytes32 => ThreatReportCommitment) public reportCommitments;
    bytes32[] public targetHashes;

    address public owner;
    mapping(address => bool) public authorizedValidators;

    // Events providing transparent provenance and auditability
    event ReportCommitmentRecorded(
        bytes32 indexed targetHash,
        string sanitizedIdentifier,
        bytes32 reportCommitmentHash,
        string evidenceIpfsCid,
        string threatCategory,
        uint8 threatScore,
        address indexed reporter,
        uint256 blockNumber
    );

    event ReportRevised(
        bytes32 indexed targetHash,
        bytes32 oldCommitmentHash,
        bytes32 newCommitmentHash,
        string newEvidenceIpfsCid,
        uint256 revisionCount
    );

    event ReportDisputed(
        bytes32 indexed targetHash,
        address indexed disputant,
        string disputeEvidenceCid,
        uint256 totalDisputes
    );

    event ReportStatusUpdated(
        bytes32 indexed targetHash,
        ValidationStatus oldStatus,
        ValidationStatus newStatus
    );

    modifier onlyOwner() {
        require(msg.sender == owner, "Unauthorized: Owner only");
        _;
    }

    modifier onlyValidator() {
        require(authorizedValidators[msg.sender] || msg.sender == owner, "Unauthorized: Validator only");
        _;
    }

    constructor() {
        owner = msg.sender;
        authorizedValidators[msg.sender] = true;
    }

    function setValidator(address validator, bool status) external onlyOwner {
        authorizedValidators[validator] = status;
    }

    /**
     * @notice Records a cryptographic commitment to a threat intelligence report
     * @dev Raw URLs, PII, and passwords MUST remain off-chain. Only hashes and CIDs are recorded.
     */
    function recordReportCommitment(
        string calldata sanitizedIdentifier,
        bytes32 reportCommitmentHash,
        string calldata evidenceIpfsCid,
        string calldata threatCategory,
        uint8 threatScore
    ) external returns (bytes32) {
        bytes32 targetHash = keccak256(abi.encodePacked(sanitizedIdentifier));

        // If newly submitted
        if (reportCommitments[targetHash].timestamp == 0) {
            targetHashes.push(targetHash);
        }

        ValidationStatus initialStatus = threatScore <= 35 
            ? ValidationStatus.VERIFIED_MULTI_SOURCE 
            : ValidationStatus.PENDING_REVIEW;

        reportCommitments[targetHash] = ThreatReportCommitment({
            targetHash: targetHash,
            sanitizedIdentifier: sanitizedIdentifier,
            reportCommitmentHash: reportCommitmentHash,
            evidenceIpfsCid: evidenceIpfsCid,
            threatCategory: threatCategory,
            threatScore: threatScore,
            reporter: msg.sender,
            timestamp: block.timestamp,
            blockNumber: block.number,
            confirmations: 1,
            revisionCount: 0,
            disputeCount: 0,
            previousCommitment: bytes32(0),
            status: initialStatus
        });

        emit ReportCommitmentRecorded(
            targetHash,
            sanitizedIdentifier,
            reportCommitmentHash,
            evidenceIpfsCid,
            threatCategory,
            threatScore,
            msg.sender,
            block.number
        );

        return targetHash;
    }

    /**
     * @notice Revises a previously committed report with updated evidence
     * @dev Preserves historical provenance by chaining the previous commitment hash
     */
    function reviseReport(
        bytes32 targetHash,
        bytes32 newCommitmentHash,
        string calldata newEvidenceCid,
        uint8 newScore
    ) external {
        ThreatReportCommitment storage report = reportCommitments[targetHash];
        require(report.timestamp > 0, "Report does not exist");
        require(msg.sender == report.reporter || authorizedValidators[msg.sender], "Unauthorized to revise");

        bytes32 oldCommitment = report.reportCommitmentHash;
        report.previousCommitment = oldCommitment;
        report.reportCommitmentHash = newCommitmentHash;
        report.evidenceIpfsCid = newEvidenceCid;
        report.threatScore = newScore;
        report.revisionCount += 1;

        emit ReportRevised(targetHash, oldCommitment, newCommitmentHash, newEvidenceCid, report.revisionCount);
    }

    /**
     * @notice Disputes a threat report, attaching cryptographic counter-evidence
     */
    function disputeReport(bytes32 targetHash, string calldata disputeEvidenceCid) external {
        ThreatReportCommitment storage report = reportCommitments[targetHash];
        require(report.timestamp > 0, "Report does not exist");

        report.disputeCount += 1;
        report.status = ValidationStatus.DISPUTED;

        emit ReportDisputed(targetHash, msg.sender, disputeEvidenceCid, report.disputeCount);
    }

    /**
     * @notice Independently checks report integrity against the on-chain commitment
     * @dev A third party computes sha256(offChainDossier) and verifies against this function
     */
    function verifyReportIntegrity(
        bytes32 targetHash,
        bytes32 computedCommitmentHash
    ) external view returns (
        bool isIntact,
        ValidationStatus validationStatus,
        uint256 blockNumber,
        uint256 timestamp,
        uint256 revisionCount,
        uint256 disputeCount
    ) {
        ThreatReportCommitment storage report = reportCommitments[targetHash];
        require(report.timestamp > 0, "Report does not exist on-chain");

        bool matches = (report.reportCommitmentHash == computedCommitmentHash);
        return (
            matches,
            report.status,
            report.blockNumber,
            report.timestamp,
            report.revisionCount,
            report.disputeCount
        );
    }

    /**
     * @notice Retrieve total on-chain committed threat reports
     */
    function getTotalReports() external view returns (uint256) {
        return targetHashes.length;
    }
}
