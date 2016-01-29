import Ember from "ember";

const {
  Component,
  isEmpty
} = Ember;

export default Component.extend({
  tagName: 'select',
  attributeBindings: ['disabled'],
  content: null,
  selected: null,

  didInitAttrs() {
    this._super(...arguments);
    const change    = this.get('onChange');
    const options   = this.get('options');
    const prompt    = this.get('prompt');
    const selected  = this.get('selected');

    if (!options) {
      this.set('options', Ember.A());
    }
  },

  change() {
    const changeAction  = this.get('onChange');
    const selectedEl    = this.$()[0];
    const prompt        = this.get('prompt');
    const selectedIndex = selectedEl.selectedIndex;
    const options       = this.get('options');
    const selectedValue = options[prompt ? selectedIndex - 1 : selectedIndex];

    this.set('selected', selectedValue);

    if (changeAction) {
      changeAction(selectedValue, selectedIndex);
    }
  }
});
