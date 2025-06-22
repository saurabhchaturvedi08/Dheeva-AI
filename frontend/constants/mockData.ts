// Mock data for development and testing purposes

export const MOCK_FILES = [
  {
    id: '1',
    name: 'Annual Report 2023.pdf',
    type: 'pdf',
    size: '4.2 MB',
    domain: 'business',
    uploadDate: '2023-04-15T14:30:00Z',
  },
  {
    id: '2',
    name: 'Contract Agreement.pdf',
    type: 'pdf',
    size: '1.8 MB',
    domain: 'legal',
    uploadDate: '2023-05-10T09:15:00Z',
  },
  {
    id: '3',
    name: 'Medical Report.pdf',
    type: 'pdf',
    size: '3.1 MB',
    domain: 'medical',
    uploadDate: '2023-06-22T16:45:00Z',
  },
  {
    id: '4',
    name: 'Research Paper.pdf',
    type: 'pdf',
    size: '2.7 MB',
    domain: 'academic',
    uploadDate: '2023-07-05T11:20:00Z',
  },
  {
    id: '5',
    name: 'Presentation Slides.pdf',
    type: 'pdf',
    size: '5.3 MB',
    domain: 'business',
    uploadDate: '2023-08-17T13:10:00Z',
  },
  {
    id: '6',
    name: 'Meeting Recording.mp3',
    type: 'audio',
    size: '18.5 MB',
    domain: 'business',
    uploadDate: '2023-09-08T10:00:00Z',
  },
  {
    id: '7',
    name: 'Project Diagram.png',
    type: 'image',
    size: '2.3 MB',
    domain: 'general',
    uploadDate: '2023-10-12T14:25:00Z',
  },
  {
    id: '8',
    name: 'Product Demo.mp4',
    type: 'video',
    size: '42.7 MB',
    domain: 'business',
    uploadDate: '2023-11-30T09:50:00Z',
  },
]

export const MOCK_CHATS = {
  '1': [
    {
      id: '101',
      text: 'What were the key financial highlights from the annual report?',
      sender: 'user',
      timestamp: '2023-04-16T10:30:00Z',
    },
    {
      id: '102',
      text: 'Based on the Annual Report 2023, the key financial highlights include a 15% increase in revenue from $1.2B to $1.38B, a gross margin improvement of 2.3 percentage points to 42.8%, and an EBITDA growth of 18% year-over-year. The company also reduced its debt-to-equity ratio from 0.8 to 0.6 and increased R&D investment by 22%.',
      sender: 'ai',
      timestamp: '2023-04-16T10:30:10Z',
    },
    {
      id: '103',
      text: 'What were the main challenges mentioned?',
      sender: 'user',
      timestamp: '2023-04-16T10:31:00Z',
    },
    {
      id: '104',
      text: 'The report highlighted several challenges, including supply chain disruptions that affected product availability in Q2, increasing raw material costs that impacted margins by approximately 1.5%, and intense competition in emerging markets, particularly in Southeast Asia. The report also mentioned regulatory changes in European markets that required additional compliance investments of $3.2M.',
      sender: 'ai',
      timestamp: '2023-04-16T10:31:15Z',
    },
  ],
  '2': [
    {
      id: '201',
      text: 'What are the termination clauses in this contract?',
      sender: 'user',
      timestamp: '2023-05-11T15:20:00Z',
    },
    {
      id: '202',
      text: 'The contract contains several termination clauses in Section 14 (pages 23-25). Either party may terminate with 60 days written notice. Immediate termination is permitted in cases of material breach, insolvency, or force majeure lasting more than 90 consecutive days. Early termination fees apply on a sliding scale: 50% of remaining contract value if terminated in year 1, 30% in year 2, and 10% in year 3. There are also specific performance-related termination rights in Appendix C.',
      sender: 'ai',
      timestamp: '2023-05-11T15:20:20Z',
    },
  ],
  '6': [
    {
      id: '601',
      text: 'Could you summarize the key points from this meeting recording?',
      sender: 'user',
      timestamp: '2023-09-09T09:15:00Z',
    },
    {
      id: '602',
      text: 'Based on the meeting recording, here are the key points discussed:\n\n1. Q4 product launch timeline was adjusted from November to mid-December due to supply chain issues\n2. Marketing budget was increased by 15% to support the delayed launch\n3. The team approved the new UI design for the mobile app with minor revisions to the checkout flow\n4. Customer feedback from beta testing showed 87% satisfaction, with concerns mainly about loading speed\n5. Next steps include finalizing the press release by September 15th and scheduling a follow-up meeting for October 1st to review progress',
      sender: 'ai',
      timestamp: '2023-09-09T09:15:30Z',
    },
  ],
}