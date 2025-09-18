import { Software, Category } from '../types';

export const categories: Category[] = [
  // Platform Categories
  {
    id: 'windows',
    name: 'Windows Software',
    description: 'Software and applications for Windows operating system',
    icon: 'Monitor',
    type: 'platform',
    order: 1
  },
  {
    id: 'macos',
    name: 'macOS Software',
    description: 'Software and applications for macOS operating system',
    icon: 'Laptop',
    type: 'platform',
    order: 2
  },
  {
    id: 'android-games',
    name: 'Android Games',
    description: 'Games and entertainment for Android devices',
    icon: 'Smartphone',
    type: 'platform',
    order: 3
  },
  {
    id: 'ios-games',
    name: 'iOS Games',
    description: 'Games and entertainment for iOS devices',
    icon: 'Tablet',
    type: 'platform',
    order: 4
  },
  
  // Windows Subcategories
  {
    id: 'windows-tools',
    name: 'Tools & Utilities',
    description: 'System tools and utility software for Windows',
    icon: 'Wrench',
    parentId: 'windows',
    type: 'subcategory',
    order: 1
  },
  {
    id: 'windows-security',
    name: 'Security',
    description: 'Antivirus and security software for Windows',
    icon: 'ShieldCheck',
    parentId: 'windows',
    type: 'subcategory',
    order: 2
  },
  {
    id: 'windows-multimedia',
    name: 'Multimedia',
    description: 'Video, audio and graphics software for Windows',
    icon: 'Video',
    parentId: 'windows',
    type: 'subcategory',
    order: 3
  },
  {
    id: 'windows-design',
    name: 'Design & Graphics',
    description: 'Design and graphics software for Windows',
    icon: 'Palette',
    parentId: 'windows',
    type: 'subcategory',
    order: 4
  },
  {
    id: 'windows-development',
    name: 'Development',
    description: 'Programming and development tools for Windows',
    icon: 'Code2',
    parentId: 'windows',
    type: 'subcategory',
    order: 5
  },
  {
    id: 'windows-productivity',
    name: 'Productivity',
    description: 'Office and business software for Windows',
    icon: 'Gamepad2',
    parentId: 'windows',
    type: 'subcategory',
    order: 6
  },
  
  // macOS Subcategories
  {
    id: 'macos-tools',
    name: 'Tools & Utilities',
    description: 'System tools and utility software for macOS',
    icon: 'Wrench',
    parentId: 'macos',
    type: 'subcategory',
    order: 1
  },
  {
    id: 'macos-security',
    name: 'Security',
    description: 'Security software for macOS',
    icon: 'ShieldCheck',
    parentId: 'macos',
    type: 'subcategory',
    order: 2
  },
  {
    id: 'macos-multimedia',
    name: 'Multimedia',
    description: 'Video, audio and graphics software for macOS',
    icon: 'Video',
    parentId: 'macos',
    type: 'subcategory',
    order: 3
  },
  {
    id: 'macos-design',
    name: 'Design & Graphics',
    description: 'Design and graphics software for macOS',
    icon: 'Palette',
    parentId: 'macos',
    type: 'subcategory',
    order: 4
  },
  {
    id: 'macos-development',
    name: 'Development',
    description: 'Programming and development tools for macOS',
    icon: 'Code2',
    parentId: 'macos',
    type: 'subcategory',
    order: 5
  },
  {
    id: 'macos-productivity',
    name: 'Productivity',
    description: 'Office and business software for macOS',
    icon: 'Briefcase',
    parentId: 'macos',
    type: 'subcategory',
    order: 6
  },
  
  // Android Games Subcategories
  {
    id: 'android-action',
    name: 'Action Games',
    description: 'Action and adventure games for Android',
    icon: 'Zap',
    parentId: 'android-games',
    type: 'subcategory',
    order: 1
  },
  {
    id: 'android-puzzle',
    name: 'Puzzle Games',
    description: 'Puzzle and strategy games for Android',
    icon: 'Puzzle',
    parentId: 'android-games',
    type: 'subcategory',
    order: 2
  },
  {
    id: 'android-racing',
    name: 'Racing Games',
    description: 'Racing and sports games for Android',
    icon: 'Car',
    parentId: 'android-games',
    type: 'subcategory',
    order: 3
  },
  
  // iOS Games Subcategories
  {
    id: 'ios-action',
    name: 'Action Games',
    description: 'Action and adventure games for iOS',
    icon: 'Zap',
    parentId: 'ios-games',
    type: 'subcategory',
    order: 1
  },
  {
    id: 'ios-puzzle',
    name: 'Puzzle Games',
    description: 'Puzzle and strategy games for iOS',
    icon: 'Puzzle',
    parentId: 'ios-games',
    type: 'subcategory',
    order: 2
  },
  {
    id: 'ios-racing',
    name: 'Racing Games',
    description: 'Racing and sports games for iOS',
    icon: 'Car',
    parentId: 'ios-games',
    type: 'subcategory',
    order: 3
  }
];

export const software: Software[] = [
  {
    id: '1',
    title: 'Cyberpunk 2077',
    category: 'windows-tools',
    description: 'Open-world action-adventure RPG set in futuristic Night City',
    fullDescription: 'Cyberpunk 2077 is an open-world, action-adventure RPG set in the dark future of Night City — a dangerous megalopolis obsessed with power, glamor, and ceaseless body modification. You play as V, a mercenary outlaw going after a one-of-a-kind implant that is the key to immortality.',
    version: '2.1.0',
    size: '70.2 GB',
    developer: 'CD PROJEKT RED',
    releaseDate: '2020-12-10',
    requirements: [
      'Windows 10 64-bit',
      'Intel Core i5-3570K or AMD FX-8310',
      '8 GB RAM',
      'NVIDIA GTX 780 or AMD Radeon RX 470',
      '70 GB available space'
    ],
    features: [
      'Immersive open world',
      'Deep character customization',
      'Multiple story paths',
      'Advanced AI systems',
      'Ray tracing support',
      'DLSS technology'
    ],
    screenshots: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg'
    ],
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    downloadUrl: '#',
    rating: 4.5,
    downloads: 2500000,
    tags: ['RPG', 'Open World', 'Action', 'Futuristic']
  },
  {
    id: '2',
    title: 'Adobe Photoshop 2024',
    category: 'windows-design',
    description: 'Professional image editing and graphic design software',
    fullDescription: 'Adobe Photoshop is the industry standard for digital image processing and editing, used by photographers, designers, web developers, and creative professionals worldwide.',
    version: '25.0',
    size: '4.2 GB',
    developer: 'Adobe Inc.',
    releaseDate: '2023-10-18',
    requirements: [
      'Windows 10 64-bit (v1903) or later',
      'Intel or AMD processor with 64-bit support',
      '8 GB RAM (16 GB recommended)',
      'DirectX 12 compatible graphics card',
      '4 GB available space'
    ],
    features: [
      'AI-powered tools',
      'Advanced layer system',
      'Professional retouching',
      'Creative filters and effects',
      'Cloud sync',
      'Mobile integration'
    ],
    screenshots: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    downloadUrl: '#',
    rating: 4.8,
    downloads: 5200000,
    tags: ['Design', 'Photo Editing', 'Creative', 'Professional']
  },
  {
    id: '3',
    title: 'Microsoft Office 2024',
    category: 'windows-productivity',
    description: 'Complete productivity suite with Word, Excel, PowerPoint, and more',
    fullDescription: 'Microsoft Office 2024 is the latest version of the world\'s most popular productivity suite, featuring enhanced collaboration tools, AI assistance, and improved performance.',
    version: '16.0',
    size: '3.8 GB',
    developer: 'Microsoft Corporation',
    releaseDate: '2023-09-26',
    requirements: [
      'Windows 10 or Windows 11',
      '4 GB RAM (8 GB recommended)',
      '4 GB available disk space',
      '1280 x 768 screen resolution',
      'Internet connection required'
    ],
    features: [
      'AI-powered writing assistant',
      'Real-time collaboration',
      'Cloud storage integration',
      'Advanced data analysis',
      'Professional templates',
      'Cross-platform compatibility'
    ],
    screenshots: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg'
    ],
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    downloadUrl: '#',
    rating: 4.6,
    downloads: 8900000,
    tags: ['Office', 'Productivity', 'Business', 'Documents']
  },
  {
    id: '4',
    title: 'Visual Studio Code',
    category: 'windows-development',
    description: 'Lightweight but powerful source code editor',
    fullDescription: 'Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop and is available for Windows, macOS and Linux.',
    version: '1.84.2',
    size: '85.2 MB',
    developer: 'Microsoft',
    releaseDate: '2023-11-09',
    requirements: [
      'Windows 8.1 or later',
      '1.6 GHz processor',
      '1 GB RAM',
      '200 MB available space'
    ],
    features: [
      'IntelliSense code completion',
      'Built-in Git integration',
      'Extensive extension marketplace',
      'Integrated terminal',
      'Debugging support',
      'Multi-language support'
    ],
    screenshots: [
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'
    ],
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    downloadUrl: '#',
    rating: 4.9,
    downloads: 15000000,
    tags: ['IDE', 'Code Editor', 'Programming', 'Development']
  },
  {
    id: '5',
    title: 'Malwarebytes Premium',
    category: 'security',
    description: 'Advanced anti-malware and cybersecurity protection',
    fullDescription: 'Malwarebytes Premium provides comprehensive protection against malware, ransomware, and other advanced threats with real-time monitoring.',
    version: '4.5.17',
    size: '124 MB',
    developer: 'Malwarebytes',
    releaseDate: '2023-10-15',
    requirements: [
      'Windows 7 SP1 or later',
      '2 GB RAM',
      '250 MB available space',
      'Internet connection'
    ],
    features: [
      'Real-time protection',
      'Anti-ransomware',
      'Web protection',
      'Anti-exploit',
      'Malicious website blocking',
      'Fast scanning'
    ],
    screenshots: [
      'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg'
    ],
    image: 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg',
    downloadUrl: '#',
    rating: 4.7,
    downloads: 3200000,
    tags: ['Antivirus', 'Security', 'Protection', 'Malware']
  },
  {
    id: '6',
    title: 'CCleaner Professional',
    category: 'windows-tools',
    description: 'System optimization and privacy cleaning tool',
    fullDescription: 'CCleaner Professional is the premium version of the world\'s most popular PC optimization tool, helping you clean, optimize, and maintain your system.',
    version: '6.17.0',
    size: '45.8 MB',
    developer: 'Piriform',
    releaseDate: '2023-11-01',
    requirements: [
      'Windows 7 SP1 or later',
      '1 GB RAM',
      '50 MB available space'
    ],
    features: [
      'Automatic cleaning',
      'Real-time monitoring',
      'Priority customer support',
      'Scheduled cleaning',
      'File recovery',
      'Registry cleaning'
    ],
    screenshots: [
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'
    ],
    image: 'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg',
    downloadUrl: '#',
    rating: 4.4,
    downloads: 6500000,
    tags: ['System Cleaner', 'Optimization', 'Utilities', 'Performance']
  }
  ,
  {
    id: '7',
    title: 'Spotify Desktop',
    category: 'windows-multimedia',
    description: 'Music streaming application with offline downloads',
    fullDescription: 'Spotify Desktop brings millions of songs to your computer with high-quality streaming, offline downloads, and personalized playlists.',
    version: '1.2.25',
    size: '142 MB',
    developer: 'Spotify AB',
    releaseDate: '2023-11-15',
    requirements: [
      'Windows 7 or later',
      '1 GB RAM',
      '200 MB available space',
      'Internet connection'
    ],
    features: [
      'High-quality streaming',
      'Offline downloads',
      'Personalized playlists',
      'Social sharing',
      'Cross-device sync',
      'Podcast support'
    ],
    screenshots: [
      'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
      'https://images.pexels.com/photos/744318/pexels-photo-744318.jpeg'
    ],
    image: 'https://images.pexels.com/photos/167092/pexels-photo-167092.jpeg',
    downloadUrl: '#',
    rating: 4.6,
    downloads: 12000000,
    tags: ['Music', 'Streaming', 'Entertainment', 'Audio']
  },
  {
    id: '8',
    title: 'Discord',
    category: 'windows-productivity',
    description: 'Voice, video and text communication platform for communities',
    fullDescription: 'Discord is a free voice, video, and text chat app used by millions of people to talk and hang out with their communities and friends.',
    version: '1.0.9015',
    size: '89.5 MB',
    developer: 'Discord Inc.',
    releaseDate: '2023-11-20',
    requirements: [
      'Windows 8.1 or later',
      '2 GB RAM',
      '100 MB available space',
      'Internet connection'
    ],
    features: [
      'Voice & video calls',
      'Text messaging',
      'Screen sharing',
      'Server communities',
      'Bot integration',
      'File sharing'
    ],
    screenshots: [
      'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
      'https://images.pexels.com/photos/1181677/pexels-photo-1181677.jpeg'
    ],
    image: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
    downloadUrl: '#',
    rating: 4.7,
    downloads: 25000000,
    tags: ['Communication', 'Gaming', 'Community', 'Voice Chat']
  },
  {
    id: '9',
    title: 'Steam',
    category: 'android-action',
    description: 'Digital distribution platform for PC gaming',
    fullDescription: 'Steam is the ultimate destination for playing, discussing, and creating games with millions of players worldwide.',
    version: '3.5.17',
    size: '2.1 GB',
    developer: 'Valve Corporation',
    releaseDate: '2023-10-30',
    requirements: [
      'Windows 10 or later',
      '4 GB RAM',
      '5 GB available space',
      'Internet connection'
    ],
    features: [
      'Game library management',
      'Automatic updates',
      'Cloud saves',
      'Community features',
      'Workshop content',
      'Big Picture mode'
    ],
    screenshots: [
      'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
      'https://images.pexels.com/photos/1174775/pexels-photo-1174775.jpeg'
    ],
    image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg',
    downloadUrl: '#',
    rating: 4.8,
    downloads: 35000000,
    tags: ['Gaming Platform', 'Digital Store', 'Community', 'PC Gaming']
  },
  {
    id: '10',
    title: 'OBS Studio',
    category: 'macos-multimedia',
    description: 'Free and open source software for video recording and live streaming',
    fullDescription: 'OBS Studio is a powerful tool for content creators, offering professional-grade recording and streaming capabilities.',
    version: '30.0.2',
    size: '95.3 MB',
    developer: 'OBS Project',
    releaseDate: '2023-11-12',
    requirements: [
      'Windows 10 64-bit',
      '4 GB RAM',
      'DirectX 11 compatible GPU',
      '500 MB available space'
    ],
    features: [
      'High performance recording',
      'Live streaming',
      'Scene composition',
      'Audio mixing',
      'Plugin support',
      'Multi-platform streaming'
    ],
    screenshots: [
      'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
      'https://images.pexels.com/photos/265087/pexels-photo-265087.jpeg'
    ],
    image: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
    downloadUrl: '#',
    rating: 4.9,
    downloads: 8500000,
    tags: ['Streaming', 'Recording', 'Content Creation', 'Broadcasting']
  },
  {
    id: '11',
    title: 'Figma Desktop',
    category: 'macos-design',
    description: 'Collaborative interface design tool',
    fullDescription: 'Figma is a collaborative web application for interface design, with additional offline features enabled by the desktop app.',
    version: '116.15.4',
    size: '156 MB',
    developer: 'Figma Inc.',
    releaseDate: '2023-11-08',
    requirements: [
      'Windows 10 or later',
      '4 GB RAM',
      '200 MB available space',
      'Internet connection'
    ],
    features: [
      'Real-time collaboration',
      'Vector graphics editing',
      'Prototyping tools',
      'Design systems',
      'Version history',
      'Plugin ecosystem'
    ],
    screenshots: [
      'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
      'https://images.pexels.com/photos/574071/pexels-photo-574071.jpeg'
    ],
    image: 'https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg',
    downloadUrl: '#',
    rating: 4.8,
    downloads: 4200000,
    tags: ['Design', 'UI/UX', 'Collaboration', 'Prototyping']
  },
  {
    id: '12',
    title: 'Notion Desktop',
    category: 'macos-productivity',
    description: 'All-in-one workspace for notes, tasks, wikis, and databases',
    fullDescription: 'Notion is a single space where you can think, write, and plan. Capture thoughts, manage projects, or even run an entire company.',
    version: '2.0.30',
    size: '78.4 MB',
    developer: 'Notion Labs Inc.',
    releaseDate: '2023-11-18',
    requirements: [
      'Windows 8 or later',
      '2 GB RAM',
      '150 MB available space',
      'Internet connection'
    ],
    features: [
      'Block-based editor',
      'Database functionality',
      'Template gallery',
      'Team collaboration',
      'API integration',
      'Offline access'
    ],
    screenshots: [
      'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
      'https://images.pexels.com/photos/590016/pexels-photo-590016.jpeg'
    ],
    image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    downloadUrl: '#',
    rating: 4.5,
    downloads: 6800000,
    tags: ['Productivity', 'Notes', 'Project Management', 'Collaboration']
  }
];