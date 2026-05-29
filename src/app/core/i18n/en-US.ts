import type { ptBR } from './pt-BR';

export const enUS: typeof ptBR = {
  nav: {
    about:    'About',
    process:  'How We Work',
    products: 'Products',
    projects: 'Projects',
    contact:  'Contact',
    openMenu: 'Open menu',
    mobileNav: 'Mobile navigation',
    gallery:  '← Gallery',
    back:     '← Home',
  },
  hero: {
    subtitle:    'Building websites, software and landing pages with sophisticated design',
    cta1:        'Explore projects',
    cta2:        'Request a quote',
    scrollLabel: 'Scroll to content',
  },
  services: {
    eyebrow: 'WHAT WE DO',
    title:   'SERVICES',
    website: {
      title: 'Website Development',
      desc:  'Corporate sites, portfolios and responsive web applications with exclusive design and high-quality code.',
    },
    landing: {
      title: 'Landing Pages',
      desc:  'High-conversion pages for campaigns, product launches and lead generation, optimized for performance.',
    },
    saas: {
      title: 'SaaS Development',
      desc:  'Complete SaaS products and web applications, from design to code, focused on scalability and user experience.',
    },
    frontend: {
      title: 'Frontend & Design System',
      desc:  'Specialized frontend development in Angular, reusable components and design systems for product teams.',
    },
  },
  about: {
    eyebrow: 'ABOUT US',
    title:   'WHO WE ARE',
    body:    "At YV Studio, we don't just build websites — we curate digital experiences. We are a frontend development studio specialized in website creation, high-conversion landing pages and SaaS products. We were born at the intersection of software engineering's technical rigor and the fluidity of premium design. Our mission is to elevate the digital presence of brands that don't settle for ordinary, delivering interfaces that are, at the same time, visual works of art and flawless performance machines.",
    quote:   'Simplicity is the ultimate sophistication.',
  },
  process: {
    eyebrow: 'HOW WE WORK',
    title:   'THE PROCESS',
    step1: {
      title: 'Briefing',
      desc:  'We uncover the need and study your company — your market, tone of voice and goals. No shortcuts.',
    },
    step2: {
      title: 'Prototype & Quote',
      desc:  'We deliver a prototype faithful to the final design and a fixed price — no surprises along the way.',
    },
    step3: {
      title: 'Development',
      desc:  '2 days for landing pages, 3 days for corporate sites and custom timelines for SaaS projects.',
    },
    step4: {
      title: 'Delivery',
      desc:  'Link delivered after payment confirmation, with 1 month of maintenance included for post-launch adjustments.',
    },
  },
  midCta: {
    eyebrow:  'READY TO START?',
    headline: 'From briefing to delivery in days — no fluff.',
    btn:      'Chat on WhatsApp now',
  },
  projects: {
    eyebrow: 'LANDING PAGES',
    title:   'PROJECTS',
    edimar: {
      tag:   'WEBSITE · ELECTRICAL SERVICES',
      badge: 'Recently delivered',
      title: 'Edimar Eletricista',
      year:  'Corporate website · 2025',
    },
    neapolitan: {
      tag:   'LANDING PAGE · GASTRONOMY',
      title: 'Bella Napoli',
      year:  'Editorial landing page · 2026',
    },
    impulso: {
      tag:   'LANDING PAGE · MARKETING',
      title: 'Impulso Marketing',
      year:  'Performance landing page · 2026',
    },
    mentePlena: {
      tag:   'LANDING PAGE · CLINICS',
      title: 'Clínica Mente Plena',
      year:  'Clinic landing page · 2026',
    },
    costa: {
      tag:   'LANDING PAGE · LAW',
      title: 'Costa & Associados',
      year:  'Law firm landing page · 2026',
    },
    seeAll: 'See all projects →',
  },
  products: {
    eyebrow: 'WHAT WE BUILD',
    title:   'PRODUCTS',
    kazaplan: {
      tag:   'SAAS · PRODUCT',
      badge: 'Under construction',
      title: 'KazaPlan',
      year:  'Product design & development · 2026',
    },
    luster: {
      title: 'Luster DS',
      year:  'Design system architecture · 2026',
    },
  },
  ecosystem: {
    eyebrow:      'THE ECOSYSTEM',
    title:        'STRATEGIC CONNECTIONS',
    ariaLabel:    'YV Studio ecosystem diagram',
    design:       { label: 'THINKING IN' },
    luster:       { label: 'A SUITE' },
    landingPages: { label: 'ALL TYPES OF' },
    kazaplan:     { label: 'SAAS FOR BUILDERS' },
  },
  contact: {
    eyebrow:          "LET'S TALK",
    title:            'CONTACT',
    name:             'Name',
    namePlaceholder:  'Your full name',
    phone:            'WhatsApp',
    phonePlaceholder: '+55 (11) 99999-9999',
    message:          'Message',
    msgPlaceholder:   'Tell us about your project...',
    send:             'Send via WhatsApp',
    waFloat:          'Chat on WhatsApp',
    formIntro:        'I found your website and would like to get a quote.',
    formName:         'Name:',
    formPhone:        'WhatsApp:',
    formMessage:      'Message:',
  },
  footer: {
    rights: '© MMXXVI YVSTUDIO — ALL RIGHTS RESERVED',
  },
  gallery: {
    eyebrow:      'Landing Pages · Templates',
    title:        'PAGES',
    subtitle:     'Editorial designs built to convert and impress.',
    filterLabel:  'Filter by segment',
    catalogLabel: 'Landing pages catalog',
    filters: {
      todos:        'All',
      advocacia:    'Legal',
      consultorios: 'Clinics',
      vendas:       'Sales & Marketing',
      construcao:   'Construction',
      outros:       'Others',
    },
    pages: {
      neapolitan: {
        title:       'The Annual Neapolitan Pilgrimage',
        category:    'Gastronomy · Events',
        description: 'An editorial journey through the art of Neapolitan pizza. Editorial design and Italian typography for high-end gastronomic events.',
      },
      theKinetic: {
        title:       'The Kinetic',
        category:    'Agency · Portfolio',
        description: 'Bold identity for creative agencies and studios. Dark editorial design with cyan accent, portfolio grid and contact form.',
      },
      architectSaaS: {
        title:       'ArchitectSaaS',
        category:    'Product · SaaS · Sales',
        description: 'Launch landing page for SaaS products. Lavender background, CSS dashboard, 3-plan pricing section and dark final CTA.',
      },
      apexKinetic: {
        title:       'Apex Kinetic',
        category:    'Marketing · Sales · Fitness',
        description: 'High-conversion landing page for supplements and performance. Dark design with neon accent, benefits section, testimonials and impactful CTA.',
      },
      monroeStone: {
        title:       'Monroe & Stone Legal',
        category:    'Litigation · Law',
        description: 'Aggressive identity for high-value litigation firms. Dark design with gold accent, impactful typography and relentless rhetoric.',
      },
      apexLaw: {
        title:       'Apex Law Group',
        category:    'M&A · Corporate Law',
        description: 'Sophisticated identity for corporate law firms. Serif typography, structured grid and navy/steel palette that conveys authority and precision.',
      },
      serenityMind: {
        title:       'Serenity Mind',
        category:    'Mental Health · Clinics',
        description: 'Humanized landing page for psychology and wellness clinics. Light and serene design with serif typography, testimonials and scheduling CTA.',
      },
      petra: {
        title:       'Petra Marmoraria',
        category:    'Marble · Construction',
        description: 'Premium landing page for high-end marble and cladding companies. Light theme with serif typography, CSS marble veins and integrated quote form.',
      },
    },
  },
  meta: {
    title:       'YV Studio | Website Creation, Software Development and Landing Pages',
    description: 'YV Studio — A studio specialized in website creation, software development, landing pages and premium SaaS products. Sophisticated frontend with impeccable performance.',
    ogTitle:     'YV Studio | Website Creation, Software Development and Landing Pages',
    ogDesc:      'Studio specialized in website creation, software development, landing pages and SaaS. Sophisticated frontend with premium design.',
    twTitle:     'YV Studio | Websites, Software and Landing Pages',
    twDesc:      'Studio specialized in website creation, software development, landing pages and premium SaaS.',
  },
};
