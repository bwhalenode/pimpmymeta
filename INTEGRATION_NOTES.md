# Integration Notes for Smart Contract Development

This document provides detailed guidance on integrating the Pimp My Meta website with your Solana smart contracts.

## Overview

The website is built with **clear separation** between UI and blockchain logic. All blockchain interactions are isolated in specific files that can be easily replaced with real implementations.

## Key Integration Files

### 1. Vault Client (`lib/solana/vaultClient.ts`)

**Purpose**: Handles all interactions with the migration vault smart contract.

**Current State**: Contains placeholder methods that log to console and return mock data.

**What to Replace**:

```typescript
// BEFORE (Placeholder)
async depositTokens(walletPubkey: PublicKey, params: DepositParams): Promise<Transaction> {
  console.log('[PLACEHOLDER] Depositing tokens:', params);
  const transaction = new Transaction();
  return transaction;
}

// AFTER (Real Implementation)
async depositTokens(walletPubkey: PublicKey, params: DepositParams): Promise<Transaction> {
  const program = new Program(VaultIDL, this.programId, provider);

  const [vaultPda] = await PublicKey.findProgramAddress(
    [Buffer.from('vault'), walletPubkey.toBuffer()],
    this.programId
  );

  const userOldTokenAccount = await getAssociatedTokenAddress(
    new PublicKey(params.oldTokenMint),
    walletPubkey
  );

  const instruction = await program.methods
    .deposit(new BN(params.amount), params.slippageBps)
    .accounts({
      user: walletPubkey,
      vault: vaultPda,
      userTokenAccount: userOldTokenAccount,
      vaultTokenAccount: vaultTokenPda,
      tokenProgram: TOKEN_PROGRAM_ID,
    })
    .instruction();

  const transaction = new Transaction().add(instruction);
  return transaction;
}
```

**Methods to Implement**:

- `initializeVault()`: Create new vault account for user
- `depositTokens()`: Transfer tokens to vault
- `executeSwap()`: Trigger swap via Jupiter/Raydium integration
- `claimTokens()`: Withdraw new tokens after swap
- `getVaultStatus()`: Fetch vault account data

**Required Packages**:
```bash
npm install @coral-xyz/anchor @solana/spl-token
```

### 2. Meta Data (`lib/meta/mockMetas.ts`)

**Purpose**: Provides data for meta tracking, candidate selection, and migration targets.

**Current State**: Returns hardcoded mock data.

**What to Replace**:

```typescript
// BEFORE (Mock)
export async function fetchCurrentMeta(): Promise<Meta | undefined> {
  return getCurrentMeta();
}

// AFTER (API Integration)
export async function fetchCurrentMeta(): Promise<Meta | undefined> {
  const response = await fetch('/api/meta/current');
  if (!response.ok) throw new Error('Failed to fetch current meta');
  return response.json();
}

// OR (On-chain Integration)
export async function fetchCurrentMeta(): Promise<Meta | undefined> {
  const program = new Program(MetaTrackerIDL, programId, provider);
  const metaAccount = await program.account.currentMeta.fetch(metaPda);

  return {
    id: metaAccount.id.toString(),
    name: metaAccount.name,
    ticker: metaAccount.ticker,
    status: 'current',
    contractAddress: metaAccount.mint.toString(),
    // ... map other fields
  };
}
```

**Data Sources to Integrate**:
- Price feeds: CoinGecko, Jupiter, Birdeye
- Volume data: Solana RPC, DexScreener API
- Community votes: Your governance contract

### 3. Token Balance Fetching

**File**: `components/vault/DepositStep.tsx`

**Line**: ~20

**Current State**: Uses hardcoded `mockBalance = 10000`

**What to Replace**:

```typescript
// BEFORE
const mockBalance = 10000;

// AFTER
import { getAssociatedTokenAddress, getAccount } from '@solana/spl-token';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const { connection } = useConnection();
const { publicKey } = useWallet();

const [balance, setBalance] = useState(0);

useEffect(() => {
  async function fetchBalance() {
    if (!publicKey) return;

    try {
      const tokenAddress = await getAssociatedTokenAddress(
        new PublicKey(selectedToken),
        publicKey
      );

      const tokenAccount = await getAccount(connection, tokenAddress);
      const decimals = 9; // Get from token mint
      setBalance(Number(tokenAccount.amount) / Math.pow(10, decimals));
    } catch (error) {
      console.error('Error fetching balance:', error);
      setBalance(0);
    }
  }

  fetchBalance();
}, [publicKey, selectedToken, connection]);
```

### 4. Transaction Execution

**File**: `components/vault/SwapClaimStep.tsx`

**Lines**: ~40-70

**Current State**: Simulates transactions with `sleep()` delays

**What to Replace**:

```typescript
// BEFORE
setStatus('depositing');
await sleep(2000);
console.log('[DEMO] Depositing tokens...');

// AFTER
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

const { connection } = useConnection();
const { publicKey, sendTransaction } = useWallet();

try {
  // Step 1: Deposit
  setStatus('depositing');
  const depositTx = await vaultClient.depositTokens(publicKey, {
    oldTokenMint: selectedToken,
    amount,
    slippageBps: slippage,
  });

  const depositSig = await sendTransaction(depositTx, connection);
  await connection.confirmTransaction(depositSig, 'confirmed');

  // Step 2: Swap
  setStatus('swapping');
  const swapTx = await vaultClient.executeSwap(publicKey, {
    vaultPubkey: vaultPda.toString(),
  });

  const swapSig = await sendTransaction(swapTx, connection);
  await connection.confirmTransaction(swapSig, 'confirmed');

  // Step 3: Claim
  setStatus('claiming');
  const claimTx = await vaultClient.claimTokens(publicKey, {
    vaultPubkey: vaultPda.toString(),
  });

  const claimSig = await sendTransaction(claimTx, connection);
  await connection.confirmTransaction(claimSig, 'confirmed');

  setTxSignature(claimSig);
  setStatus('completed');
} catch (error) {
  console.error('Transaction failed:', error);
  setStatus('error');
  setError(error.message);
}
```

## Environment Variables

Update `.env.local` with real values before production:

```bash
# Replace these placeholder addresses
NEXT_PUBLIC_VAULT_PROGRAM_ID=YourDeployedProgramID
NEXT_PUBLIC_PMM_MINT=YourPMMTokenMint

# Use dedicated RPC for production (Helius, QuickNode, etc.)
NEXT_PUBLIC_SOLANA_RPC=https://your-dedicated-rpc.com

# Network
NEXT_PUBLIC_SOLANA_NETWORK=mainnet-beta
```

## Integration Checklist

### Phase 1: Smart Contract Development
- [ ] Develop and test vault smart contract on devnet
- [ ] Implement Jupiter/Raydium swap integration
- [ ] Add governance for meta selection
- [ ] Security audit the contract
- [ ] Deploy to mainnet

### Phase 2: Website Integration
- [ ] Update `vaultClient.ts` with real Anchor calls
- [ ] Implement token balance fetching
- [ ] Replace transaction simulation with real execution
- [ ] Add error handling for failed transactions
- [ ] Test with small amounts on devnet first

### Phase 3: Data Integration
- [ ] Set up backend API for meta tracking (optional)
- [ ] Integrate price feeds (Jupiter, Birdeye)
- [ ] Connect governance voting to UI
- [ ] Add real-time updates via WebSocket (optional)

### Phase 4: Production Prep
- [ ] Replace all placeholder addresses in `.env.local`
- [ ] Upload real brand assets (logos, icons)
- [ ] Add actual audit reports and links
- [ ] Implement chart embed (DexScreener)
- [ ] Add analytics and error logging
- [ ] Load test the application

## Testing Recommendations

### Devnet Testing
1. Deploy contracts to devnet
2. Update `.env.local` with devnet addresses and RPC
3. Test full migration flow end-to-end
4. Verify transactions on Solana Explorer

### Mainnet Testing
1. Test with **small amounts** first
2. Verify all contract addresses
3. Monitor for any errors or edge cases
4. Have a rollback plan

## Common Integration Patterns

### Error Handling

```typescript
try {
  const tx = await vaultClient.depositTokens(publicKey, params);
  const sig = await sendTransaction(tx, connection);
  await connection.confirmTransaction(sig, 'confirmed');
} catch (error) {
  if (error.message.includes('insufficient funds')) {
    setError('Insufficient SOL for transaction fees');
  } else if (error.message.includes('slippage')) {
    setError('Slippage exceeded. Try increasing tolerance.');
  } else {
    setError('Transaction failed. Please try again.');
  }
}
```

### Transaction Confirmation

```typescript
// Use confirmed commitment for faster UX
await connection.confirmTransaction(signature, 'confirmed');

// For critical operations, use finalized
await connection.confirmTransaction(signature, 'finalized');
```

### Account Validation

```typescript
// Validate token accounts exist before transactions
try {
  const account = await getAccount(connection, tokenAddress);
} catch (error) {
  // Account doesn't exist, create it first
  const createIx = createAssociatedTokenAccountInstruction(
    publicKey,
    tokenAddress,
    publicKey,
    mint
  );
  transaction.add(createIx);
}
```

## Support

If you encounter issues during integration:

1. Check the Solana Explorer for transaction details
2. Review Anchor error codes in your IDL
3. Test on devnet extensively before mainnet
4. Reach out to the development team

## Next Steps

1. **Start with vault client**: Implement `getVaultStatus()` first to test connection
2. **Test read operations**: Verify you can fetch account data
3. **Implement writes**: Start with `initializeVault()`, then deposit/swap/claim
4. **Add error handling**: Cover all edge cases
5. **Security review**: Audit all transaction construction
6. **Deploy and test**: Devnet → Mainnet beta → Full launch

---

**Remember**: Always verify contract addresses, test thoroughly, and never skip security audits.
