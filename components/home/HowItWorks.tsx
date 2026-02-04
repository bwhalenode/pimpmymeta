'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { Wallet, ArrowDownUp, Zap, CheckCircle } from 'lucide-react';
import Card from '@/components/ui/Card';

const steps = [
  {
    icon: Wallet,
    title: 'Connect Wallet',
    description: 'Link your Solana wallet (Phantom, Solflare, etc.) in seconds.',
  },
  {
    icon: ArrowDownUp,
    title: 'Select Token',
    description: 'Choose the old meta token you want to migrate from.',
  },
  {
    icon: Zap,
    title: 'Deposit & Swap',
    description: 'Smart contract handles the swap trustlessly via Raydium/Jupiter.',
  },
  {
    icon: CheckCircle,
    title: 'Claim New Tokens',
    description: 'Receive your new meta tokens instantly. No waiting, no manual work.',
  },
];

const HowItWorks: FC = () => {
  return (
    <section className="py-20 bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              How It Works
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to migrate to the latest meta. No manual trading, no
            slippage worries.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card hover className="h-full relative">
                  {/* Step Number */}
                  <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-primary flex items-center justify-center text-primary-foreground font-bold text-lg glow-primary">
                    {index + 1}
                  </div>

                  {/* Icon */}
                  <div className="mb-4 pt-4">
                    <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Icon className="h-8 w-8 text-primary" />
                    </div>
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-bold mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
