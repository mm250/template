define([], function(){


  return {

    load: function(id, require, load){
        require([id], function(provider){
          var klass = (provider.extend) ? new provider() : provider();
          load(klass);
        })
    }
  }

});