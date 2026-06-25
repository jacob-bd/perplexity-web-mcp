(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '75157578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageHeaderContent").find("label").filter(":containsTextNode("+fixed.elemTxt+")");},
'212841180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListTbl td[data-sap-ui-column*=" + dollars[0] + "]:eq(" + dollars[1] + ")");},
'311685537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigation").find("li").filter(":containsTextNode("+fixed.elemTxt+")").find("a");},
'511511208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='actionsToolbar'] button[id*=" + dollars[0] + "]");},
'539960472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'834266072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigation").find("li").filter(":containsTextNode("+fixed.elemTxt+")");},
'1246676618': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='actionsToolbar'] button[data-sap-ui*=" + dollars[0] + "]");},
'1531183519': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar button[id*=" + dollars[0] + "]");},
'1566979567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageHeaderContent").find("label").filter(":containsTextNode("+fixed.elemTxt+")").closest(".sapUiAFLayoutItem")},
'1615696809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapMSegBBtn").filter(":containsTextNode("+fixed.elemTxt+")").closest("ul.sapMSegB");},
'1617285094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMSegB").find("li.sapMSegBBtn").filter(":containsTextNode("+fixed.elemTxt+")").find(".sapMSegBBtnInner");},
'1622952474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[id*='shellBarSearch']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-shell-search-field-button") : wmjQuery(); },
'1803973052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigation").find("li").filter(":containsTextNode("+fixed.elemTxt+")").find(".sapMText");},
'1869304691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3.sapMTitle[id*=" + dollars[0] + "]");},
'1980792092': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[id*='shellBarSearch']")[0];
const firstShadow = first && first.shadowRoot;
const sec = firstShadow && wmjQuery(firstShadow).find("[data-help-id='toggle-search']")[0];
const secShadow = sec && sec.shadowRoot;
return secShadow ? wmjQuery(secShadow).find("button") : wmjQuery(); },
'2119238950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".sapUshellShellBar")[0];
const firstShadow = first && first.shadowRoot;
const sec = firstShadow && wmjQuery(firstShadow).find(".ui5-shellbar-button[icon='"+fixed._iconAttr+"']")[0];
const secShadow = sec && sec.shadowRoot;
return secShadow ? wmjQuery(secShadow).find("button") : wmjQuery(); },
'-299248929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigation").find("li").filter(":containsTextNode("+fixed.elemTxt+")").find(".sapTntNLI");},
'-1506891439': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[aria-rowindex='"+fixed._rowIdx+"'] td[aria-colindex='"+fixed._colIdx+"'] button").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1174646833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageTitleMain").find(":header.sapMTitle").filter(":containsTextNode("+fixed.elemTxt+")").find("span[id*='inner']");},
'-919491122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageTitleMain").find(":header.sapMTitle").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1573586052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3.sapMTitle[id*=" + dollars[0] + "] span");},
'-1786239731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSection :header.sapMTitle").filter(":containsTextNode("+fixed.elemTxt+")");},
'-825675902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSection :header.sapMTitle").filter(":containsTextNode("+fixed.elemTxt+")").find("span[id*='inner']");},
'-586002746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageHeaderContent").find("label").filter(":containsTextNode("+fixed.elemTxt+")").closest(".sapUiVltCell");},
'-1726028269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMSegB").find("li.sapMSegBBtn").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1797862998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find("button").filter(":containsTextNode("+fixed.elemTxt+")").find(".sapMBtnInner");},
'-1817619041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[id*='shellBarSearch']")[0];
const firstShadow = first && first.shadowRoot;
const sec = firstShadow && wmjQuery(firstShadow).find(".ui5-shell-search-field-button")[0];
const secShadow = sec && sec.shadowRoot;
return secShadow ? wmjQuery(secShadow).find("button") : wmjQuery(); },
'-422787531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".sapUshellShellBar")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-shellbar-button[icon='"+fixed._iconAttr+"']") : wmjQuery();},
'-1434148399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[id*='shellBarSearch']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[data-help-id='toggle-search']") : wmjQuery(); },
'-1515147848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='actionsToolbar']").find("button.sapMBtn").filter(":containsTextNode("+fixed.elemTxt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);