(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '16574976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-tiledViewer").filter("[tb-test-id*='"+fixed._sectionTbTextId+"']").find(".tab-vizHeaderHolderWrapper").find(".tab-vizHeaderWrapper").filter(":containsTextNode("+fixed.elemTxt+")");},
'687330102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FilterTitle").find("div").filter(":containsTextNode("+ fixed.btnText +")");},
'929667694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='button']").filter(":containsTextNode("+fixed.elemText+")");},
'1268862631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.low-density").filter("[data-tb-test-id="+fixed._elemAttr+"]");},
'1618037959': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-tb-test-id="+fixed._dataAttr+"]");},
'1621763179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-tiledViewer[tb-test-id='"+fixed._idAttr+"']").find(".tab-tvTLSpacer.tvimagesNS").find("img");},
'1835001227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-tiledViewer").filter("[tb-test-id*='"+fixed._tbtestid+"']").find(".tab-vizHeaderWrapper").filter(":containsTextNode("+fixed.elmtxt+")");},
'1900518045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-vizHeader").filter(":containsTextNode("+fixed.txt+")").closest(".tab-vizHeaderWrapper").eq(fixed._lmindex);},
'1931030603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-button-zone-text").filter(":containsTextNode("+fixed.labelText+")").closest(".tab-custom-button");},
'1944198353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-tiledViewer").filter("[tb-test-id='"+fixed._tbtestid+"']").closest(".tab-zone");},
'2039306693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FilterTitle").find("span").filter(":directContains("+ fixed.btnText +")");},
'2052496723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabLabel").filter(":containsTextNode("+fixed.lmtxt+")");},
'-583526818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.low-density").filter("[data-tb-test-id="+fixed._elemAttr+"]");},
'-1599286849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-tb-test-id="+fixed._elemAttr+"]");},
'-1756560197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-vizHeaderWrapper").filter("[id="+fixed._elemId+"]");},
'-21115079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-vizHeaderWrapper").filter("[aria-label^='"+fixed._hrefProdAttr+"']");},
'-148920930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='button']").filter(":containsTextNode("+fixed.labelText+")");},
'-1882007856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-tb-test-id="+fixed._dataAttr+"]");},
'-1332346979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-itemvalue="+fixed._dataAttr+"]").find("a");},
'-375529532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(".FilterTitle").filter("[title="+ fixed.labelText +"]").closest("div.tab-zone.tab-widget");},
'-96719922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-textRegion").filter(":containsTextNode("+fixed.tabltext+")").closest(".tabZone-text").next().next(".tab-zone").find("[role='gridcell']").filter(":containsTextNode("+fixed.txt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);