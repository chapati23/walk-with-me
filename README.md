## Getting Started

- Precondition:
  - node: recommended version `5.3.0` or higher via [nvm](https://github.com/creationix/nvm)
  - jspm: install globally via `npm install -g jspm`
- Install dependencies: `npm install && jspm install`
- Run `npm start` to preview in your local browser and watch for changes
- Run `npm run` to see available commands

## Features
* ES6 and [ES6 modules](https://www.npmjs.com/package/es6-module-loader) via [Babel](https://babeljs.io)
* [JSPM](http://jspm.io) for package management & [System.js](https://github.com/systemjs/systemjs) for module loading
* Deployment via [Github Pages](https://www.npmjs.com/package/gh-pages)
* NPM Build Pipeline (no gulp, no webpack, no browserify) inspired by http://blog.keithcirkel.co.uk/how-to-use-npm-as-a-build-tool/
* [SASS](https://www.npmjs.com/package/node-sass) for general style-authoring
* [PostCSS](https://www.npmjs.com/package/postcss-cli) using [Autoprefixer](https://www.npmjs.com/package/autoprefixer) and [cssnano](https://www.npmjs.com/package/cssnano)
* [BrowserSync](https://www.npmjs.com/package/browser-sync)
* [ESLint](https://www.npmjs.com/package/eslint)
* [Imagemin](https://www.npmjs.com/package/imagemin)
* [Hashmark](https://www.npmjs.com/package/hashmark) for hashing asset filenames and automatically replacing references in css/js/html-files
