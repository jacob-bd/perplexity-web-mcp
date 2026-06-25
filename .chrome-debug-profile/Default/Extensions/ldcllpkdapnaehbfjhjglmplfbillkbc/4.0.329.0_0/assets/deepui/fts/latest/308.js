(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1118411820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href_production*='"+fixed._hRef+"']").find("svg");},
'-1339590736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".r-button__content").filter(":contains("+fixed.BtnText+")").closest(".r-button").children(".r-button__element");},
'-1170211892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("g").filter("[id='"+fixed._ElemId+"']").closest("svg").closest("button");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);