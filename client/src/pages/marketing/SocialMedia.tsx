import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Plus, 
  Filter, 
  Download, 
  ChevronUp, 
  ChevronDown,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Edit,
  Eye,
  Calendar
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SocialPost {
  id: number;
  title: string;
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  status: 'published' | 'scheduled' | 'draft';
  publishDate: string;
  audience: string;
  impressions: number;
  engagement: number;
  clicks: number;
}

interface SocialAccount {
  platform: 'instagram' | 'facebook' | 'twitter' | 'linkedin' | 'youtube';
  handle: string;
  followers: number;
  engagement: number;
  postsThisMonth: number;
  growth: number;
}

// Mock data
const socialPosts: SocialPost[] = [
  {
    id: 1,
    title: "Scholarship Opportunities 2025",
    platform: "facebook",
    status: "published",
    publishDate: "Mar 28, 2025",
    audience: "All Prospects",
    impressions: 12450,
    engagement: 876,
    clicks: 342
  },
  {
    id: 2,
    title: "Student Success Stories: Engineering",
    platform: "instagram",
    status: "published",
    publishDate: "Mar 25, 2025",
    audience: "STEM Prospects",
    impressions: 8750,
    engagement: 1250,
    clicks: 185
  },
  {
    id: 3,
    title: "UK Universities Virtual Fair Announcement",
    platform: "linkedin",
    status: "scheduled",
    publishDate: "Apr 2, 2025",
    audience: "High School Seniors",
    impressions: 0,
    engagement: 0,
    clicks: 0
  },
  {
    id: 4,
    title: "Fall 2025 Application Deadlines",
    platform: "twitter",
    status: "draft",
    publishDate: "TBD",
    audience: "All Prospects",
    impressions: 0,
    engagement: 0,
    clicks: 0
  },
  {
    id: 5,
    title: "Student Life in Canada: Campus Tour",
    platform: "youtube",
    status: "published",
    publishDate: "Mar 20, 2025",
    audience: "International Students",
    impressions: 3650,
    engagement: 425,
    clicks: 178
  }
];

const socialAccounts: SocialAccount[] = [
  {
    platform: "instagram",
    handle: "@InterEdGlobal",
    followers: 12500,
    engagement: 4.2,
    postsThisMonth: 18,
    growth: 3.8
  },
  {
    platform: "facebook",
    handle: "InterEd Global Education",
    followers: 28750,
    engagement: 2.8,
    postsThisMonth: 24,
    growth: 1.5
  },
  {
    platform: "twitter",
    handle: "@InterEdGlobal",
    followers: 9850,
    engagement: 1.9,
    postsThisMonth: 32,
    growth: 2.2
  },
  {
    platform: "linkedin",
    handle: "InterEd Global Education Services",
    followers: 15600,
    engagement: 3.5,
    postsThisMonth: 12,
    growth: 4.1
  },
  {
    platform: "youtube",
    handle: "InterEd Global",
    followers: 5250,
    engagement: 6.7,
    postsThisMonth: 4,
    growth: 5.3
  }
];

export default function SocialMedia() {
  const [timeFilter, setTimeFilter] = useState("last-30-days");
  const [platformFilter, setPlatformFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // Social media stats
  const socialStats = {
    totalFollowers: {
      count: 71950,
      percentChange: 8.5
    },
    totalImpressions: {
      count: 248750,
      percentChange: 15.2
    },
    avgEngagement: {
      rate: 3.8,
      percentChange: 1.2
    },
    conversion: {
      count: 1250,
      percentChange: 18.4
    }
  };

  // Get the correct icon for platform
  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-600" />;
      case 'facebook':
        return <Facebook className="h-5 w-5 text-blue-600" />;
      case 'twitter':
        return <Twitter className="h-5 w-5 text-blue-400" />;
      case 'linkedin':
        return <Linkedin className="h-5 w-5 text-blue-700" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-600" />;
      default:
        return null;
    }
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Social Media</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search social media..." 
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
          <Plus className="mr-2 h-4 w-4" /> Create Post
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Content Calendar
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filter
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Followers */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Followers</div>
            <div className="text-3xl font-bold">{socialStats.totalFollowers.count.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${socialStats.totalFollowers.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {socialStats.totalFollowers.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(socialStats.totalFollowers.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Total Impressions */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Total Impressions</div>
            <div className="text-3xl font-bold">{socialStats.totalImpressions.count.toLocaleString()}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${socialStats.totalImpressions.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {socialStats.totalImpressions.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(socialStats.totalImpressions.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Avg. Engagement Rate */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Avg. Engagement Rate</div>
            <div className="text-3xl font-bold">{socialStats.avgEngagement.rate}%</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${socialStats.avgEngagement.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {socialStats.avgEngagement.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(socialStats.avgEngagement.percentChange)}%
              </span>
            </div>
          </div>
        </div>

        {/* Conversions from Social */}
        <div className="bg-white rounded-lg border p-6">
          <div className="space-y-2">
            <div className="text-sm text-gray-500">Conversions</div>
            <div className="text-3xl font-bold">{socialStats.conversion.count}</div>
            <div className="flex items-center text-xs text-gray-500">
              vs. last month
              <span className={`ml-2 flex items-center ${socialStats.conversion.percentChange >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                {socialStats.conversion.percentChange >= 0 ? <ChevronUp className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
                {Math.abs(socialStats.conversion.percentChange)}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Accounts */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Social Accounts</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {socialAccounts.map((account, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                {getPlatformIcon(account.platform)}
                <div className="font-medium">
                  {account.platform.charAt(0).toUpperCase() + account.platform.slice(1)}
                </div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-500">Handle</div>
                <div className="text-sm font-medium">{account.handle}</div>
              </div>
              <div className="mb-3">
                <div className="text-xs text-gray-500">Followers</div>
                <div className="text-sm font-medium">
                  {account.followers.toLocaleString()}
                  <span className="text-xs text-green-500 ml-2">+{account.growth}%</span>
                </div>
              </div>
              <div className="flex justify-between">
                <div>
                  <div className="text-xs text-gray-500">Engagement</div>
                  <div className="text-sm font-medium">{account.engagement}%</div>
                </div>
                <div>
                  <div className="text-xs text-gray-500">Posts</div>
                  <div className="text-sm font-medium">{account.postsThisMonth}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Posts */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Recent Posts</h2>
          <div className="flex gap-2">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All
            </Button>
            <Select value={platformFilter} onValueChange={setPlatformFilter}>
              <SelectTrigger className="w-[160px]">
                <SelectValue placeholder="All Platforms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Platforms</SelectItem>
                <SelectItem value="instagram">Instagram</SelectItem>
                <SelectItem value="facebook">Facebook</SelectItem>
                <SelectItem value="twitter">Twitter</SelectItem>
                <SelectItem value="linkedin">LinkedIn</SelectItem>
                <SelectItem value="youtube">YouTube</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[40px]">
                  <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                </TableHead>
                <TableHead>PLATFORM</TableHead>
                <TableHead>TITLE</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>DATE</TableHead>
                <TableHead>AUDIENCE</TableHead>
                <TableHead>IMPRESSIONS</TableHead>
                <TableHead>ENGAGEMENT</TableHead>
                <TableHead>CLICKS</TableHead>
                <TableHead>ACTIONS</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {socialPosts
                .filter(post => platformFilter === "all" || post.platform === platformFilter)
                .map((post) => (
                <TableRow key={post.id}>
                  <TableCell>
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </TableCell>
                  <TableCell>
                    {getPlatformIcon(post.platform)}
                  </TableCell>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell>
                    <span 
                      className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${post.status === 'published' ? 'bg-green-100 text-green-800' : 
                          post.status === 'scheduled' ? 'bg-blue-100 text-blue-800' : 
                          'bg-yellow-100 text-yellow-800'}`}
                    >
                      {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                    </span>
                  </TableCell>
                  <TableCell>{post.publishDate}</TableCell>
                  <TableCell>{post.audience}</TableCell>
                  <TableCell>{post.impressions > 0 ? post.impressions.toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    {post.engagement > 0 ? (
                      <span>
                        {post.engagement.toLocaleString()}
                        <span className="text-xs text-gray-500 ml-1">
                          ({(post.engagement / post.impressions * 100).toFixed(1)}%)
                        </span>
                      </span>
                    ) : '-'}
                  </TableCell>
                  <TableCell>{post.clicks > 0 ? post.clicks.toLocaleString() : '-'}</TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8 text-blue-600">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Content Performance */}
      <div className="bg-white rounded-lg border p-6 space-y-6">
        <h2 className="text-xl font-semibold">Content Performance</h2>
        
        {/* Simplified chart representation */}
        <div className="h-60 bg-gray-100 rounded flex items-center justify-center">
          <div className="text-center text-gray-500">
            <p>Content Performance Chart</p>
            <p className="text-xs mt-2">Showing engagement rates across social platforms</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <div className="text-sm text-gray-500 mb-1">Top Performing Platform</div>
            <div className="text-base font-medium flex items-center">
              <Instagram className="h-4 w-4 text-pink-600 mr-2" />
              Instagram
            </div>
            <div className="text-xs text-green-600 mt-1">4.2% avg. engagement rate</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Best Performing Content</div>
            <div className="text-base font-medium">Student Success Stories</div>
            <div className="text-xs text-green-600 mt-1">5.8% avg. engagement rate</div>
          </div>
          <div>
            <div className="text-sm text-gray-500 mb-1">Optimal Posting Time</div>
            <div className="text-base font-medium">Weekdays, 3:00 - 5:00 PM</div>
            <div className="text-xs text-green-600 mt-1">42% higher engagement</div>
          </div>
        </div>
      </div>
    </div>
  );
}