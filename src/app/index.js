import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'

module.exports = class LionByte extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the best ${chalk.red('generator-lionbyte')} generator!`
    ))

    /* Defaults */
    let name = this.appname
    let description = 'Things...'
    let version = '0.0.0'

    /* Check for existing package.json */
    if (this.fs.exists(this.destinationPath('package.json'))) {
      this.log('Looks like you already have a package.json')
      /* Read the file and adjust the defaults */
      let info = this.fs.readJSON(this.destinationPath('package.json'))
      name = info.name
      description = info.description
      version = info.version
    }

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: name
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: description
      },
      {
        type: 'input',
        name: 'version',
        message: 'Project version',
        default: version
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
        // To access props later use this.props.someAnswer;
        this.props = props

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
      })
  }
}
