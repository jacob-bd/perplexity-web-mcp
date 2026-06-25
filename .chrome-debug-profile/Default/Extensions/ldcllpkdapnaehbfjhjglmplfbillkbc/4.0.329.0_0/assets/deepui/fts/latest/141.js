(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '184603369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#onboardingForm").filter("[role="+fixed._elemAttr+"]").parent("div[class*='guts-p-full']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);