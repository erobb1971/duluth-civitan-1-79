import React, { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import SecurityTestExecution from "./SecurityTestExecution";
import SecurityTestResults from "./SecurityTestResults";
import SecurityDocumentation from "./SecurityDocumentation";
import { TestResult } from "./types";

const SecurityTestDashboard = () => {
  const { user, member } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const handleTestStart = () => {
    setIsRunning(true);
    setTestResults([]);
  };

  const handleTestComplete = () => {
    setIsRunning(false);
  };

  const handleTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const exportTestResults = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      user: {
        id: user?.id,
        email: user?.email,
        is_admin: member?.is_admin
      },
      tests: testResults,
      environment: "Civitan Member Portal"
    };

    const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `security-test-results-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Security & RLS Testing Dashboard
          </CardTitle>
          <CardDescription>
            Comprehensive testing of Row Level Security policies and authentication flows
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SecurityTestExecution
            isRunning={isRunning}
            onTestStart={handleTestStart}
            onTestComplete={handleTestComplete}
            onTestResult={handleTestResult}
            testResults={testResults}
            onExportResults={exportTestResults}
          />

          <SecurityTestResults testResults={testResults} />
        </CardContent>
      </Card>

      <SecurityDocumentation />
    </div>
  );
};

export default SecurityTestDashboard;
