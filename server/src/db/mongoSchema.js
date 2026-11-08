/**
 * TrustMatrix AI Nexus - MongoDB Mongoose Document Schemas
 * Implements Section 8: Database (MongoDB NoSQL Document Store for STIX 2.1 Bundles)
 */

export const ThreatReportSchemaDefinition = {
  reportId: { type: String, required: true, unique: true, index: true },
  targetUrl: { type: String, required: true },
  domain: { type: String, required: true, index: true },
  threatCategory: { type: String, required: true },
  targetEntity: { type: String, required: true },
  reporterHandle: { type: String, required: true },
  summary: { type: String, default: '' },
  trustScore: { type: Number, min: 0, max: 100, required: true },
  threatLevel: { type: String, enum: ['SAFE', 'LOW', 'MODERATE', 'HIGH', 'CRITICAL'], required: true },
  status: { 
    type: String, 
    enum: ['PENDING_REVIEW', 'VERIFIED_MULTI_SOURCE', 'DISPUTED', 'RESOLVED_REVOKED'],
    default: 'PENDING_REVIEW',
    index: true 
  },
  tags: [{ type: String }],
  stixBundle: { type: Object, default: {} },
  onChainAttestation: {
    targetHash: { type: String, required: true },
    reportCommitmentHash: { type: String, required: true },
    evidenceIpfsCid: { type: String, required: true },
    contractAddress: { type: String },
    txHash: { type: String },
    blockNumber: { type: Number },
    reporterAddress: { type: String },
    verifiableHistory: [{
      event: String,
      blockNumber: Number,
      timestamp: Date,
      commitmentHash: String,
      actor: String
    }]
  },
  votes: {
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 }
  },
  createdAt: { type: Date, default: Date.now, index: true },
  updatedAt: { type: Date, default: Date.now }
};

export const ThreatCampaignSchemaDefinition = {
  campaignId: { type: String, required: true, unique: true, index: true },
  name: { type: String, required: true },
  targetBrand: { type: String, required: true },
  threatCategory: { type: String, required: true },
  sharedAsn: { type: String },
  sharedIps: [{ type: String }],
  reusedPaymentHandles: [{ type: String }],
  knownDomains: [{ type: String }],
  connectedReports: [{ type: String }],
  modusOperandi: { type: String },
  mitreTechniques: [{ type: String }],
  firstDetected: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
};
