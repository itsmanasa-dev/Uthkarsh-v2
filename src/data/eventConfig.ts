export const eventConfig = {
  eventName: 'UTKARSH 26',
  eventDate: 'DATE // TO BE ANNOUNCED',
  institution: 'PES Institute of Advanced Management Studies',
  institutionShort: 'PESIAMS',
  institutionFull: 'PES Institute of Advanced Management Studies',
  location: 'Shivamogga, Karnataka',
  department: 'Department of Computer Applications',
  organisedBy: 'Department of Computer Applications',

  maximumTeams: 50,
  minTeamSize: 2,
  maxTeamSize: 4,
  maxParticipants: 200,

  registrationFee: 1000,
  registrationFeeFormatted: '₹1,000',

  overallStart: '9:00 AM',
  overallEnd: '5:00 PM',
  hackathonStart: '10:00 AM',
  hackathonEnd: '4:00 PM',
  hackathonDuration: '6 hours',

  lunchProvided: true,
  registrationDeadline: null as string | null,

  submissionDeadline: '4:00 PM',
  resultsTime: '4:45 PM',
  eventConcludes: '5:00 PM',

  certificateInfo: {
    participation: 'Participation certificates are delivered digitally by email.',
    winner: 'Winner and runner-up certificates are provided as hard copies.',
  },

  media: {
    campusVideo: '/media/homeBannerVideo.mp4',
    campusImage: '/media/home_welcome.jpeg',
    logo: '/media/logo2.jpg',
  },

  documents: {
    brochureUrl: null as string | null,
    brochureImage: '/media/broucher.jpg',
  },

  venue: {
    address: 'PES Institute of Advanced Management Studies, Shivamogga, Karnataka',
    mapsQuery: 'PES+Institute+of+Advanced+Management+Studies+Shivamogga',
  },
} as const
