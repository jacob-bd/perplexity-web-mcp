(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1710285484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[class^="+fixed._elemClass+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);