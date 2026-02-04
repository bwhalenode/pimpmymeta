'use client';

import { useState } from 'react';
import { Metadata } from 'next';
import { ChevronDown, Book, AlertTriangle, HelpCircle } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardContent } from '@/components/ui/Card';
import { motion, AnimatePresence } from 'framer-motion';

const faqs = [
  {
    question: 'What is Pimp My Meta?',
    answer: 'Pimp My Meta is a trustless token migration protocol on Solana. We help you automatically migrate from old meme tokens to new trending metas without manual trading. The shrimp (our original mascot) stays, but we chase the latest meta trends.',
  },
  {
    question: 'How do migrations work?',
    answer: 'You deposit your old tokens into our smart contract vault. The contract automatically sells your old tokens via Raydium/Jupiter, buys the new meta token, and lets you claim the new tokens. Everything happens on-chain in a single transaction flow.',
  },
  {
    question: 'Is my money safe?',
    answer: 'Yes. The migration vault is non-custodial, meaning the team cannot access your funds. Smart contracts execute everything automatically. The code is open source and audited. We have no upgrade authority, so even we can\'t change the contract after deployment.',
  },
  {
    question: 'What fees do you charge?',
    answer: 'The platform charges a small fee (exact percentage TBD) on successful migrations to sustain development. Additionally, you pay standard Solana network fees (~0.000005 SOL per transaction) and DEX swap fees (varies by liquidity).',
  },
  {
    question: 'Can I reverse a migration?',
    answer: 'No. Once a migration is executed and tokens are swapped, it cannot be reversed. Always double-check the token addresses and amounts before confirming.',
  },
  {
    question: 'What happens if the swap fails?',
    answer: 'If the swap fails (e.g., insufficient liquidity, network issues), the transaction reverts and your original tokens remain in the vault. You can then withdraw them or retry the migration.',
  },
  {
    question: 'How do you choose which metas to support?',
    answer: 'The community votes on meta candidates based on market momentum, social sentiment, and on-chain metrics. Once a meta reaches threshold support, it\'s added to the migration vault options.',
  },
  {
    question: 'Do I need technical knowledge to use this?',
    answer: 'No. The interface is designed to be simple: connect wallet, select token, enter amount, confirm. If you can use any Solana DeFi app, you can use Pimp My Meta.',
  },
  {
    question: 'What wallets are supported?',
    answer: 'We support all major Solana wallets: Phantom, Solflare, Backpack, and any wallet compatible with Solana\'s wallet-adapter standard.',
  },
  {
    question: 'Is there a token for this project?',
    answer: 'Yes, $PMM is the utility token. Holding $PMM may provide benefits like reduced fees, governance voting, and early access to new meta migrations. See the Token page for details.',
  },
];

const risks = [
  {
    title: 'Smart Contract Risk',
    description: 'While audited, all smart contracts carry inherent risk. Use at your own discretion and never invest more than you can afford to lose.',
  },
  {
    title: 'Market Volatility',
    description: 'Meme tokens are highly volatile. Price changes during migration can result in different output amounts than estimated.',
  },
  {
    title: 'Slippage',
    description: 'Low liquidity markets may result in higher slippage than your tolerance setting. Set appropriate slippage limits.',
  },
  {
    title: 'Irreversible Transactions',
    description: 'Blockchain transactions cannot be undone. Always verify addresses and amounts before confirming.',
  },
];

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border border-border rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-6 py-4 flex items-center justify-between hover:bg-primary/5 transition-colors text-left"
      >
        <span className="font-medium text-foreground">{question}</span>
        <ChevronDown
          className={`h-5 w-5 text-muted-foreground transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <div className="px-6 py-4 bg-muted/20 border-t border-border">
              <p className="text-sm text-muted-foreground">{answer}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function DocsPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Documentation
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Everything you need to know about using Pimp My Meta safely and effectively.
          </p>
        </div>

        {/* Overview */}
        <section className="mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Book className="h-6 w-6 text-primary" />
                Overview
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-muted-foreground">
              <p>
                Pimp My Meta ($PMM) is a trustless token migration protocol built on Solana.
                We help meme coin traders automatically migrate between trending metas without
                manual swapping.
              </p>
              <p>
                <strong className="text-foreground">The Problem:</strong> Meme metas change
                rapidly on Solana. Manually swapping between tokens is slow, risky, and
                inefficient. You might miss the meta entirely.
              </p>
              <p>
                <strong className="text-foreground">The Solution:</strong> Automated
                migrations via smart contracts. Deposit old token → contract swaps via DEX →
                claim new token. All trustless, all on-chain.
              </p>
            </CardContent>
          </Card>
        </section>

        {/* How Migrations Work */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6">How Migrations Work</h2>
          <div className="space-y-4">
            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Connect & Select</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect your Solana wallet and select the old token you want to migrate
                      from. Choose the new meta token as your target.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Deposit to Vault</h3>
                    <p className="text-sm text-muted-foreground">
                      Specify the amount and approve the transaction. Your tokens are
                      deposited into the non-custodial smart contract vault.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Automated Swap</h3>
                    <p className="text-sm text-muted-foreground">
                      The smart contract executes the swap via Raydium or Jupiter. Old token
                      is sold, new token is bought, all in one atomic transaction.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-primary font-bold">4</span>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Claim New Tokens</h3>
                    <p className="text-sm text-muted-foreground">
                      Once the swap completes, claim your new meta tokens. They appear in
                      your wallet immediately.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>

        {/* Risks & Disclaimers */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <AlertTriangle className="h-6 w-6 text-yellow-400" />
            Risks & Disclaimers
          </h2>
          <div className="space-y-4">
            {risks.map((risk, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-2 text-yellow-400">{risk.title}</h3>
                  <p className="text-sm text-muted-foreground">{risk.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-6 bg-red-500/10 border border-red-500/50 rounded-lg p-6">
            <p className="text-sm text-muted-foreground">
              <strong className="text-red-400">IMPORTANT:</strong> Cryptocurrency trading
              is extremely risky. Meme tokens are speculative and can lose all value. This
              is not financial advice. Do your own research. Never invest more than you can
              afford to lose. Pimp My Meta and its creators are not responsible for any
              financial losses.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <section>
          <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <HelpCircle className="h-6 w-6 text-primary" />
            Frequently Asked Questions
          </h2>
          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={index} question={faq.question} answer={faq.answer} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
