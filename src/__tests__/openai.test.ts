import axios from "axios";
import OpenAILite, {
  CompletionParameters,
  ChatParameters,
  EmbeddingParameters,
  TranscriptionParameters,
} from "../index";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("OpenAILite", () => {
  const instance = { post: jest.fn() };
  mockedAxios.create.mockReturnValue(instance as any);

  const apiKey = "test-api-key";
  const openai = new OpenAILite(apiKey);

  it("creates a completion", async () => {
    const params: CompletionParameters = {
      model: "text-davinci-002",
      prompt: "Translate the following English text to French: {}",
      max_tokens: 60,
    };

    const response = { data: "Translated text" };
    instance.post.mockResolvedValue(response);

    const result = await openai.createCompletion(params);
    expect(result).toBe(response);
    expect(instance.post).toHaveBeenCalledWith("/completions", params);
  });

  it("creates a chat completion", async () => {
    const params: ChatParameters = {
      model: "text-davinci-002",
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        {
          role: "user",
          content: "Translate the following English text to French: {}",
        },
      ],
      max_tokens: 60,
    };

    const response = { data: "Chat completion" };
    instance.post.mockResolvedValue(response);

    const result = await openai.createChatCompletion(params);
    expect(result).toBe(response);
    expect(instance.post).toHaveBeenCalledWith("/chat/completions", params);
  });

  it("creates an embedding", async () => {
    const params: EmbeddingParameters = {
      model: "text-davinci-002",
      input: "Hello, world!",
    };

    const response = { data: "Embedding" };
    instance.post.mockResolvedValue(response);

    const result = await openai.createEmbedding(params);
    expect(result).toBe(response);
    expect(instance.post).toHaveBeenCalledWith("/embeddings", params);
  });

  it("creates a transcription", async () => {
    const params: TranscriptionParameters = {
      file: "audio.wav",
      model: "text-davinci-002",
    };

    const response = { data: "Transcription" };
    instance.post.mockResolvedValue(response);

    const result = await openai.createTranscription(params);
    expect(result).toBe(response);
    expect(instance.post).toHaveBeenCalledWith("/audio/transcriptions", params);
  });
});
