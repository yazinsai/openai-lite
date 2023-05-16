# OpenAI-Lite

OpenAI-Lite is a lightweight, Typescript-based npm package that provides a thin wrapper to interact with the OpenAI API. It includes type support for the completions, transcription, chat, and embedding endpoints. This makes it easier and more efficient for developers to leverage the power of OpenAI's language models, without needing to manually handle the low-level details of API calls.

## Features

- OpenAI Completions: Generate responses based on given prompts.
- OpenAI Chat: Generate a model response for a given chat conversation.
- OpenAI Embeddings: Get a vector representation of a given input.
- OpenAI Transcriptions: Transcribe audio into the input language.

## Installation

Install `openai-lite` using npm:

```sh
npm install openai-lite
```

## Usage

Before using the package, you need to provide your OpenAI API key:

```typescript
import { OpenAILite } from "openai-lite";

const openai = new OpenAILite("YOUR_OPENAI_API_KEY");
```

### Completions

```typescript
const prompt =
  'Translate the following English text to French: "{text: "Hello, world!"}"';

openai
  .createCompletion({
    model: "text-davinci-003",
    prompt,
    maxTokens: 60,
  })
  .then((response) => {
    console.log(response.choices[0].text.trim());
  })
  .catch((error) => {
    console.error(error);
  });
```

### Chat

```typescript
const messages = [
  { role: "system", content: "You are a helpful assistant." },
  { role: "user", content: "Who won the world series in 2020?" },
];

openai
  .createChatCompletion({
    model: "gpt-3.5-turbo",
    messages,
  })
  .then((response) => {
    console.log(response.choices[0].message.content.trim());
  })
  .catch((error) => {
    console.error(error);
  });
```

### Embeddings

```typescript
openai
  .createEmbedding({
    model: "text-embedding-ada-002",
    input: "The quick brown fox jumps over the lazy dog.",
  })
  .then((response) => {
    console.log(response.data[0].embedding);
  })
  .catch((error) => {
    console.error(error);
  });
```

### Transcriptions

```typescript
openai
  .createTranscription({
    model: "whisper-1",
    file: "path_to_your_audio_file.mp3",
  })
  .then((response) => {
    console.log(response.transcriptions);
  })
  .catch((error) => {
    console.error(error);
  });
```

## Contributing

Contributions are welcome! Please read our [contributing guidelines](CONTRIBUTING.md) to get started.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
