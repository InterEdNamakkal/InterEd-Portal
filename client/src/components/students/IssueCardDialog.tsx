import { useState } from "react";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { format, addYears } from "date-fns";

interface IssueCardDialogProps {
  studentId: number;
  studentName: string;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess?: () => void;
}

export default function IssueCardDialog({
  studentId,
  studentName,
  open,
  onOpenChange,
  onSuccess,
}: IssueCardDialogProps) {
  const [plan, setPlan] = useState<string>("standard");
  const [cardNumber, setCardNumber] = useState<string>("");
  const [expiryDate, setExpiryDate] = useState<string>(
    format(addYears(new Date(), 1), "yyyy-MM-dd")
  );
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Generate a random card number
  const generateCardNumber = () => {
    const prefix = "2023";
    const randomDigits = Math.floor(Math.random() * 10000000000).toString().padStart(10, '0');
    setCardNumber(`${prefix}${randomDigits}`);
  };

  // Mutation to issue a card to the student
  const { mutate: issueCard, isPending } = useMutation({
    mutationFn: async () => {
      const res = await apiRequest("POST", `/api/cards`, {
        studentId,
        cardNumber,
        plan,
        issueDate: format(new Date(), "yyyy-MM-dd"),
        expiryDate,
        status: "active"
      });
      if (res) {
        return await res.json();
      }
      throw new Error("Failed to issue card");
    },
    onSuccess: () => {
      toast({
        title: "Card issued",
        description: `InterPro card has been issued to ${studentName}.`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/cards"] });
      queryClient.invalidateQueries({ queryKey: ["/api/students"] });
      queryClient.invalidateQueries({ queryKey: [`/api/students/${studentId}`] });
      onOpenChange(false);
      if (onSuccess) onSuccess();
    },
    onError: (error: Error) => {
      toast({
        title: "Failed to issue card",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cardNumber) {
      toast({
        title: "Card number required",
        description: "Please generate or enter a card number.",
        variant: "destructive",
      });
      return;
    }
    issueCard();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Issue InterPro Card</DialogTitle>
          <DialogDescription>
            Issue a new InterPro card to {studentName}.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cardNumber" className="text-right">
                Card Number
              </Label>
              <div className="col-span-3 flex gap-2">
                <Input
                  id="cardNumber"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  disabled={isPending}
                  placeholder="Card number"
                  className="w-full"
                />
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={generateCardNumber}
                  disabled={isPending}
                >
                  Generate
                </Button>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="plan" className="text-right">
                Plan
              </Label>
              <div className="col-span-3">
                <Select
                  value={plan}
                  onValueChange={setPlan}
                  disabled={isPending}
                >
                  <SelectTrigger id="plan">
                    <SelectValue placeholder="Select a plan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="premium">Premium</SelectItem>
                    <SelectItem value="platinum">Platinum</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="expiryDate" className="text-right">
                Expiry Date
              </Label>
              <div className="col-span-3">
                <Input
                  id="expiryDate"
                  type="date"
                  value={expiryDate}
                  onChange={(e) => setExpiryDate(e.target.value)}
                  disabled={isPending}
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} disabled={isPending}>
              Cancel
            </Button>
            <Button type="submit" disabled={isPending || !cardNumber}>
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Issue Card
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}