(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '51628990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.labelText+")").closest("div.x-tree-node-leaf");},
'90782379': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='td-preferenceName']").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("div[class*='preferenceValue']");},
'99266883': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FORMLABEL").filter(":containsTextNode("+fixed.headerText+")").closest("tr").find("td.LABEL").filter(":containsTextNode("+fixed.labelText+")").find("select");},
'188212286': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".product-context-bar").filter("[id="+fixed._elemAttr+"]").find("[role='textbox']").eq(fixed.sectionIndex);
},
'210228525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find(fixed._tagName+"[ext\\:qtip='"+fixed._lmAttr+"']").filter(":mt_visible");},
'262373840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[id="+fixed._elemId+"]").find("a").filter(":mt_visible");},
'297321644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-menu-item-text").filter(":containsTextNode("+fixed.LabelText+")").prev("img");},
'311057862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstresult = wmjQuery(".input-title").filter(":containsTextNode("+fixed.lmtext+")").closest("[class*='attribute-box']");
if(firstresult.length == 1){
	return firstresult;
}
else{
return wmjQuery("td[class*='FORMLABEL']").filter(":containsTextNode("+fixed.lmtext+")");
}
return wmjQuery();},
'330873798': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Image").filter("[style*='"+fixed._imgStyleAttr+"']").closest(".treePickerSideTab");},
'353572715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.attributePanel-group-panel").find("td.attributePanel-label").filter(":containsTextNode("+fixed.labelTxt+")").next("td.attributePanel-value").find("a").filter(":mt_visible");},
'364367140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-combo-list").find(fixed._elemTag+".x-combo-list-item+").filter("[ext\\:qtip='"+fixed._elemQtipAttr+"']");},
'397738274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[attrid='"+fixed._attrid+"']").find(".hlpTxt");},
'409308677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-form-item-label").filter(":contains("+fixed.labelText+")").closest(".x-form-item").find("input");},
'429150173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._elemAttr+"]");},
'444139789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").find("img").filter("[src_production*="+fixed._srcProd+"]").filter(":eq("+fixed.rowIndex+")");},
'451636603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.x-toolbar-cell").find("table").filter("[id='"+fixed._elemId+"']").find(".x-btn-text").closest("td");},
'488849438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-menu-list").find(".x-menu-item").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'517758535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip*='"+fixed._objNameTdQtipAttr+"']").closest("td").nextAll("td").filter("[class~='"+fixed._selectedClass+"']");},
'549828642': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-tab-strip-text").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest(fixed._tagName);},
'621731732': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".attributePanel-label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find(".attributePanel-value").filter("[attrid="+fixed._lmAttr+"]");},
'635798920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-btn-icon").find("button[style*='"+fixed._imgName+"']").filter(":mt_visible");},
'646633478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".input-title").filter(":containsTextNode("+fixed.labelText+")").closest(".checkbox-div").find(".checkbox-custom");},
'685888460': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.pp").find("td.pplabel").filter(":containsTextNode("+fixed.labelTxt+")").next("td.ppdata").find("span,select").filter(":mt_visible");},
'754555361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").find("img.x-btn-image[style*='"+fixed._imgName+"']").closest("tr");},
'793341962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Image").filter("[style*='"+fixed._imgStyleAttr+"']").closest(".treePickerSideTab");},
'810831821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":directContains("+fixed.labelTxt+")").closest("tr").find("select");},
'828932969': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".input-title").filter(":containsTextNode("+fixed.labelText+")").closest(".f-attribute-box").find("span[role='combobox']");},
'907577678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-toolbar[id*='"+fixed._toolbarId+"']").find("input[id*='"+fixed._elmId+"']").closest(".x-toolbar-cell");},
'949788216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find(".x-toolbar").find("button[style*='"+fixed._imgName+"']");},
'965868865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("thead").find("div").filter("[ext\\:qtip='"+fixed._lmTextxt+"']");},
'1004147700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel").filter("[id="+fixed._elemDataId+"]").find("span").filter("[ext\\:qtip='"+fixed._elemId+"']");},
'1045547878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.attributePanel-group-panel").find("td.attributePanel-value").filter("[attrid='"+fixed._elemId+"']");},
'1067536364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#infoPageinfoPageIdentityDisplayPanel").children().children();},
'1071663230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[id*='processPlanStructureGWT']").filter(":contains("+fixed.panelTabText+")").closest(".x-tab-panel").find("#ppbIFrame");},
'1081029365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.tgtElemText+")").closest("td");},
'1102643252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest("tr").find(".x-form-field");},
'1111023860': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*='td-objName'").filter(":containsTextNode("+fixed.labelTxt+")").prev("td[class*='td-mpmLinkLabel']").find("div.x-grid3-col-mpmLinkLabel");},
'1137475077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".input-title").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form-elem-container").find("[role='textbox']");},
'1156545241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip^='"+fixed._labelText+"']").closest(".x-tree3-node-text").closest(".x-tree3-el");},
'1158192494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[style*='"+fixed._imgSplittedStyle+"']").closest("a.x-menu-item");},
'1192872028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.attributePanel-group-panel").find("td.attributePanel-label").filter(":containsTextNode("+fixed.labelTxt+")").next("td.attributePanel-value").find("select").filter(":mt_visible");},
'1228806083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find(".x-btn").find(fixed._tagName).filter(":containsTextNode("+fixed.elmTxt+")").filter(":mt_visible");},
'1231235881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='completButtonId']:last").find("button").filter("[name="+ fixed._btnText +"]");},
'1231235882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pp:last").find("button").filter("[name="+ fixed._btnText +"]");},
'1259043143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FORMLABEL").filter(":containsTextNode("+fixed.tgtElemText +")");},
'1318358601': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel").filter("[id="+fixed._elemDataId+"]").find("span").filter("[ext\\:qtip='"+fixed._elemId+"']");},
'1324857590': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id="+fixed._labelBarId+"]").closest(".x-toolbar-cell").closest(".x-toolbar-left-row").find("button").first();},
'1359071255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-btn-icon").find("button[style*='"+fixed._imgName+"']").filter(":mt_visible");},
'1482146091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.x-menu-list").find("li.x-menu-list-item").filter(":containsTextNode("+fixed.elemTxt+")").find("a.x-menu-item");},
'1541924664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("td").filter("[class~='"+fixed._selectedClass+"']").find("div.x-grid3-hd-inner");
return tgtOptions.length > 1 ? tgtOptions.filter(":first") : tgtOptions;},
'1624817845': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("td").filter("[class~='"+fixed._selectedClass+"']").find("span").filter("[qtip*='"+fixed._splitJoinedQtipAttr+"']").closest(".x-tree3-el");
return tgtOptions.length > 1 ? tgtOptions.filter(":first") : tgtOptions;},
'1630855119': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-body").find("span").filter("[id="+fixed._elemId+"]");},
'1655771872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe").filter("[id*='"+fixed._slicedSrcProdAttr+"']");},
'1695177425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("td").filter("[class~='"+fixed._selectedClass+"']").find("a").filter("[ext\\:qtip*="+fixed.tgtQtipAttr+"]");
return tgtOptions.length > 1 ? tgtOptions.filter(":first") : tgtOptions;},
'1734922665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-menu-list").find(".x-menu-item-text").filter(":containsTextNode("+fixed.lmText+")");},
'1750994848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*='name']:eq(" + dollars[1] + ")")},
'1764452354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-toolbar-ct").find(".x-btn-text").filter("[style*="+fixed._result+"]");},
'1766657032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-column-header-text-inner").filter(":containsTextNode("+fixed.labelText+")");},
'1779854894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-grid3-col-QuestionText").filter("[ext\\:qtip*='"+fixed._tgtQtipAttr+"']").closest("td").nextAll("td").filter("[class~='"+fixed._selectedClass+"']").find("label").filter(":containsTextNode("+fixed.inputLabel+")").prev("input");},
'1781082545': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._elemAttr+"']");},
'1792960109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-tree-node").find(".x-tree-node-anchor span").filter(":containsTextNodeIgnore("+ fixed.btnText +")").filter(":mt_visible");},
'1893090474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".input-title").filter(":containsTextNode("+fixed.LabelText+")").next(".single-list-body").find("span[class*='selection__rendered']");},
'1948106656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._panelId+"']").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td[class*="+fixed._colClassKey+"]");},
'2029376034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FORMLABEL").filter(":containsTextNode("+fixed.headerText+")").next("td.FORMELEMENT").find("input");},
'2118352310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-toolbar-ct").find(".x-btn-text").filter("[style*="+fixed._result+"]");},
'-1597591900': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.myTab-toc").find("div.x-panel-body-noheader").filter(":directContains("+fixed.elemText+")");},
'-552105343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table#PJL_wizard_next").find("td.x-btn-mc");},
'-1699411087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img[src_production*='netmarkets/images/file_excel.gif']");},
'-1428044598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.x-tab-strip-active").filter("[id="+fixed._selectedTabAttr+"]").find("a.x-tab-right");},
'-257236686': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*='td-objName'").filter(":containsTextNode("+fixed.labelTxt+")").prev("td[class*='td-mpmLinkLabel']").find("div.x-grid3-col-mpmLinkLabel");},
'-1034652084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-menu-list").find("a.x-menu-item").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1213494599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#treePickerNavigationViewPanel").filter(":containsTextNode("+fixed.sectionTitle+")").find("span").filter("[qtip*='"+fixed._splitJoinedQtipAttr+"']").closest("td").filter("[class~='"+fixed._selectedClass+"']");},
'-1875235550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[class~='"+fixed._selectedClass+"']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1451428247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.attributePanel-group-panel").find("td.attributePanel-label").filter(":containsTextNode("+fixed.labelTxt+")").next("td.attributePanel-value");},
'-1350147157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery(".x-grid3-hd-thePersistInfo_modifyStamp").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":first") : tgtOptions;},
'-1750281963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-form-item").filter(":containsTextNode("+fixed.labelTxt+")").find("input,select");},
'-38413055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip='"+fixed._tipName+"']").closest(".x-grid3-col-objName").closest(".x-grid3-row-over");},
'-1310047978': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip='"+fixed._tgtName+"']").closest(".x-grid3-td-objName");},
'-292004903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.labeTip+")").closest(".x-grid3-cell").prev(".x-grid3-cell").find(".x-grid3-row-checker");},
'-1739400973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".attributePanel-value").find("select").filter("[id="+fixed._elemId+"]");},
'-1538868927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.x-toolbar-cell").find("table").filter("[id='"+fixed._elemId+"']").find(".x-btn-text").closest("td");},
'-1108066948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip='"+fixed._labelId+"']").closest(".x-grid3-td-objName").closest(".x-grid3-row");},
'-1355068041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[qtip^='"+fixed._labelText+"']").closest(".x-tree3-node-text").closest("#PPBTree_").children("div");},
'-439006995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-tree3-node-text").find("span").filter("[qtip^='"+fixed._labelText+"']");},
'-110824718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-tree3-el").find("span").filter("[qtip^='"+fixed._labelText+"']");},
'-1984568501': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=completButtonId]").find("button").filter("[name="+fixed._btnNameAttr+"]").filter(":last");},
'-1996391739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.x-toolbar-cell").filter(":containsTextNode("+fixed.tgtElemText +")");},
'-1966560565': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.labelTxt+")").next("select");},
'-377990532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".card-header").filter(":containsTextNode("+fixed.headerText+")").closest(".card").find(".card-content");},
'-456083617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-grid3-cell-inner").filter("[ext\\:qtip='"+fixed._lmAttr+"']").closest(".x-grid3-cell-name-with-norgie");},
'-1891674369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[id="+fixed._liId+"]").find(".x-tab-strip-text").filter(":containsTextNode("+fixed.lmText+")");},
'-460690176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".attributePanel-label").filter(":containsTextNode("+fixed.lbltxt+")").closest("tr").find("select");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1193996021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("select,input").filter("[name*='"+fixed._lmname+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1671384739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".card-label").filter(":containsTextNode("+fixed.labelText+")").closest(".card");},
'-532880725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[id*="+fixed._lmId+"]");},
'-529110901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".xtb-text").filter(":containsTextNode("+fixed.lmText+")");},
'-145662742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[id^='"+fixed._lmAttr+"']");},
'-1779715248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const columnHeader = wmjQuery("div[class*=x-grid][class*=header]").find("thead").find("td[class*=hd]").filter(":containsTextNodeIgnore("+fixed.colHeadTxt+")").filter(":mt_visible");
if (columnHeader.length !== 1) return wmjQuery();
const headerIndex = columnHeader.index();
return headerIndex > -1 ? columnHeader.closest("div[class*=x-grid][class*=viewport]").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td").eq(headerIndex).find("input") : wmjQuery();},
'-888742077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-tbar").filter(":containsTextNodeIgnore("+fixed.panelHeaderText+")").find(".x-form-search-trigger").closest("span");},
'-2146702726': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const columnHeader = wmjQuery("[id='"+fixed._panelId+"']").find("div[class*=x-grid][class*=header]").find("td[class*=hd]").filter(":containsTextNodeIgnore("+fixed.colHeadTxt+")");
if (columnHeader.length !== 1) return wmjQuery();
const headerIndex = columnHeader.index();
return headerIndex > -1 ? columnHeader.closest("div[class*=x-grid][class*=viewport]").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td").eq(headerIndex) : wmjQuery();},
'-1194490272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td[class*="+fixed._colClassKey+"]").find("img");},
'-1513210648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td[class*="+fixed._colClassKey+"]").find("div");},
'-232613055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find("div[class*=body]").find("[class*=row-table]").eq(fixed.rowIndex).find("td[class*="+fixed._colClassKey+"]").find("div[class*=cell-inner]");},
'-1780407010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-tbar").filter(":containsTextNodeIgnore("+fixed.titleBarText+")").find("input").filter("[id*='"+fixed._elmId+"']");},
'-120783192': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".xtb-text").filter(":containsTextNode("+fixed.tabletitleText+")").closest(".x-panel-bwrap").find("div").filter("[ext\\:qtip='"+fixed._lmAttr+"']");},
'-242522212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-btn-icon").find("button[style*='"+fixed._imgName+"']").closest(fixed._tgtName).filter(":mt_visible");},
'-1078009828': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find("button[style*='"+fixed._imgName+"']").closest(fixed._tgtName);},
'-386016753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[id="+fixed._elemAttr+"]").closest(".form-elem-container").find("[role='combobox']");},
'-2041901334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".xtb-text").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest(".x-panel").find(".x-grid3-scroller");},
'-417080910': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find(".x-panel-body").find(".x-grid3-scroller");},
'-1628641720': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[id='"+fixed._tgtId+"']").find(".x-tab-strip-text");},
'-47679690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-tab-panel-header").find(".x-tab-strip-text").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest(fixed._tagName);},
'-1526826290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=navigatorTabPanel]").find(".navigator-treePanel-body");},
'-432492973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='"+fixed._panelId+"']").find(".x-toolbar").find("button[style*='"+fixed._imgName+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);