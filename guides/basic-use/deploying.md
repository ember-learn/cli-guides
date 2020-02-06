No matter where you are deploying your app to, the Ember CLI and community ecosystem have tools to help. In this section of the guide, we will go over some general approaches and common configurations.

## Behind the scenes of deploying

No matter which framework you use, there are some processing steps that the code probably has to go through before it is ready to be shared on the internet. For some frameworks, you need to learn all these steps and choose your own toolset. However, thanks to the hard work of many contributors across the years, the Ember CLI and community tools already have these steps set up.

As a result, you may not need to understand or configure build steps, but it's still helpful to have some background knowledge and terminology. Here are some common steps that the Ember CLI handles for you:

- Compilation: Instead of having dozens of files, many are combined together into a smaller number.
- Minification and uglification: code is optimized for speedy evaluation by the browser, as opposed to human readability.
- Transpilation: modern JavaScript APIs are not available in some browsers, but that doesn't have to stop developers! Tools like Babel are used by many frameworks to turn newer JavaScript into code that still runs in older browsers.
- Transformations: things like stripping out code comments.

## How to deploy

Behind the scenes, deploying an app has two steps: building the app for production and pushing the result to a web server for hosting.

There are three main options for deploying your app: using the `ember build` command, installing `ember-cli-deploy`, or using pre-made build packs.

### `ember build` and upload

If you already have a hosting plan in mind, you can build the app from the command line and then use `scp` or `rsync` to upload the files.

It's important to set the environment to `production` so that your app receives the right treatment for minification and fingerprinting:

```shell
ember build --environment production
```

The results of the `build` command are placed in the `dist` directory within your project.

For a tutorial that shows how to build your app and upload it to a web host using `scp` and `rsync`, see the [Official Ember.js Tutorial](https://guides.emberjs.com/release/tutorial/deploying/).

### Ember CLI Deploy

[ember-cli-deploy](http://ember-cli-deploy.com/) is a very popular community-built addon for the Ember CLI. What this means is that it's not built into the CLI by default, but it adds commands and configurations that should feel familiar to an Ember developer. The main benefit is that you set it up once and may never have to think about it again.

`ember-cli-deploy` provides the `ember deploy` command, some build hooks, and configuration files to your project. There are many [`ember-cli-deploy` plugins](https://www.emberobserver.com/categories/ember-cli-deploy-plugins) that help you deploy to many different destinations and web hosting services, such as AWS S3 or GitHub pages.

The best way to get started using ember-cli-deploy is to visit the [documentation](http://ember-cli-deploy.com/) for the project.

### Using Build Packs

Some hosting service providers offer automated deployment in other ways.
For example, Heroku has a build pack and CLI of their own that provides a zero-config deployment! The step-by-step examples are available at [https://www.heroku.com/emberjs](https://www.heroku.com/emberjs)

Do you know of any other hosting services that make it easy to deploy Ember apps?
Please [open an issue](https://github.com/ember-learn/cli-guides-source) for this Guide.

## Common deployment configurations

Compared to developing an app locally, there are some options to consider when an app is in deployment. Some apps may not need to configure any of these options, but here are just a few of the most common examples to help you get started. For more details, see the [Advanced Use](../../advanced-use/) section of the CLI guides.

### Configuring `rootURL`

<!-- older docs reference the "History API". Is that still a thing? I took it out. (Jen) -->

Many Ember apps are served from the index of a domain, like `https://some-domain-name.com/`, which requires no configuration. However, if an app is served from somewhere other than the root `/` of the domain, like `https://some-domain-name.com/path/to/ember/app/`
you will need to configure the value of `rootURL` in `config/environment.js`.
This is required for Router to function correctly.

Here's an example of configuring rootURL:

```javascript {data-filename=config/environment.js}
if (environment === 'production') {
  ENV.rootURL = '/path/to/ember/app/';
}
```

The `rootURL` is used as a prefix for assets, e.g. `/path/to/ember/app/assets/vendor.js`. However when
building for production, the value of `prepend` for `fingerprint` will be used instead.

Here's an example of building for production and using the `fingerprint` and `prepend` configuration. The asset URLs will not use `rootURL`. Instead, the result will be
`https://cdn.example.com/assets/vendor-3b1b39893d8e34a6d0bd44095afcd5c4.js`.

```shell
ember build --environment production
```

```javascript {data-filename=ember-cli-build.js}
const EmberApp = require('ember-cli/lib/broccoli/ember-app');

module.exports = function(defaults) {
  let app = new EmberApp(defaults, {
    // Add options here
    fingerprint: {
      prepend: 'https://cdn.example.com/'
    }
  });

  return app.toTree();
};
```

Lastly, if you find yourself working with an older app, you may see references to `baseURL` rather than `rootURL`. `baseURL` was deprecated in 2.7 and removed in Ember 3.

### Content Security Policy

It is a best practice to define a Content Security Policy (CSP) for your application and to make it restrictive. A Content Security Policy configuration defines the list of places that your app should accept data from. For example, an app may allow stylesheets from a CDN and images from a specific data storage service. By forbidding everything else common Cross-Site-Scripting (XSS) attacks could be prevented.

The [`ember-cli-content-security-policy`](https://github.com/rwjblue/ember-cli-content-security-policy) addon helps you to develop and test your application with a CSP applied. It could also inject the CSP in the app as a meta tag on build time. As any other addon it should be installed using the Ember CLI:

```sh
ember install ember-cli-content-security-policy
```

It applies a strict CSP by default, which may break your application. You could relax the policy by configuring the addon. It's configuration is managed with a `config/content-security-policy.js` file.

To allow loading fronts from Google CDN the default configuration and deliver the CSP via meta tag the configuration could be changed to the following:

```javascript {data-filename=config/content-security-policy.js}
module.exports = function(environment) {
  return {
    delivery: ['meta'],
    policy: {
      // Deny everything by default
      'default-src':  ["'none'"],
      // Allow scripts, images and media from the same host as the index.html is served ('self')
      'script-src':   ["'self'"],
      'img-src':      ["'self'"],
      'media-src':    ["'self'"],
      // Style sheet should be loaded from same host and from https://fonts.googleapis.com for Google fonts
      'style-src':    ["'self'", 'https://fonts.googleapis.com'],
      // Only allow fonts from https://fonts.googleapis.com
      'font-src':     ['https://fonts.googleapis.com'],
    },
  };
};
```

Please find details about more advanced configuration options in the [documentation for the addon itself](https://github.com/rwjblue/ember-cli-content-security-policy#ember-cli-content-security-policy).

<div class="cta">
  <div class="cta-note">
    <div class="cta-note-body">
      <div class="cta-note-heading">Zoey says...</div>
      <div class="cta-note-message">
        The examples shown here reflect the latest version of the addon (<code>2.x</code>). If using the older version (<code>1.x</code>), please refer to the <a href="https://github.com/rwjblue/ember-cli-content-security-policy/tree/v1.1.1#ember-cli-content-security-policy">documentation for that version</a>.
      </div>
    </div>
    <img src="/images/mascots/zoey.png" role="presentation" alt="">
  </div>
</div>

### Serving your app securely across HTTPS

The use of HTTPS certificates is a best practice for web security and professionalism of any deployed apps for any framework. It is outside the scope of this guide to go into detail about how to manage HTTPS certificates, redirects, and web hosting details. However, front-end developers should be aware of security best practices and have a few hints to help them move in the right direction.

Plain old HTTP sites are likely to show your users security warnings and they are vulnerable to man-in-the-middle attacks. HTTPS certificates are available at no cost from many identity and hosting providers. However, even if you have an HTTPS certificate, you will still need a way to redirect any users who visit `http://your-ember-app.com`, for example.

The following is a simple http-to-https redirect using [nginx](https://nginx.org/en/). Don't forget to include your ssl keys in your config.

First, make a production build of your app. The results will be saved in the `dist` directory:

```shell
ember build --environment=production
```

<!-- Where does this file go, exactly? -->
Then, define an `nginx.conf` to be used on your server:

```text
#### File: nginx.conf

    ## Nginx Production Https Ember Server Configuration

    ## https site##
    server {
        listen      443 default;
        server_name <your-server-name>;
        #root        /usr/share/nginx/html;
        root        <root path to an ember /dist directory>;
        index       index.html index.htm;

        # log files
        access_log  /var/log/nginx/<your-server-name>.access.log;
        error_log   /var/log/nginx/<your-server-name>.error.log;

        # ssl files
        ssl on;
        keepalive_timeout   60;

        # include information on SSL keys, cert, protocols and ciphers
        # SSLLabs.com is a great resource for this, along with testing
        # your SSL configuration: https://www.ssllabs.com/projects/documentation/

        # Strict Transport Security
        add_header Strict-Transport-Security max-age=2592000;

        # proxy buffers
        proxy_buffers 16 64k;
        proxy_buffer_size 128k;

        ## default location ##
        location / {
            include /etc/nginx/mime.types;
            try_files $uri $uri/ /index.html?/$request_uri;
        }

    }

    ## http redirects to https ##
    server {
        listen      80;
        server_name <your-server-name>;

        rewrite ^/.*$ https://$host$request_uri? permanent;
    }
```
