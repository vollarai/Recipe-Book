const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5113";
import type { LoginRequest } from "../models/loginRequest";
import type { RegisterRequest } from "../models/registerRequest";
import type { AuthResponse } from "../models/authResponse";

export async function login(req: LoginRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/Auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Login failed");
  }

  return data; 
}

export async function register(req: RegisterRequest): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/api/Auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(req),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || "Registration failed");
  }

  return data;
}
