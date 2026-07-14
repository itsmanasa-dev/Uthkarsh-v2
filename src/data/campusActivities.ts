export interface CampusActivity {
  id: string
  title: string
  description: string
  image: string
  department?: string
  date?: string
}

export const campusActivities: CampusActivity[] = [
  {
    id: 'ug-orientation',
    title: 'UG Orientation Program 2025-26',
    description: 'Positive Mindset for Practical Goal Setting — a comprehensive orientation for incoming undergraduate students, setting the academic and professional tone for the year ahead.',
    image: '/media/activity-ug-orientation.jpg',
    date: '2025',
  },
  {
    id: 'atal-fdp',
    title: 'ATAL Faculty Development Programme',
    description: 'A six-day national-level FDP on "Future of Design Thinking: Next Wave, Next-Gen Teaching through AI-Powered Design," equipping educators with cutting-edge pedagogical tools.',
    image: '/media/activity-atal-fdp.jpg',
    date: '2025',
  },
  {
    id: 'mou-valyou',
    title: 'MoU with ValYou Products Pvt Ltd',
    description: 'Strategic partnership signed to provide students with internship opportunities and hands-on learning experiences that bridge academia and industry.',
    image: '/media/activity-mou-valyou.jpg',
    date: '2025',
  },
  {
    id: 'ai-expert-talk',
    title: 'Expert Talk: Future of AI in Education',
    description: 'An insightful session by Mr. Manuel M, AI and Privacy Specialist at Scania HQ, Stockholm, on the transformative role of artificial intelligence in education and research.',
    image: '/media/activity-ai-expert-talk.jpg',
    date: '20 Nov 2025',
  },
  {
    id: 'global-fair',
    title: 'Global Higher Education & Internship Fair 2025',
    description: 'Organised in association with WiZdom Ed, the fair connected students with international educational pathways and internship opportunities from leading global companies.',
    image: '/media/activity-global-fair.jpg',
    date: '2025',
  },
  {
    id: 'kimmane-visit',
    title: 'Kimmane Luxury Golf Resort Industrial Visit',
    description: 'BBA Tourism & Hospitality students gained in-depth exposure to luxury resort operations, hospitality management, and guest experience standards at Kimmane Golf Resort.',
    image: '/media/activity-kimmane-visit.jpg',
    date: '2025',
  },
  {
    id: 'internx',
    title: 'InternX Internship Orientation',
    description: 'An orientation session by WiZdom Ed on domestic and international internship pathways, study abroad guidance, and professional development programs for students.',
    image: '/media/activity-internx.jpg',
    date: '2025',
  },
  {
    id: 'mongodb',
    title: 'MongoDB Academic Program Partnership',
    description: 'PESIAMS recognised as a valued partner in the MongoDB Academic Program, ensuring students receive high-quality education and training in modern database technologies.',
    image: '/media/activity-mongodb.jpg',
    date: '10 Sep 2024',
  },
]
