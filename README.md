# Pimp My Meta ($PMM) - Website

A production-ready website for Pimp My Meta, a trustless token migration protocol on Solana.

## Features

- **Modern Tech Stack**: Next.js 14 (App Router), TypeScript, Tailwind CSS, Framer Motion
- **Wallet Integration**: Solana wallet-adapter for Phantom, Solflare, Backpack, and more
- **4-Step Migration Vault**: Interactive UI for trustless token migrations
- **Meta Tracker**: Live tracking of current and candidate meme metas
- **Trust & Security**: Comprehensive security documentation and audit placeholders
- **Responsive Design**: Mobile-first, dark theme, smooth animations
- **Easter Eggs**: Click the shrimp 5 times for confetti celebration

## Project Structure

```
website/
├── app/                      # Next.js app directory
│   ├── layout.tsx           # Root layout with wallet providers
│   ├── page.tsx             # Homepage
│   ├── vault/               # Migration vault flow
│   ├── meta-tracker/        # Meta tracking page
│   ├── trust/               # Security documentation
│   ├── docs/                # User documentation & FAQ
│   ├── token/               # Token info & how to buy
│   └── community/           # Social links & community
├── components/
│   ├── layout/              # Header, Footer
│   ├── ui/                  # Reusable UI components
│   ├── vault/               # Vault flow components
│   ├── meta/                # Meta tracking components
│   └── home/                # Homepage sections
├── lib/
│   ├── solana/              # Wallet config & vault client (PLACEHOLDER)
│   ├── meta/                # Mock meta data
│   ├── utils.ts             # Utility functions
│   └── constants.ts         # App constants
└── public/                  # Static assets (add images here)
```

## Setup Instructions

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- A Solana wallet (Phantom recommended for testing)

### Installation

1. **Clone or navigate to the project**
   ```bash
   cd website
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Configure environment variables**
   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and update the placeholders:
   - `NEXT_PUBLIC_VAULT_PROGRAM_ID`: Your deployed vault program ID
   - `NEXT_PUBLIC_PMM_MINT`: Your $PMM token mint address
   - Social media URLs
   - RPC endpoint (use your own for production)

4. **Run development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for production**
   ```bash
   npm run build
   npm run start
   ```

## Integration Points for Smart Contracts

The website is designed with clear separation between UI and blockchain logic. When your smart contracts are ready, update these files:

### 1. Vault Client (`lib/solana/vaultClient.ts`)

This file contains **placeholder methods** for all vault operations:

- `initializeVault(walletPubkey)`: Create a new vault for the user
- `depositTokens(walletPubkey, params)`: Deposit old tokens
- `executeSwap(walletPubkey, params)`: Execute the swap
- `claimTokens(walletPubkey, params)`: Claim new tokens
- `getVaultStatus(walletPubkey)`: Get vault state

**Replace the placeholder implementations** with actual Anchor program calls:

```typescript
// Example integration with Anchor
import { Program } from '@coral-xyz/anchor';
import { YourVaultIDL } from './idl/vault';

const program = new Program(YourVaultIDL, programId, provider);

async depositTokens(walletPubkey, params) {
  const tx = await program.methods
    .deposit(new BN(params.amount), params.slippageBps)
    .accounts({
      user: walletPubkey,
      vault: vaultPda,
      // ... other accounts
    })
    .transaction();

  return tx;
}
```

### 2. Meta Tracking (`lib/meta/mockMetas.ts`)

Currently uses static mock data. Replace with:

- **API Integration**: Fetch meta data from your backend
- **On-chain Data**: Query Solana for token prices, volumes
- **Community Voting**: Integrate with your governance system

Update `fetchCurrentMeta()` and `fetchCandidateMetas()` functions.

### 3. Environment Variables

Before deploying to production, update `.env.local`:

```bash
# Replace with actual deployed addresses
NEXT_PUBLIC_VAULT_PROGRAM_ID=YourActualProgramIDHere
NEXT_PUBLIC_PMM_MINT=YourActualMintAddressHere

# Use your own RPC for reliability
NEXT_PUBLIC_SOLANA_RPC=https://your-rpc-provider.com

# Update social links
NEXT_PUBLIC_X_URL=https://twitter.com/yourhandle
# ... etc
```

### 4. Token Balance Fetching

In `components/vault/DepositStep.tsx`, replace the mock balance:

```typescript
// Current (mock):
const mockBalance = 10000;

// Replace with actual SPL token balance fetch:
import { getAccount } from '@solana/spl-token';

const tokenAccount = await getAccount(connection, userTokenAddress);
const balance = Number(tokenAccount.amount) / Math.pow(10, decimals);
```

### 5. Transaction Simulation

In `components/vault/SwapClaimStep.tsx`, the current implementation uses `sleep()` for demo purposes. Replace with actual transaction sending:

```typescript
import { sendTransaction } from '@solana/wallet-adapter-react';

const depositTx = await vaultClient.depositTokens(publicKey, params);
const signature = await sendTransaction(depositTx, connection);
await connection.confirmTransaction(signature, 'confirmed');
```

## Customization

### Design Tokens

Edit colors in `tailwind.config.ts`:

```typescript
colors: {
  primary: "#00f0ff",      // Cyan accent
  secondary: "#ff00e5",    // Magenta accent
  accent: "#7000ff",       // Purple accent
  // ... customize as needed
}
```

### Mock Data

Update meta candidates in `lib/meta/mockMetas.ts`:

```typescript
export const MOCK_METAS: Meta[] = [
  {
    id: 'your-meta-id',
    name: 'Your Meta Name',
    ticker: '$TICKER',
    // ... other properties
  },
];
```

### Content Updates

- **Homepage Copy**: Edit `components/home/Hero.tsx`, `HowItWorks.tsx`, etc.
- **FAQ**: Update `app/docs/page.tsx`
- **Tokenomics**: Update `lib/constants.ts`

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import project to Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

### Manual Deployment

```bash
npm run build
# Deploy the `.next` folder to your hosting provider
```

## Features to Add Before Production

- [ ] Replace placeholder contract addresses with real ones
- [ ] Integrate actual smart contract calls in `vaultClient.ts`
- [ ] Add real-time price feeds for meta tokens
- [ ] Connect to actual backend API for meta tracking
- [ ] Upload actual brand assets (logos, icons) to `/public`
- [ ] Add real audit reports and links
- [ ] Implement actual chart embed (DexScreener/Birdeye)
- [ ] Add analytics (Google Analytics, Plausible, etc.)
- [ ] Add error logging (Sentry, etc.)
- [ ] Security audit for smart contracts
- [ ] Load testing for high traffic

## Security Checklist

- [ ] Never commit private keys or seed phrases
- [ ] Use environment variables for all sensitive data
- [ ] Verify all user inputs (token addresses, amounts)
- [ ] Add rate limiting for API calls
- [ ] Implement CSP headers
- [ ] Enable HTTPS only in production
- [ ] Validate all transactions before signing
- [ ] Add transaction simulation before execution

## Troubleshooting

### Wallet Connection Issues

- Ensure wallet extension is installed and unlocked
- Check that you're on the correct network (mainnet/devnet)
- Clear browser cache and reload

### Build Errors

- Delete `node_modules` and `.next` folders
- Run `npm install` again
- Check Node.js version (18+ required)

### Styling Issues

- Run `npm run dev` to rebuild Tailwind classes
- Check for conflicting CSS classes

## Support & Community

- **X (Twitter)**: [@pimpmymeta](https://twitter.com/pimpmymeta)
- **Telegram**: [t.me/pimpmymeta](https://t.me/pimpmymeta)
- **Discord**: [discord.gg/pimpmymeta](https://discord.gg/pimpmymeta)

## License

This project is for Pimp My Meta. All rights reserved.

---

**Built with** ❤️ **for the Solana meme community**

Surf the meta. Keep the shrimp. 🦐
