(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '617503862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-Text").filter(":containsTextNode("+fixed.labelText+")").closest(".fui-Field").find("input").filter("[data-testid="+fixed._lmDataTestId+"]");},
'1509707334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-Text").filter(":containsTextNode("+fixed.labelText+")").closest(".fui-Radio").find("input");},
'-836208356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-NavSubItem").filter("[aria-label='"+fixed._lmAriaLabel+"']");},
'-641705282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-NavSubItem").filter("[id="+fixed._lmId+"]");},
'-2028491817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id="+fixed._lmId+"]").closest("div");},
'-646816721': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid='"+fixed._lmData+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);