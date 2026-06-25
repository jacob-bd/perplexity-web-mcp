(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '403750049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.MuiListItem-root").filter("[aria-label='"+fixed._lmaria+"']").find(".MuiListItemText-root");},
'441332895': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("button").filter(":containsTextNode("+fixed.txt+")");},
'579718048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[aria-label='"+fixed._lmtitle+"']").find("button").filter(":contains("+fixed.lmText+")");},
'764446940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.hdrtxt+")").closest(".MuiCardContent-root").children("div.MuiBox-root");},
'1014389925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MuiDialogContent-root").find("button").filter(":containsTextNode("+fixed.txt+")");},
'1350560268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.MuiListItem-root").filter("[aria-label='"+fixed._lmaria+"']").find("button").filter(":containsTextNode("+fixed.txt+")");},
'1809078833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[alt="+fixed.altlm+"]").closest(":header").closest(".MuiCardContent-root").children("div.MuiBox-root");},
'-610957507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id='"+fixed._lmid+"']").find("button").filter(":containsTextNode("+fixed.txt+")");},
'-1946137431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-tile-id]").filter("[data-tile-id='"+fixed._datalm+"']").find("ul");},
'-1440758716': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MuiInputLabel-root").filter("[for='"+fixed._lmfor+"']").closest(".MuiFormControl-root").find(".MuiInputBase-root");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);