<!-- should show ember build, link to ember-cli-deploy, Guides tutorial -->

No matter where you are deploying your app to, the Ember CLI and community ecosystem have tools to help. In this section of the guide, we will go over some general approaches and common configurations.

## Behind the scenes of deploying

No matter which framework you use, there are some processing steps that the code probably has to go through before it is ready to be shared on the internet. For some frameworks, you need to learn all these steps and choose your own toolset. However, thanks to the hard work of many contributors across the years, the Ember CLI and community tools already have these steps set up.

As a result, you may not need to understand or configure build steps, but it's still helpful to have some background knowledge and terminology. Here are some common steps that the Ember CLI handles for you:

- compilation - Instead of having dozens of files, many are combined together into a smaller number
- minification and uglification - code is optimized for speedy execution by the browser, as opposed to human readability
- transpilation - modern JavaScript APIs are not available in some browsers, but that doesn't have to stop developers! Tools like Babel are used by many frameworks to turn newer JavaScript into code that still runs in older browsers.
- transformations - things like stripping out code comments

## How to deploy

Behind the scenes, deploying an app has two steps: building the app for production and pushing the result to a web server for hosting.  

There are three main options for deploying your app: using the `ember build` command, installing `ember-cli-deploy`, or using pre-made build packs. 

### `ember build` and upload

If you already have a hosting plan in mind, you can build the app from the command line and then use `scp` or `rsync` to upload the files.

It's important to set the environment to `production` so that your app receives the right treatment for minification and fingerprinting:

```
ember build --environment=development
```

For a tutorial that shows how to build your app and upload it to a web host using `scp` and `rsync`, see the [Official Ember.js Tutorial](https://guides.emberjs.com/release/tutorial/deploying/).

### Ember CLI Deploy

[ember-cli-deploy](http://ember-cli-deploy.com/) is a very popular community-built plugin for the Ember CLI. What this means is that it's not built into the CLI by default, but it adds commands and configurations that should feel familiar to an Ember developer. The main benefit is that you set it up once and may never have to think about it again.

`ember-cli-deploy` is a fairly generic tool that adds the `ember deploy` command and some configuration files to your project. There are many [`ember-cli-deploy` plugins](https://www.emberobserver.com/categories/ember-cli-deploy-plugins) that help you deploy to many diffent destinations and web hosting services, such as AWS S3 or GitHub pages.

The best way to get started using ember-cli-deploy is to visit the [documentation](http://ember-cli-deploy.com/) for the project.

### Using Build Packs

Some hosting service providers offer automated deployment in other ways.
For example, Heroku has a build pack and CLI of their own that provides a zero-config deployment! The step-by-step examples are available at [https://www.heroku.com/emberjs](https://www.heroku.com/emberjs)

Do you know of any other hosting services that make it easy to deploy Ember apps?
Please [open an issue](https://github.com/ember-learn/cli-guides-source) for this Guide.

### History API and Root URL

If you are deploying the app to somewhere other than the `rootURL` (`/`),
you will need to configure the value of `rootURL` in `config/environment.js`.
This is required for the History API, and thus also the Router, to function correctly.

For example

{% highlight javascript %}
// config/environment.js
if (environment === 'production') {
  ENV.rootURL = '/path/to/ember/app/';
}
{% endhighlight %}

This will also be used as a prefix for assets, eg `/path/to/ember/app/assets/vendor.js`. However when
building for production the value of `prepend` for `fingerprint` will be used instead. So for

{% highlight bash %}
ember build --prod
{% endhighlight %}

with

{% highlight javascript %}
// ember-cli-build.js
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
{% endhighlight %}

the asset URLs will not use `rootURL` and will instead be:
`https://cdn.example.com/assets/vendor-3b1b39893d8e34a6d0bd44095afcd5c4.js`.

As of version 2.7, `baseURL` is deprecated and `rootURL` should be used
instead. See this [blog post](http://emberjs.com/blog/2016/04/28/baseURL.html)
for more details.

### Content Security Policy

For those interested in enhanced security for their web application, they
should consider the setting up a content-security policy even for development.
That way security violations can be discovered immediately, rather than in
production.

For more information, see the [`ember-cli-content-security-policy` README.]( https://github.com/rwjblue/ember-cli-content-security-policy)

### Deploying an HTTPS server using Nginx on a Unix/Linux/MacOSx machine

The following is a simple deployment with https using nginx.  Http just
redirects to the https server here.  Don't forget to include your ssl keys in
your config.

Before deployment make sure you run this command to populate the dist directory:

{% highlight bash %}
ember build --environment="production"
{% endhighlight %}

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