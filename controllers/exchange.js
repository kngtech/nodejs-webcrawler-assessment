const ExchangeRate = require('../models/ExchangeRate');

const exchangeRate = async(req, res) => {
    try {
        const exchange_rate = await ExchangeRate.find({})
        res.status(200).json({exchange_rate})
    } catch (error) {
        res.status(500).json({ msg: error })
    }
}

module.exports = {
    exchangeRate
}