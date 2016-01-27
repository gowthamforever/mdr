import Ember from 'ember';
import Api from 'mdr/mixins/api';

const {
  Route,
  RSVP,
  Object: EmberObject,
  inject,
} = Ember;

const {
  service
} = inject;

const {
  Promise
} = RSVP;

export default Route.extend(Api, {
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
    const self         = this;
    const currentTime  = moment();
    const endTime      = moment().endOf('day');
    let ts_request_moment;
    let ts_request_endtime_moment;

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
        model: EmberObject.create({ message: 'Appointment not started.' })
      });
    } else {
      return new Promise((resolve) => {
        self.ajax({
          id: 'chatsession',
          path: {
            id: model.get('id')
          }
        }).then((response) => {
          model.setProperties(_.pick(response, [
            'sessionId',
            'tokenID',
            'apiKey'
          ]));
          resolve();
        }).catch(() => {
          resolve();
        });
      });
    }
  }
});
