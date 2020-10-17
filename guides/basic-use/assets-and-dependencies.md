<!-- Some content redundancy with using addons and using npm packages pages -->
<!-- A section should clearly show using WASM files, I think -->

Assets and dependencies are the resources your app needs to work.
In general, when people say "assets", they mean things that the developer has added themselves to the app, like images and fonts, while "dependencies" are resources that come from third-party libraries.

## Where should assets and dependencies go?

Here are the most common places:

<!-- alex disable just -->
- Every Ember app has a file called `package.json` that lists node modules used by the app.
The code itself goes in `node_modules` during `npm install`, just like in many non-Ember JavaScript projects
- The `vendor` directory, which is a common home for third-party JavaScript that is copied and pasted in
- The `public` directory, the typical place for assets like images
- The `styles` directory, for stylesheets like CSS, SASS, or LESS
plus folders like `vendor` and `public` that can hold many other files of the developer's choice

Some older apps may use a package manager and registry called Bower, which has
a `bower_components` directory. Bower itself is deprecated and should not be used.

<!--
If addons are installed accidentally with `npm install` or `yarn install`,
the blueprints can be run with .... what?

Added by @maxwondercorn:
What is now below - were should it go in the guide

If you accidentally install an Ember addon using either npm or Yarn, the default blueprint will not run. To run the blueprint use:

```shell
ember generate <addon-name>
```
-->

## npm and Yarn

Ember CLI supports both [npm](https://www.npmjs.com) and [Yarn](https://yarnpkg.com/)
for node modules management.

By default, new apps use `npm`.
Both tools offer similar functionality, and which one to choose is up to
the developer's preference.
Dependencies listed in `package.json` can be installed with either `npm install` or `yarn install`. The files for those packages are added to the `node_modules` folder of the app.

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

To have Ember CLI use `yarn` by default for all new projects, create a `.ember-cli` file in your home directory with:

```json
{
  "yarn": true
}
```

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

Dependencies installed with `ember install some-addon-name` will cause a refresh
of a local server.

### Debugging node_modules dependencies

Errors such as "a module named \_\_\_\_\_ could not be found" or a colleague's report that "well, the app works on my computer but not yours!" sometimes indicate that
the local server needs to be restarted or `node_modules` should be reinstalled.

To overcome issues like this visit the [CLI Debugging Guide](../../advanced-use/debugging/).
