# Addons

The modern web developer has an incredible selection of open source code that they can use through the npm ecosystem, plus great tools for writing their own modules. Ember developers are free to use regular npm packages in their apps, but there are also thousands of packages that are made specifically for the Ember ecosystem. We call such packages "addons."

Addons are often JavaScript code, reusable UI components, compiling tools, deployment pipelines, templates, stylesheets, and more. Think of addons as node.js libraries with superpowers. In addition to the usual functionality of an npm package, addons can also help with generating new files, preprocessing, file fingerprinting, and more.

In this guide, we'll cover:
- Finding and using community addons
- Addon file structure
- Writing your addon within an app
- Writing an addon that can be shared
- Turning a regular npm package into an addon
- Testing addons
- Managing assets
- and more

## Finding and using community addons

[Ember Observer](https://www.emberobserver.com/) is the definitive way to explore community addons. Although addons can be found by [searching the npm repository directly](https://www.npmjs.com/search?q=ember), Ember Observer has ranked lists of the most popular addons and ratings to help developers choose between them. Most are made to drop right into your app with zero configuration. Many addons are backwards-compatible to earlier versions of Ember too!

To install an addon, use:

```bash
ember install <addon-name>
```

To be safe, it's a good idea to restart the local server after installing new dependencies, and especially before trying to debug an addon that isn't working.

The `ember install` command is similar to the `npm install` you might already be familiar with. It creates an entry in the app's `package.json` and downloads the addon and its dependencies into a `node_modules` directory. However, `ember install` does even more than `npm`. Some addons create new files or make modifications to your app when they are installed via `ember install`.

### Choosing an addon

The [top 100 list](https://www.emberobserver.com/lists/top-addons) is an important first stop for new developers. Many Ember users have a personal set list of addons that they include in all their apps, and this is the best way to find out what those addons might be. Some addons are totally unique to Ember, while others exist to make it easier to use features of regular npm packages within an app.

For example, these community-authored addons bring in familiar functionality from regular npm packages:

- Stylesheet tooling like [ember-cli-sass](https://www.emberobserver.com/addons/ember-cli-sass), which provides [SASS](https://sass-lang.com/) as an alternative to plain CSS
- JavaScript utilities like [ember-moment](https://www.emberobserver.com/addons/ember-moment), which offers some Ember conveniences to the base [moment library](https://www.npmjs.com/package/moment)
- Full UI frameworks and design kits like [ember-bootstrap](https://www.emberobserver.com/addons/ember-bootstrap), [semantic-ui-ember](https://www.emberobserver.com/addons/semantic-ui-ember), and [ember-paper](https://www.emberobserver.com/addons/ember-paper). These offer easier, more reliable, more performant functionality than just using the npm packages directly.

Here are just a few examples of popular community-maintained addons unique to Ember, in no particular order:

- A wealth of UI component libraries, like [ember-power-select]() and [ember-basic-dropdown](https://www.emberobserver.com/addons/ember-basic-dropdown)
- Tools to automate deployment, like [ember-cli-deploy](https://www.emberobserver.com/categories/deployment) and its own ecosystem of plugins
- Testing tools like [ember-test-selectors](https://www.emberobserver.com/addons/ember-test-selectors), to make DOM assertions in testing easier and clearer, and [ember-a11y-testing](https://www.emberobserver.com/addons/ember-a11y-testing) to check for accessibility
- Authentication libraries and plugins, like [torii](https://www.emberobserver.com/addons/torii) and [ember-simple-auth](https://www.emberobserver.com/addons/ember-simple-auth), and [ember-oauth2](https://www.emberobserver.com/addons/ember-oauth2)
- Async and state management tools like [ember-concurrency](https://www.emberobserver.com/addons/ember-concurrency) and [ember-lifeline](https://www.emberobserver.com/addons/ember-lifeline). Don't let a user's impatient clicks kick off 100 API requests.
- [liquid-fire](https://www.emberobserver.com/addons/liquid-fire), for animating things like route transitions to provide a smooth, native-app-like experience.
- and so many more!

Open Source projects like these addons rely on community members helping out. Some addons are sponsored by companies, but many are maintained on 100% volunteer time. If something doesn't work the way you expect, could be better documented, has a bug, or could be added as a new feature, please speak up and pitch in!

## Writing an addon

Writing an addon is a great way to organize code, share it with others, or get the foundational knowledge to contribute to Open Source addons. By separating features into an addon instead of leaving it as an in-app component, more developers can work in parallel and breaking changes can be managed independently. Maintainability goes up, and testing becomes easier.

Since the Ember community has so many addons, one of the best ways to learn more advanced addon development is to study existing addons. If we get stuck or need to see some examples in action, [Ember Observer's code search](https://www.emberobserver.com/code-search) can be very helpful.

Although an addon looks and feels a lot like an Ember app, it is important to work in small steps and validate that each piece is working before writing more code. Developers who are very comfortable with Ember apps might otherwise make a lot of changes and walk into some common pitfalls that can be hard to debug in unison.

### Generating the addon

Use the ember-cli to create the file structure for the addon. Run this command in a fresh directory, not inside an existing Ember app:

```bash
ember addon <addon-name> [options]
```

The result is the creation of a directory called `<addon-name>`, which has many files and looks a bit like an Ember app. We won't need to use all the files to make a useful addon. By convention, _most_ Ember addons start with `ember` in the name, like `ember-basic-dropdown`. This will help other developers find our addon.

<!-- Should we cover in-repo addons at all??? -->
<!-- 
If the addon is just meant to be used in a single project, an "in-repo" addon could be created instead. The benefit is that it is lightweight, but there are some major limitations; an in-repo addon can't be shared between apps, versioned independently, or published to npm. From within an existing Ember app, use:

```bash
ember generate in-repo-addon <addon-name> [options]
```

This generates a folder called `lib/<addon-name>` that contains its own `package.json` and an `index.js` file. 
-->

### Addon file structure

In some ways, an addon is like a mini Ember app. It has a very similar file structure, uses a lot of the same API methods, and can do most things that components are able to do. 

<!-- add a file tree table and explanations -->
<!-- include difference between app and addon namespace folders -->

### Creating an addon component template

To create a component template that can be shared between apps, the process is a lot like creating a normal app component:

```bash
ember generate component <addon-name>
```

However, in the context of an addon, this creates more files than we would see in an app:

```
  create addon/components/<addon-name>.js
  create addon/templates/components/<addon-name>.hbs
  create tests/integration/components/<addon-name>-test.js
  create app/components/<addon-name>.js

```

Some files go in the `app` directory, while others go into the `addon` directory. We'll start by looking at the addon directory. At this stage, whatever we put in the `<addon-name>.hbs` file is what could be used immediately in an app.

Let's say that our addon should wrap some content in a button tag. The addon template looks like this:

```hbs
<!-- addon/templates/components/<addon-name>.hbs -->

<button>{{buttonLabel}}</button>
```

Our goal is to be able to pass the `buttonName` value to the addon, just like we'd pass it to a normal component within an app:

```hbs
<!-- This is a handlebars file in the app using the addon -->

{{addon-name buttonLabel="Register"}}
```

### Trying out the addon template in an app

There are several options to see the addon in action. We could use `npm link` or `yarn link` to try it out locally or publish the addon online. We'll use `link` while we are still developing and testing. 

1. Since our addon uses a template, we need the template precompiler to be a `dependency` and not a `devDependency`. In the addon's `package.json`, move the entry for `ember-cli-htmlbars` into the `dependencies` listing. If this step is missed, there is a clear error message when we try to start the app that uses our addon.
2. From within the addon directory, `yarn install` or `npm install`
3. From within the main addon directory, run the command `yarn link` or `npm link`
4. In the Ember app that should use the addon, do `yarn link <addon-name>` or `npm link <addon-name>`.
5. In the Ember app's `package.json`, add an entry for your addon, like `"addon-name": "*"`. The `*` means that it will include all version numbers of our addon.
6. Run `yarn install` or `npm install`
7. Add a reference to your addon somewhere in an app template, like `{{addon-name buttonLabel="Register"}}`
8. Run a local server with `ember serve`

We should now see our addon in action!

**Having problems?**
Check to make sure that your `package.json` is valid, looking for missing commas or trailing commas. "Template precompiler" errors mean that we forgot Step One. `404 not found` means we forgot to `yarn` or `npm install`. Other errors are likely due to file naming problems. For example, trying to rename an addon or component after it has been created is prone to mistakes. And of course, we need to make sure we saved all the files that we changed along the way. The author of this guide did not make every single mistake in this list while writing it. They learned the hard way not to rename files a long time ago, therefore they made every mistake but that one ;)

### Block form component template

### Adding JavaScript functionality

### Including stylesheets

### Providing multiple components in one addon

## Writing an npm package wrapper

## Documenting addons

## Testing an addon

## Advanced addon configuration