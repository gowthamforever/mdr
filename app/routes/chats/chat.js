import Ember from 'ember';

const {
  Route,
  Object: EmberObject,
  inject
} = Ember;

const {
  service
} = inject;

export default Route.extend({
  dialog: service(),
  opentok: service(),

  activate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', 'right-content-chat');
    this.set('opentok.fullscreen', true);
  },

  deactivate() {
    this._super(...arguments);
    this.get('titlebar').set('right_content', undefined);
    this.set('opentok.fullscreen', true);
  },

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

    this.transitionTo('appointments');
  },

  afterModel(model, transition) {
    const currentTime  = moment();
    const endTime      = moment().endOf('day');
    let ts_added_moment;
    let ts_request_moment;

    ts_added_moment = model.get('ts_added_moment');
    ts_request_moment = model.get('ts_request_moment');

    model.set('started', false);
    if ((ts_added_moment.isSameOrAfter(currentTime) || currentTime.isSameOrBefore(ts_request_moment)) && ts_added_moment.isSameOrBefore(endTime)) {
      if(currentTime.isSameOrAfter(ts_added_moment) && currentTime.isSameOrBefore(ts_request_moment)) {
        model.set('started', true);
      }
    }

    if (!model.get('started')) {
      transition.abort();
      this.get('dialog').showDialog({
        name: 'modal-warning',
        model: EmberObject.create({ message: 'Appointment not started.' })
      });
    }
  }
});
