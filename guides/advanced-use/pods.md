Ember supports two different project structures - `classic` and `pods-based`.

The classic project structure organizes the filesystem by entity types.  For example, if you have a `post` resource and a `tags` component in your project, the `classic` structure would have this filesystem:

```sh
app
├── components
|   └── tags.js
├── controllers
|   └── post.js
├── models
|   └── post.js
├── routes
|   └── post.js
└── templates
    ├──components/tags.hbs
    └── post.hbs
```

Pods-based projects organize files by features, combining all entity files into a common directory.  The aforementioned example as a `pods-based` project would have this filesystem:

```sh
app
├── components
|   └── tags
|       ├── component.js
|       └── template.js
└── post      
    ├── controller.js
    ├── model.js
    ├── route.js
    └── template.hbs
```
To create the pods structure in an application you add the `--pod` option the the `ember generate` command.  For example, to generate the `tags` component, you would run `ember generate component tags --pod`.

As your app becomes larger, a feature-driven structure may be better. Splitting your application by functionality/resource would give you more power and control to scale and maintain it.

### Classic or Pods?
<!-- Is this going to be confusing? -->
Ember projects do not have to be either `classic` or `pods-based`, they can also be mixed projects. As a default, if a file is not found on the pod structure, the Ember Resolver will look it up within the classic filesystem structure.

If you start with a `classic` project, you can switch to the `pods-based` filesystem as your project grows without changing the existing `classic` filesystem. You can migrate the `classic` structure as time allows in the future.

### Pods as Default
If you would like to use the pods structure as the default without using the `--pod` option, you can set `usePods` in `.ember-cli`:

```js
// .ember-cli
{
    "usePods": true
}
```

### podModulePrefix
Rather than hold your resource directories on the root of your app you can define a POD path using the attribute podModulePrefix within your environment configs. The POD path should use the following format: `{appname}/{poddir}`.

```js
// config/environment.js
module.exports = function(environment) {
  let ENV = {
    modulePrefix: 'my-new-app',
    // namespaced directory where resolver will look for your resource files
    podModulePrefix: 'my-new-app/pods',
    environment: environment,
    rootURL: '/',
    locationType: 'auto'
    //...
  };

  return ENV;
};
```

Then your directory structure would be:

```sh
app
└── pods
    ├── components
    |   └── tags
    |   ├── component.js
    |   └── template.js
    └── post      
        ├── controller.js
        ├── model.js
        ├── route.js
        └── template.hbs
```

### Module Unification

<!-- some statement on module unification, see Ember [RFC #0143](https://github.com/emberjs/rfcs/blob/master/text/0143-module-unification.md) for details on module unification -->
