### NPM and Yarn Configuration

Ember CLI supports [npm](https://www.npmjs.com) and [Yarn](https://yarnpkg.com/) 
for dependency management. A newly generated Ember CLI project only has npm 
dependencies, so it will include a `package.json` file and use npm by default. 
If you use Yarn to manage dependencies, the CLI will detect the `yarn.lock` file 
and use Yarn instead. In cases where both a `yarn.lock` file and a `package-lock.json` 
file are present, Ember CLI will default to using Yarn.

Changes to your dependencies should be managed through your `package.json` file.
Executing `npm install` will install all of the dependencies listed in
`package.json` in one step.

Ember CLI is configured to have git ignore your `node_modules` directories by 
default. Using the npm configuration files allows collaborators to fork your 
repo and get their dependencies installed locally by executing 
`npm install` themselves.

Ember CLI will not watch for changes in your `package.json` file. Therefore, 
if you install npm dependencies via `npm install <dependencies> --save`, you will 
need to restart your Ember CLI server session manually.

Further documentation about npm and Yarn is available at their official
documentation pages:

* [npm](https://www.npmjs.com)
* [Yarn](https://yarnpkg.com)

Note that it is often easiest to install Ember addon dependencies using the
`ember install` command, which will save all dependencies to the correct
configuration files and run any further setup steps required.

### Compiling Assets

Ember CLI uses the [Broccoli](https://github.com/broccolijs/broccoli) assets
pipeline.

The assets manifest is located in the `ember-cli-build.js` file in your project
root (not the default `ember-cli-build.js`).

To add an asset specify the dependency in your`ember-cli-build.js` before
calling `app.toTree()`. You can only import assets that are within the
`node_modules` or `vendor` directories. The following example scenarios illustrate 
how this works.

#### Javascript Assets

##### Standard Non-AMD Asset

First, provide the asset path as the first and only argument:

```javascript
app.import('bower_components/moment/moment.js');
```

From here you would use the package as specified by its documentation, usually
a global variable. In this case it would be:

```javascript
import Ember from 'ember';
/* global moment */
// No import for moment, it's a global called `moment`

// ...
let day = moment('Dec 25, 1995');
```

_Note: Don't forget to make ESLint happy by adding a `/* global MY_GLOBAL */`
to your module, or by defining it within the `globals` section of your
`.eslintrc.js` file._

Alternatively, you could generate an ES6 shim to make the library accessible
via `import`.

First, generate the shim:

```bash
ember generate vendor-shim moment
```

Next, provide the vendor asset path:

```javascript
app.import('vendor/shims/moment.js');
```

Finally, use the package by adding the appropriate `import` statement:

```javascript
import moment from 'moment';

// ...
let day = moment('Dec 25, 1995');
```

##### Standard Named AMD Asset

Provide the asset path as the first argument, and the list of modules and
exports as the second:

```javascript
app.import('bower_components/ic-ajax/dist/named-amd/main.js');
```

To use this asset in your app, import it.
For example, with `ic-ajax`, when to use `ic.ajax.raw`:

```javascript
import { raw as icAjaxRaw } from 'ic-ajax';
//...
icAjaxRaw( /* ... */ );
```

##### Standard Anonymous AMD Asset

Provide the asset path as the first argument, and the desired module name
in the second:

```javascript
app.import('bower_components/ic-ajax/dist/amd/main.js', {
  using: [
    { transformation: 'amd', as: 'ic-ajax' }
  ]
});
```

To use this asset in your app, import it.
For example, with `ic-ajax`, when to use `ic.ajax.raw`:

```javascript
import { raw as icAjaxRaw } from 'ic-ajax';
//...
icAjaxRaw( /* ... */ );
```

##### Environment Specific Assets

If you need to use different assets in different environments, specify an
object as the first parameter. That object's key should be the environment
name, and the value should be the asset to use in that environment.

```javascript
app.import({
  development: 'bower_components/ember/ember.js',
  production:  'bower_components/ember/ember.prod.js'
});
```

If you need to import an asset in one environment but not import it or any
alternatives in other environments then you can wrap `app.import` in an `if`
statement.

```javascript
if (app.env === 'development') {
  app.import('vendor/ember-renderspeed/ember-renderspeed.js');
}
```

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

##### Whitelisting and Blacklisting Assets

You can limit which dependencies in your package.json file get imported into
your Ember application by using the addons option of the EmberApp constructor. A
`whitelist` parameter allows you to restrict modules to a specific list. A
`blacklist` parameter excludes specific modules from being imported into your
app:

```javascript
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

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

##### Test Assets

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
      app.import( app.bowerDirectory + '/sinonjs/sinon.js', { type: 'test' } );
      app.import( app.bowerDirectory + '/sinon-qunit/lib/sinon-qunit.js', { type: 'test' } );
  }

  return app.toTree();
};
```

**Notes:**
- Be sure to pass `{ type: 'test' }` as the second argument to `app.import`.
  This will ensure that your libraries are compiled into the `test-support.js`
  file.

#### Styles

##### Static CSS

Provide the asset path as the first argument:

```javascript
app.import('bower_components/foundation/css/foundation.css');
```

All style assets added this way will be concatenated and output as
`/assets/vendor.css`.

##### Dynamic Styles (SCSS, LESS, etc)

The vendor trees that are provided upon instantiation are available to your
dynamic style files.  Take the following example (in `app/styles/app.scss`):

```scss %}
@import "bower_components/foundation/scss/normalize.scss";
```

#### Other Assets

##### Using app.import()

All other assets like images or fonts can also be added via `import()`. By default, they
will be copied to `dist/` as they are.

```javascript
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf');
```

This example would create the font file in `dist/font-awesome/fonts/fontawesome-webfont.ttf`.

You can also optionally tell `import()` to place the file at a different path.
The following example will copy the file to `dist/assets/fontawesome-webfont.ttf`.

```javascript
app.import('bower_components/font-awesome/fonts/fontawesome-webfont.ttf', {
  destDir: 'assets'
});
```

If you need to load certain dependencies before others, you can set the
`prepend` property equal to `true` on the second argument of `import()`. This
will prepend the dependency to the vendor file instead of appending it, which
is the default behavior.

```javascript
app.import('bower_components/es5-shim/es5-shim.js', {
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

_Note: `outputFile` works only for javascript and css files._

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