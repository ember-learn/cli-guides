## Ember-Cli Guides Source

This repository is part of a Work-In-Progress project to refresh and replace the CLI guides content of [https://ember-cli.com](https://ember-cli.com).

## Contributing

Do you know a thing or two about the CLI or addons? Do you _wish_ you knew a thing or do?  We'd love to have your help with writing or reviewing to make sure that content is helpful to all knowledge levels. To learn more about the motivation for this, read this [RFC](https://github.com/jenweber/rfcs-1/blob/cli-guides/active/0000-cli-guides.md).

Overall project status and tasks that need help are tracked in [this Quest issue](https://github.com/ember-learn/cli-guides-source/issues/3). Have a read through that and the [CONTRIBUTING.md](CONTRIBUTING.md) file in order to get started.

As this project is pre-1.0, no content should be taken as technically authoritative.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)
* [npm](https://docs.npmjs.com/cli/install)

## Local Development

To see what a local copy of the Guides markdown looks like:

* Clone the [Ember CLI Guides](https://github.com/ember-learn/cli-guides-app) App repository
* link the `ember-cli-guides-source` repository by running `npm link` inside this repository, then `npm link @ember-learn/cli-guides` in the guides-app
* `npm install` and `ember serve` in the guides app
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

If you follow this strategy above, as you save changes to
the markdown files of this repository, your locally served
app should update.

### Adding more things to the table of contents

See `pages.yaml` in the cli-guides-source. Whatever has a url of index will be what is shown for the top level path, like `/tutorial/`. There must be an `index.md` under each topic.

### Deploying

See instructions on the [cli-guides-app](https://github.com/ember-learn/cli-guides-app) README.
