// Comprehensive Brand Intelligence & High-Value Target Database
export const TARGET_BRANDS = [
  // Banking & Financial
  { name: 'State Bank of India', domain: 'onlinesbi.sbi', keywords: ['sbi', 'onlinesbi', 'statebankofindia'], category: 'Banking' },
  { name: 'HDFC Bank', domain: 'hdfcbank.com', keywords: ['hdfc', 'hdfcbank', 'netbanking.hdfcbank'], category: 'Banking' },
  { name: 'ICICI Bank', domain: 'icicibank.com', keywords: ['icici', 'icicibank'], category: 'Banking' },
  { name: 'Axis Bank', domain: 'axisbank.com', keywords: ['axis', 'axisbank'], category: 'Banking' },
  { name: 'Punjab National Bank', domain: 'pnbindia.in', keywords: ['pnb', 'pnbindia'], category: 'Banking' },
  { name: 'Bank of Baroda', domain: 'bankofbaroda.in', keywords: ['bankofbaroda', 'bob'], category: 'Banking' },
  { name: 'Chase Bank', domain: 'chase.com', keywords: ['chase', 'chasebank'], category: 'Banking' },
  { name: 'Bank of America', domain: 'bankofamerica.com', keywords: ['bofa', 'bankofamerica'], category: 'Banking' },
  { name: 'Wells Fargo', domain: 'wellsfargo.com', keywords: ['wellsfargo'], category: 'Banking' },
  { name: 'Citibank', domain: 'citi.com', keywords: ['citi', 'citibank'], category: 'Banking' },

  // Payments & Fintech
  { name: 'PayPal', domain: 'paypal.com', keywords: ['paypal', 'paypal-me'], category: 'Fintech' },
  { name: 'Stripe', domain: 'stripe.com', keywords: ['stripe', 'stripe-checkout'], category: 'Fintech' },
  { name: 'Razorpay', domain: 'razorpay.com', keywords: ['razorpay', 'rzp'], category: 'Fintech' },
  { name: 'Paytm', domain: 'paytm.com', keywords: ['paytm', 'paytmbank'], category: 'Fintech' },
  { name: 'PhonePe', domain: 'phonepe.com', keywords: ['phonepe'], category: 'Fintech' },
  { name: 'Google Pay', domain: 'pay.google.com', keywords: ['gpay', 'googlepay'], category: 'Fintech' },
  { name: 'Coinbase', domain: 'coinbase.com', keywords: ['coinbase'], category: 'Crypto' },
  { name: 'Binance', domain: 'binance.com', keywords: ['binance'], category: 'Crypto' },

  // Big Tech & Cloud Identity
  { name: 'Google', domain: 'google.com', keywords: ['google', 'gmail', 'google-drive', 'google-workspace'], category: 'Tech' },
  { name: 'Microsoft', domain: 'microsoft.com', keywords: ['microsoft', 'office365', 'outlook', 'live.com', 'onedrive', 'msn'], category: 'Tech' },
  { name: 'Apple', domain: 'apple.com', keywords: ['apple', 'icloud', 'appleid'], category: 'Tech' },
  { name: 'Amazon', domain: 'amazon.com', keywords: ['amazon', 'aws', 'amazon-pay'], category: 'E-Commerce' },
  { name: 'Netflix', domain: 'netflix.com', keywords: ['netflix', 'netflix-billing'], category: 'Entertainment' },
  { name: 'Meta / Facebook', domain: 'facebook.com', keywords: ['facebook', 'instagram', 'whatsapp', 'meta'], category: 'Social Media' },
  { name: 'LinkedIn', domain: 'linkedin.com', keywords: ['linkedin'], category: 'Recruitment' },
  { name: 'GitHub', domain: 'github.com', keywords: ['github'], category: 'Tech' },

  // Government & Public Services
  { name: 'Income Tax Department (India)', domain: 'incometax.gov.in', keywords: ['incometax', 'incometaxindia', 'efiling'], category: 'Government' },
  { name: 'UIDAI Aadhaar', domain: 'uidai.gov.in', keywords: ['uidai', 'aadhaar', 'myaadhaar'], category: 'Government' },
  { name: 'EPFO (Provident Fund)', domain: 'epfindia.gov.in', keywords: ['epfo', 'epfindia', 'uan'], category: 'Government' },
  { name: 'National Scholarship Portal', domain: 'scholarships.gov.in', keywords: ['scholarships', 'nsp'], category: 'Education' },
  { name: 'Internal Revenue Service (US)', domain: 'irs.gov', keywords: ['irs', 'irs-gov', 'tax-refund'], category: 'Government' },

  // Recruitment & Job Portals
  { name: 'Naukri', domain: 'naukri.com', keywords: ['naukri', 'naukrigulf'], category: 'Recruitment' },
  { name: 'Indeed', domain: 'indeed.com', keywords: ['indeed'], category: 'Recruitment' },
  { name: 'Workday', domain: 'myworkdayjobs.com', keywords: ['workday', 'myworkday'], category: 'Recruitment' }
];

export const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'work', 'click', 'buzz', 'icu', 'loan', 'cam', 'kim', 'fit',
  'gq', 'ml', 'cf', 'tk', 'ga', 'space', 'site', 'pw', 'su', 'vip', 'monster',
  'rest', 'bar', 'surf', 'tokyo', 'quest', 'boats'
]);

export const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'log-in', 'secure', 'verify', 'verification',
  'authenticate', 'account-update', 'kyc-update', 'unblock', 'wallet-connect',
  'password-reset', 'confirm', 'billing-issue', 'refund-claim', 'job-offer',
  'hiring-team', 'hr-portal', 'salary-advance', 'gift-card', 'lottery-win',
  'e-mudhra-cert', 'token-validation', 'sbi-reward', 'netbanking-portal'
];

export const HOMOGLYPH_MAP = {
  'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'ѕ': 's', 'ԁ': 'd',
  'ԛ': 'q', 'ԝ': 'w', 'х': 'x', 'у': 'y', 'і': 'i', 'ј': 'j', 'ӏ': 'l',
  '0': 'o', '1': 'l', '3': 'e', '5': 's', '8': 'b', '@': 'a', '$': 's'
};
