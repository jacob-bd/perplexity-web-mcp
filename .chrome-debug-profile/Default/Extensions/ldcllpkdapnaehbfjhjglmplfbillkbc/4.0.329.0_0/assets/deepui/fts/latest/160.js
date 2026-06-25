(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '446894613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest("div").find("span");},
'-841220807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest("div").find("input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);