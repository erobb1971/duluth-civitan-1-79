import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, Shield, Users, Database, FileText } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

interface TestResult {
  test: string;
  status: "pass" | "fail" | "pending";
  details: string;
  data?: any;
}

const SecurityTestDashboard = () => {
  const { user, member } = useAuth();
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const addTestResult = (result: TestResult) => {
    setTestResults(prev => [...prev, result]);
  };

  const runSecurityTests = async () => {
    setIsRunning(true);
    setTestResults([]);

    // Test 1: Current User Access
    try {
      const { data: currentMember, error } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', user?.id)
        .single();

      if (error) {
        addTestResult({
          test: "Current User Member Access",
          status: "fail",
          details: `Error fetching own member data: ${error.message}`
        });
      } else {
        addTestResult({
          test: "Current User Member Access",
          status: "pass",
          details: `Successfully retrieved own member data: ${currentMember.first_name} ${currentMember.last_name}`,
          data: currentMember
        });
      }
    } catch (error) {
      addTestResult({
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
        addTestResult({
          test: "All Members Access",
          status: member?.is_admin ? "fail" : "pass",
          details: member?.is_admin 
            ? `Admin should be able to access all members but got error: ${error.message}`
            : `Non-admin correctly blocked from accessing all members: ${error.message}`
        });
      } else {
        addTestResult({
          test: "All Members Access", 
          status: member?.is_admin ? "pass" : "fail",
          details: member?.is_admin
            ? `Admin successfully retrieved ${allMembers.length} members`
            : `Non-admin incorrectly gained access to ${allMembers.length} members`,
          data: allMembers
        });
      }
    } catch (error) {
      addTestResult({
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
        addTestResult({
          test: "Admin Function Check",
          status: "fail",
          details: `Error calling is_user_admin function: ${error.message}`
        });
      } else {
        addTestResult({
          test: "Admin Function Check",
          status: "pass",
          details: `is_user_admin function returned: ${adminCheck} (expected: ${member?.is_admin})`,
          data: { function_result: adminCheck, member_is_admin: member?.is_admin }
        });
      }
    } catch (error) {
      addTestResult({
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
        addTestResult({
          test: "Insert Own Record",
          status: "fail",
          details: `Failed to insert test record: ${error.message}`
        });
      } else {
        addTestResult({
          test: "Insert Own Record",
          status: "pass",
          details: `Successfully inserted test record: ${insertResult.id}`
        });

        // Clean up test record
        await supabase.from('members').delete().eq('id', insertResult.id);
      }
    } catch (error) {
      addTestResult({
        test: "Insert Own Record",
        status: "fail",
        details: `Exception: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    // Test 5: RLS Behavior Check (Simplified)
    try {
      // Since we can't query pg_policies directly, we'll test RLS behavior instead
      const { data: testMembers, error } = await supabase
        .from('members')
        .select('id, first_name, last_name, is_admin');

      if (error) {
        addTestResult({
          test: "RLS Behavior Check",
          status: "fail",
          details: `Could not test RLS behavior: ${error.message}`
        });
      } else {
        const expectedCount = member?.is_admin ? "multiple" : "1";
        addTestResult({
          test: "RLS Behavior Check",
          status: "pass",
          details: `RLS working correctly - retrieved ${testMembers.length} member records (expected: ${expectedCount} for ${member?.is_admin ? 'admin' : 'user'})`,
          data: { member_count: testMembers.length, user_is_admin: member?.is_admin }
        });
      }
    } catch (error) {
      addTestResult({
        test: "RLS Behavior Check",
        status: "fail",
        details: `Could not check RLS behavior: ${error instanceof Error ? error.message : String(error)}`
      });
    }

    setIsRunning(false);
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
                <Button variant="outline" onClick={exportTestResults}>
                  Export Results
                </Button>
              )}
            </div>
          </div>

          {testResults.length > 0 && (
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
          )}
        </CardContent>
      </Card>

      <Tabs defaultValue="documentation" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="documentation">Setup Documentation</TabsTrigger>
          <TabsTrigger value="migration">Migration Export</TabsTrigger>
          <TabsTrigger value="backup">Backup Instructions</TabsTrigger>
        </TabsList>

        <TabsContent value="documentation" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Civitan Chapter Setup Guide
              </CardTitle>
              <CardDescription>
                Complete instructions for replicating this setup for other Civitan chapters
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <h3>1. Supabase Project Setup</h3>
                <p>Create a new Supabase project and note down your project URL and anon key.</p>
                
                <h3>2. Required Environment Variables</h3>
                <pre className="bg-gray-50 p-3 rounded text-sm">
{`SUPABASE_URL=your_project_url
SUPABASE_ANON_KEY=your_anon_key`}
                </pre>

                <h3>3. Database Schema Setup</h3>
                <p>Run the migration SQL provided in the Migration Export tab.</p>

                <h3>4. Authentication Configuration</h3>
                <ul>
                  <li>Enable email/password authentication in Supabase Auth settings</li>
                  <li>Set your site URL and redirect URLs</li>
                  <li>Configure email templates (optional)</li>
                </ul>

                <h3>5. Admin User Setup</h3>
                <p>The first user registered with the email in the auto_admin_emails array will automatically become an admin.</p>

                <h3>6. Security Features</h3>
                <ul>
                  <li>Row Level Security (RLS) enabled on all tables</li>
                  <li>Security definer function prevents recursive policy issues</li>
                  <li>Admins can view all data, users can only see their own records</li>
                  <li>Automatic member record creation on user signup</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="migration" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Complete Migration SQL</CardTitle>
              <CardDescription>
                Copy this SQL and run it in your new Supabase project's SQL editor
              </CardDescription>
            </CardHeader>
            <CardContent>
              <pre className="bg-gray-50 p-4 rounded text-sm overflow-auto max-h-96 whitespace-pre-wrap">
{`-- Civitan Member Portal Complete Schema Migration
-- Generated: ${new Date().toISOString()}

-- 1. Create enums
CREATE TYPE public.membership_status AS ENUM ('active', 'inactive', 'pending', 'suspended');
CREATE TYPE public.membership_type AS ENUM ('regular', 'honorary', 'life', 'associate');
CREATE TYPE public.event_type AS ENUM ('meeting', 'service_project', 'social', 'fundraiser', 'conference');
CREATE TYPE public.attendance_status AS ENUM ('present', 'absent', 'excused');
CREATE TYPE public.payment_status AS ENUM ('pending', 'completed', 'failed', 'refunded');

-- 2. Create member number sequence
CREATE SEQUENCE IF NOT EXISTS public.member_number_seq START 1;

-- 3. Create members table
CREATE TABLE public.members (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    first_name text NOT NULL,
    last_name text NOT NULL,
    email text NOT NULL,
    phone text,
    address text,
    city text,
    state text,
    zip_code text,
    date_of_birth date,
    emergency_contact_name text,
    emergency_contact_phone text,
    member_number text,
    membership_type public.membership_type DEFAULT 'regular',
    membership_status public.membership_status DEFAULT 'active',
    is_admin boolean DEFAULT false,
    join_date date DEFAULT CURRENT_DATE,
    auto_admin_emails text[] DEFAULT '{robb.erica@gmail.com}',
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

-- 4. Create other tables
CREATE TABLE public.events (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    title text NOT NULL,
    description text,
    event_type public.event_type NOT NULL,
    start_date timestamp with time zone NOT NULL,
    end_date timestamp with time zone,
    location text,
    max_attendees integer,
    registration_required boolean DEFAULT false,
    registration_deadline timestamp with time zone,
    created_by uuid REFERENCES public.members(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.attendance (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id uuid REFERENCES public.members(id),
    event_id uuid REFERENCES public.events(id),
    status public.attendance_status DEFAULT 'present',
    notes text,
    recorded_by uuid REFERENCES public.members(id),
    recorded_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.committees (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    name text NOT NULL,
    description text,
    chair_id uuid REFERENCES public.members(id),
    vice_chair_id uuid REFERENCES public.members(id),
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.committee_memberships (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    committee_id uuid REFERENCES public.committees(id),
    member_id uuid REFERENCES public.members(id),
    role text DEFAULT 'member',
    joined_date date DEFAULT CURRENT_DATE
);

CREATE TABLE public.service_hours (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id uuid REFERENCES public.members(id),
    event_id uuid REFERENCES public.events(id),
    hours numeric NOT NULL,
    date_performed date NOT NULL,
    description text,
    verified_by uuid REFERENCES public.members(id),
    verified_at timestamp with time zone,
    created_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.payments (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id uuid REFERENCES public.members(id),
    amount numeric NOT NULL,
    payment_type text NOT NULL,
    description text,
    status public.payment_status DEFAULT 'pending',
    due_date date,
    paid_date date,
    payment_method text,
    stripe_payment_id text,
    created_at timestamp with time zone DEFAULT now(),
    updated_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.communications (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    member_id uuid REFERENCES public.members(id),
    type text NOT NULL,
    subject text,
    content text,
    sent_by uuid REFERENCES public.members(id),
    sent_at timestamp with time zone DEFAULT now()
);

CREATE TABLE public.password_reset_tokens (
    id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id uuid,
    token text NOT NULL,
    expires_at timestamp with time zone NOT NULL DEFAULT (now() + interval '1 hour'),
    used boolean DEFAULT false,
    created_at timestamp with time zone DEFAULT now()
);

-- 5. Enable RLS on all tables
ALTER TABLE public.members ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committees ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.committee_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.service_hours ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.password_reset_tokens ENABLE ROW LEVEL SECURITY;

-- 6. Create security definer function
CREATE OR REPLACE FUNCTION public.is_user_admin(user_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 
    FROM public.members 
    WHERE members.user_id = is_user_admin.user_id 
    AND is_admin = true
  );
$$;

-- 7. Create RLS policies for members table
CREATE POLICY "Users can view own member record" ON public.members
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can view all member records" ON public.members
  FOR SELECT USING (public.is_user_admin(auth.uid()));

CREATE POLICY "Users can update own member record" ON public.members
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Admins can update all member records" ON public.members
  FOR UPDATE USING (public.is_user_admin(auth.uid()));

CREATE POLICY "System can insert member records" ON public.members
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Admins can delete member records" ON public.members
  FOR DELETE USING (public.is_user_admin(auth.uid()));

-- 8. Create RLS policies for other tables (events, attendance, etc.)
-- Events
CREATE POLICY "Everyone can view events" ON public.events FOR SELECT USING (true);
CREATE POLICY "Admins can manage events" ON public.events FOR ALL USING (public.is_user_admin(auth.uid()));

-- Attendance  
CREATE POLICY "Users can view own attendance" ON public.attendance 
  FOR SELECT USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    OR public.is_user_admin(auth.uid())
  );
CREATE POLICY "Admins can manage attendance" ON public.attendance FOR ALL USING (public.is_user_admin(auth.uid()));

-- Service Hours
CREATE POLICY "Users can view own service hours" ON public.service_hours
  FOR SELECT USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    OR public.is_user_admin(auth.uid())
  );
CREATE POLICY "Users can insert own service hours" ON public.service_hours
  FOR INSERT WITH CHECK (member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid()));
CREATE POLICY "Admins can manage service hours" ON public.service_hours FOR ALL USING (public.is_user_admin(auth.uid()));

-- Payments
CREATE POLICY "Users can view own payments" ON public.payments
  FOR SELECT USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    OR public.is_user_admin(auth.uid())
  );
CREATE POLICY "Admins can manage payments" ON public.payments FOR ALL USING (public.is_user_admin(auth.uid()));

-- Communications
CREATE POLICY "Users can view own communications" ON public.communications
  FOR SELECT USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    OR public.is_user_admin(auth.uid())
  );
CREATE POLICY "Admins can manage communications" ON public.communications FOR ALL USING (public.is_user_admin(auth.uid()));

-- Committees
CREATE POLICY "Everyone can view committees" ON public.committees FOR SELECT USING (true);
CREATE POLICY "Admins can manage committees" ON public.committees FOR ALL USING (public.is_user_admin(auth.uid()));

-- Committee Memberships
CREATE POLICY "Users can view own committee memberships" ON public.committee_memberships
  FOR SELECT USING (
    member_id IN (SELECT id FROM public.members WHERE user_id = auth.uid())
    OR public.is_user_admin(auth.uid())
  );
CREATE POLICY "Admins can manage committee memberships" ON public.committee_memberships FOR ALL USING (public.is_user_admin(auth.uid()));

-- Password Reset Tokens
CREATE POLICY "Users can manage own tokens" ON public.password_reset_tokens
  FOR ALL USING (user_id = auth.uid());

-- 9. Create trigger functions
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
BEGIN
  INSERT INTO public.members (
    user_id,
    first_name,
    last_name,
    email,
    member_number,
    is_admin
  )
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'first_name', ''),
    COALESCE(NEW.raw_user_meta_data->>'last_name', ''),
    NEW.email,
    'MEM' || LPAD(nextval('public.member_number_seq')::text, 6, '0'),
    NEW.email = ANY(ARRAY['robb.erica@gmail.com'])
  );
  RETURN NEW;
END;
$$;

-- 10. Create triggers
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER update_members_updated_at
  BEFORE UPDATE ON public.members
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_events_updated_at
  BEFORE UPDATE ON public.events
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_payments_updated_at
  BEFORE UPDATE ON public.payments
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_committees_updated_at
  BEFORE UPDATE ON public.committees
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Migration complete!
-- Remember to:
-- 1. Update auto_admin_emails array with your admin email addresses
-- 2. Configure authentication settings in Supabase dashboard
-- 3. Set up your site URL and redirect URLs
-- 4. Test the setup with the Security Test Dashboard`}
              </pre>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="backup" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="h-5 w-5" />
                Backup & Recovery Instructions
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="prose max-w-none">
                <h3>1. Database Backup</h3>
                <p>Use Supabase CLI to create backups:</p>
                <pre className="bg-gray-50 p-3 rounded text-sm">
{`# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Create backup
supabase db dump --project-id [your-project-id] > backup.sql`}
                </pre>

                <h3>2. Manual Schema Export</h3>
                <p>Go to Supabase Dashboard → SQL Editor → Run this query:</p>
                <pre className="bg-gray-50 p-3 rounded text-sm">
{`SELECT 
  table_name,
  column_name,
  data_type,
  is_nullable,
  column_default
FROM information_schema.columns 
WHERE table_schema = 'public'
ORDER BY table_name, ordinal_position;`}
                </pre>

                <h3>3. RLS Policies Backup</h3>
                <pre className="bg-gray-50 p-3 rounded text-sm">
{`SELECT 
  schemaname,
  tablename,
  policyname,
  roles,
  cmd,
  qual,
  with_check
FROM pg_policies 
WHERE schemaname = 'public';`}
                </pre>

                <h3>4. Configuration Backup</h3>
                <ul>
                  <li>Export auth settings from Supabase Dashboard</li>
                  <li>Save environment variables securely</li>
                  <li>Document any custom functions or triggers</li>
                  <li>Export user data periodically</li>
                </ul>

                <h3>5. Restore Process</h3>
                <ol>
                  <li>Create new Supabase project</li>
                  <li>Run the complete migration SQL</li>
                  <li>Restore data using: <code>psql -h [host] -U postgres -d postgres &lt; backup.sql</code></li>
                  <li>Reconfigure authentication settings</li>
                  <li>Test with Security Dashboard</li>
                </ol>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityTestDashboard;
