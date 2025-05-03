import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Download, 
  Share, 
  Printer, 
  Edit, 
  Trash, 
  Star,
  History,
  MessageSquare,
  File,
  Clock,
  User,
  Tag,
  Upload,
  Eye
} from "lucide-react";

interface DocumentDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  document?: {
    id: number;
    name: string;
    type: string;
    category: string;
    size: string;
    lastUpdated: string;
    uploadedBy: string;
    tags: string[];
    isFavorite: boolean;
    fileExtension: string;
    createdAt?: string;
    description?: string;
  };
}

interface ActivityLogItem {
  id: number;
  action: string;
  user: string;
  timestamp: string;
  details?: string;
}

// Mock activity log data
const mockActivityLog: ActivityLogItem[] = [
  {
    id: 1,
    action: "Uploaded",
    user: "Rahul Sharma",
    timestamp: "Mar 28, 2025 at 11:45 AM",
    details: "Initial upload"
  },
  {
    id: 2,
    action: "Viewed",
    user: "Priya Singh",
    timestamp: "Mar 28, 2025 at 2:30 PM"
  },
  {
    id: 3,
    action: "Shared",
    user: "Rahul Sharma",
    timestamp: "Mar 29, 2025 at 9:15 AM",
    details: "Shared with Vikram Shah"
  },
  {
    id: 4,
    action: "Downloaded",
    user: "Vikram Shah",
    timestamp: "Mar 29, 2025 at 10:30 AM"
  },
  {
    id: 5,
    action: "Edited",
    user: "Rahul Sharma",
    timestamp: "Mar 30, 2025 at 3:45 PM",
    details: "Updated agreement terms"
  }
];

// Mock comments data
interface Comment {
  id: number;
  user: string;
  timestamp: string;
  content: string;
  avatar?: string;
}

const mockComments: Comment[] = [
  {
    id: 1,
    user: "Rahul Sharma",
    timestamp: "Mar 29, 2025 at 2:15 PM",
    content: "Added updated agreement terms as requested by the university."
  },
  {
    id: 2,
    user: "Priya Singh",
    timestamp: "Mar 29, 2025 at 3:45 PM",
    content: "Please ensure all signature fields are correctly marked."
  },
  {
    id: 3,
    user: "Vikram Shah",
    timestamp: "Mar 30, 2025 at 10:30 AM",
    content: "The agreement looks good. We can proceed with sending it to the university representative."
  }
];

export default function DocumentDetailsDialog({
  open,
  onOpenChange,
  document
}: DocumentDetailsDialogProps) {
  const [activeTab, setActiveTab] = useState("details");
  const [commentText, setCommentText] = useState("");
  
  if (!document) return null;
  
  // Get document icon based on type
  const getDocumentIcon = () => {
    switch (document.type) {
      case 'pdf':
        return <File className="h-12 w-12 text-red-500" />;
      case 'docx':
      case 'doc':
        return <File className="h-12 w-12 text-blue-500" />;
      case 'xlsx':
      case 'xls':
        return <File className="h-12 w-12 text-green-500" />;
      case 'image':
      case 'jpg':
      case 'png':
        return <File className="h-12 w-12 text-purple-500" />;
      default:
        return <File className="h-12 w-12 text-gray-500" />;
    }
  };
  
  const handleAddComment = () => {
    if (!commentText.trim()) return;
    // In a real app, you would add the comment to the database
    setCommentText("");
  };
  
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', 
      month: 'long', 
      day: 'numeric'
    });
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-hidden flex flex-col">
        <DialogHeader>
          <div className="flex items-center gap-4">
            {getDocumentIcon()}
            <div>
              <DialogTitle className="text-xl">{document.name}</DialogTitle>
              <DialogDescription className="mt-1">
                {document.category} • {document.size}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>
        
        <div className="flex justify-between items-center mt-2 mb-4">
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Download className="h-4 w-4" />
              Download
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Share className="h-4 w-4" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="flex items-center gap-1">
              <Printer className="h-4 w-4" />
              Print
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <Edit className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500">
              <Trash className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Star className={`h-4 w-4 ${document.isFavorite ? 'text-yellow-400 fill-yellow-400' : 'text-gray-500'}`} />
            </Button>
          </div>
        </div>
        
        <Tabs defaultValue="details" className="flex-1 overflow-hidden flex flex-col" onValueChange={setActiveTab}>
          <TabsList className="mb-6 grid w-full grid-cols-3">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="activity">Activity Log</TabsTrigger>
            <TabsTrigger value="comments">Comments</TabsTrigger>
          </TabsList>
          
          <div className="flex-1 overflow-y-auto">
            <TabsContent value="details" className="m-0">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">File Name</p>
                    <p>{document.name}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">File Type</p>
                    <p>{document.fileExtension.toUpperCase()}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Size</p>
                    <p>{document.size}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Last Updated</p>
                    <p>{document.lastUpdated}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Uploaded By</p>
                    <p>{document.uploadedBy}</p>
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p>{document.category}</p>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Tags</p>
                  <div className="flex flex-wrap gap-2">
                    {document.tags.map((tag, index) => (
                      <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
                
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-500">Description</p>
                  <p className="text-gray-700">
                    {document.description || "No description provided."}
                  </p>
                </div>
                
                <div className="pt-6">
                  <h3 className="text-lg font-medium">Preview</h3>
                  <div className="mt-2 h-48 bg-gray-100 rounded-md flex items-center justify-center">
                    <p className="text-gray-500">Preview not available</p>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="m-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Activity Log</h3>
                <div className="space-y-4">
                  {mockActivityLog.map((activity) => (
                    <div key={activity.id} className="flex gap-4">
                      <div className="flex-shrink-0 mt-1">
                        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                          {activity.action === "Uploaded" && <Upload className="h-4 w-4 text-green-500" />}
                          {activity.action === "Viewed" && <Eye className="h-4 w-4 text-blue-500" />}
                          {activity.action === "Shared" && <Share className="h-4 w-4 text-purple-500" />}
                          {activity.action === "Downloaded" && <Download className="h-4 w-4 text-indigo-500" />}
                          {activity.action === "Edited" && <Edit className="h-4 w-4 text-orange-500" />}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center">
                          <p className="font-medium">{activity.action}</p>
                          <p className="text-gray-500 ml-1">by {activity.user}</p>
                        </div>
                        <p className="text-sm text-gray-500">{activity.timestamp}</p>
                        {activity.details && (
                          <p className="text-sm mt-1">{activity.details}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="comments" className="m-0">
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Comments</h3>
                
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                      R
                    </div>
                  </div>
                  <div className="flex-1">
                    <textarea
                      className="w-full border rounded-md p-2 text-sm min-h-[80px]"
                      placeholder="Add a comment..."
                      value={commentText}
                      onChange={(e) => setCommentText(e.target.value)}
                    />
                    <div className="flex justify-end mt-2">
                      <Button 
                        size="sm" 
                        onClick={handleAddComment}
                        disabled={!commentText.trim()}
                      >
                        Add Comment
                      </Button>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4 mt-6">
                  {mockComments.map((comment) => (
                    <div key={comment.id} className="flex gap-3">
                      <div className="flex-shrink-0">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                          {comment.user.charAt(0)}
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="font-medium">{comment.user}</p>
                          <p className="text-xs text-gray-500">{comment.timestamp}</p>
                        </div>
                        <p className="mt-1">{comment.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
        
        <DialogFooter className="border-t mt-4 pt-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}