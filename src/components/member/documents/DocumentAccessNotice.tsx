
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Lock } from "lucide-react";

const DocumentAccessNotice = () => {
  return (
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
  );
};

export default DocumentAccessNotice;
