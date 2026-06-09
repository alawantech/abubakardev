// Pricing data for ZedroTech services
// All prices are estimates for senior-engineer-grade work from Nigeria
// NGN prices reflect the Nigerian market; USD prices for international clients

export const pricingByService = {
  web: {
    tiers: [
      {
        id: 'web-starter',
        name: 'Starter Website',
        tagline: '1–5 pages · Landing page · Perfect for small businesses',
        priceNGN: 200000,
        priceUSD: 140,
        timeline: '1–2 weeks',
        features: [
          '1–5 pages (Home, About, Services, Contact)',
          'Professional landing page',
          'Mobile-responsive & fast',
          'Contact form + Google Maps',
          'Basic SEO setup',
          '14 days free support'
        ],
        cta: 'Start a website'
      },
      {
        id: 'web-business',
        name: 'Business Website',
        tagline: 'E-commerce · Payments · Login · Dashboard',
        priceNGN: 300000,
        priceUSD: 200,
        timeline: '2–3 weeks',
        features: [
          'Everything in Starter, plus:',
          'E-commerce functionality',
          'Payment gateway integration',
          'User login & accounts',
          'Admin dashboard & database',
          'Product/service management',
          'Blog + email capture'
        ],
        cta: 'Get started',
        popular: true
      },
      {
        id: 'web-professional',
        name: 'Professional Website',
        tagline: 'Advanced features · Custom workflows · Integrations',
        priceNGN: 450000,
        priceUSD: 310,
        timeline: '3–5 weeks',
        features: [
          'Everything in Business, plus:',
          'Custom user roles & permissions',
          'Advanced search & filtering',
          'Email/SMS notifications',
          'API integrations (3rd party tools)',
          'Multi-language support',
          'Analytics & reporting dashboard',
          '30 days free support'
        ],
        cta: 'Get started'
      },
      {
        id: 'web-enterprise',
        name: 'Enterprise Website',
        tagline: 'Multi-tenant · Scalable · Complex architecture',
        priceNGN: 800000,
        priceUSD: 550,
        timeline: '6–10 weeks',
        features: [
          'Everything in Professional, plus:',
          'Multi-tenant architecture',
          'Advanced security & encryption',
          'Load balancing & performance optimization',
          'Custom API development',
          'Automated workflows & scheduling',
          'Priority support & maintenance',
          '60 days free support'
        ],
        cta: 'Get a quote'
      },
      {
        id: 'web-custom',
        name: 'Custom Solution',
        tagline: 'Fully tailored · Enterprise-grade · Ongoing partnership',
        priceNGN: null,
        priceUSD: null,
        timeline: 'Custom timeline',
        features: [
          'Fully custom-built to your specs',
          'Dedicated project manager',
          'Unlimited revisions during build',
          'Source code ownership',
          'Deployment & infrastructure setup',
          'Ongoing maintenance & updates',
          'SLA-backed support'
        ],
        cta: 'Get a quote'
      }
    ]
  },

  mobile: {
    tiers: [
      {
        id: 'mobile-mvp',
        name: 'Mobile MVP',
        tagline: '1 platform · Core features only',
        priceNGN: 1000000,
        priceUSD: 700,
        timeline: '4–6 weeks',
        features: [
          'iOS or Android (single platform)',
          'Up to 6 core screens',
          'User authentication',
          'Basic API integration',
          'App Store submission',
          '30 days of bug fixes'
        ],
        cta: 'Start MVP'
      },
      {
        id: 'mobile-cross',
        name: 'Cross-Platform App',
        tagline: 'iOS + Android · From one codebase',
        priceNGN: 2000000,
        priceUSD: 1400,
        timeline: '6–10 weeks',
        features: [
          'iOS + Android (React Native / Flutter)',
          'Unlimited screens',
          'Push notifications',
          'Offline mode',
          'In-app purchases / payments',
          'App Store + Play Store publishing'
        ],
        cta: 'Build my app',
        popular: true
      },
      {
        id: 'mobile-advanced',
        name: 'Advanced App',
        tagline: 'Backend · AI · Real-time features',
        priceNGN: 4000000,
        priceUSD: 2800,
        timeline: '10–20 weeks',
        features: [
          'Custom backend + database',
          'Real-time features (chat, live tracking)',
          'AI features (recommendations, vision)',
          'Video/voice calling',
          'Admin dashboard + analytics',
          'Ongoing maintenance plan'
        ],
        cta: 'Get a quote'
      }
    ]
  },

  ai: {
    tiers: [
      {
        id: 'ai-chatbot',
        name: 'AI Chatbot',
        tagline: 'Text AI · Website + WhatsApp',
        priceNGN: 500000,
        priceUSD: 350,
        timeline: '2–4 weeks',
        features: [
          'Custom-trained on your business data',
          'Works on your website AND WhatsApp',
          'Answers questions, redirects, takes actions',
          'Multilingual (20+ languages)',
          'Lead capture + handoff to humans',
          'Web dashboard to manage conversations',
          'Monthly model retraining'
        ],
        cta: 'Build my chatbot'
      },
      {
        id: 'ai-voice',
        name: 'AI Voice Agent',
        tagline: 'Voice AI · Web + WhatsApp + Phone',
        priceNGN: 1500000,
        priceUSD: 1000,
        timeline: '3–5 weeks',
        features: [
          'Natural human-like voice',
          'Works on web calls, WhatsApp, AND normal phone calls',
          'Books appointments into your calendar',
          'Handles FAQs from your knowledge base',
          'Routes urgent calls to your team',
          'Call summaries to email/Slack',
          'Web dashboard to configure + monitor',
          'Multi-language support'
        ],
        cta: 'Get a voice agent',
        popular: true
      },
      {
        id: 'ai-suite',
        name: 'AI Suite (All-in-One)',
        tagline: 'Chat + Voice + Sales · Every channel',
        priceNGN: 3000000,
        priceUSD: 2000,
        timeline: '5–8 weeks',
        features: [
          'Everything in Chatbot + Voice Agent, plus:',
          'Works on web, WhatsApp, phone calls, voice',
          'Closes deals, books meetings, sells products',
          'Redirects, answers, qualifies, follows up',
          'CRM integration (HubSpot, Pipedrive, etc.)',
          'Hot-lead handoff to human closers',
          'Multi-channel conversation history',
          'Custom workflows per channel',
          'Main dashboard with full analytics',
          'Priority support + monthly optimization'
        ],
        cta: 'Build my AI suite'
      }
    ]
  },

  custom: {
    tiers: [
      {
        id: 'custom-mvp',
        name: 'Custom Software MVP',
        tagline: 'Internal tool · Workflow automation',
        priceNGN: 1500000,
        priceUSD: 1000,
        timeline: '6–10 weeks',
        features: [
          'Custom web app for your workflow',
          'User accounts + roles',
          'Database design + API',
          'Reporting & dashboards',
          'Documentation + handover',
          '90 days of bug-fix support'
        ],
        cta: 'Build my MVP'
      },
      {
        id: 'custom-platform',
        name: 'Business Platform',
        tagline: 'Booking · Marketplace · Operations',
        priceNGN: 3000000,
        priceUSD: 2000,
        timeline: '12–20 weeks',
        features: [
          'Booking, marketplace, or operations system',
          'Customer + admin portals',
          'Payment integration',
          'Third-party API integrations',
          'Email + SMS automation',
          'Performance monitoring'
        ],
        cta: 'Plan a platform',
        popular: true
      },
      {
        id: 'custom-enterprise',
        name: 'Enterprise System',
        tagline: 'Multi-team · Compliance · Scale',
        priceNGN: null,
        priceUSD: null,
        timeline: '20+ weeks',
        features: [
          'Multi-tenant or org-wide system',
          'Role-based access control (RBAC)',
          'Audit logs + compliance (GDPR/SOC2)',
          'High-availability deployment',
          'Load + chaos testing',
          'Dedicated team + SLA'
        ],
        cta: 'Request proposal'
      }
    ]
  },

  marketing: {
    tiers: [
      {
        id: 'mkt-setup',
        name: 'Email + CRM Setup',
        tagline: 'Mailchimp · HubSpot · ConvertKit',
        priceNGN: 400000,
        priceUSD: 280,
        timeline: '1–2 weeks',
        features: [
          'Email platform setup (Mailchimp, etc.)',
          'CRM configuration (HubSpot, etc.)',
          'Lead-capture forms + landing pages',
          'Welcome + nurture sequences',
          'List segmentation',
          'Tracking + analytics'
        ],
        cta: 'Set up marketing'
      },
      {
        id: 'mkt-automation',
        name: 'Marketing Automation',
        tagline: 'Funnels · Drip campaigns · Scoring',
        priceNGN: 1000000,
        priceUSD: 700,
        timeline: '3–5 weeks',
        features: [
          'Multi-step funnel automation',
          'Behavior-triggered emails',
          'Lead scoring + qualification',
          'A/B testing framework',
          'Cross-channel (email + SMS + push)',
          'Custom dashboards'
        ],
        cta: 'Automate my marketing',
        popular: true
      },
      {
        id: 'mkt-integration',
        name: 'Advanced Integration',
        tagline: 'Custom pipelines · CDP · BI',
        priceNGN: null,
        priceUSD: null,
        timeline: 'Custom',
        features: [
          'Customer data platform (CDP)',
          'Custom data pipelines',
          'BI dashboards (Looker, Metabase)',
          'Multi-touch attribution',
          'Webhook + event streaming',
          'Data warehouse setup'
        ],
        cta: 'Request proposal'
      }
    ]
  },

  vtu: {
    tiers: [
      {
        id: 'vtu-website',
        name: 'VTU Website Only',
        tagline: 'Data · Airtime · Bills · Payments',
        priceNGN: 150000,
        priceUSD: 105,
        timeline: '2–3 weeks',
        features: [
          'Data sales (MTN, Airtel, Glo, 9mobile)',
          'Airtime sales (all networks)',
          'Electricity bill payment (prepaid & postpaid)',
          'Cable TV subscription (DSTV, GOTV, Startimes)',
          'Exam pins (WAEC, NECO, JAMB)',
          'Bulk SMS',
          'Airtime to cash conversion',
          'Payment gateway integration',
          'Admin dashboard',
          'Mobile-responsive website'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-app',
        name: 'VTU Mobile App',
        tagline: 'Android + iOS · Native app',
        priceNGN: 200000,
        priceUSD: 140,
        timeline: '4–6 weeks',
        features: [
          'All website features, plus:',
          'Native Android & iOS apps',
          'Push notifications',
          'In-app wallet & top-up',
          'Transaction history',
          'Biometric login (fingerprint/face)',
          'Share & referral system',
          'Customer support chat'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-app-playstore',
        name: 'VTU App + Play Store',
        tagline: 'Android + iOS · Play Store upload',
        priceNGN: 250000,
        priceUSD: 175,
        timeline: '5–7 weeks',
        features: [
          'All mobile app features, plus:',
          'Google Play Store upload & publishing',
          'Play Store optimization (ASO)',
          'App listing & screenshots',
          'Launch support'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-app-appstore',
        name: 'VTU App + App Store',
        tagline: 'Android + iOS · Play Store + App Store',
        priceNGN: 430000,
        priceUSD: 300,
        timeline: '6–8 weeks',
        features: [
          'All mobile app features, plus:',
          'Google Play Store upload',
          'Apple App Store upload',
          'App Store optimization (ASO)',
          'iOS & Android listing setup',
          'Launch support'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-all-no-upload',
        name: 'VTU Complete (No Store Upload)',
        tagline: 'Website + Android + iOS',
        priceNGN: 350000,
        priceUSD: 245,
        timeline: '6–8 weeks',
        features: [
          'All website features',
          'Native Android & iOS apps',
          'Push notifications',
          'In-app wallet & top-up',
          'Transaction history',
          'Biometric login',
          'Admin dashboard',
          'We deploy the website online'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-all-playstore',
        name: 'VTU Complete + Play Store',
        tagline: 'Website + Android + iOS + Play Store',
        priceNGN: 400000,
        priceUSD: 280,
        timeline: '7–9 weeks',
        features: [
          'All complete features, plus:',
          'Google Play Store upload & publishing',
          'Play Store optimization (ASO)',
          'Launch support'
        ],
        cta: 'Get started'
      },
      {
        id: 'vtu-all-everything',
        name: 'VTU Full Package',
        tagline: 'Website + Android + iOS + All Store Uploads',
        priceNGN: 580000,
        priceUSD: 405,
        timeline: '8–10 weeks',
        features: [
          'All complete features, plus:',
          'Google Play Store upload',
          'Apple App Store upload',
          'App Store optimization (ASO)',
          'iOS & Android listing setup',
          'Priority support',
          '90 days free support'
        ],
        cta: 'Get started',
        popular: true
      }
    ]
  }
}

export const formatPrice = (amount, symbol) => {
  if (amount === null) return 'Custom'
  return `${symbol}${amount.toLocaleString()}`
}
