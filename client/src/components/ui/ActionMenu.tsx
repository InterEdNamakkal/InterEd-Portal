import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Pencil, 
  Power, 
  AlertOctagon, 
  Trash2, 
  Eye, 
  FileText, 
  Star, 
  Phone, 
  Mail, 
  ClipboardCheck, 
  CreditCard,
  FileUp,
  Calendar,
  GraduationCap,
  Clock
} from "lucide-react";
import { cn } from "@/lib/utils";

export type ActionItem = {
  id: string;
  label: string;
  icon: string | React.ElementType;
  onClick: () => void;
  variant?: 'default' | 'destructive';
  disabled?: boolean;
};

// Predefined common actions
export const viewAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'view',
  label: 'View Details',
  icon: 'Eye',
  onClick,
  disabled
});

export const editAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'edit',
  label: 'Edit Details',
  icon: 'Pencil',
  onClick,
  disabled
});

export const addApplicationAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'addApplication',
  label: 'Add Application',
  icon: 'FileText',
  onClick,
  disabled
});

export const markAsPriorityAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'markAsPriority',
  label: 'Mark as Priority',
  icon: 'Star',
  onClick,
  disabled
});

export const callStudentAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'callStudent',
  label: 'Call Student',
  icon: 'Phone',
  onClick,
  disabled
});

export const emailStudentAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'emailStudent',
  label: 'Email Student',
  icon: 'Mail',
  onClick,
  disabled
});

export const assignToAgentAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'assignToAgent',
  label: 'Assign to Agent',
  icon: 'ClipboardCheck',
  onClick,
  disabled
});

export const issueCardAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'issueCard',
  label: 'Issue InterPro Card',
  icon: 'CreditCard',
  onClick,
  disabled
});

export const scheduleEventAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'scheduleEvent',
  label: 'Schedule Event',
  icon: 'Calendar',
  onClick,
  disabled
});

export const activateAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'activate',
  label: 'Activate',
  icon: 'Power',
  onClick,
  disabled
});

export const suspendAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'suspend',
  label: 'Suspend',
  icon: 'AlertOctagon',
  onClick,
  disabled
});

export const deleteAction = (onClick: () => void, disabled = false): ActionItem => ({
  id: 'delete',
  label: 'Delete',
  icon: 'Trash2',
  variant: 'destructive',
  onClick,
  disabled
});

interface ActionMenuProps {
  actions: ActionItem[];
  align?: 'start' | 'center' | 'end';
  className?: string;
}

// Icon component that dynamically renders the appropriate Lucide icon
const ActionIcon = ({ icon }: { icon: string | React.ElementType }) => {
  // If the icon is a component (React ElementType)
  if (typeof icon !== 'string') {
    const IconComponent = icon;
    return <IconComponent className="mr-2 h-4 w-4" />;
  }

  // Handle string-based icons
  switch (icon) {
    case 'Eye':
      return <Eye className="mr-2 h-4 w-4" />;
    case 'Pencil':
      return <Pencil className="mr-2 h-4 w-4" />;
    case 'FileText':
      return <FileText className="mr-2 h-4 w-4" />;
    case 'Star':
      return <Star className="mr-2 h-4 w-4" />;
    case 'Phone':
      return <Phone className="mr-2 h-4 w-4" />;
    case 'Mail':
      return <Mail className="mr-2 h-4 w-4" />;
    case 'ClipboardCheck':
      return <ClipboardCheck className="mr-2 h-4 w-4" />;
    case 'CreditCard':
      return <CreditCard className="mr-2 h-4 w-4" />;
    case 'Calendar':
      return <Calendar className="mr-2 h-4 w-4" />;
    case 'Power':
      return <Power className="mr-2 h-4 w-4" />;
    case 'AlertOctagon':
      return <AlertOctagon className="mr-2 h-4 w-4" />;
    case 'Trash2':
      return <Trash2 className="mr-2 h-4 w-4" />;
    case 'FileUp':
      return <FileUp className="mr-2 h-4 w-4" />;
    case 'GraduationCap':
      return <GraduationCap className="mr-2 h-4 w-4" />;
    case 'Clock':
      return <Clock className="mr-2 h-4 w-4" />;
    default:
      return null;
  }
};

export const ActionMenu = ({ actions, align = 'end', className }: ActionMenuProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button 
          variant="ghost" 
          className={cn("h-8 w-8 p-0", className)}
          aria-label="More options"
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align={align}>
        {actions.map((action, index) => {
          if (action.id === 'separator') {
            return <DropdownMenuSeparator key={`separator-${index}`} />;
          }
          
          return (
            <DropdownMenuItem
              key={action.id}
              onClick={action.onClick}
              disabled={action.disabled}
              className={cn(
                "flex items-center cursor-pointer",
                action.variant === 'destructive' && "text-destructive focus:text-destructive"
              )}
            >
              <ActionIcon icon={action.icon} />
              {action.label}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// A component that renders standard actions (edit, activate, suspend, delete) for common use cases
interface StandardActionsProps {
  onView?: () => void;
  onEdit?: () => void;
  onAddApplication?: () => void;
  onMarkAsPriority?: () => void;
  onCallStudent?: () => void;
  onEmailStudent?: () => void;
  onAssignToAgent?: () => void;
  onIssueCard?: () => void;
  onScheduleEvent?: () => void;
  onActivate?: () => void;
  onSuspend?: () => void;
  onDelete?: () => void;
  customActions?: ActionItem[];
  disableView?: boolean;
  disableEdit?: boolean;
  disableAddApplication?: boolean;
  disableMarkAsPriority?: boolean;
  disableCallStudent?: boolean;
  disableEmailStudent?: boolean;
  disableAssignToAgent?: boolean;
  disableIssueCard?: boolean;
  disableScheduleEvent?: boolean;
  disableActivate?: boolean;
  disableSuspend?: boolean;
  disableDelete?: boolean;
  align?: 'start' | 'center' | 'end';
  className?: string;
}

export const StandardActions = ({
  onView,
  onEdit,
  onAddApplication,
  onMarkAsPriority,
  onCallStudent,
  onEmailStudent,
  onAssignToAgent,
  onIssueCard,
  onScheduleEvent,
  onActivate,
  onSuspend,
  onDelete,
  customActions = [],
  disableView = false,
  disableEdit = false,
  disableAddApplication = false,
  disableMarkAsPriority = false,
  disableCallStudent = false,
  disableEmailStudent = false,
  disableAssignToAgent = false,
  disableIssueCard = false,
  disableScheduleEvent = false,
  disableActivate = false,
  disableSuspend = false,
  disableDelete = false,
  align = 'end',
  className
}: StandardActionsProps) => {
  const actions: ActionItem[] = [];
  
  // Primary actions
  if (onView) {
    actions.push(viewAction(onView, disableView));
  }
  
  if (onEdit) {
    actions.push(editAction(onEdit, disableEdit));
  }
  
  if (onAddApplication) {
    actions.push(addApplicationAction(onAddApplication, disableAddApplication));
  }
  
  // Secondary actions - communication and assignment
  if (onMarkAsPriority || onCallStudent || onEmailStudent || onAssignToAgent) {
    // Add a separator if we already have actions
    if (actions.length > 0) {
      actions.push({
        id: 'separator-1',
        label: '',
        icon: '',
        onClick: () => {}
      } as any);
    }
    
    if (onMarkAsPriority) {
      actions.push(markAsPriorityAction(onMarkAsPriority, disableMarkAsPriority));
    }
    
    if (onCallStudent) {
      actions.push(callStudentAction(onCallStudent, disableCallStudent));
    }
    
    if (onEmailStudent) {
      actions.push(emailStudentAction(onEmailStudent, disableEmailStudent));
    }
    
    if (onAssignToAgent) {
      actions.push(assignToAgentAction(onAssignToAgent, disableAssignToAgent));
    }
  }
  
  // Tertiary actions - services and activities
  if (onIssueCard || onScheduleEvent || onActivate || onSuspend) {
    // Add a separator if we already have actions
    if (actions.length > 0) {
      actions.push({
        id: 'separator-2',
        label: '',
        icon: '',
        onClick: () => {}
      } as any);
    }
    
    if (onIssueCard) {
      actions.push(issueCardAction(onIssueCard, disableIssueCard));
    }
    
    if (onScheduleEvent) {
      actions.push(scheduleEventAction(onScheduleEvent, disableScheduleEvent));
    }
    
    if (onActivate) {
      actions.push(activateAction(onActivate, disableActivate));
    }
    
    if (onSuspend) {
      actions.push(suspendAction(onSuspend, disableSuspend));
    }
  }

  // Custom actions
  if (customActions.length > 0) {
    // Add a separator if we already have actions
    if (actions.length > 0) {
      actions.push({
        id: 'separator-custom',
        label: '',
        icon: '',
        onClick: () => {}
      } as any);
    }
    
    // Add all custom actions
    actions.push(...customActions);
  }
  
  // Destructive actions
  if (onDelete) {
    // Add a separator if we already have actions
    if (actions.length > 0) {
      actions.push({
        id: 'separator-3',
        label: '',
        icon: '',
        onClick: () => {}
      } as any);
    }
    actions.push(deleteAction(onDelete, disableDelete));
  }
  
  return <ActionMenu actions={actions} align={align} className={className} />;
};