
import { useState, useEffect, createContext, useContext } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface Member {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  email: string;
  member_number: string;
  is_admin: boolean;
  membership_status: string;
  membership_type: string;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  member: Member | null;
  loading: boolean;
  signUp: (email: string, password: string, firstName: string, lastName: string) => Promise<{ error?: Error }>;
  signIn: (email: string, password: string) => Promise<{ error?: Error }>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [member, setMember] = useState<Member | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch member data when user changes
  const fetchMember = async (userId: string) => {
    try {
      console.log("Fetching member data for user:", userId);
      const { data, error } = await supabase
        .from('members')
        .select('*')
        .eq('user_id', userId)
        .maybeSingle();

      if (error) {
        console.error('Error fetching member:', error);
        return;
      }

      console.log("Member data fetched:", data);
      setMember(data);
    } catch (error) {
      console.error('Error in fetchMember:', error);
    }
  };

  useEffect(() => {
    console.log("Setting up auth state listener...");
    
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        console.log('Auth state changed:', event, session?.user?.email);
        
        // Update session and user state immediately
        setSession(session);
        setUser(session?.user ?? null);
        
        // Handle member data fetching
        if (session?.user) {
          console.log('User authenticated, fetching member data...');
          // Use setTimeout to prevent blocking the auth state change
          setTimeout(() => {
            fetchMember(session.user.id);
          }, 0);
          
          // For SIGNED_IN event, trigger immediate navigation
          if (event === 'SIGNED_IN') {
            console.log('SIGNED_IN event detected, triggering navigation...');
            // Use a longer timeout to ensure state is fully updated
            setTimeout(() => {
              const currentPath = window.location.pathname;
              console.log('Current path:', currentPath);
              
              // Only redirect if we're on auth pages
              if (currentPath === '/auth/login' || currentPath === '/auth/signup' || currentPath === '/') {
                console.log('Redirecting to member portal...');
                window.location.href = '/member-portal';
              }
            }, 100);
          }
        } else {
          console.log('No user, clearing member data');
          setMember(null);
        }
        
        // Set loading to false after processing auth change
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session }, error }) => {
      if (error) {
        console.error('Error getting session:', error);
        setLoading(false);
        return;
      }
      
      console.log('Initial session check:', session?.user?.email || 'No session');
      
      // Only update if we don't already have this session
      if (session?.user?.id !== user?.id) {
        setSession(session);
        setUser(session?.user ?? null);
        
        if (session?.user) {
          setTimeout(() => {
            fetchMember(session.user.id);
          }, 0);
        }
      }
      
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []); // Remove user from dependencies to prevent loops

  const signUp = async (email: string, password: string, firstName: string, lastName: string) => {
    try {
      console.log("Attempting sign up for:", email);
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: firstName,
            last_name: lastName,
          },
        },
      });

      if (error) {
        console.error('Sign up error:', error);
        return { error };
      }

      console.log('Sign up successful:', data);
      return {};
    } catch (error) {
      console.error('Sign up error:', error);
      return { error: error as Error };
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      console.log("Attempting sign in for:", email);
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        console.error('Sign in error:', error);
        return { error };
      }

      console.log('Sign in successful:', data);
      return {};
    } catch (error) {
      console.error('Sign in error:', error);
      return { error: error as Error };
    }
  };

  const signOut = async () => {
    try {
      console.log("Signing out...");
      await supabase.auth.signOut();
      console.log("Sign out successful");
    } catch (error) {
      console.error('Sign out error:', error);
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      session,
      member,
      loading,
      signUp,
      signIn,
      signOut,
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
