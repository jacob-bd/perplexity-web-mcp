(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1483127872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[data-testid="+fixed._lmAttr+"]").closest("button");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);