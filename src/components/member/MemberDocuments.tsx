import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Search, Calendar, Lock, Eye } from "lucide-react";

const MemberDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock documents data - will be replaced with Supabase queries
  const documents = [
    {
      id: 1,
      title: "January 2024 Meeting Minutes",
      type: "minutes",
      date: "2024-01-15",
      size: "234 KB",
      restricted: false,
      category: "Meeting Minutes"
    },
    {
      id: 2,
      title: "Club Constitution & Bylaws",
      type: "constitution",
      date: "2023-12-01",
      size: "1.2 MB",
      restricted: false,
      category: "Governance"
    },
    {
      id: 3,
      title: "Board Meeting Minutes - February",
      type: "minutes",
      date: "2024-02-05",
      size: "156 KB",
      restricted: true,
      category: "Board Documents"
    },
    {
      id: 4,
      title: "Annual Financial Report 2023",
      type: "financial",
      date: "2024-01-30",
      size: "892 KB",
      restricted: true,
      category: "Financial"
    },
    {
      id: 5,
      title: "Volunteer Guidelines Handbook",
      type: "handbook",
      date: "2023-11-15",
      size: "2.1 MB",
      restricted: false,
      category: "Resources"
    },
    {
      id: 6,
      title: "Event Planning Checklist",
      type: "template",
      date: "2023-10-20",
      size: "87 KB",
      restricted: false,
      category: "Templates"
    }
  ];

  const categories = [...new Set(documents.map(doc => doc.category))];

  const filteredDocuments = documents.filter(doc =>
    doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    doc.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDownload = (documentId: number, title: string) => {
    console.log("Downloading document:", documentId, title);
    // TODO: Implement Supabase file download
  };

  const handleView = (documentId: number, title: string) => {
    console.log("Viewing document:", documentId, title);
    // TODO: Implement document viewer
  };

  const getDocumentIcon = (type: string) => {
    switch (type) {
      case "minutes":
        return <FileText className="h-5 w-5 text-blue-500" />;
      case "financial":
        return <FileText className="h-5 w-5 text-green-500" />;
      case "constitution":
        return <FileText className="h-5 w-5 text-purple-500" />;
      default:
        return <FileText className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Member Documents
          </CardTitle>
          <CardDescription>
            Access meeting minutes, handbooks, financial reports, and other club documents
          </CardDescription>
        </CardHeader>
      </Card>

      {/* Search and Filter */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search documents..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents by Category */}
      {categories.map(category => {
        const categoryDocs = filteredDocuments.filter(doc => doc.category === category);
        
        if (categoryDocs.length === 0) return null;

        return (
          <Card key={category}>
            <CardHeader>
              <CardTitle className="text-lg">{category}</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {categoryDocs.map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex items-center gap-3">
                      {getDocumentIcon(doc.type)}
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{doc.title}</h4>
                          {doc.restricted && (
                            <Lock className="h-4 w-4 text-yellow-500" />
                          )}
                        </div>
                        <div className="flex items-center gap-4 text-sm text-gray-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            {new Date(doc.date).toLocaleDateString()}
                          </span>
                          <span>{doc.size}</span>
                          <Badge variant="outline" className="text-xs">
                            {doc.type}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {!doc.restricted && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleView(doc.id, doc.title)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                      )}
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDownload(doc.id, doc.title)}
                        disabled={doc.restricted}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      })}

      {/* Document Access Notice */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
            <Lock className="h-5 w-5 text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900">Document Access Levels</h4>
              <p className="text-sm text-blue-700 mt-1">
                Some documents are restricted to board members or specific roles. 
                If you need access to a restricted document, please contact a board member.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MemberDocuments;
