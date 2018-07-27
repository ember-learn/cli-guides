# Advanced use

This section of the CLI Guides describes how to make custom configurations to the app's build behavior, testing, and more.
Ember is designed for a zero config experience for most users, but it was also designed to be extensible. Think of it as configuration without confusion.

## Overall CLI functionality

To begin making configurations, first it is important to understand the overall architecture of what the CLI can do.
Most custom configuration is done in `ember-cli-build.js`, `environment.js`, and Broccoli plugins.

### Broccoli

Ember uses Broccoli for the build process. Broccoli is an independent project that is similar to tools like webpack and parcel. Although many developers never need to configure Broccoli themselves, they have the option to do so. For example, if an app has content in the form of Markdown files that need to be turned into HTML during the build, it could be done with Broccoli. This very app you're reading content on right now follows that architecture, and the work was turned into a [Broccoli plugin](https://github.com/stonecircle/broccoli-static-site-json).

Just like there are Ember community addons, there are a variety of Broccoli plugins too!

### Babel

The CLI uses Babel as part of the build process. Babel is an independent project used in an incredible percentage of websites. It has an important job, as quoted from [their documentation](https://babeljs.io/docs/en):

> Babel is a toolchain that is mainly used to convert ECMAScript 2015+ code into a backwards compatible version of JavaScript in old browsers or environments.

### Minification

The CLI uses uglify to take dozens of JavaScript files and turn them into something compact and optimized.

### Stylesheet compilation

Ember apps use CSS by default. However there is support for other stylesheet systems like LESS and SASS.

<!-- Show that app/styles/app.css is the entry point-->

<!-- Example of importing stylesheets from node_modules -->

<!-- Example of enabling SASS suppot -->

### Testing framework

Ember has official support for QUnit and Mocha. However, other libraries may be used.

### Community build tools

A number of community build tools allow developers to use things like Typescript in their Ember apps.

## Configuring the environment

One of the most important customization files is `environment.js`. There, different behavior can be defined based on which environment flag is passed to the `build` command.

### Example asset minification configuration

Some apps may have previously-minified files included as assets.
Those JavaScript files should not be minified twice! To exclude certain files from minification, add the configuration to `environment.js`:

<!-- Need an example -->

### Example addon configuration

Many developers use a tool called [Mirage]() to make a test API server. By default, Mirage is only available in development, however, with a change in the `production` section of `environment.js`, it can be used in deployed apps.

## Including third party JavaScript libraries

The easiest and best way to include npm packages in an Ember app is to use an Ember Addon version of them. That way, the experience is `ember install ember-addon-name` and `ember serve`. A list of Ember addons can be found on [Ember Observer](https://emberobserver.com)

However, sometimes, developers need to work with libraries or assets that aren't available as addons. The options are, either write an addon wrapper or include the files directly in the build. Writing an addon wrapper is a routine choice for many developers, and a step by step guide is available here <!-- LINK -->

This section describes the options for importing specific assets from `node_modules`, including JavaScript files in the `vendor` folder, and writing shims.

### Importing from `node_modules`

### Using the `vendor` directory

For files to be included in the default app build, they should go in specific places in the file structure. The `vendor` folder is the most likely place for things like minified `JavaScript` files. 

A typical minified, browser-ready JavaScript file will export a global that can be used throughout the Ember app. To include it in the build and make it accessible, it must be imported in `ember-cli-build.js`:

<!-- EXAMPLE CODE -->

### Using the public folder

By default, images in the public folder will be available to use in app templates:

<!-- EXAMPLE CODE -->

## Testing configuration 

### Using `testem.js`

[Testem]() is an independent project that the CLI uses to run tests. For example, the `testem.json` file contains specification like which browsers to run tests in.

### Linting

A linter is a tool that checks to see if certain coding best practices are being followed, as well as checking for invalid syntax. By default, the CLI uses eslint plus some Ember-specific eslint plugins that help check for likely mistakes.

To customize linting behavior, edit `.eslintrc.js`. An example configuration might be to enforce using semicolons, or change a rule violation to count as an "error" rather than a warning.

### Continuous integration testing

Default Ember apps contain a file called `.travis.yml` that specifies the commands to be used with [Travis](), a Continuous Integration testing vendor.

Developers are free to use other CI providers. They are encouraged to reference the default blueprint of `.travis.yml` to get an idea of what kinds of information to include when configuring other vendors.

## App directory structure

<!-- talk about pods -->

## Custom blueprints

<!-- give an example and link to the cli blueprints -->

## Stylesheet compilation
