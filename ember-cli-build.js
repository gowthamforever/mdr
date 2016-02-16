/*jshint node:true*/
/* global require, module */
var EmberApp = require('ember-cli/lib/broccoli/ember-app');
var mergeTrees = require('broccoli-merge-trees');
var pickFiles = require('broccoli-static-compiler');

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Add options here
    emberCliFontAwesome: {
      useScss: true
    },

    fingerprint: {
      exclude: ['img']
    },

    intlTelInput: {
      includeUtilsScript: true
    }
  });

  // Use `app.import` to add additional libraries to the generated
  // output files.
  //
  // If you need to use different assets in different
  // environments, specify an object as the first parameter. That
  // object's keys should be the environment name and the values
  // should be the asset to use in that environment.
  //
  // If the library that you are including contains AMD or ES6
  // modules that you would like to import into your application
  // please specify an object with the list of modules as keys
  // along with the exports of each module as its value.
  app.import('bower_components/lodash/dist/lodash.min.js');
  app.import('bower_components/moment/min/moment.min.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/bootstrap/dist/js/bootstrap.js');
  app.import('bower_components/pickadate/lib/picker.js');
  app.import('bower_components/pickadate/lib/picker.date.js');
  app.import('bower_components/pickadate/lib/picker.time.js');
  app.import('bower_components/fullcalendar/dist/fullcalendar.js');
  app.import('bower_components/bootstrap-switch/dist/js/bootstrap-switch.js');

  app.import('bower_components/bootstrap/dist/css/bootstrap.css');
  //app.import('bower_components/bootstrap/dist/css/bootstrap-theme.css');
  app.import('bower_components/font-awesome/css/font-awesome.css');
  app.import('bower_components/pickadate/lib/themes/classic.css');
  app.import('bower_components/pickadate/lib/themes/classic.date.css');
  app.import('bower_components/pickadate/lib/themes/classic.time.css');
  app.import('bower_components/fullcalendar/dist/fullcalendar.css');
  app.import('bower_components/bootstrap-switch/dist/css/bootstrap3/bootstrap-switch.css');

  app.import('vendor/opentok.js');

  var fontTree = pickFiles('bower_components/font-awesome/fonts', {
    srcDir: '/',
    destDir: '/fonts'
  });

  return mergeTrees([app.toTree(), fontTree]);
};
