import Ember from 'ember';

export function animateTo(options = {}) {
  const { position, duration } = options;
  Ember.$('html, body').animate({ scrollTop: position || 0 }, duration || 'fast');
}
