(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '196568880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").siblings("input");},
'1176730431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[aria-label='"+fixed._lmAriaLabel+"']").closest(".csv-row-chooser-wraper").find("input").filter(":mt_visible");},
'1755327525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[aria-label='"+fixed._lmAriaLabel+"']").next("table").find("[type='radio']").filter("[value='"+fixed.lmValue+"']");},
'-499345403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter("[aria-label='"+fixed._labelText+"']").closest(".csv-row-chooser-wraper").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1444602945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".polaris-left-sidebar").filter("[id="+fixed._parentId+"]").find("button").filter("[title="+fixed.lmTitle+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-912216219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[aria-label='"+fixed._ulAriaLabel+"']").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'-1618607668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[name='"+fixed._elemNamesplitLast+"']");},
'-956910794': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-qa="+fixed._lmAttr+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);