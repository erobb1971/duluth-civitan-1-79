
import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import DocumentSearch from "./documents/DocumentSearch";
import DocumentCategory from "./documents/DocumentCategory";
import DocumentAccessNotice from "./documents/DocumentAccessNotice";
import { mockDocuments } from "./documents/documentTypes";

const MemberDocuments = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [...new Set(mockDocuments.map(doc => doc.category))];

  const filteredDocuments = mockDocuments.filter(doc =>
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

      <DocumentSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />

      {categories.map(category => {
        const categoryDocs = filteredDocuments.filter(doc => doc.category === category);
        
        return (
          <DocumentCategory
            key={category}
            category={category}
            documents={categoryDocs}
            onDownload={handleDownload}
            onView={handleView}
          />
        );
      })}

      <DocumentAccessNotice />
    </div>
  );
};

export default MemberDocuments;
