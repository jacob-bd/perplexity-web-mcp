(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '773235843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find(fixed._tgtTagName).filter("[aria-label='"+fixed._tgtAriaLabelAttr+"']");},
'1099488057': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[id="+fixed._navId+"]").find("a").filter("[data-testid="+fixed._lmAttr+"]").find("svg");},
'1104017255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-testid="+fixed._elemAttr+"]");},
'1240941268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=UserProfileMenu-module]").find("a").filter("[data-testid="+fixed._lmAttr+"]");},
'1637414803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".card-actions").filter("[aria-label='"+fixed._parentAriaLabel+"']").find("button").filter("[aria-label='"+fixed._lmAriaLabel+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1683851763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.lmText+")").closest("button");},
'2038472822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[id="+fixed._navId+"]").find("a").filter("[data-testid="+fixed._lmAttr+"]").find("[class*=nav-menu-module]").filter(":containsTextNode("+fixed.lmText+")");},
'2050641262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=NavMenuItem]").filter(":containsTextNode("+fixed.elmTxt+")");},
'2094966131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=HeaderSection-module]").filter("[data-index="+fixed._lmIndex+"]");},
'-221846663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gong-side-menu__label").filter(":containsTextNode("+fixed.lmtext+")").prev(".gong-side-menu__icon");},
'-1365579709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tgtTagName).filter("[aria-label='"+fixed._tgtAriaLabelAttr+"']");},
'-1779949038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=button]").filter("[aria-label='"+fixed._tgtLabel+"']");},
'-231787462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+ fixed.btnText +")");},
'-1041132277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOption = wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")").closest("div");
return tgtOption.length > 1 ? tgtOption.filter(":mt_visible") : tgtOption;},
'-392815606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._tgtId+"]");},
'-54808715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":contains("+fixed.lmText+")").parent();},
'-1299264187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.lmText+")").closest("[class*='SummaryPeriodPicker']").find("[aria-haspopup='listbox']");},
'-953060812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=NavigationHeader-module]").find("button").filter("[data-testid="+fixed._lmAttr+"]");},
'-1925595866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.lmText+")");},
'-534694617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".video-player-button").filter("[aria-label='"+fixed._lmAriaLabel+"']");},
'-2072188614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label]").filter("[aria-label='"+fixed._parentAriaLabel+"']").find("[class*=InlineBriefSelector]").filter(":directContains("+fixed.lmText+")");},
'-1560300345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.lmText+")").closest("[role='alert']");},
'-1819658854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[id="+fixed._navId+"]").find("a").filter("[data-testid="+fixed._lmAttr+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);