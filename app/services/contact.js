import Ember from 'ember';

const {
  Service,
  inject
} = Ember;

const {
  service
} = inject;

export default Service.extend({
  doctors: service(),
  assessors: service(),
  staffs: service(),
  admins: service(),

  createDoctor(response) {
    let data;
    if (response) {
      data = _.extend(response.doctorInfo, response.doctorContact);
    }
    return this.get('doctors').createDoctor(data);
  },

  createAssessor(response) {
    let data;
    if (response) {
      data = _.extend(response.assessorInfo, response.assessorContact);
    }
    return this.get('assessors').createAssessor(data);
  },

  createStaff(response) {
    let data;
    if (response) {
      data = _.extend(response.agencyStaffInfo, response.agencyStaffContact);
    }
    return this.get('staffs').createStaff(data);
  },

  createAdmin(response) {
    let data;
    if (response) {
      data = _.extend(response.agencyAdminInfo, response.agencyAdminContact);
    }
    return this.get('admins').createAdmin(data);
  }
});
