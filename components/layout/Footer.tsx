import { FC } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Twitter, Send, MessageCircle } from 'lucide-react';
import { SOCIAL_LINKS, NAV_LINKS } from '@/lib/constants';

const Footer: FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-card">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-primary/50">
                <Image
                  src="/brand/pmm-pill.png"
                  alt="PMM Logo"
                  width={48}
                  height={48}
                  className="object-cover"
                />
              </div>
              <h3 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Pimp My Meta
              </h3>
            </div>
            <p className="text-muted-foreground mb-4 max-w-md">
              Surf the meta. Keep the shrimp. Trustless token migrations on Solana.
            </p>
            <div className="flex space-x-4">
              <a
                href={SOCIAL_LINKS.x}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.telegram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
              <a
                href={SOCIAL_LINKS.discord}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(0, 4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-foreground uppercase tracking-wider mb-4">
              Resources
            </h4>
            <ul className="space-y-2">
              {NAV_LINKS.slice(4).map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors text-sm"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Legal Disclaimer */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="text-xs text-muted-foreground">
              <strong className="text-foreground">DISCLAIMER:</strong> Cryptocurrency
              investments carry significant risk. Do your own research. Pimp My Meta
              ($PMM) is a utility token for migration services on Solana. This is not
              financial advice. We do not guarantee returns or profits. Never invest more
              than you can afford to lose. Smart contract interactions are irreversible.
              Always verify contract addresses and URLs before transactions.
            </p>
          </div>

          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-muted-foreground">
            <p>&copy; {currentYear} Pimp My Meta. All rights reserved.</p>
            <p className="mt-2 md:mt-0">
              Built on Solana. Powered by community.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
