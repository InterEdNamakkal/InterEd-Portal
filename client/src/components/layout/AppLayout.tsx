import { useState } from "react";
import Sidebar from "./Sidebar";
import TopNavBar from "./TopNavBar";

interface AppLayoutProps {
  children: React.ReactNode;
}

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(prev => !prev);
  };
  
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden relative ml-0 lg:ml-64">
        {/* Overlay for sidebar on mobile */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden" 
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
        
        {/* Top Navigation Bar */}
        <TopNavBar 
          title="Student Management" 
          onMenuClick={toggleSidebar} 
        />
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto bg-gray-50">
          {children}
        </div>
      </main>
    </div>
  );
};

export default AppLayout;
