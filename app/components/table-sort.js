import Ember from 'ember';
import computed from 'ember-computed-decorators';

const {
  Component,
  get,
  on,
  isEmpty
} = Ember;

export default Component.extend({
  items: undefined,
  headings: undefined,
  sortProperty: undefined,
  ascending: true,

  @computed('ascending')
  sortOrder(ascending) {
    return ascending ? '' : ':desc';
  },

  initProps: on('didInitAttrs', function() {
    const headings = this.get('headings');
    let heading;

    if (!isEmpty(headings)) {
      heading = headings.get('firstObject');

      this.setProperties({
        sortProperty: heading.property,
        ascending: heading.ascending
      });
    }
  }),

  actions: {
    doSort(heading) {
      const cProperty    = get(heading, 'property');
      const sortProperty = this.get('sortProperty');
      const sortable     = get(heading, 'sortable');

      if (sortable) {
        if (cProperty === sortProperty) {
          this.toggleProperty('ascending');
        } else {
          this.setProperties({
            ascending: get(heading, 'ascending'),
            sortProperty: cProperty
          });
        }
      }
    }
  }
});
