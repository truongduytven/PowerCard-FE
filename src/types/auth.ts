import type { User } from "./user";

export interface AuthState {
  accessToken: string | null;
  user: User | null;
  loading: boolean;
  error: string | null;
  setAccessToken: (token: string | null) => void;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;
  fetchMe: () => Promise<void>;
  clearState: () => void;
}