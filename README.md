# generator-lionbyte

[![NPM version][npm-image]][npm-url]
[![Dependency Status][daviddm-image]][daviddm-url]
[![Build Status](https://travis-ci.org/MarkH817/generator-lionbyte.svg?branch=master)](https://travis-ci.org/MarkH817/generator-lionbyte)
[![Coverage Status](https://coveralls.io/repos/github/MarkH817/generator-lionbyte/badge.svg?branch=master)](https://coveralls.io/github/MarkH817/generator-lionbyte?branch=master)

> Generate a NodeJS project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-lionbyte using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo generator-lionbyte
```

## Usage

```bash
mkdir my-new-project
cd my-new-project
yo lionbyte
```

## Features

This generator scaffolds the following NodeJS project types:

* Generic/CLI NodeJS programs
* Server
* Static site

### Details

* All Types
  * `prettier` and `standard` code style and linter
    * Optional pre-commit hook to run these linters
  * `mocha` and `chai` for test framework
  * `nyc` for code coverage
  * Travis-CI script to run tests
  * Includes .editorconfig, .gitignore, .gitattributes
  * Document files
    * Issue and Pull Request templates
    * CHANGELOG, CODE_OF_CONDUCT, CONTRIBUTING files
    * MIT License
* Generic (Default)
  * Basic Node.js project type
  * Includes option to make a CLI portion
* Server
  * ExpressJS server
* Static Site
  * webpack@4 setup
    * Development/Production configurations for webpack
    * webpack-dev-server
  * Styles
    * Autoprefixer
    * CSSNano - Minification
    * LESS CSS Preprocessor
  * Option to include React

## Getting To Know Yeoman

* Yeoman has a heart of gold.
* Yeoman is a person with feelings and opinions, but is very easy to work with.
* Yeoman can be too opinionated at times but is easily convinced not to be.
* Feel free to [learn more about Yeoman](http://yeoman.io/).

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)

## License

MIT © [Mark Hernandez](https://www.github.com/MarkH817)

[npm-image]: https://badge.fury.io/js/generator-lionbyte.svg
[npm-url]: https://npmjs.org/package/generator-lionbyte
[daviddm-image]: https://david-dm.org/MarkH817/generator-lionbyte.svg?theme=shields.io
[daviddm-url]: https://david-dm.org/MarkH817/generator-lionbyte
