import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('store-front');
  this.route('forget-password');
  this.route('request-account');

  this.route('enrollment', { resetNamespace: true }, function() {
    this.route('register', { path: '/' });
    this.route('agent');
    this.route('doctor');
    this.route('assessor');
  });

  this.route('enrollment-confirmation');

  this.route('authenticated', { resetNamespace: true, path: '/' }, function() {
    this.route('home', { resetNamespace: true });
    this.route('admin-tasks', { resetNamespace: true }, function() {
      this.route('staffs', { path: '/' });
      this.route('doctors');
      this.route('assessors');
    });
    this.route('profile', { resetNamespace: true });
    this.route('settings', { resetNamespace: true });
    this.route('chat', { resetNamespace: true });
    this.route('logout', { resetNamespace: true });

    this.route('clients', { resetNamespace: true }, function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('client', { path: '/:customer_id' }, function() {
        this.route('profile');
      });
    });

    this.route('staffs', { resetNamespace: true }, function() {
      this.route('staff', { path: '/:agency_staff_id' }, function() {
        this.route('profile');
      });
    });

    this.route('assessors', { resetNamespace: true }, function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('assessor', { path: '/:assessor_id' }, function() {
        this.route('profile');
      });
    });

    this.route('doctors', { resetNamespace: true }, function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('doctor', { path: '/:doctor_id' }, function() {
        this.route('profile');
      });
    });

    this.route('appointments', { resetNamespace: true }, function() {
      this.route('index',  { path: '/' });
      this.route('calendar');
      this.route('day', { path: '/day/:date' });
      this.route('requests', function() {
        this.route('pending', { path: '/' });
        this.route('accepted');
        this.route('rejected');
        this.route('started');
        this.route('completed');
      });
      this.route('abuse-form', { path: '/:id/forms' });
      this.route('details', { path: '/:id' });
      this.route('create', { path: '/create/:customer_id' });
    });

    this.route('chats', { resetNamespace: true }, function() {
      this.route('list', { path: '/' });
      this.route('chat', { path: '/:id' });
    });

    this.route('assessments', { resetNamespace: true }, function() {
      this.route('list', { path: '/' });

      this.route('forms', function() {
        this.route('list', { path: '/' });
        this.route('rtq', { path: '/:id/rtq' });
      });

      this.route('samha-form', { path: '/:id/forms' });
    });
  });

  this.route('full-page-error');
  this.route('missing', { path: '/*path' });
});

export default Router;
