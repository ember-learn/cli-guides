# Basic use

In their day to day work, most Ember developers use only a small number of CLI commands.
We'll cover them here, along with a quick tutorial of how to use the `--help` option.

## Using the help command

For any of the commands below, you can see all of the options available by using the `--help` flag.

For example, `ember --help` will show a list of all available top level commands. Get more detailed help by adding `--help` to the end of any command, like how `ember generate --help` will show a full list of all the types of files you can create using the CLI.

The help command is also the best way to see the aliased or shorthand versions of common commands and options. For example, here are some of the most frequently used abbreviations:

| full command | alias |
|--------------|-------|
| `ember generate` | `ember g` |
| `ember serve`    | `ember s` |
| `ember test`     | `ember t` |
| `ember version`  | `ember v` |

<!-- SCREENSHOT -->

## Create an app

### Format:

```
ember new <my-app-name> [options]
```

### What it does

`ember new` creates all the boilerplate files that are part of an Ember app. It puts them in a folder with the same name as whatever we provide in place of `<my-app-name>`.

### Example use

This command below will create a folder called `camping-trip-tracker`, which will be full of app files. It uses the `--yarn` option to show that the app should use `yarn` by default. Yarn is a package manager alternative to `npm`. Options typically start with a double dash `--` and can be omitted entirely.

```
ember new camping-trip-tracker --yarn
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/) for creating a first app

## Serve the app locally

### Format

```
ember serve [options]
```

### What it does

`ember serve` takes all of the app's files and turns them into something that can be rendered in the browser. By default, view the app by visiting `http://localhost:4200`. It's a good idea to keep the server running as we work so that we know as soon as we've broken something. The CLI watches the project folders, and will rerender as files change.

### Example

By default, apps are served at port `4200`, but if you need to change it for some reason, you could visit your app at `http://localhost:3200` by using this command:

```
ember serve --port 3200
```

### Learn more

<!-- link to quickstart in the guides -->

## Generate app files

### Format

```
ember generate <type of file> <the name to give it>
```

### What it does

`ember generate` creates new files within your app. For example, you can use it to create components, routes, services, models, and more. For a full list, type `ember generate --help`. 

The new files will contain the necessary boilerplate, they will go in the right place, and the CLI will make sure that file naming conventions are followed. For example, components must always have a dash in their names. Creating files by hand is not recommended because mistakes can lead to confusing error messages.

### Example

This command will make a component named `packing-list`. There will be three files created in the app: `packing-list.hbs` which will define what it looks like, `packing-list.js` with JavaScript code to handle user interaction, and an integration test (aka rendering test) file called `packing-list-test.js`.

```
ember generate component packing-list
```

### Learn more

<!-- link to custom blueprints -->

## Installing dependencies

### Format

```
ember install <addon-name>
```

### What it does

`ember install` is used to install addons within your app. An addon is an npm package that was built for use in an Ember app. Most addons have a name that starts with `ember`. You can find a full list of addons at [EmberObserver.com](https://emberobserver.com). There are addon versions of many popular npm libraries, as well as packages that are unique to Ember. The majority are open source community addons.

To use npm packages directly, see <!-- LINK --> to learn about the options.

### Example

Here's an example of adding SASS support to your app using <!-- LINK TO CLI SASS -->. SASS is an alternative to writing plain CSS. This is a popular community-maintained addon.

```
ember install ember-cli-sass
```

### Learn more

<!-- Link to options for plain npm packages -->
<!-- Link to writing your own addon -->
<!-- Link to writing your own wrapper -->

## Testing your app

### Format

```
ember test [options]
```

### What it does

`ember test` runs all of the tests found in the `tests` folder of the app. By default, it runs all the tests once and displays the results. We'll see things like syntax errors, linting problems, deprecations, and failed assertions in the command line output. By default, these tests are run in Headless Chrome. What headless means is, we won't see the visual output of the browser, but it's running them in a Chrome environment. This makes the test suite faster. To watch tests in the browser as they run, visit `http://localhost:4200/tests` while the local server is running.

### Example

To make tests re-run as we change files, we could use the `--server` option:

```
ember test --server
```

### Learn more

## Building the app for deployment

### Format

```
ember build [options]
```

### What it does

`ember build` takes all of your app files and turns them into a bundle that is minified and transpiled into browser-ready JavaScript code, styles, and html. The bundled files go into a directory called `dist`. This bundle is what can be deployed to a server. By default, it uses the `development` environment configuration.

Although you can upload the built files to a server yourself, many Ember projects use a community addon called [ember-cli-deploy](https://github.com/ember-cli-deploy/ember-cli-deploy) to get their apps into production. `ember-cli-deploy` has a plugin system to make it easy to deploy to many cloud vendors. Search [EmberObserver for "deploy"](https://emberobserver.com/?query=deploy) to browse available options.

### Example

This command builds the app using the production configuration, so that means by default, it will use maximum minification for best app performance.

```
ember build --environment production
```

### Learn more

<!-- what to link to here? something about ember-cli-build -->


<!-- link to guides and maybe super rentals -->


<!-- 
## Table of Contents
Basic use (explain options of each)
    - using the "help" commmand
    - ember new
    - ember server
    - ember generate
    - ember test
    - ember install (incl link to later section on shims for npm packages)
    - feature flags & configurations
    - Environmental variables
    - File tree reference
    - addons/dependencies
    - Upgrading
-->
