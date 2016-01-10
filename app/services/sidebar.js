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
  open: true,
  session: service(),
  showSideBar: and('session.isAuthenticated', 'open'),

  toggle() {
    this.toggleProperty('open');
  }
});
