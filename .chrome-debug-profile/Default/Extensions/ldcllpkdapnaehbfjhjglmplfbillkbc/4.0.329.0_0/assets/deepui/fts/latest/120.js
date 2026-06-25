(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1108463077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tether-target").filter("[data-testid="+fixed._searchID+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);