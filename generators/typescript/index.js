const Generator = require('yeoman-generator')

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

    if (this.config.get('react')) {
      tsconfig.compilerOptions.jsx = 'react'
    }

    this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsconfig)
  }
}
