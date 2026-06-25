(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '727703895': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[class~='"+fixed._elemId+"']");},
'-1069987589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navigation-start").find("a:eq(" + dollars[1] + ")")},
'-1262377509': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pl-global-navigation-bar").find("svg.ui-help-icon").closest("a");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);