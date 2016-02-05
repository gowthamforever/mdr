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
  ajaxCounter: 0,
  loading: false,
  isAuthenticated: false,
  user_role: null,
  role_admin: equal('user_role', 'AAdmin'),
  role_super_admin: equal('user_role', 'ASuperAdmin'),
  role_global_admin: equal('user_role', 'AGlobalAdmin'),
  role_regional_admin: equal('user_role', 'ARegionalAdmin'),
  role_doctor: equal('user_role', 'ADoctor'),
  role_assessor: equal('user_role', 'AAssessor'),
  role_coordinator: equal('user_role', 'ACoordinator'),
  role_staff: equal('user_role', 'AStaff'),
  email_id: null,
  first_name: null,
  last_name: null,
  middle_name: null,
  isNotAuthenticated: not('isAuthenticated'),

  showProgressBar() {
    this.incrementProperty('ajaxCounter');
    if (!this.get('progressbar')) {
      this.set('progressbar', true);
    }
  },

  hideProgressBar() {
    this.decrementProperty('ajaxCounter');
    if (this.get('progressbar') && !this.get('loading') && this.get('ajaxCounter') === 0) {
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
