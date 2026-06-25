(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '628169882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.o-popover-submenu-title").filter("[href*='"+fixed._ahref+"']");},
'-773231712': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelFor+"]").next("rp-form-text").find("input");},
'-87116358': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelFor+")").next("rp-form-text").find("input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);