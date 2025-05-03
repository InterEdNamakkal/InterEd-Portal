import { Check, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";

const statuses = [
  { value: "active", label: "Active", color: "bg-green-100 text-green-800" },
  { value: "pending", label: "Pending", color: "bg-yellow-100 text-yellow-800" },
  { value: "completed", label: "Completed", color: "bg-blue-100 text-blue-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
  { value: "withdrawn", label: "Withdrawn", color: "bg-gray-100 text-gray-800" },
  { value: "deferred", label: "Deferred", color: "bg-purple-100 text-purple-800" }
];

interface ApplicationStatusMenuProps {
  currentStatus: string;
  onStatusChange: (status: string) => void;
  disabled?: boolean;
}

export function ApplicationStatusMenu({
  currentStatus,
  onStatusChange,
  disabled = false
}: ApplicationStatusMenuProps) {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();

  const getCurrentStatus = () => {
    return statuses.find(status => status.value === currentStatus) ||
           { value: currentStatus, label: currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1), color: "bg-gray-100 text-gray-800" };
  };

  const handleSelect = (value: string) => {
    if (value === currentStatus) return;
    
    setOpen(false);
    onStatusChange(value);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full md:w-[200px]"
          disabled={disabled}
        >
          <Badge className={cn("font-normal mr-2", getCurrentStatus().color)}>
            {getCurrentStatus().label}
          </Badge>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full md:w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search status..." />
          <CommandEmpty>No status found.</CommandEmpty>
          <CommandGroup>
            {statuses.map((status) => (
              <CommandItem
                key={status.value}
                value={status.value}
                onSelect={handleSelect}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    currentStatus === status.value
                      ? "opacity-100"
                      : "opacity-0"
                  )}
                />
                <Badge className={cn("font-normal", status.color)}>
                  {status.label}
                </Badge>
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}