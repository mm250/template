define(["dojo/_base/declare"], function(declare) {

  return declare(null, {

    applyRulesTo: null,

    onEvent: "change",

    applyRules: function (element, options) {
      return function () {
        if (options.conditions.indexOf(this.get("value")) > -1 ) {
          element.set(options.attributes);
        }
      }
    }

  });
});



