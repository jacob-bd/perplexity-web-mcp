(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '59320277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("button").filter("[title="+fixed.buttonTitle+"]").closest("div.appmagic-button-wrapper");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1681685679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[data-appmagic-icon-name="+fixed._dataAppmagicIconName+"]").closest(".powerapps-icon");},
'-715284468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='content-control-name']").filter("[data-control-name="+fixed._data_control_name+"]").find(".appmagic-label-text");},
'-1070934510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-control-name='"+fixed._dataControlName+"']").find("input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);