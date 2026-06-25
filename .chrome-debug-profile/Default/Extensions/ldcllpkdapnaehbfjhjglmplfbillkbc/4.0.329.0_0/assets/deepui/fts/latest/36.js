(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            'NaN': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("h1:contains(" + dollars[0] + ")").parent("header").next().find("." + fixed._tgtClass + ":eq(" + dollars[1] + ")")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);