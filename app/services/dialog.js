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
  containerClassNames: null,

  toggle() {
    this.toggleProperty('show');
  },

  showDialog(props = {}) {
    this.setProperties(_.assignIn({
      show: true,
    }, props));

    if (props.extraclass) {
      this.set('containerClassNames', props.extraclass);
    }

    toggleScrollBar(false);
    blurActiveElement();
  },

  hideDialog() {
    this.setProperties({
      show: false,
      name: null,
      model: null,
      hideAction: "hideDialog",
      containerClassNames: []
    });
    toggleScrollBar(true);
  }
});
