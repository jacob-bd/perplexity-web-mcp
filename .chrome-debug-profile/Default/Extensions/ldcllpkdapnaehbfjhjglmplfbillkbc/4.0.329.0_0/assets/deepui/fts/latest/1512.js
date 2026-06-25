(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '2102528597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".subPanelContent").find(".subPanelContent").filter(":directContains("+ fixed.btnText +")");},
'-1790622426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id^='SessionTabIFrameDiv'][style*='z-index:']:not([style*='z-index: -1'])").find("iframe[id^='SessionTabIFrame']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);