// ---------------------------------------------------------------------------
// Single source of truth for all site content.
// ---------------------------------------------------------------------------

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

export const nav = [
  { label: 'Stack', href: '#stack' },
  { label: 'Projects', href: '#projects' },
  { label: 'Credentials', href: '#credentials' },
  { label: 'Contact', href: '#contact' },
]

// ---------------------------------------------------------------------------
// Stack node-map (hero signature): nodes + edges rendered as an SVG graph.
// Coordinates live in a 440 × 360 viewBox.
// ---------------------------------------------------------------------------

export const nodeMap = {
  nodes: [
    { id: 'java', label: 'Java', cx: 220, cy: 66, r: 36, detail: 'OOP core · course portfolio · interview language' },
    { id: 'c', label: 'C', cx: 82, cy: 138, r: 27, detail: 'Systems & memory · data structures coursework' },
    { id: 'sql', label: 'SQL', cx: 360, cy: 148, r: 25, detail: 'MySQL · schema design · PL/SQL' },
    { id: 'python', label: 'Py', cx: 118, cy: 282, r: 30, detail: 'ML pipelines · NumPy · scikit-learn' },
    { id: 'js', label: 'JS', cx: 296, cy: 290, r: 34, detail: 'React · Node/Express · this site' },
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
  { label: 'Languages', items: ['C', 'Java', 'Python', 'JavaScript', 'SQL'] },
  { label: 'Web', items: ['React', 'Node.js', 'Express', 'REST APIs', 'HTML5', 'CSS3'] },
  { label: 'AI / ML', items: ['NumPy', 'Pandas', 'scikit-learn', 'Model Training'] },
  { label: 'Data', items: ['MySQL', 'MongoDB', 'Database Design'] },
  { label: 'Core CS', items: ['Data Structures', 'Algorithms', 'DBMS', 'Operating Systems', 'Networks'] },
  { label: 'Tools', items: ['Git', 'GitHub', 'VS Code', 'Linux'] },
]

// ---------------------------------------------------------------------------
// Projects — specimen rows, ordered strongest-first.
// `art` selects the procedural SVG panel drawn for each row.
// ---------------------------------------------------------------------------

export const projects = [
  {
    id: 'P.01',
    name: 'VCE Website Redesign',
    year: '2026',
    blurb:
      'A 22-page redesign concept for my college website — static HTML/CSS/JS with its own design system, flashed straight to GitHub Pages.',
    chips: ['HTML', 'CSS', 'JavaScript', 'Design System'],
    links: [
      { label: 'Live', href: 'https://uppala-mahesh.github.io/vce-website/' },
      { label: 'Code', href: 'https://github.com/Uppala-mahesh/vce-website' },
    ],
    art: 'wireframe',
  },
  {
    id: 'P.02',
    name: 'J.A.R.V.I.S. — Personal AI Assistant',
    year: '2026',
    blurb:
      'A sci-fi HUD assistant with a streaming AI core (Gemini + fallback) and 10 real function-calling tools — weather, news, search, crypto, tasks, memory — plus push-to-talk voice and a wake word.',
    chips: ['JavaScript', 'Node.js', 'Express', 'Gemini API', 'SSE', 'WebAudio'],
    links: [
      { label: 'Live', href: 'https://parable-flame.vercel.app' },
      { label: 'Code', href: 'https://github.com/Uppala-mahesh/parable' },
    ],
    art: 'orbit',
  },
  {
    id: 'P.03',
    name: 'Banking Management System',
    year: '2025',
    blurb:
      'A Java desktop banking application built on OOP fundamentals with an SQL persistence layer — the project where I learned to model accounts, transactions, and exceptions properly.',
    chips: ['Java', 'OOP', 'MySQL'],
    links: [{ label: 'Code', href: 'https://github.com/Uppala-mahesh/banking-management-system' }],
    art: 'ledger',
  },
  {
    id: 'P.04',
    name: 'Battery Health — SOH / RUL Prediction',
    year: '2026',
    blurb:
      'A full-stack TypeScript dashboard that predicts battery State-of-Health and Remaining Useful Life — typed end-to-end APIs, relational storage, live charts.',
    chips: ['TypeScript', 'React', 'tRPC', 'MySQL', 'Recharts'],
    links: [],
    art: 'wave',
  },
  {
    id: 'P.05',
    name: 'NyayAI — Legal Information Platform',
    year: '2026',
    blurb:
      'An AI-assisted platform concept that makes Indian legal information approachable — the prototype that pushed me into retrieval, speech, and pipeline design.',
    chips: ['Python', 'AI Pipelines', 'Prototype'],
    links: [],
    art: 'nodes',
  },
  {
    id: 'P.06',
    name: 'Blockchain Simulator',
    year: '2025',
    blurb:
      'A blockchain built from scratch in C — blocks, hashing, and chain validation with zero external libraries. My first taste of systems-programming discipline.',
    chips: ['C', 'Hashing', 'From Scratch'],
    links: [],
    art: 'chain',
  },
]

export const education = [
  {
    period: '2024 — PRESENT',
    title: 'B.E. Information Technology',
    org: 'Vasavi College of Engineering (Autonomous), Hyderabad',
    note: 'CGPA 8.1 / 10 · Currently in Semester V · Coursework: DSA, OOP, DBMS, OS, CN, SE, AI&ML',
  },
  {
    period: '2022 — 2024',
    title: 'Intermediate — MPC',
    org: 'Sri Chaitanya Junior College',
    note: '92.7%',
  },
  {
    period: 'UP TO 2022',
    title: 'Secondary School',
    org: 'Little Flower High School',
    note: 'CGPA 9.5 / 10',
  },
]

export const certifications = [
  {
    name: 'The Joy of Computing using Python',
    issuer: 'NPTEL',
    detail: 'Scored 87% · Elite',
  },
  {
    name: 'CCNA: Introduction to Networks',
    issuer: 'Cisco Networking Academy',
    detail: 'Routing & switching fundamentals',
  },
  {
    name: 'CCNA: Switching, Routing & Wireless Essentials',
    issuer: 'Cisco Networking Academy',
    detail: 'Enterprise network operations',
  },
  {
    name: 'Junior Cybersecurity Analyst Career Path',
    issuer: 'Cisco Networking Academy',
    detail: 'Security operations & threat basics',
  },
]

export const now = [
  { k: 'Studying', v: 'B.E. IT — Semester V at Vasavi College of Engineering, Hyderabad' },
  { k: 'Training', v: 'Data structures & algorithms daily — targeting the 2027 placement season' },
  { k: 'Building', v: 'Smart India Hackathon 2026 — a privacy-first browser agent (in progress)' },
  { k: 'Shipping', v: 'This site — designed and coded from scratch, no templates' },
]

export const contact = {
  heading: "Let's build something.",
  line: 'Open to internships, small web projects, and any conversation about systems, backends, or AI tooling.',
}
