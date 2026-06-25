(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '2811641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-header-accordion").filter(":containsTextNode("+fixed.sectionTitleText+")").next("table").find("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td.Details").find("select");},
'24516054': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".TopBlockHeader").find("select").filter("[aria-label='"+fixed._elemAriaLabel+"']");},
'47030061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id$="+fixed._parentId+"]").find("input").filter("[value="+fixed.lmValue+"]");},
'136845296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input[id*='contentSection']").filter("[type='"+fixed._lmAttr+"']");},
'395189982': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._lmId+"]");},
'453831839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-header-accordion").filter(":contains("+fixed.sectionTitleText+")").next("table").find("td.Label").filter(":containsTextNode("+fixed.lmText+")");},
'467557685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.lmText+")");},
'498614507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input").first();},
'576998432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slick-header-column").filter(":containsTextNode("+fixed.labelText+")").closest(".slick-pane-left").closest("[id*=grdEdit]").find(".slick-row").find(".slick-cell").eq(fixed.lmIndex).children("div, input");},
'617133761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.labelText+")").closest(".ColumnHeaderCenter").find("td").filter(":containsTextNode("+fixed.lmText+")").first();},
'739554712': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".TopBlockHeader > span").filter(":containsTextNode("+fixed.tableHeaderText+")").closest(".section-header-accordion").next("table").find(".Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("[id*=contentSection]");
},
'828701123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("modus-button").filter("[id='"+fixed._btnId+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'903391919': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions =  wmjQuery("td.Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.labelText+")").closest(".ColumnHeaderCenter").find("td").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'909351918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-menu").find("a[id*='tabContactsLink']").filter(":containsTextNode("+fixed.lmText+")");},
'929623468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td.Details").find("input[aria-label='Text field']");},
'941848847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".NormalText").filter(":containsTextNode("+fixed.labelText+")").next("select");},
'973858829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("td").find("input");},
'1001093892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("select");},
'1135194192': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.lmText+")").first();},
'1605732377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("input, select");},
'1649118246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td.Details").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1698894260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.secondLabelText+")").next("td.Details").find("label").filter(":containsTextNode('"+fixed.labelText+"')").closest("td").find("input");},
'1752483159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("textarea");},
'1857043390': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='ProjectMenu_navTree']").find(".NavTreeItemWrapper").filter(":contains("+fixed.lmText+")");},
'1967346004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._lmId+"]");},
'1995567058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#top-nav").find("a").filter(":containsTextNode("+fixed.lmText+")").closest("li");},
'2138507701': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[value="+fixed.elemValue+"]").eq(1);},
'-1770047721': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Label").filter(":containsTextNode("+fixed.labelText+")").parent().first().find(".border-box");},
'-150882834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-menu").find("li[id*='tabDashboards']").filter(":contains("+fixed.lmText+")");},
'-15263340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".branding-tab").find("li[id*='tabHome']").filter(":contains("+fixed.lmText+")");},
'-273565016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("textarea[id*='CommitmentControl_txtScope']");},
'-8671966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("select").filter("[aria-label='"+fixed._elemAriaLabel+"']");},
'-1523785453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id$='"+fixed._elemSplitIdLast+"']");},
'-895609401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("td").find("input").filter("[type='checkbox']");},
'-366986668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[name$='"+fixed._elemNamesplitLast+"']");},
'-1262955073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href_production*='"+fixed._hrefProductionSecond+"']").closest("li");},
'-1103556515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-menu").find("a").filter("[href_production*='"+fixed._hrefProductionSecond+"']").closest("li");},
'-139806430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("select, input");},
'-1841143419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.elemText+")");},
'-1450824591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("span, input, select");},
'-1610193206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.labelText+")").closest("tr").prev("tr").find("i").filter(":mt_visible");},
'-124723229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[data-uw-rm-alt-original='"+fixed._elemAttr+"']");},
'-1776479406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".BorderTop").find("input").filter("[value="+fixed.elemValue+"]");},
'-1383490209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter(":contains("+fixed.labelText+")").next("table").find(".FormDescriptiveTextDarkOnLight");},
'-1816923641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[alt='"+fixed.elemAttr+"']");},
'-938960752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.labelText+")").closest(".ColumnHeaderCenter").find("td").filter(":containsTextNode("+fixed.lmText+")").last();},
'-916788582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal").filter("[id='"+fixed._parentId+"']").find("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("input, select");},
'-1701397009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td").find("input, select, span");},
'-1212545357': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1054817287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slick-header-column").filter(":contains("+fixed.labelText+")").closest(".slick-pane-left").closest("[id*=grdEdit]").find(".slick-cell").eq(fixed.lmIndex).children("div");},
'-256173433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slick-header-column").filter(":containsTextNode("+fixed.labelText+")").closest(".slick-pane-left").closest("[id*=grdEdit]").find(".slick-row").find(".slick-cell").eq(fixed.lmIndex).children("div, input");},
'-668755074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.labelText+")").closest("tr").prev("tr").prev("tr").find(".Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.lmText+")").eq(1);},
'-1458134188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").next("td.Details");},
'-1588376514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".TopBlockHeader").find("input").filter("[value="+fixed.lmValue+"]");},
'-1224449412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Label").filter(":containsTextNode("+fixed.labelText+")").next(".Details").find("input, span");},
'-872153746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[selected='selected']").filter(":containsTextNode("+fixed.selectedText+")").closest("select").filter("[name$='"+fixed._elemNamesplitLast+"']");},
'-1624045552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-header-accordion").filter(":containsTextNode("+fixed.sectionTitleText+")").next("table").find("td.Label").filter(":containsTextNode("+fixed.lmText+")");},
'-1744431291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("modus-navbar")[0];
const firstShadow = first && first.shadowRoot;
if(firstShadow){
  return wmjQuery(firstShadow).find("img").filter("[data-test-id="+fixed._lmAttr+"]");
}

return wmjQuery();},
'-4593992': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._lmId+"]");},
'-907741930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const editMode =  wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input, select");
const viewMode =  wmjQuery("td.Label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("td.Details");

return editMode.length ? editMode: viewMode;},
'-2039335735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".Excel-ColHeaderCenter").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);