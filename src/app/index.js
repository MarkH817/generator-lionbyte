import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'

module.exports = class LionByte extends Generator {
  _defaults () {
    let defaults = {
      name: this.appname,
      description: 'Things...',
      version: '0.0.0'
    }

    return defaults
  }

  _compose (props) {
    this.config.set('name', props.name)
    this.config.set('description', props.description)
    this.config.set('version', props.version)
    this.config.set('projectType', props.projectType)

    this.composeWith(require.resolve('../common'), {
      arguments: [props.name, props.description]
    })

    /* Run the appropriate subgenerator */
    switch (props.projectType) {
      case 'static-site':
        this.composeWith(require.resolve('../static-site'))
        break
      default:
        this.composeWith(require.resolve('../generic'))
    }

    /* Run package subgenerator */
    /* Must be done at end */
    this.composeWith(require.resolve('../package'))
  }

  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the best ${chalk.red('generator-lionbyte')} generator!`
    ))

    /* Defaults */
    let defaults = this._defaults()

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: defaults.name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: defaults.description
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: defaults.version
      },
      {
        type: 'list',
        name: 'projectType',
        message: 'What type of NodeJS project are you doing?',
        choices: [
          'generic',
          'static-site'
        ],
        default: 'generic'
      }
    ]

    return this.prompt(prompts)
      .then(props => {
        this._compose(props)
      })
  }
}
