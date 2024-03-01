Ember CLI tracks data points related to its use. This information is used by the
Ember and Ember CLI core teams to identify upgrade blockers, monitor build performance, and understand which
features are being used. Users who are uncomfortable with this data collection can permanently disable it by
updating their `.ember-cli` file.

Ember CLI only tracks the following data points:

- ember CLI version
- build/rebuild/live-reload times
- how many errors occurred

**Note:** No personally identifying information is tracked, if something is
being leaked please [disclose responsibly](https://emberjs.com/security)

This information is used to:

- See if there are upgrade blockers (users stuck on old version)
- Have a broad idea for build performance (to make sure we don't regress, and how to prioritize)
- See which high-level features are used (serve/test/build/generate etc.)
- See an increase/decrease in error rates

## Still Not comfortable?

We understand! To permanently disable any analytics gathering you can update your project's `.ember-cli` file (or `$HOME/.ember-cli` for user-wide):

```json
{
  "disableAnalytics": true
}
```

## Who has access

The [Ember and Ember CLI core teams](https://emberjs.com/teams/).
These teams have been granted access to the analytics data in order to make informed decisions about the direction
and future of the projects.

## Links to each code-point where ember-cli emits tracking information

### Command Name: To understand what high-level features are used

- [ember-cli/lib/models/command.js](https://github.com/ember-cli/ember-cli/blob/2da9de596370c0e78ea0c0c3ffcd6a551d2863a9/lib/models/command.js#L277)

```js
this.analytics.track({
  name: 'ember ',
  message: this.name,
});
```

### Build Error: The name of the error

- [ember-cli/lib/models/watcher.js](https://github.com/ember-cli/ember-cli/blob/6ec50a1fd21d961f0b0e2ca4daf66a8e7dea6417/lib/models/watcher.js#L32-L34)

```js
this.analytics.trackError({
  description: error && error.message,
});
```

### Build/Rebuild Time: Can help identify areas of optimization

- [ember-cli/lib/tasks/build.js](https://github.com/ember-cli/ember-cli/blob/503ede1fcb5224d54dc36f82af84550a91d90f26/lib/tasks/build.js#L33)

```js
analytics.track({
  name: 'ember build',
  message: `${totalTime}ms`,
});
```

- [ember-cli/lib/tasks/build.js](https://github.com/ember-cli/ember-cli/blob/503ede1fcb5224d54dc36f82af84550a91d90f26/lib/tasks/build.js#L44)

```js
analytics.trackTiming({
  category: 'rebuild',
  variable: 'build time',
  label: 'broccoli build time',
  value: parseInt(totalTime, 10),
});
```

### Live Reload

- [ember-cli/lib/tasks/server/livereload-server.js](https://github.com/ember-cli/ember-cli/blob/503ede1fcb5224d54dc36f82af84550a91d90f26/lib/tasks/server/livereload-server.js#L167)

```js
this.analytics.track({
  name: 'broccoli watcher',
  message: 'live-reload',
});
```

- [ember-cli/lib/tasks/server/livereload-server.js](https://github.com/ember-cli/ember-cli/blob/503ede1fcb5224d54dc36f82af84550a91d90f26/lib/tasks/server/livereload-server.js#L181)

```js
this.analytics.track({
  name: 'express server',
  message: 'live-reload',
});
```
