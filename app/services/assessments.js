import Ember from 'ember';
import Assessments from 'mdr/models/assessments';
import Assessment from 'mdr/models/assessment';
import Api from 'mdr/mixins/api';

const {
  Service,
  isEmpty,
  inject,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Service.extend(Api, {
  assessments: null,
  clients: service(),
  cache: false,

  getAssessments() {
    const self = this;
    return new Promise((resolve) => {
      if (self.get('cache')) {
        resolve(self.get('assessments'));
      } else {
        self.ajax({
          id: 'assessments'
        }).then((response) => {
          const assessments       = Assessments.create();
          const samha_assessments = self.createAssessments(response.samhassessmentList);

          samha_assessments.setEach('form_name', 'SAMHA');

          assessments.setProperties({
            samha_assessments
          });

          self.setProperties({
            assessments,
            cache: true
          });

          resolve(self.get('assessments'));
        }).catch(() => {
          resolve();
        });
      }
    });
  },

  createAssessments(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createAssessment(item)));
    }

    return result;
  },

  createAssessment(response) {
    const data = [
      'alt_info',
      'customer_id',
      'doctor_id',
      'id',
      'insurance_plan',
      'reason',
      'service_charge',
      'status',
      'ts_request',
      'ts_request_endtime',
      'form_status',
      'last_updated_page'
    ];
    let result = Assessment.create(_.pick(response, data));

    if (response.customer) {
      result.set('customer', this.get('clients').createClient(response.customer));
    }

    return result;
  }
});
