<!-- Some content redundancy with using addons and using npm packages pages -->
<!-- A section should clearly show using WASM files, I think -->

This section of the guides will show how to add new dependencies to
an app or addon.
Examples of dependencies include node modules, standalone JavaScript files,
images, stylesheets, WebAssembly files, JSON, and more.
Regardless of the app framework, _somewhere_ there must be logic that
determines how the files are
pulled together into a bundle that the browser can understand and use efficiently.
In Ember, the CLI handles the most common use cases to deliver a zero config experience.
Here, we'll also cover some of the less common use cases that require some configuration.

## Where should dependencies go?

Here are the most common places:

- Every Ember app has a file called `package.json` that lists node modules used by the app.
The code itself goes in `node_modules`, just like in many non-Ember JavaScript projects
- The `vendor` directory, which is a common home for third party JavaScript that is copied and pasted in
- The `public` directory, the typical place for assets like images
- The `styles` directory, for stylesheets like CSS, SASS, or LESS
plus folders like `vendor` and `public` that hold can many other files of the developer's
choice

Some older apps may use a package manager and registry called Bower, which has
a `bower_components` directory. Bower itself is deprecated and should not be used.

<!-- 
If addons are installed accidentally with `npm install` or `yarn install`,
the blueprints can be run with .... what?
-->

## NPM and Yarn

Ember CLI supports both [npm](https://www.npmjs.com) and [Yarn](https://yarnpkg.com/)
for node modules management.

By default, new apps use `npm`.
Both tools offer similar functionality, and which one to choose is up to
the developer's preference.
Dependencies listed in `package.json` can be installed with with either `npm install` or `yarn install`. The files for those packages are added to the `node_modules` folder of the app.

There are two ways to switch from `npm` to `yarn`.
Either include an option when the app is created, like `ember new --yarn`,
or run `yarn install` to generate a `yarn.lock` file.
Ember will detect the `yarn.lock` file and start using it instead
for any `ember install some-addon-name` commands.
Don't forget to delete the `package-lock.json` file if the app
already has one.
In cases where both a `yarn.lock` file and a `package-lock.json`
file are present, Ember CLI will default to using Yarn.
However, having both files causes confusion for collaborators and
is incompatible with some CI systems.

To switch from `yarn` to `npm`, delete the `yarn.lock`
and run `npm install` to generate a `package-lock.json`.

Further documentation about npm and Yarn is available at their official
documentation pages:

* [npm](https://www.npmjs.com)
* [Yarn](https://yarnpkg.com)

### The `node_modules` directory

New apps list the `node_modules` directory in the app's `.gitignore` configuration,
meaning that any changes to the contents of the directory are ignored by git.
Using the npm configuration files allows collaborators to download your
app source code and get the `node_modules` installed locally by executing 
`npm install` themselves.

### Effects of new dependencies on local servers

When an app is being served locally, the Ember CLI will not watch for changes in the `package.json` file. Therefore, 
if you install npm dependencies via `npm install <dependencies>`, you will 
need to restart your Ember CLI server session manually.

Dependencies installed with `ember install some-addon-name` will cause a refreash
of a local server.

### Debugging node_modules dependencies

Errors such as "a module named _____ could not be found" or a colleague's report that "well, the app works on my computer but not yours!" sometimes indicate that
the local server needs to be restarted or `node_modules` should be reinstalled.

Common resolution steps are to stop the server, and then take one of these steps, and start the server again:

- run `npm install` or `yarn install`
- Delete the `node_modules` directory and run `npm install` or `yarn install`
- Delete the `dist` directory (found in apps with versions < 3.4), delete `node_modules`, and `npm install` or `yarn install`
- If an app uses Bower (a deprecated, npm-like tool), follow all the steps above
in addition to deleteing `bower_components` and running `bower install`

