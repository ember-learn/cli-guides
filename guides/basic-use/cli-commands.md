In their daily work, most Ember developers use only a small number of CLI commands.
We'll cover the most common commands here, along with a quick tutorial on how to use the `--help` option. The help option reveals all available commands and options, beyond what this guide covers.

## Using the help command

You can see the options available for each command by using the `--help` flag.  A searchable list of the `help` output can be found in [CLI Commands Reference](../../advanced-use/cli-commands-reference/).

For example, `ember --help` will show a list of all available top-level commands. `ember generate --help` will show a full list of all the types of files you can generate using the CLI.

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

```shell
ember new <my-app-name> [options]
```

### What it does

`ember new` creates all the boilerplate files that are part of an Ember app. It puts them in a folder with the same name as whatever we provide in place of `<my-app-name>`.

### Example use

This command below will create a folder called `camping-trip-tracker`, which will be full of app files. It uses the `--yarn` option to show that the app should use `yarn` by default. Yarn is a package manager alternative to `npm`. Options typically start with a double dash `--` and can be omitted entirely.

```shell
ember new camping-trip-tracker --yarn
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/) for creating a first app
- [npm and Yarn](../assets-and-dependencies/#npmandyarn) for more on using package managers with Ember CLI

## Serve the app locally

### Format

```shell
ember serve [options]
```

To stop an Ember server, press `control-c`.

### What it does

`ember serve` takes all of the app's files and turns them into something that can be rendered in the browser. By default, we can view the app by visiting `http://localhost:4200`. It's a good idea to keep the server running as we work so that we know as soon as possible that we've broken something. The CLI watches the project folders and will reload the app in the browser when files change.

If the local server will not start due to missing dependencies, use
`npm install` or `yarn install` to get going again.

Often, developers may run `npm start` instead of `ember serve`, since
there may be some application-specific environment variables or flags specified
in the `start` command of the project's `package.json`.

### Example use

By default, apps are served at port `4200`, but if you need to change it for some reason, you could visit your app at `http://localhost:3200` by using this command:

```shell
ember serve --port 3200
```

### Learn more

- [Ember Quickstart Guide](https://guides.emberjs.com/release/getting-started/quick-start/#toc_create-a-new-application) for starting a local server
- [Proxying network requests](../../appendix/dev-tools/#proxyingnetworkrequests) to proxy network requests to another server

## Generate more files

### Format

```shell
ember generate <type-of-file> <name-of-your-choice>
```

### What it does

`ember generate` creates new files within your app. For example, you can use it to create components, routes, services, models, and more.

For a full list, type **`ember generate --help`**.

The CLI's `generate` command will ensure that new files contain the necessary boilerplate, that they go in the right directories, and that file naming conventions are followed. To avoid mistakes that are hard to debug, always use the CLI to create files instead of creating the files by hand.

### Example use

This command will generate a page named `about`. It will create the following files in the app:

* `app/templates/about.hbs`, which defines what the page looks like
* `app/routes/about.js` where we can fetch the data required for the page
* `tests/unit/routes/about-test.js` with a minimal unit testing code

Also, it updates the app's router (`app/router.js`) with an entry to the `about` page.

command:
```shell
ember generate route about
```

## Installing addons

### Format

```shell
ember install <addon-name>
```

### What it does

`ember install` is used to install addons within your app. An addon is an npm package that was built specifically for use in an Ember app. You can find a full list of addons on [Ember Observer](https://emberobserver.com). There are addon versions of many popular npm libraries, as well as packages that are unique to Ember. The majority are open source community addons.
By convention, most addons have `ember` in the name, but not all of them.

To use non-addon npm packages directly, see "Managing Dependencies" section of the [Ember.js Guide](https://guides.emberjs.com/release/addons-and-dependencies/managing-dependencies/)
to learn about the options.

### Example use

Here's an example of adding Sass support to your app using [ember-cli-sass](https://github.com/aexmachina/ember-cli-sass). Sass is an alternative to writing plain CSS. This is a popular community-maintained addon.

```shell
ember install ember-cli-sass
```

### Learn more

- [Ember CLI Guide](../using-addons/) for using and choosing addons
- [The Ember.js Guides](https://guides.emberjs.com/release/addons-and-dependencies/managing-dependencies/) section on Addons and Dependencies
- [Writing addons](../../writing-addons/) to learn how to make your own addon

<!-- Link to writing your own wrapper, once content is done -->

## Testing your app

### Format

```shell
ember test [options]
```

### What it does
<!--alex disable failed-->
`ember test` runs all of the tests found in the `tests` folder of the app. By default, it runs all the tests once and displays the results. We'll see things like syntax errors, linting problems, deprecations, and failed assertions in the command line output. To instead watch tests in the browser as they run, visit `http://localhost:4200/tests` while the local server is running with `ember serve`.

By default, these tests run in Headless Chrome. "Headless" means the tests are running the Chrome environment, but we won't see the visual output of the browser. This makes the test suite faster.

### Example use

To make tests re-run as we change files, we could use the `--server` option:

```shell
ember test --server
```

During development, this is less common than running `ember serve` and viewing the tests at `http://localhost:4200/tests`.

To run specific tests, you can pass the `--filter` or `--module` flags to the `ember test` command. For example:

if you have a test like this:

```js
module('My Component', function() {
  test('test one', function(assert) {
    assert.ok(true, 'this test passes!');
  });
  test('test two', function(assert) {
    assert.ok(true, 'this test passes!');
  });
});
```

you can run only the first test with `ember test --filter="test one"`.

See `ember test --help` for more options!

### Running all tests including linters

`ember test` runs only the tests in the `tests` folder, so if you want to
run additional tests such as linters too, try `npm test` instead. It will run
all tests specified in your project's `package.json` script for the `test`
command.

### Learn more
- [The Ember.js Guides about Testing](https://guides.emberjs.com/release/testing/)
- [The Ember Super Rentals Tutorial](https://guides.emberjs.com/release/tutorial/ember-cli/) which shows step-by-step how to write tests and understand the results

## Building the app for deployment

### Format

```shell
ember build [options]
```

### What it does

`ember build` takes all of your app files and turns them into a bundle that is minified and transpiled into browser-ready JavaScript code, styles, and HTML. The bundled files go into a directory called `dist`. This bundle is what can be deployed to a server. By default, the `build` command uses the `development` environment configuration, which is not optimized for production.

<!-- alex disable easy -->
Although you can upload the built files to a server yourself, many Ember projects use a community addon called [ember-cli-deploy](https://github.com/ember-cli-deploy/ember-cli-deploy) to get their apps into production. `ember-cli-deploy` has a plugin system to make it easy to deploy to many cloud vendors. Search [Ember Observer for "deploy"](https://emberobserver.com/?query=deploy) to browse available options.

Ember apps can be built with only three environments: development, production, and testing.

### Example use

This command builds the app using the production configuration, so that means by default, it will use maximum minification for best app performance.

```shell
ember build --environment production
```

### Learn more

- The [Ember.js Super Rentals Tutorial](https://guides.emberjs.com/release/tutorial/deploying/) has a section on deploying
- Search community addons for deployment on [Ember Observer](https://emberobserver.com/?query=deploy)
- Enable feature flags in different environments using the
[environment config](https://guides.emberjs.com/release/configuring-ember/configuring-your-app/)

----

## Create a new addon

### Format:

```shell
ember addon <my-addon-name> [options]
```

### What it does

`ember addon` creates all the boilerplate files for a new Ember addon. It puts them in a folder with the same name as whatever we provide in `<my-addon-name>`.

### Example use

This command below will create a folder called `ember-x-select`.

```shell
ember addon ember-x-select
```

### Learn more

- Follow the [tutorial](../../writing-addons/intro-tutorial/) to create your own Ember Addon!

<!-- To do: Document how to create addons that can be published in an `npm` scope/namespace -->
