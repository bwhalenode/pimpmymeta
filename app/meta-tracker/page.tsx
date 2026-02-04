import { Metadata } from 'next';
import { MOCK_METAS, getCurrentMeta, getCandidateMetas, getPastMetas } from '@/lib/meta/mockMetas';
import MetaCard from '@/components/meta/MetaCard';

export const metadata: Metadata = {
  title: 'Meta Tracker',
  description: 'Track the current meta and upcoming migration candidates on Solana.',
};

export default function MetaTrackerPage() {
  const currentMeta = getCurrentMeta();
  const candidateMetas = getCandidateMetas();
  const pastMetas = getPastMetas();

  return (
    <div className="py-20 bg-gradient-to-b from-background via-card to-background min-h-screen">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Meta Tracker
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Follow the pulse of Solana meme metas. Current, upcoming, and past migrations.
          </p>
        </div>

        {/* Current Meta */}
        {currentMeta && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-green-400">⚡</span>
              Current Meta
            </h2>
            <div className="max-w-md">
              <MetaCard meta={currentMeta} index={0} />
            </div>
          </section>
        )}

        {/* Candidate Metas */}
        {candidateMetas.length > 0 && (
          <section className="mb-16">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-primary">🔮</span>
              Next Meta Candidates
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidateMetas.map((meta, index) => (
                <MetaCard key={meta.id} meta={meta} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Past Metas */}
        {pastMetas.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
              <span className="text-muted-foreground">📜</span>
              Past Metas
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {pastMetas.map((meta, index) => (
                <MetaCard key={meta.id} meta={meta} index={index} />
              ))}
            </div>
          </section>
        )}

        {/* Info Notice */}
        <div className="mt-16 max-w-3xl mx-auto">
          <div className="bg-muted/30 border border-border rounded-lg p-6">
            <h3 className="text-sm font-semibold text-foreground mb-3">
              📊 How We Track Metas
            </h3>
            <p className="text-xs text-muted-foreground mb-3">
              Meta tracking combines on-chain metrics, social sentiment, and community voting.
              When a new meta candidate emerges, the community can vote on whether to add it
              to the migration vault.
            </p>
            <p className="text-xs text-muted-foreground">
              <strong>Note:</strong> All data shown here is for demonstration purposes.
              Production version will integrate real-time on-chain data and API feeds.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
