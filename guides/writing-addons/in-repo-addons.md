### In-Repo-Addons
Addons specific to your project can be created inside your repo and are
generated in the projects `lib` directory in a folder with the name of
the in-repo-addon, e.g. `/lib/in-repo-addon-name` and follow the same
file structure as a normal *addon*.

Some advantages of using an in-repo-addon, instead of an addon outside of
your application (repo), are:

- Sandbox for developing a feature that you may want to share as an
  addon in the future
- Having all the benefits of addon isolation but without the need to
  publish or `npm link`

Use `in-repo-addon` argument with the `ember generate` command:

```bash
ember generate in-repo-addon in-repo-addon-name
```

(Replace `in-repo-addon-name` with the name of your addon.)

Only `index.js` and `package.json` files will be created.  The usual `addon/`,
`app/`, `test/`, `ember-cli-build.js`, etc files can be added either through
generators or by hand.

### Using a stylesheet with an in-repo-addon
For your in-repo-addon stylesheet, name the file `addon.css` and place
it in the styles directory, e.g `/lib/in-repo-addon-name/addon/styles/addon.css`
This avoids any conflict with the parent application's `app.css` file

Likewise if your Ember CLI application uses `.less` or `.scss`, use the
appropriate file extension for your addon stylesheet file.

### Using templates with an in-repo-addon
In order to compile HTMLBars templates that are part of your in-repo-addon,
your `package.json` file will need to include following dependencies:

- `ember-cli-babel`
- `ember-cli-htmlbars`

(Use the same versions found in your Ember CLI Application's `package.json`)

### Dependencies
If a dependency exists in the project's package.json, they are available in the in-repo addon (regardless of the in-repo addon's package.json).

Because in-repo addons are meant to be lightweight and low ceremony, if you find yourself needing the addon to have nested dependencies that do not belong in the project itself, consider making it a full fledged addon instead.

### Broccoli build options for in-repo-addons
To ensure that you can use babel.js and related polyfills with your in-repo-addon
add babel options to the `included` hook of the in-repo-addon `index.js`:

```javascript
module.exports = {
  name: 'in-repo-addon-name',

  isDevelopingAddon() {
    return true;
  },

  included(app, parentAddon) {
    let target = (parentAddon || app);
    target.options = target.options || {};
    target.options.babel = target.options.babel || { includePolyfill: true };
    return this._super.included.apply(this, arguments);
  }
};
```

### Using Generators
To create files for your in-repo-addon using Ember CLI generator commands,
pass the `--in-repo` argument with the name of your in-repo-addon:

```bash
ember generate component --in-repo <in-repo-addon name> <component name>
```

### Generating an in-repo-addon blueprint
To generate a blueprint for your in-repo-addon:

```bash
ember generate blueprint <blueprint-name> --in-repo-addon <in-repo-addon-name>
```

When generating a blueprint, a shorthand argument `-ir` or `-in-repo` can be
used in place of `--in-repo-addon`.
