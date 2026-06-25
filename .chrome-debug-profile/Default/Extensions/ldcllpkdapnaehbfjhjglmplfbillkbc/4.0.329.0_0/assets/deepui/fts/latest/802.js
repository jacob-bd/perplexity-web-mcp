(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '468658991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi:containsTextNode("+fixed.labelText+")").closest(".sapUiFormCLElement").find("span.sapUiIconPointer");},
'1225950960': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const targetOptions = wmjQuery("[role=progressbar]").find("span.sapMPIText");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1315079374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*=title-inner]:containsTextNode("+fixed.innerTitleText+")").closest("a[id*=tile]");},
'1441803512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelContent").find(".sapMPIBar").closest("[role=progressbar]");},
'1617863724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*=title-inner]:containsTextNode("+fixed.innerTitleText+")").closest("div.sapUiViewDisplayBlock");},
'1834555098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiViewDisplayBlock").find("span[id*=title-inner]").filter(":containsTextNode("+fixed.elemText+")");},
'-425935667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("bdi:containsTextNode("+fixed.buttonText+")").closest("button");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-2096957255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi:containsTextNode("+fixed.labelText+")").closest(".sapMVBox").find("span.sapUiIconPointer");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);