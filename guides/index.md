# The Ember CLI

The Ember CLI (command line interface) is the official way to create, build, test, and serve the files that make up an Ember.js app or addon.
Many things have to happen before for any web app is ready for the browser, and the Ember CLI helps you get there with zero configuration. 

```bash
npm install -g ember-cli
```

Visit the [ember-cli](https://github.com/ember-cli/ember-cli) on GitHub for information on the latest releases and new features.

## Learning the CLI

Although these CLI guides have a lot of content, a typical Ember developer will only need to know and use a small fraction of the information. 
For new users, the recommended learning path is to first do the Ember.js [Quickstart](https://guides.emberjs.com/release/getting-started/quick-start/) and [Tutorial](https://guides.emberjs.com/release/tutorial/ember-cli/), which teach the commands one by one while building a sample app. Then, they should review the Basic Use section of this site as a reference resource.

True to form, the CLI comes with a command-line-based help system too. At any point, if you're curious what a command does and what the options are, you can add `--help` and press enter to find out more.

## What are addons?

There are thousands of JavaScript libraries that work great in Ember. When an npm package offers some Ember-specific conveniences, we call it an “addon.” Ember CLI’s addon system provides a way to create reusable units of code, share components and styling, extend the build tooling, and more — all with minimal configuration. 

To view a complete list of addons, visit [EmberObserver](https://emberobserver.com). 

You can still use your favorite npm packages directly too. If they are not available as addons yet, you can add most of them using [ember-auto-import](https://github.com/ef4/ember-auto-import), adding them to the build pipleine yourself, or by creating wrappers.

## Why do we need a CLI?

The Ember CLI is like a dependency packager, test runner, optimizer, and local server all rolled into one. Since all the features were built to work together, tasks like upgrading the app version or deploying can be automated with production-ready, open source plugins. The CLI is backwards compatible with older apps, and maintains a six-week release schedule.

The CLI's job is to make your work easier.
It was built with the philosophy that a developer should be able to focus on building great apps, not reengineering how to fit all the pieces together at each stage of an app's lifecycle (creation, local development, production deployments). The result is apps that are more maintainable and approachable, since there are established architectural patterns across individuals, teams, and companies.

However, if you want to make your own adjustments like use a different testing library, you still can.

## Getting help

Do you have questions? Run into an issue or a bug? Get support from the community. A list of chat rooms, forums, and more is available [here](https://www.emberjs.com/community/).

## Contributing

The Ember CLI is developed and maintained by a group of open source volunteers from many different companies and backgrounds. If you have an idea for a feature, a bug to report, or just want to help out where it is needed, you can reach the team via [GitHub](https://github.com/ember-cli), the [Ember Community forums and chat](https://www.emberjs.com/learn/), or drop by the weekly meeting that is open to the public.

### Places to contribute

- [The main ember-cli codebase](https://github.com/ember-cli/ember-cli) 
- [This documentation site](https://github.com/ember-learn/cli-guides)
- Official projects under the [ember-cli organization](https://github.com/ember-cli/) 
- Search the community's CLI plugins on [EmberObserver](https://emberobserver.com)
