const sendToLivepeerWithOpenRouterFailover = require('./dist/index.js').default;

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
const LivepeerProviderURL = "https://livepeer.studio/api/generate/llm";

sendToLivepeerWithOpenRouterFailover(openrouterRequest,LivepeerProviderURL, livepeerParams, livepeerApiKey, openRouterApiKey)
    .then(response => {
        console.log("Response from Livepeer:", response);
    })
    .catch(error => {
        console.error("An error occurred:", error.message);
    });