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
  role: null,
  role_admin: true,//equal('role', 'admin'),
  role_doctor: false,//equal('role', 'doctor'),
  emailId: null,
  firstName: null,
  lastName: null,
  middleName: null,
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
