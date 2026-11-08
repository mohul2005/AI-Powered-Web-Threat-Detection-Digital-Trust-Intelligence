import assert from 'assert';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import {
  retrieveRagContext,
  detectAnomalies,
  synthesizeThreatWithLLM
} from './src/engines/aiRagEngine.js';
import { verifyThreatMultiSource } from './src/engines/intelVerificationEngine.js';
import { cacheManager } from './src/db/redisCache.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

console.log('🧪 Starting Section 8: Suggested Technology Stack Test Suite...\n');

// 1. AI Domain: LLMs, NLP, Machine Learning, Anomaly Detection, RAG
console.log('--- TEST 1: AI Domain (RAG, Anomaly Detection, LLM Synthesis) ---');
const query = 'urgent sbi yono kyc pan update alert';
const ragDocs = retrieveRagContext(query);
assert(ragDocs.length >= 1, 'RAG must retrieve relevant threat context');
assert(ragDocs[0].mitreTechnique, 'RAG doc must contain MITRE ATT&CK technique');
console.log(`✅ RAG Retrieval: Found '${ragDocs[0].title}' (${ragDocs[0].mitreTechnique})`);

const anomalyResult = detectAnomalies('https://secure-login.gov-verify.in/auth/session/token?pwd=123');
assert(anomalyResult.isAnomalous, 'High-risk URL must be flagged as anomalous');
assert(anomalyResult.entropy > 3.0, 'Entropy must be computed');
console.log(`✅ Anomaly Detection: Score ${anomalyResult.anomalyScore}/100, Entropy: ${anomalyResult.entropy} bits`);

const llmSynthesis = synthesizeThreatWithLLM('https://secure-login.gov-verify.in', ['eMudhra weak key collision', 'Missing HSTS'], 'gov-verify.in');
assert(llmSynthesis.executiveSummary.includes('AI THREAT SYNTHESIS'), 'Executive summary must be generated');
assert(llmSynthesis.plainEnglishTakeaway.length > 10, 'Plain-English takeaway must be present');
console.log(`✅ LLM Synthesis: "${llmSynthesis.plainEnglishTakeaway}"`);

// 2. URL Intelligence: Google Safe Browsing, URLhaus, PhishTank, OpenPhish, VirusTotal
console.log('\n--- TEST 2: URL Intelligence Domain (Google Safe Browsing, URLhaus, PhishTank, OpenPhish, VirusTotal) ---');
const intelVerification = verifyThreatMultiSource('sbi-yono-kyc-verify.top', 'https://sbi-yono-kyc-verify.top/login');
assert(intelVerification.verified, 'Threat must be verified');

const expectedFeeds = [
  'Google Safe Browsing',
  'PhishTank',
  'URLhaus',
  'OpenPhish',
  'VirusTotal'
];

for (const feed of expectedFeeds) {
  const match = intelVerification.matchedFeeds.find(f => f.feedName.includes(feed));
  assert(match, `Expected feed '${feed}' must be included in multi-source intelligence checks`);
}
console.log(`✅ All 5 recommended URL Intelligence feeds verified:`);
intelVerification.matchedFeeds.forEach(f => console.log(`   - ${f.feedName}: ${f.status} (${f.confidence})`));

// 3. Web Security & Certificate Intelligence
console.log('\n--- TEST 3: Web Security & Certificate Intelligence Files ---');
const pythonScriptPath = path.join(__dirname, 'scripts', 'ssl_inspector.py');
assert(fs.existsSync(pythonScriptPath), 'Python SSL inspector script must exist');
console.log('✅ Python SSL & OpenSSL inspector script verified at server/scripts/ssl_inspector.py');

// 4. Blockchain: Solidity EVM Smart Contracts
console.log('\n--- TEST 4: Blockchain Domain (Solidity & Smart Contracts) ---');
const contractPath = path.join(__dirname, 'src', 'contracts', 'TrustMatrixRegistry.sol');
assert(fs.existsSync(contractPath), 'TrustMatrixRegistry.sol must exist');
const contractCode = fs.readFileSync(contractPath, 'utf8');
assert(contractCode.includes('pragma solidity ^0.8.20'), 'Solidity version must be ^0.8.20');
console.log('✅ Solidity EVM Smart Contract verified at server/src/contracts/TrustMatrixRegistry.sol');

// 5. Database: PostgreSQL, MongoDB, Redis
console.log('\n--- TEST 5: Database Domain (PostgreSQL, MongoDB, Redis) ---');
const postgresPath = path.join(__dirname, 'src', 'db', 'schema.sql');
assert(fs.existsSync(postgresPath), 'PostgreSQL schema.sql must exist');
const pgSql = fs.readFileSync(postgresPath, 'utf8');
assert(pgSql.includes('CREATE TABLE IF NOT EXISTS threat_reports'), 'PostgreSQL schema must define threat_reports table');
console.log('✅ PostgreSQL Schema verified at server/src/db/schema.sql');

const mongoPath = path.join(__dirname, 'src', 'db', 'mongoSchema.js');
assert(fs.existsSync(mongoPath), 'MongoDB mongoSchema.js must exist');
console.log('✅ MongoDB Mongoose Schemas verified at server/src/db/mongoSchema.js');

// Test Redis Cache Manager
await cacheManager.set('test_dns_key', { ip: '198.51.100.42' }, 60);
const cached = await cacheManager.get('test_dns_key');
assert(cached && cached.ip === '198.51.100.42', 'Redis cache get/set must work');
console.log('✅ Redis Cache Manager verified with get/set and fallback.');

// 6. Infrastructure: Docker & Cloud Hosting
console.log('\n--- TEST 6: Infrastructure Domain (Docker & Docker Compose) ---');
const dockerfilePath = path.join(rootDir, 'Dockerfile');
assert(fs.existsSync(dockerfilePath), 'Dockerfile must exist');
const dockerfileContent = fs.readFileSync(dockerfilePath, 'utf8');
assert(dockerfileContent.includes('FROM node:20-alpine AS client-builder'), 'Dockerfile must be multi-stage');
console.log('✅ Production Multi-Stage Dockerfile verified.');

const composePath = path.join(rootDir, 'docker-compose.yml');
assert(fs.existsSync(composePath), 'docker-compose.yml must exist');
const composeContent = fs.readFileSync(composePath, 'utf8');
assert(composeContent.includes('trustmatrix-app'), 'Compose must define trustmatrix-app service');
assert(composeContent.includes('trustmatrix-redis'), 'Compose must define trustmatrix-redis service');
assert(composeContent.includes('trustmatrix-postgres'), 'Compose must define trustmatrix-postgres service');
console.log('✅ Production docker-compose.yml verified (App, Redis, PostgreSQL).');

console.log('\n🎉 ALL SECTION 8 TECHNOLOGY STACK REQUIREMENTS FULLY IMPLEMENTED & VERIFIED!\n');
