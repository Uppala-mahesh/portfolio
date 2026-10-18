// ─── Site content ─────────────────────────────────────────────
export const identity = {
  name: 'Mahesh Uppala',
  short: 'MU',
  eyebrow: 'B.E. IT — VASAVI COLLEGE OF ENGINEERING · SEM V',
  status: 'Open to internships — 2027',
  intro:
    'I build software end to end — C binaries, Java services, full-stack AI tools — and I train data structures and algorithms daily for the 2027 placement season.',
  location: 'Hyderabad, Telangana, India',
  email: 'uppalamahesh777@gmail.com',
  github: 'https://github.com/Uppala-mahesh',
  linkedin: 'https://www.linkedin.com/in/mahesh-uppala-957328332',
  resume: '/Mahesh_Uppala_Resume.pdf',
}

// v3: stack folds into the project cards — four real sections after the hero
export const nav = [
  { label: 'Projects', href: '#projects' },
  { label: 'Coursework', href: '#coursework' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
]

// ─── Hero lamp (v3) — agent-written values, REVIEW THEM ───────────────
export const lampHero = {
  dark: '/nataraja-dark-1600.webp',
  gold: '/nataraja-gold-1600.webp',
  dsaStart: '2026-10-19', // DAY 001 of the DSA placement plan
  // Statue hotspots. at = [x, y] as fractions of the IMAGE (1600×1195).
  // r = reach, in image-height units. The lamp must rest ~0.5 s.
  hotspots: [
    { id: 'drum', at: [0.4, 0.4], r: 0.14, label: 'the drum · projects', href: '#projects' },
    { id: 'flame', at: [0.63, 0.37], r: 0.14, label: 'the flame · contact', href: '#contact' },
    { id: 'foot', at: [0.47, 0.79], r: 0.14, label: 'the foot · coursework', href: '#coursework' },
  ],
}

// live "DSA Day N" counter — Day 001 = 2026-10-19
export function dsaDay() {
  const start = new Date(lampHero.dsaStart + 'T00:00:00')
  const n = Math.floor((Date.now() - start.getTime()) / 86400000) + 1
  if (n >= 1) return `DSA Day ${String(n).padStart(3, '0')}`
  const out = 1 - n
  return `DSA Day 001 — ${out} day${out === 1 ? '' : 's'} out`
}

export const metrics = [
  { k: 'CGPA', v: '8.1 / 10', note: 'B.E. IT — Vasavi College' },
  { k: 'Certifications', v: '04', note: 'NPTEL + Cisco NetAcad' },
  { k: 'Projects shipped', v: '06', note: 'from C to full-stack AI' },
  { k: 'Season', v: '2027', note: 'placements — DSA daily' },
]

export const now = [
  { label: 'Studying', text: 'B.E. IT — Semester V at Vasavi College of Engineering, Hyderabad' },
  { label: 'Training', text: 'Data structures & algorithms daily — targeting the 2027 placement season' },
  { label: 'Building', text: 'Smart India Hackathon 2026 — a privacy-first browser agent (in progress)' },
  { label: 'Shipping', text: 'This site — designed and coded from scratch, no templates' },
]

// hidden annotation layer — the page answers the cursor
export const spotlight = [
  'cgpa 8.1 / 10',
  'DSA — daily',
  '2027 placement season',
  'SIH 2026 · in progress',
  'npm · git · vite',
  'joy of computing — 87%',
  'CCNA ×2 + cyber analyst',
  'hyderabad · telangana',
  '22 pages shipped',
  '10 tool-calling functions',
  'wake word: on',
  'C — from scratch',
  'react + tailwind',
  'tRPC = typed APIs',
  'mysql · mongodb',
  'os · cn · dbms · oop',
  'aptitude — mon/wed/fri',
  'no templates',
  'graph theory, for real',
  'day 001 — arrays',
  'spoken explanations — tues',
  'interview-mode cores',
]

export const nodeMap = {
  nodes: [
    { id: 'java', label: 'java', x: 220, y: 66, r: 36, detail: 'OOP core · course portfolio · interview language' },
    { id: 'c', label: 'c', x: 82, y: 138, r: 27, detail: 'Systems & memory · data structures coursework' },
    { id: 'sql', label: 'sql', x: 360, y: 148, r: 25, detail: 'MySQL · schema design · PL/SQL' },
    { id: 'python', label: 'python', x: 118, y: 282, r: 30, detail: 'ML pipelines · NumPy · scikit-learn' },
    { id: 'js', label: 'js', x: 296, y: 290, r: 34, detail: 'React · Node/Express · this site' },
  ],
  edges: [
    ['java', 'c'],
    ['java', 'sql'],
    ['java', 'js'],
    ['c', 'python'],
    ['python', 'js'],
    ['sql', 'js'],
    ['python', 'java'],
  ],
}

export const stack = [
  { group: 'Languages', items: ['C', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { group: 'Web', items: ['React', 'Node.js', 'Express', 'REST APIs', 'HTML5', 'CSS3'] },
  { group: 'AI / ML', items: ['NumPy', 'Pandas', 'scikit-learn', 'Model Training'] },
  { group: 'Data', items: ['MySQL', 'MongoDB', 'Database Design'] },
  { group: 'Core CS', items: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Networks'] },
  { group: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Linux'] },
]

export const projects = [
  {
    id: 'P.01',
    name: 'VCE Website Redesign',
    year: '2026',
    art: 'wireframe',
    blurb:
      'A 22-page redesign concept for my college website — static HTML/CSS/JS with its own design system, flashed straight to GitHub Pages.',
    chips: ['HTML', 'CSS', 'JavaScript', 'Design System'],
    stats: [
      ['pages', '22'],
      ['deploy', 'GitHub Pages'],
      ['assets', 'official VCE logo'],
    ],
    links: [
      { label: 'Live', href: 'https://uppala-mahesh.github.io/vce-website/' },
      { label: 'Code', href: 'https://github.com/Uppala-mahesh/vce-website' },
    ],
  },
  {
    id: 'P.02',
    name: 'J.A.R.V.I.S. — Personal AI Assistant',
    year: '2026',
    art: 'orbit',
    blurb:
      'A sci-fi HUD assistant with a streaming AI core (Gemini + fallback) and 10 real function-calling tools — weather, news, search, crypto, tasks, memory — plus push-to-talk voice and a wake word.',
    chips: ['JavaScript', 'Node.js', 'Express', 'Gemini API', 'SSE', 'WebAudio'],
    stats: [
      ['tools', '10 function calls'],
      ['ai', 'gemini + fallback'],
      ['voice', 'push-to-talk + wake word'],
      ['mode', 'demo without key'],
    ],
    links: [
      { label: 'Live', href: 'https://parable-flame.vercel.app/' },
      { label: 'Code', href: 'https://github.com/Uppala-mahesh/parable' },
    ],
  },
  {
    id: 'P.03',
    name: 'Banking Management System',
    year: '2025',
    art: 'ledger',
    blurb:
      'A Java desktop banking application built on OOP fundamentals with an SQL persistence layer — the project where I learned to model accounts, transactions, and exceptions properly.',
    chips: ['Java', 'OOP', 'MySQL'],
    stats: [
      ['core', 'object-oriented'],
      ['handling', 'exceptions modeled'],
      ['storage', 'SQL persistence'],
    ],
    links: [{ label: 'Code', href: 'https://github.com/Uppala-mahesh/banking-management-system' }],
  },
  {
    id: 'P.04',
    name: 'Battery Health — SOH / RUL Prediction',
    year: '2026',
    art: 'wave',
    blurb:
      'A full-stack TypeScript dashboard that predicts battery State-of-Health and Remaining Useful Life — typed end-to-end APIs, relational storage, live charts.',
    chips: ['TypeScript', 'React', 'tRPC', 'MySQL', 'Recharts'],
    stats: [
      ['api', 'tRPC end-to-end'],
      ['db', 'mysql + drizzle'],
      ['ui', 'live charts'],
    ],
    links: [],
  },
  {
    id: 'P.05',
    name: 'NyayAI — Legal Information Platform',
    year: '2026',
    art: 'nodes',
    blurb:
      'An AI-assisted platform concept that makes Indian legal information approachable — the prototype that pushed me into retrieval, speech, and pipeline design.',
    chips: ['Python', 'AI Pipelines', 'Prototype'],
    stats: [
      ['focus', 'retrieval'],
      ['input', 'speech'],
      ['arch', 'pipeline design'],
    ],
    links: [],
  },
  {
    id: 'P.06',
    name: 'Blockchain Simulator',
    year: '2025',
    art: 'chain',
    blurb:
      'A blockchain built from scratch in C — blocks, hashing, and chain validation with zero external libraries. My first taste of systems-programming discipline.',
    chips: ['C', 'Hashing', 'From Scratch'],
    stats: [
      ['libs', 'zero'],
      ['pieces', 'blocks + hashing'],
      ['validates', 'the chain'],
    ],
    links: [],
  },
]

export const semesterMap = [
  {
    sem: 'Sem III',
    year: '2025 — 26',
    courses: ['Discrete Mathematics', 'Digital Electronics & Logic Design', 'Data Structures + Lab', 'OOP with Java + Lab'],
  },
  {
    sem: 'Sem IV',
    year: '2026',
    courses: [
      'Probability & Statistics',
      'Computer Organization',
      'DBMS + Lab',
      'Design & Analysis of Algorithms + Lab',
      'Full-Stack Development + Lab',
      'Aptitude (SDC-III)',
    ],
  },
  {
    sem: 'Sem V',
    year: 'in progress',
    courses: [
      'Computer Networks + Lab',
      'AI & Machine Learning + Lab',
      'Software Engineering + Lab',
      'Operating Systems + Lab',
      'Transform Techniques (OE)',
      'Communication Skills-II',
      'Technical Skills-III',
      'Theme-Based Project',
    ],
  },
]

export const education = [
  {
    period: '2024 — present',
    title: 'B.E. Information Technology',
    org: 'Vasavi College of Engineering (Autonomous), Hyderabad',
    note: 'CGPA 8.1 / 10 · Semester V · DSA, OOP, DBMS, OS, CN, SE, AI&ML',
  },
  { period: '2022 — 2024', title: 'Intermediate — MPC', org: 'Sri Chaitanya Junior College', note: '92.7 %' },
  { period: 'up to 2022', title: 'Secondary School', org: 'Little Flower High School', note: 'CGPA 9.5 / 10' },
]

export const certifications = [
  { name: 'The Joy of Computing using Python', issuer: 'NPTEL', note: 'Scored 87% · Elite' },
  { name: 'CCNA: Introduction to Networks', issuer: 'Cisco Networking Academy', note: 'Routing & switching fundamentals' },
  { name: 'CCNA: Switching, Routing & Wireless Essentials', issuer: 'Cisco Networking Academy', note: 'Enterprise network operations' },
  { name: 'Junior Cybersecurity Analyst Career Path', issuer: 'Cisco Networking Academy', note: 'Security operations & threat basics' },
]

export const contact = {
  heading: "Let's build something.",
  line: 'Open to internships, small web projects, and any conversation about systems, backends, or AI tooling.',
}
