import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import type { Agent } from "@shared/schema";

interface AgentTier {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  count: number;
}

interface AgreementStatus {
  id: string;
  name: string;
  bgColor: string;
  textColor: string;
  count: number;
}

export default function AgentManagement() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all-agents");

  // Fetch agents data
  const { data: agents, isLoading, error } = useQuery({
    queryKey: ["/api/agents"],
    retry: 1,
  });

  if (error) {
    toast({
      variant: "destructive",
      title: "Error fetching agents",
      description: "There was a problem loading agent data.",
    });
  }

  // Agent tiers exactly as in the mockup
  const agentTiers: AgentTier[] = [
    { id: "platinum", name: "Platinum", bgColor: "bg-blue-50", textColor: "text-blue-800", count: 1 },
    { id: "gold", name: "Gold", bgColor: "bg-yellow-50", textColor: "text-yellow-800", count: 2 },
    { id: "silver", name: "Silver", bgColor: "bg-gray-50", textColor: "text-gray-800", count: 2 },
    { id: "bronze", name: "Bronze", bgColor: "bg-amber-50", textColor: "text-amber-800", count: 1 }
  ];

  // Agreement status exactly as in the mockup
  const agreementStatuses: AgreementStatus[] = [
    { id: "valid", name: "Valid", bgColor: "bg-green-50", textColor: "text-green-800", count: 4 },
    { id: "expiring-soon", name: "Expiring Soon", bgColor: "bg-yellow-50", textColor: "text-yellow-800", count: 0 },
    { id: "expired", name: "Expired", bgColor: "bg-red-50", textColor: "text-red-800", count: 1 },
    { id: "pending", name: "Pending", bgColor: "bg-blue-50", textColor: "text-blue-800", count: 1 }
  ];

  // Handle tab click
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="container mx-auto py-6 px-6 space-y-8">
      {/* Revenue Header - Exactly as in mockup */}
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold">$952,850</h1>
        <p className="text-gray-500 text-sm">$218,608 this quarter</p>
      </div>

      {/* Agent Tiers - Matching the mockup layout */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agent Tiers</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Platinum Tier */}
          <div className="bg-blue-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Platinum</div>
                <div className="text-xs text-gray-500">1 agent</div>
              </div>
            </div>
          </div>

          {/* Gold Tier */}
          <div className="bg-yellow-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              2
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Gold</div>
                <div className="text-xs text-gray-500">2 agents</div>
              </div>
            </div>
          </div>

          {/* Silver Tier */}
          <div className="bg-gray-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              2
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Silver</div>
                <div className="text-xs text-gray-500">2 agents</div>
              </div>
            </div>
          </div>

          {/* Bronze Tier */}
          <div className="bg-amber-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Bronze</div>
                <div className="text-xs text-gray-500">1 agent</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Agreement Status - Matching the mockup layout */}
      <div>
        <h2 className="text-xl font-semibold mb-4">Agreement Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Valid Agreements */}
          <div className="bg-green-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              4
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Valid</div>
                <div className="text-xs text-gray-500">4 agreements</div>
              </div>
            </div>
          </div>

          {/* Expiring Soon Agreements */}
          <div className="bg-yellow-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              0
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Expiring Soon</div>
                <div className="text-xs text-gray-500">0 agreements</div>
              </div>
            </div>
          </div>

          {/* Expired Agreements */}
          <div className="bg-red-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Expired</div>
                <div className="text-xs text-gray-500">1 agreement</div>
              </div>
            </div>
          </div>

          {/* Pending Agreements */}
          <div className="bg-blue-50 rounded-lg p-5 relative">
            <div className="absolute top-4 left-4 bg-white rounded-full w-6 h-6 flex items-center justify-center text-sm">
              1
            </div>
            <div className="flex justify-end">
              <div className="text-right">
                <div className="text-sm font-medium">Pending</div>
                <div className="text-xs text-gray-500">1 agreement</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Expiring Agreements Link - Exactly as in mockup */}
      <div className="text-right">
        <Link href="/agents/agreements/expiring">
          <Button variant="link" className="text-blue-600 p-0 text-sm">
            View Expiring Agreements
          </Button>
        </Link>
      </div>

      {/* Bottom Tabs - Exactly as in mockup */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "all-agents"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick("all-agents")}
          >
            All Agents
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "active"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick("active")}
          >
            Active
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "inactive"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick("inactive")}
          >
            Inactive
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "pending-approval"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick("pending-approval")}
          >
            Pending Approval
          </button>
          <button
            className={`py-2 px-1 text-sm font-medium ${
              activeTab === "top-performers"
                ? 'border-b-2 border-blue-600 text-blue-600'
                : 'text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
            onClick={() => handleTabClick("top-performers")}
          >
            Top Performers
          </button>
        </nav>
      </div>
    </div>
  );
}