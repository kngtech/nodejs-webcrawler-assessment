const ExchangeRate = require('../models/ExchangeRate');

const exchangeRate = async (req, res) => {
    try {
        const { from, amount } = req.query;
        if (!amount || !(parseFloat(amount) > 0)) {
            return res.status(400).json({ msg: 'Missing/Invalid amount query param. "amount" must be a number greater than zero (0)' })
        }
        if (!from) {
            return res.status(400).json({ msg: 'Missing "from" query param. "from" refers to the currency code of the amount specified' })
        }

        const exchange_rate = await ExchangeRate.findOne({ currencyPair: `${from.toUpperCase()}GHS` })
        if (!exchange_rate) {
            return res.status(404).json({ msg: `Currency code ${from} not found` })
        }

        // Convert to cedis
        const convertedAmount = {
            selling: exchange_rate.selling * amount,
            buying: exchange_rate.buying * amount,
        }
        res.status(200).json({
            result: {
                from: from.toUpperCase(),
                amount: parseFloat(amount),
                convertedAmount
            }
        })
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    exchangeRate
}