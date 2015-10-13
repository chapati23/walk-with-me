## Getting Started

- Precondition:
  - node: recommended version `4.1.2` or higher via [nvm](https://github.com/creationix/nvm)
  - gulp: install globally via `npm install -g gulp`
  - jspm: install globally via `npm install -g jspm`
- Install dependencies: `npm install && jspm install`
- Run `gulp serve` to preview in your local browser and watch for changes

## Deploying
- Run `gulp clean` to clean the `dist` folder and start fresh
- Run `gulp build` to compile all assets into the `dist` folder
- Run `gulp deploy` to deploy this website to Github Pages


## Features
* [JSPM](http://jspm.io) for package management & [System.js](https://github.com/systemjs/systemjs) for module loading
* ES6 through [Babel](https://babeljs.io)
* CSS Autoprefixing with Sourcemaps Support
* Built-in preview server with BrowserSync
* Automagically compile Sass with [libsass](http://libsass.org)
* Automagically lint your scripts
* Awesome image optimization
