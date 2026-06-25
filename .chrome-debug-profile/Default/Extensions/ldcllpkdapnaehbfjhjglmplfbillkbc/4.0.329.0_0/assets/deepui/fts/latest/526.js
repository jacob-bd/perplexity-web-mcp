(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '159339924': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='button']").filter("[selenium-id$='"+fixed._elemid+"']");},
'175211807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").find("div").filter(":directContains("+fixed.elemText+")");},
'531529780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-list__navigation-item-text").filter(":containsTextNode("+fixed.elemText+")");},
'751270197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-side-navigation-item").filter("[text='"+fixed._lmTextAttr+"']");},
'891974405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tgElemTagName).filter("[icon='"+fixed._elemId+"']");},
'1170211422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelFor+")").closest(".formLabelDiv");},
'1214424909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-side-navigation-sub-item").filter("[id$="+fixed._lmId+"]");},
'1441604997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[for="+fixed._labelNameAttr+"]").find(".fd-form-label--text");},
'1546215797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-help-id='"+fixed._dataHelpId+"']").find(".values");},
'1587147937': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='titleHeader']").filter(":containsTextNode("+fixed.lmText+")");},
'1928989340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.fd-list__navigation-item-content-wrapper").filter(":containsTextNode("+fixed.elemText+")").closest("li");},
'2018587719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label").filter(":containsTextNode("+fixed.lmText+")");},
'-1134739121': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".customFieldWrap").filter("[data-help-id^='"+fixed._dataHelpId+"']").find("label");},
'-1657906599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").find("div").filter(":containsTextNode("+ fixed.btnText +")");},
'-2075688080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".primaryButton").filter("[selenium-id='"+fixed._elemid+"']");},
'-993446478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formNavigationContainer").find(".primaryButton").filter("[selenium-id$='"+fixed._elemid+"']");},
'-344231699': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pHeader").filter(":containsTextNode("+fixed.headerText+")").closest("#dialogPanelFocus").find("input").filter("[id="+fixed._elemId+"]");},
'-1031662343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".jqx-grid-column-header").find("span").filter(":containsTextNode("+ fixed.btnText +")");},
'-1250412815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("#listBadge");},
'-1438713116': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title").filter(":containsTextNode("+ fixed.titleText +")").next("ui5-li[id^='workItemsMenu']").filter(":containsTextNode("+ fixed.btnText +")");},
'-1681058466': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelFor+"]").closest(".formLabelDiv");},
'-565715799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=formSection]").filter(":containsTextNode("+fixed.lmText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);