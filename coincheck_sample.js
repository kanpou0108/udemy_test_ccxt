'use strict';
const ccxt = require ('ccxt');

(async function () {
    const config = require('./config')
    let coincheck = new ccxt.coincheck (config)
    console.log (coincheck.id, await coincheck.fetchTicker ('BTC/JPY'))
}) ();
