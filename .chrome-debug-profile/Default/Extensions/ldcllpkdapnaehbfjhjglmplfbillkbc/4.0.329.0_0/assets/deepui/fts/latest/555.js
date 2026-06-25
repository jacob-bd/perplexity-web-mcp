(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '888429500': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("th").find("span").filter(":containsTextNode("+fixed.elemText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1527285138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id*="+fixed._tableId+"]").find("tfoot").find("tr").children(":eq("+fixed.indx+")");},
'-575021646': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id="+fixed._tableId+"]").find("tfoot").find("tr").children(":eq("+fixed.indx+")");},
'-1348084423': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("span").filter(":containsTextNode("+fixed.btnText+")").closest(".searchAll");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-699634452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery("[role='dialog']").filter("[aria-label='" + fixed._btnText + "']").find("input[type='button']").filter(".important");},
'-1537645159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=header], [role=gridcell]").filter(":containsTextNodeIgnore("+fixed.elemText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);