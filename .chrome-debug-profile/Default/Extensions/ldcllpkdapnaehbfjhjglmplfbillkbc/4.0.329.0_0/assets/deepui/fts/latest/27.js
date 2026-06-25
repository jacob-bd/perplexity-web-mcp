(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '494752173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtElem = wmjQuery("[summary]").parent("td").filter(function(i, e) {
	return wmjQuery(e).find("span,label").text() === fixed.fullText;
})
return tgtElem;},
'971231094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=LabelBaseThem]").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=FlexStyles_baseStyles]").find("input");},
'972008955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tgtTag + "." + fixed._tgtClass).filter(":mt_visible");},
'1253854052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".toolbar").find("button").filter(":contains("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1521014653': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[aria-label='"+fixed._lmAriaLabel+"']").closest("oj-c-button");},
'NaN': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='TabButtonSelected'][data-help-id='" + fixed.tgtTab + "']").parents("section").find("[data-sap-ui*='" + fixed.tgtAttr + "']")},
'-1884367331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":contains(" + fixed.titleTxt + ")").closest("[summary]").parent("td").filter(":contains(" + dollars[0] + ")")},
'-1953990573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[summary]").parent("td").filter(":contains(" + dollars[0] + ")").find("span").filter(":contains(" + fixed.titleTxt + ")")},
'-401325412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapClientMShellLeftPaneSingleSelectedWrap").find("a").filter("[title="+fixed._elemAttr+"]");},
'-170247256': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter(":containsTextNodeIgnore("+fixed.labelText+")").next("div").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'-1937877173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("oj-option").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'-1235996481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".group-title").filter(":containsTextNode("+fixed.lmText+")");},
'-1889149778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=oj-typography-body]").filter(":containsTextNodeIgnore("+fixed.labelText+")").next("[class*=oj-typography-body]");},
'-241506302': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=flexbox_flexWrap_wrap]").find("textarea");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);