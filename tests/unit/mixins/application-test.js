import Ember from 'ember';
import ApplicationMixin from '../../../mixins/application';
import { module, test } from 'qunit';

module('Unit | Mixin | application');

// Replace this with your real tests.
test('it works', function(assert) {
  var ApplicationObject = Ember.Object.extend(ApplicationMixin);
  var subject = ApplicationObject.create();
  assert.ok(subject);
});
