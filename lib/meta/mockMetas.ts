import { MIGRATION_PHASES } from '../constants';

export interface TokenInfo {
  id: string;
  name: string;
  ticker: string;
  description: string;
  marketCap?: string;
  volume24h?: string;
  priceChange24h?: number;
  contractAddress: string;
  emoji?: string;
}

export interface Meta {
  id: string;
  name: string;
  ticker: string;
  pimpedName?: string;
  pimpedTicker?: string;
  description: string;
  status: 'current' | 'candidate' | 'past';
  marketCap?: string;
  volume24h?: string;
  priceChange24h?: number;
  contractAddress?: string;
  emoji?: string;
}

export interface MigrationWindow {
  phase: typeof MIGRATION_PHASES[keyof typeof MIGRATION_PHASES];
  depositsOpenAt?: Date;
  depositsCloseAt?: Date;
  migrationStartsAt?: Date;
  migrationCompletedAt?: Date;
}

export interface VaultState {
  currentToken: TokenInfo;
  nextToken: TokenInfo | null;
  migrationWindow: MigrationWindow;
  totalDeposited: number; // Current token amount deposited across all users
  userCount: number;
}

export interface PastMigration {
  id: string;
  fromToken: TokenInfo;
  toToken: TokenInfo;
  migratedAt: Date;
  totalMigrated: number;
  participantCount: number;
}

// Mock current vault state - Replace with on-chain data
export const MOCK_VAULT_STATE: VaultState = {
  currentToken: {
    id: 'penguin-2026-q1',
    name: 'Pudgy Penguin',
    ticker: '$PENGU',
    description: 'Current trending meta on Solana. Deposit to vault for next migration.',
    marketCap: '$42M',
    volume24h: '$2.1M',
    priceChange24h: 15.6,
    contractAddress: 'PENGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    emoji: '🐧',
  },
  nextToken: {
    id: 'frog-meta-next',
    name: 'Pepe Frog',
    ticker: '$FROG',
    description: 'Next migration target. Rising meta with strong community.',
    marketCap: '$8M',
    volume24h: '$420K',
    priceChange24h: 8.2,
    contractAddress: 'FROGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    emoji: '🐸',
  },
  migrationWindow: {
    phase: MIGRATION_PHASES.DEPOSITS_OPEN,
    depositsOpenAt: new Date(Date.now() - 3600000), // Started 1 hour ago
    depositsCloseAt: new Date(Date.now() + 3600000), // Closes in 1 hour
    migrationStartsAt: new Date(Date.now() + 7200000), // Starts in 2 hours
  },
  totalDeposited: 1247532.45,
  userCount: 89,
};

// Mock past migrations - Replace with on-chain history
export const MOCK_PAST_MIGRATIONS: PastMigration[] = [
  {
    id: 'migration-001',
    fromToken: {
      id: 'dog-meta-2025',
      name: 'Dog With Hat',
      ticker: '$WIF',
      description: 'Previous meta from Q4 2025.',
      marketCap: '$120M',
      volume24h: '$5.2M',
      priceChange24h: -3.2,
      contractAddress: 'DOGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      emoji: '🐕',
    },
    toToken: {
      id: 'penguin-2026-q1',
      name: 'Pudgy Penguin',
      ticker: '$PENGU',
      description: 'Current meta.',
      contractAddress: 'PENGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
      emoji: '🐧',
    },
    migratedAt: new Date('2026-01-15T00:00:00Z'),
    totalMigrated: 2840921.12,
    participantCount: 156,
  },
];

// Getters for vault state
export function getCurrentToken(): TokenInfo {
  return MOCK_VAULT_STATE.currentToken;
}

export function getNextToken(): TokenInfo | null {
  return MOCK_VAULT_STATE.nextToken;
}

export function getMigrationWindow(): MigrationWindow {
  return MOCK_VAULT_STATE.migrationWindow;
}

export function getVaultState(): VaultState {
  return MOCK_VAULT_STATE;
}

export function getPastMigrations(): PastMigration[] {
  return MOCK_PAST_MIGRATIONS;
}

// Placeholder for future API/on-chain integration
export async function fetchVaultState(): Promise<VaultState> {
  // TODO: Replace with actual on-chain data fetch
  // const program = new Program(VaultIDL, programId, provider);
  // const vaultAccount = await program.account.vaultState.fetch(vaultPda);
  // return parseVaultAccount(vaultAccount);
  return MOCK_VAULT_STATE;
}

export async function fetchPastMigrations(): Promise<PastMigration[]> {
  // TODO: Replace with actual API call or on-chain query
  // const response = await fetch('/api/migrations/history');
  // return response.json();
  return MOCK_PAST_MIGRATIONS;
}

// Helper to check if deposits are allowed
export function areDepositsAllowed(phase: typeof MIGRATION_PHASES[keyof typeof MIGRATION_PHASES]): boolean {
  return phase === MIGRATION_PHASES.DEPOSITS_OPEN;
}

// Helper to check if withdrawals are allowed
export function areWithdrawalsAllowed(phase: typeof MIGRATION_PHASES[keyof typeof MIGRATION_PHASES]): boolean {
  return phase !== MIGRATION_PHASES.MIGRATING;
}

// Helper to format migration phase for display
export function getMigrationPhaseLabel(phase: typeof MIGRATION_PHASES[keyof typeof MIGRATION_PHASES]): string {
  const labels: Record<string, string> = {
    [MIGRATION_PHASES.DEPOSITS_OPEN]: 'Deposits Open',
    [MIGRATION_PHASES.DEPOSITS_CLOSED]: 'Deposits Closed - Waiting for Migration',
    [MIGRATION_PHASES.MIGRATING]: 'Migration In Progress',
    [MIGRATION_PHASES.COMPLETED]: 'Migration Complete - Claim Available',
  };
  return labels[phase] || 'Unknown';
}

// Mock metas data for meta tracker
export const MOCK_METAS: Meta[] = [
  {
    id: 'penguin-2026-q1',
    name: 'Pudgy Penguin',
    ticker: '$PENGU',
    pimpedName: 'Pudgy Penguin',
    pimpedTicker: '$PENGU',
    description: 'Current trending meta on Solana. Deposit to vault for next migration.',
    status: 'current',
    marketCap: '$42M',
    volume24h: '$2.1M',
    priceChange24h: 15.6,
    contractAddress: 'PENGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    emoji: '🐧',
  },
  {
    id: 'frog-meta-next',
    name: 'Pepe Frog',
    ticker: '$FROG',
    pimpedName: 'Pepe Frog',
    pimpedTicker: '$FROG',
    description: 'Next migration target. Rising meta with strong community.',
    status: 'candidate',
    marketCap: '$8M',
    volume24h: '$420K',
    priceChange24h: 8.2,
    contractAddress: 'FROGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    emoji: '🐸',
  },
  {
    id: 'dog-meta-2025',
    name: 'Dog With Hat',
    ticker: '$WIF',
    pimpedName: 'Dog With Hat',
    pimpedTicker: '$WIF',
    description: 'Previous meta from Q4 2025.',
    status: 'past',
    marketCap: '$120M',
    volume24h: '$5.2M',
    priceChange24h: -3.2,
    contractAddress: 'DOGxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    emoji: '🐕',
  },
];

// Get current meta
export function getCurrentMeta(): Meta | null {
  return MOCK_METAS.find((meta) => meta.status === 'current') || null;
}

// Get candidate metas
export function getCandidateMetas(): Meta[] {
  return MOCK_METAS.filter((meta) => meta.status === 'candidate');
}

// Get past metas
export function getPastMetas(): Meta[] {
  return MOCK_METAS.filter((meta) => meta.status === 'past');
}
