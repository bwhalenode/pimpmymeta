# Pimp My Meta - Project Structure

```
website/
├── app/
│   ├── layout.tsx                 # Root layout with providers
│   ├── page.tsx                   # Homepage
│   ├── vault/
│   │   └── page.tsx              # Migration Vault page
│   ├── meta-tracker/
│   │   └── page.tsx              # Meta Tracker page
│   ├── trust/
│   │   └── page.tsx              # Trust & Security page
│   ├── docs/
│   │   └── page.tsx              # Documentation page
│   ├── token/
│   │   └── page.tsx              # Token page
│   ├── community/
│   │   └── page.tsx              # Community page
│   ├── globals.css               # Global styles
│   └── providers.tsx             # Client-side providers
│
├── components/
│   ├── layout/
│   │   ├── Header.tsx            # Main navigation
│   │   └── Footer.tsx            # Footer with disclaimer
│   ├── ui/
│   │   ├── Button.tsx            # Custom button component
│   │   ├── Card.tsx              # Card component
│   │   ├── Badge.tsx             # Badge component
│   │   └── ProgressStepper.tsx  # Step progress indicator
│   ├── vault/
│   │   ├── VaultFlow.tsx         # Main vault flow component
│   │   ├── ConnectWalletStep.tsx
│   │   ├── SelectTokenStep.tsx
│   │   ├── DepositStep.tsx
│   │   └── SwapClaimStep.tsx
│   ├── meta/
│   │   ├── MetaCard.tsx          # Individual meta card
│   │   ├── CurrentMetaBanner.tsx # Current meta display
│   │   └── CountdownTimer.tsx    # Migration countdown
│   ├── home/
│   │   ├── Hero.tsx              # Hero section
│   │   ├── HowItWorks.tsx        # 4-step explanation
│   │   ├── WhyWins.tsx           # Value proposition
│   │   └── TrustSection.tsx      # Trustless design section
│   ├── WalletButton.tsx          # Wallet connection button
│   └── ShrimpEasterEgg.tsx       # Confetti easter egg
│
├── lib/
│   ├── solana/
│   │   ├── vaultClient.ts        # Placeholder vault contract client
│   │   └── walletConfig.ts       # Wallet adapter configuration
│   ├── meta/
│   │   └── mockMetas.ts          # Mock meta data
│   ├── utils.ts                  # Utility functions
│   └── constants.ts              # App constants
│
├── public/
│   ├── shrimp.svg                # Shrimp mascot (placeholder)
│   └── vault-robot.svg           # Vault robot icon (placeholder)
│
├── .env.example                   # Environment variables template
├── .env.local                     # Local environment (not committed)
├── package.json
├── tsconfig.json
├── tailwind.config.ts
├── next.config.js
├── postcss.config.js
└── README.md                      # Setup instructions
```
