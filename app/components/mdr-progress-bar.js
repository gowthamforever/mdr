import Ember from 'ember';
import {
  toggleScrollBar,
  blurActiveElement
} from 'mdr/utility/utils';

const {
  Component,
  on
} = Ember;

export default Component.extend({
  classNames: ['loader-container'],

  hideScrollBar: on('didInsertElement', () => {
    toggleScrollBar(false);
    blurActiveElement()
  }),

  showScrollBar: on('willDestroyElement', () => {
    toggleScrollBar(true);
  })
});
