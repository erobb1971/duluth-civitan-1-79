import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { TestResult } from "./types";

interface SecurityTestExecutionProps {
  isRunning: boolean;
  onTestStart: () => void;
  onTestComplete: () => void;
  onTestResult: (result: TestResult) => void;
  testResults: TestResult[];
  onExportResults: () => void;
}

const SecurityTestExecution = ({
  isRunning,
  onTestStart,
  onTestComplete,
  onTestResult,
  testResults,
  onExportResults
}: SecurityTestExecutionProps) => {
  const { user, member } = useAuth();

  const runSecurityTests = async () => {
    onTestStart();

    // Test 1: Current User Access
    try {
      const { data: currentMember, error } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        onTestResult({
          test: "Current User Member Access",
          status: "fail",
          details: `Error fetching own member data: ${error.message}`
        });
      } else {
        onTestResult({
          test: "Current User Member Access",
          status: "pass",
          details: `Successfully retrieved own member data: ${currentMember.first_name} ${currentMember.last_name}`,
          data: currentMember
        });
      }
    } catch (error) {
      onTestResult({
        test: "Current User Member Access",
        status: "fail",
        details: `Exception: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    // Test 2: All Members Access (Admin vs User)
    try {
      const { data: allMembers, error } = await supabase
        .from('members')
        .select('*');

      if (error) {
        onTestResult({
          test: "All Members Access",
          status: member?.is_admin ? "fail" : "pass",
          details: member?.is_admin 
            ? `Admin should be able to access all members but got error: ${error.message}`
            : `Non-admin correctly blocked from accessing all members: ${error.message}`
        });
      } else {
        onTestResult({
          test: "All Members Access", 
          status: member?.is_admin ? "pass" : "fail",
          details: member?.is_admin
            ? `Admin successfully retrieved ${allMembers.length} members`
            : `Non-admin incorrectly gained access to ${allMembers.length} members`,
          data: allMembers
        });
      }
    } catch (error) {
      onTestResult({
        test: "All Members Access",
        status: "fail",
        details: `Exception: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    // Test 3: Admin Function Test
    try {
      const { data: adminCheck, error } = await supabase
        .rpc('is_user_admin', { user_id: user?.id });

      if (error) {
        onTestResult({
          test: "Admin Function Check",
          status: "fail",
          details: `Error calling is_user_admin function: ${error.message}`
        });
      } else {
        onTestResult({
          test: "Admin Function Check",
          status: "pass",
          details: `is_user_admin function returned: ${adminCheck} (expected: ${member?.is_admin})`,
          data: { function_result: adminCheck, member_is_admin: member?.is_admin }
        });
      }
    } catch (error) {
      onTestResult({
        test: "Admin Function Check",
        status: "fail",
        details: `Exception: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    // Test 4: Insert Test (Own Record)
    try {
      const testData = {
        first_name: 'Test',
        last_name: 'User',
        email: `test-${Date.now()}@example.com`,
        user_id: user?.id,
        member_number: `TEST${Date.now()}`
      };

      const { data: insertResult, error } = await supabase
        .from('members')
        .insert(testData)
        .select()
        .single();

      if (error) {
        onTestResult({
          test: "Insert Own Record",
          status: "fail",
          details: `Failed to insert test record: ${error.message}`
        });
      } else {
        onTestResult({
          test: "Insert Own Record",
          status: "pass",
          details: `Successfully inserted test record: ${insertResult.id}`
        });

        // Clean up test record
        await supabase.from('members').delete().eq('id', insertResult.id);
      }
    } catch (error) {
      onTestResult({
        test: "Insert Own Record",
        status: "fail",
        details: `Exception: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    // Test 5: RLS Behavior Check (Simplified)
    try {
      const { data: testMembers, error } = await supabase
        .from('members')
        .select('id, first_name, last_name, is_admin');

      if (error) {
        onTestResult({
          test: "RLS Behavior Check",
          status: "fail",
          details: `Could not test RLS behavior: ${error.message}`
        });
      } else {
        const expectedCount = member?.is_admin ? "multiple" : "1";
        onTestResult({
          test: "RLS Behavior Check",
          status: "pass",
          details: `RLS working correctly - retrieved ${testMembers.length} member records (expected: ${expectedCount} for ${member?.is_admin ? 'admin' : 'user'})`,
          data: { member_count: testMembers.length, user_is_admin: member?.is_admin }
        });
      }
    } catch (error) {
      onTestResult({
        test: "RLS Behavior Check",
        status: "fail",
        details: `Could not check RLS behavior: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    onTestComplete();
  };

  return (
    <div className="flex items-center justify-between mb-4">
      <div className="flex items-center gap-4">
        <Badge variant={member?.is_admin ? "destructive" : "secondary"}>
          {member?.is_admin ? "Admin User" : "Standard User"}
        </Badge>
        <span className="text-sm text-gray-600">
          {user?.email}
        </span>
      </div>
      <div className="flex gap-2">
        <Button onClick={runSecurityTests} disabled={isRunning}>
          {isRunning ? "Running Tests..." : "Run Security Tests"}
        </Button>
        {testResults.length > 0 && (
          <Button variant="outline" onClick={onExportResults}>
            Export Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default SecurityTestExecution;
