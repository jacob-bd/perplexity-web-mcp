(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '2733151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hotel-filter-container").find("span").filter(":containsTextNode("+fixed.lmText+")").closest("button");},
'1164875808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentId+"]").find("div").filter("[data-name="+fixed._lmDataName+"]");},
'-1500549037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._parentId+"]").find("li").filter("[id="+fixed._lmId+"]").find("[role='button']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);