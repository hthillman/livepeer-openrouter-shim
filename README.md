# Livepeer OpenRouter Shim

A simple shim to send requests to Livepeer's LLM pipeline using OpenRouter parameters.

## Installation

```bash
npm install livepeer-openrouter-shim
```

## Sample Usage
```ts
const sendToLivepeerWithOpenRouterFailover = require('livepeer-openrouter-shim').default;

const openrouterRequest = {
    input: "What is the capital of the United States?",
    max_tokens: 150,
    temperature: 0.7,
    top_p: 1.0,
    num_responses: 1,
};
const livepeerParams = {
    stream: false,
    history: []
}

const openRouterApiKey = ""

const livepeerApiKey = ""; // Replace with your actual Livepeer API key
const livepeerProviderURL = "https://livepeer.studio/api/generate/llm";

sendToLivepeerWithOpenRouterFailover(openrouterRequest,livepeerProviderURL, livepeerParams, livepeerApiKey, openRouterApiKey)
    .then(response => {
        console.log("Response from Livepeer:", response);
    })
    .catch(error => {
        console.error("An error occurred:", error.message);
    });
```