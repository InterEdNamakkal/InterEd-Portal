import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, Filter, Download } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CommissionProcessing() {
  const [statusFilter, setStatusFilter] = useState("all");
  const [timeFilter, setTimeFilter] = useState("last-30-days");
  
  // Mock commissions data (would come from API)
  const commissions = [
    {
      id: "COM-2025-057",
      agent: {
        name: "Global Educator",
        contact: "Sarah Johnson",
        email: "sarah@globaleducator.com"
      },
      amount: 15750,
      date: "Mar 28, 2025",
      status: "processed",
      students: 5,
      universities: ["University of Toronto", "Imperial College London"]
    },
    {
      id: "COM-2025-056",
      agent: {
        name: "Academic Bridge",
        contact: "John Miller",
        email: "john@academicbridge.org"
      },
      amount: 21200,
      date: "Mar 26, 2025",
      status: "pending",
      students: 7,
      universities: ["University of Toronto", "Technical University of Munich"]
    },
    {
      id: "COM-2025-055",
      agent: {
        name: "Future Scholars",
        contact: "Lisa Wang",
        email: "lisa@futurescholars.com"
      },
      amount: 18500,
      date: "Mar 25, 2025",
      status: "processed",
      students: 6,
      universities: ["Imperial College London", "ETH Zurich"]
    },
    {
      id: "COM-2025-054",
      agent: {
        name: "Global Connect Education",
        contact: "Mark Anderson",
        email: "mark@globalconnectedu.com"
      },
      amount: 24750,
      date: "Mar 22, 2025",
      status: "pending",
      students: 8,
      universities: ["University of Toronto", "National University of Singapore"]
    },
    {
      id: "COM-2025-053",
      agent: {
        name: "EduConsult",
        contact: "Rebecca Chen",
        email: "rebecca@educonsult.com"
      },
      amount: 9500,
      date: "Mar 20, 2025",
      status: "rejected",
      students: 3,
      universities: ["University of Toronto"]
    }
  ];

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Filter commissions based on status
  const filteredCommissions = statusFilter === "all" 
    ? commissions 
    : commissions.filter(commission => commission.status === statusFilter);

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Commission Processing</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search commissions..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time period" />
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
          <Plus className="mr-2 h-4 w-4" /> Create Commission
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Report
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Commission Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm text-gray-500">Total Commissions</div>
          <div className="text-3xl font-bold mt-1">{formatCurrency(187250)}</div>
          <div className="text-xs text-gray-500 mt-1">Last 30 days</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm text-gray-500">Processed</div>
          <div className="text-3xl font-bold mt-1 text-green-600">{formatCurrency(142500)}</div>
          <div className="text-xs text-gray-500 mt-1">76% of total</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm text-gray-500">Pending</div>
          <div className="text-3xl font-bold mt-1 text-yellow-600">{formatCurrency(38750)}</div>
          <div className="text-xs text-gray-500 mt-1">21% of total</div>
        </div>

        <div className="bg-white rounded-lg border p-6">
          <div className="text-sm text-gray-500">Rejected</div>
          <div className="text-3xl font-bold mt-1 text-red-600">{formatCurrency(6000)}</div>
          <div className="text-xs text-gray-500 mt-1">3% of total</div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 text-sm font-medium ${
              statusFilter === "all"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setStatusFilter("all")}
          >
            All Commissions
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              statusFilter === "processed"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setStatusFilter("processed")}
          >
            Processed
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              statusFilter === "pending"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              statusFilter === "rejected"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => setStatusFilter("rejected")}
          >
            Rejected
          </button>
        </nav>
      </div>

      {/* Commissions Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission ID
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Agent
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Students
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Universities
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
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredCommissions.map((commission, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-blue-600">
                  {commission.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{commission.agent.name}</div>
                  <div className="text-xs text-gray-500">{commission.agent.contact}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commission.students}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{commission.universities[0]}</div>
                  {commission.universities.length > 1 && (
                    <div className="text-xs text-gray-500">+{commission.universities.length - 1} more</div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {formatCurrency(commission.amount)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {commission.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span 
                    className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                      ${commission.status === 'processed' ? 'bg-green-100 text-green-800' : 
                        commission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                        'bg-red-100 text-red-800'}`}
                  >
                    {commission.status.charAt(0).toUpperCase() + commission.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button className="text-indigo-600 hover:text-indigo-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                      </svg>
                    </button>
                    {commission.status === 'pending' && (
                      <>
                        <button className="text-green-600 hover:text-green-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </button>
                        <button className="text-red-600 hover:text-red-900">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </>
                    )}
                    <button className="text-blue-600 hover:text-blue-900">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredCommissions.length}</span> of{' '}
              <span className="font-medium">42</span> results
            </p>
          </div>
          <div>
            <nav className="isolate inline-flex -space-x-px rounded-md shadow-sm" aria-label="Pagination">
              <button
                className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M12.79 5.23a.75.75 0 01-.02 1.06L8.832 10l3.938 3.71a.75.75 0 11-1.04 1.08l-4.5-4.25a.75.75 0 010-1.08l4.5-4.25a.75.75 0 011.06.02z" clipRule="evenodd" />
                </svg>
              </button>
              <button
                aria-current="page"
                className="relative z-10 inline-flex items-center bg-indigo-600 px-4 py-2 text-sm font-semibold text-white focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                1
              </button>
              <button
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </button>
              <button
                className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                  <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                </svg>
              </button>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
}