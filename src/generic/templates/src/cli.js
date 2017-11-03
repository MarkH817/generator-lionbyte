import chalk from 'chalk'
import commander from 'commander'

let thingValue = ''

commander
  .arguments('[thing]')
  .action((thing) => {
    thingValue = thing
  })

console.log(`I'm feeling ${chalk.blue('great')}!`)
console.log(`Thing: ${thingValue}`)
