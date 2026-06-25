(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '283753335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[test-id="+fixed._lmAttr+"]");},
'327030276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".toolsBtn").filter("[data-cmd="+fixed._lmAttr+"]").closest("li");},
'606756347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[test-id]").filter("[test-id="+fixed._parentTestId+"]").find("label");},
'898968780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[test-id="+fixed._lmTestId+"]");},
'1718993559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[test-id="+fixed._lmTest_id+"]");},
'1801013521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id="+fixed._menuItemId+"]").find(".navigation-menu__item");},
'1993383916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[test-id="+fixed._thTestId+"]").find("span");},
'-402407785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id="+fixed._aId+"]").find(".navigation-menu__item");},
'-364338099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vs-page-header-main-content").find(":header").filter(":containsTextNode("+fixed.lmText+")");},
'-2070609196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[test-id="+fixed._lmTestId+"]");},
'-1583702265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("vsn-module-navigator")[0];
const firstShadow = first ? first.shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("vsn-header")[0] : wmjQuery();
const secondShadow = second ? second.shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("a[role=button]"): wmjQuery();
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);