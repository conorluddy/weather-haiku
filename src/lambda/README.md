## weather_haiku_lambda Rust module

This is a Rust package which imports the modules from the parent package.

It uses `cargo lambda` to create a serverless function for AWS Lambda.

That function takes your coordinates as params and will use them to get a forecast and generate a haiku.

Build
`cargo lambda build --output-format zip`

Watch - build locally and listen for requests

`cargo lambda watch`

Invoke: While watching you can invoke

`cargo lambda invoke weather_haiku_lambda --data-ascii '{ "latitude": "53.34", "longitude": "-6.26" }' `

Invoke remote: If you've deployed it to AWS you can invoke the deployed version

`cargo lambda invoke weather_haiku_lambda --data-ascii '{ "latitude": "53.34", "longitude": "-6.26" }' --remote`

Deployment

`cargo lambda deploy --iam-role arn:aws:iam::XXXXXXXXXXXX:role/lambda-manager-name`
