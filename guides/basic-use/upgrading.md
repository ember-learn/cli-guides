There are three kinds of upgrades for normal Ember app development:

1. The version of the CLI that you are using
2. The version of the app itself
3. Addons used by an app

## Upgrading the CLI version

The Ember CLI is backwards-compatible, meaning that the latest CLI can be used with older app versions. New versions of the CLI are released roughly every 6 weeks, in step with versions of Ember.js itself.

Upgrade instructions are published with [each release](https://github.com/ember-cli/ember-cli/releases).

In general, here's how to upgrade the version of the CLI and verify that the upgrade worked:

```shell
npm uninstall -g ember-cli
npm install -g ember-cli
ember --version
```

## Upgrading an Ember app itself

There's more to upgrading an Ember app than changing the version number in `package.json`. Ember provides tools that walk you through the process.

### What to expect

Upgrade experience depends on whether the app should have a major, minor, or patch version upgrade. Ember follows [SemVer](https://semver.org/) rules closely, meaning that:

1. Moving from patch versions (like 3.4.1 to 3.4.2) will not change the app's behavior. They are mostly bugfixes and internal refactors. These upgrades are usually very quick and require no changes besides changing some dependency versions in `package.json`.
2. Upgrading minor versions (like 3.4 to 3.5) will give access to new features, but the codebase will not need to change, so these are also usually very quick. Afterwards, developers may see new notices about deprecations, whether from their own app or addons they are using. Deprecations are warnings that some API or behavior will be changed in the future for a major release (like Ember 2 to 3).
2. Major version upgrades (like Ember 2 to 3) introduce breaking changes. Before the upgrade can be made, code inside the app may need to change. See [Managing major upgrades](#managingmajorupgrades) below for the overall strategy.

Developers who find it challenging to upgrade minor versions as frequently as Ember does are encouraged to choose LTS or "long-term support" versions of Ember, which receive security updates for an extended time after release.
See the [Ember release blog posts](https://www.emberjs.com/blog/tags/releases.html) to find the latest LTS version.

### How to do an upgrade

To upgrade an Ember app, use `ember-cli-update`. Installation instructions can be found [here](https://github.com/ember-cli/ember-cli-update#installation).

Review the project README for the most up-to-date instructions for using the tool. For example, many developers will want to use options that are not covered here.

If you installed `ember-cli-update` globally, run the following command inside your project directory,

```shell
ember-cli-update
```

or if you installed as an Ember CLI command, run

```shell
ember update
```

This will update your app or addon to the latest Ember CLI version. It does this by fetching the latest version and comparing it to your project's Ember CLI version. It then applies a diff of the changes from the latest version to your project. It will only modify the files if there are changes between your project's version and the latest version, and it will only change the section necessary, not the entire file.

You will probably encounter merge conflicts, in which the default behavior is to let you resolve conflicts on your own. You can supply the `--resolve-conflicts` option to run your system's git merge tool if any conflicts are found.

Other `ember-cli-update` options are documented [here](https://github.com/ember-cli/ember-cli-update#options).

For example, to update to a specific version, use the `--to` option:
```shell
ember-cli-update --to 3.4.3
```

### Updating your code automatically

After running the normal update shown above, and after you've resolved any conflicts,
you can run `ember-cli-update` again with the `--run-codemods` option.
Codemods are tools that automatically make the tedious syntax changes to your code that
you would normally have to do manually.
They help to ensure you are using the latest patterns and platform features.

```shell
ember-cli-update --run-codemods
```
The tool will examine your project and list the available codemods.
Use the arrow keys to move the selector up and down. Press space to select the ones you want
or you can press `a` to select them all. Press Enter to proceed.

```shell
? These codemods apply to your project. Select which ones to run.
Press <space> to select, <a> to toggle all, <i> to invert selection
❯◯ ember-modules-codemod
 ◯ ember-qunit-codemod
 ◯ ember-test-helpers-codemod
 ◯ es5-getter-ember-codemod
 ◯ qunit-dom-codemod
```


#### Troubleshooting
If you made a mistake during the update/conflict resolution, run these commands to undo everything and get you back to before the update:

```shell
git reset --hard
git clean -f
```

If it is helpful to see a side-by-side comparison between your app and a brand-new app, you can visit the [Ember CLI releases](https://github.com/ember-cli/ember-cli/releases), choose the correct version, and look inside the `blueprints` directory.

### Managing major upgrades

When upgrading major versions, such as Ember 2 to 3, some work may need to be done before the `ember-cli-update` command above should be run.

Ember takes major version changes seriously. After all, a major version means breaking changes! There are few major version releases of Ember compared to many other frameworks, because the community and core team do what they can to only change API when it is really necessary. When those changes do come, there are clear ways to migrate to the new version.

The overall strategy is to first use `ember-cli-update` and its codemods to upgrade to the final version of a major release. Codemods will take care of tedious, repetitive tasks, but some deprecations will require the attention of the developer. Next, resolve all remaining deprecation warnings. Lastly, use `ember-cli-update` again to make the major version jump.

For example, a team upgrading a small app from Ember 2.12 should first go to 2.18, resolve deprecations, and then upgrade to Ember 3. For large, complex apps, it is recommended to jump between LTS versions in order.

See the [Ember Deprecations](https://www.emberjs.com/deprecations/) site for instructions on how to deal with specific deprecations, and read [Ember release blog posts](https://www.emberjs.com/blog/tags/releases.html) to get an idea of new features and the motivation behind the breaking changes.

## Upgrading Addon Dependencies

Most addons will continue to work fine through patch and minor version updates of the Ember app that is using them. For major version updates, see each project's README to learn what to expect. In general, the most heavily used addons have good backwards compatibility, even across major versions.

Many app developers use [npm audit](https://docs.npmjs.com/auditing-package-dependencies-for-security-vulnerabilities) to check for security vulnerabilities and resolve them.

If there are problems with upgrading an addon's version or using an addon with a new version of Ember, always check the project's README, Issues and Pull Request queue to see if work is already underway.

If a Deprecation warning is present for API that is not being directly used in an app, it may be coming from an addon. The easiest way to find out which addon needs updating is to do a search of the project's `node_modules` folder for the deprecated property or method.
