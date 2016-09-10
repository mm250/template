define(["dojo/_base/declare", "dojo/request", "app/transforms/transformTemplate"], function(declare, request, transformTemplate) {
  return function() {
    return request("app/resource/template.json", {handleAs:'json'}).then(transformTemplate)
  }
});