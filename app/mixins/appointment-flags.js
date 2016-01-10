import Ember from 'ember';

const {
  Mixin
} = Ember;


export default Mixin.create({
  hide_btn_client: true,
  hide_search_client: false,
  show_select_client: false,

  hide_btn_doctor: true,
  hide_search_doctor: false,
  show_select_doctor: false,

  hide_btn_assessor: true,
  hide_search_assessor: false,
  show_select_assessor: false
});
