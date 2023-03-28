mod structs;

use std::env;
use structs::{ChatGPTCompletionResponse, CompletionRequest, Message};

pub async fn get_chatgpt_weather_haiku(message: String) -> Result<String, reqwest::Error> {
    let url = "https://api.openai.com/v1/chat/completions";
    let client = reqwest::Client::new();
    let api_key = env::var("CHATGPT_API_KEY").unwrap_or("".to_string());

    if api_key.is_empty() {
        panic!("CHATGPT_API_KEY is not set");
    }

    let request = CompletionRequest {
        model: "gpt-3.5-turbo".to_string(),
        messages: vec![Message {
            role: "user".to_string(),
            content: format!("haiku from weather forecast: {}", message),
        }],
        temperature: 0.25,
    };

    let response = client
        .post(url)
        .header("Content-Type", "application/json")
        .header("Authorization", format!("Bearer {}", api_key).to_string())
        .json(&request)
        .send()
        .await?;

    let res = response.json::<ChatGPTCompletionResponse>().await?;

    let haiku = res.choices[0].message.content.clone();

    Ok(haiku)
}
