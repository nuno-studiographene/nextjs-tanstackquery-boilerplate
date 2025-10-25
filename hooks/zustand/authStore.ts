import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface AuthStore {
  isAuthenticated: boolean;
  user: {
    id: string;
    name: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  checkAuth: () => boolean;
}

const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      user: null,

      login: async (email: string, password: string) => {
        // Dummy authentication - replace with real API call later
        if (email === 'admin@example.com' && password === 'password') {
          const user = {
            id: '1',
            name: 'Admin User',
            email: email,
          };
          
          set({ isAuthenticated: true, user });
          return true;
        }
        
        // For demo purposes, accept any email/password combination
        if (email && password) {
          const user = {
            id: '1',
            name: email.split('@')[0],
            email: email,
          };
          
          set({ isAuthenticated: true, user });
          return true;
        }
        
        return false;
      },

      logout: () => {
        set({ isAuthenticated: false, user: null });
      },

      checkAuth: () => {
        return get().isAuthenticated;
      },
    }),
    {
      name: 'auth-storage', // localStorage key
    }
  )
)

export { useAuthStore }
