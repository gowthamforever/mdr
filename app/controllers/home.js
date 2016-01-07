import Ember from 'ember';

const {
  Controller,
  inject
} = Ember;

const {
  service
} = inject;

export default Controller.extend({
  session: service()
});
