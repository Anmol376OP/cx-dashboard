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

const baseTickets: Ticket[] = [
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

export const mockTickets: Ticket[] = Array.from({ length: 1000 }, (_, i) => {
  const base = baseTickets[i % baseTickets.length];
  const suffix = (i + 1).toString().padStart(3, "0");

  return {
    ...base,
    id: `TCK-${suffix}`,
    customerName: `${base.customerName.split(" ")[0]} #${i + 1}`,
    title: `${base.title} [${i + 1}]`,
    customerMessage: `${base.customerMessage} (replica ${i + 1})`,
    createdAt: new Date(Date.now() - i * 10000000).toISOString(),
    updatedAt: new Date(Date.now() - i * 5000000).toISOString(),
    tags: base.tags.map((tag) => `${tag}-${i + 1}`),
  };
});


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
    { date: "Jan 1", tickets: 40 },
    { date: "Jan 2", tickets: 42 },
    { date: "Jan 3", tickets: 39 },
    { date: "Jan 4", tickets: 55 },
    { date: "Jan 5", tickets: 48 },
    { date: "Jan 6", tickets: 53 },
    { date: "Jan 7", tickets: 60 },
    { date: "Jan 8", tickets: 51 },
    { date: "Jan 9", tickets: 47 },
    { date: "Jan 10", tickets: 45 },
    { date: "Jan 11", tickets: 52 },
    { date: "Jan 12", tickets: 38 },
    { date: "Jan 13", tickets: 61 },
    { date: "Jan 14", tickets: 49 },
    { date: "Jan 15", tickets: 67 },
    { date: "Jan 16", tickets: 54 },
    { date: "Jan 17", tickets: 58 },
    { date: "Jan 18", tickets: 62 },
    { date: "Jan 19", tickets: 59 },
    { date: "Jan 20", tickets: 63 }
  ],
  weekly: [
    { date: "Week 1", tickets: 245 },
    { date: "Week 2", tickets: 289 },
    { date: "Week 3", tickets: 312 },
    { date: "Week 4", tickets: 267 },
    { date: "Week 5", tickets: 298 },
    { date: "Week 6", tickets: 320 },
    { date: "Week 7", tickets: 305 },
    { date: "Week 8", tickets: 310 },
    { date: "Week 9", tickets: 299 },
    { date: "Week 10", tickets: 315 },
    { date: "Week 11", tickets: 333 },
    { date: "Week 12", tickets: 342 },
    { date: "Week 13", tickets: 322 },
    { date: "Week 14", tickets: 336 },
    { date: "Week 15", tickets: 351 },
    { date: "Week 16", tickets: 327 },
    { date: "Week 17", tickets: 359 },
    { date: "Week 18", tickets: 365 },
    { date: "Week 19", tickets: 342 },
    { date: "Week 20", tickets: 370 }
  ],
  monthly: [
    { date: "Jan", tickets: 967 },
    { date: "Feb", tickets: 1103 },
    { date: "Mar", tickets: 1245 },
    { date: "Apr", tickets: 1201 },
    { date: "May", tickets: 1293 },
    { date: "Jun", tickets: 1340 },
    { date: "Jul", tickets: 1285 },
    { date: "Aug", tickets: 1399 },
    { date: "Sep", tickets: 1254 },
    { date: "Oct", tickets: 1145 },
    { date: "Nov", tickets: 1289 },
    { date: "Dec", tickets: 1312 },
    { date: "Jan (2)", tickets: 1023 },
    { date: "Feb (2)", tickets: 1085 },
    { date: "Mar (2)", tickets: 1150 }
  ]
};


export const aiInsights = {
  overallSentiment: "Positive",
  sentimentScore: 72,
  topIssues: ["Network connectivity during peak hours", "Billing discrepancies", "App feature requests"],
  trends: "Customer satisfaction has improved by 8% this week. Network-related complaints decreased by 15% after infrastructure upgrades.",
  recommendations: "Focus on proactive communication for billing issues and consider implementing dark mode feature based on user feedback."
};