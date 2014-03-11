import run from "ember-metal/run_loop";
import {Controller, ControllerMixin} from "ember-runtime/controllers/controller";
import {expectAssertion} from 'ember-metal/tests/assertion_helpers';

test("passing a function for the actions hash triggers an assertion", function() {
  expect(1);

  var controller = Controller.extend({
    actions: function(){}
  });

  expectAssertion(function(){
    run(function(){
      controller.create();
    });
  });
});
