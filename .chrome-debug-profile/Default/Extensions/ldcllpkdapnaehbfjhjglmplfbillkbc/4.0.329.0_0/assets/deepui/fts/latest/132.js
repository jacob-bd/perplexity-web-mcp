(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '239234325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-testid="+fixed._parentDataTestID+"]").find("div.MuiBox-root").first();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);