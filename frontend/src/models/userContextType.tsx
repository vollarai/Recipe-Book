import type { User } from "./user";

export interface UserContextType {
  user: User | null;
  setUser: (u: User | null) => void;
  token: string | null;
  setToken: (t: string | null) => void;
  logout: () => void;
}