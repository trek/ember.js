import Ember from "ember-metal/core"; // Ember.Test
import {emberAssert} from "ember-metal/debugger";
import Logger from "ember-metal/logger";

var RSVP = requireModule("rsvp");

RSVP.onerrorDefault = function(error) {
  if (error instanceof Error) {
    if (Ember.testing) {
      if (Ember.Test && Ember.Test.adapter) {
        Ember.Test.adapter.exception(error);
      } else {
        throw error;
      }
    } else {
      Logger.error(error.stack);
      emberAssert(error, false);
    }
  }
};

RSVP.on('error', RSVP.onerrorDefault);

Ember.RSVP = RSVP;

export default RSVP;
