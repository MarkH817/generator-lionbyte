# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/)
and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).


## [0.2.2] - 2017-11-04
## Fixed
- NOW FIXED the .gitignore issue
  - :) I love seeing a fix actually fixing something (:

## [0.2.1] - 2017-11-04
### Added
- Package subgenerator
- Option to add cli to generic projects
- Add .travis.yml template
- Add other community files
- Add mini.css-react to static-site by default

### Changed
- Improved gulpfiles for readability

## Fixed
- Have a .npmignore file in the same directory as the .gitignore file
  - NPM converted .gitignore to .npmignore when published
  - Resulted in 'file not found' error for other users

## [0.2.0] - 2017-10-29
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

### Fixed

## [0.1.0] - 2017-10-28
### Added
- Template files for generic NodeJS project
- Use `standard` linter
- Supports ES6+ syntax with `babel-preset-env`
- Use `gulp` to automate cleaning, building, and watching files
- Use `mocha` and `chai` for test suite
- Report line coverage for test suite with `nyc`
