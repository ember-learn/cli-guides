For most Ember applications, Ember CLI "just works". Run `ember server` in your Terminal and you get
a LiveReload development server at `http://localhost:4200`. Run `ember build`, and you get a `dist/`
directory with compiled assets ready to be deployed to your production server.

But things don't always go smoothly and CLI commands can fail inexplicably with error messages that are
difficult to understand or act upon. In these cases, it can be useful to have tools to figure out what
went wrong.

In most programming languages, the two most useful debugging tools are logging and breakpoints. Let's
cover both of these tools in the context of Ember CLI.

## Logging

Ember CLI's default output is pretty quiet. Under the hood it uses [the `debug` library][7] to log messages.
You can see this output by setting the `DEBUG` environment variable to `*` or `ember-cli:*`.
Typically, environment variables specific to a command are set by prefixing the command. For example:

```bash
DEBUG=ember-cli:* ember build
```

If you set the variable to `*`. Consult the `debug` library documentation for additional ways to
focus on the logs you care about.

## Breakpoints

As a JavaScript programmer or Ember Application author, you may be used to using the `debugger` statement
to pause execution and enter a REPL where you can inspect the current state of the program. By default,
when you run a Node.js program such as `ember build`, `debugger` statements are ignored. In order to
pause execution and enter a REPL as you can in a browser, you can use `node inspect`. For example,
set a `debugger` at the top of `ember-cli-build.js`, and then run:

```bash
node inspect ./node_modules/.bin/ember build
```

You'll first see the build command pause at the start of the program. You can tell it to continue
by typing `cont` (or simply `c`). Once the program begins executing, it will stop at any `debugger`
statements it finds. You can then enter a REPL, by typing `repl`.

Read more about [debugging Node.js here][1].

## Linking Addons

While logging and breakpoints are useful, there are additional challenges when the code you're trying
to debug lives in an Ember addon (or other module). A useful way of debugging addons or testing changes
is to use [`npm link`][2]. Although linking dependencies is not specific to Ember addons, for debugging
*run* time code (such as Components or Services) while the development server is running, you can return `true`
from the `isDevelopingAddon` method in `index.js`. This will ensure that the Ember CLI knows to rebuild
your app when code in the linked addon changes.

For example, if your app installs [`ember-power-select`][3], and you want to test a code change, you can:

1. Clone the repo: `git clone git@github.com:cibernox/ember-power-select.git`
1. In the `index.js` file make sure that the object exported has a method called `isDevelopingAddon` and it returns `true`.
1. In the addon repo, run `npm link`
1. In your app, run `npm link ember-power-select`

You can verify this did the intended thing by checking id `node_modules/ember-power-select` is now
a symlink pointing to the cloned repo.

Now, in your app, if you run `ember server`, it should use the linked repo and any code changes in
your local clone of `ember-power-select` should get picked up by the app.

## Broccoli Debug

Ember CLI is a wrapper around the [Broccoli][4] asset pipeline. Most of the functionality that Ember CLI
provides (asset compilation, fingerprinting, integrating addons, etc) is implemented through various
[Broccoli plugins][5]. Because this plugin system is unique to Broccoli, a unique debugging plugin
can sometimes be helpful. This is also implemented as the [`broccoli-debug`][6] plugin. Check
out the documentation in its README to learn how to use it!


[1]: https://nodejs.org/api/debugger.html
[2]: https://docs.npmjs.com/cli/link
[3: https://www.emberobserver.com/addons/ember-power-select
[4]: https://broccoli.build
[5]: https://broccoli.build/plugins.html
[6]: https://github.com/broccolijs/broccoli-debug
[7]: https://www.npmjs.com/package/debug
