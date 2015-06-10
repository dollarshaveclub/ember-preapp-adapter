import DS from 'ember-data';
import Ember from 'ember';
import PreAppAdapterMixin from '../mixins/application'

export default DS.RESTAdapter.extend(
  PreAppAdapterMixin,
{

});
