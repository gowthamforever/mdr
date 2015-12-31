import Ember from 'ember';

const {
  Service,
  inject
} = Ember;

const {
  service
} = inject;

export default Service.extend({
  session: service(),
  showLoginBtn: false
});
