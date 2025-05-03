// Navigation items for sidebar
export const NAVIGATION_ITEMS = [
  {
    title: "Dashboard",
    href: "/",
    icon: "Dashboard",
    role: ["admin", "staff"],
  },
  {
    title: "Students",
    href: "/students",
    icon: "Users",
    role: ["admin", "staff"],
  },
  {
    title: "Applications",
    href: "/applications",
    icon: "FileText",
    role: ["admin", "staff"],
  },
  {
    title: "Universities",
    href: "/universities",
    icon: "GraduationCap",
    role: ["admin", "staff"],
  },
  {
    title: "Events",
    href: "/events",
    icon: "Calendar",
    role: ["admin", "staff"],
  },
  {
    title: "Agents",
    href: "/agents",
    icon: "Users",
    role: ["admin"],
  },
  {
    title: "Reports",
    href: "/reports",
    icon: "BarChart2",
    role: ["admin"],
  },
  {
    title: "Communications",
    href: "/communications",
    icon: "Mail",
    role: ["admin", "staff"],
  },
  {
    title: "Content & Documents",
    href: "/content",
    icon: "FileText",
    role: ["admin"],
  },
  {
    title: "Cards",
    href: "/cards",
    icon: "CreditCard",
    role: ["admin"],
  },
  {
    title: "Compliance",
    href: "/compliance",
    icon: "Shield",
    role: ["admin"],
  },
  {
    title: "Integrations",
    href: "/integrations",
    icon: "Zap",
    role: ["admin"],
  },
  {
    title: "System Configuration",
    href: "/system",
    icon: "Settings",
    role: ["admin"],
  },
];

// Student stages for the pipeline
export const STUDENT_STAGES = [
  { id: "inquiry", label: "Inquiry", color: "bg-blue-500" },
  { id: "application", label: "Application", color: "bg-yellow-500" },
  { id: "accepted", label: "Accepted", color: "bg-green-500" },
  { id: "visa", label: "Visa", color: "bg-purple-500" },
  { id: "enrollment", label: "Enrollment", color: "bg-pink-500" },
  { id: "graduated", label: "Graduated", color: "bg-indigo-500" },
];

// Student Filter Tabs for the student management page
export const STUDENT_FILTER_TABS = [
  {
    id: 'all',
    label: 'All Students',
  },
  {
    id: 'inquiry',
    label: 'Inquiry',
  },
  {
    id: 'application',
    label: 'Application',
  },
  {
    id: 'accepted',
    label: 'Accepted',
  },
  {
    id: 'visa',
    label: 'Visa',
  },
  {
    id: 'enrollment',
    label: 'Enrollment',
  },
  {
    id: 'graduated',
    label: 'Graduated',
  },
];

// University Tier Data for Charts/UI
export const UNIVERSITY_TIERS = [
  {
    id: 'tier1',
    label: 'Tier 1',
    count: 2,
    color: 'bg-purple-100',
  },
  {
    id: 'tier2',
    label: 'Tier 2',
    count: 3,
    color: 'bg-blue-100',
  },
  {
    id: 'tier3',
    label: 'Tier 3',
    count: 1,
    color: 'bg-green-100',
  },
  {
    id: 'tier4',
    label: 'Tier 4',
    count: 1,
    color: 'bg-gray-100',
  },
];

// University Agreement Status Data for Charts/UI
export const UNIVERSITY_AGREEMENT_STATUS = [
  {
    id: 'active',
    label: 'Active',
    count: 5,
    color: 'bg-green-100',
  },
  {
    id: 'pending',
    label: 'Pending',
    count: 1,
    color: 'bg-yellow-100',
  },
  {
    id: 'renewal',
    label: 'Up for Renewal',
    count: 1,
    color: 'bg-blue-100',
  },
  {
    id: 'expired',
    label: 'Expired',
    count: 0,
    color: 'bg-red-100',
  },
];

// University Filter Tabs
export const UNIVERSITY_FILTER_TABS = [
  {
    id: 'all-institutions',
    label: 'All Institutions (7)',
  },
  {
    id: 'top-tier',
    label: 'Top Tier (5)',
  },
  {
    id: 'active-agreements',
    label: 'Active Agreements (5)',
  },
  {
    id: 'renewals-needed',
    label: 'Renewals Needed (1)',
  },
];

// Compliance management tabs
export const COMPLIANCE_TABS = [
  {
    id: 'regulatory',
    label: 'Regulatory Compliance',
  },
  {
    id: 'data-protection',
    label: 'Data Protection',
  },
  {
    id: 'risk',
    label: 'Risk Management',
  },
  {
    id: 'audit',
    label: 'Audit Trail',
  },
  {
    id: 'approvals',
    label: 'Pending Approvals',
  },
];

// Event types for event categorization
export const EVENT_TYPES = [
  {
    id: 'webinar',
    label: 'Webinar',
    color: 'bg-blue-100',
  },
  {
    id: 'workshop',
    label: 'Workshop',
    color: 'bg-green-100',
  },
  {
    id: 'fair',
    label: 'Education Fair',
    color: 'bg-yellow-100',
  },
  {
    id: 'campus_visit',
    label: 'Campus Visit',
    color: 'bg-orange-100',
  },
  {
    id: 'open_day',
    label: 'Open Day',
    color: 'bg-purple-100',
  },
  {
    id: 'virtual_tour',
    label: 'Virtual Tour',
    color: 'bg-indigo-100',
  },
  {
    id: 'info_session',
    label: 'Information Session',
    color: 'bg-pink-100',
  },
  {
    id: 'conference',
    label: 'Conference',
    color: 'bg-teal-100',
  },
  {
    id: 'alumni_event',
    label: 'Alumni Event',
    color: 'bg-amber-100',
  },
  {
    id: 'other',
    label: 'Other',
    color: 'bg-gray-100',
  },
];

// Event tabs for the events management module
export const EVENT_TABS = [
  {
    id: 'upcoming',
    label: 'Upcoming Events',
  },
  {
    id: 'past',
    label: 'Past Events',
  },
  {
    id: 'webinars',
    label: 'Webinars',
  },
  {
    id: 'workshops',
    label: 'Workshops',
  },
  {
    id: 'fairs',
    label: 'Education Fairs',
  },
  {
    id: 'campus',
    label: 'Campus Visits',
  },
  {
    id: 'analytics',
    label: 'Analytics',
  },
];

// Journey stages for student journey flow visualization
export const JOURNEY_STAGES = [
  {
    id: 'inquiry',
    label: 'Inquiry',
    color: 'bg-blue-100',
    description: 'Initial student interest and inquiry',
  },
  {
    id: 'application',
    label: 'Application',
    color: 'bg-indigo-100',
    description: 'Application submission and processing',
  },
  {
    id: 'assessment',
    label: 'Assessment',
    color: 'bg-purple-100',
    description: 'Evaluation of student qualifications',
  },
  {
    id: 'offer',
    label: 'Offer',
    color: 'bg-pink-100',
    description: 'University offer extended to student',
  },
  {
    id: 'acceptance',
    label: 'Acceptance',
    color: 'bg-rose-100',
    description: 'Student acceptance of university offer',
  },
  {
    id: 'visa',
    label: 'Visa Processing',
    color: 'bg-orange-100',
    description: 'Student visa application and processing',
  },
  {
    id: 'enrollment',
    label: 'Enrollment',
    color: 'bg-amber-100',
    description: 'Official enrollment at university',
  },
  {
    id: 'pre_arrival',
    label: 'Pre-Arrival',
    color: 'bg-yellow-100',
    description: 'Pre-arrival preparation and orientation',
  },
  {
    id: 'arrival',
    label: 'Arrival',
    color: 'bg-lime-100',
    description: 'Student arrival at destination',
  },
  {
    id: 'onboarding',
    label: 'Onboarding',
    color: 'bg-green-100',
    description: 'Student onboarding and orientation',
  },
  {
    id: 'active',
    label: 'Active Student',
    color: 'bg-emerald-100',
    description: 'Currently studying at university',
  },
  {
    id: 'alumni',
    label: 'Alumni',
    color: 'bg-teal-100',
    description: 'Graduate and alumni status',
  },
];

// Integration categories for the integration management
export const INTEGRATION_CATEGORIES = [
  {
    id: 'crm',
    label: 'CRM Integrations',
    description: 'Connect with Customer Relationship Management systems',
  },
  {
    id: 'payment',
    label: 'Payment Gateways',
    description: 'Process payments and handle financial transactions',
  },
  {
    id: 'messaging',
    label: 'Messaging Services',
    description: 'Connect with SMS, email, and instant messaging platforms',
  },
  {
    id: 'document',
    label: 'Document Processing',
    description: 'Handle document uploads, verification, and signing',
  },
  {
    id: 'data',
    label: 'Data & Analytics',
    description: 'Connect with data processing and business intelligence tools',
  },
  {
    id: 'university',
    label: 'University Systems',
    description: 'Connect with university admission and management systems',
  },
  {
    id: 'visa',
    label: 'Visa & Immigration',
    description: 'Connect with visa processing and verification systems',
  },
];

// Integration tabs for the integration management interface
export const INTEGRATION_TABS = [
  {
    id: 'active',
    label: 'Active Integrations',
  },
  {
    id: 'available',
    label: 'Available Integrations',
  },
  {
    id: 'custom',
    label: 'Custom Integrations',
  },
  {
    id: 'logs',
    label: 'Integration Logs',
  },
  {
    id: 'settings',
    label: 'Integration Settings',
  },
];

// Report tabs for the reporting interface
export const REPORT_TABS = [
  {
    id: 'standard',
    label: 'Standard Reports',
  },
  {
    id: 'custom',
    label: 'Custom Reports',
  },
  {
    id: 'scheduled',
    label: 'Scheduled Reports',
  },
  {
    id: 'dashboards',
    label: 'Dashboards',
  },
  {
    id: 'kpi',
    label: 'KPI Tracking',
  },
];

// Report categories for reporting module
export const REPORT_CATEGORIES = [
  {
    id: 'student',
    label: 'Student Reports',
    description: 'Detailed analytics on student recruitment, conversions, and performance',
  },
  {
    id: 'university',
    label: 'University Reports',
    description: 'Statistics and insights on university partnerships and applications',
  },
  {
    id: 'agent',
    label: 'Agent Reports',
    description: 'Performance metrics and conversion rates for recruitment agents',
  },
  {
    id: 'financial',
    label: 'Financial Reports',
    description: 'Revenue tracking, commissions, and financial performance metrics',
  },
  {
    id: 'marketing',
    label: 'Marketing Reports',
    description: 'Campaign effectiveness, channel performance, and ROI analysis',
  },
  {
    id: 'operational',
    label: 'Operational Reports',
    description: 'System usage, staff performance, and workflow efficiency metrics',
  },
  {
    id: 'compliance',
    label: 'Compliance Reports',
    description: 'Regulatory compliance, data protection, and risk management metrics',
  },
];

// Time filter options for reports and analytics
export const TIME_FILTER_OPTIONS = [
  {
    id: 'today',
    label: 'Today',
  },
  {
    id: 'yesterday',
    label: 'Yesterday',
  },
  {
    id: 'this_week',
    label: 'This Week',
  },
  {
    id: 'last_week',
    label: 'Last Week',
  },
  {
    id: 'this_month',
    label: 'This Month',
  },
  {
    id: 'last_month',
    label: 'Last Month',
  },
  {
    id: 'this_quarter',
    label: 'This Quarter',
  },
  {
    id: 'last_quarter',
    label: 'Last Quarter',
  },
  {
    id: 'this_year',
    label: 'This Year',
  },
  {
    id: 'last_year',
    label: 'Last Year',
  },
  {
    id: 'custom',
    label: 'Custom Range',
  },
];

// API Method colors for the API logs
export const API_METHOD_COLORS = {
  GET: 'bg-blue-100 text-blue-800',
  POST: 'bg-green-100 text-green-800',
  PUT: 'bg-yellow-100 text-yellow-800',
  PATCH: 'bg-purple-100 text-purple-800',
  DELETE: 'bg-red-100 text-red-800',
  OPTIONS: 'bg-gray-100 text-gray-800',
  HEAD: 'bg-indigo-100 text-indigo-800',
};

// System configuration tabs for system settings module
export const SYSTEM_CONFIG_TABS = [
  {
    id: 'general',
    label: 'General Settings',
  },
  {
    id: 'users',
    label: 'User Management',
  },
  {
    id: 'roles',
    label: 'Role Configuration',
  },
  {
    id: 'notifications',
    label: 'Notification Settings',
  },
  {
    id: 'emails',
    label: 'Email Templates',
  },
  {
    id: 'security',
    label: 'Security Settings',
  },
  {
    id: 'backup',
    label: 'Backup & Restore',
  },
  {
    id: 'audit',
    label: 'Audit Logs',
  },
];

// User roles for role-based access control
export const ROLES = [
  {
    id: 'admin',
    label: 'Administrator',
    description: 'Full access to all system functions and settings',
  },
  {
    id: 'manager',
    label: 'Manager',
    description: 'Access to management functions across departments',
  },
  {
    id: 'staff',
    label: 'Staff',
    description: 'Standard access to operational functions',
  },
  {
    id: 'recruiter',
    label: 'Recruiter',
    description: 'Access to recruitment functions and student management',
  },
  {
    id: 'agent',
    label: 'Agent',
    description: 'Limited access for external recruitment agents',
  },
  {
    id: 'finance',
    label: 'Finance',
    description: 'Access to financial reports and payment management',
  },
  {
    id: 'support',
    label: 'Support',
    description: 'Access to student support functions',
  },
  {
    id: 'readonly',
    label: 'Read Only',
    description: 'View-only access with no editing capabilities',
  },
];

// Departments for staff and user management
export const DEPARTMENTS = [
  {
    id: 'admissions',
    label: 'Admissions',
  },
  {
    id: 'recruitment',
    label: 'Recruitment',
  },
  {
    id: 'marketing',
    label: 'Marketing',
  },
  {
    id: 'student_support',
    label: 'Student Support',
  },
  {
    id: 'compliance',
    label: 'Compliance',
  },
  {
    id: 'finance',
    label: 'Finance',
  },
  {
    id: 'operations',
    label: 'Operations',
  },
  {
    id: 'management',
    label: 'Management',
  },
  {
    id: 'it',
    label: 'IT',
  },
];

// Countries list for dropdowns
export const COUNTRIES = [
  { code: 'US', name: 'United States' },
  { code: 'GB', name: 'United Kingdom' },
  { code: 'CA', name: 'Canada' },
  { code: 'AU', name: 'Australia' },
  { code: 'NZ', name: 'New Zealand' },
  { code: 'DE', name: 'Germany' },
  { code: 'FR', name: 'France' },
  { code: 'IT', name: 'Italy' },
  { code: 'ES', name: 'Spain' },
  { code: 'JP', name: 'Japan' },
  { code: 'CN', name: 'China' },
  { code: 'IN', name: 'India' },
  { code: 'BR', name: 'Brazil' },
  { code: 'ZA', name: 'South Africa' },
  { code: 'SG', name: 'Singapore' },
  { code: 'AE', name: 'United Arab Emirates' },
  { code: 'IE', name: 'Ireland' },
  { code: 'NL', name: 'Netherlands' },
  { code: 'SE', name: 'Sweden' },
  { code: 'NO', name: 'Norway' },
  { code: 'DK', name: 'Denmark' },
  { code: 'FI', name: 'Finland' },
  { code: 'CH', name: 'Switzerland' },
  { code: 'AT', name: 'Austria' },
  { code: 'BE', name: 'Belgium' },
  { code: 'PT', name: 'Portugal' },
  { code: 'GR', name: 'Greece' },
  { code: 'IL', name: 'Israel' },
  { code: 'HK', name: 'Hong Kong' },
  { code: 'MY', name: 'Malaysia' },
];