import { md5 } from "js-md5";
import { User } from "../types";

// Mock API service - replace with actual API calls
class AuthService {
  private baseUrl = "/api"; // Replace with your actual API base URL

  private getDeviceHash(): string {
    const data = [
      navigator.userAgent,
      navigator.platform,
      navigator.language,
      `${screen.width}x${screen.height}`,
      window.devicePixelRatio.toString(),
    ].join("||");

    return md5(data);
  }

  private async getClientIP(): Promise<string> {
    try {
      const response = await fetch("https://api.ipify.org?format=json");
      const data = await response.json();
      return data.ip;
    } catch (error) {
      return "unknown";
    }
  }

  async login(username: string, password: string): Promise<User> {
    try {
      // Mock implementation - replace with actual API call
      const deviceHash = this.getDeviceHash();
      const ip = await this.getClientIP();

      // Simulate API call
      const response = await fetch(`${this.baseUrl}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          devicehash: deviceHash,
          ip,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }

      const userData = await response.json();
      return userData;
    } catch (error) {
      // Mock successful login for demo purposes
      if (username === "admin" && password === "admin") {
        return {
          username: "Admin",
          tokens: 100,
        };
      }
      throw new Error("Invalid credentials");
    }
  }

  async register(
    username: string,
    password: string,
    confirmPassword: string
  ): Promise<void> {
    if (password !== confirmPassword) {
      throw new Error("Passwords do not match");
    }

    try {
      const deviceHash = this.getDeviceHash();
      const ip = await this.getClientIP();

      // Mock implementation - replace with actual API call
      const response = await fetch(`${this.baseUrl}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
          confirm_password: confirmPassword,
          hwid: deviceHash,
          ip,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Registration failed");
      }
    } catch (error) {
      // Mock successful registration for demo purposes
      console.log("Registration successful (mock)");
    }
  }

  logout(): void {
    // Clear any stored tokens or session data
    localStorage.removeItem("user");
  }
}

export const authService = new AuthService();
