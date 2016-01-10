import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

const {
  Route,
  run
} = Ember;

const {
  schedule
} = run;

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

Route.reopen({
  activate() {
    const self    = this;
    this._super(...arguments);

    schedule('afterRender', () => {
      const routeName = self.routeName;
      let title       = 'MDR';
      let mapping;
      let mappings;
      let parts;
      mappings = {};

      mapping = mappings[routeName];
      if (mapping) {
        title += ` - ${mapping}`;
      } else {
        parts = routeName.replace(/-/g, ' ').split('.');
        parts = parts.map((part) => part.capitalize());
        parts = parts.reverse();
        parts = parts.length > 2 ? parts.slice(0, 2) : parts;
        parts = parts.reverse();
        title += ` - ${parts.join(' | ')}`;
      }
      document.title = title;
    });
  }
});

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  ready() {
    this.inject('route', 'titlebar', 'service:titlebar');
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
