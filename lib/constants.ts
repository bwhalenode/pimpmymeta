export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Pimp My Meta',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pimpmymeta.vercel.app',
  description: 'Surf the meta. Deposit once. When we migrate, you move with it. Fast rotations, clean UX, transparent rules.',
  tagline: 'Surf the meta. Rotate fast. Stay ahead.',
};

export const SOLANA_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta',
  vaultProgramId: process.env.NEXT_PUBLIC_VAULT_PROGRAM_ID || '11111111111111111111111111111111',
  currentTokenMint: process.env.NEXT_PUBLIC_CURRENT_TOKEN_MINT || '11111111111111111111111111111111',
  nextTokenMint: process.env.NEXT_PUBLIC_NEXT_TOKEN_MINT || '11111111111111111111111111111111',
  pmmMint: process.env.NEXT_PUBLIC_PMM_MINT || 'PMM1111111111111111111111111111111111111111',
  feeBps: parseInt(process.env.NEXT_PUBLIC_FEE_BPS || '0'), // Fee in basis points (0 = 0%, 100 = 1%)
};

export const SOCIAL_LINKS = {
  x: process.env.NEXT_PUBLIC_X_URL || 'https://x.com/shrimpypoos',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/pimpmyshrimp',
  dexscreener: process.env.NEXT_PUBLIC_DEXSCREENER_URL || 'https://dexscreener.com/solana/',
};

export const EXTERNAL_LINKS = {
  raydium: process.env.NEXT_PUBLIC_RAYDIUM_URL || 'https://raydium.io/swap/',
  jupiter: process.env.NEXT_PUBLIC_JUPITER_URL || 'https://jup.ag/swap/',
};

export const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/vault', label: 'Vault' },
  { href: '/current-token', label: 'Current Token' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/trust', label: 'Trust & Security' },
  { href: '/docs', label: 'Docs' },
  { href: '/community', label: 'Community' },
];

export const VAULT_STEPS = [
  { id: 1, title: 'Enter Wallet (Optional)', description: 'Enter your Solana wallet address' },
  { id: 2, title: 'Deposit (Demo)', description: 'Demo deposit of current token' },
  { id: 3, title: 'Manage Position (Demo)', description: 'View & withdraw position demo' },
  { id: 4, title: 'Migration Status (Demo)', description: 'Track migration & claim demo' },
];

export const TRUST_FEATURES = [
  {
    title: 'Non-Custodial Vault',
    description: 'Devs cannot withdraw your funds. Smart contracts enforce the rules.',
    icon: 'shield',
  },
  {
    title: 'Public & Audited',
    description: 'All code is open-source. Security audits available for review.',
    icon: 'eye',
  },
  {
    title: 'Automated Swaps',
    description: 'Migrations execute on-chain via Raydium/Jupiter when triggered.',
    icon: 'zap',
  },
  {
    title: 'Withdraw Anytime',
    description: 'Withdraw your position anytime, except during active migration.',
    icon: 'lock',
  },
];

export const MIGRATION_PHASES = {
  DEPOSITS_OPEN: 'deposits_open',
  DEPOSITS_CLOSED: 'deposits_closed',
  MIGRATING: 'migrating',
  COMPLETED: 'completed',
} as const;

export const MIGRATION_PHASE_LABELS = {
  [MIGRATION_PHASES.DEPOSITS_OPEN]: 'Deposits Open',
  [MIGRATION_PHASES.DEPOSITS_CLOSED]: 'Deposits Closed - Waiting',
  [MIGRATION_PHASES.MIGRATING]: 'Migration In Progress',
  [MIGRATION_PHASES.COMPLETED]: 'Migration Complete',
};

export const TOKENOMICS = {
  ticker: 'PMM',
  name: 'Pimp My Meta',
  description: 'A trustless migration vault for rotating into the current meta token.',
  totalSupply: '1,000,000,000',
  decimals: 9,
};
