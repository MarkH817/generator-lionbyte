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

        this.composeWith(require.resolve('../common'), {
          arguments: [this.props.name, this.props.description]
        })

        /* Run the appropriate subgenerator */
        switch (this.props.projectType) {
          case 'static-site':
            this.composeWith(require.resolve('../static-site'))
            break
          default:
            this.composeWith(require.resolve('../generic'))
        }
      })
  }

  writing () {
    /* Default package.json */
    let info = {
      name: this.props.name,
      description: this.props.description,
      version: this.props.version,
      author: {
        name: this.user.git.name(),
        email: this.user.git.email()
      },
      license: 'MIT',
      main: 'src/index.js',
      scripts: {
        'build': 'gulp build',
        'dev': 'gulp',
        'lint': 'standard',
        'lint:fix': 'standard --fix',
        'report': 'nyc report --reporter=lcov',
        'test': 'standard && nyc mocha --require babel-register'
      },
      standard: {
        globals: [
          'after',
          'afterEach',
          'before',
          'beforeEach',
          'describe',
          'it'
        ]
      }
    }

    /* Project types
    *  Additional info for each type
    */
    switch (this.props.projectType) {
      case 'static-site':
        let updatedScripts = Object.assign(info.scripts, {
          'build:prod': 'gulp build:prod',
          'test:ui': 'babel-node test/ui'
        })
        let updatedGlobals = [
          ...info.standard.globals,
          'fixture',
          'test'
        ]
        let updatedStandard = Object.assign(info.standard, {
          globals: updatedGlobals
        })
        info = Object.assign(info, {
          scripts: updatedScripts,
          standard: updatedStandard
        })
        break
      default:
    }

    /* Check if package already exists */
    /* If so, update file info instead */
    if (this.fs.exists(this.destinationPath('package.json'))) {
      let prev = this.fs.readJSON(this.destinationPath('package.json'))
      info = Object.assign(prev, info)
    }

    /* Writing */
    this.fs.writeJSON(
      this.destinationPath('package.json'),
      info
    )
  }
}
