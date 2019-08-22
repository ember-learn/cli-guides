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
  "port" : 8080,
  "proxy": "http://localhost:3000"
}
```

For a complete list of command line options run `ember help`.
