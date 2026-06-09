import {
  FaCode,
  FaMobile,
  FaRobot,
  FaCogs,
  FaBullhorn,
  FaSignal
} from 'react-icons/fa'

export const services = [
  {
    id: 'web',
    icon: FaCode,
    title: 'Web Applications',
    shortTitle: 'Web Apps',
    description: 'Production-grade websites, web apps, and SaaS platforms built with modern stacks. Fast, secure, and SEO-friendly.',
    features: ['Next.js & React', 'E-commerce', 'SaaS dashboards', 'CMS & portals'],
    size: 'large',
    accent: '#6366f1',
    pricingTier: 'business',
    examples: ['Rady.ng', 'Bright Orion Global', 'Djenepo Couture']
  },
  {
    id: 'ai',
    icon: FaRobot,
    title: 'AI Automation',
    shortTitle: 'AI Automation',
    description: 'AI voice agents, chatbots, sales closers, and receptionists that run your business 24/7. Trained on your data, integrated with your tools.',
    features: ['AI voice agents', 'AI chatbots', 'AI closers', 'AI receptionists'],
    size: 'large',
    accent: '#ec4899',
    pricingTier: 'custom',
    examples: ['AI Sales Closer', 'AI Receptionist', 'AI Support Bot']
  },
  {
    id: 'mobile',
    icon: FaMobile,
    title: 'Mobile Apps',
    shortTitle: 'Mobile Apps',
    description: 'Native-feeling iOS & Android apps that users actually keep on their home screen.',
    features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store publishing'],
    size: 'medium',
    accent: '#8b5cf6',
    pricingTier: 'business',
    examples: []
  },
  {
    id: 'custom',
    icon: FaCogs,
    title: 'Custom Software',
    shortTitle: 'Custom Software',
    description: 'Bespoke platforms built around your exact workflow — no compromises, no bloat.',
    features: ['Internal tools', 'Workflow automation', 'Booking systems', 'Marketplaces'],
    size: 'medium',
    accent: '#06b6d4',
    pricingTier: 'business',
    examples: []
  },
  {
    id: 'marketing',
    icon: FaBullhorn,
    title: 'Marketing Technology',
    shortTitle: 'MarTech',
    description: 'Email, CRM, and analytics integrations that turn your software into a growth engine.',
    features: ['Email automation', 'CRM integration', 'Analytics & dashboards', 'Lead funnels'],
    size: 'small',
    accent: '#f59e0b',
    pricingTier: 'business',
    examples: []
  },
  {
    id: 'vtu',
    icon: FaSignal,
    title: 'VTU Website & App',
    shortTitle: 'VTU Vending',
    description: 'Data, airtime, electricity, cable subscription, and bill payment platforms — the complete vending solution for the Nigerian market.',
    features: ['Data & airtime sales', 'Electricity bills', 'Cable TV subscription', 'Exam pins & bulk SMS'],
    size: 'large',
    accent: '#10b981',
    pricingTier: 'business',
    examples: []
  }
]

export const aiAgents = [
  {
    id: 'closer',
    name: 'AI Sales Closer',
    tagline: 'Closes deals while you sleep',
    description: 'An AI that engages leads, qualifies them, handles objections, and books calls with your sales team. Trained on your product, tone, and FAQs.',
    icon: '💰',
    accent: '#ec4899',
    features: [
      'Multi-channel (web, WhatsApp, Instagram, email)',
      'Trained on your products, prices, and offers',
      'Books meetings directly into your calendar',
      'Hands off hot leads to your human closers',
      'Reports back on every conversation'
    ]
  },
  {
    id: 'receptionist',
    name: 'AI Voice Receptionist',
    tagline: 'Answers every call, 24/7',
    description: 'A natural-sounding voice agent that picks up, greets callers, answers questions, books appointments, and routes urgent calls. No more missed calls.',
    icon: '📞',
    accent: '#6366f1',
    features: [
      'Natural conversation in 20+ languages',
      'Books appointments into Google/Outlook calendar',
      'Answers FAQs from your knowledge base',
      'Routes urgent calls to your team',
      'Sends SMS/email summaries after each call'
    ]
  },
  {
    id: 'support',
    name: 'AI Support Agent',
    tagline: 'Resolves tickets in seconds',
    description: 'A multilingual support agent that handles tier-1 tickets end-to-end. Pulls answers from your docs, refunds orders, and escalates the rest.',
    icon: '🎧',
    accent: '#06b6d4',
    features: [
      'Resolves 60–80% of tier-1 tickets automatically',
      'Pulls from your help center, Notion, or PDFs',
      'Handles refunds, returns, account changes',
      'Escalates to humans with full context',
      'Available 24/7 across web, email, and chat'
    ]
  },
  {
    id: 'leadbot',
    name: 'AI Lead Qualifier',
    tagline: 'Fills your pipeline with hot leads',
    description: 'Engages every website visitor, asks the right questions, and books qualified demos with your sales team. No more unqualified calls.',
    icon: '🎯',
    accent: '#f59e0b',
    features: [
      'Proactive visitor engagement',
      'Custom qualification criteria per campaign',
      'Books qualified leads on the spot',
      'Syncs with HubSpot, Salesforce, Pipedrive',
      'A/B tests different qualifying questions'
    ]
  },
  {
    id: 'consultant',
    name: 'AI Business Consultant',
    tagline: 'Expert advice on demand',
    description: 'A domain-specific AI that gives your customers (or your team) expert-level advice — from finance to legal to health. Built on your proprietary knowledge.',
    icon: '🧠',
    accent: '#8b5cf6',
    features: [
      'Trained on your proprietary knowledge',
      'Reasoning over your docs, reports, and data',
      'Citations for every answer',
      'White-label as your branded assistant',
      'Voice + chat + embeddable widget'
    ]
  },
  {
    id: 'workflow',
    name: 'AI Workflow Automation',
    tagline: 'Kills the busywork',
    description: 'AI that connects your tools and runs the repetitive work — invoice processing, data entry, report generation, social media, and more.',
    icon: '⚡',
    accent: '#10b981',
    features: [
      'Connects 500+ apps (Slack, Notion, Sheets, etc.)',
      'Reads, writes, and updates your tools',
      'Custom workflows built around your team',
      'Triggers on events (new lead, new invoice, etc.)',
      'Full audit trail of every action'
    ]
  }
]
