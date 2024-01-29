Ember CLI’s runtime is configurable via a file named `.ember-cli`. The JSON-formatted file is in project's root directory and is merged with file of the same name in user's home directory (if applicable). Project level configuration has precedence. These files can include any command-line options for `ember generate`, `ember serve` or `ember test`.

Command line options are passed in a dasherized form on the command line but they must be in camel cased in `.ember-cli`. For example

```shell
ember serve --live-reload false
```

would be `liveReload` in the configuration file.

```json {data-filename=.ember-cli}
{
  "liveReload": false
}
```

Every development environment will be different but a realistic example setting `--port` and `--proxy` is shown below:

```json {data-filename=.ember-cli}
{
  // disableAnalytics added by ember new
  "disableAnalytics": false,
  "port": 8080,
  "proxy": "http://localhost:3000",
  "isTypeScriptProject": true
}
```

For a complete list of command line options run `ember help`.

### `isTypeScriptProject` option (default: `false`)

Allows users to mark an entire Ember app or addon as a TypeScript-first project. The presence of this flag would indicate that blueprints should output TypeScript by default, rather than JavaScript as they normally would.

## `package.json` Configuration

Some configuration is exposed through your `package.json` file.

If you have a nested repo structure (e.g., a monorepo using pnpm or yarn workspaces) and want to allow `ember s` from the root of the repo, you can configure your `package.json` to look like:

```json {data-filename=package.json}
{
  "name": "top-level-workspaces-repo",
  "ember-addon": {
    "projectRoot": "./packages/path-to-ember-application"
  }
}
```
