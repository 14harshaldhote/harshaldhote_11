// All site content lives here. Update this file to change what the portfolio says.

export const profile = {
  name: 'Harshal Dhote',
  firstName: 'Harshal',
  role: 'Software Engineer',
  location: 'Pune, India',
  tagline: 'I build backend systems that hold up to an audit.',
  intro:
    'Most of my work is Java and Spring Boot for banks and other regulated businesses: approval chains, permissions, audit trails and the background jobs that keep documents moving. I like the parts of software people only notice when they break, and making sure they don’t.',
  email: 'dhoteh020@gmail.com',
  github: { handle: '14harshaldhote', url: 'https://github.com/14harshaldhote' },
  linkedin: { handle: 'harshal-dhote', url: 'https://www.linkedin.com/in/harshal-dhote-6929b7211/' },
  resume: '/Harshal_Dhote_Resume.pdf',
  // Hero card: intentionally personal, no employer details.
  card: [
    ['Role', 'Software Engineer'],
    ['Based in', 'Pune, India'],
    ['Main stack', 'Java · Spring Boot · MySQL'],
  ],
};

export const currentJob = {
  role: 'Software Engineer',
  company: 'Ardur Technology',
  since: 'April 2024',
  location: 'Pune',
};

// Selected work. `diagram` picks a figure from src/components/diagrams (leave it out for text only).
export const work = [
  {
    tag: 'At work · Banking',
    title: 'Approvals a bank can trust',
    summary:
      'Banks don’t let one person move money. I built the Spring Boot services behind customer onboarding, credit processing and transaction approvals, where a request climbs through up to six checker levels, each with its own permissions, before it goes through.',
    highlights: [
      'Maker and checker routing across six authorization levels',
      'Every state change recorded, so auditors can replay any decision',
      'Slow approval and reporting queries rewritten to answer in under a second',
    ],
    stack: ['Java', 'Spring Boot', 'MySQL'],
    diagram: 'approval',
    figure: 1,
    caption: 'a request climbing six checker levels, every step written to the audit log',
  },
  {
    tag: 'At work · Automation',
    title: 'Document review in minutes, not hours',
    summary:
      'Reviewers were spending one to two hours on every document. I wrote a Python rule engine, a decision tree of 150+ business rules, that does the first pass, and gave operators a way to correct it whenever it gets something wrong.',
    highlights: [
      'Review time down to 10 to 20 minutes per document',
      'Operator corrections feed straight back into the rules',
      'Long jobs pick up where they failed instead of starting over',
    ],
    stack: ['Python', 'Java', 'MySQL'],
    diagram: 'rules',
    figure: 2,
    caption: 'rules make the first call; people correct it, and the rules learn',
  },
  {
    tag: 'Project · 2024',
    title: 'Garage Management CRM',
    summary:
      'A CRM for running a garage: job cards, inventory and billing. Built so that 50+ garages can share one system without ever seeing each other’s data.',
    highlights: [
      'Tenant isolation enforced at the query layer, not left to the UI',
      'Payment retries and webhook reconciliation, so nobody is charged twice',
      'Lookups under a second with Redis caching, secured with JWT, OAuth2 and roles',
    ],
    stack: ['Java', 'Spring Boot', 'MySQL', 'Redis', 'AWS'],
    diagram: 'tenants',
    figure: 3,
    caption: 'every garage gets its own lane down to its own rows',
  },
  {
    tag: 'Project · 2025',
    title: 'Product Importer',
    summary:
      'Upload a CSV with half a million products and watch it import live. Celery workers do the heavy lifting in the background, so nothing times out, and progress streams straight back to the browser.',
    highlights: [
      'Safe to run again: idempotent upserts, SKUs matched regardless of case',
      'Live progress streamed straight to the browser',
      'Filtering, bulk actions and webhooks for product changes',
    ],
    stack: ['Django', 'Celery', 'Redis', 'PostgreSQL'],
    link: { label: 'Source on GitHub', url: 'https://github.com/14harshaldhote/fulFil' },
    diagram: 'import',
    figure: 4,
    caption: 'rows queued, crunched by workers, progress streamed back',
  },
];

export const otherWork = [
  {
    title: 'ShopSpring',
    description: 'An online store with a Spring Boot API, a React front end and accounts secured with JWT.',
    year: '2024',
    link: { label: 'GitHub', url: 'https://github.com/14harshaldhote/ShopSpring-JWT-React-MySQL' },
  },
  {
    title: 'Crop disease detection',
    description:
      'A YOLOv5 model that spots crop diseases in the field, running on a Raspberry Pi 4. Published at ICPCSN 2023.',
    year: '2023',
    link: { label: 'IEEE paper', url: 'https://ieeexplore.ieee.org/document/10266199' },
  },
];

export const about = [
  'I’m a software engineer in Pune. I studied in Nagpur, first a diploma in Computer Technology and then a B.Tech in Computer Science, and did CDAC’s PG Diploma in Advanced Computing before moving into backend work.',
  'These days I spend most of my time on the parts of a system that have to be right: who is allowed to do what, what happens when a job fails halfway, and why a query is slower than it should be.',
  'Outside of that I’m drawn to AI and machine learning, cloud infrastructure and IoT. One of my earlier projects put a crop disease detection model on a Raspberry Pi and became a paper published by IEEE.',
];

export const toolkit = [
  { group: 'Main stack', items: ['Java', 'Spring Boot', 'MySQL', 'SQL'] },
  { group: 'Also use', items: ['Python', 'FastAPI', 'Django', 'Redis', 'Celery', 'REST APIs'] },
  { group: 'Security', items: ['RBAC', 'JWT', 'OAuth2'] },
  { group: 'Have worked with', items: ['PostgreSQL', 'Docker', 'AWS', 'React', 'Tesseract OCR', 'OpenCV'] },
];

export const education = [
  { school: 'Centre for Development of Advanced Computing (CDAC)', degree: 'PG Diploma in Advanced Computing' },
  { school: 'G H Raisoni College of Engineering', degree: 'B.Tech., Computer Science' },
  { school: 'Shri Datta Meghe Polytechnic', degree: 'Diploma in Computer Technology' },
];
