(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '48954547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const activeTabIndex = wmjQuery(".tabBar").find(".activeTab").filter(":containsTextNode("+fixed.activeTabText+")").index();
if (activeTabIndex < 0 ) return  wmjQuery();
return wmjQuery(".wcPageContentWithTab").find("iframe.wcFrame").eq(activeTabIndex);},
'58101263': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='RIPaneIFRAME']").filter("[title="+fixed.elemTitle+"]");},
'195955786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".button").filter(":containsTextNodeIgnore("+fixed.lmtext+")");},
'251011098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=outerJDETabBody]").find(".SubForm_header-title").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'263032710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").find("table").find("td").filter(":containsTextNodeIgnore("+fixed.tgtText+")");},
'270961915': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":containsTextNode("+fixed.tgtText+")").closest(".WebLabel");},
'305588076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SubForm_header-title").filter(":containsTextNode("+fixed.tableHeader+")").closest("span").closest("table").closest("span").find(".GroupBox").find("div").first();},
'307196688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.checkBoxLabel+")").closest(".checkboxText").closest("div").find("input[type='checkbox']");},
'314932786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[title=" + dollars[0] + "]").find("span")},
'331611693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.RINoWrap").filter(":containsTextNode("+fixed.elemText+")");},
'411918504': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").find("span").filter(":containsTextNodeIgnore("+fixed.tgtText+")");},
'419530819': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("[id*='outer']").prev().find("input")},
'481910576': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tileText").filter(":containsTextNode("+fixed.lmtext+")").closest(".smallIconDescriptionCell");},
'520890271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menu']").filter("[id="+fixed._menuId+"]").find("div").filter("[id="+fixed._tgtElemId+"]");},
'521765528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#listOCLHeaderText").filter(":containsTextNode("+fixed.labelText+")").closest(".listHeader");},
'536735902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pageHeader").find(".pageTitle").filter(":containsTextNode("+ fixed.btnText +")")},
'568281690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":contains("+fixed.labelText+")").closest(".ClearBorders").find("div").first();},
'603914756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH=  wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell.editableModifier,.JSGridCell.selectedModifier").filter("[colindex='"+HeaderIndex+"']").find("select");
}
return wmjQuery();




},
'605891728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").find("table").parent("div").filter(":containsTextNodeIgnore("+fixed.tgtText+")");},
'609945328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SubForm_header-title").filter(":containsTextNode("+fixed.tableheader+")").closest(".SubForm_header").closest("div");},
'620692074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=pageList]").find(".mpclickable").filter(":containsTextNode("+fixed.lmtext+")");},
'746518909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tablink").filter(":contains("+fixed.elemText+")").filter('a');},
'775058809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[tasklabel=" + dollars[0] + "]").find("span[id*=" + dollars[1] + "]")},
'792432996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").filter(":containsTextNodeIgnore("+ fixed.headerdx +")").closest(".JSGridHeaderBack").parent().parent().next().find(".JSGridCell").filter("[colindex=" + fixed.titleText + "]").find("select, .JSTextfield");},
'798284431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mpselectdiv input[id='pageSearchFilter|input']");},
'812254453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabBar").find(".tab").filter("[tabdesc=" + fixed._titleText + "]")},
'823934174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#WebMenuBar").find("img").filter("[title="+fixed.tgtTitle+"]");},
'1067200150': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH=  wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell.editableModifier,.JSGridCell.selectedModifier").filter("[colindex='"+HeaderIndex+"']").find("select");
}
return wmjQuery();




},
'1083234179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formTitleTable").find("span[id*=jdeFormTitle]").filter(":containsTextNode("+fixed.lmText+")");},
'1085777670': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabTable").filter(":contains("+fixed.elemText+")").find('.nonImageTab');},
'1158639487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WebLabel").filter("[title="+fixed.LabelTitle+"]").closest("span").prev("span").find("input");},
'1160988463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#modelessTabHeaders .tabTable").find("[role='tab']").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1282345330': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[title="+fixed.title+"]");},
'1286732001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".helpOptionsSiblingColumn").find(".clickableImage").filter("[title=" + fixed.titleText + "]")},
'1320102165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#formTitleTable").find("span").filter(":containsTextNodeIgnore("+fixed.headerText+")");},
'1370464373': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":containsTextNode("+fixed.labelText+")").closest("div").closest("span").next("span").find("input");},
'1464205708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".showMenu").find("[id*=menuItem]").filter(":containsTextNode("+fixed.elmTxt+")").find("img[src*=open_submenu]");},
'1557053771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".popupTitleBar").find("[role=button]").find("img").filter("[title="+fixed.tgtTitle+"]");},
'1569964162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MenuNormal,.showMenu").find("a").filter(":containsTextNode("+fixed.lmText+")").closest("table").closest("td");},
'1618914283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MenuNormal").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'1645590141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").filter(":containsTextNodeIgnore("+ fixed.headerdx +")").closest(".JSGridHeaderBack").parent().parent().next().find(".JSGridCell").filter("[colindex=" + fixed.titleText + "]").find("select, .JSTextfield");},
'1652336749': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".checkboxText label").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1675577274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mpbuttondiv").find("img").filter("[src_production*='"+fixed._srcproduction+"']");},
'1723795272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.listText").filter(":containsTextNode("+fixed.tgtText+")").prev("td.listIcon");},
'1725494901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mpbuttondiv").find("img").filter("[src_production*='"+fixed._srcproduction+"']");},
'1802737533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WebLabel").filter("[title=" + fixed.titleText + "]").closest("td")},
'1815753877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='modalForm']").find("button").filter(":containsTextNode("+fixed.btnByText+")");},
'1890051544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[cntrl-title='"+fixed._cntrlTitle+"']").children("img");},
'1905646561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH=  wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell:visible").filter("[colindex='"+HeaderIndex+"']").first();
}
return wmjQuery();},
'1956044530': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.MainHeading").find("span[id*='jdeFormTitle']")},
'1986873880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menu']").filter("[id="+fixed._menuId+"]").find("div").filter("[id="+fixed._tgtElemId+"]");},
'1991960117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WebLabel").find(".FieldLabel").filter(":containsTextNodeIgnore("+fixed.tgtText+")");},
'2074354600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSQBECell").find("input[type='text']").filter("[title=" + fixed.titleText + "]")},
'-316634557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".activeTab").filter("[tabdesc='"+fixed._tgtLabel+"']").closest("#tabContainer").closest("body").find(".wcFrame").filter("[id='"+fixed._tgtId+"']");
},
'-1834442087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".RILayoutTable").find("iframe").filter("[title='"+fixed.tgtTitle+"']");},
'-631362008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#e1menuAppIframe").filter("[title='"+fixed.tgtTitle+"']");
},
'-654076629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".helpOptionsSiblingColumn").find(".clickableImage").filter("[title=" + fixed.titleText + "]")},
'-590501548': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.helpOptionsSiblingColumn").find(".selectLabel").filter(":containsTextNode("+ fixed.btnText +")")},
'-962226305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WebLabel").filter("[title=" + fixed.titleText + "]").closest("td")},
'-1693854901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.title+"]");},
'-589408680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtElem = wmjQuery("span.tileText").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtElem.length > 1 ? tgtElem.eq(fixed.elemIndexSameTxt) : tgtElem;},
'-1900528208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".GroupBox").find("input.tfdisabled").filter("[title="+fixed.tgtTitle+"]");},
'-1037195124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.center_tile").find("table.tileTemplateTable").filter(":containsTextNode("+fixed.tgtText+")");},
'-160180657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='fldnode']").filter(":containsTextNode("+fixed.tgtText+")").closest("table.MenuNormal");},
'-427125556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='fldnode']").filter("[title="+fixed.labelText+"]").closest("table.MenuNormal");},
'-1881608671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.textfield").filter("[title="+fixed.tgtTitle+"]").closest("td.JSQBECell");},
'-1640612535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ClearBorders").find("td").filter(":contains("+ fixed.btnText +")").next().find("input");},
'-750179066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.helpOptionsSiblingColumn").find(".selectLabel").filter(":containsTextNode("+ fixed.btnText +")")},
'-1837391514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSQBECell").find("input[type='text']").filter("[title=" + fixed.titleText + "]")},
'-2069949286': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabBar").find(".tab").filter(":containsTextNode("+ fixed.titleText +")")},
'-1476259306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.checkBoxLabel+")").closest(".checkboxText").closest("div").find("input[type='checkbox']");},
'-929891164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[title="+fixed.tgtElwmTitle+"]");},
'-743837262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH=  wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell.editableModifier").filter("[colindex='"+HeaderIndex+"']").find("input");
}
return wmjQuery();




},
'-1718791080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WebLabel").filter("[title="+fixed.LabelTitle+"]").closest("span").prev("span").find("input");},
'-28111994': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":containsTextNode("+fixed.LabelText+")").closest("div").closest("span").prev("span").find("input");},
'-2077496983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tileText").filter(":containsTextNode("+fixed.lmtext+")").closest(".smallIconDescriptionCell");},
'-1086171097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MenuNormal,.showMenu").find("span").filter(":containsTextNode("+fixed.lmText+")").closest("table").closest("td");},
'-911381274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[name="+fixed._name+"]").closest("td");},
'-1780964078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tab]").filter(":containsTextNode("+fixed.lbltxt+")");},
'-1444217765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=pageList]").find(".mpclickable").filter(":containsTextNode("+fixed.lmtext+")");},
'-131117324': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell:visible").filter("[colindex='"+HeaderIndex+"']").find("select, input");
}
return wmjQuery();},
'-941518196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SubForm_header-title").filter(":containsTextNode("+fixed.tableHeader+")").closest("span").closest("table").closest("span").find(".GroupBox").find("div").first();},
'-1503036399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.colName+")").closest("span").find(".JSGridCell").filter(":eq("+fixed._tgtElemIndex+")").find("select");},
'-1444314648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SubForm_header-title").filter(":containsTextNode("+fixed.tableHeader+")").closest("span").closest("table").closest("span").find(".GroupBox");},
'-791982124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH=  wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery(".JSGridHeaderCell").filter(":containsTextNode("+fixed.elemHeader+")").attr('colindex');
return wmjQuery(elemH).closest("[id^='jdeGridContainer']").find(".JSGridCell:visible").filter("[colindex='"+HeaderIndex+"']").find("select, input");
}
return wmjQuery();},
'-1481366296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem']").filter("[id="+fixed._elemId+"]");},
'-1530467143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SubForm_header-title").filter(":contains("+ fixed.btnText +")").closest("table").next();},
'-64808602': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#modelessTabHeaders .tabTable").find("[role='tab']").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-1647266887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[title="+fixed.tgtElwmTitle+"]");},
'-1122236599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FieldLabel").filter(":containsTextNode("+fixed.LabelText+")").closest("div").closest("span").prev("span").find("input");},
'-540921793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.RINoWrap").filter(":containsTextNode("+fixed.labelText+")").parent("td.RINoWrap");},
'-117628199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tileText ").filter(":containsTextNode("+fixed.labelText+")").closest(".center_tile");},
'-1500613355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formTitleTable").find("span[id*=jdeFormTitle]").filter("[title="+fixed.lmText+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);