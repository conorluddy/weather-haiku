## weather_haiku Rust module

Needs API key for ChatGPT as an env variable called `CHATGPT_API_KEY`

See `weather.rs` and `chatgpt.rs` modules

You can run this package standalone with `cargo build`, `cargo run`. Coords are hard coded to Dublin for the purposes of getting a weather forecast.

The `lambda` directory here is for another Rust package which imports the modules from this package. It uses `cargo lambda` to create a serverless function for AWS Lambda. That function takes your coordinates as params and will use them to get a forecast and generate a haiku.
