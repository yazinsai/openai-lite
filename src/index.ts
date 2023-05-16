import axios, { AxiosInstance } from "axios";

export interface CompletionParameters {
  model: string;
  prompt?: string | Array<string>;
  suffix?: string;
  max_tokens?: number;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  logprobs?: number;
  echo?: boolean;
  stop?: string | Array<string>;
  presence_penalty?: number;
  frequency_penalty?: number;
  best_of?: number;
  logit_bias?: Map<number, number>;
  user?: string;
}

export interface ChatParameters {
  model: string;
  messages: Array<{ role: string; content: string }>;
  temperature?: number;
  top_p?: number;
  n?: number;
  stream?: boolean;
  stop?: string | Array<string>;
  max_tokens?: number;
  presence_penalty?: number;
  frequency_penalty?: number;
  logit_bias?: Map<number, number>;
  user?: string;
}

export interface EmbeddingParameters {
  model: string;
  input: string | Array<string>;
  user?: string;
}

export interface TranscriptionParameters {
  file: string;
  model: string;
  prompt?: string;
  response_format?: string;
}

export class OpenAILite {
  client: AxiosInstance;
  apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
    this.client = axios.create({
      baseURL: "https://api.openai.com/v1",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
    });
  }

  public async createCompletion(params: CompletionParameters) {
    return this.client.post("/completions", params);
  }

  public async createChatCompletion(params: ChatParameters) {
    return this.client.post("/chat/completions", params);
  }

  public async createEmbedding(params: EmbeddingParameters) {
    return this.client.post("/embeddings", params);
  }

  public async createTranscription(params: TranscriptionParameters) {
    return this.client.post("/audio/transcriptions", params);
  }
}

export default OpenAILite;
