# Tutorial: addon components

This tutorial will cover how to make a component addon from start to finish, including:
- generating the files
- adding stylesheets that other apps can use
- seeing changes locally
- getting your addon included on [Ember Observer](https://emberobserver.com) after it is published

## Creating the addon

First, we need to create an addon's file structure. Run this command outside of an existing Ember app:

```bash
ember addon <addon-name> [options]
```

## Generating a component

If we want to create an addon component that can be shared between apps, the process is a lot like creating a normal app component:

```bash
ember generate component <component-name>
```

However, in the context of an addon, this creates more files than we would see in an app:

```
  create addon/components/<addon-name>.js
  create addon/templates/components/<addon-name>.hbs
  create tests/integration/components/<addon-name>-test.js
  create app/components/<addon-name>.js

```

Some files go in the `app` directory, while others go into the `addon` directory. We'll start by looking at the addon directory. Whatever we put in the `<component-name>.hbs` file is what could be used immediately in an app, and will be referenced in templates as `{{component-name}}`.

Let's say that our addon should wrap some content in a button tag. The addon template should look like this:

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

** From the addon project directory:**
1. Since our addon uses a template, we need the template precompiler to be a `dependency` and not a `devDependency`. In the addon's `package.json`, move the entry for `ember-cli-htmlbars` into the `dependencies` listing. If this step is missed, there is a clear error message when we try to start the app that uses our addon.
2. `yarn install` or `npm install`
3. Run the command `yarn link` or `npm link`

** From the directory of the app using the addon:**
1. `yarn link <addon-name>` or `npm link <addon-name>`.
2. In the Ember app's `package.json`, add a `devDependencies` entry for your addon, like `"addon-name": "*"`. The `*` means that it will include all version numbers of our addon.
3. Run `yarn install` or `npm install` in the app
4. Add a reference to your addon's component somewhere in an app template, like `{{component-name buttonLabel="Register"}}`
5. Run a local server with `ember serve` and visit [http://localhost:4200](http://localhost:4200)

We should now see our addon in action!

**Having problems?**
- Check to make sure that your `package.json` is valid, looking for missing commas or trailing commas. 
- "Template precompiler" errors mean that you skipped Step 1 and 2 above. 
- `404 not found` means we forgot to `yarn` or `npm install` 
- Make sure all the files have been saved.
- Did you rename or relocate any files after they were created? This is prone to mistakes, and the resulting errors can be really strange. It is best to create files using the CLI. 

### Making a UI component available in block form

In an Ember app, components can be used in ["simple" or "block" form](https://guides.emberjs.com/release/components/wrapping-content-in-a-component/). Addon templates have the same capabilities. The simple form allows data objects or configuration values to be passed to the addon. The block form allows a developer to pass in their own template, content, and interactivity.

In an Ember app, a block style component uses the `{{yield}}` helper as a placeholder for where the passed-in content will go. It is the same in an Ember addon. 

Let's change our button addon we made earlier so that developers can pass in their own handlebars content by using the `{{yield}}` helper:

```hbs
<!-- addon/templates/components/<addon-name>.hbs -->

<button>{{yield}}</button>
```

Now, an app can use the addon with their own content inside:

```hbs
<!-- This is a handlebars file in the app using the addon -->

{{#addon-name}}
  Register <img href="./images/some-cute-icon.png" alt="">
{{/addon-name}}
```

Whatever goes inside the block form addon will show up where the `{{yield}}` was. This is the markdown that renders in the app:

```html
<!-- markdown rendered by running the app -->

<button>
  Register <img href="./images/some-cute-icon.png" alt="">
</button>
```

### Styling a UI component addon

Addon developers have many options for handling styles within their addons. For example, we could stick to plain old CSS, or use a preprocessor like Less or Sass. Most addon authors prefer Sass. We could automatically style the UI elements when they are used in an app, or we could let the developer who installed the addon choose which stylesheets to include. Here are a few different approaches. Luckily, the Ember CLI handles most of the work for us and we don't have to worry about the inner workings of asset compilation.

#### Automatically including CSS stylesheets in addons

To automatically include CSS styling for your addon, create a `styles` directory in the `addon` directory, and place your CSS files in it. For example, we could create `addon/styles/our-addon-name.css`.

When our addon is used in an app, these CSS rules will be added to the end of the app's `vendor.css` when it is built or served. The rules will be in the same scope as the rest of the app's css, so name your class selectors wisely! Otherwise they will clash with the styles of other addons or the app's own styling.

For example, writing a CSS rule for `div` is problematic, because it will affect all `div`s in the app, but a rule targeting `.my-app-name div` is probably fine.

Let's add a class to our template and some styles to target the class:

```hbs
<!-- addon/templates/components/<addon-name>.hbs -->

<button class="addon-name-button">{{yield}}</button>
```

```css
/* addon/styles/our-addon-name.css */

.addon-name-button {
  padding: 10px;
}
```

Now any buttons made using our addon will have the `padding: 10px` rule applied.

#### CSS stylesheets that require importing from addons

For some addons, it makes sense to give the developer the option to import the stylesheet we provide, or import no stylesheets at all. Using this approach, we could even offer the developer a few themes to choose from.

We can do this by creating stylesheets in the `app/styles/` directory instead. These stylesheets share a file namespace with the consuming app and all the other addons someone is using, so name them wisely. For example, if we name our stylesheet `addon.css`, that's likely to clash. Just as before, it's important to choose uniquely named targets for the CSS rules so that they don't clash with other addons or the app. 

Let's create `app/styles/our-addon-name.css` and add a rule to it: 

```css
/* addon/styles/our-addon-name.css */

.addon-name-button {
  border: black solid 2px;
}
```

For the stylesheet to be active in the app the addon is used in, the developer for that app must explicitly `import` the stylesheet by name. This must be done at the very top of the app's `app.css` file.

```css
@import 'our-addon-name.css'
/* The app's own app/styles/app.css */
```

Then, restart your local server to see the changes in action.

If there are any problems getting this to work, one strategy is to build the addon with `ember build` and look inside the `dist` folder. The `dist` folder may be hidden by default in some code editors. The `dist` folder gives clues about what the consuming app sees as the file structure of the addon. See if the stylesheets are in `dist/assets/`. Then, in the Ember app, run `ember build` and look in the `dist` folder. We should see our stylesheets in `dist/assets` of the app too.

#### Using CSS preprocessors for the addon's stylesheets

While this guide focuses on the "out of the box" behavior of addons and the Ember CLI, there are some well-established patterns for handling stylesheets in a way that is scalable and maintainable. A CSS preprocessor like Sass allows you to nest style rules, use variables, and do simple mathematical operations.

The best way to learn how to use CSS preprocessors in your addon is to consult the documentation for the preprocessor addon of your choice, and study how other addon authors have implemented stylesheets. For example, [ember-styleguide](https://github.com/ember-learn/ember-styleguide/) is a UI component library that was made for the main Ember websites. It uses [ember-cli-sass](https://www.emberobserver.com/addons/ember-cli-sass) to manage styles. You can search [Ember Observer](https://emberobserver.com) for many more examples of styling in action!

### Adding UI functionality with JavaScript

There are two main types of JavaScript functionality that an addon can provide:

1. API methods that developers can use after importing your addon
2. Interactive features that are part of UI components. 

We'll cover UI use cases first.

Interactivity in an addon can be handled the same way that it is done for an Ember app's component. Every addon component template has a corresponding JavaScript file to go with it. For example, an addon can have its own actions, computed properties, and imported dependencies. Developers using the addon can pass in their own actions and attributes.

For more information about building interactivity for your addon, reference the [Ember Guides components section](https://guides.emberjs.com/release/components/defining-a-component/). Remember to test as you work!

### Providing multiple templates in one addon


## Writing a JavaScript utilties addon

Many addons have no UI components in them, or they offer a combination of JavaScript utilities and template helpers. In the regular npm ecosystem, JavaScript utility libraries are some of the most common packages. Although we could write a normal node package, providing an Ember addon to developers has some advantages. The developers don't need to worry about how to import a normal npm package. They can use `ember install our-addon-name` and get going right away. An addon can also take advantage of Ember or Ember CLI-specific APIs.

### Providing public API methods in the addon

After we've created our addon file structure with `ember addon <addon-name>`, we can write some functions that will be available for an app to use. Such functions are commonly referred to as "public API." If the behavior of public API changes, it's convention in the Ember community to follow semver and change the major version of the addon. [Semver](https://semver.org/) is a cross-program-language versioning scheme that helps other developers or coworkers know which versions of a library will require them to refactor their apps.

All npm packages have an entry point. By default, the entry point is named `{addonName}/index.js`, at the top level inside the addon. The files exported from `addon/index.js` will be available to developers using the addon in their apps.

Let's add some public methods to our addon! Don't forget to `export` your methods.

```js
// addon/index.js

const moreEnthusiasm = function (phrase) {
  return phrase + '!!!';
}

export { moreEnthusiasm }
```

Now, let's use the methods in an app:

```js
// The JavaScript file of some component in an app

import Component from '@ember/component';
import { moreEnthusiasm } from 'ember-addon-name';

export default Component.extend({
  actions: {
    confirmExcitement() {
      console.log(moreEnthusiasm('We made an addon'))
      // prints "We made an addon!!!" to the console
    }
  }
});

```

### Organizing public API code

One common pattern for managing an addon's JavaScript code is to define the methods in many separate files, perhaps grouped into subfolders, import them into `index.js`, and then export them.

For example, an `index.js` file might contain nothing more than imports and exports:

```js
import { moreEnthusiasm, curbedEnthusiasm } from 'our-app-name/utilities/enthusiasm.js'

export { moreEnthusiasm, curbedEnthusiasm };
```

### How to keep learning

This is a very tiny example of what addons can do in terms of providing JavaScript utilties to apps. For more advanced techniques, study other well established addons. Just like there are many ways and reasons to build an Ember app, the same is true for addons!

## Writing an npm package wrapper

<!-- Help wanted! -->
<!-- This section should mention when this is not necessary, and link to helpful resources like ember-auto-import -->

## In-repo addons

If the addon is just meant to be used in a single project, an "in-repo" addon could be created instead. The benefits are that it is lightweight and the developer has access addon APIs, like adding packages and commands. However, there are some major limitations: an in-repo addon can't be shared between apps, versioned independently, or published to npm. 

From within an existing Ember app, create an in-repo addon:

```bash
ember generate in-repo-addon <addon-name> [options]
```

This generates a folder called `lib/<addon-name>` that contains its own `package.json` and an `index.js` file.

The most common use case for an in-repo addon is when there is a chance a component really should be a standalone library instead, but it is not yet clear if it should be broken out from the main app. Another reason is that it can be helpful for enforcing separation of concerns within an app.

## Other kinds of addons

<!-- Is there anything meaningful to say here? -->

## Documenting addons

For other developers to discover and use our addon, we need to teach them how to use it! 

Here are the most common ways that addons provide user-facing documentation:

- A detailed README on the GitHub project
- Creating a documentation website in the addon's dummy app, found in `/tests/dummy/`
- A combination of these two

It can be a lot of work to document an addon, so some seasoned addon contributors created [ember-cli-addon-docs](https://github.com/ember-learn/ember-cli-addon-docs), which provides templates for creating a site that shows off your addon. It's a documentation resource and demo in one. Many addon authors choose to host their documentation sites on [GitHub pages](https://help.github.com/articles/what-is-github-pages/), which is free and built into GitHub.

What about documentation of the code itself? Many JavaScript documentation tools have not caught up to ES6-style modules and classes, so the best bet is to look at how some popular addons handle code comments and find a style that works for you. If your code is well commented, it will help out new contributors and reduce the number of issues that others open.

<!-- Help wanted - any best practices for code comments??? -->

Lastly, be sure to provide a few notes about how others can contribute to the project! These notes commonly go in a `README.md` or `CONTRIBUTING.md` file.

## Testing an addon

<!-- help wanted -->

## Advanced addon configuration

<!-- Help wanted! -->