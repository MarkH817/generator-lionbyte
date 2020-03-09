# [2.4.0](https://github.com/MarkH817/generator-lionbyte/compare/v2.3.2...v2.4.0) (2020-01-22)

### Features

- **frontend:** update babelrc and webpack settings ([2c123da](https://github.com/MarkH817/generator-lionbyte/commit/2c123dae4cb42fb54a42e9baf8c939e4a13c22db))

## [2.3.2](https://github.com/MarkH817/generator-lionbyte/compare/v2.3.1...v2.3.2) (2020-01-11)

### Bug Fixes

- remove Standard code style badge from generated README ([e38ac1f](https://github.com/MarkH817/generator-lionbyte/commit/e38ac1feeede4f83f1db5f49c8a4a8b58e1b93a8))

## [2.3.1](https://github.com/MarkH817/generator-lionbyte/compare/v2.3.0...v2.3.1) (2020-01-03)

### Bug Fixes

- **docs:** update CONTRIBUTING.md to reflect project priorities ([e777c9d](https://github.com/MarkH817/generator-lionbyte/commit/e777c9d1b89bdf852fae6f78d3f146129057f2a4))

# [2.3.0](https://github.com/MarkH817/generator-lionbyte/compare/v2.2.1...v2.3.0) (2020-01-03)

### Features

- add jest-runner-eslint to generated projects ([b8d896f](https://github.com/MarkH817/generator-lionbyte/commit/b8d896f245010bb04c97073bb940d5ae04bad1fd))

## [2.2.1](https://github.com/MarkH817/generator-lionbyte/compare/v2.2.0...v2.2.1) (2020-01-01)

### Bug Fixes

- **frontend:** fix regex in webpack configuration file ([639a226](https://github.com/MarkH817/generator-lionbyte/commit/639a2261ece8823d47e39c6598ac032ddf55fa4e))

# [2.2.0](https://github.com/MarkH817/generator-lionbyte/compare/v2.1.1...v2.2.0) (2019-11-16)

### Features

- reduce calls to `npm install` ([edc058c](https://github.com/MarkH817/generator-lionbyte/commit/edc058c6d7e0093f788dd594b35234ed5cc8d3fd))

## [2.1.1](https://github.com/MarkH817/generator-lionbyte/compare/v2.1.0...v2.1.1) (2019-11-16)

### Bug Fixes

- repair default webpack configurations ([06d2a23](https://github.com/MarkH817/generator-lionbyte/commit/06d2a23c3ebda0f355a914260c6b0baa633dccd7))

# [2.1.0](https://github.com/MarkH817/generator-lionbyte/compare/v2.0.0...v2.1.0) (2019-11-13)

### Features

- use `@lionbyte/eslint-config` ([aa8cd52](https://github.com/MarkH817/generator-lionbyte/commit/aa8cd52cdb9a34927fd6e5078974c5540ca096a4))

# [2.0.0] - 2018-12-24

### Changes

- Remove `server` and `cli` project types
  - I hardly ever used these two. They're based off of the default node project type anyways.
- Rename subgenerator `generic` to `node`
- Rename subgenerator `static-site` to `frontend`
- Use `eslint` with `standard` configurations
  - Allows for more customization and integration with other tools using `eslint`.
- Move `prettier`, `husky`, `lint-staged`, and `eslint` configuations to individual `.*rc` files
  - The `package.json` file was getting cluttered with too many configurations.

### Internal

- Add Node v10 to travis-ci test suite environment
- Update dependencies

# [1.4.0] - 2018-10-04

### Changes

- Fix commit-hooks configs to be readable by the tools
- Bump `yeoman-generator` dependency to v3
- Set `.babelrc` useBuiltIns to `'usage'`
- Update `babel` configuration to v7 on `static-site`
- Fix `babel-jest` to work with `babel` v7

# [1.3.0] - 2018-06-09

### Changes

- Switches to `jest` testing framework from `mocha`, `chai`, and `nyc`
  - Simplifies the test configuration between project types
- Adds `typescript` for all JS files
- Update Travis CI script to use npm@6 and call `npm ci` for installs

### Internal

- Removes `nsp` package, since npm@6 now performs security checks

# [1.2.0] - 2018-05-08

### Changes

- Made pre-commit hooks optional
- Updated .babelrc file w/ better default settings
- Added `babel-polyfill` for web projects
- Added `babel-register` and `cross-env` for testing ES6 modules for web projects

### Internal

- Removed gulp from build process
- Added Travis CI configurations to test on Node v6, v8, and latest

# [1.1.0] - 2018-04-08

### Changed

- Swapped to `mini-css-extract-plugin` from `extract-text-webpack-plugin`

### Added

- Pre-commit hooks to run linters [`husky` and `lint-staged`]
- Added `prettier` to devDependencies, where it was previously missing

## [1.0.1] - 2018-03-09

### Fixed

- Use webpack plugin versions compatible with webpack@4
- Fix typo in .babelrc

# [1.0.0] - 2018-03-06

### Added

- Prettier code formatter
- Webpack@4 and various plugins

### Removed

- gulp usage in project types
- babel-node usage

# [0.4.0] - 2017-12-15

### Added

- Server subgenerator
  - Uses Express
  - Server reloading with Nodemon

### Renoved

- Remove jsdoc-to-markdown

# [0.3.2] - 2017-12-06

### Addded

- Insert more rules to the .gitattribute file

### Changed

- Shorten the pull request template

### Fixed

- Fix BrowserSync path bug

### Removed

- TestCafe from static-site template due to insecure dependencies

# [0.3.1] - 2017-11-18

### Fixed

- Fix require paths in static-site subgenerator

# [0.3.0] - 2017-11-18

### Added

- Add gulp-hub
- Add jsdoc-to-markdown

### Fixed

- Update dependency for static-site
  - `gulp-webpack` -> `webpack-stream`

## [0.2.2] - 2017-11-04

### Fixed

- NOW FIXED the .gitignore issue
  - :) I love seeing a fix actually fixing something (:

# [0.2.1] - 2017-11-04

### Added

- Package subgenerator
- Option to add cli to generic projects
- Add .travis.yml template
- Add other community files
- Add mini.css-react to static-site by default

### Changed

- Improved gulpfiles for readability

### Fixed

- Have a .npmignore file in the same directory as the .gitignore file
  - NPM converted .gitignore to .npmignore when published
  - Resulted in 'file not found' error for other users

# [0.2.0] - 2017-10-29

### Added

- Add CHANGELOG.md to templates
- Add project type prompt
- Add static-site subgenerator
  - Optionally include React
  - UI test with TestCafe
  - Webpack development and production configurations
    - Minify code and generate sourcemaps on production build
  - Support LESS -- a CSS-preprocessor
  - Support EJS -- an HTML template language
  - Watch all files and auto-refresh browser on changes

### Changed

- Separated template files among common, generic, and static-site subgenerators
- Insert inline-sourcemaps to transpiled generators

# [0.1.0] - 2017-10-28

### Added

- Template files for generic NodeJS project
- Use `standard` linter
- Supports ES6+ syntax with `babel-preset-env`
- Use `gulp` to automate cleaning, building, and watching files
- Use `mocha` and `chai` for test suite
- Report line coverage for test suite with `nyc`
