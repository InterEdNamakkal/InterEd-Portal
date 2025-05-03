import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Filter } from "lucide-react";
import { UNIVERSITY_TIERS, UNIVERSITY_AGREEMENT_STATUS, UNIVERSITY_FILTER_TABS } from "@/lib/constants";
import { UniversityTable } from "@/components/universities/UniversityTable";
import { useFilteredUniversities } from "@/hooks/useUniversities";

export default function UniversityManagement() {
  const { toast } = useToast();
  const [, navigate] = useLocation();
  const [activeTab, setActiveTab] = useState("all-institutions");
  
  // Fetch universities data
  const { data: universities, isLoading, error } = useQuery({
    queryKey: ["/api/universities"],
    retry: 1,
  });

  // Handle error with useEffect instead of directly in render
  useEffect(() => {
    if (error) {
      toast({
        variant: "destructive",
        title: "Error fetching universities",
        description: "There was a problem loading university data.",
      });
    }
  }, [error, toast]);

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">University Partnership Management</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search universities..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <select className="rounded-md border border-gray-300 text-gray-600 h-10 px-4 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>All Regions</option>
            <option>North America</option>
            <option>Europe</option>
            <option>Asia</option>
            <option>Australia & Oceania</option>
            <option>Africa</option>
            <option>South America</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90" onClick={() => navigate("/universities/add")}>
          <Plus className="mr-2 h-4 w-4" /> Add University
        </Button>
        <Button variant="outline">
          Import Programs
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Partnerships */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-sm text-gray-500">Total Partnerships</div>
              <div className="text-3xl font-bold mt-1">7</div>
              <div className="text-xs text-gray-500 mt-1">5 active, 1 pending renewal, 1 new</div>
            </div>
            <div className="text-green-500 text-xs">↑ 1</div>
          </div>
        </div>

        {/* Active Programs */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-sm text-gray-500">Active Programs</div>
              <div className="text-3xl font-bold mt-1">145</div>
              <div className="text-xs text-gray-500 mt-1">Across all partner institutions</div>
            </div>
            <div className="text-green-500 text-xs">↑ 8</div>
          </div>
        </div>

        {/* Students Placed */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-sm text-gray-500">Students Placed</div>
              <div className="text-3xl font-bold mt-1">506</div>
              <div className="text-xs text-gray-500 mt-1">120 new students this year</div>
            </div>
            <div className="text-green-500 text-xs">↑ 12.4%</div>
          </div>
        </div>

        {/* Revenue Generated */}
        <div className="bg-white rounded-lg border p-6">
          <div className="flex justify-between items-baseline">
            <div>
              <div className="text-sm text-gray-500">Revenue Generated</div>
              <div className="text-3xl font-bold mt-1">$2.4M</div>
              <div className="text-xs text-gray-500 mt-1">YTD from university partnerships</div>
            </div>
            <div className="text-green-500 text-xs">↑ 8.7%</div>
          </div>
        </div>
      </div>

      {/* University Tiers */}
      <div>
        <h2 className="text-xl font-semibold mb-4">University Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {UNIVERSITY_TIERS.map((tier) => (
            <div key={tier.id} className={`${tier.color} rounded-lg p-5 relative`}>
              <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {tier.count}
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-sm font-medium">{tier.label}</div>
                  <div className="text-xs text-gray-500">
                    {tier.count === 1 ? '1 partner' : `${tier.count} partners`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Agreement Status */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agreement Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UNIVERSITY_AGREEMENT_STATUS.map((status) => (
            <div key={status.id} className={`${status.color} rounded-lg p-5 relative`}>
              <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
                {status.count}
              </div>
              <div className="flex justify-end">
                <div className="text-right">
                  <div className="text-sm font-medium">{status.label}</div>
                  <div className="text-xs text-gray-500">
                    {status.count === 1 ? '1 agreement' : `${status.count} agreements`}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Upcoming Renewals Link */}
      <div className="text-right">
        <Link href="/universities/agreements/renewals">
          <Button variant="link" className="text-blue-600 p-0 text-sm">
            View Upcoming Renewals
          </Button>
        </Link>
      </div>

      {/* University Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {UNIVERSITY_FILTER_TABS.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => handleTabClick(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* University Table */}
      <div className="mt-6">
        {isLoading ? (
          <div className="flex justify-center items-center h-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : !universities || !Array.isArray(universities) || universities.length === 0 ? (
          <div className="text-center p-8 bg-white rounded-md border">
            <p className="text-gray-500">No universities found</p>
          </div>
        ) : (
          <UniversityTable universities={universities} />
        )}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="flex flex-1 justify-between sm:hidden">
          <button
            className="relative inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Previous
          </button>
          <button
            className="relative ml-3 inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            Next
          </button>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">2</span> of{' '}
              <span className="font-medium">7</span> results
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

      {/* Top Programs */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Top Programs</h2>
          <Link href="/universities/programs">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All Programs
            </Button>
          </Link>
        </div>
        <div className="space-y-4">
          <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-purple-100 rounded-md flex items-center justify-center text-purple-700 font-semibold">
                P
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium">Master of Computer Science</div>
                <div className="text-xs text-gray-500">University of Toronto</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">42 applications</div>
              <div className="text-xs text-gray-500">Acceptance: 78%</div>
            </div>
          </div>
          <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
            <div className="flex items-center">
              <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center text-blue-700 font-semibold">
                P
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium">MSc Data Science</div>
                <div className="text-xs text-gray-500">Imperial College London</div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">38 applications</div>
              <div className="text-xs text-gray-500">Acceptance: 72%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Upcoming Agreement Renewals */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Upcoming Agreement Renewals</h2>
          <Link href="/universities/agreements/renewals">
            <Button variant="link" className="text-blue-600 p-0 text-sm">
              View All
            </Button>
          </Link>
        </div>
        <div className="bg-white rounded-lg border p-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="h-10 w-10 bg-yellow-100 rounded-md flex items-center justify-center text-yellow-700 font-semibold">
              TU
            </div>
            <div className="ml-4">
              <div className="text-sm font-medium">Technical University of Munich</div>
              <div className="text-xs text-gray-500">Expires: Apr 15, 2025</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-sm font-semibold text-red-500">15 days left</div>
          </div>
        </div>
      </div>
    </div>
  );
}