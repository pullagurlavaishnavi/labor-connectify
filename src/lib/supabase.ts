
// This file now provides mock functions to replace Supabase functionality
// and maintain compatibility with existing code

export const supabase = {
  auth: {
    signUp: async () => ({ data: null, error: null }),
    signInWithPassword: async () => ({ data: null, error: null }),
    signOut: async () => ({ error: null }),
    getUser: async () => ({ data: { user: null } }),
    onAuthStateChange: () => ({ 
      data: { subscription: { unsubscribe: () => {} } }
    }),
  },
  from: () => ({
    insert: () => ({
      select: async () => ({
        data: [],
        error: null,
      }),
    }),
    select: (selector: string) => ({
      eq: () => ({
        single: async () => ({
          data: null,
          error: null,
        }),
        order: () => ({
          data: [],
          error: null,
        }),
      }),
      order: () => ({
        data: [],
        error: null,
      }),
    }),
    update: () => ({
      eq: () => ({
        select: async () => ({
          data: [],
          error: null,
        }),
      }),
    }),
  }),
};

// Authentication helper functions - these are now just mocks
export const signUp = async (email: string, password: string) => {
  console.log('Mock signUp called with:', email);
  return { data: null, error: null };
};

export const signIn = async (email: string, password: string) => {
  console.log('Mock signIn called with:', email);
  return { data: null, error: null };
};

export const signOut = async () => {
  console.log('Mock signOut called');
  return { error: null };
};

export const getCurrentUser = async () => {
  console.log('Mock getCurrentUser called');
  return null;
};
