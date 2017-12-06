/** @module */
import Generator from 'yeoman-generator'
import {copy, copyTpl} from '../utils'

module.exports = class StaticSite extends Generator {
  prompting () {
    const prompts = [
      {
        type: 'confirm',
        name: 'react',
        message: 'Include React?',
        default: false
      }
    ]

    return this.prompt(prompts)
      .then(props => (this.props = props))
  }

  writing () {
    const {staticFiles, tplFiles} = getFiles(this.props)
    const data = {
      react: this.props.react
    }

    /* Writing */
    staticFiles.map(file => copy(this, file))
    tplFiles.map(file => copyTpl(this, data, file))
  }

  install () {
    const {devDependencies, dependencies} = getAllDependencies(this.props)

    /* Install devDependencies */
    this.npmInstall(devDependencies, {
      saveDev: true
    })

    /* Install dependencies */
    this.npmInstall(dependencies)
  }
}

/* Helper Functions */
function getFiles (props) {
  const staticFiles = getStaticFiles(props)
  const tplFiles = getTplFiles(props)

  return {staticFiles, tplFiles}
}

function getStaticFiles (props) {
  let files = [
    'pages/components/header.ejs',
    'pages/components/metas.ejs',
    'pages/components/stylesheets.ejs',
    'pages/views/index.ejs',
    'styles/main.less',
    'tasks/build.js',
    'tasks/js.js',
    'tasks/pages.js',
    'tasks/styles.js',
    'tasks/watch.js',
    'gulpfile.babel.js',
    'webpack.dev.js',
    'webpack.prod.js'
  ]

  if (props.react) {
    files = [...files, 'src/App.js']
  }

  return files
}

function getTplFiles (props) {
  return [
    '.babelrc',
    'src/index.js',
    'webpack.common.js'
  ]
}

function getAllDependencies (props) {
  const devDependencies = getDevDeps(props)
  const dependencies = getDependencies(props)

  return {devDependencies, dependencies}
}

function getDevDeps (props) {
  let list = [
    'autoprefixer',
    'browser-sync',
    'babel-loader',
    'cssnano',
    'gulp-ejs',
    'gulp-htmlmin',
    'gulp-less',
    'gulp-postcss',
    'webpack',
    'webpack-merge',
    'webpack-stream'
  ]

  if (props.react) {
    list = [
      ...list,
      'babel-preset-react'
    ]
  }

  return list
}

function getDependencies (props) {
  let list = ['mini.css']

  if (props.react) {
    list = [
      ...list,
      'mini.css-react',
      'react',
      'react-dom'
    ]
  }

  return list
}
