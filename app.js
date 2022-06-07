require('dotenv').config();
const express = require('express');

const connection = require('./db/connection');
const scrapeExchangeRate = require('./jobs/scrapeExchangeRate');

const exchange = require('./routes/exchange');

const app = express();
app.use(express.json());

app.use('/api/v1/exchange-rate', exchange);

const port = process.env.PORT || 4000;

const crawl = async ({url}) => {
    console.log("website url", url);
    await scrapeExchangeRate(url);
    console.log('Crawl complete')
}

const start = async () => {
    try {
        await connection(process.env.MONGO_URL);
        app.listen(port, () => console.log(`Crawler Server is listening on port ${port}`));

        crawl({ url: "https://www.bog.gov.gh/treasury-and-the-markets/daily-interbank-fx-rates/"});
    } catch (error) {
        console.log(error);
    }
}

start()