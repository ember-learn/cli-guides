[Tailwind](https://tailwindcss.com/) is a popular way to use utility-first classes in projects that helps unify large projects using design-tokens-as-code.

To use Tailwind with Ember, this guide follows the [Tailwing Getting Started](https://tailwindcss.com/docs/installation) guide, with some minor tweaks to file names and their locations.

To get started, installing the following dependencies
```shell
npm install autoprefixer postcss tailwindcss
```

then, from your project's root directory add the following files:

- `tailwind.config.js`

  ```js
  'use strict';

  module.exports = {
    content: [`./app/**/*.{html,js,ts,hbs}`],
    theme: {
      extend: {  },
    },
    plugins: [],
  };
  ```

- `postcss.config.js`

  ```js
  'use strict';

  module.exports = {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    }
  }
  ```

- `tailwind-input.css`

  ```css
  @tailwind base;
  @tailwind components;
  @tailwind utilities;
  ```

Now we need to add some scripts to the package.json to make
interacting with the tailwind CLI a little easier.

```
"tailwind:build": "npx tailwindcss -i ./tailwind-input.css -o ./public/assets/tailwind.css",
"tailwind:watch":
  "npx tailwindcss -i ./tailwind-input.css -o ./public/assets/tailwind.css --watch",
"build": "npm run tailwind:build && ember build --environment=production",
```

In addition to the two new scripts, `tailwind:build` and `tailwind:watch`, the `build` script, which was pre-existing for production builds, has been prefixed with a call to `tailwind:build` so that the tailwind assets are prepped for shipping to production (useful for C.I.)

The above scripts expect that an input file, `./tailwind-input.css` will exist, and the tailwind CLI will output the compiled styles at `public/assets/tailwind.css`. Since this tailwind.css output file is in the public folder, changes to it will cause the `ember s` command to rebuild.

A couple notes though:
 - `num run tailwind:watch` must be run in a separate terminal for development
 - it may be benificial to add `public/assets/tailwind.css` to the `.gitignore`

Lastly, we need to edit the `app/index.html` file to include the `tailwind.css` file:

```html
<link integrity="" rel="stylesheet" href="{{rootURL}}assets/tailwind.css">`
```