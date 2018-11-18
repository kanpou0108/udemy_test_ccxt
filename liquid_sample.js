'use strict';
const ccxt = require ('ccxt');

(async function () {
    const config = require('./config')
    let liquid = new ccxt.liquid (config)
    console.log (liquid.id, await liquid.fetchTicker ('BTC/JPY'))
}) ();
