export const SITE_CONFIG = {
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Pimp My Meta',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://pimpmymeta.com',
  description: 'Surf the meta. Keep the shrimp. Automated migrations for trending tokens on Solana.',
  tagline: 'Surf the meta. Keep the shrimp.',
};

export const SOLANA_CONFIG = {
  rpcUrl: process.env.NEXT_PUBLIC_SOLANA_RPC || 'https://api.mainnet-beta.solana.com',
  network: process.env.NEXT_PUBLIC_SOLANA_NETWORK || 'mainnet-beta',
  vaultProgramId: process.env.NEXT_PUBLIC_VAULT_PROGRAM_ID || '11111111111111111111111111111111',
  currentTokenMint: process.env.NEXT_PUBLIC_CURRENT_TOKEN_MINT || '11111111111111111111111111111111',
  nextTokenMint: process.env.NEXT_PUBLIC_NEXT_TOKEN_MINT || '11111111111111111111111111111111',
  feeBps: parseInt(process.env.NEXT_PUBLIC_FEE_BPS || '0'), // Fee in basis points (0 = 0%, 100 = 1%)
};

export const SOCIAL_LINKS = {
  x: process.env.NEXT_PUBLIC_X_URL || 'https://twitter.com/pimpmymeta',
  telegram: process.env.NEXT_PUBLIC_TELEGRAM_URL || 'https://t.me/pimpmymeta',
  discord: process.env.NEXT_PUBLIC_DISCORD_URL || 'https://discord.gg/pimpmymeta',
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
  { id: 1, title: 'Connect Wallet', description: 'Connect your Solana wallet' },
  { id: 2, title: 'Deposit', description: 'Deposit current token' },
  { id: 3, title: 'Manage Position', description: 'View & withdraw position' },
  { id: 4, title: 'Migration Status', description: 'Track migration & claim' },
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
