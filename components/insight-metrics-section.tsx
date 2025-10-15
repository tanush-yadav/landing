import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/scroll-reveal';

const metricRows = [
  {
    metric: 'Visibility Share',
    insight:
      'How often AI platforms (ChatGPT, Perplexity, Claude) mention you versus competitors',
    action:
      "Spot queries where you're missing. Add or refresh pages to reclaim visibility.",
  },
  {
    metric: 'Position in Answers',
    insight: 'Where in the AI response your brand appears',
    action:
      'For queries you already win, rewrite with the clearest intent signal to rise to the top answer.',
  },
  {
    metric: 'Sentiment & Framing',
    insight: 'How AI talks about you: tone, topics, recurring context',
    action:
      'If models surface pricing or usability objections, add counter-narratives, proof points, or case studies.',
  },
  {
    metric: 'Prompt Volume Trends',
    insight: 'Which questions are heating up or cooling off',
    action:
      'Prioritize rising prompts. If &quot;x vs y&quot; is trending, ship the comparison page now.',
  },
  {
    metric: 'Citations & Source Influence',
    insight: 'Which external sources models lean on when citing your category',
    action:
      'Identify the forums, reviews, and news outlets AI trusts most. Publish or earn links there.',
  },
];

const teachingPrinciples = [
  {
    title: 'Show insight, not promise',
    description:
      'Lead with the shift you observed: &quot;Your brand now appears in 25% more AI answers.&quot; Follow with the next experiment to run.',
  },
  {
    title: 'Frame measurement as learning',
    description:
      'Use language like &quot;Here is what we saw. Here is what we learned. Here is what we would try next.&quot; It keeps the tone utility-first instead of pitchy.',
  },
  {
    title: 'Use social and public data sources',
    description:
      'Pull real questions from the channels prospects already use, then cross-check them against model responses.',
    bullets: [
      'Reddit, LinkedIn, and X surface the language modern buyers use.',
      'Go-to-market tools and social listening verify what humans ask versus how models respond.',
      'Charts, sample prompts, and side-by-side model outputs teach how priorities shift from Google.',
    ],
  },
];

const exampleBullets = [
  'Visibility Share: Find the gaps where AI discusses your category but never cites you.',
  'Answer Positioning: Move your brand from bottom mentions to the first answer.',
  'Sentiment and Framing: Track how often models pair you with &quot;expensive&quot; or &quot;hard to use&quot; and reframe it.',
  'Prompt Trends: When &quot;vs tool X&quot; traffic climbs, write (or refresh) the comparison.',
  'Citation Sources: If AI keeps citing a niche forum, contribute there or earn the link.',
];

export function InsightMetricsSection() {
  return (
    <section className="bg-gray-50/30 py-24" id="metrics">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
        <div className="text-center mb-16 max-w-2xl mx-auto">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 border-gray-300/60 text-gray-600 bg-white/80 text-xs">
              AI Search Metrics
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>
              Track the Metrics That Truly Move the Needle in AI Search
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.2}>
            <p className="text-base text-gray-600 leading-relaxed">
              In six weeks you start to see real shifts in how AI platforms treat your brand.
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.3}>
          <Card className="bg-white border-gray-200/70 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-slate-900 text-white text-xs uppercase tracking-wide">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      Metric
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      What You Learn
                    </th>
                    <th scope="col" className="px-6 py-4 text-left font-semibold">
                      How to Act
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 text-sm text-gray-700">
                  {metricRows.map(({ metric, insight, action }) => (
                    <tr key={metric} className="transition-colors duration-150 hover:bg-slate-50/80">
                      <td className="px-6 py-5 align-top font-semibold text-gray-900">{metric}</td>
                      <td className="px-6 py-5 align-top leading-relaxed">{insight}</td>
                      <td className="px-6 py-5 align-top leading-relaxed text-gray-600">{action}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </ScrollReveal>
      </div>
    </section>
  );
}
