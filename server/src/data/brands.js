// Comprehensive Brand Intelligence & High-Value Target Database
// Covers Banking, Government, Universities, Parcel Delivery, Social Media, Customer Support & Web3

export const TARGET_BRANDS = [
  // 1. Banking & Financial
  { name: 'State Bank of India', domain: 'onlinesbi.sbi', keywords: ['sbi', 'onlinesbi', 'statebankofindia'], category: 'Banking' },
  { name: 'HDFC Bank', domain: 'hdfcbank.com', keywords: ['hdfc', 'hdfcbank', 'netbanking.hdfcbank'], category: 'Banking' },
  { name: 'ICICI Bank', domain: 'icicibank.com', keywords: ['icici', 'icicibank'], category: 'Banking' },
  { name: 'Axis Bank', domain: 'axisbank.com', keywords: ['axis', 'axisbank'], category: 'Banking' },
  { name: 'Chase Bank', domain: 'chase.com', keywords: ['chase', 'chasebank'], category: 'Banking' },
  { name: 'Bank of America', domain: 'bankofamerica.com', keywords: ['bofa', 'bankofamerica'], category: 'Banking' },
  { name: 'PayPal', domain: 'paypal.com', keywords: ['paypal', 'paypal-me'], category: 'Fintech' },
  { name: 'Razorpay', domain: 'razorpay.com', keywords: ['razorpay', 'rzp'], category: 'Fintech' },
  { name: 'Stripe', domain: 'stripe.com', keywords: ['stripe', 'stripe-checkout'], category: 'Fintech' },
  { name: 'Paytm', domain: 'paytm.com', keywords: ['paytm', 'paytmbank'], category: 'Fintech' },

  // 2. Parcel Delivery & Logistics (Mass Smishing Targets)
  { name: 'India Post', domain: 'indiapost.gov.in', keywords: ['indiapost', 'dak-seva', 'speedpost'], category: 'Logistics' },
  { name: 'FedEx', domain: 'fedex.com', keywords: ['fedex', 'fedex-tracking', 'fedex-delivery'], category: 'Logistics' },
  { name: 'DHL Express', domain: 'dhl.com', keywords: ['dhl', 'dhl-express', 'dhl-parcel'], category: 'Logistics' },
  { name: 'Blue Dart', domain: 'bluedart.com', keywords: ['bluedart'], category: 'Logistics' },
  { name: 'USPS', domain: 'usps.com', keywords: ['usps', 'usps-tracking'], category: 'Logistics' },

  // 3. Government & Public Tax/Transport Services
  { name: 'Income Tax Department (India)', domain: 'incometax.gov.in', keywords: ['incometax', 'incometaxindia', 'efiling'], category: 'Government' },
  { name: 'Parivahan e-Challan (Traffic Fines)', domain: 'echallan.parivahan.gov.in', keywords: ['echallan', 'parivahan', 'vahan', 'sarathi'], category: 'Government' },
  { name: 'UIDAI Aadhaar', domain: 'uidai.gov.in', keywords: ['uidai', 'aadhaar', 'myaadhaar'], category: 'Government' },
  { name: 'Passport Seva', domain: 'passportindia.gov.in', keywords: ['passportindia', 'passportseva'], category: 'Government' },
  { name: 'EPFO (Provident Fund)', domain: 'epfindia.gov.in', keywords: ['epfo', 'epfindia', 'uan'], category: 'Government' },

  // 4. University Admission & Examination Portals
  { name: 'National Testing Agency (NEET/JEE/CUET)', domain: 'nta.ac.in', keywords: ['nta', 'jeemain', 'neet-nta', 'cuet-samarth'], category: 'Education' },
  { name: 'Delhi University (DU)', domain: 'du.ac.in', keywords: ['du.ac.in', 'delhiuniversity', 'uod'], category: 'Education' },
  { name: 'IIT JEE Advanced', domain: 'jeeadv.ac.in', keywords: ['jeeadv', 'iit-admissions'], category: 'Education' },
  { name: 'Oxford University', domain: 'ox.ac.uk', keywords: ['oxford', 'ox.ac.uk'], category: 'Education' },
  { name: 'Harvard University', domain: 'harvard.edu', keywords: ['harvard', 'harvard.edu'], category: 'Education' },

  // 5. Social Media & Account Recovery
  { name: 'Instagram', domain: 'instagram.com', keywords: ['instagram', 'ig-verify', 'ig-badge', 'instagram-support'], category: 'Social Media' },
  { name: 'Facebook / Meta', domain: 'facebook.com', keywords: ['facebook', 'meta-support', 'fb-verify', 'account-disabled'], category: 'Social Media' },
  { name: 'WhatsApp', domain: 'whatsapp.com', keywords: ['whatsapp', 'wa.me', 'whatsapp-web'], category: 'Social Media' },
  { name: 'X / Twitter', domain: 'x.com', keywords: ['twitter', 'x.com', 'twitter-verify'], category: 'Social Media' },
  { name: 'LinkedIn', domain: 'linkedin.com', keywords: ['linkedin', 'linkedin-careers'], category: 'Social Media' },

  // 6. Big Tech & Customer Support
  { name: 'Google Account Recovery', domain: 'accounts.google.com', keywords: ['google', 'gmail', 'google-recovery'], category: 'Tech' },
  { name: 'Microsoft 365 Support', domain: 'microsoft.com', keywords: ['microsoft', 'office365', 'outlook'], category: 'Tech' },
  { name: 'Apple ID Security', domain: 'apple.com', keywords: ['apple', 'appleid', 'icloud-find'], category: 'Tech' },
  { name: 'Netflix Account Billing', domain: 'netflix.com', keywords: ['netflix', 'netflix-billing'], category: 'Entertainment' },

  // 7. Web3 & Crypto
  { name: 'Uniswap Protocol', domain: 'uniswap.org', keywords: ['uniswap'], category: 'Crypto' },
  { name: 'MetaMask Support', domain: 'metamask.io', keywords: ['metamask', 'metamask-support'], category: 'Crypto' }
];

export const SUSPICIOUS_TLDS = new Set([
  'xyz', 'top', 'work', 'click', 'buzz', 'icu', 'loan', 'cam', 'kim', 'fit',
  'gq', 'ml', 'cf', 'tk', 'ga', 'space', 'site', 'pw', 'su', 'vip', 'monster',
  'rest', 'bar', 'surf', 'tokyo', 'quest', 'boats', 'cc', 'link', 'live'
]);

export const REDIRECT_PARAM_KEYS = [
  'redirect', 'url', 'next', 'return_to', 'dest', 'destination', 'forward',
  'forward_to', 'goto', 'target', 'link', 'out', 'view', 'r'
];

export const SUSPICIOUS_KEYWORDS = [
  'login', 'signin', 'sign-in', 'log-in', 'secure', 'verify', 'verification',
  'authenticate', 'account-update', 'kyc-update', 'unblock', 'wallet-connect',
  'password-reset', 'confirm', 'billing-issue', 'refund-claim', 'job-offer',
  'admission-fee', 'hall-ticket', 'admit-card', 'customs-duty', 'package-delivery',
  'redelivery-fee', 'traffic-challan', 'speedpost-tracking', 'copyright-infringement',
  'account-disabled', 'recover-account', 'gift-card', 'lottery-win'
];

export const HOMOGLYPH_MAP = {
  'а': 'a', 'с': 'c', 'е': 'e', 'о': 'o', 'р': 'p', 'ѕ': 's', 'ԁ': 'd',
  'ԛ': 'q', 'ԝ': 'w', 'х': 'x', 'у': 'y', 'і': 'i', 'ј': 'j', 'ӏ': 'l',
  '0': 'o', '1': 'l', '3': 'e', '5': 's', '8': 'b', '@': 'a', '$': 's'
};
