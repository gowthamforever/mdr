import Ember from "ember";

const {
  Component
} = Ember;

export default Component.extend({
  tagName: 'select',
  attributeBindings: ['disabled'],
  content: null,
  selected: null,

  didInitAttrs() {
    this._super(...arguments);
    var options = this.get('options');

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
