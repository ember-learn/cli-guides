## Ember-Cli Guides Source

This repository is part of a Work-In-Progress project to refresh the CLI guides content that currently lives at [https://ember-cli.com](https://ember-cli.com). The [cli-guides-app](https://github.com/ember-learn/cli-guides-source) is the structure for the markdown files in this repository.

As this project is pre-1.0, no content should be taken as the final word. Additional review is still pending.

Do you know a thing or two about the CLI or addons? We'd love to have your help with writing! Do you _wish_ you knew a thing or do? You could help us review to make sure that content is helpful to all knowledge levels. Please drop by the #-team-learning channel on the [Ember Community Slack](https://ember-community-slackin.herokuapp.com/) and `@` one of the [main contributors](https://github.com/ember-learn/cli-guides-source/graphs/contributors) to get more information.

## Prerequisites

You will need the following things properly installed on your computer.

* [Git](https://git-scm.com/)
* [Node.js](https://nodejs.org/) (with npm)
* [Ember CLI](https://ember-cli.com/)
* [Google Chrome](https://google.com/chrome/)

## Installation

* `git clone <repository-url>` this repository
* `cd cli-guides-app`
* `npm install`

This will display the content of the deployed Guides markdown

## Local Development

To see what a local copy of the Guides markdown looks like:

* Clone the [Ember CLI Guides](https://github.com/ember-learn/cli-guides-app) App repository
* link the `ember-cli-guides-source` repository by running `npm link` inside this repository, then `npm link @ember-learn/cli-guides` in the guides-app
* `npm install` and `ember serve` in the guides app
* Visit your app at [http://localhost:4200](http://localhost:4200).
* Visit your tests at [http://localhost:4200/tests](http://localhost:4200/tests).

### Adding more things to the table of contents

See `pages.yaml` in the cli-guides-source. Whatever has a url of index will be what is shown for the top level path, like `/tutorial/`. There must be an `index.md` under each topic. 

### Deploying

See instructions on the [cli-guides-app](https://github.com/ember-learn/cli-guides-source) README.
