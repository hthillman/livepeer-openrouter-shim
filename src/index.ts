import axios from 'axios';

// Configuration for Livepeer API
const LIVEPEER_API_URL = "https://livepeer.studio/api/generate/llm"; // Update with actual endpoint if different

export interface OpenRouterRequest {
    input: string;
    max_tokens?: number;
    temperature?: number;
    top_p?: number;
    num_responses?: number;
    stop_sequences?: string[];
}


interface LivepeerRequest {
    model_id: string;
    prompt: string;
    maxTokens: number;
    temperature: number;
    stream: Boolean;
    history: string[] | []; 
}
interface LivepeerParams {
    stream: Boolean;
    history: string[] | [];

}

const defaultLivepeerParams ={
    stream: false,
    history: [],
    system_msg: null
}

const openrouterToLivepeer = (request: OpenRouterRequest, livepeerParams: LivepeerParams): LivepeerRequest => {
    return {
            model_id: "meta-llama/Meta-Llama-3.1-8B-Instruct",
            prompt: request.input,
            maxTokens: request.max_tokens || 100,
            temperature: request.temperature || 0.7,
            // topP: request.top_p || 1.0,
            // n: request.num_responses || 1,
            // stop: request.stop_sequences || null,
            ...livepeerParams
    }
};


export const sendToLivepeer = async (request: OpenRouterRequest, LivepeerProviderURL:string, livepeerParams:LivepeerParams = defaultLivepeerParams, apiKey: string) => {
    const livepeerRequest = openrouterToLivepeer(request, livepeerParams);
    
    try {
        const response = await axios.post(LivepeerProviderURL, livepeerRequest, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(`Error: ${error.response?.status}, ${error.response?.data}`);
        }
        throw new Error(`An unexpected error occurred: ${error}`);
    }
};