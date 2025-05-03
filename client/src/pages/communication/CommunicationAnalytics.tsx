import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { 
  BarChart,
  LineChart,
  ArrowUp,
  ArrowDown,
  Download,
  Calendar,
  FileText,
  Mail,
  MessageSquare,
  Clock
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TIME_FILTER_OPTIONS } from "@/lib/constants";

export default function CommunicationAnalytics() {
  const [timeFilter, setTimeFilter] = useState("last_30_days");
  
  // Metrics data
  const metrics = {
    emailsSent: {
      count: 1248,
      percentChange: 8.5,
      period: "month"
    },
    openRate: {
      rate: 76.2,
      percentChange: 4.2,
      period: "month"
    },
    responseRate: {
      rate: 42.8,
      percentChange: -2.3,
      period: "month"
    },
    smsSent: {
      count: 524,
      percentChange: 12.7,
      period: "month"
    },
    chatMessages: {
      count: 872,
      percentChange: 15.4,
      period: "month"
    },
    avgResponseTime: {
      time: "3.2 hours",
      percentChange: -12.5,
      period: "month"
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Communication Analytics</h2>
        
        <div className="flex items-center gap-3">
          <Select value={timeFilter} onValueChange={setTimeFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Time Period" />
            </SelectTrigger>
            <SelectContent>
              {TIME_FILTER_OPTIONS.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button variant="outline" className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Export Data
          </Button>
          
          <Button variant="outline" className="flex items-center gap-2">
            <FileText className="h-4 w-4" />
            Generate Report
          </Button>
        </div>
      </div>
      
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {/* Emails Sent */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Emails Sent</div>
            <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
              <Mail className="h-4 w-4 text-blue-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.emailsSent.count.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${metrics.emailsSent.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.emailsSent.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.emailsSent.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.emailsSent.period}</div>
        </div>
        
        {/* Open Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Email Open Rate</div>
            <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
              <Mail className="h-4 w-4 text-green-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.openRate.rate}%</div>
            <div className={`flex items-center text-sm ${metrics.openRate.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.openRate.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.openRate.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.openRate.period}</div>
        </div>
        
        {/* Response Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Email Response Rate</div>
            <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
              <Mail className="h-4 w-4 text-purple-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.responseRate.rate}%</div>
            <div className={`flex items-center text-sm ${metrics.responseRate.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.responseRate.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.responseRate.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.responseRate.period}</div>
        </div>
        
        {/* SMS Sent */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">SMS Sent</div>
            <div className="h-8 w-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-yellow-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.smsSent.count.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${metrics.smsSent.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.smsSent.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.smsSent.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.smsSent.period}</div>
        </div>
        
        {/* Chat Messages */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Chat Messages</div>
            <div className="h-8 w-8 bg-indigo-100 rounded-full flex items-center justify-center">
              <MessageSquare className="h-4 w-4 text-indigo-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.chatMessages.count.toLocaleString()}</div>
            <div className={`flex items-center text-sm ${metrics.chatMessages.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
              {metrics.chatMessages.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.chatMessages.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.chatMessages.period}</div>
        </div>
        
        {/* Avg Response Time */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-medium text-gray-500">Avg. Response Time</div>
            <div className="h-8 w-8 bg-red-100 rounded-full flex items-center justify-center">
              <Clock className="h-4 w-4 text-red-600" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <div className="text-2xl font-bold">{metrics.avgResponseTime.time}</div>
            <div className={`flex items-center text-sm ${metrics.avgResponseTime.percentChange >= 0 ? 'text-red-500' : 'text-green-500'}`}>
              {metrics.avgResponseTime.percentChange >= 0 ? <ArrowUp className="h-3 w-3 mr-1" /> : <ArrowDown className="h-3 w-3 mr-1" />}
              {Math.abs(metrics.avgResponseTime.percentChange)}%
            </div>
          </div>
          <div className="text-xs text-gray-500 mt-1">vs. previous {metrics.avgResponseTime.period}</div>
        </div>
      </div>
      
      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Email Metrics Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-6">Email Performance</h3>
          <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <LineChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="mb-1">Email Performance Chart</p>
              <p className="text-xs text-gray-400">Sent, opened, and response rates over time</p>
            </div>
          </div>
        </div>
        
        {/* SMS & Chat Metrics Chart */}
        <div className="bg-white rounded-lg border p-6">
          <h3 className="text-lg font-medium mb-6">SMS & Chat Volume</h3>
          <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
            <div className="text-center text-gray-500">
              <BarChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
              <p className="mb-1">SMS & Chat Volume Chart</p>
              <p className="text-xs text-gray-400">Message volume by channel over time</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Communication by Category */}
      <div className="bg-white rounded-lg border p-6 mb-8">
        <h3 className="text-lg font-medium mb-6">Communication by Category</h3>
        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <BarChart className="h-8 w-8 mx-auto mb-2 text-gray-400" />
            <p className="mb-1">Communication Categories Chart</p>
            <p className="text-xs text-gray-400">Message volume by category and purpose</p>
          </div>
        </div>
      </div>
    </div>
  );
}