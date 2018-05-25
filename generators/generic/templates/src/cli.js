#!/usr/bin/env node
// @ts-ignore
const { blue } = require('chalk')
const commander = require('commander')

let thingValue = ''

commander
  .arguments('[thing]')
  .action(thing => {
    thingValue = thing
  })
  .parse(process.argv)

console.log(`I'm feeling ${blue('great')}!`)
console.log(`Thing: ${thingValue}`)
