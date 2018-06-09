const Generator = require('yeoman-generator')

module.exports = class TypeScript extends Generator {
  writing () {
    const isStaticSite = this.config.get('projectType') === 'static-site'

    const tsconfig = {
      compilerOptions: {
        allowJs: true,
        alwaysStrict: true,
        checkJs: true,
        esModuleInterop: true,
        module: isStaticSite ? 'esnext' : 'commonjs',
        moduleResolution: 'node',
        noEmit: true,
        target: 'es2017'
      },
      include: ['src/**/*.js']
    }

    if (isStaticSite && this.config.get('react')) {
      tsconfig.compilerOptions['jsx'] = 'react'
    }

    this.fs.writeJSON(this.destinationPath('tsconfig.json'), tsconfig)
  }
}
