import Ember from 'ember';
import EmberValidator from 'ember-validator';
import SinginModel from 'mdr/models/signin';
import Api from 'mdr/mixins/api';
import { animateTo } from 'mdr/utility/utils';

const {
  Route,
  inject
} = Ember;

const { service } = inject;

export default Route.extend(EmberValidator, Api, {
  session: service(),

  model() {
    return SinginModel.create();
  },

  _validations() {
    return {
      userName: { required: true },
      password: { required: true }
    };
  },

  actions: {
    signin() {
      const model       = this.get('controller.model');
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

          this.transitionTo('home');
        });
      }).catch((validationResult) => {
        animateTo();
        model.set('validationResult', validationResult);
      });
    }
  }
});
