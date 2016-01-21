import Ember from 'ember';
import EmberValidator from 'ember-validator';
import SinginModel from 'mdr/models/signin';
import Api from 'mdr/mixins/api';

const {
  Component,
  inject,
  on
} = Ember;

const {
  service
} = inject;

export default Component.extend(EmberValidator, Api, {
  dialog: service(),
  session: service(),
  tagName: '',
  home: 'home',
  model: null,

  setModel: on('didInitAttrs', function() {
    this.set('model', SinginModel.create());
  }),

  _validations() {
    return {
      userName: { required: true },
      password: { required: true }
    };
  },

  actions: {
    hideDialog() {
      this.get('dialog').hideDialog();
    },

    signin() {
      const model       = this.get('model');
      const validations = this._validations();
      const self        = this;
      const data        = {};

      model.set('validationResult', null);

      self.validateMap({ model, validations }).then(() => {
        data.userid = model.get('userName');
        data.password = model.get('password');

        self.ajax({
          id: 'session',
          data
        }).then((response) => {
          let session = _.pick(response, [
            'user_role',
            'email_id',
            'first_name',
            'middle_name',
            'last_name'
          ]);

          session.isAuthenticated = true;

          self.get('session').setProperties(session);
          self.sendAction('home');
        });
      }).catch((validationResult) => {
        model.set('validationResult', validationResult);
      });
    }
  }
});
