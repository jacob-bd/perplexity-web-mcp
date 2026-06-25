(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-222782513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-dropdown").find("span").filter("[data-test-id="+fixed._iconAttr+"]").closest("a").find("div[class*=navLinkPrimaryText]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);