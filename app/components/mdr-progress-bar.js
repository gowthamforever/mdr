import Ember from 'ember';
import {
  toggleScrollBar,
  blurActiveElement
} from 'mdr/utility/utils';

const {
  Component,
  on,
  inject
} = Ember;

const {
  service
} = inject;

export default Component.extend({
  dialog: service(),

  classNames: ['loader-container'],

  hideScrollBar: on('didInsertElement', () => {
    toggleScrollBar(false);
    blurActiveElement();
  }),

  showScrollBar: on('willDestroyElement', function() {
    if (!this.get('dialog.show')) {
      toggleScrollBar(true);
    }
  })
});
