(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '480460337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-field").filter(":containsTextNode("+fixed.labeltxt+")").closest(".field").find("input");},
'595360137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-field").filter(":containsTextNode("+fixed.labeltxt+")").closest(".field").find(".selector-control");},
'1714502316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".header").find(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest("div.frame-container");},
'1884272897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".main-nav").find(".menu-button").filter(":containsTextNode("+fixed.lmtxt+")");},
'-1338651445': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-field").filter(":containsTextNode("+fixed.labeltxt+")").closest(".field").find("input");},
'-1719492966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-button").filter(":containsTextNode("+fixed.buttonText+")");},
'-1093393421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-field").filter(":containsTextNode("+fixed.labeltxt+")").closest(".field").find(".selector-control");},
'-1748597753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-label='"+fixed._ariaLabel+"']").closest("td").find(".iv-datepicker");},
'-418019258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".iv-menu-container").find("li").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1984226695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-field").filter(":containsTextNode("+fixed.labelTxt+")").closest(".field").find(".icon.dropdown");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);