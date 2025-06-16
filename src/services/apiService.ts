import {
  GenerationRequest,
  GenerationResponse,
  SavedPrompt,
  EtaStatus,
} from "../types";

class ApiService {
  private baseUrl = "/api"; // Replace with your actual API base URL

  async generateImage(request: GenerationRequest): Promise<GenerationResponse> {
    try {
      const response = await fetch(`${this.baseUrl}/generate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      // Mock response for demo purposes
      return {
        success: true,
        images: [
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
          "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
        ],
      };
    }
  }

  async savePrompt(
    prompt: Omit<SavedPrompt, "id" | "created_at">
  ): Promise<{ success: boolean }> {
    try {
      const response = await fetch(`${this.baseUrl}/save-prompt`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(prompt),
      });

      return await response.json();
    } catch (error) {
      return { success: true }; // Mock success
    }
  }

  async getSavedPrompts(): Promise<SavedPrompt[]> {
    try {
      const response = await fetch(`${this.baseUrl}/saved-prompts`);
      return await response.json();
    } catch (error) {
      return []; // Mock empty array
    }
  }

  async getImageHistory(): Promise<string[]> {
    try {
      const response = await fetch(`${this.baseUrl}/history`);
      return await response.json();
    } catch (error) {
      return []; // Mock empty array
    }
  }

  async getEtaStatus(): Promise<EtaStatus> {
    try {
      const response = await fetch(`${this.baseUrl}/eta-status`);
      return await response.json();
    } catch (error) {
      return {
        eta: 0,
        progress: 0,
        status: "Machine Ready",
      };
    }
  }

  async getTokenCount(): Promise<{ tokens: number }> {
    try {
      const response = await fetch(`${this.baseUrl}/tokens`);
      return await response.json();
    } catch (error) {
      return { tokens: 100 }; // Mock token count
    }
  }
}

export const apiService = new ApiService();
