In an Ember project, the command `ember install <package-name>` installs addons and other npm packages as devDependencies in the top level `package.json`.

Some project packages such `ember-cli-app-version` and `broccoli-asset-rev` are only used during development or the application build process. The package `ember-cli-htmlbars` is a dependency that must be included in a production build. 

During the build process, the Ember CLI will only incorporate the addons and packages needed to distribute the application.

With addons, the `dummy app` is the project and the addon will seem like a dependency of the dummy app. This makes it easy to use the dummy app for testing and documenting your addon's usage.

In an addon, packages are installed in both dependencies and devDependencies:

- the addon's dependencies are installed as dependencies
- the `dummy app` dependencies are installed as devDependencies  

The partial package.json example below is from the [`ember-c3`](https://github.com/Glavin001/ember-c3) addon that is a wrapper for the [C3.js Graph Library](https://c3js.org/).


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

[Ember Observer](https://emberobserver.com) is a good resource when developing addons. Reviewing the code and dependencies of existing addons can provide insights for creating a new addon.

<!-- The wrapper example should include more information on dependencies in addons  -->
