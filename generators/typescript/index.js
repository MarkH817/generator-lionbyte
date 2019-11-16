const Generator = require('yeoman-generator')

module.exports = class TypeScript extends Generator {
  writing () {
    const tsconfig = {
      compilerOptions: {
        allowJs: true,
        alwaysStrict: true,
        checkJs: true,
        esModuleInterop: true,
        module:
          this.config.get('projectType') === 'frontend' ? 'esnext' : 'commonjs',
        moduleResolution: 'node',
        noEmit: true,
        target: 'es2017'
      },
      include: ['declarations.d.ts', 'src/**/*.js']
    }

    if (this.config.get('react')) {
      tsconfig.compilerOptions.jsx = 'react'
    }

    this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsconfig)
    this.fs.write(this.destinationPath('declarations.d.ts'), '')
  }
}
