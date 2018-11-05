<!-- Some content redundancy with using addons and using npm packages pages -->
<!-- A section should clearly show using WASM files, I think -->

This section of the guides will show how to add new dependencies to
an app or addon.
Examples of dependencies include node modules, standalone JavaScript files,
images, stylesheets, WebAssembly files, JSON, and more.
Regardless of the app framework, _somewhere_ there must be logic that
determines how the files are
pulled together into a bundle that the browser can understand and use efficiently.
In Ember, the CLI handles the most common use cases to deliver a zero config experience.
Here, we'll also cover some of the less common use cases that require some configuration.

## Where should dependencies go?

Here are the most common places:

- Every Ember app has a file called `package.json` that lists node modules used by the app.
The code itself goes in `node_modules`, just like in many non-Ember JavaScript projects
- The `vendor` directory, which is a common home for extra JavaScript, such as web workers
- The `public` directory, the typical place for assets like images
- The `styles` directory, for stylesheets like CSS, SASS, or LESS
plus folders like `vendor` and `public` that hold can many other files of the developer's
choice

Some older apps may use a package manager and registry called Bower, which has
a `bower_components` directory. Bower itself is deprecated and should not be used.

<!-- Where exactly should we talk about utils? At all? Doesn't fit here -->

## Addons as dependencies

Using addons provides the best experience for including new dependencies in an app.
Visit [EmberObserver](https://emberobserver.com) to browse for addons.
Installing them with `ember install some-addon-name` ensures that all the files
go in the right place, and any further setup is completed, like codemods. More details are available in
[Using Addons](../../using-addons/).

<!-- 
If addons are installed accidentally with `npm install` or `yarn install`,
the blueprints can be run with .... what?
-->

## NPM and Yarn

Ember CLI supports both [npm](https://www.npmjs.com) and [Yarn](https://yarnpkg.com/)
for node modules management.

By default, new apps use `npm`.
Both tools offer similar functionality, and which one to choose is up to
the developer's preference.
Dependencies listed in `package.json` can be installed with with either `npm install` or `yarn install`. The files for those packages are added to the `node_modules` folder of the app.

There are two ways to switch from `npm` to `yarn`.
Either include an option when the app is created, like `ember new --yarn`,
or run `yarn install` to generate a `yarn.lock` file.
Ember will detect the `yarn.lock` file and start using it instead
for any `ember install some-addon-name` commands.
Don't forget to delete the `package-lock.json` file if the app
already has one.
In cases where both a `yarn.lock` file and a `package-lock.json`
file are present, Ember CLI will default to using Yarn.
However, having both files causes confusion for collaborators and
is incompatible with some CI systems.

To switch from `yarn` to `npm`, delete the `yarn.lock`
and run `npm install` to generate a `package-lock.json`.

Further documentation about npm and Yarn is available at their official
documentation pages:

* [npm](https://www.npmjs.com)
* [Yarn](https://yarnpkg.com)

### The `node_modules` directory

New apps list the `node_modules` directory in the app's `.gitignore` configuration,
meaning that any changes to the contents of the directory are ignored by git.
Using the npm configuration files allows collaborators to download your
app source code and get the `node_modules` installed locally by executing 
`npm install` themselves.

### Effects of new dependencies on local servers

When an app is being served locally, the Ember CLI will not watch for changes in the `package.json` file. Therefore, 
if you install npm dependencies via `npm install <dependencies>`, you will 
need to restart your Ember CLI server session manually.

Dependencies installed with `ember install some-addon-name` will cause a refreash
of a local server.

### Debugging node_modules dependencies

Errors such as "a module named _____ could not be found" or a colleague's report that "well, the app works on my computer but not yours!" sometimes indicate that
the local server needs to be restarted or `node_modules` should be reinstalled.

Common resolution steps are to stop the server, and then take one of these steps, and start the server again:

- run `npm install` or `yarn install`
- Delete the `node_modules` directory and run `npm install` or `yarn install`
- Delete the `dist` directory (found in apps with versions < 3.4), delete `node_modules`, and `npm install` or `yarn install`
- If an app uses Bower (a deprecated, npm-like tool), follow all the steps above
in addition to deleteing `bower_components` and running `bower install`

## Compiling Assets from `node_modules` and `vendor` directories

Ember CLI uses the [Broccoli](https://github.com/broccolijs/broccoli) assets
pipeline. Most Ember developers do not need to learn Broccoli, but many
will make small changes to `ember-cli-build.js`.

<!-- need to use some info from Jessica's readers question about what broccoli is -->

This section covers how to manually manage dependencies.
See [Using Addons](../../using-addons/) and [Using NPM Packages](../../using-npm-packages/) for automated dependency management.

To add an asset, specify the dependency in your `ember-cli-build.js` before
calling `app.toTree()`. You can only import assets that are within the
`node_modules` or `vendor` directories. The following example scenarios illustrate
how this works.

### Javascript Assets

There are several categories of JavaScript assets, based on how
they handle imports and exports. After identifying which type
the asset is, follow these steps to include it in the app.

#### Standard non-AMD asset as a vendor shim

An ES6 shim makes a library accessible throughout the app via `import`.
The term "shim" comes from wood working. It's a small piece of material
used to reinforce a connection between two surfaces.
A shim can be used to connect ES5 modules with the ES6 module
style used in Ember.

First, generate the shim:

```bash
ember generate vendor-shim moment
```

Next, provide the vendor asset path:

```javascript
app.import('vendor/shims/hamster-wheel.js');
```

Finally, use the package by adding the appropriate `import` statement:

```javascript
import Component from '@ember/component';
import 'hamsterWheel' from 'hamster-wheel'

export default Component.extend({
  electricity() {
    let wheel = hamsterWheel()
    // ...
  }
});
```

#### Standard non-AMD asset as a global

Using shims is considered best practice, to avoid polluting the global namespace.
However, if an asset should be available anywhere in the app without using `import`,
these are the steps to follow instead of using shims.

First, provide the asset path as the first and only argument:

```javascript
app.import('vendor/path/to/hamster-wheel.js');
```

From here you would use the package as specified by its documentation, usually
a global variable:

```javascript
import Component from '@ember/component';
// hamsterWheel is a global variable

export default Component.extend({
  electricity() {
    let wheel = hamsterWheel()
    // ...
  }
});
```

Global variables should be added to ESLint configuration to avoid linting warnings.
Either add `/* global myGlobalVariableName */`
to the top of the JavaScript file that is using the variable, 
or add it to the `globals` section in the `.eslintrc.js` file.

#### Standard Named AMD Asset

Provide the asset path as the first argument, and the list of modules and
exports as the second:

```javascript
app.import('path/to/hamster-wheel/dist/named-amd/main.js');
```

To use this asset in your app, import it.
For example, with `ic-ajax`, in order to import `ic.ajax.raw`:

```javascript
import { raw as icAjaxRaw } from 'ic-ajax';
//...
icAjaxRaw( /* ... */ );
```

#### Standard Anonymous AMD Asset

Provide the asset path as the first argument, and the desired module name
in the second:

```javascript
app.import('vendor/ic-ajax/dist/amd/main.js', {
  using: [
    { transformation: 'amd', as: 'ic-ajax' }
  ]
});
```

To use this asset in your app, import it.
For example, with `ic-ajax`, to use `ic.ajax.raw`:

```javascript
import { raw as icAjaxRaw } from 'ic-ajax';
//...
icAjaxRaw( /* ... */ );
```

#### Environment Specific Assets

If you need to use different assets in different environments, specify an
object as the first parameter. That object's key should be the environment
name, and the value should be the asset to use in that environment.

```javascript
app.import({
  development: 'vendor/something-experimental.js',
  production:  'vendor/something-stable.js'
});
```

If you need to import an asset in one environment but not import it or any
alternatives in other environments then you can wrap `app.import` in an `if`
statement.

```javascript
if (app.env === 'development') {
  app.import('vendor/something-experimental.js');
}
```

<!-- This doesn't look like anything that's still relevant today...-->

<!-- 
##### Customizing a built-in Asset

This is somewhat non-standard and discouraged, but suppose that due to a
requirement in your application that you need to use the full version of
Handlebars even in the production environment.  You would simply provide the
path to the `EmberApp` constructor:

```javascript
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    vendorFiles: {
      'handlebars.js': {
        production: 'bower_components/handlebars/handlebars.js'
      }
    }
  });

  //...
  return app.toTree();
};
```

Alternatively, if you want to exclude the built-in asset from being
automatically included in `vendor.js`, you can set its value to `false`:

```javascript
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    vendorFiles: {
      'handlebars.js': false
    }
  });

  //...
  return app.toTree();
};
```

_Note: The built-in assets are required dependencies needed by the environment
to run your app. If you use the above method to specifically exclude
some, you should still be including them in some other way._
-->

#### Whitelisting and Blacklisting Assets

You can limit which dependencies in your package.json file get imported into
your Ember application by using the addons option of the EmberApp constructor. A
`whitelist` parameter allows you to restrict modules to a specific list. A
`blacklist` parameter excludes specific modules from being imported into your
app:

```javascript

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    addons: {
      blacklist: [
        'fastboot-app-server'
      ]
    }
  });

  //...
  return app.toTree();
};
```

#### Test Assets

You may have additional libraries that should only be included when running
tests (such as qunit-bdd or sinon). These can be imported into your app in your
ember-cli-build.js:

```javascript
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const isProduction = EmberApp.env() === 'production';

module.exports = function(defaults) {
  let app = new EmberApp(defaults, { });

  if ( !isProduction ) {
      app.import( 'path/to/sinonjs/sinon.js', { type: 'test' } );
      app.import( 'path/to/sinon-qunit/lib/sinon-qunit.js', { type: 'test' } );
  }

  return app.toTree();
};
```

**Notes:**
- Be sure to pass `{ type: 'test' }` as the second argument to `app.import`.
  This will ensure that your libraries are compiled into the `test-support.js`
  file.

## Styles

### Static CSS

Provide the asset path as the first argument:

```javascript
app.import('bower_components/foundation/css/foundation.css');
```

All style assets added this way will be concatenated and output as
`/assets/vendor.css`.

### Dynamic Styles (SCSS, LESS, etc)

The vendor trees that are provided upon instantiation are available to your
dynamic style files.  Take the following example (in `app/styles/app.scss`):

<!-- CHECK THIS -->
```scss
@import "foundation/scss/normalize.scss";
```

## Other Assets

### Using app.import()

All other assets like images or fonts can also be added via `import()`. By default, they
will be copied to `dist/` as they are.

```javascript
app.import('path/to/font-awesome/fonts/fontawesome-webfont.ttf');
```

This example would create the font file in `dist/font-awesome/fonts/fontawesome-webfont.ttf`.

You can also optionally tell `import()` to place the file at a different path.
The following example will copy the file to `dist/assets/fontawesome-webfont.ttf`.

```javascript
app.import('path/to/font-awesome/fonts/fontawesome-webfont.ttf', {
  destDir: 'assets'
});
```

If you need to load certain dependencies before others, you can set the
`prepend` property equal to `true` on the second argument of `import()`. This
will prepend the dependency to the vendor file instead of appending it, which
is the default behavior.

```javascript
app.import('path/to/es5-shim/es5-shim.js', {
  type: 'vendor',
  prepend: true
});
```

If you need some of your assets to be included into specific file you can
provide an `outputFile` option for your import:

```javascript
// ember-cli-build.js
app.import('vendor/dependency-1.js', { outputFile: 'assets/additional-script.js'});
app.import('vendor/dependency-2.js', { outputFile: 'assets/additional-script.js'});
```

As a result both dependencies will end up in `dist/assets/additional-script.js`
in the same order they were specified.

_Note: `outputFile` works only for JavaScript and css files._

<!-- Should info this old be kept somewhere centralized? -->

<!-- 
##### Using broccoli-funnel

With the [broccoli-funnel](https://github.com/broccolijs/broccoli-funnel)
package, (parts of) a bower-installed package can be used as assets as-is.
First ensure that the Broccoli
package needed to build is installed:

```bash
npm install broccoli-funnel --save-dev
```

Add this import to the top of `ember-cli-build.js`, just below the `EmberApp` require:

```javascript
const Funnel = require('broccoli-funnel');
```

Within `ember-cli-build.js`, we merge assets from a bower dependency with the main app tree:

```javascript
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, { });

  // Copy only the relevant files. For example the WOFF-files and stylesheets for a webfont:

  let extraAssets = new Funnel('bower_components/a-lovely-webfont', {
     srcDir: '/',
     include: ['**/*.woff', '**/stylesheet.css'],
     destDir: '/assets/fonts'
  });

  // Providing additional trees to the `toTree` method will result in those
  // trees being merged in the final output.

  return app.toTree(extraAssets);
};
```

In the above example the assets from the fictive bower dependency called `a-lovely-webfont` can now
be found under `/assets/fonts/`, and might be linked to from `index.html` like so:

```html
<link rel="stylesheet" href="assets/fonts/lovelyfont_bold/stylesheet.css">
```

You can exclude assets from the final output in a similar fashion. For example,
to exclude all `.gitkeep` files from the final output:

```javascript
// Again, add this import to the top of `ember-cli-build.js`, just below the `EmberApp` require:
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const Funnel = require('broccoli-funnel');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, { });

  // Filter toTree()'s output
  let filteredAssets = new Funnel(app.toTree(), {
    // Exclude gitkeeps from output
    exclude: ['**/.gitkeep']
  });

  // Export filtered tree
  return filteredAssets;
};
```

_Note: [broccoli-static-compiler](https://github.com/joliss/broccoli-static-compiler) is deprecated. Use [broccoli-funnel](https://github.com/broccolijs/broccoli-funnel) instead._
-->