import { useState } from "react";
import { Download, FileUp, Plus, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StudentCardTable, StudentCard } from "@/components/cards/StudentCardTable";
import { useToast } from "@/hooks/use-toast";

// Demo data
const sampleStudentCards: StudentCard[] = [
  {
    id: 1,
    cardNumber: "IPC-2025-0001",
    student: {
      id: 101,
      name: "Aditya Patel",
      email: "a.patel@mail.com",
    },
    issueDate: new Date("2025-01-15"),
    expiryDate: new Date("2026-01-15"),
    plan: "premium",
    status: "active",
  },
  {
    id: 2,
    cardNumber: "IPC-2025-0002",
    student: {
      id: 102,
      name: "Min-Ji Kim",
      email: "minji.k@mail.com",
    },
    issueDate: new Date("2025-01-20"),
    expiryDate: new Date("2026-01-20"),
    plan: "standard",
    status: "active",
  },
  {
    id: 3,
    cardNumber: "IPC-2025-0003",
    student: {
      id: 103,
      name: "Carlos Rodriguez",
      email: "carlos@mail.com",
    },
    issueDate: new Date("2025-02-03"),
    expiryDate: new Date("2026-02-03"),
    plan: "premium",
    status: "pending",
  },
  {
    id: 4,
    cardNumber: "IPC-2025-0004",
    student: {
      id: 104,
      name: "Sophia Chang",
      email: "s.chang@mail.com",
    },
    issueDate: new Date("2025-02-10"),
    expiryDate: new Date("2026-02-10"),
    plan: "standard",
    status: "active",
  },
  {
    id: 5,
    cardNumber: "IPC-2025-0005",
    student: {
      id: 105,
      name: "Mohammed Al-Farsi",
      email: "m.alfarsi@mail.com",
    },
    issueDate: new Date("2025-02-15"),
    expiryDate: new Date("2026-02-15"),
    plan: "premium",
    status: "active",
  },
];

export default function CardManagement() {
  const [studentCards, setStudentCards] = useState<StudentCard[]>(sampleStudentCards);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const { toast } = useToast();

  // Card action handlers
  const handleEditCard = (id: number) => {
    toast({
      title: "Edit Card",
      description: `Editing card #${id}`,
    });
  };

  const handleActivateCard = (id: number) => {
    setStudentCards(prev => 
      prev.map(card => 
        card.id === id ? {...card, status: "active"} : card
      )
    );
    toast({
      title: "Card Activated",
      description: `Card #${id} has been activated successfully.`,
      variant: "default",
    });
  };

  const handleSuspendCard = (id: number) => {
    setStudentCards(prev => 
      prev.map(card => 
        card.id === id ? {...card, status: "inactive"} : card
      )
    );
    toast({
      title: "Card Suspended",
      description: `Card #${id} has been suspended successfully.`,
      variant: "default",
    });
  };

  const handleDeleteCard = (id: number) => {
    setStudentCards(prev => prev.filter(card => card.id !== id));
    toast({
      title: "Card Deleted",
      description: `Card #${id} has been deleted successfully.`,
      variant: "destructive",
    });
  };

  // Filter cards based on search term and status
  const filteredCards = studentCards.filter(card => {
    const matchesSearch = searchTerm === "" || 
      card.student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      card.cardNumber.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = selectedStatus === "all" || card.status === selectedStatus;
    
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Student Card Management</h1>
          <p className="text-muted-foreground">
            Issue, manage, and track student ID cards and privileges
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <FileUp className="h-4 w-4" />
            <span>Export</span>
          </Button>
          <Button variant="outline" className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Import</span>
          </Button>
          <Button className="bg-blue-600 hover:bg-blue-700 flex items-center gap-1">
            <Plus className="h-4 w-4" />
            <span>Issue New Card</span>
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all-cards" className="w-full">
        <TabsList>
          <TabsTrigger value="all-cards">All Cards</TabsTrigger>
          <TabsTrigger value="active">Active</TabsTrigger>
          <TabsTrigger value="pending">Pending</TabsTrigger>
          <TabsTrigger value="inactive">Inactive</TabsTrigger>
        </TabsList>

        <div className="my-4">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search by student or card number"
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <TabsContent value="all-cards">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Student Card Directory</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredCards.length} cards found
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <StudentCardTable 
                cards={filteredCards}
                onEditCard={handleEditCard}
                onActivateCard={handleActivateCard}
                onSuspendCard={handleSuspendCard}
                onDeleteCard={handleDeleteCard}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="active">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Active Cards</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredCards.filter(c => c.status === 'active').length} cards found
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <StudentCardTable 
                cards={filteredCards.filter(c => c.status === 'active')}
                onEditCard={handleEditCard}
                onActivateCard={handleActivateCard}
                onSuspendCard={handleSuspendCard}
                onDeleteCard={handleDeleteCard}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pending">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Pending Cards</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredCards.filter(c => c.status === 'pending').length} cards found
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <StudentCardTable 
                cards={filteredCards.filter(c => c.status === 'pending')}
                onEditCard={handleEditCard}
                onActivateCard={handleActivateCard}
                onSuspendCard={handleSuspendCard}
                onDeleteCard={handleDeleteCard}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="inactive">
          <Card>
            <CardHeader className="pb-3">
              <div className="flex justify-between">
                <CardTitle>Inactive Cards</CardTitle>
                <div className="text-sm text-muted-foreground">
                  {filteredCards.filter(c => c.status === 'inactive').length} cards found
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-0">
              <StudentCardTable 
                cards={filteredCards.filter(c => c.status === 'inactive')}
                onEditCard={handleEditCard}
                onActivateCard={handleActivateCard}
                onSuspendCard={handleSuspendCard}
                onDeleteCard={handleDeleteCard}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}