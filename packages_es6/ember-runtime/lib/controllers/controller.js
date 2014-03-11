import {emberAssert, emberDeprecate} from "ember-metal/debugger";
import {get} from "ember-metal/property_get";
import EmberObject from "ember-runtime/system/object";
import {Mixin} from "ember-metal/mixin";
import {computed} from "ember-metal/computed";
import ActionHandler from "ember-runtime/mixins/action_handler";

/**
@module ember
@submodule ember-runtime
*/

/**
  `Ember.ControllerMixin` provides a standard interface for all classes that
  compose Ember's controller layer: `Ember.Controller`,
  `Ember.ArrayController`, and `Ember.ObjectController`.

  @class ControllerMixin
  @namespace Ember
  @uses Ember.ActionHandler
*/
var ControllerMixin = Mixin.create(ActionHandler, {
  /* ducktype as a controller */
  isController: true,

  /**
    The object to which actions from the view should be sent.

    For example, when a Handlebars template uses the `{{action}}` helper,
    it will attempt to send the action to the view's controller's `target`.

    By default, a controller's `target` is set to the router after it is
    instantiated by `Ember.Application#initialize`.

    @property target
    @default null
  */
  target: null,

  container: null,

  parentController: null,

  store: null,

  model: computed.alias('content'),

  deprecatedSendHandles: function(actionName) {
    return !!this[actionName];
  },

  deprecatedSend: function(actionName) {
    var args = [].slice.call(arguments, 1);
    emberAssert('' + this + " has the action " + actionName + " but it is not a function", typeof this[actionName] === 'function');
    emberDeprecate('Action handlers implemented directly on controllers are deprecated in favor of action handlers on an `actions` object ( action: `' + actionName + '` on ' + this + ')', false);
    this[actionName].apply(this, args);
    return;
  }
});

/**
  @class Controller
  @namespace Ember
  @extends Ember.Object
  @uses Ember.ControllerMixin
*/
var Controller = EmberObject.extend(ControllerMixin);

export {Controller, ControllerMixin};

