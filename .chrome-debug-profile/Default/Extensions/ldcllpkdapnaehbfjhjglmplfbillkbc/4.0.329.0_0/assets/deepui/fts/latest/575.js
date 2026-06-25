(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1699585782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[aria-label='"+fixed._lmAttr+"']").find("span.cs-v2-dropdown-item");},
'-2053076226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".vcs-dialog").find("span[class*=text]").filter(":directContains("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);