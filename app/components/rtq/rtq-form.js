import Ember from 'ember';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  on,
  set
} = Ember;

export default Component.extend({
  form: undefined,
  pages: undefined,

  showPage(number) {
    const pages = this.get('pages');

    for(let key in pages) {
      set(pages, key, false);
      if (key === `form${number}`) {
        set(pages, key, true);
      }
    }

    animateTo();
  },

  initForm: on('didInitAttrs', function() {
    let pages;

    pages = {
      form1: false,
      form2: false,
      form3: false,
      form4: false
    };

    this.set('pages', pages);

    this.showPage(1);
  }),

  actions: {
    page(pageNo) {
      this.showPage(pageNo);
    }
  }
});
