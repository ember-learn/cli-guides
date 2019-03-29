<!-- Needs an intro section and editing -->

ember-cli supports plain CSS out of the box. You can add your CSS styles to
`app/styles/app.css` and it will be served at `assets/application-name.css`.

<!-- Ought to show how to import stylesheets from node_modules, or link to it in the guides if it's there -->

To use a CSS preprocessor, you'll need to install the appropriate
[Broccoli](https://github.com/broccolijs/broccoli) plugin. When using a
preprocessor, Broccoli is configured to look for an `app.less`, `app.scss`, `app.sass`,
or `app.styl` manifest file in `app/styles`. This manifest should import any
additional stylesheets.

All your preprocessed stylesheets will be compiled into one file and served at
`assets/application-name.css`.

If you would like to change this behavior, or compile to multiple output
stylesheets, you can adjust the [Output Paths
Configuration](#configuring-output-paths)

#### CSS

To use plain CSS with `app.css`:

* Write your styles in `app.css` and/or organize your CSS into multiple
  stylesheet files and import these files with `@import` from within `app.css`.
* [CSS `@import`
  statements](https://developer.mozilla.org/en-US/docs/Web/CSS/@import) (e.g.
  `@import 'typography.css';`) must be valid CSS, meaning `@import` statements
  *must* precede all other rules and so be placed at the *top* of `app.css`.

To process your imports and replace them with the contents of their files,
add in `ember-cli-build.js`:

```javascript {data-filename=ember-cli-build.js}
var EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    minifyCSS: {
      options: { processImport: true }
    }
  });

  //...
  return app.toTree();
};
```

Which will cause the following to happen:

* In the production build, the `@import` statements are replaced with the
  contents of their files and the final minified, concatenated single CSS file
  is built to `dist/assets/yourappname-FINGERPRINT_GOES_HERE.css`.
* Any individual CSS files are also built and minified into `dist/assets/` in
  case you need them as standalone stylesheets.
* Relative pathing gets changed (how to customize?)

Example `app.css` with valid `@import` usage:

```css
/* @imports must appear at top of stylesheet to be valid CSS */
@import 'typography.css';
@import 'forms.css';

/* Any CSS rules must go *after* any @imports */
.first-css-rule {
  color: red;
}
...
```

#### CSS Preprocessors

To use one of the following preprocessors, all you need to do is install the appropriate npm module.
The respective files will be picked up and processed automatically.

#### LESS

To enable [LESS](http://lesscss.org/), you'll need to add
[ember-cli-less](https://github.com/gdub22/ember-cli-less) to
your npm modules.

```shell
ember install ember-cli-less
```

#### SCSS/SASS

To enable [SCSS/SASS](http://sass-lang.com/), you'll need to
install the [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass) addon
to your project *(defaults to .scss, .sass allowed via configuration)*.

```shell
ember install ember-cli-sass
```

You can configure your project to use .sass in your `ember-cli-build.js`:

```javascript {data-filename=ember-cli-build.js}
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp({
    sassOptions: {
      extension: 'sass'
    }
  });

  //...
  return app.toTree();
};
```
