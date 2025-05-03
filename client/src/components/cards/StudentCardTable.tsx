import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Avatar } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { StandardActions } from "@/components/ui/ActionMenu";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

// Types for the card data
export interface StudentCard {
  id: number;
  cardNumber: string;
  student: {
    id: number;
    name: string;
    email: string;
    avatar?: string;
  };
  issueDate: Date;
  expiryDate: Date;
  plan: "standard" | "premium";
  status: "active" | "pending" | "inactive";
}

interface StudentCardTableProps {
  cards: StudentCard[];
  onEditCard: (id: number) => void;
  onActivateCard: (id: number) => void;
  onSuspendCard: (id: number) => void;
  onDeleteCard: (id: number) => void;
}

export const StudentCardTable = ({
  cards,
  onEditCard,
  onActivateCard,
  onSuspendCard,
  onDeleteCard,
}: StudentCardTableProps) => {
  // Helper function to get initials
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase();
  };

  // Status badge classes
  const statusClasses = {
    active: "bg-green-100 text-green-800 hover:bg-green-200",
    pending: "bg-yellow-100 text-yellow-800 hover:bg-yellow-200",
    inactive: "bg-gray-100 text-gray-800 hover:bg-gray-200",
  };

  // Plan badge classes
  const planClasses = {
    standard: "bg-blue-100 text-blue-800",
    premium: "bg-purple-100 text-purple-800",
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[50px]">ID</TableHead>
          <TableHead>STUDENT</TableHead>
          <TableHead>CARD NUMBER</TableHead>
          <TableHead>ISSUE DATE</TableHead>
          <TableHead>EXPIRY DATE</TableHead>
          <TableHead>PLAN</TableHead>
          <TableHead>STATUS</TableHead>
          <TableHead className="text-right">ACTIONS</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cards.map((card) => (
          <TableRow key={card.id} className="group">
            <TableCell className="font-medium">#{card.id}</TableCell>
            <TableCell>
              <div className="flex items-center space-x-2">
                <Avatar className="h-8 w-8 text-xs bg-blue-100 text-blue-800">
                  <div>{getInitials(card.student.name)}</div>
                </Avatar>
                <div>
                  <div className="font-medium">{card.student.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {card.student.email}
                  </div>
                </div>
              </div>
            </TableCell>
            <TableCell>{card.cardNumber}</TableCell>
            <TableCell>{format(card.issueDate, "MMM dd, yyyy")}</TableCell>
            <TableCell>{format(card.expiryDate, "MMM dd, yyyy")}</TableCell>
            <TableCell>
              <Badge className={cn("font-normal", planClasses[card.plan])}>
                {card.plan.charAt(0).toUpperCase() + card.plan.slice(1)}
              </Badge>
            </TableCell>
            <TableCell>
              <Badge className={cn("font-normal", statusClasses[card.status])}>
                {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
              </Badge>
            </TableCell>
            <TableCell className="text-right">
              <StandardActions
                onView={() => console.log(`View card details for ${card.id}`)}
                onEdit={() => onEditCard(card.id)}
                onEmailStudent={() => window.open(`mailto:${card.student.email}`, '_blank')}
                onScheduleEvent={() => console.log(`Schedule event for card ${card.id}`)}
                onActivate={card.status !== "active" ? () => onActivateCard(card.id) : undefined}
                onSuspend={card.status === "active" ? () => onSuspendCard(card.id) : undefined}
                onDelete={() => onDeleteCard(card.id)}
                disableActivate={card.status === "active"}
                disableSuspend={card.status !== "active"}
              />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};