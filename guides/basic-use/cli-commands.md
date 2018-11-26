In their daily work, most Ember developers use only a small number of CLI commands.
We'll cover the most common commands here, along with a quick tutorial of how to use the `--help` option. The help option reveals all available commands and options, beyond what this guide covers.

## Using the help command

For any CLI commands, you can see all of the options available by using the `--help` flag.

For example, `ember --help` will show a list of all available top level commands. `ember generate --help` will show a full list of all the types of files you can generate using the CLI.

The help command is also the best way to see the aliased or shorthand versions of common commands and options. For example, here are some of the most frequently used abbreviations:

<table>
  <thead>
    <tr>
      <th>full command</th>
      <th>alias</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>ember generate</code></td>
      <td><code>ember g</code></td>
    </tr>
    <tr>
      <td><code>ember serve</code></td>
      <td><code>ember s</code></td>
    </tr>
    <tr>
      <td><code>ember test</code></td>
      <td><code>ember t</code></td>
    </tr>
    <tr>
      <td><code>ember version</code></td>
      <td><code>ember v</code></td>
    </tr>
  </tbody>
</table>

<!-- SCREENSHOT -->

## Create a new app

### Format:

```bash
ember new <my-app-name> [options]
```

### What it does

`ember new` creates all the boilerplate files that are part of an Ember app. It puts them in a folder with the same name as whatever we provide in place of `<my-app-name>`.

### Example use

This command below will create a folder called `camping-trip-tracker`, which will be full of app files. It uses the `--yarn` option to show that the app should use `yarn` by default. Yarn is a package manager alternative to `npm`. Options typically start with a double dash `--` and can be omitted entirely.

```bash
ember new camping-trip-tracker --yarn
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/) for creating a first app

## Serve the app locally

### Format

```bash
ember serve [options]
```

To stop an Ember server, press `control-c`.

### What it does

`ember serve` takes all of the app's files and turns them into something that can be rendered in the browser. By default, view the app by visiting `http://localhost:4200`. It's a good idea to keep the server running as we work so that we know as soon as we've broken something. The CLI watches the project folders, and will reload the app in the browser when files change.

If the local server will not start due to missing dependencies, use
`npm install` or `yarn install` to get going again.

### Example use

By default, apps are served at port `4200`, but if you need to change it for some reason, you could visit your app at `http://localhost:3200` by using this command:

```bash
ember serve --port 3200
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/#toc_create-a-new-application) for starting a local server

## Generate more files

### Format

```bash
ember generate <type-of-file> <name-of-your-choice>
```

### What it does

`ember generate` creates new files within your app. For example, you can use it to create components, routes, services, models, and more. For a full list, type `ember generate --help`.

The new files will contain the necessary boilerplate, they will go in the right place, and the CLI will make sure that file naming conventions are followed. For example, components must always have a dash in their names.
To avoid mistakes that are hard to debug, always use the CLI to create files, instead of creating the files by hand.

### Example use

This command will make a component named `packing-list`. There will be three files created in the app: `packing-list.hbs` which will define what it looks like, `packing-list.js` with JavaScript code to handle user interaction, and an integration test (aka rendering test) file called `packing-list-test.js`.

```bash
ember generate component packing-list
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/#toc_define-a-route) for creating a route

## Installing addons

### Format

```bash
ember install <addon-name>
```

### What it does

`ember install` is used to install addons within your app. An addon is an npm package that was built especially for use in an Ember app. Most addons have a name that starts with `ember`. You can find a full list of addons at [EmberObserver.com](https://emberobserver.com). There are addon versions of many popular npm libraries, as well as packages that are unique to Ember. The majority are open source community addons.
By convention, most addons have `ember` in the name, but not all of them.

To use non-addon npm packages directly, see [the Ember.js Guide](https://guides.emberjs.com/release/addons-and-dependencies/managing-dependencies/)
to dependencies to learn about the options.

### Example use

Here's an example of adding SASS support to your app using [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). SASS is an alternative to writing plain CSS. This is a popular community-maintained addon.

```bash
ember install ember-cli-sass
```

### Learn more

- [Ember CLI Guide](../using-addons/) for using and choosing addons
- [The Ember.js Guides](https://guides.emberjs.com/release/addons-and-dependencies/managing-dependencies/) section on Addons and Dependencies
- [Writing addons](../../writing-addons/) to learn how to make your own addon

<!-- Link to writing your own wrapper, once content is done -->

## Testing your app

### Format

```bash
ember test [options]
```

### What it does
<!--alex disable failed-->
`ember test` runs all of the tests found in the `tests` folder of the app. By default, it runs all the tests once and displays the results. We'll see things like syntax errors, linting problems, deprecations, and failed assertions in the command line output. To instead watch tests in the browser as they run, visit `http://localhost:4200/tests` while the local server is running with `ember serve`.

By default, these tests are run in Headless Chrome. What headless means is, we won't see the visual output of the browser, but it's running them in a Chrome environment. This makes the test suite faster. 

### Example use

To make tests re-run as we change files, we could use the `--server` option:

```bash
ember test --server
```

### Learn more
- [The Ember.js Guides about Testing](https://guides.emberjs.com/release/testing/)
- [The Ember Super Rentals Tutorial](https://guides.emberjs.com/release/tutorial/ember-cli/) which shows step-by-step how to write tests and understand the results

## Building the app for deployment

### Format

```bash
ember build [options]
```

### What it does

`ember build` takes all of your app files and turns them into a bundle that is minified and transpiled into browser-ready JavaScript code, styles, and html. The bundled files go into a directory called `dist`. This bundle is what can be deployed to a server. By default, the `build` command uses the `development` environment configuration.

Although you can upload the built files to a server yourself, many Ember projects use a community addon called [ember-cli-deploy](https://github.com/ember-cli-deploy/ember-cli-deploy) to get their apps into production. `ember-cli-deploy` has a plugin system to make it easy to deploy to many cloud vendors. Search [EmberObserver for "deploy"](https://emberobserver.com/?query=deploy) to browse available options.

Ember apps can be built with only three environments: development, production, and testing.

### Example use

This command builds the app using the production configuration, so that means by default, it will use maximum minification for best app performance.

```bash
ember build --environment production
```

### Learn more

- The [Ember.js Super Rentals Tutorial](https://guides.emberjs.com/release/tutorial/deploying/) has a section on deploying
- Search community addons for deployment on [EmberObserver](https://emberobserver.com/?query=deploy)
- Enable feature flags in different environments using the
[environment config](https://guides.emberjs.com/release/configuring-ember/configuring-your-app/)
