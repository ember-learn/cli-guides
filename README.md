[![This project uses GitHub Actions for continuous integration.](https://github.com/ember-learn/cli-guides/workflows/CI/badge.svg)](https://github.com/ember-learn/cli-guides/actions?query=workflow%3ACI)

# Ember CLI guides

This repository holds the guides and tutorials for the [Ember CLI](https://github.com/ember-cli/ember-cli), a powerful tool that helps you create, develop, and build an Ember app.

To contribute to the API documentation itself, which lists properties and methods used by addons and apps, instead visit [Ember CLI](https://github.com/ember-cli/ember-cli), where the API docs are managed as code comments within the codebase.

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


## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Local Development

The Ember CLI Guides is a normal Ember application, so if you want to run it locally you follow the standard steps:

* Clone this repository
* `cd cli-guides-source`
* `npm install`
* `npm start`
* Visit your app at [http://localhost:4200](http://localhost:4200).

_Note:_ If you are developing in any online editor environment like [codesandbox.io](https://codesandbox.io) or [gitpod.io](https://gitpod.io), then you may not able to serve the application properly because of FastBoot's domain configurations. In such cases, you can disable fastboot in development mode by serving the ember app using `FASTBOOT_DISABLED=true ember serve` command.

If you then edit the Markdown files located in the `guides/` folder your
application should live-update with the content changes.

To run the tests you can run `npm run lint:md` and `npm test` in your terminal. `npm run lint:md` will spellcheck and enforce consistency in the Markdown files.  `npm test` will run Ember tests that have been setup and also scripts that check the Markdown
files links.

Markdown linting (`lint:md`) must pass. Otherwise, it will fail in CI (continuous integration). Spellchecking uses a custom [ember-dictionary](https://github.com/maxwondercorn/ember-dictionary) with words and terms common to the Ember community, such as `SemVer`. Words and terms that are associated with a specific guide can be placed in the `.local.dic` dictionary file. Create a pull request if a word needs to be added to `ember-dictionary`.

## How this app works

The guides content is in the form of Markdown files in the [guides](https://github.com/ember-learn/cli-guides/tree/master/guides) directory. An Ember app processes and serves the Markdown files. If you look at the `app` directory, you'll see there's not much in it! That's because most of the work is done through a dependency on [guidemaker](https://sea-region.github.com/empress/guidemaker), a static site generator created in Ember.

## Contributing

Do you know a thing or two about the CLI or addons? Do you _wish_ you knew a thing or do?  We'd love to have your help with writing or reviewing to make sure that content is helpful to all knowledge levels. To learn more about the motivation for this, read this [RFC](https://github.com/jenweber/rfcs-1/blob/cli-guides/active/0000-cli-guides.md). If you're new to writing Markdown, follow [this cheat sheet](https://guides.github.com/pdfs/markdown-cheatsheet-online.pdf).

Overall project status and tasks that need help are tracked in [this Quest issue](https://github.com/ember-learn/cli-guides-source/issues/3). Have a read through that and the [CONTRIBUTING.md](CONTRIBUTING.md) file in order to get started.


### Adding more things to the table of contents

See `pages.yaml` in the cli-guides-source. Whatever has a URL of `index` will be shown for the top level path, like `/tutorial/`. There must be an `index.md` under each topic.

### Deploying

This app has CI/CD in place, which automatically deploys the contents of the `master` branch.
It is hosted on the Ember Learning org's Netlify account.
