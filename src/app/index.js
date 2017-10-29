import Generator from 'yeoman-generator'
import chalk from 'chalk'
import yosay from 'yosay'

module.exports = class LionByte extends Generator {
  prompting () {
    // Have Yeoman greet the user.
    this.log(yosay(
      `Welcome to the best ${chalk.red('generator-lionbyte')} generator!`
    ))

    const prompts = [
      {
        type: 'input',
        name: 'name',
        message: 'Your project name',
        default: this.appname
      },
      {
        type: 'input',
        name: 'description',
        message: 'Project description',
        default: 'Things...'
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
    /* Files */
    const filesWithParams = [
      'package.json'
    ]

    /* Writing */
    filesWithParams.map(file => {
      this.fs.copyTpl(
        this.templatePath(file),
        this.destinationPath(file),
        {
          name: this.props.name,
          description: this.props.description,
          user: {
            name: this.user.git.name(),
            email: this.user.git.email()
          },
          projectType: this.props.projectType
        }
      )
    })
  }

  install () {
    /* Install devDependencies */
    this.npmInstall([
      'gulp-babel'
    ], {
      saveDev: true
    })

    /* Install dependencies */
    this.npmInstall([
    ])
  }
}
