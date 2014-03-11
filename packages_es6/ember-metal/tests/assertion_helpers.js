/*global EmberDev expectAssertion:true */


function expectAssertion(fn, message){
  if (EmberDev.runningProdBuild){
    // do not assert as the production builds do not contain Ember.assert
    ok(true, 'Assertions disabled in production builds.');
    return;
  }

  raises(fn, message);
}

export {expectAssertion}
