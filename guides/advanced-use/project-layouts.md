Ember CLI offers two different options for the layout of project files - `classic` and `pods`.

## Classic layout
The classic project structure is the default when creating a new Ember app or addon. The classic project structure organizes the filesystem by entity types. 

For example, if you have a `post` resource and a `tags` component in your project, the `classic` structure would have this filesystem:

```shell
app
├── components
|   └── tags.js
|   └── tags.hbs
├── controllers
|   └── post.js
├── models
|   └── post.js
├── routes
|   └── post.js
├── templates
|   └── post.hbs
└── app.js
└── index.html
└── resolver.js
└── router.js
```

The `classic` project provides the easiest way to get started with Ember. It's the easiest way to generate files using Ember CLI.  Addons __should only use__ the `classic` structure for compatibility with either `classic` or `pods-based` consuming applications.

## Pods layout
Pods-based projects organize files by features, combining all entity files into a common directory. The aforementioned example as a `pods-based` project would have this filesystem:

```shell
app
├── components
|   └── tags
|       ├── component.js
|       └── template.js
├── post      
|   ├── controller.js
|   ├── model.js
|   ├── route.js
|   └── template.hbs
└── app.js
└── index.html
└── resolver.js
└── router.js
```

To create a pods structure in an app you add the `--pod` option to the `ember generate` command. For example, to generate the `tags` component, you would run `ember generate component tags --pod`.

As your app becomes larger, a feature-driven structure may be better. Splitting your app by functionality/resource would give you more power and control to scale and maintain it.

Developers who choose the pods structure will need to do more of their file management by hand, and there can be unexpected edge cases, so new Ember users are encouraged to use the `classic` file structure instead.

As mentioned above, addons __should not__ use the `pods` structure

## Classic or pods?
Ember projects do not have to be either `classic` or `pods-based`. They can also be mixed projects. By default, if the Ember Resolver can not find a file in the pod structure, it will look for it in the classic structure.

If you start with a `classic` project, you can switch to the `pods-based` filesystem as your project grows without changing the existing `classic` filesystem. You can migrate the `classic` structure in the future, as time allows.

As stated previously, with `pods` developers need to do more to manage their file structure. The Ember Resolver can manage a `classic`, `pods-based` or `mixed` app but there can be edge cases with a `mixed` app.  

For example, if you happen to have the same route in both the `classic` and `pods-based` structures, which one will the Ember Resolver use?

In this case, the resolver would use the `pods` route and ignore the `classic` route.

## Pods as default
If you would like to use the pods structure as the default without using the `--pod` option, you can set `usePods` in `.ember-cli`:

```json {data-filename=.ember-cli}
{
    "usePods": true
}
```

## podModulePrefix
Rather than keep your resource directories on the root of your app, you can create a `pods` directory and specify its path as the `attribute podModulePrefix` within `config/environment.js` The `pods` path should use the following format: `{appname}/{poddir}`.

```javascript {data-filename=config/environment.js}
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

```shell
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

To follow along with the progress of new features in Ember, check out the Ember [Blog](https://www.emberjs.com/blog/). 
