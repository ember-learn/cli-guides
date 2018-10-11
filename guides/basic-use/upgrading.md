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

To upgrade an Ember CLI app use `ember-cli-update`. Installation instructions can be found [here](https://github.com/ember-cli/ember-cli-update#installation).

When it's done, if you installed `ember-cli-update` globally, run the following command inside your project directory,

```bash
ember-cli-update
```

or if you installed as an Ember CLI command, run

```bash
ember update
```

This will update your app or addon to the latest Ember CLI version. It does this by fetching the latest version and comparing it to your project's Ember CLI version. It then applies a diff of the changes from the latest version to your project. It will only modify the files if there are changes between your project's version and the latest version, and it will only change the section necessary, not the entire file.

You will probably encounter merge conflicts, in which the default behavior is to let you resolve conflicts on your own. You can supply the `--resolve-conflicts` option to run your system's git merge tool if any conflicts are found.

There's some other `ember-cli-update` options documented [here](https://github.com/ember-cli/ember-cli-update#options).

For example, to update to a specific version, use the `--to` option:
```bash
ember-cli-update --to 3.4.3
```

Steps to upgrade to the latest version of Ember CLI are also included with the
[release notes for each release](https://github.com/ember-cli/ember-cli/releases).



### Updating your code automatically

After running the normal update shown above, and after you've resolved any conflicts,
you can run `ember-cli-update` again with the `--run-codemods` option. 
Codemods are tools that automatically make the tedious syntax changes to your code that 
you would normally have to do manually. 
They help to ensure you are using the latest patterns and platform features.

```bash
ember-cli-update --run-codemods
```
The tool will examine your project and list the available codemods. 
Use the arrow keys to move the selector up and down. Press space to select the ones you want 
or you can press `a` to select them all. Press Enter to proceed.
```js
? These codemods apply to your project. Select which one's to run. 
Press <space> to select, <a> to toggle all, <i> to invert selection
❯◯ ember-modules-codemod
 ◯ ember-qunit-codemod
 ◯ ember-test-helpers-codemod
 ◯ es5-getter-ember-codemod
 ◯ qunit-dom-codemod
```


#### Troubleshooting
If you made a mistake during the update/conflict resolution, run these commands to undo everything and get you back to before the update:

```bash
git reset --hard
git clean -f
```
<!-- Needs a section that describes a common upgrade experience, 
explains deprecations, 
links to Deprecations site, 
and hints that upgrades to get new features or jump major versions require changes to the codebase. 
Common misconception is that you can just jump versions in package.json. 
Pull in info from https://ember-cli.com/user-guide/#upgrading  -->

## Upgrading Addon Dependencies

<!-- very brief guidance on how to approach addons, 
and a note that sometimes deprecation warnings come 
from outdated addons rather than your app -->
