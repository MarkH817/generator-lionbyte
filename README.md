# generator-lionbyte
[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/MarkH817/generator-lionbyte.svg?branch=master)](https://travis-ci.org/MarkH817/generator-lionbyte)
[![Dependency Status][daviddm-image]][daviddm-url]
[![Coverage Status](https://coveralls.io/repos/github/MarkH817/generator-lionbyte/badge.svg?branch=master)](https://coveralls.io/github/MarkH817/generator-lionbyte?branch=master)
[![BCH compliance](https://bettercodehub.com/edge/badge/MarkH817/generator-lionbyte?branch=master)](https://bettercodehub.com/)
> Generate a NodeJS project

## Installation

First, install [Yeoman](http://yeoman.io) and generator-lionbyte using [npm](https://www.npmjs.com/) (we assume you have pre-installed [node.js](https://nodejs.org/)).

```bash
npm install -g yo
npm install -g generator-lionbyte
```

Then generate your new project:

```bash
yo lionbyte
```

## Features
This generator scaffolds the following NodeJS project types:
- Generic/CLI NodeJS programs
- Server
- Static site

### Details
- All Types
  - Use `standard` code style and linter
  - Use `mocha` and `chai` for test framework
  - Use `istanbul`/`nyc` for code coverage
  - Includes Travis-CI script to run tests
  - Includes .editorconfig, .gitignore, .gitattributes
  - CHANGELOG, CODE_OF_CONDUCT, CONTRIBUTING files
  - MIT License
  - Issue and Pull Request templates
- Generic (Default)
  - Basic NodeJS project type
  - Includes option to make a CLI portion
- Server
  - ExpressJS server
  - Verbose logging
- Static Site
  - webpack@4 Legato!!!!
    - Development/Production configurations for webpack
    - webpack-dev-server
    - really fast builds
  - Pages
    - EJS - HTML Templating
  - Styles
    - Autoprefixer
    - CSSNano - Minification
    - LESS CSS Preprocessor 
    - mini.css CSS Framework
  - Option to include React

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
