(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '16635392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;

return wmjQuery(".lsPageHeader--item").find(".lsButton").filter("[title^='"+targetText+"']");

},
'54794398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsTbsPanelCnt").find("[class*=ItemTitle]").filter(":containsTextNode("+fixed.lmTitle+")");},
'316242539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(".lsHeaderArea--titlearea").find(".lsPanel--title-text").eq(fixed._sectionIdx);},
'380407619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsButton__text").filter(":containsTextNode("+fixed.lmText+")").closest(".lsButton");},
'461128352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("tbody").find("input");},
'593085772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsToolbar").find(".lsButton").filter("[title="+fixed.lmTitle+"]");},
'593924809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest(".lsToolbar--item").find(".lsField");},
'1038909220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".urPWTitleText").filter(":containsTextNode("+fixed.LabelText+")").closest(".urPWTtlStd").parent("div").next(".urPWSeperator").siblings(".urPWContent").find(".lsToolbar");},
'1177042818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("table").find("input").filter("[value="+fixed.lmValue+"]");},
'1256568253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=menuitemradio]").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'1267384874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[title="+fixed.inputTitle+"]").closest("tbody");},
'1355633317': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.labelText+")").closest(".lsHeaderArea").find(".lsToolbar--standards-leftItems");},
'1381500650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsCaption--embedded").filter("[title="+fixed.sectionTitle+"]").closest("[class*=urLayoutRPad]");},
'1399711723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("tbody").find(".lsField__help");},
'1450468736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter(":containsTextNode("+fixed.labelText+")").closest("tbody").children("tr").eq(1).children("td").eq(fixed.tdIndex).find(".lsField");},
'1459802757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='navigation']").filter("[id="+fixed._parentId+"]").find("[role='treeitem']").filter(":containsTextNode("+fixed.lmText+")");},
'1584433202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest(".lsToolbar--item").find(".lsField__help");},
'1793949091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("tbody").find(".lsField__inputcontainer");},
'-1131702788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.lmText+")").closest(".lsHeaderArea");},
'-1454864497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.lmText+")").closest(".lsHeaderArea--titlearea");},
'-2030472229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.labelText+")").closest("tbody").find(".urMatrixLayout").children("tbody").first();},
'-678261595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLink__text").filter(":containsTextNode("+fixed.lmText+")");},
'-2053574582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.labelText+")").closest(".lsHeaderArea").find(".lsButton__text").filter(":containsTextNode("+fixed.lmText+")").closest(".lsToolbar--standards-leftItems");},
'-948260800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("tbody").find("tr").last();},
'-871318047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='navigation']").filter("[aria-label='"+fixed._parentAriaLabel+"']").find("[role='treeitem']").filter(":containsTextNode("+fixed.lmText+")");},
'-801648424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPanel--title-text").filter(":containsTextNode("+fixed.panelTitleText+")").closest(".lsHeaderArea").find(".lsButton").filter("[title="+fixed.lmTitle+"]");},
'-2074519548': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPageHeader--item").find(".lsButton").filter("[title="+fixed.lmttike+"]");},
'-1137357654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsPageHeader--item").find(".lsButton__text").filter(":containsTextNode("+fixed.lmText+")").closest(".lsButton");},
'-1418000142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsLabel__text").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input");},
'-1717285365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lsHeaderArea--titlearea").find(".lsPanel--title-text").filter(":containsTextNode("+fixed.lmText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);