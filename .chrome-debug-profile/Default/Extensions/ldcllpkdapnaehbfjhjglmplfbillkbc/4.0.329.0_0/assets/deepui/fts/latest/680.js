(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '372243467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMITHTextContent").filter(":containsTextNode("+fixed.tgtElemText+")").closest(".sapMITBFilterWrapper");},
'456600004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.btnText+")").closest("button");},
'667239564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.btnText+")").closest(".sapMActionSheetButton");},
'1072796133': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMITBItem[id$='"+fixed._splitIdAttr+"']").find("span");},
'1128112516': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[user-sub-menu-item][id='"+fixed._idAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("li .ui5-li-text-wrapper span",firstShadow) : wmjQuery();},
'1441645244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.btnText+")").closest(".sapMWizardProgressNavStep");},
'1555166345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.tgtElemText+")").closest("a[role='treeitem']");},
'1841354226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMWizardProgressNavStep").find(".sapMText").filter(":containsTextNode("+fixed.btnText+")");},
'2091842220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigationFlexibleContent").find("li").find(".sapMText").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-886427606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[user-menu-item][id='"+fixed._idAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("li .ui5-li-text-wrapper span",firstShadow) : wmjQuery();},
'-404701855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.tgtElemText+")").closest("a[role='treeitem']").find(".sapUiIconTitle");},
'-1939118661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-help-id='"+fixed._dataAttr+"']");},
'-806983198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapMSelectListItemBase").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-2036744801': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSLITitleOnly").filter(":containsTextNode("+fixed.tgtElemText+")").closest("li").find(".sapMCbBg");},
'-733363231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapUiSmallMarginEnd").find(".sapMSltLabel");},
'-1005584086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.toggleNavigationButton");},
'-1762178854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMFlexBox").find("input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);