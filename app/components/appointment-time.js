import Ember from 'ember';
import EmberValidator from 'ember-validator';

const {
  Component
} = Ember;

export default Component.extend(EmberValidator, {
  tagName: 'section',

  durations: [
    {
      value: 30,
      display: '30 min'
    },
    {
      value: 60,
      display: '1 hour'
    },
    {
      value: 90,
      display: '1 hour 30 mins'
    },
    {
      value: 120,
      display: '2 hours'
    }
  ],

  validations() {
    return {
      start_date: {
        required: 'Start date is required'
      },
      start_time: {
        required: 'Start time is required'
      },
      duration: {
        required: 'End date is required'
      },
      reason: {
        required: 'Reason is required',
        length: {
          maximum: 50,
          message: 'Must be 50 characters or less.'
        }
      },
      alt_info: {
        length: {
          maximum: 500,
          message: 'Must be 500 characters or less.'
        }
      }
    };
  },

  dateValidation() {
    return {
      start_date_time: {
        date: {
          time: true,
          format: 'MMM DD YYYY hh:ss A',
          after: {
            target: moment()
          },
          message: 'Start date/time must be after current date.'
        }
      }
    };
  },

  actions: {
    next() {
      const self        = this;
      const nextAction  = this.attrs.nextAction;
      const model       = this.get('model');
      let validations   = this.validations();

      self.validateMap({ model, validations }).then(() => {
        validations = self.dateValidation();
        self.validateMap({ model, validations }).then(() => {
          if (nextAction) {
            nextAction();
          }
        }).catch((validationResult) => {
          model.set('validationResult', validationResult);
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
