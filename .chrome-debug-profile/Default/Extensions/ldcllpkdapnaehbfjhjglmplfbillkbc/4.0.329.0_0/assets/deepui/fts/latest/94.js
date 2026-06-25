(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1476356853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._divId+"]").find(":header").filter("[id*=mp-otd]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);