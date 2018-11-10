## ember-cli guides

[![Build Status](https://travis-ci.org/ember-learn/cli-guides-source.svg?branch=master)](https://travis-ci.org/ember-learn/cli-guides-source)

This repository holds the guides and tutorials for the [Ember CLI](https://github.com/ember-cli/ember-cli), a powerful tool that helps you create, develop, and build an Ember app. The content itself is in the form of Markdown files in the [guides](https://github.com/ember-learn/cli-guides/tree/master/guides) directory. Those markdown files are processed and displayed by the Ember App.

To contribute to the API documentation, which lists properties and methods used by advanced addons and apps, instead visit [Ember CLI](https://github.com/ember-cli/ember-cli), where the API docs are managed as code comments within the codebase.

This project replaces, updates, and adds to the content historically hosted at [https://ember-cli.com/](https://ember-cli.com/).

Looking for repositories for the other parts of [emberjs.com](https://emberjs.com)? 
Check out
[guides-source](https://github.com/ember-learn/guides-source),
[website](https://github.com/emberjs/website),
[ember-api-docs](https://github.com/ember-learn/ember-api-docs),
[super-rentals tutorial](https://github.com/ember-learn/super-rentals),
[statusboard](https://github.com/ember-learn/statusboard),
[deprecation-app](https://github.com/ember-learn/deprecation-app),
and [styleguide](https://github.com/ember-learn/ember-styleguide).

## Help Wanted

Do you know a thing or two about the CLI or addons? Do you _wish_ you knew a thing or do?  We'd love to have your help with writing or reviewing to make sure that content is helpful to all knowledge levels. To learn more about the motivation for this, read this [RFC](https://github.com/jenweber/rfcs-1/blob/cli-guides/active/0000-cli-guides.md).

Overall project status and tasks that need help are tracked in [this Quest issue](https://github.com/ember-learn/cli-guides-source/issues/3). Have a read through that and the [CONTRIBUTING.md](CONTRIBUTING.md) file in order to get started.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Local Development

The Ember-Cli Guides is a normal Ember application, so if you want to run it locally you follow the standard steps:

* Clone this repository
* `cd cli-guides-source`
* `npm install`
* `ember serve`
* Visit your app at [http://localhost:4200](http://localhost:4200).

If you then edit the Markdown files located in the `guides/` folder your
application should live-update with the content changes.

To run the tests you can run `npm test` in your terminal, this will run any
Ember tests that have been setup but also some scripts that check the Markdown
files such as the link-checker.

### Adding more things to the table of contents

See `pages.yaml` in the cli-guides-source. Whatever has a url of index will be what is shown for the top level path, like `/tutorial/`. There must be an `index.md` under each topic.

### Deploying

See instructions on the [cli-guides-app](https://github.com/ember-learn/cli-guides-app) README.
