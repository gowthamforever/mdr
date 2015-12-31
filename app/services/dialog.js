import Ember from 'ember';
import {
  toggleScrollBar,
  blurActiveElement
} from 'mdr/utility/utils';

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
    toggleScrollBar(false);
    blurActiveElement();
  },

  hideDialog() {
    this.setProperties({
      show: false,
      name: null,
      model: null,
      hideAction: "hideDialog",
    });
    toggleScrollBar(true);
  }
});
