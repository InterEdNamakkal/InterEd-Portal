import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Search, Plus, Filter, Download } from "lucide-react";
import { UNIVERSITY_AGREEMENT_STATUS } from "@/lib/constants";

export default function AgreementManagement() {
  const { toast } = useToast();
  
  // Fetch agreements data (simulated)
  const { isLoading, error } = useQuery({
    queryKey: ["/api/universities/agreements"],
    queryFn: async () => {
      // This would be replaced with actual API calls
      return [];
    },
    retry: 1,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching agreements",
      description: "There was a problem loading agreement data.",
    });
  }

  // Mock agreements data (would come from API)
  const agreementList = [
    {
      id: 1,
      university: {
        id: 1,
        name: "University of Toronto",
        location: "Toronto, Canada",
        abbreviation: "UT"
      },
      status: "active",
      tier: "premium",
      signedDate: "2022-06-15",
      expiryDate: "2025-06-15",
      commissionRate: "15%",
      agreementType: "Comprehensive"
    },
    {
      id: 2,
      university: {
        id: 2,
        name: "Imperial College London",
        location: "London, UK",
        abbreviation: "ICL"
      },
      status: "active",
      tier: "premium",
      signedDate: "2023-02-10",
      expiryDate: "2026-02-10",
      commissionRate: "12%",
      agreementType: "Comprehensive"
    },
    {
      id: 3,
      university: {
        id: 3,
        name: "Technical University of Munich",
        location: "Munich, Germany",
        abbreviation: "TUM"
      },
      status: "expiring-soon",
      tier: "gold",
      signedDate: "2022-04-15",
      expiryDate: "2025-04-15",
      commissionRate: "10%",
      agreementType: "Standard"
    }
  ];

  // Tabs for filtering agreements
  const filterTabs = [
    { id: "all", label: "All Agreements" },
    { id: "active", label: "Active" },
    { id: "expiring-soon", label: "Expiring Soon" },
    { id: "expired", label: "Expired" },
    { id: "pending", label: "Pending" }
  ];

  const [activeTab, setActiveTab] = useState("all");

  // Filter agreements based on tab
  const filteredAgreements = activeTab === "all" 
    ? agreementList 
    : agreementList.filter(agreement => agreement.status === activeTab);

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">University Agreements</h1>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            <Input 
              placeholder="Search agreements..." 
              className="pl-10 w-[250px]"
            />
          </div>
          <select className="rounded-md border border-gray-300 text-gray-600 h-10 px-4 bg-white hover:border-gray-400 focus:outline-none appearance-none">
            <option>All Universities</option>
            <option>University of Toronto</option>
            <option>Imperial College London</option>
            <option>Technical University of Munich</option>
          </select>
        </div>
      </div>
      
      <div className="flex gap-4">
        <Button className="bg-primary hover:bg-primary/90">
          <Plus className="mr-2 h-4 w-4" /> New Agreement
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export
        </Button>
        <Button variant="outline" className="flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </Button>
      </div>

      {/* Agreement Status Summary */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agreement Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {UNIVERSITY_AGREEMENT_STATUS.map((status) => (
            <div 
              key={status.id} 
              className={`${status.color} rounded-lg p-5 relative cursor-pointer`}
              onClick={() => setActiveTab(status.id)}
            >
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

      {/* Filter Tabs */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          {filterTabs.map((tab) => (
            <button
              key={tab.id}
              className={`py-2 px-1 text-sm font-medium ${
                activeTab === tab.id
                  ? 'border-b-2 border-blue-600 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Agreements Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                University
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tier
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Signed Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Expiry Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Commission Rate
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                  Loading agreement data...
                </td>
              </tr>
            ) : filteredAgreements.length === 0 ? (
              <tr>
                <td colSpan={9} className="px-6 py-4 text-center text-sm text-gray-500">
                  No agreements found.
                </td>
              </tr>
            ) : (
              filteredAgreements.map((agreement) => (
                <tr key={agreement.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <input type="checkbox" className="h-4 w-4 text-blue-600 border-gray-300 rounded" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-bold">
                        {agreement.university.abbreviation}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{agreement.university.name}</div>
                        <div className="text-xs text-gray-500">{agreement.university.location}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${agreement.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                      ${agreement.status === 'expiring-soon' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${agreement.status === 'expired' ? 'bg-red-100 text-red-800' : ''}
                      ${agreement.status === 'pending' ? 'bg-blue-100 text-blue-800' : ''}
                    `}>
                      {agreement.status === 'expiring-soon' ? 'Expiring Soon' : 
                        agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${agreement.tier === 'premium' ? 'bg-purple-100 text-purple-800' : ''}
                      ${agreement.tier === 'gold' ? 'bg-yellow-100 text-yellow-800' : ''}
                      ${agreement.tier === 'silver' ? 'bg-gray-100 text-gray-800' : ''}
                    `}>
                      {agreement.tier.charAt(0).toUpperCase() + agreement.tier.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(agreement.signedDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {new Date(agreement.expiryDate).toLocaleDateString()}
                    </div>
                    {agreement.status === 'expiring-soon' && (
                      <div className="text-xs text-red-500">15 days left</div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.commissionRate}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {agreement.agreementType}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <div className="flex space-x-2">
                      <button className="text-indigo-600 hover:text-indigo-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                          <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                        </svg>
                      </button>
                      <button className="text-blue-600 hover:text-blue-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                      </button>
                      <button className="text-green-600 hover:text-green-900">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-gray-200 px-4 py-3 sm:px-6">
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">{filteredAgreements.length}</span> of{' '}
              <span className="font-medium">{filteredAgreements.length}</span> results
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
    </div>
  );
}