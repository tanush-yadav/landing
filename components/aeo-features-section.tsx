import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/scroll-reveal';
import {
  Scan,
  Map,
  Sparkles,
  Send,
  Gauge,
  type LucideIcon,
} from 'lucide-react';

import { cn } from '@/lib/utils';

type FeatureTagVariant = 'dark' | 'light' | 'accent';

type Feature = {
  icon: 'scanner' | 'map' | 'finder' | 'ship' | 'tracker';
  title: string;
  description: string;
  tag?: {
    text: string;
    variant?: FeatureTagVariant;
  };
};

type SectionLayout = {
  columns?: 1 | 2;
  cardStyle?: 'bordered' | 'elevated';
  iconPosition?: 'left' | 'top';
  textAlign?: 'left' | 'center';
  spacing?: 'md' | 'lg' | 'xl';
};

export type AEOFeaturesSectionProps = {
  sectionTitle: string;
  sectionSubtitle?: string;
  features: Feature[];
  layout?: SectionLayout;
};

const iconMap: Record<Feature['icon'], LucideIcon> = {
  scanner: Scan,
  map: Map,
  finder: Sparkles,
  ship: Send,
  tracker: Gauge,
};

const iconToneStyles: Record<Feature['icon'], string> = {
  scanner: 'bg-blue-50 text-blue-600',
  map: 'bg-violet-50 text-violet-600',
  finder: 'bg-emerald-50 text-emerald-600',
  ship: 'bg-amber-50 text-amber-600',
  tracker: 'bg-slate-100 text-slate-600',
};

const tagVariantStyles: Record<FeatureTagVariant, string> = {
  dark: 'bg-slate-900 text-white',
  light: 'bg-slate-100 text-slate-600',
  accent: 'bg-blue-100 text-blue-700',
};

const spacingMap = {
  md: 'space-y-4',
  lg: 'space-y-6',
  xl: 'space-y-8',
};

export function AEOFeaturesSection({
  sectionTitle,
  sectionSubtitle,
  features,
  layout = {
    columns: 1,
    cardStyle: 'bordered',
    iconPosition: 'left',
    textAlign: 'left',
    spacing: 'lg',
  },
}: AEOFeaturesSectionProps) {
  const {
    columns = 1,
    cardStyle = 'bordered',
    iconPosition = 'left',
    textAlign = 'left',
    spacing = 'lg',
  } = layout;

  const cardBaseClasses = cn(
    'transition-all duration-200',
    cardStyle === 'bordered'
      ? 'bg-white border border-gray-200/60 hover:border-gray-300 hover:shadow-sm'
      : 'bg-white/80 shadow-sm hover:shadow-md',
  );

  return (
    <section className="py-24" id="deliverables">
      <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <ScrollReveal>
            <Badge variant="outline" className="mb-6 border-gray-300/60 text-gray-600 text-xs">
              Key features
            </Badge>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>
              {sectionTitle}
            </h2>
          </ScrollReveal>
          {sectionSubtitle ? (
            <ScrollReveal delay={0.2}>
              <p className="text-base text-gray-600 leading-relaxed">{sectionSubtitle}</p>
            </ScrollReveal>
          ) : null}
        </div>

        <div
          className={cn(
            'mx-auto',
            columns === 1 ? 'max-w-3xl' : 'grid md:grid-cols-2 gap-6',
            columns === 1 ? spacingMap[spacing] : 'gap-6',
          )}
        >
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];

            return (
              <ScrollReveal key={feature.title} delay={index * 0.05}>
                <Card className={cn(cardBaseClasses, iconPosition === 'left' ? 'p-5' : 'p-6 text-center')}>
                  <div
                    className={cn(
                      'flex w-full',
                      iconPosition === 'left' ? 'items-start gap-4' : 'flex-col items-center text-center gap-5',
                    )}
                  >
                    <div>
                      <div
                        className={cn(
                          'flex h-10 w-10 items-center justify-center rounded-xl',
                          iconToneStyles[feature.icon],
                        )}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    <div className={cn('flex-1', textAlign === 'center' ? 'text-center' : 'text-left')}>
                      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                        <h3 className="text-base font-semibold text-gray-900">{feature.title}</h3>
                        {feature.tag?.text ? (
                          <span
                            className={cn(
                              'inline-flex h-6 items-center rounded-full px-3 text-xs font-medium',
                              feature.tag.variant
                                ? tagVariantStyles[feature.tag.variant]
                                : tagVariantStyles.dark,
                            )}
                          >
                            {feature.tag.text}
                          </span>
                        ) : null}
                      </div>
                      <p className="mt-2 text-sm leading-relaxed text-gray-600">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
