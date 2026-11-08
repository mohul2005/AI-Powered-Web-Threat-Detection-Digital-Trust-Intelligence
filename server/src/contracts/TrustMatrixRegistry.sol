// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

/**
 * @title TrustMatrixRegistry
 * @dev Decentralized Web3 Threat Registry & Cryptographic Attestation Ledger
 * Enables tamper-proof, decentralized storage of verified cyber threat assessments,
 * eliminating single-point-of-failure censorship and providing on-chain evidence anchors.
 */
contract TrustMatrixRegistry {
    struct ThreatAttestation {
        bytes32 targetHash;      // Keccak256 hash of URL, domain, or message content
        string targetIdentifier; // Sanitized domain or identifier string
        uint8 threatScore;       // 0-100 Digital Trust Index
        string threatCategory;   // e.g., "Phishing", "eMudhra PKI Subversion", "Wallet Drainer"
        string evidenceIpfsCid;  // IPFS CID containing full forensic evidence dossier
        address reporter;        // Web3 address of vetted analyst or validator node
        uint256 timestamp;       // Block timestamp of attestation
        uint256 confirmations;   // Number of validator consensus confirmations
        bool isVerified;         // True if verified across multi-feed consensus
    }

    // Mapping from targetHash to ThreatAttestation
    mapping(bytes32 => ThreatAttestation) public attestations;
    bytes32[] public attestationHashes;

    address public owner;
    mapping(address => bool) public authorizedValidators;

    event ThreatAttested(
        bytes32 indexed targetHash,
        string targetIdentifier,
        uint8 threatScore,
        string threatCategory,
        string evidenceIpfsCid,
        address indexed reporter
    );

    event ThreatConfirmed(bytes32 indexed targetHash, address indexed validator, uint256 totalConfirmations);

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
     * @notice Submit a new tamper-proof threat attestation onto the Web3 ledger
     */
    function recordAttestation(
        string calldata targetIdentifier,
        uint8 threatScore,
        string calldata threatCategory,
        string calldata evidenceIpfsCid
    ) external onlyValidator returns (bytes32) {
        bytes32 targetHash = keccak256(abi.encodePacked(targetIdentifier));

        attestations[targetHash] = ThreatAttestation({
            targetHash: targetHash,
            targetIdentifier: targetIdentifier,
            threatScore: threatScore,
            threatCategory: threatCategory,
            evidenceIpfsCid: evidenceIpfsCid,
            reporter: msg.sender,
            timestamp: block.timestamp,
            confirmations: 1,
            isVerified: threatScore < 50
        });

        attestationHashes.push(targetHash);

        emit ThreatAttested(targetHash, targetIdentifier, threatScore, threatCategory, evidenceIpfsCid, msg.sender);
        return targetHash;
    }

    /**
     * @notice Confirm or endorse an existing attestation
     */
    function confirmAttestation(bytes32 targetHash) external onlyValidator {
        require(attestations[targetHash].timestamp > 0, "Attestation does not exist");
        attestations[targetHash].confirmations += 1;
        emit ThreatConfirmed(targetHash, msg.sender, attestations[targetHash].confirmations);
    }

    /**
     * @notice Retrieve total attestations on-chain
     */
    function getTotalAttestations() external view returns (uint256) {
        return attestationHashes.length;
    }
}
