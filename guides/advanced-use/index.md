This section of the CLI Guides describes the ecosystem of tools that are behind an app's build behavior, testing, and more.
Ember is designed for a zero-config experience for most users, but it was also designed to be extensible.
The first step to making your own configurations is to become familiar with some of the vocabulary and tools.
Later sections will cover how to use them to get work done.

## Broccoli

Ember uses Broccoli for the build process. Broccoli is an independent project that is similar to tools like webpack and parcel. Although many developers never need to configure Broccoli themselves, they have the option to do so.

For example, if an app has content in the form of Markdown files that need to be turned into HTML during the build, it could be done with Broccoli. This very app you're reading content on right now follows that architecture, and the work was turned into a [Broccoli plugin](https://github.com/stonecircle/broccoli-static-site-json).

<!-- alex disable just -->
Just like there are Ember community addons, there are a variety of Broccoli plugins too! 
You can find plugins under the [broccoli-plugin keyword](https://npmjs.com/search?q=keywords:broccoli-plugin) on npm.

## Babel

The CLI uses Babel as part of the build process. Babel is an independent project used in an incredible percentage of websites. It has an important job, as quoted from [their documentation](https://babeljs.io/docs/en):

> Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards-compatible version of JavaScript in old browsers or environments.

## Minification

The CLI uses terser to take dozens of JavaScript files and turn them into something compact and optimized.

## Stylesheet compilation

Ember apps use CSS by default. However, there is support for other stylesheet systems like LESS and SASS.

## Testing framework

Ember has official support for QUnit and Mocha. However, other libraries may be used.

## Community build tools

A number of community build tools allow developers to use things like Typescript in their Ember apps.

## Using `testem.js`

[Testem](https://github.com/testem/testem) is an independent project that the CLI uses to run tests. For example, the `testem.json` file contains specification like which browsers to run tests in.

## Linting

A linter is a tool that checks to see if certain coding best practices are being followed, as well as checking for invalid syntax. By default, the CLI uses [ESLint](https://eslint.org) plus some Ember-specific ESLint plugins that help check for likely mistakes.

To customize linting behavior, edit `.eslintrc.js`. An example configuration might be to enforce using semicolons, or change a rule violation to count as an "error" rather than a warning.

## Continuous integration testing

Default Ember apps contain a file called `.travis.yml` that specifies the commands to be used with [Travis](https://travis-ci.org/), a Continuous Integration testing vendor.

Developers are free to use other CI providers. They are encouraged to reference the default blueprint of `.travis.yml` to get an idea of what kinds of information to include when configuring other vendors.
