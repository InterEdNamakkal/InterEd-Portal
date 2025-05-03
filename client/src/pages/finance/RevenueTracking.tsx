import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Filter, Download, ArrowUpRight, TrendingUp, TrendingDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function RevenueTracking() {
  const [timeFilter, setTimeFilter] = useState("last-30-days");
  
  // Mock revenue data (would come from API)
  const revenueData = {
    totalRevenue: 1254750,
    previousPeriod: 1115750,
    percentChange: 12.5,
    
    topUniversities: [
      {
        name: "University of Toronto",
        revenue: 425000,
        students: 120,
        change: 14.2
      },
      {
        name: "Imperial College London",
        revenue: 384500,
        students: 105,
        change: 10.8
      },
      {
        name: "Technical University of Munich",
        revenue: 268750,
        students: 78,
        change: 8.5
      },
      {
        name: "ETH Zurich",
        revenue: 176500,
        students: 52,
        change: 6.2
      }
    ],
    
    revenueByType: [
      { type: "Application Fees", amount: 234500, percentage: 18.7, change: 5.2 },
      { type: "Tuition Payments", amount: 875250, percentage: 69.8, change: 15.3 },
      { type: "Service Charges", amount: 98750, percentage: 7.9, change: 4.1 },
      { type: "Document Verification", amount: 46250, percentage: 3.6, change: 2.5 }
    ],

    monthlyRevenue: [
      { month: "Jan", amount: 325000 },
      { month: "Feb", amount: 410000 },
      { month: "Mar", amount: 385000 },
      { month: "Apr", amount: 450000 },
      { month: "May", amount: 412000 },
      { month: "Jun", amount: 478000 },
      { month: "Jul", amount: 392000 },
      { month: "Aug", amount: 438000 },
      { month: "Sep", amount: 467000 },
      { month: "Oct", amount: 512000 },
      { month: "Nov", amount: 475000 },
      { month: "Dec", amount: 528000 }
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
        <h1 className="text-2xl font-bold">Revenue Tracking</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search revenues..." 
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
          Generate Report
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

      {/* Revenue Overview */}
      <div className="bg-white rounded-lg border p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Revenue Overview</h2>
          <div className="flex items-center text-sm font-medium text-green-600">
            <TrendingUp className="h-4 w-4 mr-1" />
            {revenueData.percentChange}% from previous period
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Revenue</div>
            <div className="text-3xl font-bold">{formatCurrency(revenueData.totalRevenue)}</div>
            <div className="text-xs text-gray-500">Last 30 days</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Average Per Student</div>
            <div className="text-3xl font-bold">{formatCurrency(revenueData.totalRevenue / 355)}</div>
            <div className="text-xs text-gray-500">355 students total</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Projected Annual</div>
            <div className="text-3xl font-bold">{formatCurrency(revenueData.totalRevenue * 12)}</div>
            <div className="text-xs text-gray-500">Based on current trend</div>
          </div>
        </div>
        
        {/* Graph would go here - simplified representation */}
        <div className="mt-6 h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Revenue Chart (Monthly Trend)</p>
            <p className="text-xs mt-2">Jan: $325K, Feb: $410K, Mar: $385K, Apr: $450K, May: $412K, Jun: $478K</p>
            <p className="text-xs mt-1">Jul: $392K, Aug: $438K, Sep: $467K, Oct: $512K, Nov: $475K, Dec: $528K</p>
          </div>
        </div>
      </div>

      {/* Revenue by Type */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Revenue by Source</h2>
        <div className="space-y-6">
          {revenueData.revenueByType.map((item, index) => (
            <div key={index} className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="text-sm font-medium">{item.type}</div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm font-semibold">{formatCurrency(item.amount)}</span>
                  <span className="text-xs text-gray-500">({item.percentage}%)</span>
                  <span className={`text-xs flex items-center ${item.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {item.change >= 0 ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {Math.abs(item.change)}%
                  </span>
                </div>
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

      {/* Top Universities by Revenue */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-6">Top Universities by Revenue</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  University
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Revenue
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Students
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Avg. Per Student
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {revenueData.topUniversities.map((university, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {university.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(university.revenue)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {university.students}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {formatCurrency(university.revenue / university.students)}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`flex items-center ${university.change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {university.change >= 0 ? <TrendingUp className="h-4 w-4 mr-1" /> : <TrendingDown className="h-4 w-4 mr-1" />}
                      {university.change}%
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <Button variant="ghost" size="sm" className="h-8 text-blue-600">
                      <ArrowUpRight className="h-4 w-4 mr-1" />
                      View
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Revenue Forecasting */}
      <div className="bg-white rounded-lg border p-6">
        <h2 className="text-xl font-semibold mb-4">Revenue Forecast</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Current Quarter Projection</div>
            <div className="text-2xl font-bold">{formatCurrency(revenueData.totalRevenue * 3)}</div>
            <div className="text-xs text-gray-500 flex items-center text-green-600">
              <TrendingUp className="h-3 w-3 mr-1" />
              {revenueData.percentChange}% growth expected
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Annual Projection</div>
            <div className="text-2xl font-bold">{formatCurrency(revenueData.totalRevenue * 12)}</div>
            <div className="text-xs text-gray-500">Based on current trajectory</div>
          </div>
          
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Target Achievement</div>
            <div className="text-2xl font-bold">87%</div>
            <div className="text-xs text-gray-500">Of annual revenue goal</div>
          </div>
        </div>
        
        {/* Graph would go here - simplified representation */}
        <div className="h-48 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Revenue Forecast Chart (Next 12 Months)</p>
            <p className="text-xs mt-2">Showing projected growth with confidence intervals</p>
          </div>
        </div>
      </div>
    </div>
  );
}