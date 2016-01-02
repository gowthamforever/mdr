import Ember from 'ember';

const {
  Service,
  computed
} = Ember;

const {
  equal,
  not
} = computed;

export default Service.extend({
  progressbar: false,
  loading: false,
  isAuthenticated: true,
  user_role: null,
  role_admin: equal('user_role', 'AAdmin'),
  role_super_admin: equal('user_role', 'ASuperAdmin'),
  role_global_admin: equal('user_role', 'AGlobalAdmin'),
  role_regional_admin: equal('user_role', 'ARegionalAdmin'),
  role_doctor: equal('user_role', 'ADoctors'),
  role_assessor: equal('user_role', 'AAssessors'),
  role_coordinator: equal('user_role', 'ACoordinator'),
  email_id: null,
  first_name: null,
  last_name: null,
  middle_name: null,
  isNotAuthenticated: not('isAuthenticated'),

  showProgressBar() {
    if (!this.get('progressbar')) {
      this.set('progressbar', true);
    }
  },

  hideProgressBar() {
    if (this.get('progressbar') && !this.get('loading')) {
      this.set('progressbar', false);
    }
  },

  showLoadingBar() {
    if (!this.get('progressbar')) {
      this.setProperties({
        progressbar: true,
        loading: true
      });
    }
  },

  hideLoadingBar() {
    if (this.get('progressbar')) {
      this.setProperties({
        progressbar: false,
        loading: false
      });
    }
  }
});
