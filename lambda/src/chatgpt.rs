mod structs;

use std::env;
use structs::{ChatGPTCompletionResponse, CompletionRequest, Message};
use ureq::{post, Error};

pub fn get_chatgpt_weather_haiku(message: String) -> Result<String, Error> {
    let url = "https://api.openai.com/v1/chat/completions";
    let api_key = env::var("CHATGPT_API_KEY").unwrap_or("".to_string());

    if api_key.is_empty() {
        panic!("CHATGPT_API_KEY is not set");
    }

    let request = CompletionRequest {
        model: "gpt-3.5-turbo".to_string(),
        messages: vec![Message {
            role: "user".to_string(),
            content: format!("weather data to haiku , {}", message),
        }],
        temperature: 0.90,
    };

    let response = post(&url)
        .set("Content-Type", "application/json")
        .set("Authorization", &format!("Bearer {}", api_key).to_string())
        .send_json(ureq::json!(&request))?;

    let res: ChatGPTCompletionResponse = response.into_json()?;

    let haiku = res.choices[0].message.content.clone();

    Ok(haiku)
}
