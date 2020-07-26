The Ember CLI (command line interface) is the official way to create, build, test, and serve the files that make up an Ember app or addon.
Many things have to happen before a web app is ready for the browser. The Ember CLI helps you get there with zero configuration.

```shell
npm install -g ember-cli
```

Visit [Ember CLI](https://github.com/ember-cli/ember-cli) on GitHub
and the [Ember.js Release Blog Posts](https://www.emberjs.com/blog/tags/releases.html)
for information on the latest releases and new features.

## Learning the CLI

You will find a lot of information in the Ember CLI Guides. Rest assured, you will only need to know and use a small fraction in a typical day.

For new users, the recommended learning path is to first do the Ember.js [Quickstart](https://guides.emberjs.com/release/getting-started/quick-start/) and [Tutorial](https://guides.emberjs.com/release/tutorial/). These teach the commands while building a sample app. Then, review the [Basic use](./basic-use) section of this site as a reference.

The CLI comes with a help system too. At any point, if you're not sure what a command does and what its options are, you can add `--help` to the command and press enter to find out more.

```shell
ember generate component --help
```

## What are addons?

There are thousands of JavaScript libraries that work great in Ember.

When an [npm package](https://www.npmjs.com/) offers some Ember-specific features, we call it an "addon." An addon provides a way to write reusable code, share components and styling, extend the build tooling, and more—all with minimal configuration. You can visit [Ember Observer](https://emberobserver.com) to search addons.

You can also use npm packages that were made for the wider JavaScript community.

Since `v3.x`, Ember apps include the `ember-auto-import` dependency, which enables importing npm packages directly. For example, if you want to use `highcharts` in your application,
you can install and import it without any other configuration. Be sure to visit the [ember-auto-import](https://github.com/ef4/ember-auto-import) documentation for more advanced usage!

## Why do we need a CLI?

The Ember CLI's job is to make your work easier.

The CLI is like a dependency packager, test runner, optimizer, and local server—all rolled into one. Since all features were built to work together, common tasks (e.g. upgrading the app version and deploying the app) can be automated with production-ready, open source plugins. The CLI is backwards-compatible with older Ember apps and maintains a 6-week release schedule.

The CLI was also built with the idea that a developer should be able to focus on building great apps, not re-engineering how to fit pieces together throughout an app's lifecycle. Apps become maintainable and approachable, since there are established architectural patterns across individuals, teams, and companies.
However, if you want to make your own adjustments, such as using a different testing library, you still can.

## Getting help

Did you have questions? Run into an issue or a bug? Get support from the community. A list of chat rooms, forums, and more is available on the [Community](https://www.emberjs.com/community/) page.

## Contributing

The Ember CLI is developed and maintained by a group of open source contributors from various companies and backgrounds. If you want to propose an idea for a feature, report a bug, or learn more how you can help, you can reach the team on [GitHub](https://github.com/ember-cli) and [Discord](https://discord.com/invite/emberjs). You can also drop by the weekly meeting that is open to the public.

### Places to contribute

- [The main Ember CLI codebase](https://github.com/ember-cli/ember-cli)
- [This documentation site](https://github.com/ember-learn/cli-guides)
- Official projects under the [Ember CLI organization](https://github.com/ember-cli/)
- Search the community's CLI plugins on [Ember Observer](https://emberobserver.com)
