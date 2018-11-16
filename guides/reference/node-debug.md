Chrome's DevTools can debug the node code in an addon or app. For example, debugging Broccoli errors in an addon's `index.js`.

Configure Chrome to accept a web socket connection using [Node.js - inspection manager](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj) from the Chrome web store.  Install and configure the extension to Auto open DevTools.

To debug, place a `debugger` statement where the code should break.  Then serve the application using

```bash
node --inspect-brk node_modules/ember-cli/bin/ember serve
```

Paste the generated url (`ws://127....) in a new browser tab.

```bash
Debugger listening on ws://127.0.0.1:9229/9c664016-bcfa-444b-b7fe-57d91a0d6e8f
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```

DevTools will open paused at the beginning of the node code. Resume code execution to break at the set point.

Stop Ember serve as normal with `Ctrl-C`