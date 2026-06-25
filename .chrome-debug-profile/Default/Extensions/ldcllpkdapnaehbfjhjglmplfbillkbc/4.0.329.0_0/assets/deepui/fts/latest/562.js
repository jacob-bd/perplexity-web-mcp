(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '137370178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='option']").filter("[aria-label='"+fixed._ariaLabel+"']");},
'291831389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='option']").filter(":contains("+fixed.elemText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);