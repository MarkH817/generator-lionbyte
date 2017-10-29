import Generator from 'yeoman-generator'
import chalk from 'chalk'
// import yosay from 'yosay'

module.exports = class extends Generator {
  prompting () {
    this.log(`Static site ${chalk.cyan('prompting')}`)
  }

  writing () {
    this.log(`Static site ${chalk.cyan('writing')}`)
  }
}
