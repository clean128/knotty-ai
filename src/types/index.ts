export interface User {
  username: string
  tokens: number
}

export interface GenerationRequest {
  prompt: string
  negative_prompt: string
  sampler: string
  scheduler: string
  cfg: number
}

export interface GenerationResponse {
  success: boolean
  images?: string[]
  error?: string
  keyword?: string
}

export interface SavedPrompt {
  id: number
  positive_prompt: string
  negative_prompt: string
  sampler: string
  scheduler: string
  cfg: number
  created_at: string
}

export interface PromptPreset {
  prompt: string
  negative_prompt: string
}

export interface StylePreset {
  [key: string]: PromptPreset
}

export interface EtaStatus {
  eta: number
  progress: number
  status: string
}