import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Search,
  Filter,
  Download,
  Calendar,
  Coffee,
  BookOpen,
  Smartphone,
  Train,
  Home,
  Utensils,
  CreditCard,
  FileText,
  ShoppingBag,
  EyeIcon
} from "lucide-react";
import { TRANSACTION_TYPES } from "@/lib/constants";
import { Avatar } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
// import { DateRangePicker } from "@/components/ui/date-range-picker";

export default function CardTransactions() {
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>([]);

  // Toggle select all transactions
  const toggleSelectAll = () => {
    if (selectedTransactions.length === filteredTransactions.length) {
      setSelectedTransactions([]);
    } else {
      setSelectedTransactions(filteredTransactions.map(t => t.id));
    }
  };

  // Toggle select single transaction
  const toggleSelect = (id: number) => {
    if (selectedTransactions.includes(id)) {
      setSelectedTransactions(selectedTransactions.filter(t => t !== id));
    } else {
      setSelectedTransactions([...selectedTransactions, id]);
    }
  };

  // Filter transactions based on search, type, and status
  const filteredTransactions = transactions.filter(transaction => {
    const matchesSearch = searchTerm === "" || 
      transaction.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.benefitName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      transaction.transactionId.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || transaction.type === typeFilter;
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Card Transactions</h1>
          <p className="text-muted-foreground">
            View and manage student card benefits usage and transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>Date Range</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <TransactionSummaryCard 
          title="Total Transactions"
          value="2,348"
          change="+13%"
          trend="up"
        />
        <TransactionSummaryCard 
          title="Dining & Food"
          value="873"
          change="+21%"
          trend="up"
        />
        <TransactionSummaryCard 
          title="Transportation"
          value="564"
          change="+9%"
          trend="up"
        />
        <TransactionSummaryCard 
          title="Academic Resources"
          value="452"
          change="+6%"
          trend="up"
        />
      </div>

      <div className="flex justify-between items-center">
        <div className="relative w-[300px]">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-3">
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="All Transaction Types" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="discount">Discount</SelectItem>
              <SelectItem value="service">Service Access</SelectItem>
              <SelectItem value="activation">Card Activation</SelectItem>
              <SelectItem value="renewal">Card Renewal</SelectItem>
              <SelectItem value="upgrade">Plan Upgrade</SelectItem>
            </SelectContent>
          </Select>
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="All Statuses" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="successful">Successful</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="failed">Failed</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="flex items-center gap-1">
            <Filter className="h-4 w-4" />
            <span>More Filters</span>
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between">
            <CardTitle>Transaction History</CardTitle>
            <div className="text-sm text-muted-foreground">
              {filteredTransactions.length} transactions found
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[50px]">
                  <Checkbox 
                    checked={selectedTransactions.length === filteredTransactions.length && filteredTransactions.length > 0}
                    onCheckedChange={toggleSelectAll}
                  />
                </TableHead>
                <TableHead>TRANSACTION ID</TableHead>
                <TableHead>STUDENT</TableHead>
                <TableHead>BENEFIT</TableHead>
                <TableHead>DATE & TIME</TableHead>
                <TableHead>TYPE</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead className="text-right">ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredTransactions.map((transaction) => (
                <TableRow key={transaction.id} className="group">
                  <TableCell>
                    <Checkbox 
                      checked={selectedTransactions.includes(transaction.id)}
                      onCheckedChange={() => toggleSelect(transaction.id)}
                    />
                  </TableCell>
                  <TableCell className="font-mono text-xs">{transaction.transactionId}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Avatar className="h-8 w-8 text-xs bg-blue-100 text-blue-800">
                        <div>{getInitials(transaction.student.name)}</div>
                      </Avatar>
                      <div className="text-sm font-medium">{transaction.student.name}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className={transaction.iconBg}>
                        {transaction.icon}
                      </div>
                      <span className="text-sm">{transaction.benefitName}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">{transaction.date}</div>
                    <div className="text-xs text-muted-foreground">{transaction.time}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
                      {transaction.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {transaction.amount ? (
                      <div className="font-medium">{transaction.amount}</div>
                    ) : (
                      <div className="text-muted-foreground">-</div>
                    )}
                  </TableCell>
                  <TableCell>
                    {renderStatusBadge(transaction.status)}
                  </TableCell>
                  <TableCell className="text-right">
                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{filteredTransactions.length}</strong> out of <strong>{transactions.length}</strong> transactions
        </div>
        <div className="flex items-center gap-6">
          <div className="text-sm">
            Page 1 of 1
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>Previous</Button>
            <Button variant="outline" size="sm" disabled>Next</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface TransactionSummaryCardProps {
  title: string;
  value: string;
  change: string;
  trend: "up" | "down";
}

function TransactionSummaryCard({ title, value, change, trend }: TransactionSummaryCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold mt-1">{value}</p>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <div className={trend === "up" ? "text-green-600" : "text-red-600"}>
            {trend === "up" ? "↑" : "↓"} {change}
          </div>
          <p className="text-xs text-muted-foreground">vs last month</p>
        </div>
      </CardContent>
    </Card>
  );
}

function getInitials(name: string): string {
  const parts = name.split(' ');
  if (parts.length === 1) return parts[0].substring(0, 2).toUpperCase();
  return (parts[0][0] + parts[1][0]).toUpperCase();
}

function renderStatusBadge(status: string) {
  switch (status) {
    case 'successful':
      return (
        <Badge variant="outline" className="bg-green-50 text-green-800 border-green-100">
          Successful
        </Badge>
      );
    case 'pending':
      return (
        <Badge variant="outline" className="bg-yellow-50 text-yellow-800 border-yellow-100">
          Pending
        </Badge>
      );
    case 'failed':
      return (
        <Badge variant="outline" className="bg-red-50 text-red-800 border-red-100">
          Failed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline" className="bg-blue-50 text-blue-800 border-blue-100">
          {status}
        </Badge>
      );
  }
}

// Mock data for transactions
const transactions = [
  {
    id: 1,
    transactionId: "TX-2025-0001",
    student: {
      name: "Aditya Patel"
    },
    benefitName: "Campus Café Discount",
    iconBg: "bg-amber-50 p-2 rounded-md",
    icon: <Coffee className="h-4 w-4 text-amber-600" />,
    date: "Mar 31, 2025",
    time: "10:15 AM",
    type: "discount",
    amount: "₹120.00 (20% off)",
    status: "successful"
  },
  {
    id: 2,
    transactionId: "TX-2025-0002",
    student: {
      name: "Min-Ji Kim"
    },
    benefitName: "Textbook Purchase",
    iconBg: "bg-blue-50 p-2 rounded-md",
    icon: <BookOpen className="h-4 w-4 text-blue-600" />,
    date: "Mar 31, 2025",
    time: "11:30 AM",
    type: "discount",
    amount: "₹450.00 (15% off)",
    status: "successful"
  },
  {
    id: 3,
    transactionId: "TX-2025-0003",
    student: {
      name: "Carlos Rodriguez"
    },
    benefitName: "Card Activation",
    iconBg: "bg-green-50 p-2 rounded-md",
    icon: <CreditCard className="h-4 w-4 text-green-600" />,
    date: "Mar 30, 2025",
    time: "2:45 PM",
    type: "activation",
    amount: "",
    status: "successful"
  },
  {
    id: 4,
    transactionId: "TX-2025-0004",
    student: {
      name: "Sophia Chang"
    },
    benefitName: "Public Transport Pass",
    iconBg: "bg-green-50 p-2 rounded-md",
    icon: <Train className="h-4 w-4 text-green-600" />,
    date: "Mar 30, 2025",
    time: "9:20 AM",
    type: "service",
    amount: "₹800.00 (50% off)",
    status: "successful"
  },
  {
    id: 5,
    transactionId: "TX-2025-0005",
    student: {
      name: "Mohammed Al-Farsi"
    },
    benefitName: "Tech Store Purchase",
    iconBg: "bg-purple-50 p-2 rounded-md",
    icon: <Smartphone className="h-4 w-4 text-purple-600" />,
    date: "Mar 29, 2025",
    time: "4:10 PM",
    type: "discount",
    amount: "₹3,750.00 (25% off)",
    status: "successful"
  },
  {
    id: 6,
    transactionId: "TX-2025-0006",
    student: {
      name: "Elena Petrova"
    },
    benefitName: "Food Delivery",
    iconBg: "bg-orange-50 p-2 rounded-md",
    icon: <Utensils className="h-4 w-4 text-orange-600" />,
    date: "Mar 29, 2025",
    time: "7:35 PM",
    type: "service",
    amount: "Free Delivery",
    status: "successful"
  },
  {
    id: 7,
    transactionId: "TX-2025-0007",
    student: {
      name: "Ngan Tran"
    },
    benefitName: "Premium Plan Upgrade",
    iconBg: "bg-indigo-50 p-2 rounded-md",
    icon: <FileText className="h-4 w-4 text-indigo-600" />,
    date: "Mar 28, 2025",
    time: "11:15 AM",
    type: "upgrade",
    amount: "₹1,200.00",
    status: "pending"
  },
  {
    id: 8,
    transactionId: "TX-2025-0008",
    student: {
      name: "Ahmed Hassan"
    },
    benefitName: "Campus Store Purchase",
    iconBg: "bg-yellow-50 p-2 rounded-md",
    icon: <ShoppingBag className="h-4 w-4 text-yellow-600" />,
    date: "Mar 28, 2025",
    time: "1:45 PM",
    type: "discount",
    amount: "₹350.00 (10% off)",
    status: "failed"
  },
  {
    id: 9,
    transactionId: "TX-2025-0009",
    student: {
      name: "Aditya Patel"
    },
    benefitName: "Card Renewal",
    iconBg: "bg-blue-50 p-2 rounded-md",
    icon: <CreditCard className="h-4 w-4 text-blue-600" />,
    date: "Mar 27, 2025",
    time: "10:00 AM",
    type: "renewal",
    amount: "₹500.00",
    status: "successful"
  }
];