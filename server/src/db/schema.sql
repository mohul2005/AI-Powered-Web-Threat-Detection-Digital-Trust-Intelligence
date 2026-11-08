-- TrustMatrix AI Nexus - Enterprise PostgreSQL Schema
-- Implements Section 8: Database (PostgreSQL relational architecture)

CREATE TABLE IF NOT EXISTS threat_reports (
    id VARCHAR(64) PRIMARY KEY,
    target_url TEXT NOT NULL,
    sanitized_domain VARCHAR(255) NOT NULL,
    threat_category VARCHAR(100) NOT NULL,
    target_entity VARCHAR(255) NOT NULL,
    reporter_handle VARCHAR(100) NOT NULL,
    summary TEXT,
    evidence_reference TEXT,
    trust_score SMALLINT NOT NULL CHECK (trust_score >= 0 AND trust_score <= 100),
    threat_level VARCHAR(32) NOT NULL,
    validation_status VARCHAR(64) NOT NULL DEFAULT 'PENDING_REVIEW',
    upvotes INT DEFAULT 0,
    downvotes INT DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS onchain_attestations (
    id SERIAL PRIMARY KEY,
    report_id VARCHAR(64) REFERENCES threat_reports(id) ON DELETE CASCADE,
    target_hash VARCHAR(66) NOT NULL,
    commitment_hash VARCHAR(66) NOT NULL,
    evidence_ipfs_cid VARCHAR(128) NOT NULL,
    contract_address VARCHAR(42) NOT NULL,
    reporter_address VARCHAR(42) NOT NULL,
    tx_hash VARCHAR(66) NOT NULL,
    block_number BIGINT NOT NULL,
    revision_count INT DEFAULT 0,
    dispute_count INT DEFAULT 0,
    attested_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS campaign_clusters (
    cluster_id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    threat_category VARCHAR(100) NOT NULL,
    shared_asn VARCHAR(64),
    shared_ip INET,
    active_threat_level VARCHAR(32) DEFAULT 'CRITICAL',
    first_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    last_seen TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS threat_indicators (
    id SERIAL PRIMARY KEY,
    report_id VARCHAR(64) REFERENCES threat_reports(id) ON DELETE CASCADE,
    cluster_id VARCHAR(64) REFERENCES campaign_clusters(cluster_id) ON DELETE SET NULL,
    indicator_type VARCHAR(64) NOT NULL, -- 'domain', 'ip', 'asn', 'upi_handle', 'crypto_drainer', 'ct_anomaly'
    indicator_value TEXT NOT NULL,
    source VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- High-performance B-tree & GIN Indexes
CREATE INDEX IF NOT EXISTS idx_threat_reports_domain ON threat_reports(sanitized_domain);
CREATE INDEX IF NOT EXISTS idx_threat_reports_status ON threat_reports(validation_status);
CREATE INDEX IF NOT EXISTS idx_threat_reports_created ON threat_reports(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_attestations_target_hash ON onchain_attestations(target_hash);
CREATE INDEX IF NOT EXISTS idx_attestations_commitment ON onchain_attestations(commitment_hash);
CREATE INDEX IF NOT EXISTS idx_indicators_value ON threat_indicators(indicator_value);
