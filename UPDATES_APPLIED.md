# Updates Applied - Single Token Model

## Summary of Changes

The website has been updated to reflect the corrected mechanics:
- **PMM is NOT a token** - it's a brand/protocol
- **Single active token model** - vault only supports the current trending token
- **Deposit window mechanics** - users can deposit/withdraw, then migration locks funds temporarily
- **Realistic trust messaging** - clear about what is and isn't protected

---

## 🔧 Core Files Updated

### 1. **[lib/constants.ts](lib/constants.ts)**
- ✅ Removed `pmmMint`, added `currentTokenMint` and `nextTokenMint`
- ✅ Added `feeBps` configuration (0% default)
- ✅ Updated navigation: "Token" → "Current Token", added "How It Works"
- ✅ Updated vault steps to match new flow (4 steps: Connect → Deposit → Manage → Migration Status)
- ✅ Updated TRUST_FEATURES to be realistic (no overpromising)
- ✅ Removed TOKENOMICS (PMM is not a token)
- ✅ Added MIGRATION_PHASES constants

### 2. **[lib/meta/mockMetas.ts](lib/meta/mockMetas.ts)** - COMPLETELY REWRITTEN
- ✅ New interface: `TokenInfo` (single token data)
- ✅ New interface: `VaultState` (current + next token, migration window)
- ✅ New interface: `MigrationWindow` (deposit phases, timers)
- ✅ New interface: `PastMigration` (migration history)
- ✅ Mock data now shows:
  - ONE current token (Penguin)
  - ONE next token (Frog)
  - Migration phase: deposits_open
  - Deposit window countdown
  - Total deposited stats
- ✅ Helper functions: `areDepositsAllowed()`, `areWithdrawalsAllowed()`, `getMigrationPhaseLabel()`

### 3. **Environment Variables**
Updated both [.env.example](.env.example) and [.env.local](.env.local):
- ✅ Removed: `NEXT_PUBLIC_PMM_MINT`
- ✅ Added: `NEXT_PUBLIC_CURRENT_TOKEN_MINT`
- ✅ Added: `NEXT_PUBLIC_NEXT_TOKEN_MINT`
- ✅ Added: `NEXT_PUBLIC_FEE_BPS=0`

---

## 🎨 Vault Flow - NEW Components

### 4. **[components/vault/DepositCurrentTokenStep.tsx](components/vault/DepositCurrentTokenStep.tsx)** - NEW
Replaces the old "SelectTokenStep" and "DepositStep"
- ✅ Deposits ONLY the current token (no selection needed)
- ✅ Shows migration phase status (Deposits Open/Closed)
- ✅ Countdown timer to deposit window close
- ✅ Fee display (configurable via `NEXT_PUBLIC_FEE_BPS`)
- ✅ Clear warnings: "Does NOT protect against market volatility, slippage, new token rugs, MEV"
- ✅ Explains flow: deposit → withdraw anytime → locked during migration → claim new

### 5. **[components/vault/ManagePositionStep.tsx](components/vault/ManagePositionStep.tsx)** - NEW
Replaces complex swap/claim flow with position management
- ✅ Shows deposited amount
- ✅ Withdraw button (disabled during MIGRATING phase)
- ✅ View migration status button
- ✅ Clear lock/unlock status indicator

### 6. **[components/vault/MigrationStatusStep.tsx](components/vault/MigrationStatusStep.tsx)** - NEW
Final step showing migration progress and claim
- ✅ Migration phase progress (Deposits Closed → Swapping → Ready to Claim)
- ✅ Token conversion display (current → next)
- ✅ Fee deduction shown (if > 0%)
- ✅ Vault stats (total deposited, participant count)
- ✅ Claim button when migration completes
- ✅ Transaction signature display after claim

### 7. **[components/vault/VaultFlow.tsx](components/vault/VaultFlow.tsx)** - UPDATED
- ✅ Removed: SelectTokenStep, DepositStep, SwapClaimStep
- ✅ Added: DepositCurrentTokenStep, ManagePositionStep, MigrationStatusStep
- ✅ Simplified state: only tracks `depositedAmount` (no token selection, no slippage)

### 8. **[app/vault/page.tsx](app/vault/page.tsx)** - UPDATED
- ✅ Updated description: "Deposit the current trending token. Automated migration when the next meta emerges."
- ✅ Updated security notice: "What the Vault Protects"
- ✅ Added realistic disclaimer: "Does NOT protect against market volatility, slippage, new token rugs, or MEV"

---

## 📄 Pages to Create/Update (Next Steps)

### ⚠️ Still TODO - Navigation Changes

The navigation has been updated in constants, but pages need to be created/renamed:

1. **`/current-token` page** - NEEDS CREATION
   - Replace the old `/token` page that implied $PMM token
   - Show current active token info
   - Show next token candidate
   - Link to vault for deposits
   - How to buy current token (Raydium/Jupiter)

2. **`/how-it-works` page** - NEEDS CREATION
   - Explain the vault mechanics in detail
   - Deposit window flow
   - Migration phases
   - Withdraw rules
   - What's protected vs not protected

3. **Update `/trust` page** - Needs realistic copy
   - Remove "impossible to rug" language
   - Add "What this protects / doesn't protect" section
   - Be honest about market risks, new token risks, MEV, slippage

4. **Update Homepage** - Match new model
   - Remove $PMM token language
   - Focus on "current token" deposits
   - Update CurrentMetaBanner to show current + next token

5. **Update or remove `/meta-tracker`**
   - Either remove it (since we only have 1 current + 1 next)
   - Or repurpose as "Current Token + Next Meta Watchlist"
   - Show past migrations history

---

## 🔌 Integration Points (Unchanged)

The vault client placeholder ([lib/solana/vaultClient.ts](lib/solana/vaultClient.ts)) still needs updating, but the method signatures should be adjusted to match the new flow:

**Current placeholders (still valid, just need implementation):**
- `initializeVault()` - Create vault position
- `depositTokens()` - Deposit current token
- `withdrawTokens()` - NEW: Withdraw before migration (add this method)
- `executeSwap()` - Triggered by team (not user)
- `claimTokens()` - Claim new tokens after migration
- `getVaultStatus()` - Get user's position + migration phase

**NEW method needed:**
```typescript
async withdrawTokens(walletPubkey: PublicKey): Promise<Transaction> {
  // Allow withdrawal if phase !== MIGRATING
  // TODO: Implement withdrawal transaction
}
```

---

## ✅ What's Working Now

1. ✅ Constants reflect single-token model
2. ✅ Mock data shows current + next token with migration window
3. ✅ Vault flow uses new 4-step process
4. ✅ Deposit step only allows current token
5. ✅ Manage position step shows withdraw option (disabled during migration)
6. ✅ Migration status step shows progress and claim flow
7. ✅ Fee system ready (0% now, configurable later)
8. ✅ Realistic security messaging in vault page

---

## 🚧 What Still Needs Updating

1. ⚠️ Create `/app/current-token/page.tsx` (replaces old token page)
2. ⚠️ Create `/app/how-it-works/page.tsx`
3. ⚠️ Update `/app/trust/page.tsx` with realistic copy
4. ⚠️ Update homepage components to remove $PMM token language
5. ⚠️ Update CurrentMetaBanner to show single current + next token
6. ⚠️ Update/remove meta-tracker page
7. ⚠️ Fix TypeScript errors in vault page (JSX interface issue)
8. ⚠️ Update all references to "PMM token" across the site

---

## 🎯 Key Messaging Changes

### OLD (Incorrect):
- "PMM is a utility token"
- "Migrate from any old token to new meta"
- "Zero risk, fully trustless"
- "$PMM holders get benefits"

### NEW (Correct):
- "PMM is a brand that chases metas"
- "Deposit the current token, get migrated to next meta"
- "Vault reduces custody risk, but doesn't eliminate market/new token risks"
- "Withdraw anytime before migration starts"
- "0% fees for now (configurable later)"

---

## 📝 Quick Reference

**Current Token:** Pudgy Penguin ($PENGU)
**Next Token:** Pepe Frog ($FROG)
**Migration Phase:** Deposits Open (countdown: 1 hour remaining)
**Fee:** 0% (configurable via env var)
**Vault Status:** Non-custodial, withdrawable until migration starts

---

**Next Action:** Continue creating the missing pages and updating existing ones to match this new model.
