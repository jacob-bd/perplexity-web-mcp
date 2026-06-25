(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '145834837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardHeader").find(".sapMTextMaxLine").filter(":containsTextNode("+fixed.titleText+")");},
'186707887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapTntSideNavigation").find("[role='menuitemradio']").filter(":containsTextNode("+fixed.elemText+")");},
'849576043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tab']").filter(":containsTextNode("+fixed.firstTabText+")").closest(".sapFDynamicPageContent");},
'1244679985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=CardItems]").find(".headingLargeCard").filter(":containsTextNode("+fixed.elemText+")");},
'1324426222': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi[id*=label]:containsTextNode("+fixed.labelText+")").closest(".sapMVBox").find(".sapUiIcon");},
'1416383589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMVBox").find("bdi[id*=label]").filter(":containsTextNode("+fixed.elemText+")");},
'1544434032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiTableCHT").find("[role=columnheader]").find("button:containsTextNode("+fixed.elemText+")");},
'1657715022': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardHeaderTextFirstLine:containsTextNode("+fixed.titleText+")").closest(".sapFCardHeader");},
'1792914743': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find("form.sapMSFF").filter("[id="+fixed._elemId+"]");},
'1942928926': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMObjectIdentifierText:containsTextNode("+fixed.titleText+")").closest("li").find(".sapFAvatarSquare");},
'2125487918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".headingLargeCard:containsTextNode("+fixed.titleText+")").closest("[id*=CardContainer]");},
'-1910338952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMITBHead").find("[role='tab']").filter(":containsTextNode("+fixed.elemText+")");},
'-1397640901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*="+fixed._elemId+"]").filter(":containsTextNode("+fixed.elemText+")");},
'-2084403424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCard").find("span.sapMText").filter(":containsTextNode("+fixed.elemText+")");},
'-508247968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMObjectIdentifierText:containsTextNode("+fixed.titleText+")").closest(".sapMLIBContent");},
'-1382961900': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardContent").find(".sapMObjectIdentifierText:containsTextNode("+fixed.titleText+")").find(".sapMText");},
'-1204790081': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".contentlib-navigation-panel-layout").find(".sapMSLITitleOnly:containsTextNode("+fixed.labelText+")").closest("li.sapMLIB");},
'-822363053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find("button.sapMBarChild").filter("[id="+fixed._elemId+"]");},
'-1838499316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find(".sapMTitle").find("span[id*=title]").filter(":containsTextNode("+fixed.elemText+")");},
'-1824364128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const targetOptions = wmjQuery(".sapUiTableRow").find(".sapMLabel:containsTextNode("+fixed.elemText+")").parent("div");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1476574036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine:containsTextNode("+fixed.titleText+")").closest("[role=button][id*=tile]");},
'-1836087182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiViewDisplayBlock").find(".sapMTitle:containsTextNode("+fixed.elemText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);