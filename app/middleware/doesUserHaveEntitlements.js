define([], function() {

  return function (next) {
    alert("doesUserHaveEntitlements");
    next();
  }

});