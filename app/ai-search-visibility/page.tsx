import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { ScrollReveal } from '@/components/scroll-reveal';
import { CountUp } from '@/components/count-up';
import { ScrollProgress } from '@/components/scroll-progress';
import {
  ArrowRight,
  CheckCircle2,
  XCircle,
  TrendingUp,
  Target,
  BarChart3,
  Zap,
  FileText,
  LayoutDashboard
} from 'lucide-react';

export const metadata: Metadata = {
  title: 'Double Your AI Visibility in 6 weeks | Cintra',
  description: 'AI search is replacing Google. Is your brand showing up, or are your competitors stealing recommendations? Get a complete AI visibility system with dashboard tracking, 12 high-intent articles per month, and measurable results across ChatGPT, Perplexity, Claude, and Gemini.',
};

export default function AIVisibilityLanding() {
  return (
    <div className="min-h-screen bg-white" style={{ fontFamily: 'var(--font-geist-sans),  sans-serif' }}>
      <ScrollProgress />

      {/* Navigation - Minimal */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-xl border-b border-gray-100/50 transition-all duration-300">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%] py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/images/logo.png" 
                alt="Cintra"
                width={32}
                height={32}
                className="w-8 h-8"
              />
              <span className="text-lg font-semibold" style={{ letterSpacing: '-0.01em' }}>Cintra</span>
            </Link>
            
            {/* Desktop Nav */}
            <div className="hidden lg:flex items-center gap-6">
              <Link href="#metrics" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Metrics
              </Link>
              <Link href="#deliverables" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                What You Get
              </Link>
              <Link href="#case-study" className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200">
                Case Study
              </Link>
              <Button
                variant="outline"
                size="sm"
                className="text-sm transition-all duration-200 hover:bg-gray-50"
              >
                Log in
              </Button>
              <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-black text-white hover:bg-gray-900 text-sm transition-all duration-200"
                >
                  Sign up
                </Button>
              </Link>
            </div>
            
            {/* Mobile Nav */}
            <div className="flex lg:hidden items-center gap-3">
              <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                <Button
                  size="sm"
                  className="bg-black text-white hover:bg-gray-900 text-xs px-4"
                >
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section - Minimal with Original Copy */}
      <section className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%] pt-20 pb-32">
        <div className="text-center max-w-3xl mx-auto">
          <ScrollReveal>
            <Badge 
              variant="outline" 
              className="mb-8 border-red-500/30 text-red-600 bg-red-50/30 backdrop-blur-sm px-3 py-1 text-xs font-medium hover:bg-red-50/50 transition-all duration-200"
            >
              <span className="w-1.5 h-1.5 bg-red-500 rounded-full inline-block mr-2 animate-pulse"></span>
              Hiring Now
            </Badge>
          </ScrollReveal>
          
          <ScrollReveal delay={0.1}>
            <h1
              className="text-4xl sm:text-5xl md:text-6xl font-normal mb-4 leading-[1.15]"
              style={{ letterSpacing: '-0.02em',  fontWeight: 400 }}
            >
              <span className="text-black">Double Your AI Visibility</span>
            </h1>
            <p className="text-gray-400 text-3xl sm:text-4xl md:text-5xl font-normal mb-8 leading-[1.15]" style={{ letterSpacing: '-0.02em' }}>
              in 6 weeks
            </p>
          </ScrollReveal>
          
          <ScrollReveal delay={0.2}>
            <p className="text-base text-gray-600 mb-6 leading-relaxed">
              AI search is replacing Google. Is your brand showing up,<br />
              or are your competitors stealing recommendations?
            </p>
          </ScrollReveal>

          
          <ScrollReveal delay={0.4}>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
              <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                <Button
                  size="default"
                  className="w-full sm:w-auto bg-black text-white hover:bg-gray-900 text-sm font-medium px-8 py-3 transition-all duration-200 rounded-lg"
                >
                  Show Me My AI Visibility Gap
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
              <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                <Button
                  variant="outline"
                  size="default"
                  className="w-full sm:w-auto text-sm font-medium px-8 py-3 transition-all duration-200 hover:bg-gray-50 rounded-lg border-gray-300"
                >
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </ScrollReveal>
          
          <ScrollReveal delay={0.5}>
            <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
              <span>No cap</span>
              <span className="text-gray-300">|</span>
              <span>Trusted by teams at</span>
              <Image 
                src="/images/logos/y-combinator.svg" 
                alt="Y Combinator" 
                width={100} 
                height={28}
                className="opacity-50 grayscale hover:opacity-60 transition-opacity h-4 w-auto"
              />
            </div>
          </ScrollReveal>
        </div>

        {/* Minimal Dashboard Mockup */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20 relative">
            <div className="bg-white rounded-xl border border-gray-200/80 shadow-sm overflow-hidden">
              {/* Browser chrome - minimal */}
              <div className="flex items-center gap-2 px-4 py-2.5 border-b border-gray-100 bg-gray-50/50">
                <div className="flex gap-1.5">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                  <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                </div>
                <div className="ml-3 text-xs text-gray-500">AI Visibility Dashboard</div>
              </div>
              
              <div className="p-6 sm:p-8 bg-white">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold mb-1" style={{ letterSpacing: '-0.01em' }}>Your Brand&apos;s Dashboard</h3>
                    <p className="text-sm text-gray-500">Track your AI search visibility in real-time</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge className="bg-gray-900 text-white text-xs border-0">ChatGPT</Badge>
                    <Badge className="bg-purple-600 text-white text-xs border-0">Perplexity</Badge>
                    <Badge className="bg-blue-600 text-white text-xs border-0">Claude</Badge>
                    <Badge className="bg-pink-600 text-white text-xs border-0">Gemini</Badge>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="p-4 border border-gray-200/60 rounded-lg bg-gray-50/30">
                    <div className="text-xs text-gray-500 mb-1">Visibility</div>
                    <div className="text-2xl font-semibold mb-0.5"><CountUp end={56} suffix="%" /></div>
                    <div className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      +46% from start
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200/60 rounded-lg bg-gray-50/30">
                    <div className="text-xs text-gray-500 mb-1">Traffic</div>
                    <div className="text-2xl font-semibold mb-0.5">1.7k</div>
                    <div className="text-xs text-green-600 flex items-center">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      8.5x increase
                    </div>
                  </div>
                  
                  <div className="p-4 border border-gray-200/60 rounded-lg bg-gray-50/30">
                    <div className="text-xs text-gray-500 mb-1">Rankings</div>
                    <div className="text-2xl font-semibold mb-0.5"><CountUp end={8} suffix="/10" /></div>
                    <div className="text-xs text-gray-600">Product comparisons</div>
                  </div>
                </div>
                
                <div className="bg-gray-50/50 rounded-lg p-4 sm:p-5">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-sm font-semibold">Your competitors</h4>
                    <span className="text-xs text-gray-500">vs your brand</span>
                  </div>
                  
                  <div className="space-y-2.5">
                    {[
                      { name: 'Competitor A',  score: 42,  change: '+5%' }, 
                      { name: 'Competitor B',  score: 38,  change: '+2%' }, 
                      { name: 'Your Brand',  score: 56,  change: '+46%',  highlight: true }, 
                      { name: 'Competitor C',  score: 29,  change: '-3%' }, 
                    ].map((item,  i) => (
                      <div key={i} className={`flex items-center justify-between p-2.5 rounded-md text-sm ${item.highlight ? 'bg-blue-50 border border-blue-200/60' : 'bg-white'}`}>
                        <span className={`font-medium ${item.highlight ? 'text-blue-900' : 'text-gray-700'}`}>{item.name}</span>
                        <div className="flex items-center gap-3">
                          <div className="w-32 sm:w-40 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div 
                              className={`h-2 rounded-full transition-all duration-1000 ${item.highlight ? 'bg-blue-500' : 'bg-gray-400'}`}
                              style={{ width: `${item.score}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-semibold w-10">{item.score}%</span>
                          <span className={`text-xs w-12 ${item.change.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Trust Signals - Minimal */}
      {/* <section className="border-y border-gray-100/50 bg-gray-50/30 py-16">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <ScrollReveal>
            <p className="text-center text-xs uppercase tracking-wider text-gray-400 mb-12 font-medium">
              Trusted by 100+ B2B SaaS companies
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-40">
              <div className="text-lg font-medium text-gray-400 text-center">Company A</div>
              <div className="text-lg font-medium text-gray-400 text-center">Company B</div>
              <div className="text-lg font-medium text-gray-400 text-center">Company C</div>
              <div className="text-lg font-medium text-gray-400 text-center">Company D</div>
            </div>
          </ScrollReveal>
        </div>
      </section> */}

      {/* The Problem Section */}
      <section className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%] py-24">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>
                <span className="text-black">You Rank on Google.</span><br />
                <span className="text-gray-400">But You&apos;re Invisible Where It Matters.</span>
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-base text-gray-600 leading-relaxed">
                Your prospects aren&apos;t Googling anymore. They&apos;re asking ChatGPT,  Perplexity,  Claude,  and Gemini 
                to recommend solutions.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 mb-10">
            <ScrollReveal delay={0.2}>
              <Card className="p-6 border-gray-200/60 transition-all duration-200 hover:border-gray-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                  </div>
                  <h3 className="text-base font-semibold">Google Ranking</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-2.5 bg-green-50/50 rounded-md">
                    <span className="text-sm">Your Product</span>
                    <Badge className="bg-green-600 text-white text-xs">Position #1</Badge>
                  </div>
                  <p className="text-sm text-gray-600 mt-3 leading-relaxed">
                    You&apos;ve invested years in SEO. You rank #1 for your category keywords.
                  </p>
                </div>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <Card className="p-6 border-red-200/60 bg-red-50/20 transition-all duration-200 hover:border-red-300">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center">
                    <XCircle className="w-4 h-4 text-red-600" />
                  </div>
                  <h3 className="text-base font-semibold">AI Search Results</h3>
                </div>
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between p-2.5 bg-gray-100/70 rounded-md text-gray-400">
                    <span className="text-sm">Your Product</span>
                    <Badge variant="outline" className="border-gray-300 text-xs">Not Listed</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-md border border-gray-200/60">
                    <span className="font-medium text-sm">Competitor A</span>
                    <Badge className="bg-blue-600 text-xs">#1</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2.5 bg-white rounded-md border border-gray-200/60">
                    <span className="font-medium text-sm">Competitor B</span>
                    <Badge className="bg-blue-600 text-xs">#2</Badge>
                  </div>
                  <p className="text-xs text-red-600 mt-3 leading-relaxed font-medium">
                    Even with #1 Google ranking,  you&apos;re missing in AI search, and losing recommendations to competitors.
                  </p>
                </div>
              </Card>
            </ScrollReveal>
          </div>
          
          <ScrollReveal delay={0.4}>
            <div className="text-center">
              <p className="text-sm text-gray-700 leading-relaxed">
                <strong className="font-semibold">Even if you rank #1 on Google</strong>,  you&apos;re not showing up in these AI search results, and 
                your competitors are stealing recommendations.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* The Outcome Section */}
      <section className="bg-gray-50/30 py-24" id="metrics">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <ScrollReveal>
              <Badge variant="outline" className="mb-6 border-gray-300/60 text-gray-600 bg-white/80 text-xs">
                AI Search Metrics
              </Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>Track the Metrics That Matter</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-base text-gray-600 leading-relaxed">
                in 6 weeks,  you&apos;ll see measurable results across all key AI platforms
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.3}>
              <Card className="p-6 bg-white border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center mb-5">
                  <Target className="w-5 h-5 text-blue-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">Get Recommended</h3>
                <div className="text-3xl font-semibold mb-3 text-blue-600">
                  <CountUp end={8} suffix="/10" />
                </div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Show up in 8/10 product comparison queries when prospects ask 
                  &quot;What&apos;s the best [your category]?&quot;
                </p>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <Card className="p-6 bg-white border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center mb-5">
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">Capture Traffic</h3>
                <div className="text-3xl font-semibold mb-3 text-green-600">3-8x</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Increase in organic visitors as AI tools cite your content as authoritative sources
                </p>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <Card className="p-6 bg-white border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center mb-5">
                  <BarChart3 className="w-5 h-5 text-purple-600" />
                </div>
                <h3 className="text-base font-semibold mb-2">Track Everything</h3>
                <div className="text-3xl font-semibold mb-3 text-purple-600">Real-time</div>
                <p className="text-sm text-gray-600 leading-relaxed">
                  Dashboard showing exactly where you rank vs competitors across all major AI platforms
                </p>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-24" id="deliverables">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <ScrollReveal>
              <Badge variant="outline" className="mb-6 border-gray-300/60 text-gray-600 text-xs">Key features</Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>Everything You Need to Win in AI Search</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.2}>
              <p className="text-base text-gray-600 leading-relaxed">
                Every month,  you get a complete AI visibility system, not just content.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <ScrollReveal delay={0}>
              <Card className="p-5 border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                      <LayoutDashboard className="w-5 h-5 text-blue-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold">AI Visibility Dashboard</h3>
                      <Badge className="text-xs">Updated Daily</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Track your rankings across 50-100 high-intent queries in ChatGPT,  Perplexity,  Claude,  
                      and Gemini. See exactly where you show up and where you don&apos;t.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.1}>
              <Card className="p-5 border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
                      <FileText className="w-5 h-5 text-green-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold">12 High-Intent Articles</h3>
                      <Badge className="text-xs">Per Month</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Fully written articles optimized for AI retrieval. Ready to review,  approve,  and publish. 
                      No editing required unless you want to make changes.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.2}>
              <Card className="p-5 border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                      <Target className="w-5 h-5 text-purple-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold">2 Product/Feature Pages</h3>
                      <Badge className="text-xs">Per Month</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Conversion-focused pages that answer the questions prospects ask AI about your product category. 
                      Designed to capture bottom-of-funnel searches.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>

            <ScrollReveal delay={0.3}>
              <Card className="p-5 border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <div className="flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
                      <Zap className="w-5 h-5 text-orange-600" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-base font-semibold">Opportunity Reports</h3>
                      <Badge className="text-xs">Automated</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">
                      Automated detection of queries you should rank for but don&apos;t. I typically find 50+ opportunities 
                      in the first week alone.
                    </p>
                  </div>
                </div>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-50/30 py-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>The System</h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base text-gray-600 leading-relaxed">
                Most agencies write generic content and hope for the best. I build from your team&apos;s expertise, 
                the knowledge only you have.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="max-w-2xl mx-auto space-y-4">
            {[
              {
                step: '1', 
                title: 'Visibility Audit', 
                time: 'Week 1', 
                description: 'I analyze where you currently rank in AI search across all major platforms and identify gaps vs your competitors.'
              }, 
              {
                step: '2', 
                title: 'Opportunity Detection', 
                time: 'Week 1-2', 
                description: 'AI automatically finds 50-100 high-intent queries where you should appear but don\'t. These become your content roadmap.'
              }, 
              {
                step: '3', 
                title: 'Context Extraction', 
                time: 'Week 2-3', 
                description: 'I pull from your meeting transcripts,  product docs,  Slack threads,  and customer conversations, the raw material that makes content sound like your team.'
              }, 
              {
                step: '4', 
                title: 'Content Creation', 
                time: 'Ongoing', 
                description: '12 articles + 2 product pages per month,  written from your expertise. Optimized for AI retrieval. Ready to publish.'
              }, 
              {
                step: '5', 
                title: 'Optimization Loop', 
                time: 'Ongoing', 
                description: 'Track what moves the needle. Double down on what works. Your dashboard shows performance in real-time.'
              }
            ].map((item,  i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center text-sm font-semibold">
                      {item.step}
                    </div>
                  </div>
                  <Card className="flex-1 p-4 bg-white border-gray-200/60 transition-all duration-200 hover:border-gray-300">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="text-sm font-semibold">{item.title}</h3>
                      <Badge variant="outline" className="text-xs">{item.time}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 leading-relaxed">{item.description}</p>
                  </Card>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes This Different */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="text-center mb-16 max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-8" style={{ letterSpacing: '-0.01em' }}>
                Context-Driven Content <span className="text-gray-400">vs</span> Generic Blog Posts
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-base text-gray-600 leading-relaxed mt-4">
                Here&apos;s why most content doesn&apos;t work for AI search: it&apos;s generic. AI tools can already generate that stuff themselves.
              </p>
            </ScrollReveal>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <ScrollReveal delay={0.2}>
              <Card className="p-6 border-gray-200/60 bg-gray-50/40 transition-all duration-200 hover:border-gray-300">
                <h3 className="text-base font-semibold mb-5 text-gray-600">Generic Agencies</h3>
                <ul className="space-y-3">
                  {[
                    'Write from research and competitor analysis', 
                    'Content sounds like everyone else', 
                    'AI tools ignore it because they can generate similar content themselves', 
                    'You review 30 articles,  provide feedback,  wait for revisions'
                  ].map((item,  i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                      <XCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <Card className="p-6 border-blue-200/60 bg-blue-50/30 transition-all duration-200 hover:border-blue-300">
                <h3 className="text-base font-semibold mb-5 text-blue-900">What I Build</h3>
                <ul className="space-y-3">
                  {[
                    'Extract from your meeting transcripts,  docs,  and customer convos', 
                    'Content includes insights only your team knows', 
                    'AI tools cite it because it\'s genuinely unique and valuable', 
                    'You get finished articles,  just approve and publish'
                  ].map((item,  i) => (
                    <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Case Study Section */}
      <section className="bg-gray-50/30 py-24" id="case-study">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="max-w-3xl mx-auto">
            <ScrollReveal>
              <Badge variant="outline" className="mb-6 text-xs">Case Study</Badge>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <h2 className="text-3xl sm:text-4xl font-normal mb-6" style={{ letterSpacing: '-0.01em' }}>
                How Hamming Went from <span className="text-red-500">10%</span> to{' '}
                <span className="text-green-500">56%</span> AI Visibility in 12 Weeks
              </h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <p className="text-base text-gray-600 mb-12 leading-relaxed">
                Hamming is a YC-backed AI startup. They ranked well on Google but were invisible in AI search results, 
                even though their target buyers were using ChatGPT and Perplexity to find solutions.
              </p>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <ScrollReveal delay={0.3}>
                <Card className="p-6 border-gray-200/60 transition-all duration-200 hover:border-gray-300">
                  <h3 className="text-base font-semibold mb-5 text-gray-600">Before (Month 0)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-semibold text-red-500 mb-1"><CountUp end={10} suffix="%" /></div>
                      <p className="text-sm text-gray-600">visibility in AI search for their category</p>
                    </div>
                    <div>
                      <div className="text-3xl font-semibold text-red-500 mb-1">0</div>
                      <p className="text-sm text-gray-600">presence in product comparison queries</p>
                    </div>
                    <div>
                      <div className="text-3xl font-semibold text-gray-400 mb-1">200</div>
                      <p className="text-sm text-gray-600">organic visitors per day</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal delay={0.4}>
                <Card className="p-6 border-green-200/60 bg-green-50/30 transition-all duration-200 hover:border-green-300">
                  <h3 className="text-base font-semibold mb-5 text-green-900">After (Month 3)</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="text-3xl font-semibold text-green-600 mb-1"><CountUp end={56} suffix="%" /></div>
                      <p className="text-sm text-gray-700">visibility across target queries</p>
                    </div>
                    <div>
                      <div className="text-3xl font-semibold text-green-600 mb-1"><CountUp end={8} suffix="/10" /></div>
                      <p className="text-sm text-gray-700">appeared in product comparison results</p>
                    </div>
                    <div>
                      <div className="text-3xl font-semibold text-green-600 mb-1">1, 700</div>
                      <p className="text-sm text-gray-700">organic visitors per day (8.5x increase)</p>
                    </div>
                  </div>
                </Card>
              </ScrollReveal>
            </div>
            
            <ScrollReveal delay={0.5}>
              <Card className="p-5 bg-blue-50/40 border-blue-200/60 transition-all duration-200 hover:border-blue-300">
                <h3 className="text-sm font-semibold mb-3 text-blue-900">What I Did:</h3>
                <p className="text-sm text-gray-700 leading-relaxed">
                  Analyzed their meeting transcripts and product docs. Found <strong>127 high-intent queries</strong>{' '}
                  they should rank for. Created <strong>36 articles and 6 product pages</strong> over 12 weeks, 
                  all built from their team&apos;s expertise.
                </p>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.6}>
              <div className="mt-10 text-center">
                <p className="text-sm text-gray-600 mb-6">
                  <strong className="font-semibold">Proof:</strong> Check Semrush for hamming.ai, you can verify these numbers yourself.
                </p>
                <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                  <Button
                    size="default"
                    className="bg-black text-white hover:bg-gray-900 text-sm px-6 py-2.5 transition-all duration-200"
                  >
                    Want similar results? Show Me My AI Visibility Gap
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Who This Is For */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="max-w-4xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-16 text-center" style={{ letterSpacing: '-0.01em' }}>Is This Right for You?</h2>
            </ScrollReveal>
            
            <div className="grid md:grid-cols-2 gap-6">
              <ScrollReveal delay={0.1}>
                <Card className="p-8 border-green-200/60 bg-green-50/30 transition-all duration-200 hover:border-green-300 hover:shadow-sm">
                  <h3 className="text-base font-semibold mb-6 text-green-900">This is for you if:</h3>
                  <ul className="space-y-3.5">
                    {[
                      'You\'re a B2B SaaS company with product-market fit', 
                      'You rank on Google but are invisible in AI search', 
                      'You have internal expertise but no time to create content', 
                      'You want measurable outcomes,  not vanity metrics', 
                      'You\'re ready to commit 8 weeks to double your visibility'
                    ].map((item,  i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-gray-700">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
              
              <ScrollReveal delay={0.2}>
                <Card className="p-8 border-gray-200/60 transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                  <h3 className="text-base font-semibold mb-6 text-gray-700">This isn&apos;t for you if:</h3>
                  <ul className="space-y-3.5">
                    {[
                      'You\'re a consumer/DTC brand (this is built for B2B)', 
                      'You don\'t have existing docs,  transcripts,  or customer conversations', 
                      'You\'re looking for generic blog content or SEO services', 
                      'You need results in less than 8 weeks'
                    ].map((item,  i) => (
                      <li key={i} className="flex gap-2.5 text-sm text-gray-600">
                        <XCircle className="w-4 h-4 text-gray-400 flex-shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="bg-gray-900 text-white py-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="max-w-2xl mx-auto text-center">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-8" style={{ letterSpacing: '-0.01em' }}>Early Movers Win</h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-base text-gray-400 mb-12 leading-relaxed">
                AI search is replacing traditional search. ChatGPT,  Perplexity,  Claude,  and Gemini are becoming the new Google.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <div className="bg-gray-800/50 rounded-xl p-8 mb-12 transition-all duration-200 hover:bg-gray-800/60 border border-gray-700/30">
                <p className="text-sm text-gray-300 mb-5 leading-relaxed">
                  Right now,  most of your competitors are ignoring this shift. <strong className="text-white font-semibold">That&apos;s your window.</strong>
                </p>
                <p className="text-sm text-gray-300 leading-relaxed">
                  In 6 months,  everyone will be optimizing for AI search. The companies that build authority now will 
                  dominate recommendations for years.
                </p>
              </div>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <div className="text-left">
                <h3 className="text-sm font-semibold mb-6 text-red-400 uppercase tracking-wide">The Cost of Waiting:</h3>
                <ul className="space-y-3 max-w-xl mx-auto">
                  <li className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>Your competitors capture mind share as AI tools learn to recommend them</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>You lose prospects who never even know you exist</span>
                  </li>
                  <li className="flex gap-3 text-sm text-gray-300 leading-relaxed">
                    <span className="text-red-400 mt-0.5">•</span>
                    <span>You play catch-up when you&apos;re already behind</span>
                  </li>
                </ul>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%] text-center">
          <div className="max-w-2xl mx-auto">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal mb-8" style={{ letterSpacing: '-0.01em' }}>Find Out What AI Says About Your Brand</h2>
            </ScrollReveal>
            
            <ScrollReveal delay={0.1}>
              <p className="text-base text-gray-600 mb-12 leading-relaxed">
                Book a 15-minute call and I&apos;ll show you:
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.2}>
              <Card className="p-8 border-gray-200/60 mb-10 text-left transition-all duration-200 hover:border-gray-300 hover:shadow-sm">
                <ul className="space-y-4">
                  {[
                    'Where you currently rank in AI search vs your competitors', 
                    'The top 10-20 queries you should own but don\'t', 
                    'What doubling your visibility would mean for your traffic'
                  ].map((item,  i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </ScrollReveal>
            
            <ScrollReveal delay={0.3}>
              <p className="text-sm text-gray-600 mb-8">
                No pitch. Just a clear breakdown of your AI visibility gap.
              </p>
            </ScrollReveal>
            
            <ScrollReveal delay={0.4}>
              <Link href="https://cal.com/cintradotrun/15min" target="_blank" rel="noopener noreferrer">
                <Button
                  size="default"
                  className="bg-black text-white hover:bg-gray-900 font-medium px-8 py-3 text-sm mb-6 transition-all duration-200 rounded-lg"
                >
                  Show Me My AI Visibility Gap
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </Link>
            </ScrollReveal>
            
            <ScrollReveal delay={0.5}>
              <div className="flex flex-wrap items-center justify-center gap-2 text-xs text-gray-500">
                <span>No cap</span>
                <span className="text-gray-300">|</span>
                <span>Takes 15 min</span>
                <span className="text-gray-300">|</span>
                <span>Trusted by teams at</span>
                <Image 
                  src="/images/logos/y-combinator.svg" 
                  alt="Y Combinator" 
                  width={100} 
                  height={28}
                  className="opacity-50 grayscale hover:opacity-60 transition-opacity h-4 w-auto"
                />
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* Footer - Minimal */}
      <footer className="bg-gray-900 text-white py-12 border-t border-gray-800/50">
        <div className="max-w-[1400px] mx-auto px-8 sm:px-16 lg:px-[20%]">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-sm font-semibold mb-4">Cintra</h3>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-4 text-gray-400">Product / Company</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/" className="hover:text-gray-300 transition-colors">Home</Link></li>
                <li><Link href="/docs" className="hover:text-gray-300 transition-colors">Docs</Link></li>
                <li><Link href="/pricing" className="hover:text-gray-300 transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-4 text-gray-400">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="/blog" className="hover:text-gray-300 transition-colors">Blog</Link></li>
                <li><Link href="/case-studies" className="hover:text-gray-300 transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold mb-4 text-gray-400">Follow Us</h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li><Link href="#" className="hover:text-gray-300 transition-colors">X.com</Link></li>
                <li><Link href="#" className="hover:text-gray-300 transition-colors">LinkedIn</Link></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800/50 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-gray-500">© 2025 Cintra. All rights reserved.</p>
            <div className="flex gap-6 text-xs text-gray-500">
              <Link href="/privacy" className="hover:text-gray-400 transition-colors">Privacy Policy</Link>
              <Link href="/terms" className="hover:text-gray-400 transition-colors">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
