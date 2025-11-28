import type { User } from "./user";

export interface AuthResponse extends User {
  message: string;
}