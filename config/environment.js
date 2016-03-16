/* jshint node: true */

const contentSecurityPolicy = {
  'default-src': "'none'",
  'object-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'script-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'font-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'connect-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'img-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'style-src': "'self' 'unsafe-inline' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'media-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2",
  'frame-src': "'self' devapi-mdrealtime.elasticbeanstalk.com static.opentok.com hlg.tokbox.com anvil.opentok.com mantis003-nyj.tokbox.com wss://mantis005-sjc.tokbox.com/rumorwebsocketsv2"
}

module.exports = function(environment) {
  const ENV = {
    modulePrefix: 'mdr',
    contentSecurityPolicy: contentSecurityPolicy,
    environment: environment,
    baseURL: '/',
    locationType: 'hash',
    EmberENV: {
      FEATURES: {
        // Here you can enable experimental features on an ember canary build
        // e.g. 'with-controller': true
      }
    },

    APP: {
      // Here you can pass flags/options to your application instance
      // when it is created
    }
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
    ENV.baseURL = '/';
    ENV.locationType = 'none';

    // keep test console output quieter
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;

    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {

  }

  return ENV;
};
