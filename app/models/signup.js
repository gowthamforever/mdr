import Ember from 'ember';
import Constants from 'mdr/utility/constants';

export default Ember.Object.extend({
  agencyName: null,
  eiNo: null,
  address: null,
  state: null,
  city: null,
  zip: null,
  country: 'United States',
  timezone: null,
  phoneNo: null,
  altPhoneNo: null,
  faxNo: null,
  isSecondaryAddress: false,
  secondaryAddress: null,
  secondaryState: null,
  secondaryCity: null,
  secondaryZip: null,
  secondaryCountry: 'United States',
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  firstName: null,
  lastName: null,
  email: null,
  confirmEmail: null,
  password: null,
  confirmPassword: null
});
