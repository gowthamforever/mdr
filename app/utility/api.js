export default {
  MDR_API: './mdrapi/',

  session: {
    path: 'session',
    method: 'POST'
  },

  logout: {
    path: 'session',
    method: 'DELETE'
  },

  doctors: {
    path: 'doctor',
    method: 'GET'
  },

  adddoctor: {
    path: 'doctor',
    method: 'POST'
  },

  clients: {
    path: 'client',
    method: 'GET'
  },

  addclient: {
    path: 'client',
    method: 'POST'
  },

  assessors: {
    path: 'assessor',
    method: 'GET'
  },

  adddassessor: {
    path: 'assessor',
    method: 'POST'
  },

  appointments: {
    path: 'appointment',
    method: 'GET'
  },

  addappointment: {
    path: 'appointment',
    method: 'POST'
  },

  addagencystaff: {
    path: 'agencystaff',
    method: 'POST'
  },

  chatsession: {
    path: 'appointment/{id}/chat',
    method: 'GET'
  },

  pendingprospect: {
    path: 'prospect/pending',
    method: 'GET'
  },

  patchprospect: {
    path: 'prospect/pending',
    method: 'PATCH'
  },

  contact: {
    path: 'session/contact',
    method: 'GET'
  },

  patchappointment: {
    path: 'appointment/{id}',
    method: 'PATCH'
  },

  doctordetails: {
    path: 'doctor/{id}',
    method: 'GET'
  },

  clientdetails: {
    path: 'client/{id}',
    method: 'GET'
  },

  assessordetails: {
    path: 'assessor/{id}',
    method: 'GET'
  },

  staffdetails: {
    path: 'agencystaff/{id}',
    method: 'GET'
  },

  updatedoctorinfo: {
    path: 'doctor/{id}/info',
    method: 'PATCH'
  },

  updatedoctorcontact: {
    path: 'doctor/{id}/contact',
    method: 'PATCH'
  },

  updateassessorinfo: {
    path: 'assessor/{id}/info',
    method: 'PATCH'
  },

  updateassessorcontact: {
    path: 'assessor/{id}/contact',
    method: 'PATCH'
  },

  updateclientinfo: {
    path: 'client/{id}/info',
    method: 'PATCH'
  },

  updateclientcontact: {
    path: 'client/{id}/contact',
    method: 'PATCH'
  },

  updateadmininfo: {
    path: 'agencyadmin/{id}/info',
    method: 'PATCH'
  },

  updateadmincontact: {
    path: 'agencyadmin/{id}/contact',
    method: 'PATCH'
  },

  assessmentformpost: {
    path: 'appointment/{id}/form/page/{pageNo}',
    method: 'POST'
  },

  assessmentformget: {
    path: 'appointment/{id}/form',
    method: 'GET'
  },

  assessments: {
    path: 'assessment',
    method: 'GET'
  },

  emergency: {
    path: 'assessment/emergency',
    method: 'POST'
  },

  getemergency: {
    path: 'assessment/emergency/{id}',
    method: 'GET'
  },

  updateemergency: {
    path: 'assessment/emergency/{id}',
    method: 'PATCH'
  }
};
