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
      this.route('client', { path: '/:customer_id' }, function() {
        this.route('profile');
        this.route('appointment');
      });
    });

    this.resource('assessors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('assessor', { path: '/:assessor_id' }, function() {
        this.route('profile');
        this.route('appointment');
      });
    });

    this.resource('doctors', function() {
      this.route('list', { path: '/' });
      this.route('add');
      this.route('doctor', { path: '/:doctor_id' }, function() {
        this.route('profile');
        this.route('appointment');
      });
    });

    this.resource('appointments', function() {
      this.route('calendar');
      this.route('requests', { path: '/' });
    });
  });

  this.route('missing', { path: '/*path' });
});

export default Router;
