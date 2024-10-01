# Livepeer OpenRouter Shim

A simple shim to send requests to Livepeer's LLM pipeline using OpenRouter parameters.

## Installation

```bash
npm install livepeer-openrouter-shim
```

## Sample Usage
```ts
import { sendToLivepeer, OpenRouterRequest } from 'livepeer-openrouter-shim';

const openrouterRequest: OpenRouterRequest = {
    input: "What are the benefits of using AI in healthcare?",
    max_tokens: 150,
    temperature: 0.7,
    top_p: 1.0,
    num_responses: 1,
    stop_sequences: null,
};

const apiKey = "YOUR_LIVEPEER_API_KEY"; // Replace with your actual Livepeer API key
const LivepeerProviderURL = "https://livepeer.studio/api/generate/llm";
sendToLivepeer(openrouterRequest,LivepeerProviderURL, apiKey)
    .then(response => {
        console.log("Response from Livepeer:", response);
    })
    .catch(error => {
        console.error("An error occurred:", error.message);
    });
```