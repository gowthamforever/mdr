import Ember from 'ember';
import Assessor from 'mdr/models/assessor';
import Api from 'mdr/mixins/api';

const {
  Service,
  isEmpty,
  RSVP
} = Ember;

const {
  Promise
} = RSVP;

export default Service.extend(Api, {
  assessors: null,
  cache: false,

  getAssessors() {
    const self = this;
    return new Promise((resolve) => {
      if (self.get('cache')) {
        resolve(self.get('assessors'));
      } else {
        self.ajax({
          id: 'assessors'
        }).then((response) => {
          self.setProperties({
            assessors: self.createAssessors(response.assessors),
            cache: true
          });
          resolve(self.get('assessors'));
        }).catch(() => {
          resolve();
        });
      }
    });
  },

  createAssessors(response) {
    const result = Ember.A();

    if (!isEmpty(response)) {
      result.addObjects(_.map(response, (item) => this.createAssessor(item)));
    }

    return result;
  },

  createAssessor(response) {
    const data = [
      'active',
      'assessor_id',
      'dob',
      'email_id',
      'employee_number',
      'first_name',
      'gender',
      'graduation_year',
      'last_name',
      'photo',
      'rater_id',
    ];

    return Assessor.create(_.pick(response, data));
  }
});
