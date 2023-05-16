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
  apiKey: string;
  baseURL: string = "https://api.openai.com/v1";

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  private async request(endpoint: string, params: any) {
    const response = await fetch(this.baseURL + endpoint, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  }

  public complete(params: CompletionParameters) {
    return this.request("/completions", params);
  }

  public chat(params: ChatParameters) {
    return this.request("/chat/completions", params);
  }

  public embed(params: EmbeddingParameters) {
    return this.request("/embeddings", params);
  }

  public transcribe(params: TranscriptionParameters) {
    return this.request("/audio/transcriptions", params);
  }
}

export default OpenAILite;
