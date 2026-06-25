(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '150259483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name="+fixed._nameAttr +"]").closest(".k-picker-wrap").filter(":mt_visible");},
'342797275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#lblICMSigningDepartment").filter(":containsTextNode("+fixed.LabelText+")").closest(".col-label").next(".col-value").find(".k-input");},
'943144451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='option']").filter(":containsTextNode("+fixed.labelText+")").filter(":mt_visible");},
'1504496184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputName+"]").parent();},
'-1253129273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[aria-controls="+fixed._ariaLabel+"]");},
'-1394900541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tooltipSignatory").filter("[data-attributename='"+fixed._dataAttr+"']").find("pre");},
'-446280251': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":directContains("+fixed.elmTxt+")").closest("tr").find(".k-input-value-text");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);