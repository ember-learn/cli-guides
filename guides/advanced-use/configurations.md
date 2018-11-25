<!-- Should cover at least minification and fingerprinting -->
<!-- Needs intro! -->

### Minifying

Compiled css-files are minified by `broccoli-clean-css` or `broccoli-csso`,
if it is installed locally. You can pass minifer-specific options to them using
the `minifyCSS:options` object in your ember-cli-build. Minification is enabled by
default in the production-env and can be disabled using the `minifyCSS:enabled`
switch.

Similarly, the js-files are minified with `broccoli-uglify-js` in the
production-env by default. You can pass custom options to the minifier via the
`minifyJS:options` object in your ember-cli-build. To enable or disable JS minification
you may supply a boolean value for `minifyJS:enabled`.

For example, to disable minifying of CSS and JS, add in `ember-cli-build.js`:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    minifyJS: {
      enabled: false
    },
    minifyCSS: {
      enabled: false
    }
  });

  //...
  return app.toTree();
};
```

#### Exclude from minification

Some files should be excluded from minification, such as copied-and-pasted third party scripts that are already minified.

To exclude assets from `dist/assets` from being minified, one can pass options for
[broccoli-uglify-sourcemap](https://github.com/ef4/broccoli-uglify-sourcemap) like so:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    minifyJS: {
      options: {
        exclude: ["**/vendor.js"]
      }
    }
  });

  //...
  return app.toTree();
};
```

This would exclude the resulting `vendor.js` file from being minified.