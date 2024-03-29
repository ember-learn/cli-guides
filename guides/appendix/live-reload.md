For most JavaScript dependencies, installing them in your Ember app can be as quick as `npm install <some package name>`.
However, there are some libraries within the JavaScript ecosystem that have additional tooling that needs to integrate
with Ember's live-reload features for the best developer-experience. In this guide, you will learn how to install
and configure libraries to integrate with Ember's live-reload.

In short, any tool that can output or change files automatically can be used to add live-reload behavior.

The process is:

- emit some file to either the `public` or `app` tree
- `link` or `import` the file from existing `ember` code


## Tailwind

An example of this behavior and integration can be shown with a CSS authoring tool, Tailwind.


[Tailwind](https://tailwindcss.com/) is a popular way to use utility-first CSS classes in an app. It can be used within many frontend frameworks, including Ember.

To use Tailwind JIT with Ember, this guide follows the [Tailwind Getting Started](https://tailwindcss.com/docs/installation) guide, with some minor tweaks to file names and their locations.

To get started, install the following dependencies:
```shell
npm install tailwindcss
```

Then, from your project's root directory, add the following files:

- `tailwind.config.js`

  ```js {data-filename="tailwind.config.js"}
  'use strict';

  module.exports = {
    content: [`./app/**/*.{html,js,ts,hbs}`],
    theme: {
      extend: {  },
    },
    plugins: [],
  };
  ```

- `tailwind-input.css`

  ```css {data-filename="tailwind-input.css"}
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

Now we need to add some scripts to the `package.json` to make
interacting with the tailwind CLI a little easier.

```diff {data-filename="package.json"}
+ "tailwind:build": "npx tailwindcss -i ./tailwind-input.css -o ./public/assets/tailwind.css --minify",
+ "tailwind:watch": "npx tailwindcss -i ./tailwind-input.css -o ./public/assets/tailwind.css --watch",
+ "build": "npm run tailwind:build && ember build --environment=production",
- "build": "ember build --environment=production",
```

In addition to the two new scripts, `tailwind:build` and `tailwind:watch`, the `build` script, which was preexisting for production builds, has been prefixed with a call to `tailwind:build` so that the tailwind assets are prepped for shipping to production (useful for C.I.)

The above scripts expect that an input file, `./tailwind-input.css` will exist, and the tailwind CLI will output the compiled styles at `public/assets/tailwind.css`. Since this tailwind.css output file is in the public folder, changes to it will cause the `ember s` command to rebuild.

A couple notes though:
- `npm run tailwind:watch` must be run in a separate terminal for development
- it may be beneficial to add `public/assets/tailwind.css` to the `.gitignore`

Lastly, we need to edit the `app/index.html` file to include the `tailwind.css` file:

```html
<link integrity="" rel="stylesheet" href="{{rootURL}}assets/tailwind.css">
```

With these things in place, you'll be able to use all of Tailwind's capabilities, including JIT compilation.
