The [`ember new`](../cli-commands/#createanewapp) command generates the files and boilerplate directory structure for an Ember application. The tables list the directories and files generated for a new application.  See the Ember [tutorial](https://guides.emberjs.com/release/tutorial/) for more information how these are used when developing an application.

<table>
  <thead>
    <tr>
      <th class="col-32">File/directory</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>app/</code> </td>
      <td>
        This is where folders and files for models, components, routes, templates and styles are stored. The majority of the project code is in this folder. See the table below for details.
      </td>
    </tr>
     <tr>
      <td><code>config/</code></td>
      <td>
        The config directory contains the <code>environment.js</code> where you can configure settings for your app and <code>targets.js</code> where the browser build targets are set
      </td>
    </tr>
    <tr>
      <td><code>dist/</code></td>
      <td>
        Contains the application's distributable output. Ember transpiles the code with <a src="https://babeljs.io/"><code>Babel</code></a> and concatenates the code into a file called <code>&lt;app-name>.js</code>. The folder contents are deployed to the application's server
      </td>
    </tr>
    <tr>
      <td><code>public/</code></td>
      <td>
        This directory will be copied verbatim into the root of the built application. Use this for assets that don’t have a build step, such as images or fonts
      </td>
    </tr>
    <tr>
      <td><code>tests/</code></td>
      <td> 
        Includes the application’s unit and integration tests, as well as various helpers to load and run the tests 
      </td>
    </tr>
    <tr>
      <td><code>node_modules/</code></td>
      <td>npm dependencies (both default and user-installed) </td>
    </tr>
    <tr>
      <td><code>vendor/</code></td>
      <td>External dependencies not installed with npm </td>
    </tr>
      <tr>
      <td><code>.editorconfig</code></td>
      <td>  EditorConfig helps developers define and maintain consistent coding styles between different editors. See <a ref='editorconfig.org'><code>editorconfig.org</code></a> </td>
    </tr>
    <tr>
      <td><code>.eslintrc.js</code></td>
      <td> ESLint configuration </td>
    </tr>
    <tr>
      <td><code>.eslintignore</code></td>
      <td> ESLint configuration for ignored files</td>
    </tr>
    <tr>
      <td><code>.gitignore</code></td>
      <td> Git configuration for ignored files </td>
    </tr>
    <tr>
      <td><code>.template-lintrc.js</code></td>
      <td> Configuration file for <a src="https://github.com/ember-template-lint/ember-template-lint"><code>ember-template-lint</code></a> rules </td>
    </tr>
    <tr>
      <td><code>.travis.yml</code></td>
      <td>Boiler plate configuration file for testing on <a src="https://travis-ci.org/"><code>Travis CI</code></a></td>
    </tr>
    <tr>
      <td><code>ember-cli-build.js</code></td>
      <td> 
        This file describes how Ember CLI should build our app.  Ember uses <a src="https://broccoli.build/"><code>Broccoli</code></a> to build the application
      </td>
    </tr>
    <tr>
      <td><code>package.json</code></td>
      <td>npm configuration and dependency list</td>
    </tr>
    <tr>
      <td><code>testem.js</code></td>
      <td>
      Ember CLI's test runner <code>Testem</code> is configured in testem.js.
      </td>
    </tr>
  </tbody>
</table>

#### Layout within `app` directory

<table>
  <thead>
    <tr>
      <th class="col-32">File/directory</th>
      <th>Purpose</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>app/app.js</code></td>
      <td>The application’s entry point. This is the first executed module</td>
    </tr>
    <tr>
      <td><code>app/index.html</code></td>
      <td>
        The only page of the generated single-page app. Includes dependencies, and kickstarts your Ember application. See <code>app/index.html</code> below
      </td>
    </tr>
    <tr>
      <td><code>app/router.js</code></td>
      <td>
      The applications route configuration. The routes defined here correspond to routes in <code>app/routes/</code>
      </td>
    </tr>
    <tr>
      <td><code>app/styles/</code></td>
      <td> 
        Contains the stylesheets, whether SASS, LESS, Stylus, Compass, or plain CSS (though only one type is allowed, see Asset Compilation). These are all compiled into <code>/dist/assets/&lt;app-name>.css</code>
      </td>
    </tr>
    <tr>
      <td><code>app/templates/</code></td>
      <td>
        The application's HTMLBars templates. These are compiled to <code>/dist/assets/&lt;app-name>.js</code>
      </td>
    </tr>
    <tr>
      <td><code>app/controllers/, app/models/, etc.</code></td>
      <td>
        The JavaScript files or modules that contain the applications logic
      </td>
    </tr>
  </tbody>
</table>

Note: The files in the `app/` directory are shown are for the `classic` project files layout. The layout will be slightly different if you use the `pods` project layout. See [Project Layouts](../../advanced-use/project-layouts/) for the differences between the two layouts.

#### `app/index.html`

The `app/index.html` file lays the foundation for the Ember application. This is where the basic DOM structure is laid out, the title attribute is set, and stylesheet/JavaScript includes are done. 

In addition to this, the file includes hooks - `{{content-for 'head'}}` and `{{content-for 'body'}}` - that can be used by addons to inject content into the application’s `head` or `body`. 

These hooks need to be left in place for the application to function properly however, they can be safely ignored unless you are directly working with a particular addon.

## Naming conventions

[Ember Resolver](https://github.com/ember-cli/ember-resolver) is responsible for looking up code in your application and resolving its dependencies. The Resolver asks that you follow Ember's naming conventions.

If you use Ember CLI (`ember generate`) to create components, routes, etc., Ember will create files with correct names. In case you may manually create files, let's go over the naming conventions.

### File and directory names

File and directory names use `kebab-case` with lowercase letters and a hyphen between words.

```javascript {data-filename=app/models/user.js}
import Model from '@ember-data/model';

export default class UserModel extends Model {};
```

```javascript {data-filename=app/helpers/round-up.js}
import { helper } from '@ember/component/helper';

export default helper(function roundUp(params/*, hash*/) {
  return params;
});
```
`````

Files can also be nested to better manage your applications, for example:

```javascript {data-filename=app/routes/posts/new.js}
import Route from '@ember/routing/route';

export default class PostsNewRoute extends Route {};
```

Nested files can be referenced as either `posts/new` or `posts.new` when used in templates or JavaScript. 

### Components

`PascalCase` is used for components. For example, the 'nav-bar` component

```handlebars {data-filename=app/components/nav-bar.hbs}
<nav>
  ...
</nav>
```

would be resolved from the `PascalCase` component name in a template.

```handlebars {data-filename=app/templates/application.hbs}
<NavBar />
```

Component files can also be nested but use a special syntax to help the resolver. For example if the `nav-bar` component was in the `ui` directory

```handlebars {data-filename=app/components/ui/nav-bar.hbs}
<nav>
  ...
</nav>
```
 you would separate the directory and component using double colons `::`

```handlebars {data-filename=app/templates/application.hbs}
<Ui::NavBar />
```

If components are nested more than one level deep, separate each directory using double colons.

#### Tests

Ember automatically creates the appropriate test when you use the Ember CLI but if you need to manually create a test, the filename must be suffixed with `-test.js` in order to run.
