import { STUDENT_FILTER_TABS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface StudentFiltersProps {
  selectedFilter: string;
  onFilterChange: (filter: string) => void;
}

const StudentFilters: React.FC<StudentFiltersProps> = ({ 
  selectedFilter, 
  onFilterChange 
}) => {
  return (
    <div className="border-b border-gray-200 mb-6">
      <div className="flex flex-wrap -mb-px">
        {STUDENT_FILTER_TABS.map(tab => (
          <button
            key={tab.id}
            className={cn(
              "mr-2 py-2 px-4 text-sm font-medium border-b-2 transition-colors",
              selectedFilter === tab.id
                ? "text-indigo-600 border-indigo-600"
                : "text-gray-500 border-transparent hover:text-gray-700 hover:border-gray-300"
            )}
            onClick={() => onFilterChange(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default StudentFilters;