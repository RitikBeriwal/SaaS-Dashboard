// The logged-in user (shown in the navbar, welcome message and settings page)
export const currentUser = {
  name: 'Alex Morgan',
  email: 'alex.morgan@analytix.io',
  role: 'Product Manager',
}

// Demo login details. There is no backend, so the login page checks against these.
// (A real app would send the email and password to a server instead.)
export const demoAccount = {
  email: 'alex.morgan@analytix.io',
  password: 'demo1234',
}

// Notifications shown in the navbar dropdown
export const notifications = [
  {
    id: 1,
    type: 'order',
    title: 'New order received',
    message: 'Olivia Martin placed order #ORD-7841 for $249.00.',
    time: '5 min ago',
    isRead: false,
  },
  {
    id: 2,
    type: 'alert',
    title: 'Payment failed',
    message: 'The payment for order #ORD-7836 was declined.',
    time: '1 hour ago',
    isRead: false,
  },
  {
    id: 3,
    type: 'customer',
    title: 'New customer signed up',
    message: 'Liam Johnson started a trial on the Pro plan.',
    time: '3 hours ago',
    isRead: false,
  },
  {
    id: 4,
    type: 'report',
    title: 'Monthly report is ready',
    message: 'Your October revenue report is ready to download.',
    time: 'Yesterday',
    isRead: true,
  },
]

// Monthly numbers for this year, plus last year's numbers for comparison.
// Used by the dashboard (12 month view), the analytics page and the reports page.
export const monthlyPerformance = [
  { label: 'Jan', revenue: 2840, previousRevenue: 2610, orders: 82, previousOrders: 72, customers: 168 },
  { label: 'Feb', revenue: 3120, previousRevenue: 2780, orders: 88, previousOrders: 76, customers: 182 },
  { label: 'Mar', revenue: 2960, previousRevenue: 2690, orders: 84, previousOrders: 74, customers: 175 },
  { label: 'Apr', revenue: 3450, previousRevenue: 3040, orders: 95, previousOrders: 82, customers: 196 },
  { label: 'May', revenue: 3780, previousRevenue: 3310, orders: 103, previousOrders: 89, customers: 214 },
  { label: 'Jun', revenue: 3520, previousRevenue: 3180, orders: 98, previousOrders: 85, customers: 203 },
  { label: 'Jul', revenue: 4010, previousRevenue: 3560, orders: 108, previousOrders: 93, customers: 221 },
  { label: 'Aug', revenue: 4280, previousRevenue: 3720, orders: 114, previousOrders: 98, customers: 232 },
  { label: 'Sep', revenue: 3890, previousRevenue: 3450, orders: 104, previousOrders: 90, customers: 209 },
  { label: 'Oct', revenue: 4450, previousRevenue: 3920, orders: 118, previousOrders: 102, customers: 228 },
  { label: 'Nov', revenue: 4620, previousRevenue: 4060, orders: 122, previousOrders: 106, customers: 219 },
  { label: 'Dec', revenue: 4310, previousRevenue: 3884, orders: 114, previousOrders: 100, customers: 203 },
]

// Options for the date range selector on the dashboard
export const dateRanges = [
  { value: '7d', label: 'Last 7 days' },
  { value: '30d', label: 'Last 30 days' },
  { value: '12m', label: 'Last 12 months' },
]

// Dashboard numbers for each date range.
// When the user picks a range, the dashboard reads dashboardData[range].
export const dashboardData = {
  '7d': {
    comparisonLabel: 'vs prior 7 days',
    revenue: '$1,184',
    revenueChange: 6.2,
    users: '54',
    usersChange: 2.1,
    orders: '31',
    ordersChange: 10.7,
    conversionRate: '3.71%',
    conversionChange: 0.8,
    chartData: [
      { label: 'Mon', revenue: 152, orders: 4 },
      { label: 'Tue', revenue: 168, orders: 5 },
      { label: 'Wed', revenue: 145, orders: 4 },
      { label: 'Thu', revenue: 189, orders: 5 },
      { label: 'Fri', revenue: 176, orders: 4 },
      { label: 'Sat', revenue: 198, orders: 5 },
      { label: 'Sun', revenue: 156, orders: 4 },
    ],
  },
  '30d': {
    comparisonLabel: 'vs prior 30 days',
    revenue: '$4,620',
    revenueChange: 3.8,
    users: '219',
    usersChange: 5.3,
    orders: '122',
    ordersChange: 3.4,
    conversionRate: '3.52%',
    conversionChange: 1.2,
    chartData: [
      { label: 'Oct 9', revenue: 410, orders: 11 },
      { label: 'Oct 12', revenue: 385, orders: 10 },
      { label: 'Oct 15', revenue: 448, orders: 12 },
      { label: 'Oct 18', revenue: 472, orders: 13 },
      { label: 'Oct 21', revenue: 430, orders: 11 },
      { label: 'Oct 24', revenue: 495, orders: 13 },
      { label: 'Oct 27', revenue: 468, orders: 12 },
      { label: 'Oct 30', revenue: 512, orders: 14 },
      { label: 'Nov 2', revenue: 476, orders: 12 },
      { label: 'Nov 5', revenue: 524, orders: 14 },
    ],
  },
  '12m': {
    comparisonLabel: 'vs last year',
    revenue: '$45,230',
    revenueChange: 12.5,
    users: '2,450',
    usersChange: 8.2,
    orders: '1,230',
    ordersChange: 15.3,
    conversionRate: '3.65%',
    conversionChange: -2.4,
    chartData: monthlyPerformance,
  },
}
