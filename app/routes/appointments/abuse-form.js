import Ember from 'ember';
import Form from 'mdr/models/form';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
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
  session: service(),
  contact: service(),

  model(param) {
    const model        = this.modelFor('appointments');
    const appointments = model.get('appointments');
    let appointment;

    if (param && param.id) {
      appointment = appointments.findBy('id', Number(param.id));

      if (appointment) {
        return appointment;
      }
    }

    this.transitionTo('appointments.requests.pending');
  },

  setupController(controller) {
    this._super(...arguments);
    controller.set('form', Form.create());
  },

  afterModel(model) {
    const self              = this;
    const appointment       = model;
    const completed         = appointment.get('completed');
    const started           = appointment.get('form_started');
    let promises;

    promises = {
      customer: self.getClient(model)
    };

    if (started || completed) {
      promises.form = self.getForm(model);
    }

    return new Promise((resolve) => {
      hash(promises).then((promises) => {
        const { customer, form } = promises;

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
