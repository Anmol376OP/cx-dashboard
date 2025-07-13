export interface Ticket {
  id: string;
  title: string;
  customerName: string;
  customerMessage: string;
  ipAddress: string;
  location: string;
  category: 'Network & Communication' | 'Billing & Recharge' | 'Plans & Services' | 'Profile & Security' | 'General Complaints';
  severity: 'Critical' | 'Moderate' | 'Needs Attention' | 'Fixed';
  sentiment: 'Positive' | 'Negative' | 'Neutral';
  tags: string[];
  createdAt: string;
  updatedAt: string;
}

export const mockTickets: Ticket[] = [
  {
    id: "TCK-001",
    title: "Cannot connect to mobile network",
    customerName: "Sarah Johnson",
    customerMessage: "I've been unable to connect to the mobile network for the past 3 hours. I've tried restarting my phone multiple times but nothing works. This is affecting my work calls.",
    ipAddress: "192.168.1.45",
    location: "New York, NY",
    category: "Network & Communication",
    severity: "Critical",
    sentiment: "Negative",
    tags: ["connectivity", "urgent", "work-impact"],
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "TCK-002", 
    title: "Billing discrepancy in last month's statement",
    customerName: "Michael Chen",
    customerMessage: "I noticed some charges on my bill that don't match my plan. There are extra data charges but I have unlimited data. Can someone help me understand this?",
    ipAddress: "10.0.0.23",
    location: "Los Angeles, CA",
    category: "Billing & Recharge",
    severity: "Moderate",
    sentiment: "Neutral",
    tags: ["billing", "data-charges", "plan-inquiry"],
    createdAt: "2024-01-15T09:15:00Z",
    updatedAt: "2024-01-15T11:20:00Z"
  },
  {
    id: "TCK-003",
    title: "Unable to upgrade my current plan",
    customerName: "Emily Rodriguez",
    customerMessage: "I'm trying to upgrade to the premium plan but the website keeps giving me an error. I've tried multiple times today.",
    ipAddress: "172.16.0.12",
    location: "Chicago, IL",
    category: "Plans & Services",
    severity: "Needs Attention",
    sentiment: "Negative",
    tags: ["plan-upgrade", "website-error", "premium"],
    createdAt: "2024-01-15T08:45:00Z",
    updatedAt: "2024-01-15T12:10:00Z"
  },
  {
    id: "TCK-004",
    title: "Password reset not working",
    customerName: "David Kim",
    customerMessage: "The password reset emails are not coming through. I've checked spam folder too. Need access to my account urgently.",
    ipAddress: "203.0.113.7",
    location: "Seattle, WA",
    category: "Profile & Security",
    severity: "Moderate",
    sentiment: "Negative",
    tags: ["password-reset", "email-issues", "account-access"],
    createdAt: "2024-01-15T07:20:00Z",
    updatedAt: "2024-01-15T13:45:00Z"
  },
  {
    id: "TCK-005",
    title: "Great service, just a small suggestion",
    customerName: "Lisa Thompson",
    customerMessage: "I love the new app interface! Just wondering if you could add a dark mode option. Everything else is perfect.",
    ipAddress: "198.51.100.42",
    location: "Miami, FL",
    category: "General Complaints",
    severity: "Fixed",
    sentiment: "Positive",
    tags: ["feature-request", "app-improvement", "positive-feedback"],
    createdAt: "2024-01-14T16:30:00Z",
    updatedAt: "2024-01-15T14:00:00Z"
  },
  {
    id: "TCK-006",
    title: "Slow internet speeds during peak hours",
    customerName: "Robert Wilson",
    customerMessage: "Internet becomes very slow between 7-9 PM. Speed tests show 10% of advertised speed. This has been happening for a week.",
    ipAddress: "192.0.2.15",
    location: "Houston, TX",
    category: "Network & Communication",
    severity: "Moderate",
    sentiment: "Negative",
    tags: ["speed-issues", "peak-hours", "performance"],
    createdAt: "2024-01-14T19:15:00Z",
    updatedAt: "2024-01-15T09:30:00Z"
  }
];

export const sentimentData = [
  { date: "Jan 10", positive: 0.65, negative: 0.25, neutral: 0.10 },
  { date: "Jan 11", positive: 0.70, negative: 0.20, neutral: 0.10 },
  { date: "Jan 12", positive: 0.60, negative: 0.30, neutral: 0.10 },
  { date: "Jan 13", positive: 0.75, negative: 0.15, neutral: 0.10 },
  { date: "Jan 14", positive: 0.68, negative: 0.22, neutral: 0.10 },
  { date: "Jan 15", positive: 0.72, negative: 0.18, neutral: 0.10 }
];

export const categoryData = [
  { category: "Network & Communication", count: 45, fill: "hsl(var(--chart-1))" },
  { category: "Billing & Recharge", count: 32, fill: "hsl(var(--chart-2))" },
  { category: "Plans & Services", count: 28, fill: "hsl(var(--chart-3))" },
  { category: "Profile & Security", count: 18, fill: "hsl(var(--chart-4))" },
  { category: "General Complaints", count: 12, fill: "hsl(var(--chart-5))" }
];

export const ticketVolumeData = {
  daily: [
    { date: "Jan 10", tickets: 45 },
    { date: "Jan 11", tickets: 52 },
    { date: "Jan 12", tickets: 38 },
    { date: "Jan 13", tickets: 61 },
    { date: "Jan 14", tickets: 49 },
    { date: "Jan 15", tickets: 67 }
  ],
  weekly: [
    { date: "Week 1", tickets: 245 },
    { date: "Week 2", tickets: 289 },
    { date: "Week 3", tickets: 312 },
    { date: "Week 4", tickets: 267 }
  ],
  monthly: [
    { date: "Oct", tickets: 1145 },
    { date: "Nov", tickets: 1289 },
    { date: "Dec", tickets: 1312 },
    { date: "Jan", tickets: 967 }
  ]
};

export const aiInsights = {
  overallSentiment: "Positive",
  sentimentScore: 72,
  topIssues: ["Network connectivity during peak hours", "Billing discrepancies", "App feature requests"],
  trends: "Customer satisfaction has improved by 8% this week. Network-related complaints decreased by 15% after infrastructure upgrades.",
  recommendations: "Focus on proactive communication for billing issues and consider implementing dark mode feature based on user feedback."
};