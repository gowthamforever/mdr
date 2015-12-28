import Ember from 'ember';

const {
  Service,
  inject,
  computed
} = Ember;

const {
  service
} = inject;

const {
  and
} = computed;

export default Service.extend({
  session: service(),
  showLoginBtn: false,
  showLoginBlock: and('session.isNotAuthenticated', 'showLoginBtn'),
  showAuthenticatedBlock: false
});
