In an Ember project, the command `ember install <package-name>` installs Ember addons (which are npm packages) as devDependencies in your app's `package.json`.

Some project packages such as `ember-cli-app-version` and `broccoli-asset-rev` are only used during development or the application build process. For example, the package `ember-cli-htmlbars` is a dependency that must be included in a production build if your addon provides any templates. 

In an addon, packages are installed in both dependencies and devDependencies:

- the addon's dependencies are installed in `dependencies`
- dependencies that are only used for the `dummy app` are installed in `devDependencies`

The partial package.json example below is from the [`ember-c3`](https://github.com/Glavin001/ember-c3) addon, which is a wrapper for the [C3.js Graph Library](https://c3js.org/).


```json
  "dependencies": {
    "broccoli-funnel": "^2.0.1",
    "broccoli-merge-trees": "^3.0.1",
    "c3": "^0.6.8",
    "d3": "^5.7.0",
    "ember-auto-import": "^1.2.15",
    "ember-cli-babel": "^6.16.0"
  },
  "devDependencies": {
    "@ember/jquery": "^0.5.2",
    "@ember/optional-features": "^0.6.3",
    "bootstrap": "^4.1.0",
    "broccoli-asset-rev": "^2.7.0",
    "ember-ajax": "^3.1.0",
    "ember-cli": "^3.5.1",
    "ember-cli-bootstrap-4": "^0.6.1",
     ...
  }
```
The addon has six dependencies. `ember-cli-babel` is required by all addons and is added when you create a new addon with the `ember addon <addon-name>` command.

`c3` and `d3` are the graphing library's npm packages. [`ember-auto-import`](https://github.com/ef4/ember-auto-import) is an addon that imports npm packages into Ember apps. 

`broccoli-funnel` and `broccoli-merge-trees` are used in the top level `index.js` to import the `C3.js` CSS files into the addon.

During the build process, `ember-cli` will only incorporate the npm packages that are described in your `dependencies` graph and will omit anything in the `devDependancies`.

## Addons as dependencies

Addons can also use other addons as dependencies. For example, this partial package.json is from the addon [`ember-power-select`](https://ember-power-select.com). It uses the addons [`ember-concurrency`](http://ember-concurrency.com/docs/introduction/), [`ember-text-measurer`](https://github.com/cibernox/ember-text-measurer), and [`ember-truth-helpers`](https://github.com/jmurphyau/ember-truth-helpers) to support its functionality.

```json
  "dependencies": {
    "ember-basic-dropdown": "^1.1.0",
    "ember-cli-babel": "^7.2.0",
    "ember-cli-htmlbars": "^3.0.1",
    "ember-concurrency": "^0.8.26",
    "ember-text-measurer": "^0.5.0",
    "ember-truth-helpers": "^2.1.0"
  },
  "devDependencies": {
    "@ember/optional-features": "^0.6.3",
    "broccoli-asset-rev": "^2.7.0",
    "ember-cli": "~3.6.0",
    "ember-cli-blueprint-test-helpers": "^0.19.1",
    "ember-cli-dependency-checker": "^3.0.0",
    "ember-cli-fastboot": "^2.0.0",
    "ember-cli-htmlbars-inline-precompile": "^2.1.0",
    "ember-cli-inject-live-reload": "^2.0.1",
    "ember-cli-mirage": "^0.4.10",
    "ember-cli-sass": "^8.0.1",
    "ember-cli-template-lint": "^1.0.0-beta.1",
    ...
  }
```

In this case, Ember CLI will incorporate these addons along with the other dependencies when `ember-power-select` is used in your applications.

[Ember Observer](https://emberobserver.com) is a good resource when developing addons. Reviewing the code and dependencies of existing addons can provide insights when creating a new addon.

## Dummy app dependencies

In addons, the `dummy app` is really the project and uses the root level `package.json` file for dependencies. The dummy app automatically treats the containing addon as a dependency without adding it to the `package.json`. This makes it easy to use the dummy app for testing and documenting your addon's usage.


<!-- The wrapper example should include more information on dependencies in addons  -->
