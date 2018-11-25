<!-- Unedited copy of asset-compilation -->

### Raw Assets

* `public/assets` vs `app/styles`

To add images, fonts, or other assets, place them in the `public/assets` directory. For
example, if you place `logo.png` in `public/assets/images`, you can reference it in
templates with `assets/images/logo.png` or in stylesheets with
`url('/assets/images/logo.png')`.

This functionality of Ember CLI comes from
[broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev). Be
sure to check out all the options and usage notes.

### JS Transpiling

Ember CLI automatically transpiles future JavaScript (ES6/ES2015, ES2016 and beyond) into standard ES5
JavaScript that runs on every browser using [Babel JS](https://babeljs.io) with the [Ember CLI Babel](https://github.com/babel/ember-cli-babel) addon.

Internally, Ember CLI Babel uses `babel-preset-env`, which figures out which parts of your code
need to be transpiled to ES5 by **analyzing your project's browser support targets**. A `target` is a special keyword
that maps to a [browserlist](https://github.com/ai/browserslist) support rule. These are defined in your
`config/targets.js` file, which [Ember CLI generates](https://github.com/ember-cli/ember-cli/blob/master/blueprints/app/files/config/targets.js) like so:

```js
/* eslint-env node */
module.exports = {
  browsers: [
    'ie 9',
    'last 1 Chrome versions',
    'last 1 Firefox versions',
    'last 1 Safari versions'
  ]
};
```

(If these values look familiar, they're the same exact values used by the popular [Autoprefixer](https://github.com/postcss/autoprefixer) project.)

If you need more fine-grained customization over the way that `babel-preset-env` transforms your code,
simply set any of the options found [here](https://github.com/babel/babel-preset-env#options) on your application's `babel` hash in `ember-cli-build.js`.

For example, if you wanted to explicitly exclude generator function transpilation from your
output, your configuration would look like this:

```js
// ember-cli-build.js

/* eslint-env node */
'use strict';
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    babel: {
      blacklist: [
        'es6.arrowFunctions',
        'es6.blockScoping',
        'es6.classes',
        'es6.destructuring',
        'es6.parameters',
        'es6.properties.computed',
        // ...more options
      ]
    }
  });

  //...
  return app.toTree();
};
```

As of Version 2.13, Ember CLI uses Babel 6.X for transpilation. Ember CLI versions prior to 2.13 use Babel Babel 5.X, and you can check its documentation for a comprehensive list of [all available transformations](https://github.com/babel/babel.github.io/blob/5.0.0/docs/usage/transformers/index.md) and [options](https://github.com/babel/babel.github.io/blob/5.0.0/docs/usage/options.md).



### Source Maps

Ember CLI supports producing source maps for your concatenated and minified JS source files.

Source maps are configured by the EmberApp `sourcemaps` option, and
are disabled in production by default. Pass `sourcemaps: {enabled: true}` to your EmberApp constructor to enable source maps for javascript. Use the `extensions` option to add other formats, such as coffeescript and CSS: `{extensions: ['js', 'css', 'coffee']}`. JS is supported out-of-the-box. CSS is not currently supported. For other source formats (Sass, Coffee, etc) refer to their addons.

Default ember-cli-build.js:

```js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    sourcemaps: {
      enabled: EmberApp.env() !== 'production',
      extensions: ['js']
    }
  });

  //...
  return app.toTree();
};
```


### CoffeeScript

To enable [CoffeeScript](http://coffeescript.org/), you must
first add [ember-cli-coffeescript](https://github.com/kimroen/ember-cli-coffeescript) to your
NPM modules:

```bash
ember install ember-cli-coffeescript
```

The modified `package.json` should be checked into source control. CoffeeScript
can be used in your app's source and in tests, just use the `.coffee` extension
on any file. We recommend using version >= 1.16.0 of ember-cli-coffeescript to avoid the need
to escape `import` and `export` statements.

Note that earlier versions of the transpiler had explicit support for
CoffeeScript, but that support has been removed.

### EmberScript

To enable [EmberScript](http://emberscript.com), you must
first add [broccoli-ember-script](https://github.com/aradabaugh/broccoli-ember-script) to your
NPM modules:

```bash
npm install broccoli-ember-script --save-dev
```

Note that the ES6 module transpiler is not directly supported with Emberscript,
to allow use of ES6 modules use the `` ` `` character to escape raw Javascript
similar to the CoffeeScript example above.

### Emblem

For [Emblem](http://emblemjs.com/), run the following commands:

```bash
ember install ember-cli-emblem
```

If you're using the older broccoli-emblem-compiler addon, you need to switch to
ember-cli-emblem. The older broccoli-emblem-compiler compiles directly to JS
instead of Handlebars and therefore is broken on all newer version of HTMLBars.

### Fingerprinting and CDN URLs

Fingerprinting is done using the addon
[broccoli-asset-rev](https://github.com/rickharrison/broccoli-asset-rev)
(which is included by default).

When the environment is production (e.g. `ember build --environment=production`),
the addon will automatically fingerprint your js, css, png, jpg, and gif assets
by appending an md5 checksum to the end of their filename
(e.g. `assets/yourapp-9c2cbd818d09a4a742406c6cb8219b3b.js`). In addition, your
html, js, and css files will be re-written to include the new name. There are
a few options you can pass in to `EmberApp` in your `ember-cli-build.js` to customize
this behavior.

* `enabled` - Default: `app.env === 'production'` - Boolean. Enables fingerprinting
if true. **True by default if current environment is production.**
* `exclude` - Default: `[]` - An array of strings. If a filename contains any
item in the exclude array, it will not be fingerprinted.
* `ignore` - Default: `[]` - An array of strings.  If a filename contains any item in the
ignore array, the contents of the file will not be processed for fingerprinting.
* `extensions` - Default: `['js', 'css', 'png', 'jpg', 'gif', 'map']` - The file types
to add md5 checksums.
* `prepend` - Default: `''` - A string to prepend to all of the assets. Useful
for CDN urls like `https://subdomain.cloudfront.net/`
* `replaceExtensions` - Default: `['html', 'css', 'js']` - The file types to
replace source code with new checksum file names.
* `customHash` - When specified, this is appended to fingerprinted filenames instead
of the md5. Pass `null` to suppress the hash, which can be useful when using `prepend`.

As an example, this `ember-cli-build` will exclude any file in the fonts/169929
directory as well as add a cloudfront domain to each fingerprinted asset.

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    fingerprint: {
      exclude: ['fonts/169929'],
      prepend: 'https://subdomain.cloudfront.net/'
    }
  });

  //...
  return app.toTree();
};
```

The end result will turn

```html
<script src="assets/appname.js">
background: url('/images/foo.png');
```

into

```html
<script src="https://subdomain.cloudfront.net/assets/appname-342b0f87ea609e6d349c7925d86bd597.js">
background: url('https://subdomain.cloudfront.net/images/foo-735d6c098496507e26bb40ecc8c1394d.png');
```

You can disable fingerprinting in your `ember-cli-build.js`:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    fingerprint: {
      enabled: false
    }
  });

  //...
  return app.toTree();
};
```

Or remove the entry from your `EmberApp` and  `broccoli-asset-rev`
from your `package.json`.

### Application Configuration

Application configurations from your `ember-cli-build.js` file will be stored inside a
special meta tag in `dist/index.html`.

sample meta tag:

```js
<meta name="user/config/environment" content="%7B%22modulePre.your.config">
```

This meta tag is required for your ember application to function properly.
If you prefer to have this tag be part of your compiled javascript files
instead, you may use the `storeConfigInMeta` flag in `ember-cli-build.js`.

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    storeConfigInMeta: false
  });

  //...
  return app.toTree();
};
```

#### Configuring output paths

The compiled files are output to the following paths:

<table>
  <thead>
    <tr>
      <th>Assets</th>
      <th>Output File</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>`app/index.html`</td>
      <td>`index.html`</td>
    </tr>
    <tr>
      <td>`app/**/*.js`</td>
      <td>`/assets/application-name.js`</td>
    </tr>
    <tr>
      <td>`app/styles/app.css`</td>
      <td>`/assets/application-name.css`</td>
    </tr>
    <tr>
      <td>`app/styles/**/*.css`</td>
      <td>`/assets/application-name.css`</td>
    </tr>
    <tr>
      <td>Javascript files you import with `app.import`</td>
      <td>`/assets/vendor.js`</td>
    </tr>
    <tr>
      <td>CSS files you import with `app.import`</td>
      <td>`/assets/vendor.css`</td>
    </tr>
  </tbody>
</table>

To change these paths, specify the `outputPaths` config option in `ember-cli-build.js`. The default setting is shown here:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    outputPaths: {
      app: {
        html: 'index.html',
        css: {
          'app': '/assets/application-name.css'
        },
        js: '/assets/application-name.js'
      },
      vendor: {
        css: '/assets/vendor.css',
        js: '/assets/vendor.js'
      }
    }
  });

  //...
  return app.toTree();
};
```

You may edit any of these output paths, but make sure to update the paths specified in your
`app.outputPaths.app.html` default it is `index.html`, and `tests/index.html`. If this is not done,
your app will not be served with correct asset names.

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    outputPaths: {
      app: {
        js: '/assets/main.js'
      }
    }
  });

  //...
  return app.toTree();
};
```

The `outputPaths.app.css` option uses a key value relationship. The *key* is
the input file and the *value* is the output location. Note that we do not
include the extension for the input path, because each preprocessor has a
different extension.

When using CSS preprocessing, only the `app/styles/app.scss` (or `.less` etc)
is compiled. If you need to process multiple files, you must add another key:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    outputPaths: {
      app: {
        css: {
          'app': '/assets/application-name.css',
          'themes/alpha': '/assets/themes/alpha.css'
        }
      }
    }
  });

  //...
  return app.toTree();
};
```

#### Integration

When using Ember inside another project, you may want to launch Ember only when
a specific route is accessed. If you're preloading the Ember javascript before
you access the route, you have to disable `autoRun`:

```js
// ember-cli-build.js
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    autoRun: false
  });

  //...
  return app.toTree();
};
```

To manually run Ember:
`require("app-name/app")["default"].create({/* app settings */});`

#### Subresource integrity

SRI calculation is done using the addon
[ember-cli-sri](https://github.com/jonathanKingston/ember-cli-sri)
(which is included by default).

This plugin is used to generate [SRI integrity](http://www.w3.org/TR/SRI/) for
your applications. Subresource integrity is a security concept used to check
JavaScript and stylesheets are loaded with the correct content when using a
CDN.

#### Why

The reason to add this to your application is to protect against poisoned CDNs
breaking JavaScript or CSS.

<!--alex ignore attack-->

- [JavaScript DDoS prevention](https://blog.cloudflare.com/an-introduction-to-javascript-based-ddos/)
  - The latest [GitHub DDoS attack](http://googleonlinesecurity.blogspot.co.uk/2015/04/a-javascript-based-ddos-attack-as-seen.html)
- Protection against corrupted code on less trusted servers

#### Customize

To customize SRI generation see: [ember-cli-sri](https://github.com/jonathanKingston/ember-cli-sri)
