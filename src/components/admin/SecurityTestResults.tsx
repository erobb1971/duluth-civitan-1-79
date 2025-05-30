import React from "react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle } from "lucide-react";
import { TestResult } from "./types";

interface SecurityTestResultsProps {
  testResults: TestResult[];
}

const SecurityTestResults = ({ testResults }: SecurityTestResultsProps) => {
  if (testResults.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      <h4 className="font-semibold">Test Results:</h4>
      {testResults.map((result, index) => (
        <Alert key={index} className={result.status === "pass" ? "border-green-200" : "border-red-200"}>
          <div className="flex items-start gap-2">
            {result.status === "pass" ? 
              <CheckCircle className="h-4 w-4 text-green-600 mt-0.5" /> : 
              <XCircle className="h-4 w-4 text-red-600 mt-0.5" />
            }
            <div className="flex-1">
              <div className="font-medium">{result.test}</div>
              <AlertDescription className="mt-1">
                {result.details}
              </AlertDescription>
              {result.data && (
                <details className="mt-2">
                  <summary className="cursor-pointer text-sm text-gray-600">View Data</summary>
                  <pre className="mt-1 text-xs bg-gray-50 p-2 rounded overflow-auto max-h-32">
                    {JSON.stringify(result.data, null, 2)}
                  </pre>
                </details>
              )}
            </div>
          </div>
        </Alert>
      ))}
    </div>
  );
};

export default SecurityTestResults;
