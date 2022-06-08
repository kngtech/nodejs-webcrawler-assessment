# Web crawler Assessment

In this assessment, you will create a web crawler to collect the day's interbank FX rates. You will then create an endpoint that will convert an amount from any of the collected currency to Ghana cedis(GHS) using the day's exchange rate

## Set up

- Clone the assessment repo
- Create a new branch from the master branch and prefix the branch name with your initials
- Create a .env file from the .env.example file and update the config values and other configurations you may deem necessary
- Install the dependencies and any other dependencies you will need to complete the task

## Task

- Implement the web crawler in the `crawl()` method in `app.js`
- Implement the exchange rate converter in the `exchangeRate()` method in `controllers/exchange.js`

## Submission

- Create and submit a PR for your solution

## Instructions to use exchange rate converter API
GET ```api/v1/exchange-rate```

Query params: 
- ```from```
- ```amount```

Send a GET request to the endpoint ```api/v1/exchange-rate```. Pass the currency in the query param ```from``` and the amount in the query param ```amount```

Eg. ```api/v1/exchange-rate?from=usd&amount=123```

Happy Coding :D

![Code](https://media.tenor.com/images/8460465dd4597849c320adfe461e91e3/tenor.gif)
