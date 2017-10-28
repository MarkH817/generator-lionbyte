'use strict';

var _yeomanGenerator = require('yeoman-generator');

var _yeomanGenerator2 = _interopRequireDefault(_yeomanGenerator);

var _chalk = require('chalk');

var _chalk2 = _interopRequireDefault(_chalk);

var _yosay = require('yosay');

var _yosay2 = _interopRequireDefault(_yosay);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

module.exports = class LionByte extends _yeomanGenerator2.default {
  prompting() {
    // Have Yeoman greet the user.
    this.log((0, _yosay2.default)('Welcome to the best ' + _chalk2.default.red('generator-lionbyte') + ' generator!'));

    const prompts = [{
      type: 'confirm',
      name: 'someAnswer',
      message: 'Would you like to enable this option?',
      default: true
    }];

    return this.prompt(prompts).then(props => {
      // To access props later use this.props.someAnswer;
      this.props = props;
    });
  }

  writing() {
    this.fs.copy(this.templatePath('dummyfile.txt'), this.destinationPath('dummyfile.txt'));
    this.fs.copy(this.templatePath('README.md'), this.destinationPath('README.md'));
  }

  install() {
    this.installDependencies({
      bower: false,
      npm: true
    });
  }
};