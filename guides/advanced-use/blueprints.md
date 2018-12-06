Have you ever wanted to define your own custom boilerplate when you create new files in an Ember app? You can do that with blueprints. Blueprints are snippet generators used to create the entities — components, routes, services, models and more — used in your applications. Blueprints allow us to share common Ember patterns in the community. Developers can define blueprints for use in their applications or addons.

Ember's built-in [blueprints](https://github.com/emberjs/ember.js/tree/master/blueprints) are a source of detailed examples to help you learn more about blueprints.  The Ember CLI API docs on [blueprints](https://ember-cli.com/api/classes/Blueprint.html) provide advanced information for developing blueprints.

To see a list of all available blueprints with short descriptions of what they do, run `ember generate --help` or `ember help generate`.

### Generating Blueprints

This is an example of how to generate a standard Route blueprint.

```sh
 ember generate route foo

installing route
  create app/routes/foo.js
  create app/templates/foo.hbs
updating router
  add route foo
installing route-test
  create tests/unit/routes/foo-test.js
```

As the example shows, blueprints can create files and change existing project files.

### Defining a Custom Blueprint

You can define your own blueprints using `ember generate blueprint <name>`:

```sh
ember generate blueprint foo

installing blueprint
  create blueprints/foo/index.js
```

If you want to also generate tests with the `foo` blueprint, you need to create a `foo-test` blueprint.

```sh
ember generate blueprint foo-test

installing blueprint
  create blueprints/foo-test/index.js
```

Blueprints in your project’s directory take precedence over those packaged with Ember CLI. This makes it easy to override the built-in blueprints by generating one with the same name.

### Blueprint Structure

Blueprints follow a simple structure. Let’s use the built-in helper blueprint as an example:

```sh
  blueprints/helper
  ├── files
  │   ├── __root__
  │   │   └── helpers
  │   │       └── __name__.js
  └── index.js
```

The accompanying test is in another blueprint. It has the same name with a `-test` suffix and will be generated with the helper blueprint.

```sh
  blueprints/helper-test
  ├── files
  │   └── tests
  │       └── unit
  │           └── helpers
  │               └── __name__-test.js
  └── index.js
```

When creating a custom blueprint, only the `index.js` file is created. The `files` directory structure and all template files must be manually created.

#### files

The files directory has file templates to be installed into the target directory.

#### `_name_`

The name token is replaced with the dasherized entity name at install time. For example, when the user invokes `ember generate controller foo` then  `_name_` becomes `foo`.

#### `_root_`

The `_root_` token is replaced with either `app` or `addon` depending upon where it is being generated. This token is used to provide support for generating blueprints inside addons.


### Template Variables (AKA Locals)

Variables can be inserted into templates with `<%= someVariableName %>`.

For example, the built-in `util` blueprint `files/app/utils/**name**.js` looks like this:

```javascript
export default function <%= camelizedModuleName %>() {
  return true;
}
```

`<%= camelizedModuleName %>` is replaced with the real value at install time.

Invoking

```sh
ember generate util count-down
```

would create

```javascript
export default function CountDown() {
  return true;
}
```

Out of the box, Ember CLI provides the following template variables:

- `dasherizedPackageName`
- `classifiedPackageName`
- `dasherizedModuleName`
- `classifiedModuleName`
- `camelizedModuleName`

`packageName` is the project name as found in the project’s `package.json`.

`moduleName` is the name of the entity being generated.

More custom variables can be created using the `locals` hook, as documented below.

### Index.js

Overriding the blueprint hooks allows for implementing custom installation and uninstall behavior. The blueprint's description and command options are also defined in the `index` file.

For example, `ember help generate foo` would show

```sh
   foo <name> <options...>
        Generates a foo
        --type (String) (Default: )
```

`index.js` should export a plain object, which will extend the prototype of the Blueprint class. If needed, the original Blueprint prototype can be accessed through the `_super` property.

```javascript
// index.js
module.exports = {
  description: "Generates a foo",

  availableOptions: [
    {
      name: "type",
      type: String,
      default: ""
    }
  ],

  locals(options) {
    // Return custom template variables here
    return {};
  },

  normalizeEntityName(entityName) {
    // Normalize and validate entity name here
    return entityName;
  },

  fileMapTokens(options) {
    // Return custom tokens to be replaced in your files
    return {
      __token__(options) {
        // Logic to determine value goes here
        return "value";
      }
    };
  },

  filesPath(options) {
    // Override the default files directory
    // Useful for switching between file sets conditionally
    return "my-files";
  },

  files() {
    // Override the list of files provided by the blueprint
    // Useful if you want to exclude certain files conditionally
    return ["my-file.js"];
  },

  beforeInstall(options) {},
  afterInstall(options) {},
  beforeUninstall(options) {},
  afterUninstall(options) {}
};
```

### Blueprint Hooks

As shown above, the following hooks are available to blueprint authors:

- `locals`
- `normalizeEntityName`
- `fileMapTokens`
- `filesPath`
- `files`
- `install`
- `beforeInstall`
- `afterInstall`
- `beforeUninstall`
- `afterUninstall`

Use `locals` to add custom template variables. The method receives one argument: options. Options is an object containing general and entity-specific options.

From the command line:

`ember generate controller foo --type=array --dry-run isAdmin:true`

The object passed to `locals` looks like this:

```json
{
  "entity": {
    "name": "foo",
    "options": {
      "isAdmin": "true"
    }
  },
  "dryRun": true,
  "type": "array"
}
```

<!-- Old Ember CLI docs or api examples are not correct -->
<!-- PR https://github.com/ember-cli/ember-cli/pull/8210 to fix api docs -->

<!-- Options object is extensive and not documented anywhere.  Should be included in Ember CLI API docs -->

This hook must return an object or a Promise which resolves to an object. The resolved object will be merged with the before mentioned default `locals`.

### normalizeEntityName

Use the `normalizeEntityName` hook to add custom normalization and validation of the provided entity name. The default hook does not make any changes to the entity name. It verifies an entity name is present and that it doesn't have a trailing slash.

This hook receives the entity name as its first argument. The string returned by this hook is the new entity name.

### fileMapTokens

Use `fileMapTokens` to add custom `fileMap` tokens for use in the `mapFile` method. The hook must return an object in the following pattern:

```javascript
{
  __token__: function(options){
    // logic to determine value goes here
    return 'value';
  }
}
```

It will be merged with the default `fileMapTokens`, and can be used to override any of the default tokens.

Tokens are used in the files directory (see files), and get replaced with values when the `mapFile` method is called.

### filesPath

Override the default files directory. Useful for switching between file sets conditionally based on options passed during generation

### files

Override the list of files provided by the blueprint. Useful if you want to exclude certain files conditionally.

### beforeInstall & beforeUninstall

Called before any of the template files are processed and receives the same arguments as locals. Typically used for validating command line options.

### afterInstall & afterUninstall

The `afterInstall` and `afterUninstall` hooks receive the same arguments as `locals`. Use it to perform any custom work after the files are processed. For example, the built-in `route` blueprint uses these hooks to add and remove relevant route declarations in `app/router.js`.

<!-- Was in the old docs but the install hook would be very specialized/advanced use case.  Does it need to be documented in the guides? -->
### install

The `install` hook installs the blueprint and is not normally used when developing blueprints. The hook can be used for advanced blueprints, for example if you don't want your blueprint to install any files.

See the Ember CLI [source](https://github.com/ember-cli/ember-cli/blob/master/lib/models/blueprint.js) for `install` hook details.

## Pod blueprints

Pod-based applications use a different file structure giving you more control to scale and maintain large applications. To support pods, the blueprint needs a different structure. Blueprints supporting pods are universal and will support both pods and classic applications.

To see which blueprints support the `--pod` option, you can use the help command. For example, `ember help generate component` will give you the list of options for the component blueprint, one of them being `--pod`.

Generate supported blueprints with a pods structure by passing the `--pod` option.

```sh
 ember generate route foo --pod

installing route
  create app/foo/route.js
  create app/foo/template.hbs
updating router
  add route foo
installing route-test
  create tests/unit/foo/route-test.js
```

If you have `podModulePrefix` defined in your environment, your generated pod path will be prefixed with it.

```sh
// podModulePrefix: app/pods
ember generate route foo --pod

installing
  create app/pods/foo/route.js
  create app/pods/foo/template.hbs
installing
  create tests/unit/pods/foo/route-test.js
```

Blueprints that don't support pods structure will ignore the `--pod` option and use the default structure. Blueprints that support the pods structure will also use the default structure when generated without the `--pod` option.

Generate a blueprint that supports the `--pod` option without the option:

```sh
 ember generate route foo

installing route
  create app/routes/foo.js
  create app/templates/foo.hbs
updating router
  add route foo
installing route-test
  create tests/unit/routes/foo-test.js
```

If you would like to use the pods structure as the default for your project, you can set `usePods` in `.ember-cli`:

```javascript
// .ember-cli
{
    "usePods": true
}
```

With `usePods` turned on, the following would occur when generating a route in the pods structure:

```sh
ember generate route taco

installing
  create app/taco/route.js
  create app/taco/template.hbs
installing
  create tests/unit/taco/route-test.js
```

To generate or destroy a blueprint in the classic structure while `usePods` is activated, you can use the `--classic` flag:

```sh
ember generate route taco --classic

installing
  create app/routes/taco.js
  create app/templates/taco.hbs
installing
  create tests/unit/routes/taco-test.js
```

### Defining a Custom Pods Blueprint

Blueprints in pods applications are created in the same way as classic applications. You define your own blueprints using `ember generate blueprint <name>`:

```sh
ember generate blueprint foo

installing blueprint
  create blueprints/foo/index.js
```

### Pods Blueprint Structure

Blueprints that support pods structure look a little different. Let’s take the built-in controller blueprint as an example:

```sh
  blueprints/controller
  ├── files
  │   ├── __root__
  │   │   └── __path__
  │   │       └── __name__.js
  └── index.js

  blueprints/controller-test
  ├── files
  │   └── tests
  │       └── unit
  │           └── __path__
  │               └── __test__.js
  └── index.js
```

As with classic Ember applications, only the index.js file is automatically created. The files directory structure and all template files must be manually created.

#### files

The files directory contains templates for all the files to be installed into the target directory.

#### `_name_`

When the `--pod` flag is used, invoking `ember generate controller foo --pod` replaces `_name_`  with `controller`.

If the blueprint is generated without the `--pod` option, `_name_` would be replaced with `foo`.

#### `_path_`

When the `--pod` flag is used, invoking `ember generate controller foo --pod` replaces  `_path_` with foo (or <podModulePrefix>/foo if the podModulePrefix is defined).

If the blueprint is generated without the `--pod` option, `_path_` becomes `controller`.

#### `_root_`

The root token is replaced with either `app` or `addon`. This token is used to provide support for generating blueprints inside addons.

#### `_test_`

The  `_test_` token is replaced with the dasherized entity name and appended with `-test` at install time. 

### Pods Template Variables and Blueprint Hooks

Template variables and hooks for pods blueprints are the same as classic applications. 

There is a special case where you need to override the `fileMapTokens` hook for blueprints that support both pods and classic applications.

For example, an Ember route named `foo` has this structure in a classic application:

```sh
  app
   ├── routes
   │   └── foo.js
   └── templates
       └── foo.hbs
```

In a pods application, the same route would have this structure

```sh
  app
   └── foo
       ├── route.js
       └── template.hbs
```

The blueprint structure for a route or a similar custom blueprint would be:


```sh
  blueprints/route
  ├── files
  │   ├── __root__
  │   │   ├── __path__
  │   │   |   └── __name__.js
  │   │   └── __templatepath__
  │   │       └── __templatename__.hbs
  └── index.js
```

The index file for the blueprint would override the `fileMapTokens` hook to assign `_templatepath_` and `_templatename_`:

```javascript
// index.js
module.exports = {
  fileMapTokens(options) {
    return {
      __templatepath__(options) {
        if (options.pod)
        return options.dasherizedModuleName;
        else
          return "templates";
      },
      __templatename__(options) {
        if (options.pod)
          return "template";
        else
          return options.blueprintName;
      }
    };
  },
};
```

The options object passed to `fileMapTokens` is:

```json
{
  "blueprintName": "route",
  "dasherizedModuleName": "foo",
  "hasPathToken": false,
  "inAddon": false,
  "inDummy": false,
  "inRepoAddon": null,
  "locals": {},
  "originBlueprintName": "route",
  "pod": false,
  "podPath": null
}
```

As mentioned above, Ember's built-in [blueprints](https://github.com/emberjs/ember.js/tree/master/blueprints) provide detailed examples on how to create custom blueprints.

## Addon blueprints

As in applications, custom blueprints are available in addons.  Addon blueprints are used to generate code snippets in the client application.  Addons can also have a default blueprint that will run automatically after the addon is installed.

Addon blueprints have the same structure as regular blueprints.  The default blueprint has extra hooks to install packages and/or install another Ember addon into the client app.

To create the default blueprint, use `ember generate blueprint <addon-name>`

```js
// blueprints/<addon-name>/index.js
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

#### addBowerPackageToProject

Installs a Bower package or dependency into the client application.
Bower is a package manager that is [no longer recommended for new projects](https://bower.io/),
but you may find this hook used in older addons.

#### addPackageToProject

Installs an npm package or dependency into the client application

Each of the hooks returns a promise, so they can all be chained with `.then()`. The following is an example of each of these:

```js
// blueprints/ember-cli-x-button/index.js
module.exports = {
  normalizeEntityName() {}, // no-op since we're just adding dependencies

  afterInstall() {
    // Add addons to package.json and run defaultBlueprint
    return this.addAddonsToProject({
      // a packages array defines the addons to install
      packages: [
        // name is the addon name, and target (optional) is the version
        {name: 'ember-cli-code-coverage', target: '0.3.9'},
        {name: 'ember-cli-sass'}
      ]
    })
    .then(() => {
      // Add npm packages to package.json
      return this.addPackagesToProject([
        {name: 'babel-eslint'},
        {name: 'eslint-plugin-ship-shape'}
      ]);
    })
    .then(() => {
      return this.addBowerPackagesToProject([
        {name: 'bootstrap', target: '3.0.0'}
      ]);
    });
  }
};
```

### Blueprint Config

The default blueprint is recognized because it normally has the same name as the addon.  Optionally, you may specify a different name for the "defaultBlueprint" in `package.json`:


```js
"ember-addon": {
  // addon configuration properties
  "configPath": "tests/dummy/config",
  "defaultBlueprint": "blueprint-that-isnt-package-name",
}
```

