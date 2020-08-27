const Generator = require('yeoman-generator')

const { sortObj } = require('../utils')

module.exports = class TypeScript extends Generator {
  writing () {
    const tsconfig = {
      compilerOptions: {
        allowJs: true,
        alwaysStrict: true,
        checkJs: true,
        esModuleInterop: true,
        forceConsistentCasingInFileNames: true,
        module:
          this.config.get('projectType') === 'frontend' ? 'ESNext' : 'CommonJS',
        moduleResolution: 'Node',
        noEmit: true,
        target: 'ESNext'
      },
      include: ['./']
    }

    if (this.config.get('projectType') === 'frontend') {
      tsconfig.compilerOptions.baseUrl = './'
      tsconfig.compilerOptions.paths = { 'src/*': ['src/*'] }

      if (this.config.get('react')) {
        tsconfig.compilerOptions.jsx = 'react'
      }

      tsconfig.compilerOptions = sortObj(tsconfig.compilerOptions)
    }

    this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsconfig)
  }
}
