# Contributing
First of all, thank you for your consideration for contributing to this project! All requests and questions are greatly appreciated.

## Environment
Ensure that both `node` and `npm` are installed on your machine.

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

Make sure that you have the [StandardJS](https://standardjs.com/#are-there-text-editor-plugins) and [Editorconfig](http://editorconfig.org/) plugins installed for your respective text editors!

## Scripts
- `npm run build` - Compiles `src` and outputs to `dist`
- `npm run dev` - Watches `src` and rebuilds on file changes
- `npm run lint` - Runs `standard` linter and outputs style errors. Used in `npm test`
- `npm run lint:fix` - Fixes *most* of the style errors
- `npm run report` - Ran after `npm test` and creates a code coverage report
- `npm test` - Runs linter and test suite with code coverage details

## Local Testing
Running `npm test` is pretty good for basic testing. To see how the package runs, run `npm link` to "`install`" this package to your global package list.

`npm run build` compiles the code down to es5. To speed up  development *even more*, open another terminal and run `npm run dev`. This watches the `src` directory and recompiles the code as you save.

If your changes fail the test suite, either fix your code or refactor the tests to reflect the additions/changes. Also try to keep code coverage at least 90%.

## Final Notes
I want this project to be as useful as possible for others. I try to make a bunch of the project configurations as simple as possible for both new and experienced developers. If there's any suggestions to make this a bit easier, please feel free to reach out.
