'use client';

import { FC } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Clock, Shield, Users } from 'lucide-react';

const reasons = [
  {
    icon: TrendingUp,
    title: 'Meta Velocity',
    description:
      'Meme metas change fast on Solana. Manual swapping means missing opportunities. We automate the chase.',
  },
  {
    icon: Clock,
    title: 'Speed Wins',
    description:
      'Migrations execute in seconds. Be first to the new meta, not last. Time is alpha.',
  },
  {
    icon: Shield,
    title: 'Trustless Security',
    description:
      'Zero team custody. Smart contracts hold and swap your funds. Code is law, audits are public.',
  },
  {
    icon: Users,
    title: 'Community Power',
    description:
      'Collective meta tracking. Vote on next migration targets. Shrimp gang stays together.',
  },
];

const WhyWins: FC = () => {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why This Wins in{' '}
            <span className="bg-gradient-secondary bg-clip-text text-transparent">
              2026
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            The Solana meme meta moves at light speed. You need infrastructure that
            keeps up.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {reasons.map((reason, index) => {
            const Icon = reason.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-4 p-6 rounded-xl bg-card border border-border hover:border-primary/50 transition-all duration-300"
              >
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center glow-primary">
                    <Icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                  <p className="text-muted-foreground">{reason.description}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default WhyWins;
