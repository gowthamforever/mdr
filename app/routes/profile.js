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
    self.ajax({
      id: 'contact'
    }).then((response) => {
      console.log(response);
    });
  }
});
