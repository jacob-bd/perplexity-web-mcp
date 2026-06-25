(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1014404848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[value="+fixed.elenValue+"]");},
'1612180923': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("option").filter(":contains("+fixed.elemText+")");},
'2017375593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("option").filter(":containsTextNode("+fixed.elemtext+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);