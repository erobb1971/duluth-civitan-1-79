
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { FileText, Download, Calendar, Lock, Eye } from "lucide-react";
import { Document } from "./documentTypes";

interface DocumentCardProps {
  document: Document;
  onDownload: (id: number, title: string) => void;
  onView: (id: number, title: string) => void;
}

const DocumentCard = ({ document, onDownload, onView }: DocumentCardProps) => {
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
    <div className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
      <div className="flex items-center gap-3">
        {getDocumentIcon(document.type)}
        <div>
          <div className="flex items-center gap-2">
            <h4 className="font-medium">{document.title}</h4>
            {document.restricted && (
              <Lock className="h-4 w-4 text-yellow-500" />
            )}
          </div>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              {new Date(document.date).toLocaleDateString()}
            </span>
            <span>{document.size}</span>
            <Badge variant="outline" className="text-xs">
              {document.type}
            </Badge>
          </div>
        </div>
      </div>
      
      <div className="flex items-center gap-2">
        {!document.restricted && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onView(document.id, document.title)}
          >
            <Eye className="h-4 w-4" />
          </Button>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onDownload(document.id, document.title)}
          disabled={document.restricted}
        >
          <Download className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default DocumentCard;
