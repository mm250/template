define(["dojo/_base/declare", "dojo/request"], function(declare, request) {

  return declare(null, {

    fetch: function () {
      return request("/Users/mauricemorgan/Documents/dojo/app/resource/template.json", {handleAs:'json'})
    }
  });

});