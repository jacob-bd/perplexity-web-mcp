(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1233372385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".control-label").filter(":containsTextNode("+fixed.txt+")").closest(".form-group").find("[class*='modal-select']").parent("div");},
'1449185597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".widget-form-title").filter(":containsTextNode("+fixed.txt+")");},
'1517469843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".control-label").filter(":containsTextNode("+fixed.txt+")").closest(".form-group").find("[id*='div']");},
'-825653326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-title").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'-256038124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions= wmjQuery(".modal-dialog").find(".modal-title");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1966275261': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".control-label").filter(":containsTextNode("+fixed.txt+")").closest(".form-group").find("a");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);