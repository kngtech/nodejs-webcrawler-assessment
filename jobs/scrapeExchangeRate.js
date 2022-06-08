const axios = require('axios');
const https = require('https');
const jsdom = require("jsdom");
const ExchangeRate = require('../models/ExchangeRate');
const { JSDOM } = jsdom;

const scrapeExchangeRate = async (url) => {
    const exchangeRates = await downloadExchangeRate(url);
    if (exchangeRates) {
        // Save to db
        await saveExchangeRates(exchangeRates)
    }
}

const downloadExchangeRate = async (url) => {
    try {
        const agent = new https.Agent({
            rejectUnauthorized: false // Ignore SSL issues
        });
        const { data } = await axios.get(url, { httpsAgent: agent });
        const dom = new JSDOM(data);
        const exchangeRateTableEl = dom.window.document.getElementById('table_3').querySelector('tbody');
        const dataRows = exchangeRateTableEl.querySelectorAll('tr');
        const exchangeRates = [];
        for (const dataRow of dataRows) {
            let dataTd = dataRow.querySelectorAll('td');
            let exRate = {
                date: dataTd[0].textContent,
                currency: dataTd[1].textContent,
                currencyPair: dataTd[2].textContent,
                buying: dataTd[3].textContent,
                selling: dataTd[4].textContent,
                midRate: dataTd[5].textContent
            }
            exchangeRates.push(exRate);
        }
        return exchangeRates;
    } catch (error) {
        console.log(error)
        return false;
    }
}

const saveExchangeRates = (exchangeRates) => {
    const bulkOps = exchangeRates.map(exRate => ({
        updateOne: {
            filter: { currencyPair: exRate.currencyPair },
            update: { $set: { ...exRate } },
            upsert: true
         }
     }));
     return ExchangeRate.bulkWrite(bulkOps);
}

module.exports = scrapeExchangeRate;