Node's debugger with Chrome's DevTools can debug node code in an addon or app. For example, debugging Broccoli errors in an addon's `index.js`.

To use the node debugger, open Chrome DevTools with  `chrome://inspect` or use the [Node.js - inspection manager (NiM)](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj) from the Chrome web store (recommended). See Node [documentation](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55) for details.

To debug, place a `debugger` statement where the code should break.  Then serve the application using

```bash
node --inspect node_modules/ember-cli/bin/ember serve
```

You will see a message similar to this in the console.


```bash
Debugger listening on ws://127.0.0.1:9229/9c664016-bcfa-444b-b7fe-57d91a0d6e8f
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```
If you used `chrome://inspect`, click on the `inspect` link to launch DevTools. NiM will automatically open DevTools.

Stop Ember serve using `Ctrl-C` and then close the DevTools tab.
