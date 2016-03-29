import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  Object: EmberObject,
  inject,
} = Ember;

const {
  hash
} = RSVP;

const {
  service
} = inject;

const {
  Promise
} = RSVP;

export default Route.extend(Api, {
  dialog: service(),
  opentok: service(),
  session: service(),
  contact: service(),

  activate() {
    this._super(...arguments);
    if (this.get('session.role_doctor') || this.get('session.role_assessor')) {
      this.get('titlebar').set('right_content', 'right-content-chat');
    }
    this.set('opentok.fullscreen', true);
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
    this.set('opentok.fullscreen', true);
    this.get('controller.form', undefined);
  },

  model(param) {
    const model        = this.modelFor('chats');
    const appointments = model.get('appointments');
    let appointment;

    if (param && param.id) {
      appointment = appointments.findBy('id', Number(param.id));

      if (appointment) {
        return appointment;
      }
    }

    this.transitionTo('appointments');
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('form', Form.create());
  },

  afterModel(model, transition) {
    const self         = this;
    const currentTime  = moment();
    const endTime      = moment().endOf('day');
    const completed    = model.get('form_completed');
    const started      = model.get('form_started');
    let ts_request_moment;
    let ts_request_endtime_moment;
    let promises;

    ts_request_moment = model.get('ts_request_moment');
    ts_request_endtime_moment = model.get('ts_request_endtime_moment');

    model.set('started', false);
    if ((ts_request_moment.isSameOrAfter(currentTime) || currentTime.isSameOrBefore(ts_request_endtime_moment)) && ts_request_moment.isSameOrBefore(endTime)) {
      if(currentTime.isSameOrAfter(ts_request_moment) && currentTime.isSameOrBefore(ts_request_endtime_moment)) {
        model.set('started', true);
      }
    }

    if (!model.get('started')) {
      transition.abort();
      this.get('dialog').showDialog({
        name: 'modal-warning',
        model: EmberObject.create({ message: `Appointment is going to start at ${model.get('ts_request_moment').format('MMM DD YYYY HH:mm')}. Please come back later.` })
      });
    } else {
      promises = {
        chatsession: self.getChatSession(model),
        customer: self.getClient(model)
      };

      if (started || completed) {
        promises.form = self.getForm(model);
      }

      return new Promise((resolve) => {
        hash(promises).then((promises) => {
          const { chatsession, customer, form } = promises;
          if (chatsession) {
            model.setProperties(_.pick(chatsession, [
              'sessionId',
              'tokenID',
              'apiKey'
            ]));
          }

          if (customer) {
            model.set('customer', customer);
          }

          model.set('abuse_form',  Form.create());
          if (form) {
            model.set('abuse_form', form);
          }

          resolve();
        });
      });
    }
  },

  getForm(model) {
    const self = this;
    const form  = Form.create();

    return new Promise((resolve) => {
      self.ajax({
        id: 'assessmentformget',
        path: {
          id: model.get('id')
        }
      }).then((response) => {
        let section;

        for (let count = 1; count <= 10; count ++) {
          section = response[`assessmentFormSection${count}`];
          if (section) {
            form.setProperties(section);
          }
        }

        resolve(form);
      }).catch(() => {
        resolve(form);
      });
    });
  },

  getChatSession(model) {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'chatsession',
        path: {
          id: model.get('id')
        }
      }).then((response) => {
        resolve(response);
      }).catch(() => {
        resolve();
      });
    });
  },

  getClient(model) {
    const self = this;
    return new Promise((resolve) => {
      self.ajax({
        id: 'clientdetails',
        path: {
          id: model.get('customer.customer_id')
        }
      }).then((response) => {
        resolve(self.get('contact').createClient(response));
      }).catch(() => {
        resolve();
      });
    });
  }
});
