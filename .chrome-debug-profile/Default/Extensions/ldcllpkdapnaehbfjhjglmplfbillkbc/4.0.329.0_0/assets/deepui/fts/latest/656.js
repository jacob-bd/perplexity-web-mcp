(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1793802567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-text").filter(":containsTextNode("+fixed.navText+")").closest(".ppm-navbar-link");},
'-2068266792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ppm-navbar").find("a").filter("[aria-label="+fixed._elmAttr+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);