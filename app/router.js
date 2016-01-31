import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome');
  this.route('forget-password');
  this.route('request-account');

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
      this.route('calendar', { path: '/' });
      this.route('requests', function() {
        this.route('pending', { path: '/' });
        this.route('accepted');
        this.route('rejected');
      });
      this.route('details', { path: '/:id' });
      this.route('create', { path: '/create/:customer_id' });
    });

    this.resource('chats', function() {
      this.route('list', { path: '/' });
      this.route('chat', { path: '/:id' });
    });
  });

  this.route('missing', { path: '/*path' });
});

export default Router;
