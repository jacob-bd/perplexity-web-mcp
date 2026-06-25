(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '3430984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-step-tab="+fixed._almAttr+"]");},
'1272825742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'1573061335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".box-tag").filter(":containsTextNode("+fixed.elmTxt+")");},
'1751420197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-name="+fixed._elmAttr+"]");},
'-1745340806': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.ekmTxt+")").closest(".box-box");},
'-1057175591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tabpanel]").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-369807126': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".box-tag").filter(":containsTextNode("+fixed.elmTxt+")");},
'-464057008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid="+fixed._outerAttr+"]").find("[data-testid='card-type-label']").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1468897423': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-title").filter(":containsTextNode("+fixed.headrTxt+")").closest("[data-testid=opportunities-section]").find("[data-testid='card-type-label']").find("span").filter(":containsTextNode("+fixed.elmTxt+")").filter(":mt_visible");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);