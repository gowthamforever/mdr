import Ember from 'ember';

const {
  Service,
  computed
} = Ember;

const {
  not
} = computed;

export default Service.extend({
  isAuthenticated: true,
  role: null,
  emailId: null,
  firstName: null,
  lastName: null,
  middleName: null,
  isNotAuthenticated: not('isAuthenticated')
});
