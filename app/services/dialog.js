import Ember from 'ember';

const {
  Service
} = Ember;

export default Service.extend({
  show: false,
  hideAction: "hideDialog",
  fadein: null,
  name: null,
  model: null,

  toggle() {
    this.toggleProperty('show');
  },

  showDialog(props = {}) {
    this.setProperties(_.extend({
      show: true
    }, props));
  },

  hideDialog() {
    this.setProperties({
      show: false,
      name: null,
      model: null,
      hideAction: "hideDialog",
    });
  }
});
