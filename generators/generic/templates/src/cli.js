#!/usr/bin/env node
const chalk = require('chalk')
const commander = require('commander')

let thingValue = ''

commander
  .arguments('[thing]')
  .action(thing => {
    thingValue = thing
  })
  .parse(process.argv)

console.log(`I'm feeling ${chalk.blue('great')}!`)
console.log(`Thing: ${thingValue}`)
