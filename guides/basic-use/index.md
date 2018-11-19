Learn how to install the Ember CLI on Linux, Mac, and Windows.

## Prerequisites

* [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install)
* Recent version of [node](https://nodejs.org/en/download/), which comes included in `yarn` or `npm` 
* Mac and Linux users may need [Watchman](https://facebook.github.io/watchman/) (not the npm version!)

First, we need to have a package manager installed. A package manager installs new dependencies from the command line, whether they are used as commands or in the app itself. Follow these installation instructions for [npm](https://www.npmjs.com/get-npm) or [yarn](https://yarnpkg.com/en/docs/install). While these two tools have somewhat different features, both are compatible with Ember app development.

We'll know installation is successful when `npm --version` or `yarn --version` returns the version number. 

It is recommend to install the most recent LTS (long term support) version of `node`. Restart the console after installing your package manager.

## Installing the ember-cli

```bash
npm install -g ember-cli
```

This will make the `ember` command available throughout your project folders. The installation is successful if `ember -v` returns a version number. When it is run inside of an Ember app directory, it will show the version of the app, otherwise it will show the globally installed version of the CLI.

### Additional steps for Mac and Linux users

For Mac and Linux users, we recommend installing [Watchman](https://facebook.github.io/watchman/). Do not use the `npm` package by the same name.

Why is Watchman needed?
When an Ember developer is running a server locally, the server should
automatically and quickly rebuild when files change.
However, for some versions of Mac or Linux, this auto-restarting
does not work perfectly, due to problems in the operating system's
built-in file watching tools. Watchman helps correct for that buggy and inefficient file watching behavior.

Mac users can install Watchman via [Homebrew](https://brew.sh/):

```bash
brew install watchman
```

Linux users should follow the steps on the [Watchman](https://facebook.github.io/watchman/) website to build from the source.

If Watchman is not installed, a notice is displayed when using CLI commands, such as "Could not start watchman". It's safe to ignore this message. However, file-watching won't be as smooth as it is with Watchman.

### Installing for Windows

Windows versions as far back as Vista are fully supported, although there are steps you can take to improve your experience.
You can find more information about this in our section on [Windows support](../reference/windows/)

## Getting help

Users of all operating systems can get community support for installation problems. A list of chat rooms, forums, and more is available [here](https://www.emberjs.com/learn/).
