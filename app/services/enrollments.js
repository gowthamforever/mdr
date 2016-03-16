import Ember from 'ember';
import Api from 'mdr/mixins/api';
import Enrollments from 'mdr/models/enrollments';

const {
  Service,
  RSVP,
  inject
} = Ember;

const {
  Promise
} = RSVP;

const {
  service
} = inject;

export default Service.extend(Api, {
  doctors: service(),
  assessors: service(),
  staffs: service(),

  getPendingProspects(background) {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'pendingprospect',
        background
      }).then((response) => {
        resolve(self.createEnrollmentRequests(response));
      }).catch(() => {
        resolve();
      });
    });
  },

  createEnrollmentRequests(response) {
    const model = Enrollments.create();
    if (response) {
      model.setProperties({
        staffs: this.get('staffs').createStaffs(response.agencyStaffInfoList),
        doctors: this.get('doctors').createDoctors(response.doctorInfoList),
        assessors: this.get('assessors').createAssessors(response.assessorInfoList)
      });
    }
    return model;
  }
});
