import Ember from 'ember';
import Api from 'mdr/mixins/api';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  on,
  set
} = Ember;

export default Component.extend(Api, {
  form: undefined,
  pages: undefined,
  noneditable: false,
  fetched: false,

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
    const appointment       = this.get('model');
    const completed         = appointment.get('completed');
    let last_updated_page   = appointment.getWithDefault('last_updated_page', 0);
    let pages;

    pages = {
      form1: false,
      form2: false,
      form3: false,
      form4: false,
      form5: false,
      form6: false,
      form7: false,
      form8: false,
      form9: false,
      form10: false,
      form11: false
    };

    this.set('pages', pages);

    if (last_updated_page === 0 || completed) {
      last_updated_page = 1;
    } else {
      last_updated_page = Number(last_updated_page) + 1;
    }

    this.set('fetched', true);
    this.showPage(last_updated_page);
  }),

  actions: {
    page(number) {
      this.showPage(number);
    }
  }
});
