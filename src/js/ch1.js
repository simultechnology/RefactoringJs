
// import fs from 'fs'
// import util from 'util'

const fs = require('fs')
const util = require('util')

console.log('start!')

let plays, invoice

function totalAmount () {
  let result = 0
  for (let perf of invoice.performances) {
    result += amountFor(perf)
  }
  return result
}

function totalVolumeCredits () {
  let result = 0
  for (let perf of invoice.performances) {
    result += volumeCreditsFor(perf)
  }
  return result
}

function usd (aNumber) {
  return new Intl.NumberFormat('en-US',
    { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(aNumber / 100)
}

function volumeCreditsFor (aPerformance) {
  let result = 0
  result += Math.max(aPerformance.audience - 30, 0)
  if (playFor(aPerformance).type === 'comedy') {
    result += Math.floor(aPerformance.audience / 5)
  }
  return result
}

function playFor (aPerformance) {
  return plays[aPerformance.playID]
}

function amountFor (aPerformance) {
  let result = 0
  switch (playFor(aPerformance).type) {
    case 'tragedy':
      result = 40000
      if (aPerformance.audience > 30) {
        result += 1000 * (aPerformance.audience - 30)
      }
      break
    case 'comedy':
      result = 30000
      if (aPerformance.audience > 20) {
        result += 10000 + 500 * (aPerformance.audience - 20)
      }
      result += 300 * aPerformance.audience
      break
    default:
      throw new Error(`unknown type: ${playFor(aPerformance).type}`)
  }
  return result
}

function statement (invoiceJson, playsJson) {
  invoice = invoiceJson
  plays = playsJson
  let result = `Statement for ${invoice.customer}\n`

  for (let perf of invoice.performances) {
    // print line for this order
    result += ` ${playFor(perf).name}: ${usd(amountFor(perf))} (${perf.audience} seats)\n`
  }
  result += `Amount owed is ${usd(totalAmount())}\n`
  result += `You earned ${totalVolumeCredits()} credits\n`
  return result
}

const readFile = util.promisify(fs.readFile).bind(util)

let playsPromise = readFile('dist/json/plays.json')
let invoicesPromise = readFile('dist/json/invoices.json')

Promise.all([invoicesPromise, playsPromise]).then(function (values) {
  const result = statement(JSON.parse((values[0]).toString())[0], JSON.parse((values[1]).toString()))
  console.log(`result : ${result}`)
})
