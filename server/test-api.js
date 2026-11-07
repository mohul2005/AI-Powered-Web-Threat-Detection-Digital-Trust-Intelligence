import axios from 'axios';

async function testBackend() {
  const baseUrl = 'http://localhost:5000/api';
  console.log('Testing TrustMatrix API at:', baseUrl);

  try {
    // 1. Health
    const health = await axios.get(`${baseUrl}/health`);
    console.log('✓ Health Check:', health.data.status, health.data.service);

    // 2. Scenarios
    const scenarios = await axios.get(`${baseUrl}/scenarios`);
    console.log(`✓ Scenarios Loaded (${scenarios.data.scenarios.length}):`, scenarios.data.scenarios.map(s => s.id));

    // 3. Scan eMudhra Incident Scenario
    const emudhraScan = await axios.post(`${baseUrl}/scan`, {
      scenarioId: 'emudhra-weak-key-incident'
    });
    console.log('✓ eMudhra Scan Result Trust Score:', emudhraScan.data.result.trustScore, 'Threat Level:', emudhraScan.data.result.threatLevel);
    console.log('  Incident Details:', emudhraScan.data.result.certTrust.caTrustIncidentDetails.incidentName);

    // 4. Intel reports
    const reports = await axios.get(`${baseUrl}/intel/reports`);
    console.log(`✓ Community Threat Reports: ${reports.data.count} entries`);

    // 5. STIX 2.1 Export
    const stix = await axios.get(`${baseUrl}/intel/export/stix`);
    console.log(`✓ STIX 2.1 Bundle Exported: Type ${stix.data.type}, Objects count: ${stix.data.objects.length}`);

    console.log('\n🌟 ALL BACKEND ENGINES AND API ENDPOINTS PASS WITH 100% SUCCESS!');
    process.exit(0);
  } catch (err) {
    console.error('API Test Error:', err.message);
    if (err.response) console.error(err.response.data);
    process.exit(1);
  }
}

testBackend();
