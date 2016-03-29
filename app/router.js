import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('store-front');
  this.route('forget-password');
  this.route('request-account');

  this.resource('enrollment', function() {
    this.route('register', { path: '/' });
    this.route('agent');
    this.route('doctor');
    this.route('assessor');
  });

  this.route('enrollment-confirmation');

  this.resource('authenticated', { path: '/' }, function() {
    this.resource('home');
    this.resource('admin-tasks', function() {
      this.route('staffs', { path: '/' });
      this.route('doctors');
      this.route('assessors');
    });
    this.resource('profile');
    this.resource('settings');
    this.resource('chat');
    this.resource('logout');

    this.resource('clients', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('client', { path: '/:customer_id' }, function() {
        this.route('profile');
      });
    });

    this.resource('staffs', function() {
      this.route('staff', { path: '/:agency_staff_id' }, function() {
        this.route('profile');
      });
    });

    this.resource('assessors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('assessor', { path: '/:assessor_id' }, function() {
        this.route('profile');
      });
    });

    this.resource('doctors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('doctor', { path: '/:doctor_id' }, function() {
        this.route('profile');
      });
    });

    this.resource('appointments', function() {
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

    this.resource('chats', function() {
      this.route('list', { path: '/' });
      this.route('chat', { path: '/:id' });
    });

    this.resource('assessments', function() {
      this.route('status', { path: '/' }, function() {
        this.route('started', { path: '/' });
        this.route('completed');
      });

      this.route('forms', function() {
        this.route('list', { path: '/' });
        this.route('rtq');
      });

      this.route('samha-form', { path: '/:id/forms' });
    });
  });

  this.route('full-page-error');
  this.route('missing', { path: '/*path' });
});

export default Router;
