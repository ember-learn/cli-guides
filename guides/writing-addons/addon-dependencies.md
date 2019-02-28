In an Ember project, the command `ember install <package-name>` installs all addons and other npm packages as devDependencies in the top level `package.json`.

Some packages such `ember-cli-app-version` and `broccoli-asset-rev` are only used during development or the application build process. The package `ember-cli-htmlbars` would be a dependency that needs to be included in the production build. 

During the build process, the `ember build` command will only incorporate the addons and packages needed to distribute the application.

With addons, the `dummy app` is the project and the addon will seem like a dependency of the dummy app. This makes it easy to use the dummy app for testing and documenting using the addon.

In an addon, packages will be installed in both dependencies and devDependencies. Packages installed as dependencies in `package.json` are the dependencies required by the addon.

Packages installed as devDependencies are the dependencies required by the `dummy app`.  The partial package.json example below is for the `xxxxxx-xxxx` addon. 


```json
 "dependencies": {
    "ember-cli-babel": "^6.16.0",
    "x",
    "y",
    "z"
  },
  "devDependencies": {
    "@ember/optional-features": "^0.6.3",
    "broccoli-asset-rev": "^2.7.0",
    "ember-ajax": "^3.1.0",
    "ember-cli": "~3.4.4",
       ...
  }
```
x, y and z are dependencies of the addon, while the devDependencies are the dependencies for the dummy app. 

<!-- Include a short blub on why the addon has these dependencies, ember-cli-babel ... -->

If you are creating an addon, find similar addons on [Ember Observer](https://emberobserver.com). Reviewing their dependencies and code will give you ideas on what dependencies may be needed for your addon.


<!-- The wrapper example should include more information on dependencies in addons  -->
