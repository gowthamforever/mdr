import Ember from "ember";

const {
  Component,
  computed
} = Ember;

export default Component.extend({
  tagName: 'option',
  attributeBindings: ['value', 'selected'],
  option: null,
  labelPath: null,
  valuePath: null,
  label: computed('option', 'labelPath', {
    get() {
      const labelPath = this.get('labelPath');
      let label       = this.get('option');
      if (labelPath) {
        label = this.get(`option.${labelPath}`);
      }
      return label;
    }
  }),

  value: computed('option', 'valuePath', {
    get() {
      const valuePath = this.get('valuePath');
      let value       = this.get('option');
      if (valuePath) {
        value = this.get(`option.${valuePath}`);
      }
      return value;
    }
  })
});
