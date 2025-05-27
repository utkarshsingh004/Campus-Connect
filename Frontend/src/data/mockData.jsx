// Mock data for companies
export const companies = [
  {
    id: '1',
    name: 'TechSoft Solutions',
    logo: 'https://images.pexels.com/photos/15013204/pexels-photo-15013204.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Information Technology',
    description: 'A leading software development company specializing in enterprise solutions and cloud services.',
    website: 'https://example.com/techsoft',
    location: 'Bangalore, India',
    positions: [
      {
        id: '101',
        title: 'Software Engineer',
        department: 'Engineering',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '8-12 LPA',
        eligibility: 'B.Tech/M.Tech in CS/IT with min. 7.5 CGPA',
        skills: ['Java', 'Spring Boot', 'SQL', 'React'],
        deadline: '2025-05-15',
        openings: 25
      },
      {
        id: '102',
        title: 'Data Scientist',
        department: 'Analytics',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '12-15 LPA',
        eligibility: 'B.Tech/M.Tech in CS/IT/Data Science with min. 8.0 CGPA',
        skills: ['Python', 'Machine Learning', 'SQL', 'Statistics'],
        deadline: '2025-05-20',
        openings: 10
      }
    ],
    process: [
      'Online Aptitude Test',
      'Technical Interview',
      'HR Interview'
    ],
    visitDate: '2025-04-10',
    status: 'Confirmed'
  },
  {
    id: '2',
    name: 'Global Finance Inc.',
    logo: 'https://images.pexels.com/photos/936137/pexels-photo-936137.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Finance',
    description: 'A multinational financial services corporation providing banking, investment, and technological solutions.',
    website: 'https://example.com/globalfinance',
    location: 'Mumbai, India',
    positions: [
      {
        id: '201',
        title: 'Investment Banking Analyst',
        department: 'Investment Banking',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '12-18 LPA',
        eligibility: 'MBA Finance with min. 7.5 CGPA or CA',
        skills: ['Financial Modeling', 'Valuation', 'Excel', 'Corporate Finance'],
        deadline: '2025-06-10',
        openings: 15
      },
      {
        id: '202',
        title: 'Technology Analyst',
        department: 'IT',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '10-14 LPA',
        eligibility: 'B.Tech/M.Tech in CS/IT with min. 7.0 CGPA',
        skills: ['Java', 'Python', 'SQL', 'Cloud Technologies'],
        deadline: '2025-06-15',
        openings: 20
      }
    ],
    process: [
      'Online Aptitude Test',
      'Case Study',
      'Technical Interview',
      'HR Interview'
    ],
    visitDate: '2025-05-05',
    status: 'In Progress'
  },
  {
    id: '3',
    name: 'InnovateTech',
    logo: 'https://images.pexels.com/photos/5926393/pexels-photo-5926393.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Technology',
    description: 'A fast-growing technology company focused on AI, ML, and innovative software solutions.',
    website: 'https://example.com/innovatetech',
    location: 'Hyderabad, India',
    positions: [
      {
        id: '301',
        title: 'ML Engineer',
        department: 'AI Research',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '14-18 LPA',
        eligibility: 'B.Tech/M.Tech in CS/IT with min. 8.5 CGPA',
        skills: ['Python', 'TensorFlow', 'PyTorch', 'Computer Vision'],
        deadline: '2025-05-25',
        openings: 8
      }
    ],
    process: [
      'Online Assessment',
      'Technical Interview (2 rounds)',
      'Project Discussion',
      'HR Interview'
    ],
    visitDate: '2025-04-20',
    status: 'Confirmed'
  },
  {
    id: '4',
    name: 'ConsultEdge',
    logo: 'https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Consulting',
    description: 'A global management consulting firm helping organizations solve their most challenging business problems.',
    website: 'https://example.com/consultedge',
    location: 'Delhi, India',
    positions: [
      {
        id: '401',
        title: 'Business Analyst',
        department: 'Consulting',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '12-16 LPA',
        eligibility: 'MBA or B.Tech with min. 8.0 CGPA',
        skills: ['Data Analysis', 'Problem Solving', 'Communication', 'Excel'],
        deadline: '2025-06-05',
        openings: 12
      }
    ],
    process: [
      'Aptitude Test',
      'Case Study Interview',
      'Group Discussion',
      'Partner Interview'
    ],
    visitDate: '2025-05-15',
    status: 'Pending'
  },
  {
    id: '5',
    name: 'EcoSmart Solutions',
    logo: 'https://images.pexels.com/photos/2559941/pexels-photo-2559941.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Renewable Energy',
    description: 'An innovative company specializing in renewable energy solutions and sustainable technologies.',
    website: 'https://example.com/ecosmart',
    location: 'Chennai, India',
    positions: [
      {
        id: '501',
        title: 'Renewable Energy Engineer',
        department: 'Engineering',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '8-12 LPA',
        eligibility: 'B.Tech/M.Tech in Electrical/Mechanical/Energy Engineering with min. 7.5 CGPA',
        skills: ['Renewable Energy Systems', 'Energy Storage', 'AutoCAD', 'Project Management'],
        deadline: '2025-06-15',
        openings: 10
      },
      {
        id: '502',
        title: 'Software Developer',
        department: 'IT',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '9-13 LPA',
        eligibility: 'B.Tech/M.Tech in CS/IT with min. 7.0 CGPA',
        skills: ['Python', 'IoT', 'Cloud Computing', 'Data Analysis'],
        deadline: '2025-06-20',
        openings: 8
      }
    ],
    process: [
      'Online Test',
      'Technical Interview',
      'HR Interview'
    ],
    visitDate: '2025-05-20',
    status: 'Confirmed'
  },
  {
    id: '6',
    name: 'Quantum Networks',
    logo: 'https://images.pexels.com/photos/13547086/pexels-photo-13547086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    industry: 'Telecommunications',
    description: 'A leading telecommunications company providing cutting-edge network solutions and services.',
    website: 'https://example.com/quantum',
    location: 'Pune, India',
    positions: [
      {
        id: '601',
        title: 'Network Engineer',
        department: 'Network Operations',
        type: 'Full-time',
        experience: 'Entry Level',
        ctc: '7-11 LPA',
        eligibility: 'B.Tech/M.Tech in ECE/CS/IT with min. 7.0 CGPA',
        skills: ['Networking', 'CCNA', 'Network Security', 'Troubleshooting'],
        deadline: '2025-06-25',
        openings: 15
      }
    ],
    process: [
      'Aptitude Test',
      'Technical Assessment',
      'Technical Interview',
      'HR Interview'
    ],
    visitDate: '2025-05-25',
    status: 'Pending'
  }
]

// Mock data for placement statistics
export const placementStats = {
  totalCompanies: 35,
  totalOffers: 520,
  highestPackage: 45,
  averagePackage: 12.5,
  // Monthly data for chart
  monthlyData: [
    { month: 'Jan', companies: 3, offers: 45 },
    { month: 'Feb', companies: 5, offers: 62 },
    { month: 'Mar', companies: 4, offers: 53 },
    { month: 'Apr', companies: 6, offers: 78 },
    { month: 'May', companies: 8, offers: 95 },
    { month: 'Jun', companies: 5, offers: 67 },
    { month: 'Jul', companies: 4, offers: 55 },
  ],
  // Sector-wise placement data
  sectorData: [
    { sector: 'IT', percentage: 45 },
    { sector: 'Finance', percentage: 18 },
    { sector: 'Consulting', percentage: 15 },
    { sector: 'Manufacturing', percentage: 10 },
    { sector: 'Others', percentage: 12 },
  ],
  // Department-wise placement data
  departmentData: [
    { department: 'Computer Science', placed: 92 },
    { department: 'Electronics', placed: 85 },
    { department: 'Mechanical', placed: 78 },
    { department: 'Civil', placed: 65 },
    { department: 'Chemical', placed: 70 },
  ]
}

// Mock testimonials
export const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    role: 'Placement Officer',
    college: 'Delhi Technical University',
    image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Campus Connect has transformed how we manage our placement process. The platform is intuitive and has helped us increase our placement rate by 35%.'
  },
  {
    id: 2,
    name: 'Rahul Mehta',
    role: 'Associate Dean',
    college: 'Indian Institute of Technology',
    image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'The analytics and reporting features have been invaluable for our institution. We can now make data-driven decisions about our placement strategy.'
  },
  {
    id: 3,
    name: 'Ananya Patel',
    role: 'Placement Coordinator',
    college: 'Bangalore Institute of Technology',
    image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
    quote: 'Our students love how they can easily browse through companies and track their application status. It has made the placement season much less stressful.'
  }


]

export const hostStats = {
  totalHosts: 25,
  activeHosts: 20,
  inactiveHosts: 5,
  totalUsers: 3400,
  totalPositions: 15,
  totalApplications: 5000,
  totalCompaniesVisited: 6,
  upcomingVisits: 3,
  completedVisits: 3,
  // Monthly onboarding of hosts (for chart)
  monthlyOnboarding: [
    { month: 'Jan', hosts: 2 },
    { month: 'Feb', hosts: 3 },
    { month: 'Mar', hosts: 4 },
    { month: 'Apr', hosts: 2 },
    { month: 'May', hosts: 3 },
    { month: 'Jun', hosts: 4 },
    { month: 'Jul', hosts: 2 },
  ],
  // Host-wise placement activities (mock data)
  hostActivities: [
    { hostName: 'Ravi Kumar', companiesManaged: 3, usersManaged: 120 },
    { hostName: 'Anjali Mehta', companiesManaged: 4, usersManaged: 150 },
    { hostName: 'Rajesh Singh', companiesManaged: 2, usersManaged: 100 },
    { hostName: 'Meera Sharma', companiesManaged: 1, usersManaged: 80 },
  ],
};

export const events = [
  {
    id: 'e1',
    title: 'TechSoft Placement Drive',
    type: 'Placement Drive',
    date: '2025-06-01',
    host: 'Ravi Kumar',
    participants: 120,
    status: 'Completed',
    description: 'A placement drive for TechSoft Solutions with multiple roles offered.',
  },
  {
    id: 'e2',
    title: 'Finance Career Webinar',
    type: 'Webinar',
    date: '2025-06-05',
    host: 'Anjali Mehta',
    participants: 80,
    status: 'Upcoming',
    description: 'A webinar covering career opportunities in the finance sector.',
  },
  {
    id: 'e3',
    title: 'InnovateTech Hiring Interviews',
    type: 'Interviews',
    date: '2025-06-10',
    host: 'Rajesh Singh',
    participants: 60,
    status: 'Upcoming',
    description: 'Technical interviews for InnovateTech’s ML Engineer role.',
  },
  {
    id: 'e4',
    title: 'ConsultEdge Strategy Workshop',
    type: 'Workshop',
    date: '2025-06-12',
    host: 'Meera Sharma',
    participants: 50,
    status: 'Completed',
    description: 'A workshop focused on strategic consulting practices and case studies.',
  },
];
