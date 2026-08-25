'use strict';

module.exports = function (environment) {
  let ENV = {
    modulePrefix: '@ember-learn/cli-guides',
    environment,
    rootURL: '/',
    locationType: 'trailing-history',
    historySupportMiddleware: true,

    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. EMBER_NATIVE_DECORATOR_SUPPORT: true
      },
      EXTEND_PROTOTYPES: {
        // Prevent Ember Data from overriding Date.parse.
        Date: false,
      },
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    },

    'ember-meta': {
      description: 'Ember CLI Guides',
    },

    guidemaker: {
      title: 'Ember CLI Guides',
      sourceRepo: 'https://github.com/ember-learn/cli-guides',
      sourceBranch: 'main',
    },

    'ember-showdown-shiki': {
      theme: 'github-dark',
      languages: [
        'bash',
        'css',
        'http',
        'javascript',
        'json',
        'json5',
        'ruby',
        'scss',
        'yaml',
        'typescript',
        'glimmer-js',
        'glimmer-ts',
        'handlebars',
      ],
    },

    infoBanner: {
      style: 'warning',
      content: `<em>This website is deprecated</em>. The default build environment switched to Vite at Ember 6.8 and supports Ember versions back to 3.28. See [Up to Date Build Tooling Documentation](https://guides.emberjs.com/release/build-tools/).`,
    },
  };

  if (environment === 'development') {
    // ENV.APP.LOG_RESOLVER = true;
    // ENV.APP.LOG_ACTIVE_GENERATION = true;
    // ENV.APP.LOG_TRANSITIONS = true;
    // ENV.APP.LOG_TRANSITIONS_INTERNAL = true;
    // ENV.APP.LOG_VIEW_LOOKUPS = true;
  }

  if (environment === 'test') {
    // Testem prefers this...
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  if (environment === 'production') {
    // here you can enable a production-specific feature
  }

  return ENV;
};
