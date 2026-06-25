(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1341611732': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-title").find("[class*='heading']").filter(":containsTextNode("+fixed.lmText+")");},
'-1743637349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-block]").filter("[data-block='"+fixed._datalm+"']").find(".card").find(".section-title").find("[class*='heading']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);