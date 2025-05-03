import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, ChevronUp, ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function FinancialManagement() {
  const [timeFilter, setTimeFilter] = useState("last-30-days");

  // Mock financial data (would come from API in real implementation)
  const financialData = {
    totalRevenue: {
      amount: 1254750,
      percentChange: 12.5,
    },
    agentCommissions: {
      amount: 187250,
      percentChange: 8.2,
    },
    outstandingPayments: {
      amount: 68450,
      percentChange: -1.9,
    },
    refundsProcessed: {
      amount: 12850,
      percentChange: 2.1,
    },
    revenueBySource: [
      { source: "Application Fees", amount: 234500, percentage: 18.7 },
      { source: "Tuition Payments", amount: 875250, percentage: 69.8 },
      { source: "Service Charges", amount: 98750, percentage: 7.9 },
      { source: "Document Verification", amount: 46250, percentage: 3.6 },
    ],
    recentInvoices: [
      {
        id: "INV-2025-4127",
        student: "Vikram Patel",
        amount: 28500,
        date: "Mar 28, 2025",
        status: "paid"
      },
      {
        id: "INV-2025-4126",
        student: "Ananya Singh",
        amount: 31200,
        date: "Mar 26, 2025",
        status: "pending"
      },
      {
        id: "INV-2025-4125",
        student: "Rajiv Kumar",
        amount: 38750,
        date: "Mar 25, 2025",
        status: "paid"
      }
    ]
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Financial Management</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search finances..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="last-30-days">Last 30 Days</SelectItem>
              <SelectItem value="last-90-days">Last 90 Days</SelectItem>
              <SelectItem value="last-6-months">Last 6 Months</SelectItem>
              <SelectItem value="last-year">Last Year</SelectItem>
              <SelectItem value="custom">Custom Range</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          Generate Reports
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Data
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Advanced Filters
        </Button>
      </div>

      {/* Financial Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Revenue */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-3xl font-bold">{formatCurrency(financialData.totalRevenue.amount)}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last quarter
              <span className={`ml-2 flex items-center ${financialData.totalRevenue.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {financialData.totalRevenue.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(financialData.totalRevenue.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Agent Commissions */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Agent Commissions</div>
            <div className="text-3xl font-bold">{formatCurrency(financialData.agentCommissions.amount)}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last quarter
              <span className={`ml-2 flex items-center ${financialData.agentCommissions.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {financialData.agentCommissions.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(financialData.agentCommissions.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Outstanding Payments */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Outstanding Payments</div>
            <div className="text-3xl font-bold">{formatCurrency(financialData.outstandingPayments.amount)}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last quarter
              <span className={`ml-2 flex items-center ${financialData.outstandingPayments.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {financialData.outstandingPayments.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(financialData.outstandingPayments.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Refunds Processed */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Refunds Processed</div>
            <div className="text-3xl font-bold">{formatCurrency(financialData.refundsProcessed.amount)}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last quarter
              <span className={`ml-2 flex items-center ${financialData.refundsProcessed.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {financialData.refundsProcessed.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(financialData.refundsProcessed.percentChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue by Source */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Revenue by Source</h2>
          <Link href="/finance/revenue-details">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View Details
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          {financialData.revenueBySource.map((item, index) => (
            <div key={index} className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="font-medium">{item.source}</span>
                <span className="font-semibold">{formatCurrency(item.amount)} ({item.percentage}%)</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className={`h-2.5 rounded-full ${
                    index === 0 ? 'bg-blue-500' : 
                    index === 1 ? 'bg-green-500' : 
                    index === 2 ? 'bg-blue-400' : 
                    'bg-purple-500'
                  }`} 
                  style={{ width: `${item.percentage}%` }}
                ></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold">Recent Invoices</h2>
          <Link href="/finance/invoices">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice #
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {financialData.recentInvoices.map((invoice, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {invoice.id}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.student}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(invoice.amount)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${invoice.status === 'paid' ? 'bg-green-100 text-green-800' : 
                          invoice.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                          'bg-red-100 text-red-800'}`}
                    >
                      {invoice.status.charAt(0).toUpperCase() + invoice.status.slice(1)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}