(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1962948174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapUshellAppTitleText").filter(":directContains("+fixed.elemText+")");},
'-1897121543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.lmText+")").closest(".sapMFlexBox");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);