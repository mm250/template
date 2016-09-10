define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "dojo/_base/lang",
    "dijit/registry"
  ],
  function (
    declare,
    array,
    lang,
    registry
  ) {

  return declare(null, {

    tmplEvents: null,

    constructor: function () {
      this.clear();
    },

    clear: function () {
      this.tmplEvents = {};
    },

    addEvent: function(id, fn, event, sourceId) {
      this.tmplEvents[id] = this.tmplEvents[id] || {};
      this.tmplEvents[id][event] = this.tmplEvents[id][event] || [];
      this.tmplEvents[id][event].push(fn);
      if (!this.tmplEvents[id][event + "Handler"]) {
        this.tmplEvents[ id ][ event + "Handler" ] = this.attachListener(id, event, sourceId);
      }
    },

    attachListener: function(id, event, sourceId) {
      var source = registry.byId(sourceId);
      if (source) {
        source.on(event, lang.hitch(this, function () {
          array.forEach(this.tmplEvents[ id ][ event ], lang.hitch(this, function (fn) {
            fn.apply(source);
          }));
        }));
      }
    }
  })
})