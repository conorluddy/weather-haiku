use serde::{Deserialize, Serialize};

// CHATGPT

#[derive(Debug, Serialize, Deserialize)]
pub struct CompletionRequest {
    pub model: String,
    pub messages: Vec<Message>,
    pub temperature: f32,
}

// Response

#[derive(Debug, Serialize, Deserialize)]
pub struct ChatGPTCompletionResponse {
    id: String,
    object: String,
    created: u64,
    model: String,
    usage: Usage,
    pub choices: Vec<Choice>,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Usage {
    prompt_tokens: u64,
    completion_tokens: u64,
    total_tokens: u64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct Choice {
    pub message: Message,
    finish_reason: String,
    index: u64,
}

// Both

#[derive(Debug, Serialize, Deserialize)]
pub struct Message {
    pub role: String,
    pub content: String,
}
