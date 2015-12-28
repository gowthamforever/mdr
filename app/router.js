import Ember from 'ember';
import config from './config/environment';

const Router = Ember.Router.extend({
  location: config.locationType
});

Router.map(function() {
  this.route('welcome');

  this.resource('account', function() {
    this.route('signin');
    this.route('signup');
  });

  this.resource('authenticated', { path: '/' }, function() {
    this.resource('home');
    this.resource('profile');
    this.resource('settings');
    this.resource('chat-room');
    this.resource('logout');

    this.resource('clients', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('profile', { path: '/:customer_id/profile'});
      this.route('appointment', { path: '/:customer_id/appointment'});
    });

    this.resource('assessors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('profile', { path: '/:assessor_id/profile'});
      this.route('appointment', { path: '/:assessor_id/appointment'});
    });

    this.resource('doctors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('profile', { path: '/:doctor_id/profile'});
      this.route('appointment', { path: '/:doctor_id/appointment'});
    });

    this.resource('appointments', function() {
      this.route('calendar', { path: '/' });
      this.route('requests');
    });
  });

  this.route('missing', { path: '/*path' });
});

export default Router;
