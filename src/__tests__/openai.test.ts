import OpenAILite from "../index";
import axios from "axios";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("OpenAILite", () => {
  let openaiLite: OpenAILite;

  beforeEach(() => {
    openaiLite = new OpenAILite("test-api-key");
    mockedAxios.post.mockResolvedValue({
      data: { choices: [{ text: "translated text" }] },
    });
  });

  it("should make a completion request", async () => {
    const response = await openaiLite.createCompletion({
      model: "text-davinci-002",
      prompt: "Translate the following English text to French: '{}'",
      max_tokens: 60,
    });

    expect(response).toBe("translated text");
    expect(mockedAxios.post).toHaveBeenCalledWith(
      "https://api.openai.com/v1/engines/text-davinci-002/completions",
      {
        engine: "text-davinci-002",
        prompt: "Translate the following English text to French: '{}'",
        max_tokens: 60,
      },
      { headers: { Authorization: `Bearer test-api-key` } }
    );
  });
});
