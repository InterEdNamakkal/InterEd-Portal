import { useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface TopNavBarProps {
  title: string;
  onMenuClick: () => void;
  onSearch?: (query: string) => void;
}

const TopNavBar: React.FC<TopNavBarProps> = ({ 
  title, 
  onMenuClick,
  onSearch
}) => {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    if (onSearch) {
      onSearch(query);
    }
  };

  return (
    <div className="bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="lg:hidden" 
          onClick={onMenuClick}
        >
          <Menu className="h-5 w-5" />
        </Button>
        <h1 className="text-xl font-semibold text-gray-800">{title}</h1>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Input
            type="text"
            placeholder="Search students..."
            className="w-64 pl-10"
            value={searchQuery}
            onChange={handleSearchChange}
          />
          <div className="absolute left-3 top-2.5 text-gray-400">
            <Search className="h-4 w-4" />
          </div>
        </div>
        
        <div className="relative">
          <Button variant="outline" size="icon" className="rounded-full">
            <Bell className="h-4 w-4" />
            <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
          </Button>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 rounded-full bg-indigo-600 flex items-center justify-center text-white font-semibold">
            RS
          </div>
          <span className="ml-2 text-sm font-medium">Rahul Sharma</span>
        </div>
      </div>
    </div>
  );
};

export default TopNavBar;
