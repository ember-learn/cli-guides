<!-- Copy over code editor content -->
<!-- This intro paragraph needs improvement -->

This section provides information on integrating Ember into various code editors and how to debug Ember CLI node code.

## Code editor integrations

### Visual Studio Code
If you are using [VSCode](https://code.visualstudio.com/) with Ember CLI, there's an [official
extension pack](https://marketplace.visualstudio.com/items?itemName=emberjs.emberjs#overview) 
maintained by the Ember Learning team that adds multiple Ember plugins that can help in 
Ember development. If you already have VSCode installed on your machine, you can 
[click here](vscode:extension/emberjs.emberjs) to view this extension pack inside VSCode. Alternatively, you can 
also search for `emberjs.emberjs` inside the [extensions view](https://code.visualstudio.com/docs/editor/extension-gallery).

### Atom

If you are using [Atom](https://atom.io) with Ember CLI, there are some
packages available specific to Ember development.

`Atom -> Preferences -> Install`

* [ember-cli-helper](https://atom.io/packages/ember-cli-helper) - Ember CLI integration in Atom
* [ember-tabs](https://atom.io/packages/ember-tabs) - Makes atom.io work better with Ember pods
* [atom-ember-components](https://atom.io/packages/atom-ember-components) - See all controllers and components that are rendering your component. Currently only works with pods structure.
* [atom-ember-snippets](https://atom.io/packages/ember-snippets) - Autocomplete for Ember module imports, component, service and route skeletons, and more. 

### Emacs

If you are using [Emacs](https://www.gnu.org/software/emacs/) with Ember CLI,
Emacs creates temporary backup, autosave, and lockfiles that interfere with
broccoli watcher, so they need to either be moved out of the way or disabled.
To do that, ensure your emacs configuration contains the following:

```shell
(setq backup-directory-alist `((".*" . ,temporary-file-directory)))
(setq auto-save-file-name-transforms `((".*" ,temporary-file-directory t)))
(setq create-lockfiles nil)
```

An [ember-mode](https://github.com/madnificent/ember-mode) package is also
available. It has shortcuts for quickly navigating files in Ember projects,
running generators, and running build, serve, and test tasks. It also includes
support for linking build errors to files and minibuffer notifications of
`ember serve` status. It can be installed from [MELPA](http://melpa.org/). To
use MELPA, ensure your configuration contains the following:

```shell
(require 'package)
(add-to-list 'package-archives
             '("melpa" . "http://melpa.org/packages/") t)
(package-initialize)
```

Then ember-mode can be installed from the package menu at `M-x
package-list-packages`. After it is installed, add a file named
`.dir-locals.el` to the root of your Ember projects with the contents:

```shell
((nil . ((mode . ember))))
```

to enable it inside those projects.


### Sublime Text

If you are using [Sublime Text](http://www.sublimetext.com) with Ember CLI,
by default it will try to index all files in your `tmp` directory for its
GoToAnything functionality.  This will cause your computer to come to a
screeching halt @ 90%+ CPU usage, and can significantly increase build times.
Simply remove these directories from the folders Sublime Text watches:

`Sublime Text -> Preferences -> Settings - User`

```javascript
// folder_exclude_patterns and file_exclude_patterns control which files
// are listed in folders on the side bar. These can also be set on a per-
// project basis.
"folder_exclude_patterns": [".svn", ".git", ".hg", "CVS", "tmp/class-*", "tmp/es_*", "tmp/jshinter*", "tmp/replace_*", "tmp/static_compiler*", "tmp/template_compiler*", "tmp/tree_merger*", "tmp/coffee_script*", "tmp/concat-tmp*", "tmp/export_tree*", "tmp/sass_compiler*"]
```

### WebStorm
If you are using [WebStorm](https://www.jetbrains.com/webstorm/) with
Ember CLI, you will need to modify your `.gitignore` file, enable
`ECMAScript6` settings, and mark certain directories.

First, add the following line to `.gitignore`:
```shell
.idea
```

Next, from the WebStorm menu:

`File > Settings -> Languages & Frameworks -> JavaScript -> ECMAScript6`

Click 'OK' to close the Settings modal window.

Next, in Webstorm's Project window right-click on each of the following
directories, go to 'Mark Directory As' and mark as indicated:

Mark as `Excluded`:
```shell
/tmp
/dist
```

Mark as `Resource Root`:
```shell
/
/bower_components
/bower_components/ember-qunit/lib
/public
```

Mark as `Test Sources Root`:
```shell
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

If you are using [Vim](http://www.vim.org/) with Ember CLI, Vim creates
temporary backups and autosaves which interfere with broccoli, so they need to
either be moved out of the way or disabled.

#### Change temporary backup and autosave locations

By default, Vim places the temporary backup and autosave files right next to
the associated file. If you change where Vim puts these backup and autosave files,
you can still get the benefits of these features without it interfering with Ember.js
or your build.

In your .vimrc, add:
```shell
set backupdir=~/.vim/backup//
set directory=~/.vim/swap//
set undodir=~/.vim/undo//
```

And make sure to create the directories: 
```shell
mkdir -p ~/.vim/backup; mkdir -p ~/.vim/swap; mkdir -p ~/.vim/undo
```

#### Disable temporary backups and autosave locations

If you'd like to disable backups, you could add to your .vimrc:
```shell
set nobackup
set noswap
set noundofile
```

#### Plugins

Some useful Vim plugins for working with Ember.js:

- [ember_tools](https://github.com/AndrewRadev/ember_tools.vim) - Provides various tools for navigation and code reformatting, similar to rails.vim for Rails.
- [projectionist](https://github.com/tpope/vim-projectionist) - Powerful project navigation, provided you write your own code projections. Here's [an example](https://gist.github.com/AndrewRadev/3524ee46bca8ab349329)

## Debugging Node code

Node's debugger and Chrome's DevTools can debug node code in an addon or app. For example, debugging Broccoli errors in an addon's `index.js`.

To use the node debugger, open Chrome DevTools with  `chrome://inspect` or use the [Node.js - inspection manager (NiM)](https://chrome.google.com/webstore/detail/nodejs-v8-inspector-manag/gnhhdgbaldcilmgcpfddgdbkhjohddkj) from the Chrome web store. See Node [documentation](https://nodejs.org/en/docs/guides/debugging-getting-started/#chrome-devtools-55) for details.

To debug, place a `debugger` statement where the code should break.  Then serve the application using

```shell
node --inspect node_modules/ember-cli/bin/ember serve
```

You will see a message like this in the console.


```shell
Debugger listening on ws://127.0.0.1:9229/9c664016-bcfa-444b-b7fe-57d91a0d6e8f
For help see https://nodejs.org/en/docs/inspector
Debugger attached.
```
If you used `chrome://inspect`, click on the `inspect` link to launch DevTools. NiM will automatically open DevTools.

Stop Ember serve using `Ctrl-C` and then close the DevTools tab.

### Debugging custom blueprints

You can use also use the node debugger when writing custom [blueprints](../../advanced-use/blueprints/). To debug a blueprint `index.js` file, place a `debugger` statement where the code should break and then generate the blueprint using

```shell
node --inspect-brk node_modules/ember-cli/bin/ember generate <my-blueprint> <name>
```
The debugger will pause on the first line of Ember's generator code. Click on the debugger's `run` button to go to your breakpoint.

## Proxying ajax requests

When using `ember serve`, by default all ajax requests will target the Ember server at `localhost:4200`.  You can use the `--proxy` flag to direct ajax requests to another address.  For example

```shell
ember server --proxy=http://localhost:8080
```
will proxy ajax requests to the server running at `http://localhost:8080`.  The `localhost:8080` address can be replaced with the IP address of any remote server.
