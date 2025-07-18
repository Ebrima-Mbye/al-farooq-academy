
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  image: string;
  category: string;
  modules: Module[];
  features: string[];
  requirements: string[];
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
  duration: string;
}

export interface Lesson {
  id: string;
  title: string;
  duration: string;
  type: 'video' | 'reading' | 'quiz';
  completed?: boolean;
}

export const courses: Course[] = [
  {
    id: '1',
    title: 'Islamic Finance Fundamentals',
    description: 'Comprehensive introduction to the principles, products, and practices of Sharia-compliant finance. Learn the foundations of ethical banking and investment.',
    instructor: 'Dr. Abdullah Hassan',
    duration: '8 weeks',
    level: 'Beginner',
    price: 299,
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=500&h=300&fit=crop',
    category: 'Islamic Finance',
    features: [
      'Live weekly sessions',
      'Real-world case studies',
      'Certificate of completion',
      'Industry expert insights',
      'Lifetime access to materials'
    ],
    requirements: [
      'Basic understanding of finance concepts',
      'Interest in Islamic banking',
      'Commitment to attend live sessions'
    ],
    modules: [
      {
        id: 'm1',
        title: 'Introduction to Islamic Finance',
        duration: '2 hours',
        lessons: [
          { id: 'l1', title: 'History and Origins', duration: '30 min', type: 'video' },
          { id: 'l2', title: 'Core Principles', duration: '45 min', type: 'video' },
          { id: 'l3', title: 'Knowledge Check', duration: '15 min', type: 'quiz' }
        ]
      },
      {
        id: 'm2',
        title: 'Sharia Compliance',
        duration: '3 hours',
        lessons: [
          { id: 'l4', title: 'Prohibited Elements', duration: '60 min', type: 'video' },
          { id: 'l5', title: 'Halal Investments', duration: '90 min', type: 'video' },
          { id: 'l6', title: 'Case Studies', duration: '30 min', type: 'reading' }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Shari\'ah and Banking Operations',
    description: 'In-depth study of Islamic law as it applies to financial transactions, banking operations, and contemporary financial instruments.',
    instructor: 'Sheikh Muhammad Al-Rashid',
    duration: '10 weeks',
    level: 'Intermediate',
    price: 399,
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=500&h=300&fit=crop',
    category: 'Islamic Banking',
    features: [
      'Advanced banking concepts',
      'Practical workshops',
      'Industry certification',
      'Networking opportunities',
      'Job placement assistance'
    ],
    requirements: [
      'Completion of Islamic Finance Fundamentals',
      'Basic Arabic reading skills (preferred)',
      'Professional work experience (recommended)'
    ],
    modules: [
      {
        id: 'm3',
        title: 'Banking Products and Services',
        duration: '4 hours',
        lessons: [
          { id: 'l7', title: 'Murabaha Financing', duration: '90 min', type: 'video' },
          { id: 'l8', title: 'Ijara Contracts', duration: '90 min', type: 'video' },
          { id: 'l9', title: 'Product Analysis', duration: '60 min', type: 'reading' }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Islamic FinTech Innovation',
    description: 'Explore the intersection of Islamic finance and technological innovation, including digital currencies, blockchain applications, and FinTech solutions.',
    instructor: 'Dr. Fatima Al-Zahra',
    duration: '6 weeks',
    level: 'Advanced',
    price: 449,
    image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=500&h=300&fit=crop',
    category: 'FinTech',
    features: [
      'Latest technology trends',
      'Hands-on projects',
      'Industry partnerships',
      'Innovation workshops',
      'Startup mentorship'
    ],
    requirements: [
      'Strong background in Islamic finance',
      'Basic programming knowledge',
      'Understanding of blockchain concepts'
    ],
    modules: [
      {
        id: 'm4',
        title: 'Digital Islamic Banking',
        duration: '3 hours',
        lessons: [
          { id: 'l10', title: 'Mobile Banking Solutions', duration: '60 min', type: 'video' },
          { id: 'l11', title: 'Digital Payments', duration: '90 min', type: 'video' },
          { id: 'l12', title: 'Security Considerations', duration: '30 min', type: 'reading' }
        ]
      }
    ]
  }
];

export const getFeaturedCourses = () => courses.slice(0, 3);
export const getCourseById = (id: string) => courses.find(course => course.id === id);
export const getCoursesByCategory = (category: string) => 
  courses.filter(course => course.category === category);
