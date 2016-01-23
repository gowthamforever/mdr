import Ember from 'ember';
import AppointmentFlags from 'mdr/mixins/appointment-flags';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;

const {
  equal,
  none,
  not
} = computed;

export default Ember.Object.extend(AppointmentFlags, {
  current_year: moment().year(),

  agency_id: null,
  customer_id: null,
  dob: null,
  age: computed('dob', function() {
    return moment(this.get('dob'), 'YYYY-MM-DD').month(0).from(moment().month(0)).split(' ')[0];
  }),
  email_id: null,
  first_name: null,
  gender: 'MALE',
  insurance_plan: null,
  insurance_plan_obj: computed('insurance_plan', function() {
    const insurance_plan = this.get('insurance_plan');
    return Constants.INSURANCE_PLANS.findBy('id', insurance_plan);
  }),
  language: null,
  last_name: null,
  pcd_name: null,
  photo: null,
  race: null,
  insurance: computed('insurance_plan', function() {
    return Constants.INSURANCE_PLANS.findBy('id', this.get('insurance_plan'));
  }),
  male: equal('gender', Constants.GENDER.MALE),
  female: equal('gender', Constants.GENDER.FEMALE),
  states: Constants.STATES,
  timezones: Constants.TIME_ZONES,
  months: Constants.MONTHS,
  races: Constants.RACES,
  languages: Constants.LANGAUAGES,
  insurance_plans: Constants.INSURANCE_PLANS,

  // For add client
  selected_race: null,
  selected_language: null,
  selected_timezone: null,
  phone1: null,
  phone2: null,
  address1: null,
  state1: null,
  selected_state_1: computed('state1', function() {
    const state1 = this.get('state1');
    return this.get('states').findBy('id', state1);
  }),
  cities1: null,
  selected_city_1: null,
  zip1: null,
  country1: 'United States',
  dependents: Constants.DEPENDENTS,
  memebership_name: 'individual',
  family_memebers: null,
  is_family: computed('memebership_name', function() {
    const memebership_name = this.get('memebership_name');
    const is_family        = memebership_name === 'family';

    this.set('family_memebers', null);
    if (is_family) {
      this.set('family_memebers', Ember.A());
    }

    return is_family;
  }),
  selected_insurance_plan: null,
  card_full_name: null,
  card_no: null,
  cvv: null,
  expiry_month: null,
  selected_expiry_month: computed('expiry_month', function() {
    const expiry_month = this.get('expiry_month');
    return this.get('months').findBy('id', expiry_month);
  }),
  expiry_years: computed('current_year', function() {
    const current_year = this.get('current_year');
    return _.range(current_year, current_year + 20);
  }),
  expiry_year: null,
  billing_is_primary: computed('address1', 'state1', 'city1', 'zip1', 'country1',
    'card_address', 'card_state', 'card_city', 'card_zip', 'card_country',
    'selected_state_1', 'selected_card_state', 'selected_city_1', 'selected_card_city', function() {
    if (this.get('address1') && this.get('address2')) {
      return this.get('address1') === this.get('card_address') &&
        this.get('state1') === this.get('card_state') &&
        this.get('city1') === this.get('card_city') &&
        this.get('zip1') === this.get('card_zip') &&
        this.get('country1') === this.get('card_country') &&
        this.get('selected_state_1') === this.get('selected_card_state') &&
        this.get('selected_city_1') === this.get('selected_card_city');
    }
    return false;
  }),
  card_type: 'visa',
  card_address: null,
  card_state: null,
  selected_card_state: computed('card_state', function() {
    const card_state = this.get('card_state');
    return this.get('states').findBy('id', card_state);
  }),
  card_cities: null,
  selected_card_city: null,
  card_zip: null,
  card_country: 'United States',

  on_billing_is_primary: computed('billing_is_primary', function() {
    this.setProperties({
      card_address: null,
      selected_card_state: null,
      selected_card_city: null,
      card_zip: null
    });

    return this.get('billing_is_primary');
  }),

  validationResult: null
});
