  import Ember from 'ember';
import Resolver from 'ember/resolver';
import loadInitializers from 'ember/load-initializers';
import config from './config/environment';

const {
  Route,
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
      'clients.list': { title: 'Clients' },
      'clients.add': { title: 'Add a Client' },
      'clients.client.profile': { title: 'Client Profile' },
      'clients.client.appointment': { title: 'Create Appointment' },
      'doctors.list': { title: 'Doctors' },
      'doctors.add': { title: 'Add a Doctor' },
      'doctors.doctor.profile': { title: 'Doctor Profile' },
      'doctors.doctor.appointment': { title: 'Create Appointment' },
      'assessors.list': { title: 'Assessors' },
      'assessors.add': { title: 'Add a Assessor' },
      'assessors.assessor.profile': { title: 'Assessor Profile' },
      'assessors.assessor.appointment': { title: 'Create Appointment' },
      'appointments.calendar': {title: 'Appointments'},
      'appointments.details': {title: 'Appointment Details'},
      'appointments.requests.pending': {title: 'Appointments'},
      'appointments.requests.accepted': {title: 'Appointments'},
      'appointments.requests.rejected': {title: 'Appointments'},
      'chats.list': {title: 'Chats'},
      'chats.chat': {title: 'Chat'}
    };
    let title = titles[routeName] || 'MDRealtime';

    if (title) {
      this.set('titlebar.info', title);
    }

    this._super(...arguments);

    schedule('afterRender', () => {
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
    });

    this.get('dialog').hideDialog();
  }
});

App = Ember.Application.extend({
  modulePrefix: config.modulePrefix,
  podModulePrefix: config.podModulePrefix,
  Resolver,

  ready() {
    this.inject('route', 'titlebar', 'service:titlebar');
    this.inject('route', 'dialog', 'service:dialog');
  }
});

loadInitializers(App, config.modulePrefix);

export default App;
