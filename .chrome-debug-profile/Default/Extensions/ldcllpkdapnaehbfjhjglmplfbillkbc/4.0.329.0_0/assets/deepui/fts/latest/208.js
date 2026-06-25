(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1913668122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".CollectionNavItem").filter(":containsTextNode("+fixed.lmTxt+")").find(".NavItemOverflow-icon").closest("button");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);