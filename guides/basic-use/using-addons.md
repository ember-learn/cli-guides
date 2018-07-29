# Using addons

Check out [Ember Observer](https://www.emberobserver.com/) to see what kinds of npm libraries are ready-made for your app!

The modern web developer has an incredible selection of open source code that they can use through the npm ecosystem, plus great tools for writing their own modules. Ember developers are free to use regular npm packages in their apps, but there are also thousands of packages that are made specifically for the Ember ecosystem. We call such packages "addons."

Addons are often JavaScript code, reusable UI components, compiling tools, deployment pipelines, templates, stylesheets, and more. Think of addons as node.js libraries with superpowers. In addition to the usual functionality of an npm package, addons can also help with generating new files, preprocessing, file fingerprinting, and more.

## Finding and using community addons

[Ember Observer](https://www.emberobserver.com/) is the definitive way to explore community addons. Although addons can be found by [searching the npm repository directly](https://www.npmjs.com/search?q=ember), Ember Observer has ranked lists of the most popular addons and ratings to help developers choose between them. Most are made to drop right into your app with zero configuration. Many addons are backwards-compatible to earlier versions of Ember too!

To install an addon, use:

```bash
ember install <addon-name>
```

To be safe, it's a good idea to restart the local server after installing new dependencies, and especially before trying to debug an addon that isn't working. Also, be sure to check out the project's README to see if there are any additional installation steps to take.

The `ember install` command is similar to the `npm install` you might already be familiar with. It creates an entry in the app's `package.json` and downloads the addon and its dependencies into a `node_modules` directory. However, `ember install` does even more than `npm`. Some addons create new files or make modifications to your app when they are installed via `ember install`.

### Choosing an addon

The [top 100 list](https://www.emberobserver.com/lists/top-addons) is an important first stop for new developers. Many Ember users have a personal set list of addons that they include in all their apps, and this is the best way to find out what those addons might be. Some addons are totally unique to Ember, while others exist to make it easier to use features of regular npm packages within an app.

For example, these community-authored addons bring in familiar functionality from regular npm packages:

- Stylesheet tooling like [ember-cli-sass](https://www.emberobserver.com/addons/ember-cli-sass), which provides [Sass](https://sass-lang.com/) as an alternative to plain CSS
- JavaScript utilities like [ember-moment](https://www.emberobserver.com/addons/ember-moment), which offers some Ember conveniences to the base [moment library](https://www.npmjs.com/package/moment)
- Full UI frameworks and design kits like [ember-bootstrap](https://www.emberobserver.com/addons/ember-bootstrap), [semantic-ui-ember](https://www.emberobserver.com/addons/semantic-ui-ember), and [ember-paper](https://www.emberobserver.com/addons/ember-paper). These offer easier, more reliable, more performant functionality than just using the npm packages directly.

Here are just a few examples of popular community-maintained addons unique to Ember, in no particular order:

- A wealth of UI component libraries, like [ember-power-select]() and [ember-basic-dropdown](https://www.emberobserver.com/addons/ember-basic-dropdown)
- Tools to automate deployment, like [ember-cli-deploy](https://www.emberobserver.com/categories/deployment) and its own ecosystem of plugins
- Testing tools like [ember-test-selectors](https://www.emberobserver.com/addons/ember-test-selectors), to make DOM assertions in testing easier and clearer, and [ember-a11y-testing](https://www.emberobserver.com/addons/ember-a11y-testing) to check for accessibility
- Authentication libraries and plugins, like [torii](https://www.emberobserver.com/addons/torii) and [ember-simple-auth](https://www.emberobserver.com/addons/ember-simple-auth), and [ember-oauth2](https://www.emberobserver.com/addons/ember-oauth2)
- Async and state management tools like [ember-concurrency](https://www.emberobserver.com/addons/ember-concurrency) and [ember-lifeline](https://www.emberobserver.com/addons/ember-lifeline). Don't let a user's impatient clicks kick off 100 API requests.
- [liquid-fire](https://www.emberobserver.com/addons/liquid-fire), for animating things like route transitions to provide a smooth, native-app-like experience.
- and so many more!

Open Source projects like these addons rely on community members helping out. Some addons are sponsored by companies, but many are maintained on 100% volunteer time. If something doesn't work the way you expect, could be better documented, has a bug, or could be added as a new feature, please speak up and pitch in!