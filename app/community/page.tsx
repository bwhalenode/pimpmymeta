import { Metadata } from 'next';
import { X, Send, Download, Image } from 'lucide-react';
import Card, { CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/Card';
import Button from '@/components/ui/Button';
import { SOCIAL_LINKS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Community',
  description: 'Join the Pimp My Meta community on X and Telegram.',
};

const socialChannels = [
  {
    name: 'X (Twitter)',
    icon: X,
    description: 'Follow for updates, memes, and meta calls',
    url: SOCIAL_LINKS.x,
    cta: 'Follow on X',
    color: 'text-[#1DA1F2]',
  },
  {
    name: 'Telegram',
    icon: Send,
    description: 'Join the main community chat',
    url: SOCIAL_LINKS.telegram,
    cta: 'Join Telegram',
    color: 'text-[#0088cc]',
  },
];

const pressKitAssets = [
  { name: 'Primary Logo (SVG)', file: 'pmm-logo.svg' },
  { name: 'Primary Logo (PNG)', file: 'pmm-logo.png' },
  { name: 'Icon Only (SVG)', file: 'pmm-icon.svg' },
  { name: 'Icon Only (PNG)', file: 'pmm-icon.png' },
  { name: 'Shrimp Mascot (SVG)', file: 'shrimp.svg' },
  { name: 'Brand Guidelines (PDF)', file: 'brand-guidelines.pdf' },
];

export default function CommunityPage() {
  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Join the Community
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Surf the meta together. Connect with fellow shrimp chasers.
          </p>
        </div>

        {/* Social Channels */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Social Channels</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {socialChannels.map((channel, index) => {
              const Icon = channel.icon;
              return (
                <Card key={index} hover>
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-muted flex items-center justify-center mb-4 ${channel.color}`}>
                      <Icon className="h-8 w-8" />
                    </div>
                    <CardTitle>{channel.name}</CardTitle>
                    <CardDescription>{channel.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <a href={channel.url} target="_blank" rel="noopener noreferrer">
                      <Button variant="outline" className="w-full">
                        {channel.cta}
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* DexScreener Link */}
        <section className="mb-16">
          <Card glow>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Image className="h-6 w-6 text-primary" />
                Live Trading Chart
              </CardTitle>
              <CardDescription>
                View real-time price, volume, and trading activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <a href={SOCIAL_LINKS.dexscreener} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="w-full">
                  View on DexScreener
                </Button>
              </a>
            </CardContent>
          </Card>
        </section>

        {/* Community Guidelines */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Community Guidelines</h2>
          <Card>
            <CardContent className="p-6">
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-foreground">Be respectful:</strong> Treat everyone
                    with respect. No harassment, hate speech, or personal attacks.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-foreground">No scams:</strong> Never ask for private
                    keys or seed phrases. Report suspicious DMs immediately.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-foreground">Share knowledge:</strong> Help newcomers
                    learn. Share insights, not financial advice.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-foreground">Stay on topic:</strong> Keep discussions
                    relevant to $PMM, metas, and Solana DeFi.
                  </span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary flex-shrink-0">✓</span>
                  <span>
                    <strong className="text-foreground">Have fun:</strong> Memes encouraged.
                    Keep the energy high and positive.
                  </span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </section>

        {/* Press Kit */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center">Press Kit</h2>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-6 w-6 text-primary" />
                Brand Assets
              </CardTitle>
              <CardDescription>
                Download official logos, icons, and brand guidelines
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
                {pressKitAssets.map((asset, index) => (
                  <button
                    key={index}
                    className="flex items-center justify-between p-4 rounded-lg border border-border hover:border-primary/50 transition-all text-left"
                  >
                    <span className="text-sm font-medium">{asset.name}</span>
                    <Download className="h-4 w-4 text-muted-foreground" />
                  </button>
                ))}
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-xs text-muted-foreground">
                  <strong>Note:</strong> Press kit assets are placeholders. Replace with actual
                  brand files before launch. Include usage guidelines and restrictions.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Stats */}
        <section>
          <h2 className="text-3xl font-bold mb-8 text-center">Community Stats</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card hover className="text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-primary mb-2">12.5K</p>
                <p className="text-sm text-muted-foreground">X Followers</p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-secondary mb-2">8.2K</p>
                <p className="text-sm text-muted-foreground">Telegram Members</p>
              </CardContent>
            </Card>

            <Card hover className="text-center">
              <CardContent className="p-6">
                <p className="text-3xl font-bold text-green-400 mb-2">1,247</p>
                <p className="text-sm text-muted-foreground">Successful Migrations</p>
              </CardContent>
            </Card>
          </div>

          <div className="mt-6">
            <p className="text-xs text-center text-muted-foreground">
              <strong>Note:</strong> Stats are placeholder examples. Replace with real data from
              APIs or analytics.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
