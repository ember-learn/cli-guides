There are three kinds of upgrades for normal Ember app development: 

1. The version of the CLI that you are using
2. The version of the app itself
3. Addons used by an app

## Upgrading the CLI version

The Ember CLI is backwards compatible, meaning that the latest CLI can be used on older app versions. New versions of the CLI are released roughly every 6 weeks, in step with versions of Ember.js itself.

Upgrade instructions are published with [each release](https://github.com/ember-cli/ember-cli/releases).

In general, here's how to upgrade the version of the CLI and verify that the upgrade worked:

```bash
npm uninstall -g ember-cli
npm install -g ember-cli
ember --version
```

## Upgrading an Ember app itself

There are automated Ember CLI tools available to help upgrade Ember apps, including codemods that help with syntax changes. Visit
[ember-cli-update](https://github.com/ember-cli/ember-cli-update) for the latest instructions.

<!-- Needs a section that describes a common upgrade experience, explains deprecations, links to Deprecations site, and hints that upgrades to get new features or jump major versions require changes to the codebase. Common misconception is that you can just jump versions in package.json. Pull in info from https://ember-cli.com/user-guide/#upgrading  -->

## Upgrading Addon Dependencies

<!-- very brief guidance on how to approach addons, and a note that sometimes deprecation warnings come from outdated addons rather than your app -->
