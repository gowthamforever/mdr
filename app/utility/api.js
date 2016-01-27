export default {
  MDR_API: './mdrapi/',

  session: {
    path: 'session.json',
    method: 'POST'
  },

  doctors: {
    path: 'doctor.json',
    method: 'GET'
  },

  clients: {
    path: 'client.json',
    method: 'GET'
  },

  addclient: {
    path: 'client',
    method: 'POST'
  },

  assessors: {
    path: 'assessor.json',
    method: 'GET'
  },

  appointments: {
    path: 'appointment.json',
    method: 'GET'
  },

  addappointment: {
    path: 'appointment',
    method: 'POST'
  },

  chatsession: {
    path: 'appointment-chat.json',
    method: 'GET'
  }
};
