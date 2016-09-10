define([
  "dojo/_base/declare",
  "dojo/router",
  "dojo/_base/lang",
  "dojo/Evented"], function(declare, router, lang, Evented) {

  return declare([Evented], {

    globalMiddleware: null,

    routePosition: null,

    use: function (fn){
        this.middlewares.push(fn);
    },

    constructor: function () {
        this.globalMiddlewares = [];
        this.routeMiddlewares = {}
    },

    route: function (path) {
      var args = Array.prototype.slice.call(arguments, 1);
      this.routeMiddlewares[path] = args;
      router.register(path, lang.hitch(this, function (route) {
        this.next(route.newPath, 0);
      }));

    },

    next: function(path, pos) {
      try {
        if (pos < this.routeMiddlewares[path].length) {
          this.routeMiddlewares[ path ][ pos ](lang.hitch(this, this.next, path, pos + 1))
        }
      } catch (ex) {
        this.emit("error", "Error configuring middleware - " + ex);
      }
    },

    startup: function () {
      router.startup();
    }

  });

});