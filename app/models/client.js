import Ember from 'ember';
import Constants from 'mdr/utility/constants';

const {
  computed
} = Ember;
const { equal } = computed;

export default Ember.Object.extend({
  current_year: moment().year(),

  agency_id: null,
  customer_id: null,
  dob: null,
  age: computed('dob', function() {
    return moment(this.get('dob'), 'YYYY-MM-DD').month(0).from(moment().month(0)).split(' ')[0]
  }),
  email_id: null,
  first_name: null,
  gender: 'Male',
  insurance_plan: null,
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
  selected_state_1: null,
  cities1: null,
  cities2: null,
  selected_city_1: null,
  zip1: null,
  country1: 'United States',
  is_secondary_address: false,
  address2: null,
  selected_state_2: null,
  selected_city_2: null,
  zip2: null,
  country2: 'United States',
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
  selected_expiry_month: null,
  expiry_years: computed('current_year', function() {
    const current_year = this.get('current_year');
    return _.range(current_year, current_year + 20);
  }),
  selected_expiry_year: null,
  billing_is_primary: false,
  card_type: 'visa',
  card_address: null,
  selected_card_state: null,
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

  on_is_secondary_address: computed('is_secondary_address', function() {
    const is_secondary_address = this.get('is_secondary_address');

    if (this.get('is_secondary_address') && this.get('validationResult')) {
      this.get('validationResult').setProperties({
        address2: null,
        selected_state_2: null,
        selected_city_2: null,
        zip2: null
      });
    }
  }),

  validationResult: null
});
