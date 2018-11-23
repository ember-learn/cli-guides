<!-- cover what blueprints are and how to change them. Can be ported from the existing site -->

Ember CLI ships with support for blueprints. Blueprints are snippet generators used to create the entities — components, routes, services, models and more — used in your applications. Blueprints allow us to share common Ember patterns in the community. Developers can define blueprints for use in their applications or addons.

Ember's builtin [blueprints](https://github.com/emberjs/ember.js/tree/master/blueprints) are a source of detailed examples to help you learn more about blueprints.

To see a list of all available blueprints with a short descriptions of what they do, run `ember generate --help` or `ember help generate`.

### Generating Blueprints

This in an example of how to generate a Route blueprint.

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

Blueprints in your project’s directory take precedence over those packaged with ember-cli. This makes it easy to override the built-in blueprints by generating one with the same name.

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

When creating a custom blueprint only the index.js file is created. The `files` directory structure and all template files must be manually created.

#### files

The files directory contains file templates to be installed into the target directory.

#### \_\_name\_\_

The name token is replaced with the dasherized entity name at install time. For example, when the user invokes `ember generate controller foo` then  _`_name_`_becomes `foo`.

#### \_\_root\_\_

The  _`_root_`_ token is replaced with either `app` or `addon` depending upon where it is being generated. This token is used to provide support for generating blueprints inside addons.

<!-- This has been changed from the original docs to be more clear. Is this technically correct? It could still be improved! -->
This token will cause an additional blueprint to be generated in addons. The blueprint re-exports the module in the addon directory to allow consuming applications to override addon modules easier.


### Template Variables (AKA Locals)

Variables can be inserted into templates with `<%= someVariableName %>`.

For example, the built-in util blueprint files/app/utils/**name**.js looks like this:

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

Out of the box, ember-cli provides the following template variables:

- `dasherizedPackageName`
- `classifiedPackageName`
- `dasherizedModuleName`
- `classifiedModuleName`
- `camelizedModuleName`

`packageName` is the project name as found in the project’s package.json.

`moduleName` is the name of the entity being generated.

More custom variables can be created using the `locals` hook, as documented below.

### Index.js

Overriding the blueprint hooks allows for implementing custom installation and uninstallation behavior. The blueprint's description and command options are also defined in the index file.

For example, `ember help generate foo` would show

```sh
   foo <name> <options...>
        Generates a foo
        --type (String) (Default: )
```

index.js should export a plain object, which will extend the prototype of the Blueprint class. If needed, the original Blueprint prototype can be accessed through the \_super property.

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
- `beforeInstall`
- `afterInstall`
- `beforeUninstall`
- `afterUninstall`

Use `locals` to add custom template variables. The method receives one argument: options. Options is an object containing general and entity-specific options.

Invoking the command line:

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
  // more keys...
}
```

<!-- Old ember-cli docs or api examples are not correct -->
<!-- see PR https://github.com/ember-cli/ember-cli/pull/8210 to fix api docs -->

<!-- Options object is extensive and not documented anywhere.  Should be included in ember-cli API docs -->

This hook must return an object or a Promise which resolves to an object. The resolved object will be merged with the before mentioned default `locals`.

### normalizeEntityName

Use the `normalizeEntityName` hook to add custom normalization and validation of the provided entity name. The default hook does not make any changes to the entity name. It verifies an entity name is present and that it doesn’t have a trailing slash.

This hook receives the entity name as its first argument. The string returned by this hook is the new entity name.

### fileMapTokens

Use `fileMapTokens` to add custom fileMap tokens for use in the `mapFile` method. The hook must return an object in the following pattern:

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

Called before any of the template files are processed and receives the same arguments as locals. Typically used for validating any additional command line options.

### afterInstall & afterUninstall

The `afterInstall` and `afterUninstall` hooks receives the same arguments as locals. Use it to perform any custom work after the files are processed. For example, the built-in route blueprint uses these hooks to add and remove relevant route declarations in app/router.js.

### Overriding install

If you don’t want your blueprint to not install any files you can override `install` blueprint hook.

### Pod Blueprints

Pod based applications use a different file structure to give you more control to scale and maintain large applications. To support pods, the blueprint need a different structure. Blueprints supporting pods are universal and will support both pods and classic applications.

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

Blueprints that don’t support pods structure will ignore the `--pod` option and use the default structure. Blueprints that support pods structure will also use the default structure when generated without the `--pod` option.

Generate a blueprint that supports the `--pod` option without the option

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

If you would like to use the pods structure as the default for your project, you can set usePods in .ember-cli:

```javascript
// .ember-cli
{
    "usePods": true
}
```

With usePods turned on, the following would occur when generating a route in the pods structure:

```sh
ember generate route taco

installing
  create app/taco/route.js
  create app/taco/template.hbs
installing
  create tests/unit/taco/route-test.js
```

To generate or destroy a blueprint in the classic structure while usePods is activated, you can use the `--classic` flag:

```sh
ember generate route taco --classic

installing
  create app/routes/taco.js
  create app/templates/taco.hbs
installing
  create tests/unit/routes/taco-test.js
```

### Defining a Custom Pods Blueprint

Blueprints in pods applications are created the same way as classic applications. You define your own blueprints using `ember generate blueprint <name>`:

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

#### \_\_name\_\_

When the `--pod` flag is used, invoking `ember generate controller foo --pod` replaces _`_name_`_  with `controller`.

If the blueprint is generated without the `--pod` option, _`_name_`_   would be replaced with `foo`.

#### \_\_path\_\_

When the `--pod` flag is used, invoking `ember generate controller foo --pod` replaces  _`_path_`_ with foo (or <podModulePrefix>/foo if the podModulePrefix is defined).

If the blueprint is generated without the `--pod` option, _`_path_`_ becomes `controller`.

#### \_\_root\_\_

The root token is replaced with either `app` or `addon` depending upon where it is being generated. This token is used to provide support for generating blueprints inside addons.

<!-- This has been changed from the original docs to be more clear. Is this technically correct? It could still be improved! -->
This token will cause an additional blueprint to be generated in addons. The blueprint re-exports the module in the addon directory to allow consuming applications to override addon modules easier.

#### \_\_test\_\_

The  _`_test_`_ token is replaced with the dasherized entity name and appended with `-test` at install time. 

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

The index file for the blueprint would override the `fileMapTokens` hook to assign _`_templatepath_`_ and _`_templatename_`_:

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

The options object passed to fileMapTokens is:

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

As mentioned above, Ember's builtin [blueprints](https://github.com/emberjs/ember.js/tree/master/blueprints) provide detailed examples on how to create custom blueprints.