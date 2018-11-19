<!-- Copy over code editor content -->
<!-- This intro paragraph needs improvement -->

This section provides information on integrating Ember into various code editors and how to debug ember-cli node code.

## Code Editor Integrations

### Visual Studio Code
If you are using [VSCode](https://code.visualstudio.com/) with `ember-cli`, there's an [official
extension pack](https://marketplace.visualstudio.com/items?itemName=emberjs.emberjs#overview) 
maintained by the Ember Learning team that adds multiple ember plugins that can help in 
Ember development. If you already have VSCode installed on your machine, you can 
[click here](vscode:extension/emberjs.emberjs) to view this extension pack inside VSCode. Alternatively, you can 
also search for `emberjs.emberjs` inside the [extensions view](https://code.visualstudio.com/docs/editor/extension-gallery).

### Atom

If you are using [Atom](https://atom.io) with `ember-cli`, there are some
packages available specific to Ember development.

`Atom -> Preferences -> Install`

* [ember-cli-helper](https://atom.io/packages/ember-cli-helper) - ember-cli integration in Atom
* [ember-tabs](https://atom.io/packages/ember-tabs) - Makes atom.io work better with Ember pods
* [atom-ember-components](https://atom.io/packages/atom-ember-components) - See all controllers and components that are rendering your component. Currently only works with pods structure.

### Emacs

If you are using [Emacs](https://www.gnu.org/software/emacs/) with `ember-cli`,
Emacs creates temporary backup, autosave, and lockfiles that interfere with
broccoli watcher, so they need to either be moved out of the way or disabled.
To do that, ensure your emacs configuration contains the following:

```bash
(setq backup-directory-alist `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms `((".*" ,temporary-file-directory t)))
(setq create-lockfiles nil)
```

An [ember-mode](https://github.com/madnificent/ember-mode) package is also
available. It has shortcuts for quickly navigating files in ember projects,
running generators, and running build, serve, and test tasks. It also includes
support for linking build errors to files and minibuffer notifications of
`ember serve` status. It can be installed from [MELPA](http://melpa.org/). To
use MELPA, ensure your configuration contains the following:

```bash
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "http://melpa.org/packages/") t)
(package-initialize)
```

Then ember-mode can be installed from the package menu at `M-x
package-list-packages`. After it is installed, add a file named
`.dir-locals.el` to the root of your ember projects with the contents:

```bash
((nil . ((mode . ember))))
```

to enable it inside those projects.


### Sublime Text

If you are using [Sublime Text](http://www.sublimetext.com) with `ember-cli`,
by default it will try to index all files in your `tmp` directory for its
GoToAnything functionality.  This will cause your computer to come to a
screeching halt @ 90%+ CPU usage, and can significantly increase build times.
Simply remove these directories from the folders Sublime Text watches:

`Sublime Text -> Preferences -> Settings - User`

```js
// folder_exclude_patterns and file_exclude_patterns control which files
// are listed in folders on the side bar. These can also be set on a per-
// project basis.
"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS", "tmp/class-*", "tmp/es_*", "tmp/jshinter*", "tmp/replace_*", "tmp/static_compiler*", "tmp/template_compiler*", "tmp/tree_merger*", "tmp/coffee_script*", "tmp/concat-tmp*", "tmp/export_tree*", "tmp/sass_compiler*"]
```

### WebStorm
If you are using [WebStorm](https://www.jetbrains.com/webstorm/) with
`ember-cli`, you will need to modify your `.gitignore` file, enable
`ECMAScript6` settings, and mark certain directories.

First, add the following line to `.gitignore`:
```bash
.idea
```

Next, from the WebStorm menu:

`File > Settings -> Languages & Frameworks -> JavaScript -> ECMAScript6`

Click 'OK' to close the Settings modal window.

Next, in Webstorm's Project window right-click on each of the following
directories, go to 'Mark Directory As' and mark as indicated:

Mark as `Excluded`:
```bash
/tmp
/dist
```

Mark as `Resource Root`:
```bash
/
/bower_components
/bower_components/ember-qunit/lib
/public
```

Mark as `Test Sources Root`:
```bash
/tests
```

### Intellij-emberjs

[This plugin](https://github.com/Turbo87/intellij-emberjs) provides excellent
Ember.js support for all JetBrains IDEs that support JavaScript, including
WebStorm.

In order to install it, go to:

`File | Settings... | Plugins | Browse repositories...`

Search for `Ember.js` and click the Install button.

### Vim

If you are using [Vim](http://www.vim.org/) with `ember-cli`, Vim creates
temporary backups and autosaves which interfere with broccoli, so they need to
either be moved out of the way or disabled. To do that, ensure your .vimrc
contains the following:

```bash
set backupdir=~/.vim/backup//
set directory=~/.vim/swap//
set undodir=~/.vim/undo//
```

And make sure to create the directories: 
```bash
mkdir -p ~/.vim/backup; mkdir -p ~/.vim/swap; mkdir -p ~/.vim/undo
```

Some useful Vim plugins for working with Ember.js:

- [ember_tools](https://github.com/AndrewRadev/ember_tools.vim) - Provides various tools for navigation and code reformatting, similar to rails.vim for Rails.
- [projectionist](https://github.com/tpope/vim-projectionist) - Powerful project navigation, provided you write your own code projections. Here's [an example](https://gist.github.com/AndrewRadev/3524ee46bca8ab349329)

## Debugging Node Code

Node's debugger with Chrome's DevTools can debug node code in an addon or app. For example, debugging Broccoli errors in an addon's `index.js`.

To use the node debugger, open Chrome DevTools with  `chrome://inspect` or use the [Node.js - inspection manager (NiM)](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj) from the Chrome web store. See Node [documentation](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55) for details.

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
