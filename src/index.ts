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

interface LivepeerParams {
    stream: Boolean;
    history: string[] | [];

}

const defaultLivepeerParams ={
    stream: false,
    history: [],
    system_msg: null
}

const openRouterReq = async (openRouterRequest: OpenRouterRequest, openRouterApiKey: string, model: string = "meta-llama/Meta-Llama-3.1-8B-Instruct"):Promise<any> =>{
    const res = await axios.post("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${openRouterApiKey}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": model,
            ...openRouterRequest
        })
        });
    return res
}

const openrouterToLivepeer = (request: OpenRouterRequest, livepeerParams: LivepeerParams): FormData => {
    const form = new FormData();

    const body:any = {
            model_id: "meta-llama/Meta-Llama-3.1-8B-Instruct",
            prompt: request.input,
            max_tokens: request.max_tokens || 100,
            temperature: request.temperature || 0.7,
            // topP: request.top_p || 1.0,
            // n: request.num_responses || 1,
            // stop: request.stop_sequences || null,
            ...livepeerParams
    }

    for (var key in body) {
        form.append(key, body[key]);
    }
    return form
};


const sendToLivepeerWithOpenRouterFailover = async (request: OpenRouterRequest, LivepeerProviderURL:string, livepeerParams:LivepeerParams = defaultLivepeerParams, livepeerApiKey: string, openRouterApiKey: string) => {
    const livepeerRequest = openrouterToLivepeer(request, livepeerParams);
    
    try {
        const res = await axios.post(LivepeerProviderURL, livepeerRequest, {
            headers: {
                Authorization: `Bearer ${livepeerApiKey}`,
                'Content-Type': 'multipart/form-data',
            },
        });
        return res.data;
    } catch (error) {
        if (axios.isAxiosError(error) && error.response?.status === 500) {
            try{
                const openRouterRes = await openRouterReq(request, openRouterApiKey)
                return openRouterRes.data
            } catch(error:any){
                throw new Error(`Error: ${error.response?.status}, ${error.response?.data}`);
            }
        }else{
            throw new Error(`An unexpected error occurred: ${error}`);
        }
    }
};

export default sendToLivepeerWithOpenRouterFailover;