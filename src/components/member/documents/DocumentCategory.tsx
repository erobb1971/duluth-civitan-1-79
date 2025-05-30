
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import DocumentCard from "./DocumentCard";
import { Document } from "./documentTypes";

interface DocumentCategoryProps {
  category: string;
  documents: Document[];
  onDownload: (id: number, title: string) => void;
  onView: (id: number, title: string) => void;
}

const DocumentCategory = ({ category, documents, onDownload, onView }: DocumentCategoryProps) => {
  if (documents.length === 0) return null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{category}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {documents.map((doc) => (
            <DocumentCard
              key={doc.id}
              document={doc}
              onDownload={onDownload}
              onView={onView}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentCategory;
