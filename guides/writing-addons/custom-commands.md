You can extend the functionality provided by Ember CLI by creating new [CLI commands][3].
For example, if you wanted to enable developers to deploy an app from the command line with `ember deploy`,
you could create an addon that includes a "deploy" command that the app can find.

To do this, in an addon's `index.js` file, add the `includedCommands()` function and return an object
pointing to the command.

```js{data-filename=index.js}
module.exports = {
  name: require('./package').name,

  includedCommands() {
    return {
      'deploy': {
        name: 'deploy',
        works: 'insideProject',
        description: 'Deploys the app to my production host!',
        availableOptions: [],

        run() {
          // deploy!
        }
      },
    }
  }
};
```

The API for this object is documented [here][1].

By convention, addon authors will store commands in the `lib/commands` directory of the addon,
and include them using `require('./lib/commands')`, but this is not necessary.

You can see additional examples of addons that implement custom commands, by
[searching for `includedCommands`][2] in Ember Observer's code search!

[1]: https://ember-cli.com/api/classes/Command.html
[2]: https://emberobserver.com/code-search?codeQuery=includedCommands
[3]: ../../basic-use/cli-commands/
