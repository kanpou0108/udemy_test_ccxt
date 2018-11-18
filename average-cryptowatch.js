const request = require('request')
const gauss = require('gauss');
// https://cryptowatch.jp/docs/api#market-ohlc
const ohlc1day = 86400
const targetPeriod = 10

const asyncFunc = () => {
  return new Promise((resolve) => {
    request(`https://api.cryptowat.ch/markets/bitflyer/btcjpy/ohlc?periods=${ohlc1day}`, (err, response, body) => {
      resolve(JSON.parse(body))
    })
  })
}

async function main () {
  const json = await asyncFunc()
  const list = json.result[String(ohlc1day)]
  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice#Parameters
  // list = list.splice(list.length - 25, list.length)
  // list = list.splice(list.length - targetPeriod)
  const closePriceList = list.slice(list.length - targetPeriod).map(entry => entry[4])
  console.log('output', closePriceList)

  // https://github.com/fredrick/gauss#instantiation
  // https://github.com/fredrick/gauss#vectorsma
  const prices = new gauss.Vector(closePriceList)
  const vectorSma = prices.sma(closePriceList.length)
  console.log(vectorSma);
}

main()
