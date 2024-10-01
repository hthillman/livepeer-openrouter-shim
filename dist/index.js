"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToLivepeer = void 0;
const axios_1 = __importDefault(require("axios"));
// Configuration for Livepeer API
const LIVEPEER_API_URL = "https://livepeer.studio/api/generate/llm"; // Update with actual endpoint if different
const openrouterToLivepeer = (request) => {
    return {
        prompt: request.input,
        maxTokens: request.max_tokens || 100,
        temperature: request.temperature || 0.7,
        topP: request.top_p || 1.0,
        n: request.num_responses || 1,
        stop: request.stop_sequences || null,
    };
};
const sendToLivepeer = (request, LivepeerProviderURL, apiKey) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const livepeerRequest = openrouterToLivepeer(request);
    try {
        const response = yield axios_1.default.post(LivepeerProviderURL, livepeerRequest, {
            headers: {
                Authorization: `Bearer ${apiKey}`,
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    }
    catch (error) {
        if (axios_1.default.isAxiosError(error)) {
            throw new Error(`Error: ${(_a = error.response) === null || _a === void 0 ? void 0 : _a.status}, ${(_b = error.response) === null || _b === void 0 ? void 0 : _b.data}`);
        }
        throw new Error(`An unexpected error occurred: ${error}`);
    }
});
exports.sendToLivepeer = sendToLivepeer;
