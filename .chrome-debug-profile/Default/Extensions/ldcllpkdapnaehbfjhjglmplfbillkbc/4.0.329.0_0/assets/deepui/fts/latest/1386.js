(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '481357922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[placeholder='"+fixed._placeholderAttr+"']");},
'691452614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=listbox]").find("button").filter(":containsTextNode("+fixed.btnText+")").closest("div").find("div[data-testid*='checkbox']");},
'836869526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea[data-name='"+fixed._dataname+"']");},
'968327422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("thead").find("th").find("div").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1492662512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg[data-testid='"+fixed._dataTestid+"']").closest("button");},
'-967558950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'-934285105': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tagName+"[data-testid='"+fixed._dataTestid+"']");},
'-1767995284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("thead").find("th").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1535571296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[aria-label='"+fixed._ariaLabel+"']");},
'-1892089921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-testid='"+fixed._dataTestid+"']").find("button");},
'-1224383323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id='"+fixed._elmId+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);