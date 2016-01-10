import Ember from 'ember';

const { Component } = Ember;

export default Component.extend({
  tagName: '',
  actions: {
    hideDialog() {
      this.attrs.close();
    }
  }
});
