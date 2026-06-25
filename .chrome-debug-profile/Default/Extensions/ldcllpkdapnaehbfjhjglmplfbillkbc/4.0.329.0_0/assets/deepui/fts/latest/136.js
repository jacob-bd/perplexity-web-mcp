(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1586318604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel__title").filter(":containsTextNode("+fixed.panelHeader+")").closest(".lsPanel").find(".lsField").find("input").filter("[title="+fixed.lmtitle+"]");},
'1873416581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.lsTabStrip--button").filter("[action="+fixed._elemAttr+"]");},
'-895322929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".urPWTitleText").filter(":containsTextNode("+fixed.popupTitle+")").closest(".lsPpopupWindow--innerBorder-overflow");},
'-1474694529': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiFormElementLbl").filter(":containsTextNode("+fixed.labeltxt+")").next("div[id*=link]").find(".sapMLnk");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);