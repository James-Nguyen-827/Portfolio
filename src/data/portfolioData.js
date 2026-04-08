export const siteMeta = {
  title: 'James Nguyen',
  role: 'Researcher, Developer, 3D Designer',
  tagline: 'Building functional objects, interfaces, and printed experiments',
  intro:
    'A portfolio shaped like an early-2000s product microsite, focused on fabrication systems, interface experiments, and physical prototypes built to be handled, tested, and iterated.',
  availability: 'Open to research-heavy product and prototyping collaborations.',
  location: 'Based in California',
};

export const navigation = [
  { id: 'intro', label: 'Intro' },
  { id: 'projects', label: 'Projects' },
  { id: 'models', label: '3D Models' },
  { id: 'prints', label: '3D Prints' },
  { id: 'resume', label: 'Resume' },
  { id: 'contact', label: 'Contact' },
];

export const hero = {
  name: 'James Nguyen',
  role: 'Researcher, Developer, 3D Designer',
  tagline: 'Building functional objects, interfaces, and printed experiments',
  intro:
    'I design and prototype physical products, interactive systems, and fabrication workflows with a bias toward testing, iteration, and making the final object feel inevitable.',
  collageItems: [
    {
      image: '/media/project-kinetic.svg',
      label: 'Fabrication',
      caption: 'Kinetic fixture study',
      targetType: 'project',
      targetId: 'adaptive-camera-rig',
    },
    {
      image: '/media/project-dock.svg',
      label: 'Assembly',
      caption: 'Bench dock concept',
      targetType: 'project',
      targetId: 'bench-dock-system',
    },
    {
      image: '/media/model-caddy.svg',
      label: '3D Model',
      caption: 'Catalog-ready prototype',
      targetType: 'model',
      targetId: 'desk-organizer',
    },
    {
      image: '/media/print-fixture.svg',
      label: 'Print Output',
      caption: 'Fixture print snapshots',
      targetType: 'print',
      targetId: 'cable-guide-fixture',
    },
    {
      image: '/media/project-jig.svg',
      label: 'Interface',
      caption: 'Shop floor utility UI',
      targetType: 'project',
      targetId: 'precision-jig-platform',
    },
  ],
  highlights: [
    { label: 'Featured projects', value: '3' },
    { label: 'Current extras', value: '2-4' },
    { label: 'Model formats', value: 'STL / GLTF' },
    { label: 'Focus', value: 'Physical product + 3D' },
  ],
};

export const projects = [
  {
    id: 'adaptive-camera-rig',
    title: 'Adaptive Camera Rig',
    summary:
      'A modular printed rig system tuned for quick balance changes, repeatable mounting positions, and low-friction field adjustments.',
    status: 'Featured',
    featured: true,
    category: 'Physical Product',
    tools: ['Fusion 360', 'PLA-CF', 'Tolerance Testing'],
    process: ['Bracket iterations', 'Mounting studies', 'Field validation'],
    image: '/media/project-kinetic.svg',
    link: '#models',
  },
  {
    id: 'bench-dock-system',
    title: 'Bench Dock System',
    summary:
      'A workbench charging and storage dock that merges cable routing, tool parking, and service-friendly component access in one compact footprint.',
    status: 'Featured',
    featured: true,
    category: 'Fabrication Workflow',
    tools: ['Rapid Prototyping', 'Magnet Mounts', 'Assembly Design'],
    process: ['Cable routing', 'Snap-fit tuning', 'Bench deployment'],
    image: '/media/project-dock.svg',
    link: '#prints',
  },
  {
    id: 'precision-jig-platform',
    title: 'Precision Jig Platform',
    summary:
      'A family of jigs for repeatable small-part handling, designed around alignment confidence, fast swaps, and printed fixture durability.',
    status: 'Featured',
    featured: true,
    category: 'Research Prototype',
    tools: ['3D Printing', 'Fixturing', 'User Feedback'],
    process: ['Tolerance passes', 'Operator trials', 'Revision logging'],
    image: '/media/project-jig.svg',
    link: '#resume',
  },
  {
    id: 'sensor-sled-beta',
    title: 'Sensor Sled Beta',
    summary:
      'An in-progress mobile test platform for mounting compact sensors, isolating vibration, and changing payload geometry without a rebuild.',
    status: 'Current',
    featured: false,
    category: 'Current Work',
    tools: ['Iterative CAD', 'Fasteners', 'Motion Tests'],
    process: ['Payload balancing', 'Bracket swaps'],
    image: '/media/project-lab.svg',
    link: '#contact',
  },
  {
    id: 'portable-parts-library',
    title: 'Portable Parts Library',
    summary:
      'A portable archive system for cataloging shop-ready components, printed inserts, and reference geometry for repeat builds.',
    status: 'Current',
    featured: false,
    category: 'Current Work',
    tools: ['Catalog Structure', 'Storage Design', 'Reusable Inserts'],
    process: ['Inventory mapping', 'Module refinement'],
    image: '/media/project-archive.svg',
    link: '#models',
  },
];

export const models = [
  {
    id: 'ergonomic-grip',
    title: 'Ergonomic Grip Mockup',
    format: 'stl',
    fileUrl: '/models/ergonomic-grip.stl',
    thumbnail: '/media/model-grip.svg',
    description:
      'A tapered handheld form study for checking finger wrap, print orientation, and edge break comfort.',
    downloadUrl: '/models/ergonomic-grip.stl',
    specLabel: 'Prototype 01 / STL',
  },
  {
    id: 'fixture-bracket',
    title: 'Fixture Bracket Study',
    format: 'stl',
    fileUrl: '/models/fixture-bracket.stl',
    thumbnail: '/media/model-bracket.svg',
    description:
      'An L-bracket concept built to evaluate mounting clearance, gusset strength, and assembly access.',
    downloadUrl: '/models/fixture-bracket.stl',
    specLabel: 'Prototype 02 / STL',
  },
  {
    id: 'desk-organizer',
    title: 'Desk Organizer Shell',
    format: 'gltf',
    fileUrl: '/models/desk-organizer.gltf',
    thumbnail: '/media/model-caddy.svg',
    description:
      'A compact product-catalog style concept used here to validate GLTF support and a more polished display finish.',
    downloadUrl: '/models/desk-organizer.gltf',
    specLabel: 'Prototype 03 / GLTF',
  },
];

export const prints = [
  {
    id: 'cable-guide-fixture',
    title: 'Cable Guide Fixture',
    image: '/media/print-fixture.svg',
    description:
      'Printed clamp-and-guide assembly for routing cables through tight enclosures with cleaner service access.',
    material: 'PLA-CF',
    specLabel: 'Batch A',
  },
  {
    id: 'sensor-mount-block',
    title: 'Sensor Mount Block',
    image: '/media/print-mount.svg',
    description:
      'Compact print for isolating a small sensor package while keeping mounting changes fast and repeatable.',
    material: 'PETG',
    specLabel: 'Batch B',
  },
  {
    id: 'protective-enclosure',
    title: 'Protective Enclosure',
    image: '/media/print-enclosure.svg',
    description:
      'A vented shell prototype balancing access ports, structural ribs, and print time for short-run builds.',
    material: 'ASA',
    specLabel: 'Batch C',
  },
  {
    id: 'alignment-sled',
    title: 'Alignment Sled',
    image: '/media/print-sled.svg',
    description:
      'A low-profile alignment sled for handling small parts during setup, inspection, and rework.',
    material: 'PLA',
    specLabel: 'Batch D',
  },
];

export const resume = {
  bio:
    'My work lives between research, fabrication, and interface thinking. I like projects that start with a practical need, pass through structured experimentation, and end as something tangible, legible, and easy to use.',
  experience: [
    {
      period: 'Current',
      title: 'Independent Researcher + Prototype Builder',
      organization: 'Personal Practice',
      summary:
        'Developing fabrication-focused product concepts, printed tools, and interface experiments centered on usability, modularity, and iteration speed.',
    },
    {
      period: 'Recent',
      title: 'Product Development Collaborator',
      organization: 'Prototype and Build Projects',
      summary:
        'Worked across CAD refinement, physical mockups, test planning, and practical decision-making for small-batch prototype systems.',
    },
    {
      period: 'Ongoing',
      title: 'Developer',
      organization: 'Self-Directed Projects',
      summary:
        'Building lightweight tools and interfaces that support product thinking, visualization, and hands-on experimentation.',
    },
  ],
  skills: [
    {
      label: 'Fabrication',
      items: ['FDM 3D printing', 'Fixture design', 'Rapid iteration', 'Tolerance review'],
    },
    {
      label: 'Design',
      items: ['CAD modeling', 'Physical product thinking', 'Assembly planning', 'Visual systems'],
    },
    {
      label: 'Development',
      items: ['React', 'Interface prototyping', 'Interactive media', 'Data-driven components'],
    },
    {
      label: 'Research',
      items: ['Testing plans', 'Observation', 'Revision tracking', 'Constraint mapping'],
    },
  ],
  education: [
    {
      label: 'Background',
      value: 'Hands-on technical exploration across product design, development, and fabrication workflows.',
    },
    {
      label: 'Learning mode',
      value: 'Project-based, research-driven, and heavily informed by iteration through making.',
    },
  ],
};

export const contacts = [
  {
    label: 'Email',
    href: 'mailto:your-email@example.com',
    displayText: 'your-email@example.com',
  },
  {
    label: 'GitHub',
    href: 'https://github.com/yourhandle',
    displayText: 'github.com/yourhandle',
  },
  {
    label: 'LinkedIn',
    href: 'https://linkedin.com/in/your-handle',
    displayText: 'linkedin.com/in/your-handle',
  },
];
