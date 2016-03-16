import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

const {
  Route,
  Application,
  run
} = Ember;

const {
  schedule
} = run;

let App;

Ember.MODEL_FACTORY_INJECTIONS = true;

Route.reopen({
  activate() {
    const self      = this;
    const routeName = self.routeName;
    let titles  = {
      home: { title: 'Home' },
      profile: { title: 'Profile' },
      'clients.list': { title: 'Clients' },
      'clients.add': { title: 'Add a Client' },
      'clients.client.profile': { title: 'Client Profile' },
      'staffs.staff.profile': { title: 'Staff Profile' },
      'doctors.list': { title: 'Doctors' },
      'doctors.add': { title: 'Add a Doctor' },
      'doctors.doctor.profile': { title: 'Doctor Profile' },
      'assessors.list': { title: 'Assessors' },
      'assessors.add': { title: 'Add a Assessor' },
      'assessors.assessor.profile': { title: 'Assessor Profile' },
      'appointments.calendar': {title: 'Appointments'},
      'appointments.day': {title: 'Appointments'},
      'appointments.create': { title: 'Create Appointment' },
      'appointments.details': { title: 'Appointment Details' },
      'appointments.abuse-form': { title: 'Assessment Form' },
      'appointments.requests.pending': { title: 'Appointments' },
      'appointments.requests.accepted': { title: 'Appointments' },
      'appointments.requests.rejected': { title: 'Appointments' },
      'admin-tasks.staffs': { title: 'Staffs Requests' },
      'admin-tasks.doctors': { title: 'Doctors Requests' },
      'admin-tasks.assessors': { title: 'Assessors Requests' },
      'chats.list': { title: 'Chats' },
      'chats.chat': { title: 'Chat' }
    };
    let title = titles[routeName] || 'MDRealtime';

    if (title) {
      this.set('titlebar.info', title);
    }

    this._super(...arguments);

    schedule('afterRender', () => {
      let height = Ember.$(window).height() + 50;
      let eleheight = Ember.$('.resizeable-container').outerHeight();
      let title       = 'MDR';
      let mappings    = {};
      let mapping;
      let parts;

      mapping = mappings[routeName];
      if (mapping) {
        title += ` - ${mapping}`;
      } else {
        parts = routeName.replace(/-/g, ' ').split('.');
        parts = parts.map((part) => part.capitalize());
        parts = parts.reverse();
        parts = parts.length > 2 ? parts.slice(0, 2) : parts;
        parts = parts.reverse();
        title += ` - ${parts.join(' | ')}`;
      }
      document.title = title;

      Ember.$('.wrapper-main').css('min-height', height);

      if (height > eleheight) {
        Ember.$('.resizeable-container').css('min-height', height);
      }
    });

    this.get('dialog').hideDialog();
  }
});

App = Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  init() {
    this._super(...arguments);
    window.MDR = this;
  },

  ready() {
    this.inject('route', 'titlebar', 'service:titlebar');
    this.inject('route', 'dialog', 'service:dialog');
    this.inject('route', 'session', 'service:session');
    this.inject('service:errorhandler', 'router', 'router:main');
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
