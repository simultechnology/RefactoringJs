
// import fs from 'fs'
// import util from 'util'

const fs = require('fs')
const util = require('util')

console.log('start!')

let amountFor = function (play, perf) {
  let thisAmount = 0
  switch (play.type) {
    case 'tragedy':
      thisAmount = 40000
      if (perf.audience > 30) {
        thisAmount += 1000 * (perf.audience - 30)
      }
      break
    case 'comedy':
      thisAmount = 30000
      if (perf.audience > 20) {
        thisAmount += 10000 + 500 * (perf.audience - 20)
      }
      thisAmount += 300 * perf.audience
      break
    default:
      throw new Error(`unknown type: ${play.type}`)
  }
  return thisAmount
}

function statement (invoice, plays) {
  let totalAmount = 0
  let volumeCredits = 0
  let result = `Statement for ${invoice.customer}\n`
  const format = new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format

  for (let perf of invoice.performances) {
    const play = plays[perf.playID]
    let thisAmount = amountFor(play, perf)
    // add volume credits
    volumeCredits += Math.max(perf.audience - 30, 0)
    // add extra credit for every ten comedy attendees
    if (play.type === 'comedy') volumeCredits += Math.floor(perf.audience / 5)
    // print line for this order
    result += ` ${play.name}: ${format(thisAmount / 100)} (${perf.audience} seats)\n`
    totalAmount += thisAmount
  }
  result += `Amount owed is ${format(totalAmount / 100)}\n`
  result += `You earned ${volumeCredits} credits\n`
  return result
}

const readFile = util.promisify(fs.readFile).bind(util)

let playsPromise = readFile('dist/json/plays.json')
let invoicesPromise = readFile('dist/json/invoices.json')

Promise.all([invoicesPromise, playsPromise]).then(function (values) {
  const result = statement(JSON.parse((values[0]).toString())[0], JSON.parse((values[1]).toString()))
  console.log(`result : ${result}`)
})
