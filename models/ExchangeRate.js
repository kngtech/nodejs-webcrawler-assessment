const mongoose = require('mongoose')

const ExchangeRateSchema = new mongoose.Schema(
    {
        date: String,
        currency: String,
        currencyPair: { unique: true, type: String },
        buying: Number,
        selling: Number,
        midRate: Number
    }
)

module.exports = mongoose.model('ExchangeRate', ExchangeRateSchema);