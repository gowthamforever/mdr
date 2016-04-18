import Ember from 'ember';
import Constants from 'mdr/utility/constants';
import computed, { equal } from 'ember-computed-decorators';

const {
  Object: EmberObject
} = Ember;

export default EmberObject.extend({
  customer: undefined,
  form_status: undefined,
  ts_request: undefined,
  ts_request_endtime: undefined,
  last_updated_page: undefined,

  @equal('status', Constants.REQUEST_STATUS.ACCEPTED)
  accepted,

  @equal('form_status', Constants.FORM_STATUS.STARTED)
  form_started,

  @equal('form_status', Constants.FORM_STATUS.COMPLETED)
  form_completed,

  @computed('customer')
  customer_name(customer) {
    return `${customer.first_name} ${customer.last_name}`;
  },

  @computed('ts_request')
  ts_request_moment(ts_request) {
    return moment(ts_request, 'MM-DD-YYYY HH:mm');
  },

  @computed('ts_request_moment')
  ts_request_date(ts_request_moment) {
    return ts_request_moment.toDate();
  },

  @computed('ts_request_endtime')
  ts_request_endtime_moment(ts_request_endtime) {
    return moment(ts_request_endtime, 'MM-DD-YYYY HH:mm');
  },

  @computed('form_status', 'accepted')
  form_notstarted(form_status, accepted) {
    return (form_status || Constants.FORM_STATUS.NOT_STARTED) === Constants.FORM_STATUS.NOT_STARTED && accepted;
  }
});
