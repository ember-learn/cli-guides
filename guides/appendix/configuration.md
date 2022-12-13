Ember CLI’s runtime is configurable via a file named `.ember-cli`. The JSON-formatted file is in project's root directory and can include any command-line options for `ember generate`, `ember serve` or `ember test`.

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
  "proxy": "http://localhost:3000"
}
```

### `package.json` Configuration

Some configuration is exposed through your `package.json` file.

If you have a nested repo structure (e.g., a monorepo using yarn workspaces) and want to allow `ember s` from the root of the repo, you can configure your `package.json` to look like:

```json {data-filename=package.json}
{
  "name": "top-level-workspaces-repo",
  "ember-addon": {
    "projectRoot": "./packages/path-to-ember-application"
  }
}
```

### List of command line options for:

### `ember generate <blueprint> <options...>`

```shell
  --dry-run (Boolean) (Default: false)
  --verbose (Boolean) (Default: false)
  --pod (Boolean) (Default: false)
  --classic (Boolean) (Default: false)
  --dummy (Boolean) (Default: false)
  --in-repo-addon (String) (Default: null)
  --in (String) (Default: null) Runs a blueprint against an in repo addon. A path is expected, relative to the root of the project.
```

### `ember serve <options...>`

```shell
  --port (Number) (Default: 4200) To use a port different than 4200. Pass 0 to automatically pick an available port.
  --host (String) Listens on all interfaces by default
  --proxy (String)
  --proxy-in-timeout (Number) (Default: 120000) When using --proxy: timeout (in ms) for incoming requests
  --proxy-out-timeout (Number) (Default: 0) When using --proxy: timeout (in ms) for outgoing requests
  --secure-proxy (Boolean) (Default: true) Set to false to proxy self-signed SSL certificates
  --transparent-proxy (Boolean) (Default: true) Set to false to omit x-forwarded-* headers when proxying
  --watcher (String) (Default: events)
  --live-reload (Boolean) (Default: true)
  --live-reload-host (String) Defaults to host
  --live-reload-base-url (String) Defaults to baseURL
  --live-reload-port (Number) Defaults to same port as ember app
  --live-reload-prefix (String) (Default: _lr) Default to _lr
  --environment (String) (Default: development) Possible values are "development", "production", and "test".
  --output-path (Path) (Default: dist/)
  --ssl (Boolean) (Default: false) Set to true to configure Ember CLI to serve using SSL.
  --ssl-key (String) (Default: ssl/server.key) Specify the private key to use for SSL.
  --ssl-cert (String) (Default: ssl/server.crt) Specify the certificate to use for SSL.
  --path (Path) Reuse an existing build at given path.
```

### `ember test <options...>`

```shell
  --environment (String) (Default: test) Possible values are "development", "production", and "test".
  --config-file (String)
  --server (Boolean) (Default: false)
  --host (String)
  --test-port (Number) (Default: 7357) The test port to use when running tests. Pass 0 to automatically pick an available port
  --filter (String) A string to filter tests to run
  --module (String) The name of a test module to run
  --watcher (String) (Default: events)
  --launch (String) (Default: false) A comma separated list of browsers to launch for tests.
  --reporter (String) Test reporter to use [tap|dot|xunit] (default: tap)
  --silent (Boolean) (Default: false) Suppress any output except for the test report
  --ssl (Boolean) (Default: false) Set to true to configure testem to run the test suite using SSL.
  --ssl-key (String) (Default: ssl/server.key) Specify the private key to use for SSL.
  --ssl-cert (String) (Default: ssl/server.crt) Specify the certificate to use for SSL.
  --testem-debug (String) File to write a debug log from testem
  --test-page (String) Test page to invoke
  --path (Path) Reuse an existing build at given path.
  --query (String) A query string to append to the test page URL.
  --output-path (Path)
```

For a complete list of command line options and aliases run `ember help`.
