import Ember from 'ember';
import Form from 'mdr/models/form';
import { animateTo } from 'mdr/utility/utils';

const {
  Component,
  on,
  set
} = Ember;

export default Component.extend({
  form: undefined,
  pages: undefined,
  setForm: on('init', function() {
    const form  = Form.create();
    const pages = {
      form1: true,
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

    this.setProperties({
      form,
      pages
    });
  }),

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

  actions: {
    page(number) {
      this.showPage(number);
    }
  }
});
