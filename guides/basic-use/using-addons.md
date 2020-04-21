The modern web developer has an incredible selection of open source code that they can use, plus great tools for writing their own modules.
There are thousands of packages that are made specifically for the Ember ecosystem. We call such packages "addons."
Ember developers are also
[free to use regular npm packages](https://guides.emberjs.com/release/addons-and-dependencies/managing-dependencies/) in their apps.

Addons can include JavaScript code, reusable UI components, compiling tools, data visualization tools, deployment pipelines, templates, stylesheets, and more.

Think of addons as node libraries with superpowers. In addition to the usual functionality of an npm package, addons can also help with generating new files, preprocessing, file fingerprinting, and more.

## Finding and using community addons

[Ember Observer](https://www.emberobserver.com/) is a great way to explore community addons. Although addons can be found by [searching the npm repository directly](https://www.npmjs.com/search?q=ember), Ember Observer has ranked lists of the most popular addons and ratings to help developers choose between them. Ember Observer is a community-run project that has some subjective aspects to the addon ratings.

Most addons are made to drop right into your app with zero configuration. Many addons are backwards-compatible with earlier versions of Ember too!

To install an addon, use:

```shell
ember install <addon-name>
```

To be safe, it's a good idea to restart the local server after installing new dependencies, and especially before trying to debug an addon that isn't working. Also, be sure to check out an addon project's README to see if there are any additional installation steps to take.

The `ember install` command is similar to the `npm install` you might already be familiar with. It creates an entry in the app's `package.json` and downloads the addon and its dependencies into a `node_modules` directory. However, `ember install` does even more than `npm`. Some addons create new files or make modifications to your app when they are installed via `ember install`.

### Choosing an addon

The [top 100 list](https://www.emberobserver.com/lists/top-addons) is an important first stop for new developers. Many Ember users have a list of addons that they include in all their apps, and this is the best way to browse some of them. Some addons are totally unique to Ember, while others exist to make it easier to use features of regular npm packages within an app.

For example, these community-authored addons bring in familiar functionality from regular npm packages:

- Stylesheet tooling like [ember-cli-sass](https://www.emberobserver.com/addons/ember-cli-sass), which provides [Sass](https://sass-lang.com/) as an alternative to standard CSS.
- JavaScript utilities like [ember-moment](https://www.emberobserver.com/addons/ember-moment), which offers some Ember conveniences to the base [moment library](https://www.npmjs.com/package/moment).
- Full UI frameworks and design kits like [ember-bootstrap](https://www.emberobserver.com/addons/ember-bootstrap), [semantic-ui-ember](https://www.emberobserver.com/addons/semantic-ui-ember), and [ember-paper](https://www.emberobserver.com/addons/ember-paper). These offer easier, more reliable, more performant functionality than just using the npm packages directly.
- TypeScript support through [ember-cli-typescript](https://github.com/typed-ember/ember-cli-typescript).
- Charting libraries like [ember-d3](https://github.com/ivanvanderbyl/ember-d3).

Here are examples of popular community-maintained addons that are unique to Ember, in no particular order:

- A wealth of UI component libraries, like [ember-power-select](https://www.emberobserver.com/addons/ember-power-select) and [ember-basic-dropdown](https://www.emberobserver.com/addons/ember-basic-dropdown).
- Tools to automate deployments, like [ember-cli-deploy](https://www.emberobserver.com/categories/deployment) and its own ecosystem of plugins.
- Testing tools like [ember-test-selectors](https://www.emberobserver.com/addons/ember-test-selectors), to make DOM assertions in testing easier and clearer, and [ember-a11y-testing](https://www.emberobserver.com/addons/ember-a11y-testing) to check for accessibility.
- Authentication libraries and plugins, like [torii](https://www.emberobserver.com/addons/torii) and [ember-simple-auth](https://www.emberobserver.com/addons/ember-simple-auth), and [ember-oauth2](https://www.emberobserver.com/addons/ember-oauth2).
- Async and state management tools like [ember-concurrency](https://www.emberobserver.com/addons/ember-concurrency) and [ember-lifeline](https://www.emberobserver.com/addons/ember-lifeline). Don't let a user's impatient clicks kick off 100 API requests.
- [liquid-fire](https://www.emberobserver.com/addons/liquid-fire), for animating things like route transitions to provide a smooth, native-app-like experience.
- [ember-intl](https://github.com/ember-intl/ember-intl) for internationalization of dates, numbers, and currencies.
- [ember-cli-mirage](https://www.ember-cli-mirage.com/) for stubbing data that would come from an API.

There are too many amazing addons to mention them all here! We thank everyone who shares their work with others through public addons.

### Extending Addons

Sometimes, it can be useful to extend code provided by an addon. Because runtime
code in an Ember app is *resolved*, rather than explicitly imported, the mechanism to overwrite it
is by placing a file where Ember's resolver expects it in the directory structure. Let's take a look
at how to do this through an example.

Consider an addon `ember-state-manager` that contains a `Service` class called `StateManager`.
This addon (if it follows conventions), will contain two files:

- `addon/services/state-manager.js`, and
- `app/services/state-manager.js`

Each of these files has a special purpose. The first file (in the `addon/` directory), contains
the source code of the `StateManager` class  and is *importable* with ES6 imports. The second file
contains only an import and an export statement, making it available for the *resolver*.
In order to extend this service, we must use both these key concepts.

In other words, we must export an extended version of the *importable* code at the *resolvable* path.
More concretely, we must create a file at `app/services/state-manager.js`  that imports the StateManager
class and extends it using JavaScript classes:

```javascript{data-file-name=app/services/state-manager.js}
import StateManager from 'ember-state-manager/services/state-manager';

export default class ExtendedStateManager extends StateManager {
  newMethod() {}

  existingMethod() {}
}
```

Now, anywhere this service is injected, the extended version will be used:

```javascript{data-file-name=app/components/button.js}
import Component from '@glimmer/component';
import { inject as service } from '@ember/service';

export default Button extends Component {
  // ExtendedStateManager!
  @service stateManager;
}
```

Although this example is for a Service class, the same basic mechanism can be used for anything else
in the app directory!

### Who creates addons?

People who are a lot like you!

This incredible ecosystem is possible thanks to the maintainers, contributors, and companies that donate their time to Open Source projects. If an addon doesn't work the way you expect, could be better documented, has a bug, or needs a new feature, please speak up and pitch in! Help from the community is essential to improve these projects and keep them healthy.

Learn more about how to write or contribute to addons in [Writing Addons](../../writing-addons/).
