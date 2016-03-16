import Ember from 'ember';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

export default Route.extend(Api, {
  model() {
    const self = this;

    return new Promise((resolve) => {
      self.ajax({ id: 'logout' }).then(() => {
        resolve();
      }).catch(() => {
        resolve();
      });
    });
  },

  redirect() {
    window.location = document.location.href.replace(location.hash , "" );
  }
});
