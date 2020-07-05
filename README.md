# generator-lionbyte

[![NPM version][npm-image]][npm-url]
[![Build Status](https://travis-ci.org/MarkH817/generator-lionbyte.svg?branch=main)](https://travis-ci.org/MarkH817/generator-lionbyte)

> Generate a JavaScript project

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

This generator scaffolds the following JavaScript project types:

- Node (default)
- Frontend

In addition, the following utility packages are added for all project types:

- `typescript` type checking with `*.js` files
- `jest` for testing and code coverage
- `prettier` and `standard` code style and linter
- Travis-CI script to run the tests
- Optional pre-commit hook to run these linters via `husky` and `lint-staged`

### Project Type: Node (Default)

- Meant to serve as a base for any Node.js projects

### Project Type: Frontend

- `webpack` configurations for development and production
- Styles
  - Autoprefixer
  - CSSNano - Minification
  - LESS CSS Preprocessor
- Option to include React

## Contributing

See [CONTRIBUTING](./CONTRIBUTING.md)

## License

MIT © [Mark Hernandez](https://www.github.com/MarkH817)

[npm-image]: https://badge.fury.io/js/generator-lionbyte.svg
[npm-url]: https://npmjs.org/package/generator-lionbyte
