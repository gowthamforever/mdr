import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  opentok: service(),
  session: service(),
  supported_browser: true
});
