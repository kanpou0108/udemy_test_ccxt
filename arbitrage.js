'use strict';
const ccxt = require ('ccxt');
// const config = require('./config')

const bitflyer = new ccxt.bitflyer ()
const liquid = new ccxt.liquid ()
const interval = 1000

const sleep = (timer) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve()
    }, timer)
  })
}

(async function () {

  while (true) {
    const results = await Promise.all([
      bitflyer.fetchTicker ('BTC/JPY'),
      liquid.fetchTicker ('BTC/JPY'),
    ])

    const bitflyerTicker = results[0]
    console.log('bitflyer', bitflyerTicker.ask, bitflyerTicker.bid);
    const liquidTicker = results[1]
    console.log('liquid', liquidTicker.ask, liquidTicker.bid);

    let askInfo = {
      type: '',
      price: 0,
    }
    let bidInfo = {
      type: '',
      price: 0,
    }

    if (bitflyerTicker.ask < liquidTicker.ask) {
      // bitflyer買う
      askInfo = {
        type: 'bitflyer',
        price: bitflyerTicker.ask,
      }
    } else {
      askInfo = {
        type: 'liquid',
        price: Math.round(liquidTicker.ask),
      }
    }

    if (bitflyerTicker.bid > liquidTicker.bid) {
      // bitflyer買う
      bidInfo = {
        type: 'bitflyer',
        price: bitflyerTicker.bid,
      }
    } else {
      bidInfo = {
        type: 'liquid',
        price: Math.round(liquidTicker.bid),
      }
    }

    console.log(`${askInfo.type}で${askInfo.price}で買う、${bidInfo.type}で${bidInfo.price}で売ると、${bidInfo.price - askInfo.price}が利益`);

    await sleep(interval)
  }

}) ();
