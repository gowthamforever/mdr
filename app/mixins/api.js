import Ember from 'ember';
import Api from 'mdr/utility/api';

const {
  Mixin,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

export default Mixin.create({
  skip: false,

  ajax(request) {
    return new Promise((resolve, reject) => {
      let settings;
      let api;

      if (this.get('skip')) {
        resolve();
        return;
      }

      settings = {
        timeout: 120000,
        crossDomain: true
      };

      if (!request.id) {
        reject();
        return;
      }

      api = Api[request.id];

      if (!api) {
        reject();
        return;
      }

      settings.url = `${Api.MDR_API}${api.path}`;
      settings.method = api.method || 'GET';

      if (request.context) {
        settings.context = request.context;
      }

      if (request.data) {
        settings.data = request.data;
      }

      Ember.$.ajax(settings).done((...args) => {
        resolve(...args);
      }).fail((...args) => {
        reject(...args);
      });
    });
  }
});
