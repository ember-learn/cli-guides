As in applications, custom blueprints are available in addons.  Addon blueprints are used to generate code snippets in the client application.  Addons can also have a default blueprint that will run automatically after the addon is installed.

Addon blueprints have the same structure as regular blueprints. You should be familiar with [creating blueprints](../../advanced-use/blueprints/) in the `Advanced use` section to understand blueprints before using them in your addon.

 The default blueprint has extra hooks to install packages and/or install another Ember addon into the client app.

To create the default blueprint, use `ember generate blueprint <addon-name>`

```javascript {data-filename=my-addon-name/blueprints/my-addon-name/index.js}
module.exports = {
  normalizeEntityName() {}, // no-op since we're just adding dependencies
};
```
### Blueprint Hooks

In addition to the standard blueprint hooks, the default blueprint can use these hooks.

* `addAddonToProject`
* `addBowerPackageToProject`
* `addPackageToProject`

#### addAddonToProject

Installs another Ember addon in the client application

#### addPackageToProject

Installs an npm package or dependency into the client application

#### addBowerPackageToProject

Installs a Bower package or dependency into the client application.
Bower is a package manager that is [no longer recommended for new projects](https://bower.io/),
but you may find this hook used in older addons.

Each of the hooks returns a promise, so they can all be chained with `.then()`. The following is an example of each of these:

```javascript {data-filename=my-addon-name/blueprints/my-addon-name/index.js}
module.exports = {
  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addAddonsToProject({
      // a packages array defines the addons to install
      packages: [
        // name is the addon name, and target (optional) is the version
        { name: 'ember-cli-code-coverage', target: '0.3.9' },
        { name: 'ember-cli-sass' }
      ]
    }).then(() => {
      // Add npm packages to package.json
      return this.addPackagesToProject([
        { name: 'babel-eslint' },
        { name: 'eslint-plugin-ship-shape' }
      ]);
    });
  }
};
```

### Blueprint Config

The default blueprint is recognized because it normally has the same name as the addon.  Optionally, you may specify a different name for the "defaultBlueprint" in `package.json`:


```json {data-filename=my-addon-name/package.json}
"ember-addon": {
  // addon configuration properties
  "configPath": "tests/dummy/config",
  "defaultBlueprint": "blueprint-that-isnt-package-name",
}
```

### Blueprints in development

When developing and testing your addon using either `npm link` or `yarn link` your addon's blueprint will not automatically run. To manually run and test the blue print you would use the following command:

```shell
ember generate <your-blueprint-name>
```

If you specified a different name for the default blueprint, use that name with `ember generate`.
