An important part of writing an addon is showing others how to use it.
There are some well-established patterns and tools that help addon authors save some time and get their work discovered.

## Naming your addon

There is no enforced rule for it, but most addons use `ember` as the first part of the addon's name.
This makes the addon easier to search for in the [npm repository](https://www.npmjs.com/search?q=ember).

## The README

Every addon should have a `README.md` file describing why someone might want to use the addon and how to install it.
If your addon has a documentation site or demo apps, be sure to include links to them.

## The CONTRIBUTING

 Every new addon contains a `CONTRIBUTING.md` when generated with Ember CLI. This file should describe how to run the addon locally, how to run tests,  and contributing guidelines.

## Creating a documentation site

[ember-cli-addon-docs](https://ember-learn.github.io/ember-cli-addon-docs/) help you create interactive, versioned documentation for your addon!

This tool is used by both Ember projects and the community as a whole.
For example, check out the [ember-styleguide](https://github.com/ember-learn/ember-styleguide), which is a library of UI components that make up [emberjs.com](https://emberjs.com). The addon docs help show what components are available and how to use them.

Another option is to create your own site from scratch.
Many addon authors use the dummy app within an addon to build their documentation site, and deploy it to GitHub pages.

For more inspiration, take a look at how your favorite addons do their documentation.

## Getting an addon included in Ember Observer

[Ember Observer](https://www.emberobserver.com/) is an independent, community-made resource that rates and lists addons.

When you create an addon using the Ember CLI, it includes tags in the `package.json` that help it get picked up for inclusion in Ember Observer. There are objective and subjective evaluations that factor into an addon's overall score and ranking. Read more about the scoring [here](https://www.emberobserver.com/about).

## Following semver

Following [Semver](https://semver.org/), or Semantic Versioning, is highly encouraged for addon authors. It is the main way to inform an addon's users of breaking changes, new features, and patches.

When there are major versions with breaking changes, it is important to include notes about how users can migrate to new versions.
Depending on the extent of the breaking changes, the migration steps often have a summary in the `README` and a link to more detailed information in the release notes.
