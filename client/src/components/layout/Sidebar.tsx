import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { NAVIGATION_ITEMS } from "@/lib/constants";
import { ChevronDown, ChevronUp, X } from "lucide-react";
import * as Icons from "lucide-react";

type IconProps = React.ComponentProps<typeof Icons.Accessibility>

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const [location] = useLocation();
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({
    'student-management': true, // Default expanded
    'applications': false,
    'agent-management': false,
    'university-partnerships': false,
    'interpro-cards': false,
  });

  // Dynamically get icon component
  const LucideIcon = ({ name, ...props }: IconProps & { name: string }) => {
    // Get the icon component dynamically or fallback to CircleDot
    const IconComponent = Icons[name as keyof typeof Icons] || Icons.CircleDot;
    // Use the component directly with JSX
    return <IconComponent {...props} />;
  };

  const toggleExpandItem = (itemId: string) => {
    setExpandedItems(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
  };

  // Check if path is active
  const isPathActive = (path: string) => {
    if (path === '/' && location === '/') return true;
    if (path !== '/' && location.startsWith(path)) return true;
    return false;
  };

  // Manually define navigation items to exactly match the screenshot
  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      path: '/',
      icon: 'LayoutDashboard',
      hasChildren: false
    },
    {
      id: 'student-management',
      label: 'Student Management',
      path: '/students',
      icon: 'Users',
      hasChildren: true,
      children: [
        {
          id: 'all-students',
          label: 'All Students',
          path: '/students'
        },
        {
          id: 'prospective-students',
          label: 'Prospective Students',
          path: '/students/prospective'
        },
        {
          id: 'current-students',
          label: 'Current Students',
          path: '/students/current'
        },
        {
          id: 'alumni-students',
          label: 'Alumni',
          path: '/students/alumni'
        }
      ]
    },
    {
      id: 'applications',
      label: 'Applications',
      path: '/applications',
      icon: 'FileText',
      hasChildren: true,
      children: [
        {
          id: 'all-applications',
          label: 'All Applications',
          path: '/applications'
        },
        {
          id: 'pending-applications',
          label: 'Pending Applications',
          path: '/applications/pending'
        },
        {
          id: 'approved-applications',
          label: 'Approved Applications',
          path: '/applications/approved'
        },
        {
          id: 'rejected-applications',
          label: 'Rejected Applications',
          path: '/applications/rejected'
        }
      ]
    },
    {
      id: 'agent-management',
      label: 'Agent Management',
      path: '/agents',
      icon: 'Users',
      hasChildren: true,
      children: [
        {
          id: 'all-agents',
          label: 'All Agents',
          path: '/agents'
        },
        {
          id: 'active-agents',
          label: 'Active Agents',
          path: '/agents/active'
        },
        {
          id: 'pending-agents',
          label: 'Pending Approval',
          path: '/agents/pending'
        },
        {
          id: 'agreements',
          label: 'Agreements',
          path: '/agents/agreements'
        }
      ]
    },
    {
      id: 'university-partnerships',
      label: 'University Partnerships',
      path: '/universities',
      icon: 'GraduationCap',
      hasChildren: true,
      children: [
        {
          id: 'all-universities',
          label: 'All Universities',
          path: '/universities'
        },
        {
          id: 'programs',
          label: 'Programs',
          path: '/universities/programs'
        },
        {
          id: 'admissions',
          label: 'Admissions Requirements',
          path: '/universities/admissions'
        }
      ]
    },
    {
      id: 'interpro-cards',
      label: 'InterPro Cards',
      path: '/cards',
      icon: 'CreditCard',
      hasChildren: true,
      children: [
        {
          id: 'all-cards',
          label: 'All Cards',
          path: '/cards'
        },
        {
          id: 'active-cards',
          label: 'Active Cards',
          path: '/cards/active'
        },
        {
          id: 'card-applications',
          label: 'Card Applications',
          path: '/cards/applications'
        },
        {
          id: 'card-reports',
          label: 'Reports & Analytics',
          path: '/cards/reports'
        }
      ]
    },
    {
      id: 'student-journey',
      label: 'Student Journey',
      path: '/journey',
      icon: 'Route',
      hasChildren: true,
      children: [
        {
          id: 'journey-overview',
          label: 'Journey Overview',
          path: '/journey'
        },
        {
          id: 'journey-stages',
          label: 'Journey Stages',
          path: '/journey/stages'
        },
        {
          id: 'journey-templates',
          label: 'Journey Templates',
          path: '/journey/templates'
        }
      ]
    },
    {
      id: 'events-webinars',
      label: 'Events & Webinars',
      path: '/events',
      icon: 'Calendar',
      hasChildren: true,
      children: [
        {
          id: 'all-events',
          label: 'All Events',
          path: '/events'
        },
        {
          id: 'upcoming-events',
          label: 'Upcoming Events',
          path: '/events/upcoming'
        },
        {
          id: 'past-events',
          label: 'Past Events',
          path: '/events/past'
        },
        {
          id: 'event-registration',
          label: 'Event Registration',
          path: '/events/registration'
        }
      ]
    },
    {
      id: 'marketing',
      label: 'Marketing',
      path: '/marketing',
      icon: 'Megaphone',
      hasChildren: true,
      children: [
        {
          id: 'marketing-campaigns',
          label: 'Campaigns',
          path: '/marketing'
        },
        {
          id: 'marketing-automation',
          label: 'Automation',
          path: '/marketing/automation'
        },
        {
          id: 'marketing-analytics',
          label: 'Analytics',
          path: '/marketing/analytics'
        }
      ]
    },
    {
      id: 'communication-center',
      label: 'Communication Center',
      path: '/communications',
      icon: 'Mail',
      hasChildren: true,
      children: [
        {
          id: 'communication-messages',
          label: 'Messages',
          path: '/communications'
        },
        {
          id: 'communication-templates',
          label: 'Templates',
          path: '/communications/templates'
        },
        {
          id: 'communication-bulk',
          label: 'Bulk Communications',
          path: '/communications/bulk'
        }
      ]
    },
    {
      id: 'content-document-management',
      label: 'Content & Document Management',
      path: '/content',
      icon: 'FileText',
      hasChildren: true,
      children: [
        {
          id: 'all-documents',
          label: 'All Documents',
          path: '/content'
        },
        {
          id: 'document-templates',
          label: 'Document Templates',
          path: '/content/templates'
        },
        {
          id: 'document-categories',
          label: 'Categories',
          path: '/content/categories'
        }
      ]
    },
    {
      id: 'finance',
      label: 'Finance',
      path: '/finance',
      icon: 'DollarSign',
      hasChildren: true,
      children: [
        {
          id: 'finance-overview',
          label: 'Finance Overview',
          path: '/finance'
        },
        {
          id: 'finance-invoices',
          label: 'Invoices',
          path: '/finance/invoices'
        },
        {
          id: 'finance-payments',
          label: 'Payments',
          path: '/finance/payments'
        },
        {
          id: 'finance-reports',
          label: 'Financial Reports',
          path: '/finance/reports'
        }
      ]
    },
    {
      id: 'staff-management',
      label: 'Staff Management',
      path: '/staff',
      icon: 'Users',
      hasChildren: true,
      children: [
        {
          id: 'all-staff',
          label: 'All Staff',
          path: '/staff'
        },
        {
          id: 'staff-roles',
          label: 'Roles & Permissions',
          path: '/staff/roles'
        },
        {
          id: 'staff-performance',
          label: 'Performance',
          path: '/staff/performance'
        }
      ]
    },
    {
      id: 'compliance',
      label: 'Compliance',
      path: '/compliance',
      icon: 'Shield',
      hasChildren: true,
      children: [
        {
          id: 'compliance-overview',
          label: 'Compliance Overview',
          path: '/compliance'
        },
        {
          id: 'compliance-requirements',
          label: 'Requirements',
          path: '/compliance/requirements'
        },
        {
          id: 'compliance-audit',
          label: 'Audit Log',
          path: '/compliance/audit'
        }
      ]
    },
    {
      id: 'api-management',
      label: 'API Management',
      path: '/api',
      icon: 'Code',
      hasChildren: true,
      children: [
        {
          id: 'api-keys',
          label: 'API Keys',
          path: '/api'
        },
        {
          id: 'api-documentation',
          label: 'Documentation',
          path: '/api/docs'
        },
        {
          id: 'api-webhooks',
          label: 'Webhooks',
          path: '/api/webhooks'
        }
      ]
    },
    {
      id: 'reports',
      label: 'Reports',
      path: '/reports',
      icon: 'BarChart2',
      hasChildren: true,
      children: [
        {
          id: 'reports-dashboard',
          label: 'Reports Dashboard',
          path: '/reports'
        },
        {
          id: 'reports-student',
          label: 'Student Reports',
          path: '/reports/students'
        },
        {
          id: 'reports-agent',
          label: 'Agent Reports',
          path: '/reports/agents'
        },
        {
          id: 'reports-performance',
          label: 'Performance Reports',
          path: '/reports/performance'
        }
      ]
    },
    {
      id: 'system-configuration',
      label: 'System Configuration',
      path: '/system',
      icon: 'Settings',
      hasChildren: true,
      children: [
        {
          id: 'system-general',
          label: 'General Settings',
          path: '/system'
        },
        {
          id: 'system-branding',
          label: 'Branding',
          path: '/system/branding'
        },
        {
          id: 'system-integrations',
          label: 'Integrations',
          path: '/system/integrations'
        },
        {
          id: 'system-backup',
          label: 'Backup & Restore',
          path: '/system/backup'
        }
      ]
    }
  ];

  return (
    <aside className={cn(
      "fixed inset-y-0 left-0 z-50 bg-[#312e81] text-white w-64 flex-shrink-0 flex flex-col transition-transform duration-300 ease-in-out transform lg:translate-x-0",
      isOpen ? "translate-x-0" : "-translate-x-full"
    )}>
      <div className="p-4 flex items-center justify-between border-b border-indigo-800">
        <h1 className="text-xl font-semibold">InterEd Admin</h1>
        <Button 
          variant="ghost" 
          size="icon"
          className="text-white hover:bg-indigo-800"
          onClick={onClose}
        >
          <X className="h-5 w-5" />
        </Button>
      </div>
      
      {/* Admin Profile */}
      <div className="p-4 border-b border-indigo-800">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-primary-300 flex items-center justify-center text-indigo-900 font-semibold">
            RS
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium">Rahul Sharma</p>
            <p className="text-xs text-indigo-200">Super Admin</p>
          </div>
        </div>
      </div>
      
      {/* Navigation Menu */}
      <ScrollArea className="flex-1">
        <nav className="mt-2">
          {navigationItems.map(item => (
            <div key={item.id} className="relative">
              {item.hasChildren ? (
                <>
                  <button
                    onClick={() => toggleExpandItem(item.id)}
                    className={cn(
                      "flex items-center justify-between w-full px-4 py-3",
                      expandedItems[item.id] || isPathActive(item.path) 
                        ? "bg-indigo-800 text-white" 
                        : "text-indigo-100 hover:bg-indigo-800"
                    )}
                  >
                    <div className="flex items-center">
                      <LucideIcon name={item.icon} className="w-5 h-5" />
                      <span className="ml-3">{item.label}</span>
                    </div>
                    {expandedItems[item.id] ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  {expandedItems[item.id] && item.children && (
                    <div className="bg-indigo-950 py-1">
                      {item.children.map(child => (
                        <Link 
                          key={child.id}
                          href={child.path}
                          className={cn(
                            "flex items-center pl-12 pr-4 py-2 text-sm hover:bg-indigo-800",
                            isPathActive(child.path) ? "text-white bg-indigo-800" : "text-indigo-100"
                          )}
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </>
              ) : (
                <Link 
                  href={item.path}
                  className={cn(
                    "flex items-center px-4 py-3",
                    isPathActive(item.path) ? "bg-indigo-800 text-white" : "text-indigo-100 hover:bg-indigo-800"
                  )}
                >
                  <LucideIcon name={item.icon} className="w-5 h-5" />
                  <span className="ml-3">{item.label}</span>
                </Link>
              )}
            </div>
          ))}
        </nav>
      </ScrollArea>
      
      <div className="p-4 text-xs text-center text-indigo-300 border-t border-indigo-800">
        <p>InterEd Admin v1.0</p>
      </div>
    </aside>
  );
};

export default Sidebar;
