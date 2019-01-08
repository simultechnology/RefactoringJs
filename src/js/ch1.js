// import createStatementData from './createStatementData.js'
// import fs from 'fs'
// import util from 'util'

const createStatementData = require('./createStatementData.js').createStatementData

const fs = require('fs')
const util = require('util')

function statement (invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays))
}

function renderPlainText (data) {
  let result = `Statement for ${data.customer}\n`

  for (let perf of data.performances) {
    // print line for this order
    result += ` ${perf.play.name}: ${usd(perf.amount)} (${perf.audience} seats)\n`
  }
  result += `Amount owed is ${usd(data.totalAmount)}\n`
  result += `You earned ${data.totalVolumeCredits} credits\n`
  return result

  function usd (aNumber) {
    return new Intl.NumberFormat('en-US',
      { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }).format(aNumber / 100)
  }
}

const readFile = util.promisify(fs.readFile).bind(util)

let playsPromise = readFile('dist/json/plays.json')
let invoicesPromise = readFile('dist/json/invoices.json')

Promise.all([invoicesPromise, playsPromise]).then(function (values) {
  const result = statement(JSON.parse((values[0]).toString())[0], JSON.parse((values[1]).toString()))
  console.log(`result : ${result}`)
})
