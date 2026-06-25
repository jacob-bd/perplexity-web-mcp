(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '8378143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='ActionButtonsContainer']").find("button").filter("[title="+fixed.tgtTitle+"]");},
'10763087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-CompactPageSummary-']")},
'12054808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-PageContent']").find(":header").find("span");},
'13548689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption'][title=" + dollars[0] + "]")},
'13659122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=panelSetRow]").filter(":eq("+fixed.indx+")").find(":header").filter(":containsTextNode("+fixed.headerText+")");},
'15246403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='SearchContainer']").find("[data-automation-id='searchInputSearchIcon']").find("svg");},
'15804976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id=promptOption]").filter(":containsTextNode("+fixed.elemTxt+")");},
'17518263': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=\"promptTitle\"]:contains(" + dollars[0] + ")")},
'17620346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.elemText+")").closest("li[data-automation-id='formLabelRequired']").find("div[class*='FocusContainer']");},
'22656174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("[data-automation-id=workerProfileMenuItemLabel]").filter(":containsTextNode("+fixed.elmTxt+")").filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();
},
'27070308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=textView]").filter(":containsTextNode("+fixed.elemTxt+")");},
'30881129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=formLabel]").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("span[data-automation-id='radioBtn']:eq(0)");},
'31606165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=\"fieldSetLegendLabel\"][title=" + dollars[0] + "]")},
'31750991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='gaugeWidgetInfoTitle']").filter(":contains("+fixed.labelText+")").closest("div[data-automation-id='gaugeWidget']").find("div[data-automation-id='gaugeWidgetValue']");},
'32996834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'38961709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-main")},
'44643600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='pageHeader']").find("[data-automation-id='promptOption']")},
'47431994': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.pageTitleText+")").closest("[id='workdayApplicationFrame']").find("button").filter("[title="+fixed.lmTitle+"]");},
'49565573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labeltxt+")").closest("[data-automation-id='formLabelRequired']").find("input[role='textbox']");},
'51408733': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]").filter(":contains(" + dollars[1] + ")")},
'65750612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("#mainContent").find("[data-automation-id=pageHeader]").find("[data-automation-id=pageHeaderTitleText]");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'66630013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=tabBar]").find("div").filter("[data-automation-id="+fixed._elmAttr+"]");},
'75740843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li [data-automation-id='formLabel']:contains(" + dollars[0] + ")").parents("li").find("textarea")},
'77610774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=globalSearchInput]").closest("[id='wd-searchInput']");},
'80116729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabel']").filter(":containsTextNode("+fixed.lbl+")").closest("li").find("svg[class*='wd-icon-check']");},
'81896694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=moreLinkLabel").filter("[title*="+fixed.btnTitleAttr+"]").closest("[data-automation-id=workerProfileMoreLinkMenuItemWrapper]");},
'86358961': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateTimeWidget'][id*='56$86329']")},
'88623315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".wd-popup-content").find("[data-automation-id=pageHeaderTitleText]");},
'89244438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id='pageHeader']").find("button[data-automation-id='closeButton']").filter("[aria-label="+fixed.elemAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'95820653': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._elemAttr+"]").find(":header");},
'97226840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=\"heading\"]").filter(":contains(" + dollars[0] + "):visible")},
'99625132': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabel']").filter(":containsTextNode("+fixed.lbltxt+")").closest("li").find("[data-automation-id='selectWidget']").parent("div").eq(fixed.panelindex);},
'104544392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=workletQuandrant]").find("[data-automation-id=groupedListItem]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("[data-automation-id=menuList]").find("li[data-automation-id=menuItem]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'106221997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[title]").filter(":contains(" + dollars[0] + ")")},
'106923761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find(".edit-link").filter(":containsTextNode("+fixed.lmText+")");},
'108985274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Location)")},
'109366461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:has([data-automation-id=" + dollars[1] + "]:visible)")},
'114163580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:contains(" + dollars[0] + "):visible:eq(" + dollars[1] + ")")},
'119837498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstElem = wmjQuery("span").filter(":contains("+fixed.labelTxt+")").closest("div"); 
const secondElem = wmjQuery("span").filter(":containsTextNode("+fixed.labelTxt+")");
if (firstElem.length) {
 return firstElem;}
else if (secondElem.length) {
 return secondElem;}
 return wmjQuery();},
'126506172': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks'], div[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");

const oldLM =  wmjQuery("li").find("div").filter(":containsTextNode("+ fixed.btnText +")").closest("a").find("svg").parent().parent().parent()
const middleTgtLM =  wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed.btnText+"").closest("button").find("[class*='label']");
const newLM = wmjQuery("[data-automation-id='subMenuItem']").filter(":containsTextNode("+ fixed.btnText +")");
let newLMparent = newLM.closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem'][aria-expanded='false']");

if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
  return "Apps_Menu_More";
} 
if (newLMparent.length){
	wmjQuery(newLM).closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem']").click();
	return newLM;
}  if (oldLM.length > 0){
  return oldLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newLM.length > 0){
	return newLM;
} return wmjQuery()},
'128985048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.quesText+")").closest("li").find("label").filter(":containsTextNode("+fixed.elemLabelText+")").closest("[data-automation-id='radioBtn']").find("input[type='radio']");
},
'129614724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-Text:eq(" + dollars[0] + ")")},
'131577665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[data-testid="+fixed._lmAttr+"]");},
'137469164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='InlineLabel']:contains(" + dollars[0] + ")")},
'140500232': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id="+fixed._popupId+"]").closest(".wd-popup-content");},
'144324866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='pageHeaderTitleText']")},
'146386946': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("button[data-automation-id='pex-app-tiles-tile'],div.workdayHome-ae");
const newWrokletLM = wmjQuery("svg."+fixed._lmSvg+"").closest("li").find("a[data-automation-id='globalNavAppItemLink']");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (tgtLM.length > 0){
	return tgtLM;
} if (newWrokletLM.length > 0){
  return newWrokletLM;
}
return wmjQuery();

},
'148421343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"inbox_task_view\"]")},
'148530898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[class*='wd-icon-question']");},
'149318175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find(":header").filter("[data-automation-id="+fixed._elemAttr+"]");},
'152914917': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=fieldSetLegendLabel]").filter(":containsTextNode("+fixed.legendText+")").closest("[data-automation-id=panelSetRow]").find("[data-automation-id=fieldSetBody]").find("[data-automation-id=richTextEditor]").parent();},
'154733424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.thText+"]").closest("table").find("tr").last().find("td").eq(fixed.tdIndex).find("[data-automation-id=textView]");
                                                                                                              },
'156234993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id='rivaWidget']").find("[data-testid='tableWrapper']");},
'160847741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] div[aria-label=" + dollars[1] + "]")},
'160971676': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeader']").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.elemTxt+")");},
'164318991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmHeaderText+")").closest("[data-automation-id='fieldSetBody']").find("span").filter(":directContains("+fixed.lmText+")").closest("button[data-automation-id='label']"); },
'164861622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText'][title='Request Time Off']")},
'167327638': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:visible:eq(" + dollars[1] + ")")},
'169304882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"responsiveMonikerInput\"]:eq(2)")},
'169963825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='tabGridVisbleCell'] .wd-headerWrapper .gwt-InlineLabel:contains(" + dollars[0] + ")")},
'175351787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=textbox]").filter(":containsTextNode("+fixed.questionText+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='checkboxPanel']");},
'175627771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup:contains(" + dollars[0] + ")")},
'178769446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabel']").filter(":containsTextNode("+fixed.lbltxt+")").closest("li").find("[data-automation-id='decorationWrapper']").eq(fixed.panelindex);},
'180642399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find(".gwt-Label");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'183925882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=fieldSetBody]").filter(":containsTextNode("+fixed.sectionTitle+")").find("label[id^=ViewModel]").filter("[data-automation-label='"+fixed.inputLabelTxt+"']").prevAll("input");},
'186812245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[title="+fixed.columnHeading+"]").find(".wd-headerWrapper").closest("[data-uxi-widget-type='columnHeader']");},
'189118608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.tgtLabel+")").closest("li").find("[data-automation-id='dateInputWrapper'],[data-automation-id='dateTimeWidget']");},
'189120048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='taskWizardInstance']").find("[data-automation-id='truncatedText']").find("span").filter(":mt_visible").last();},
'189186225': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.lmText+")");},
'190279370': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("[data-uxi-widget-type='selectinputlistitem']");},
'190844239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id=" + dollars[1] + "]:visible:last")},
'194920467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.pageTitle+")").closest("section").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'200538401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("input");},
'204197629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(3)")},
'204984741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]")},
'205675981': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title*=" + dollars[0] + "]:mt_visible")},
'211625495': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Create Position)")},
'213760273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter("[title="+fixed.headerTitle+"]").closest("[data-automation-id='cardContent']");},
'214095110': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='menuItemTitle']").filter(":containsTextNode("+fixed.lmText+")").closest("button[data-automation-id='menuItem']");},
'224381524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.tgtElemText+")").closest("div");},
'227220819': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:eq(2)")},
'239592793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby*=formLabel]").filter(":containsTextNode("+fixed.labelTxt+")").closest("[role='group']").find("[data-automation-id="+fixed._dataAutomationId+"]");},
'246949331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-balloon-2889444 a.walkme-custom-bbcode-wt-link.walkme-action-start-wt")},
'252201131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")").closest("div[role='region']").find(".wd-icon-check").closest("button");},
'254060218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(2)")},
'254720303': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='viewStackHeaderTitle']").find("ul[role='presentation']").filter("[aria-label="+fixed.attrElem+"]").find(".gwt-Label");},
'262744103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby*='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").next("li").find("textarea");},
'264235945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const opDom= wmjQuery("header").find("[data-automation-id=ToolbarItem]").find("svg").filter("[class*=wd-icon-reorder]").closest("button");
if (opDom.length) return opDom;
const nopDom= wmjQuery("header").find(".navIcon").find("img").filter("[src_production*=hamburger]").closest("a");
if (nopDom.length) return nopDom;
return wmjQuery();},
'271936271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='header']").filter("[title="+fixed.modalTitle+"]").closest("[class*=FocusOrderContainer]").find("button").filter("[data-automation-id="+fixed._lmAttr+"]");},
'272649943': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader']").filter(":containsTextNode("+fixed.headerText+")").closest("[class*='CardContents']").children("[class*='-CompositeContainer']");},
'274757235': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='wd-SectionView']:eq(4) [data-automation-id=" + dollars[0] + "]")},
'275360674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-uxi-widget-type='selectinputicon']").find("svg.wd-icon-prompts");},
'275738295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridTitleLabel']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[id*=wd-Grid]").find("[data-uxi-widget-type=columnHeader],[data-automation-id*=columnHeader]").closest("tr");},
'276115065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuList']").filter("[aria-label="+fixed.ulAriaLabel+"]").find("[id*=input-entry]").filter(":containsTextNode("+fixed.elmText+")");},
'278046464': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN.gwt-InlineLabel:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'282306998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-GroupedList']").find("[data-automation-id=groupedListItem]").filter(":containsTextNode("+fixed.elemTxt+")");},
'285971554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("a[href_production*=myworkday]").children("span").first();
},
'287841426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptOption']:contains(" + dollars[0] + ")")},
'293294233': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id*='toggleButton']").filter(":containsTextNode("+fixed.elmTxt+")");},
'295499741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=\"Submit\"]")},
'300461632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._dataAutomationid+"]").first();},
'304356084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsItemLabel']").filter(":containsTextNode("+fixed.elmTxt+")");},
'310901595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='tabContent']")},
'316171285': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.tgtLabel+")").closest("li").find("[data-automation-id='richTextEditor']");},
'319341475': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='appHeader']").find("#notification-ally-label").closest("[class*='wdappchrome']");},
'319342019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "][data-automation-label=" + dollars[1] + "]")},
'319556607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title]").filter("[title="+fixed.lmTitle+"]").closest("[id*= wd-CompactNote]").find(".gwt-HTML");},
'323359189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._dataAutomationId+"]").parent("div");},
'329314407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:eq(0)")},
'330826009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "][title=" + dollars[1] + "]").filter(":visible")},
'333361118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("[data-automation-id='formLabel']").filter(":contains(" + fixed.labelText+ ")").parent().next().find("[role='link']");},
'343218238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("input").closest("div[data-automation-id='responsiveMonikerInput']");},
'344623647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='selectedItemList']:contains(" + dollars[0] + ")")},
'345869528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='workerProfileDetailsPanelName']")},
'346784360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter(":containsTextNode(" + fixed.tgtTxt + ")").find("[data-automation-id='formLabel']");},
'350590654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("[data-automation-id='multiSelectContainer']").find("[role='option']");},
'351861987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._parentAttr+"]").children("p").filter("[data-automation-id="+fixed._elemAttr+"]");},
'352822563': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=fieldSetLegendLabel]").filter(":containsTextNode("+fixed.sectionTitle+")").closest("[data-automation-id=fieldSetLegendHeading]").parent().parent().next("[data-automation-id=fieldSetContent]").find("[data-automation-id=formLabelRequired]").children("[data-automation-id=decorationWrapper]");},
'352852774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.innerheadertext+")").closest("[id*='HBox']").children("div");},
'357443991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='tabPanel']").filter("[aria-label="+fixed.lmAttr+"]").find("[id*='wd-ViewPage']").filter(":mt_visible"); },
'360691365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workdayApplicationFrame").find("[data-automation-id='wd-CommandButton']").filter(":contains("+fixed.BtnText+")");},
'362583550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label=" + dollars[0] + "]").filter(":visible")},
'367594965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']")},
'373675364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'376049760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=application]").find("div").filter("[data-automation-id="+fixed._lmAttr+"]").children("div").first();},
'376205128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar']").find("div").filter(":directContains("+fixed.elemText+")").filter(":mt_visible");},
'378525899': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:has([data-automation-id=" + dollars[1] + "]):visible")},
'383398166': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id=\"wd-CommandButton_uic_okButton\"]")},
'386883175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest("div").next("[data-automation-id='decorationWrapper']").find("svg.wd-icon-check-small");},
'389025014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='toolbarButtonContainer'] [data-automation-id=" + dollars[0] + "]:visible:last")},
'390939029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistItem']").filter(":eq("+fixed.tgtIndex+")").find("[data-automation-id='relatedActionsItemLabel']");},
'391093272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-EditPage']").filter(":containsTextNode("+fixed.sectionTitle+")").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id=multiselectInputContainer]");},
'395355802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Submit)")},
'398351700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerTitletext+")").closest("[data-automation-id='cardContent']");},
'404737977': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel[title=" + dollars[0] + "]")},
'409692980': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=WorkletPanel]").filter("[aria-label="+fixed.arialabel+"]").find(".wd-icon-gear");},
'410485644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='multiselectInputContainer']");},
'419932614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.elemTxt+")");},
'424486017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:has(svg[class~=" + dollars[1] + "])")},
'427888779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.popupHeaderDirectText+")").closest("[data-automation-id='popUpDialog']");},
'434049624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskOrchMegaNavBar]").find("[data-automation-id=taskOrchCurrentItemLabel]").parent().next();},
'445282414': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._parentAttr+"]").find("button[type=submit]");},
'449152058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":directContains("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("label[data-automation-id='formLabel']").parent();},
'449312055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='pageHeaderTitleText']").filter(":contains("+fixed.headerAttr+")").closest("div#mainContent").find("div[id^='wd-EditPage']");},
'451079413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='dropDownCommandButton']").find("button").filter(":containsTextNode("+fixed.BtnText+")");},
'454457189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-metadata-id=" + dollars[0] + "] li:contains(" + fixed.label + "):eq(" + dollars[1] + ")");},
'457461077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):visible")},
'462248024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img[src_production*='/wday/asset/career-hub/assets/wd-illustration-spot-phone-objects']").next("p")},
'468334613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*=" + dollars[0] + "] div[data-automation-id=" + dollars[1] + "]")},
'469175771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":directContains("+fixed.lmHeader+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.lmTetx+")");},
'471458698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("button[data-automation-id='pex-announcements-view-button']")
if (newElem.length > 0){
  return newElem
} return wmjQuery("div.workdayHome-aw")},
'471524983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workdayApplicationFrame")},
'472835864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.pageTitle+")").closest("section").find("button").filter(":contains("+fixed.lmText+")");},
'474321497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-SummaryPage div[role=region]:visible:first label[data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'483196548': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmLabelText+")").closest("li").find("[data-automation-id='responsiveMonikerInput']"); },
'488523189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='radio']").filter("[data-automation-id="+fixed._dataattr+"]").find(".wd-icon");},
'488635167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[id*=wd-PageContent]").children();},
'492792098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='columnHeader']").find("span").filter(":directContains("+fixed.elemTxt+")");},
'493990177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='Editor-Disabled']").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").next("li").find("[data-automation-id="+ fixed._lmDataAutomationId + "]");},
'495126866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] label:contains(" + dollars[1] + "):visible:last")},
'496919288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.lmText+")").parent("div").next("[data-automation-id='decorationWrapper']").find("div[class*=FocusContainer]");},
'497422189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.sectionTitle+")").closest("[id^='wd-SectionView']").find("[class*='SelectInputContainer']");},
'501517324': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-ProgressiveDisclosureContainer").find("h2").filter("[data-automation-id="+fixed._elemAttr+"]");},
'505338300': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby]").filter(":contains(" + dollars[0] + ")")},
'505355153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title*=" + dollars[0] + "]")},
'515544632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='checkboxPanel']")},
'515820533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._parentDataAutomation+"]").find("button").filter("[data-automation-id="+fixed._elemDataAutomation+"]").filter("[title="+fixed.btnTitleAttr+"]");},
'515883676': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.checkboxLabel+")").closest("li").find("[data-automation-id='checkboxPanel']").eq(1);},
'518851041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[title=" + fixed.elemText +" ]").closest(":header").closest("[data-automation-id='pageHeader'][role='region']").children("div").first();},
'526628309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:visible:first")},
'528384040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const isNewTableView = wmjQuery("input[role='switch']").closest("[role='region']").attr("data-uxi-togglebutton-state");
if (isNewTableView === "true") {
 return wmjQuery("[data-automation-id='rivaWidget']").find("[data-automation-id='tableWrapper']");	
} else if(isNewTableView === "false"){
 return wmjQuery
 ("[data-automation-id='rivaWidget']").find("[data-automation-id='MainContainer']");
}
return wmjQuery();},
'530796727': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='fieldSetLegendHeading']").filter(":containsTextNode("+fixed.headerSectionText+")").closest("[data-automation-id='fieldSetBody']").find("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.elmtxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'532884237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*='formLabel']").filter(":containsTextNode(" + fixed.label + ")").parents("li").find("div[data-automation-id='selectWidget']");},
'535569893': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=workletQuandrant]").find("[data-automation-id=groupedListItem]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("[data-automation-id=menuList]").find("[data-automation-id=menuItem][role=link]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'536455360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + fixed.headerTxt + ")").find("label").filter(":contains(" + dollars[0] + ")")},
'545899036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridToolbar']").find("ul").filter(":containsTextNode("+fixed.selectedTab+")");},
'546948622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label^=" + dollars[0] + "]")},
'550225279': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workdayApplicationFrame").find("[data-automation-id='dropDownCommandButton']").find("button").filter(":contains("+fixed.BtnText+")");},
'554509894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + "):last")},
'564788034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitle']").filter(":containsTextNode("+fixed.sectionheader+")").closest("[data-automation-id='taskWizardDetailContent']").find("[data-automation-id='panelSet']");},
'566479688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]").filter(":mt_visible")},
'567761202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("ul").find("[data-automation-id*=selectedItem]");},
'572929285': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:eq(0)")},
'575250295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][data-automation-button-type=" + dollars[1] + "]").filter(":visible")},
'575522386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=\"Submit\"]:visible")},
'579025395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:eq(" + dollars[0] + ")")},
'580805893': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption']:contains(" + dollars[0] + ")")},
'580976679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='TextEditorContainer']").find("p").filter(":containsTextNode("+fixed.elemText+")");},
'582818312': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=" + dollars[0] + "]:contains(No matches found)")},
'583090043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.lblText+")").closest("div").next("[data-automation-id='decorationWrapper']").find("[class*=SearchBarContainer]");},
'583703808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:eq(6) h3")},
'584439616': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(0)")},
'586788206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id=" + dollars[0] + "]:visible")},
'587272573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuItem']").filter("[data-automation-selected="+fixed.elemAttr+"]").find("span[data-automation-id='workerProfileMenuItemLabel']").filter(":directContains("+fixed.elemText+")").parent("div");},
'587931352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'590252761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id=selectedItemList]").find("[data-automation-id='promptOption']");},
'593620372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "))+div div[data-automation-id='responsiveMonikerInput']")},
'596364390': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='viewStackHeaderTitle']").filter(":containsTextNode("+fixed.headerTitle+")");},
'598375866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='navigationBarShortcut']").filter("[title="+fixed.lmTitle+"]");},
'599057199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[class*=SearchBarContainer]");},
'605718890': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(":header").filter(":contains("+fixed.popupHeader+")").closest(".wd-popup").find("textarea");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'605758499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.LabelText+")").closest("li.WN-F").find(".gwt-Label").filter(":containsTextNode("+fixed.elemTxt+")").closest("[data-automation-id^='selectedItem']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'605782744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']:has(label:contains(" + dollars[0] + ")) div[data-automation-id='dateWidgetContainer']")},
'606090040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistItem']").find(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")");},
'606389152': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").children("u").filter(":containsTextNode("+fixed.elemText+")");},
'606827719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] [role='button']:visible:last")},
'607145800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]:contains(Optum Bank Silver) + td .gwt-RadioButton-disabled:contains(" + dollars[1] + ")")},
'607281376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]")},
'609090742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV.workdayHome-ae:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'609253871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter("[title="+fixed.lmText+"]");
const originalElem = wmjQuery(".gwt-Label").filter("[title="+fixed.lmText+"]").closest("li[role='listitem']").find(".gwt-Label").parent();

if (originalElem.length)  return originalElem;
if (oldElm.length)   return oldElm;

if(ftHelper.unQuote(fixed.lmText)  === "View Teams") {
  const newElm =  wmjQuery("a[data-automation-id='groupedListItem']").filter("[title='Team Absence Calendar']");
  if(newElm.length){
    return newElm;
  }
	return  wmjQuery();
}
return wmjQuery();},
'609624226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("svg");},
'610204963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='gridToolbar']").find("span.gwt-InlineLabel").filter(":containsTextNode("+fixed.elemText+")").closest("li").filter("[data-automation-id="+fixed._elemAttr+"]");},
'610856354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):visible")},
'614362513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newButton = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']").find("[data-uxi-element-id='global-nav-apps-list-toggle']")
if (newButton.length > 0){
	return newButton
} return wmjQuery("button[data-uxi-button-type='view-all']")},
'615089802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")").closest("li").find(".cke");},
'616431974': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:eq(" + dollars[0] + ") h3")},
'619649520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=treeitem]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id='checkbox']").parent();},
'625608936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("span.gwt-InlineLabel[data-automation-id='gridTitleLabel']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'630638583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg.wd-applet-time-off,svg.wd-applet-employee-on-leave").closest("a")},
'631419994': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.lmHeaderText+")").closest("[id*='wd-Panel']").find("label").filter(":containsTextNode("+fixed.lmText+")").filter(":eq("+fixed.lmIndex+")"); },
'632222074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=fieldSetLegendLabel]").filter(":containsTextNode("+fixed.lmText+")").closest("div").parent("div").next("[data-automation-id='fieldSetContent']").find("span[data-automation-id='radioBtn']").eq(fixed.indx);},
'633446955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery(".wd-icon-travel").closest("[data-automation-id=workerProfileMenuItemWrapper]").filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();},
'638664973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".gwt-Label").filter(":containsTextNode("+fixed.lmText+")").closest("li");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'639450808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("[data-automation-id='richTextEditor']").filter(":containsTextNode("+fixed.questionText+")").closest("fieldset").find(":header").filter(":containsTextNode("+fixed.panelHeaderText+")").closest("[data-automation-id='panel']").find("label").filter(":containsTextNode("+fixed.labelText+")");},
'640266500': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id*='tabGridVisbleCell']").filter(":containsTextNode("+fixed.tgtTxt+")td");},
'644194081': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=panel]").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.tgtText+")");},
'647157960': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id='buttonBar']").find("li:eq("+fixed.liElemIndex+")").find("button").filter(":eq("+fixed.elemLocation+")");},
'650412456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTitleTxt+")").parent().next().filter(":containsTextNode("+fixed.firstSpanText+")").closest("[data-automation-id*='wd-ActiveListRow']");},
'666655151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg.wd-applet-time-off,svg.wd-applet-employee-on-leave")},
'669616454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"activeList\"][id*=" + dollars[0] + "] div[data-automation-id*=" + dollars[1] + "]")},
'676108493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-RadioButton").filter(":contains("+fixed.labelText+")").find("input");},
'679638173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptTitle']").filter(":containsTextNode("+fixed.titleTxt+")").closest(".wd-popup");},
'685460527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("dt").filter(":containsTextNode("+fixed.lmText+")").closest("[data-automation-id='summarizedListItem']").find("[data-automation-id='summarizedListItemValue']");},
'687604984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=\"menuitem\"][aria-label=\"Link Add My Dependent From Enrollment\"]:visible")},
'688867938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=tableHead]").find("th").find("button").filter(":containsTextNode("+fixed.elmtxt+")");},
'689560525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption']:contains(" + dollars[0] + "):not(:contains(Manager))")},
'697009991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newEditBtn = wmjQuery("button[data-automation-id='globalNavEditShortcuts'][data-uxi-element-id='global-nav-edit-shortcuts-link']");
if (newEditBtn.length > 0) {
 return newEditBtn
} return wmjQuery("button[data-automation-id='quickAccessPopupHeaderTextButton'][data-uxi-button-type='edit']");},
'698608096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']:last")},
'702157809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("[data-automation-id=workerProfileMenuItemWrapper]").filter(":containsTextNode("+fixed.elmTxt+")").filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();
},
'705403614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=pageHeaderTitleText]").filter(":containsTextNode("+fixed.titleTxt+")").closest("[data-automation-id=pageHeader]").find("[data-automation-id=textView]");},
'706608049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:eq(" + dollars[0] + ")")},
'709405486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").find("[role='textbox']").find("p");},
'714249612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div>label:contains(" + dollars[0] + ")")},
'714685034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(":containsTextNode("+fixed.headingText+")").closest("[id^='wd-AtlasMenuSection']").find("[data-automation-id='wd-MoreLink']").parent("div");},
'715536315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption']:contains(" + dollars[0] + "):contains(" + dollars[1] + "):not(:contains(Team))")},
'716068604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Time Type)")},
'716554139': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Onboarding)")},
'718886425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:eq(4)")},
'719620205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='input']").closest("li").find("[data-automation-id='formLabel']").filter(":contains("+fixed.elemText+")");},
'731604825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):last")},
'735643001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-uxi-element-id="+fixed._elemAttr+"]");},
'737363526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=wd-PageHeader]").find(".gwt-Label[id*=promptOption-gwt]")},
'746746634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='wd-ActiveListRow']:last [data-automation-id=" + dollars[0] + "]")},
'748892853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-label=" + dollars[0] + "]")},
'749107377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-button-type=" + dollars[0] + "]").filter(":visible")},
'750764785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='promptOption']:contains(" + dollars[0] + ")")},
'751163424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='tabLabel']").filter(":containsTextNode("+fixed.elemText+")").closest("ul[data-automation-id='tabBar']").find("li").filter(":first");},
'751708048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("p").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'751957659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]")},
'753023099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.mainhtext+")").closest("[id*='wd-SectionView']").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.subtext+")").closest("[data-automation-id*='wd-ActiveListRow']").find("[data-automation-id='actionImage']").find("button").filter("[title="+fixed.lmtitle+"]").first();},
'753329569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mainContent").filter(":containsTextNode("+fixed.labelText+")").prev("[data-testid='HC_BREADCRUMB']").find("[role='list']");},
'754486121': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:eq(2)")},
'757724153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=wd-AtlasMenu]").find(":header").filter(":containsTextNode("+fixed.elmTxt+")");},
'759657757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='titleText']").filter(":containsTextNode("+fixed.lmText+"):first").closest("[data-automation-id='inboxItemSelected'],[data-automation-id='inboxItem']");},
'760641374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("h1").closest("ul").find("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("li").find("[data-automation-id='checkboxPanel']");},
'763513062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(Submit)")},
'766063191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=\"wd-icon-edit wd-icon\"]:eq(" + dollars[0] + ")")},
'768008251': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("input[data-uxi-widget-type=selectinput]").parent();},
'773793310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='responsiveMonikerInput']:eq(1)")},
'776254889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-SectionView']:contains(" + fixed.headerTitle + ") [data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")");},
'776666082': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[class*="+fixed._svgClass+"]").closest("button");},
'780926417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.labelText+")").closest("[id*='wd-SectionView']").find("[data-automation-id='decorationWrapper']").filter(":containsTextNode("+fixed.tgtText+")");},
'781483528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-cy="+fixed._dataCy+"]");},
'784736307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=pageHeaderTitleText]:visible")},
'787801439': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"dateTimeWidget\"]")},
'791316785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + ")")},
'792625269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":directContains("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("[data-automation-id="+fixed._dataAutomationIdValue+"]").children("button");},
'796409841': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.inptLabel+")").closest("[data-automation-id='formLabelRequired']").find("input");},
'798556735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header, header[data-automation-id=breadcrumbsHeaderTitle]").filter(":containsTextNode("+fixed.lmText+")");},
'801806682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:eq(1)")},
'807299535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(Optum Bank Gold) + td .gwt-RadioButton-disabled:contains(" + dollars[0] + ")")},
'807968719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]:contains(Optum Bank Gold) + td .gwt-RadioButton-disabled:contains(" + dollars[1] + ")")},
'810424962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":contains(" + dollars[0] + ")")},
'813426206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2:contains(Attachments)")},
'813480966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("label").filter(":containsTextNode("+fixed.tgtText+")");},
'827969284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + dollars[0] + ") + div div[data-automation-id='checkbox']")},
'828139315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[id="+fixed._svgAttr+"]").closest("[data-automation-id='navigationBarMainTask']");},
'828700835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-deployables-list")},
'828729891': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1").filter(":contains(" + dollars[0] + "):visible")},
'831364785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(":header").filter("[data-automation-id="+fixed._lmId+"]");},
'832938656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").find("button").filter("[title="+fixed.elemAttr+"]").filter(":first");},
'839213637': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + "):visible")},
'840274059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter(":containsTextNode("+fixed.lmLabel+")").prev("label").closest("li");},
'841148222': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("div").next("[data-automation-id='decorationWrapper']").find("[data-automation-id='richTextEditor']").find(".cke_browser_webkit");},
'841533882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("body")},
'843085468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("return wmjQuery(\"[data-metadata-id=" + dollars[0] + "]:eq(" + dollars[1] + ") label:contains(" + dollars[2] + ")\")")},
'850036167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tableHeader = wmjQuery("[data-testid='table']").find("[role=columnheader]").filter(":containsTextNode("+fixed.thText+")");
const tableHeaderIndex = tableHeader.length === 1 ? tableHeader.index() : null;
return tableHeaderIndex > -1 ? tableHeader.closest("table").find("tbody").find("td[data-automation-id=cell]").filter(":eq("+tableHeaderIndex+")").find("button").filter("[aria-label='"+fixed.elmAttr+"']").filter(":mt_visible"): wmjQuery();},
'851251656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newButton = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']").find("[data-uxi-element-id='global-nav-apps-list-toggle'] span.wdc-text-button-label")
if (newButton.length > 0){
	return newButton
} return wmjQuery("button[data-uxi-button-type='view-all']")},
'868557975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[title=" + dollars[0] + "]")},
'870112271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby*=formLabel]").filter(":containsTextNode("+fixed.labelTxt+")").closest("[role='group']").find("div[class*=SearchBarContainer]");},
'874466086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitle']").filter(":containsTextNode("+fixed.sectionMainHeader+")").closest(".wd-ViewPage").find(":header").filter(":containsTextNode("+fixed.firstPanelHeader+")").closest("[data-automation-id='panel']").closest("[id*='wd-HBox']").children("div");},
'874790282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-player")},
'875317751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=workletQuandrant]").find("[data-automation-id=groupedListItem]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("[data-automation-id=menuList]").find("[data-automation-id=menuItem]").filter(":containsTextNode("+fixed.elemTxt+")").closest("li");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'875362543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"landingPageConfigurationOption\"]")},
'885129675': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.elemLabelText+")").closest("[data-automation-id='radioBtn']").find("input[type='radio']");},
'887883640': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskWizardMainHeaderTitle]").find("span").filter(":directContains("+fixed.elemText+")");},
'890698932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]")},
'891384177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".carousel").closest("section").filter("[aria-label="+fixed.ariaLabel+"]").children("div");},
'892607141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=\"wd-SectionView\"]").filter(":contains(" + dollars[0] + ")")},
'893552948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):first")},
'894160093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='monthPickerHeader']").next("table").children("tbody");},
'896996811': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("span[data-automation-id*='inbox_popup_item']").filter(":directContains("+fixed.lmTetx+")").parent();
const newElem = wmjQuery("span[class*='LabelContainer']").filter(":directContains("+fixed.lmTetx+")");
if (oldElem.length){
  return oldElem;
} else if (newElem.length){
  return newElem;
} else {
  return wmjQuery();
}},
'901607940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter("[title="+fixed.headerNear+"]").closest("[data-automation-id='pageHeader']").find("div[data-automation-id*='responsiveMonikerInput']").parent("div");},
'902162628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='tabGridVisbleCell']:contains("+fixed.tgtTxt+")td")},
'904266243': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(1)")},
'904386587': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + ")")},
'904401121': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitle'] h2").filter(":contains("+fixed.headerText+")").closest("[class*='ContentContainer']").find("textarea");},
'904823093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*='input']:contains(" + dollars[0] + ")")},
'905026824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=\"wd-ConclusionView-\"] [data-automation-id=" + dollars[0] + "]")},
'906779155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + ") [data-automation-id='responsiveMonikerInput']")},
'909825541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:eq(4)")},
'913852688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("h1").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='checkboxPanel']");},
'914942254': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] SECTION DIV[data-automation-id=" + dollars[1] + "]:eq(0)")},
'915874411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id^='wd-ActiveListRowEditor']").find("[data-automation-id='undoButton']").find("button");},
'917807399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const mainTabNav = wmjQuery("[data-automation-id='tabBar']").find("[data-automation-id='tabLabel']").filter(":containsTextNode("+fixed.elemText+")");
const dropDownTab= wmjQuery("[data-automation-id='menuList']").find("[data-automation-id='popupOption']").filter(":containsTextNode("+fixed.elemText+")");
const ifDropDownOpen = wmjQuery("[data-automation-activepopup='true']");
const allPrevTabs = mainTabNav.closest("li").prevAll();
let elemsWith3ClassesArray = [];
for (i=0 ; i<allPrevTabs.length ; i++) {
  if (allPrevTabs[i].classList.length===3) {
    elemsWith3ClassesArray[elemsWith3ClassesArray.length] = allPrevTabs[i];
  }
}
if (elemsWith3ClassesArray.length > 1 && !ifDropDownOpen.length) {
	return "WD_Profile_more";
  } 
  else if ((mainTabNav.length && !ifDropDownOpen.length) || (mainTabNav.length && ifDropDownOpen.length && !dropDownTab.length)) return mainTabNav;
  else if (ifDropDownOpen.length && dropDownTab.length) return dropDownTab;
return wmjQuery();},
'919544031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=\"menuitem\"][aria-label=\"Submenu Beneficiary Persons\"]:visible")},
'919771959': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-Id=pageHeader").filter(":containsTextNodeIgnore("+fixed.popupTitle+")").closest(".wd-popup").find(".wd-popup-content").find("[id*='wd-EditPage']");},
'922952885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const mainTabNav = wmjQuery("[data-automation-id='tabBar']").find("[data-automation-id='tabLabel']").filter(":containsTextNode("+fixed.elemText+")").closest("li");
const dropDownTab= wmjQuery("[data-automation-id='menuList']").find("[data-automation-id='popupOption']").filter(":containsTextNode("+fixed.elemText+")");
const ifDropDownOpen = wmjQuery("[data-automation-activepopup='true']");
const allPrevTabs = mainTabNav.closest("li").prevAll();
let elemsWith3ClassesArray = [];
for (i=0 ; i<allPrevTabs.length ; i++) {
  if (allPrevTabs[i].classList.length===3) {
    elemsWith3ClassesArray[elemsWith3ClassesArray.length] = allPrevTabs[i];
  }
}
if (elemsWith3ClassesArray.length > 1 && !ifDropDownOpen.length) {
	return "WD_Profile_more";
  } 
  else if (mainTabNav.length && !ifDropDownOpen.length) return mainTabNav;
  else if (ifDropDownOpen.length && dropDownTab.length) return dropDownTab;
return wmjQuery();},
'924862090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("LABEL").filter(":contains(" + dollars[0] + ")")},
'934803773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").find("button").filter("[title="+fixed.tgtLmAttr+"]");},
'935361869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._elemAttr+"]").find(":header");},
'937119145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'938274949': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='textView']"); },
'938735706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):last")},
'940293044': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid="+fixed._elmAttr+"]");},
'941165688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=formLabel]").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("input").closest("[class*=SearchBarContainer]");},
'950297707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("button[data-automation-id='pex-app-tiles-tile'],div.workdayHome-ae")
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']")
let isModal = wmjQuery("div[data-automation-id='pex-modal']")
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
}else if (tgtLM.length > 0){
	return tgtLM
}
return wmjQuery()

},
'960559854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title=" + dollars[1] + "]:visible")},
'967063273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='textView']").filter(":containsTextNode("+fixed.lmText+")");},
'967333264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.btnText+")").closest("[data-automation-id=subTabPanel]").find("ul[data-automation-id=tabBar]");},
'969799677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]")},
'972362407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")").closest("[data-automation-id='relatedActionsSublistItem']");},
'972846563': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"pdfIconButton\"]")},
'974569427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=calendarevent]").find("[data-automation-id=icon]").filter("[data-automation-icontype='"+fixed._dataIconType+"']").parent();},
'984683577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dropDownCommandButton']")},
'989680101': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "]").filter(":visible")},
'989967865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id='hammy_current_user_item']")},
'990045226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV.workdayHome-ae[title=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'994432874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-automation-id='"+fixed._datalm+"']").closest("div");},
'995290794': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("ul[data-automation-id=inbox_item_list]");
const newElem = wmjQuery("ul[data-automation-id=inboxItemList]").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'998176251': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-button-type=" + dollars[0] + "]")},
'1000149679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id='radioBtn']").closest("[data-automation-id='radioGroup']").closest("[data-automation-id=decorationWrapper]");},
'1006882356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(2)")},
'1008852998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd-CommandButton_uic_okButton']")},
'1010031344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("[id='bpSlimConclusionHeaderText']");},
'1014609847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[title="+fixed.lmTitle+"]").closest("[class*=HeaderContainer]").find("[data-automation-id=taskWizardInstance]").find("[data-automation-id=truncatedText]").children("span").find("span:eq(" + dollars[0] + ")");},
'1016705620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=toolbarButtonContainer]").find("button").filter("[title="+fixed.buttonName+"]").closest("div").parent("div");},
'1019483039': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=sidebar-navigation]").find("a").find("span").filter(":containsTextNode("+fixed.elmText+")");},
'1026545325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has([data-automation-id='formLabel']:contains(" + dollars[0] + ")):visible:last")},
'1027434562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.workdayHome-ad div[title=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1030040615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-task-ids='VIEW_TASK_TaskId']").filter("[title="+fixed.titleText+"]");},
'1031016209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='decorationWrapper']");},
'1033316318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=pageHeaderTitleText]").filter(":containsTextNode("+fixed.pageTitle+")").closest("[id=mainContent]").find("button[data-automation-id='wd-CommandButton_calendarSubmitButton']");},
'1037297313': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:has([class~=" + dollars[1] + "])")},
'1040349748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id="+fixed._dataautomationid+"]").find("div[class*=container]");},
'1045056496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".inboxTaskContainer").find("button").filter("[data-automation-id="+fixed._lmdata+"]");},
'1046632236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageApplicationsCard']")},
'1049665781': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel:contains(" + dollars[0] + "):mt_visible")},
'1059518226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.elemText+")");},
'1063293155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=cardContent]").find("[data-automation-id='compositeHeader']").filter(":containsTextNodeIgnore("+fixed.elmtxt+")");},
'1064779126': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("."+fixed._firstClassOfSvg).closest("[data-automation-id=bucketContainerButton");},
'1065259268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-button-type='PRIMARY']")},
'1065640707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]")},
'1068027295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + dollars[0] + ")")},
'1069197334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[id*='heading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='headerContainer']").parent("div");},
'1069615996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div span[data-automation-id=" + dollars[0] + "]")},
'1072852877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#wd-outbox-list-sorts-button,button[data-automation-id='itemsColumnHeaderGearIcon']")},
'1076565635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "]").filter(":visible")},
'1076872130': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._dataAutomationId+"]");},
'1080695264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".gwt-Label").filter(":containsTextNode("+fixed.lmText+")").closest("li");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1085302336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:has(label:contains(" + dollars[0] + ")) [data-automation-id=" + dollars[1] + "]:visible")},
'1092115963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='pex-search-result-card']").find("p").filter(":containsTextNode("+fixed.subLabel+")").prev("[data-automation-id='pex-search-result-header']").find("a[class*='pexsearch']");
},
'1094362743': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id='selectedTab']").filter(":contains("+fixed.selectedTabTxt+")").closest("[data-automation-id='workerProfileContentContainer']").find("[data-automation-id='gridToolbar']").find("label");},
'1096376689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label^=" + dollars[0] + "]")},
'1097530507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[id^=heading]").filter(":containsTextNode("+fixed.titleTxt+")").closest("[id^='wd-SectionView']").find("li[role=presentation]").filter(":containsTextNode("+fixed.labelTxt+")").find("[id^='wd-delta-item-list'][data-automation-id=decorationWrapper]");},
'1102459305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"dateWidgetContainer\"]:eq(0)")},
'1103487856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=page_container]").find("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'1106501722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=pageHeader]").find("h1").find("[data-automation-id=pageHeaderTitleText]");},
'1112445276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header span").filter("[title="+fixed.headerAttr+"]").closest("div.wd-popup");},
'1116178420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=listbox]").find("[data-automation-id='promptLeafNode']").filter(":containsTextNode("+fixed.tgtText+")");},
'1124537089': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][id*='56$86329']")},
'1124576970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#wd-Worker-NO_METADATA_ID")},
'1125316710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetOptions = wmjQuery("[data-automation-id*='columnLabel']").filter(":containsTextNode("+fixed.tgtDirectText+")");
targetOptions = targetOptions.length ? targetOptions : wmjQuery("[role='columnheader']").find("span").filter(":directContains("+fixed.tgtDirectText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1130111801': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("[class*=SearchBarContainer]");},
'1132532747': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "]:has(label:contains(" + dollars[1] + ")) div[data-automation-id='dateWidgetContainer']")},
'1132773782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg[class*="+fixed._svgClassSplit+"]").closest("div[data-automation-id='workerProfileMenuItemWrapper']").find("span[data-automation-id='workerProfileMenuItemLabel']").parent("div");},
'1138523975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-PageHeader']").find("span[data-automation-id='pageHeaderTitleText']").filter(":contains("+fixed.elemTxt+")");},
'1141819076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.elemLabel+")").closest("[data-automation-id='formLabelRequired']").find(".wd-icon-x-small");},
'1142075605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("div.workdayHome-ae").filter(":contains("+fixed.lmText+")").find("span").filter(":directContains(" + dollars[0] + ")");
let newTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter(":contains("+fixed.lmText+")");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
} else if(newTgtLM.length > 0) {
	return newTgtLM
}  else if (tgtLM.length > 0){
 return tgtLM
}
return wmjQuery();

},
'1148055539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:first")},
'1151358073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:eq(" + dollars[0] + ") [data-automation-id='formLabelRequired'][role=" + dollars[1] + "] label")},
'1160068229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[data-uxi-widget-type="columnHeader"]').find("span").filter(":containsTextNode("+fixed.spanTxt+")").closest("button");},
'1160607277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"hammy_current_user_item\"]")},
'1162079183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.panelHeaderText+")").closest("div[id^='wd-PanelSet']");},
'1169242711': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-minimize.walkme-icon-font.walkme-menu-click-close.walkme-animation-hide.walkme-override.walkme-css-reset")},
'1174328072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li[role='presentation']").find("[data-automation-id='responsiveMonikerInput']");},
'1177989030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.gwt-Label").filter(":containsTextNode("+fixed.tgtElemText+")"); },
'1181093508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"fieldSetBody\"] label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + ")")},
'1183904507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuList']")},
'1187575996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-flow")},
'1190123813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headertxt+")").closest("[id*='wd-Panel']").find("[data-automation-widget='richTextAreaInput']").eq(1).children("[class*='Container']");},
'1190540527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.RadioLabelText+")").closest("[role='presentation']").find("[data-automation-id='radioGroupItemsContainer'] div:eq(0)");},
'1193750659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='taskWizardListPane']").find("[class*='ContentContainer']");},
'1194453384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.sectionTitle+")").closest("div[id^='wd-FieldSet']").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("input[data-uxi-widget-type='selectinput']").parent();},
'1201007001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][tabindex=\"0\"]").filter(":visible")},
'1202920001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + ") div[data-automation-id=\"responsiveMonikerInput\"]")},
'1204982823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd_header_home_icon']")},
'1210312629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:eq(0)")},
'1225651800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li[role='presentation']").find("[class*='SearchBarContainer']");},
'1226871885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='fieldSetLegendHeading']").filter(":contains("+fixed.titleText+")").closest("div[id^='wd-PageContent']").find("button[data-automation-id='wd-CommandButton']").filter("[title="+fixed.elemAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1232471142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.gwt-Label").filter(":containsTextNode("+fixed.lmText+")");},
'1234441231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='promptLeafNode']").find("[data-automation-id='radioBtn']").filter(fixed._tgtTag);},
'1235913345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[Role='"+fixed._parentRole+"']").filter("[data-id='"+fixed._parentDataId+"']").children("div");},
'1236169576': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter(":containsTextNode(" + fixed.label + ")").find("span,input").filter("[data-automation-id*='dateSectionYear']");},
'1244079521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "]:eq(2)")},
'1251895446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").find("span").filter(":directContains("+fixed.tgtDirectText+")");},
'1254304848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label[title=" + dollars[0] + "]").filter(":visible")},
'1258302912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id='multiselectInputContainer']");},
'1259853688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldViewAllAppsButton = wmjQuery("[data-automation-id='pex-view-all-apps']");
const newViewAllAppsButton = wmjQuery("[data-uxi-element-id='pex-announcements']").closest("[class*='section-container-fadeInWrapper']").find("[data-automation-id='pex-announcements-view-button']"); 
if (oldViewAllAppsButton.length) return oldViewAllAppsButton;
if (newViewAllAppsButton.length) return newViewAllAppsButton;

return wmjQuery(); },
'1260583333': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='announcementExpandedItem']").find(":header").filter(":containsTextNode("+fixed.txt+")").closest("li").children("div").filter(":first");},
'1262640510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "][role=" + dollars[1] + "]")},
'1263293434': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=richTextEditor]").filter(":containsTextNode("+fixed.questionText+")").closest("[data-automation-id=panel]").find("textarea").next("div").filter(":mt_visible");},
'1263523916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] span[data-automation-id=" + dollars[1] + "]").filter(":containsTextNode("+fixed.tgtElemText+")");
},
'1264075945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:visible:eq(" + dollars[0] + ")")},
'1266016280': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content")},
'1271797238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'1276607332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id='"+fixed._elemAttr+"']").closest(".wd-headerWrapper");},
'1288112923': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=menuItem]").find("[data-automation-id^=inbox_popup_item]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("svg.wd-icon-perspective").closest("li").find("button[data-automation-id=subMenuItemButton]").filter(":first");
if (oldElem.length){
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
else {
  return wmjQuery();
}},
'1291977878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-DrillDownNumber").filter("[title="+fixed.lmtitle+"]").find("button").filter(":mt_visible").first();},
'1296772736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='richTextContent']")},
'1297589847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=table-head]").find("th").find("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'1297752020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newEditBtn = wmjQuery("button[data-automation-id='globalNavEditShortcuts']").find("svg.wd-icon-edit");
if (newEditBtn.length > 0) {
  return newEditBtn
} return wmjQuery("button[data-automation-id='quickAccessPopupHeaderTextButton'][data-uxi-button-type='edit']")},
'1300827650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] [data-automation-id=" + dollars[1] + "]")},
'1300988943': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1301959606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup")},
'1306299626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.buttonName+"]").closest("[data-automation-id='buttonBar']");},
'1308040835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"landingPageWorkletSelectionOption\"][title=" + dollars[0] + "]")},
'1308043312': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:has(label:contains(" + dollars[0] + "))")},
'1311050881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.tgtTitle+")").closest("[data-automation-id='viewStackHeaderTitle']").find("div.WKQK");},
'1311240802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='activeList']").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("div").next("[data-automation-id='decorationWrapper']");},
'1313309719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + fixed.label + ") [data-automation-id=" + dollars[0] + "]")},
'1315471382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.liLabel+")").closest("li").find("div").filter("[data-automation-id="+fixed._dataAutomationId+"]");},
'1317433042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("input").filter("[placeholder="+fixed.lmAriaLabel+"]");},
'1318410276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find(".cke_browser_webkit");},
'1319918594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='popUpDialog']")},
'1320547034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*=" + dollars[0] + "]")},
'1322128211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='richTextEditor']").filter(":containsTextNode("+fixed.questionText+")").closest("fieldset").find(":header").filter(":containsTextNode("+fixed.labelText+")").closest("fieldset").find(".cke_browser_webkit");},
'1331357975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:contains(" + dollars[0] + "):not(:contains('Incentive'))")},
'1342657350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"landingPageWorkletSelectionOption\"]:contains(" + dollars[0] + "):visible")},
'1343675569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelDirectText+")").closest("[data-automation-id='formLabelRequired']").find(".wd-icon-calendar");},
'1343834846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='verticalNavigationItem']").filter("[title="+fixed.elmTitle+"]");},
'1348214228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd-CommandButton_uic_doneButton']")},
'1348604238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-widget='wd-popup']").find("[data-automation-id=promptTitle]").filter(":containsTextNode("+fixed.elemTxt+")");},
'1352346741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-automation-id="+fixed._ulAttr+"]").find(".gwt-Label").filter(":containsTextNode("+fixed.elmTxt+")");},
'1352946464': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(" + dollars[0] + ") + td .gwt-RadioButton-disabled:contains(Waive)")},
'1353531181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("button[data-automation-id='pex-announcements-view-button']").find("svg.wd-icon-chevron-down-small")
if (newElem.length > 0){
  return newElem
} return wmjQuery(".workdayHome-aw")
},
'1354493056': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (oldElm.length){
 return oldElm;
} 
if(ftHelper.unQuote(fixed.lmText) === "Request Absence") {
 const newElm = wmjQuery("a[data-automation-id='groupedListItem'], [data-automation-id='dropDownCommandButton']").filter(":containsTextNodeIgnore('Request Time Off')");
 if(newElm.length){
  return newElm;
 }
	return wmjQuery();
}
return wmjQuery();
},
'1358835779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("svg.wd-icon-prompts");},
'1360508553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id="+fixed._dataAutomationIdValue+"]").find("span").filter(":directContains("+fixed.elemText+")");},
'1363345150': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + ")")},
'1372648858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='multiselectlistitem']").find("[id*='promptOption']").filter(":containsTextNode("+fixed.lmtxt+")");},
'1374028432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id='pex-search-source-all:default']");},
'1377635638': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workletQuandrant'][aria-labelledby='" + fixed.tgtLabel + "'] button:eq(" + dollars[0] + ")")},
'1378857669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='taskWizardListPane']").find("div[data-automation-id='taskWizardInstance']").find("span span span").filter(":first");},
'1384812868': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=" + dollars[0] + "]:visible")},
'1385232338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='verticalNavigationItem']").filter("[title="+fixed.ttl+"]").find("span[class*=Text]");},
'1385805735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.lmInnerHeaderText+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='panel']"); },
'1386013118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[data-automation-id='fieldSetBody']").parent("div");},
'1391613956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.dds__button").filter("[id="+fixed._elemId+"]");},
'1397215997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":last") : tgtOptions;},
'1401457896': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".centerDayContainerCell").find("div.day-separator").filter("[automationdid='"+fixed._lmPrevDiv+"']").next("div"); },
'1404015375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.fieldSetLegendText+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='fieldSetContent']").children();},
'1409215909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmPageHeaderTxt+")").closest("#mainContent").find("label").filter(":containsTextNode("+fixed.lmText+")"); },
'1410469346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[title="+fixed.titleAttr+"]").children(":header");},
'1413139158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='globalNavAppItemLabel']").filter("[title="+fixed.elemAttr+"]");},
'1417623089': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd-CommandButton_calendarSubmitButton']")},
'1419462117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter("[title="+fixed.pageHeaderText+"]").closest("section").find("button").filter("[title="+fixed.lmTitle+"]");},
'1423433288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery(".wd-icon-travel").closest("[data-automation-id=workerProfileMenuItemWrapper]").find("[data-automation-id=workerProfileMenuItemLabel]").filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();},
'1430939032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.wd-popup").find("span[data-automation-id='pageHeaderTitleText']");},
'1432010013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th ,td.WHUG").find("span").filter(":containsTextNode("+fixed.elemText+")");},
'1436252129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (oldElm.length){
 return oldElm;
} 
if(ftHelper.unQuote(fixed.lmText) === "Absence Balance") {
 const newElm = wmjQuery("a[data-automation-id='groupedListItem'], [data-automation-id='dropDownCommandButton']").filter(":containsTextNodeIgnore('Time Off Balance')");
 if(newElm.length){
  return newElm;
 }
	return wmjQuery();
}
return wmjQuery();
},
'1445080912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] SECTION DIV[tabindex]:eq(" + dollars[1] + ")")},
'1448586938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[data-automation-id=\"pageHeaderTitleText\"]").filter(":contains(" + dollars[0] + ")").parents("#mainContent").find(".wd-SummaryPage").parents("div:eq(" + dollars[1] + ")")},
'1449403656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]")},
'1450996808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:eq(1)")},
'1453093021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']:eq(" + dollars[0] + ")")},
'1456977677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id='pageHeaderTitle']").find("[data-automation-id='promptOption']");},
'1458161598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[id^='wd-FileUpload']").find("label").filter(":containsTextNode("+fixed.elemLabel+")").closest("li").find("svg");},
'1459874532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("pro-dashboard-widget-container").find("div").filter(":directContains("+fixed.labelText+")").filter(":mt_visible");},
'1464175301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.fieldLabel+")").closest("li").find("div[data-automation-id="+fixed._dataAutomationId+"]");},
'1467686458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[class*="+fixed._svgClass+"]").closest("[data-automation-id='workerProfileMenuItemWrapper']").find("span").parent("div");},
'1472126897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title='Next']")},
'1473348852': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader']").filter(":containsTextNode("+fixed.cardTitle+")").closest("[data-automation-id='cardContent']").children("div").filter(":first");},
'1475367508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelTxt+")").closest("li");},
'1477094584': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "]").filter(":contains(" + dollars[1] + ")")},
'1482711776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN[data-automation-id=" + dollars[0] + "]").filter(":contains(" + dollars[1] + ")")},
'1483545354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._lmAttr+"]");},
'1489301793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='relatedActionsSublistPopup']")},
'1491831346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1493681351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]:eq(0)")},
'1495213099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[id^='wd-SectionView']").find("button").filter("[title="+fixed.elemtTitleAttr+"]");},
'1496277088': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar']").filter(":containsTextNode("+fixed.elemText+")").filter(":mt_visible");},
'1496513817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title='Inbox']")},
'1497600899': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='cardFrameworkCard']").find("button").filter(":containsTextNode("+fixed.btnText+")");},
'1500002748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.checkboxLabel+")").closest("li").find("[data-automation-id='checkboxPanel']").eq(3);},
'1501763417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pex-announcements-section-header']").parent()},
'1502400355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='filterPipelineStage']").filter(":containsTextNode("+fixed.elemTxt+")").find("[data-automation-id='stageCount']");},
'1509172945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[data-testid="+fixed._dataTestid+"]");},
'1511404757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + ") button").filter(":visible")},
'1515947379': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateWidgetContainer']")},
'1516097668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = fixed.targetText;

if (targetText.indexOf("(") > 0) {
  targetText = ftHelper.unQuote(wmjQuery().identity(targetText));
  targetText = targetText ? targetText.split(" (")[0] : null;
  return wmjQuery("[data-automation-id=promptOption]").filter(":contains(" + targetText + ")");
}
else{
  return wmjQuery("[data-automation-id=promptOption]").filter(":containsTextNode(" +fixed.targetText+ ")");
}



},
'1516943019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):visible:last")},
'1521576729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskWizardListPane]").find("[data-automation-id=taskWizardMainHeaderTitle]").find("span[data-automation-id=truncatedText]").children("span").children("span");},
'1521996252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']").filter(":contains("+fixed.tgtHeaderTxt+")").find("[data-automation-id=" + dollars[0] + "]")},
'1521996253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']").filter(":contains("+fixed.tgtHeaderTxt+")").find("[data-automation-id="+fixed.autmationId+"]");},
'1522903390': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='gaugeWidgetInfoTitle']").filter(":contains("+fixed.labelText+")").closest("div[data-automation-id='gaugeWidget']").find("div[data-automation-id='gaugeWidgetDetailValue2']");},
'1523000194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:eq(15)")},
'1525234758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"toolbarButtonContainer\"]")},
'1527765110': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery(".wd-icon-travel").closest("[data-automation-id=workerProfileMenuItemWrapper]").find("[data-automation-id=workerProfileMenuItemLabel]").parent().filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();},
'1529755863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar']").filter(":containsTextNode("+fixed.elemTxt+")").closest("pro-dashboard-numeric>div");},
'1530068210': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='pageHeaderTitleText']:eq(" + dollars[0] + ")")},
'1532982253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateTimeWidget'][id*=" + dollars[0] + "]")},
'1542464970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type=multiselectlistitem]").filter(":containsTextNode("+fixed.elemTxt+")").find("[data-automation-id=promptOption]");},
'1544268688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")").closest("[data-automation-id='relatedActionsSublistItem']");},
'1551305779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:first")},
'1555394889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let innerheaderelem = wmjQuery("label[id*='wd-delta-item-list']").filter(":containsTextNode("+fixed.labelText+")");

if (innerheaderelem.length === 0) {
	innerheaderelem = wmjQuery("label[id*='formLabel']").filter(":containsTextNode("+fixed.labelText+")");
}

return wmjQuery(innerheaderelem).closest("li");},
'1567819138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title=" + dollars[0] + "]").filter(":mt_visible")},
'1571312340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[data-automation-id='pex-welcome-greeting']").find("span").eq(2);},
'1573139459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Business Title)")},
'1576992472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:last")},
'1577733695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest(".wd-popup-content");},
'1578404790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=\"promptTitle\"]:contains(No matches found)")},
'1580501707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(Next)")},
'1586095543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-cy="+fixed._dataCy+"]");},
'1589919761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.hdrTxt+")").closest("[data-automation-id='panel']").find(".gwt-InlineLabel").filter(":containsTextNode("+fixed.lmTxt+")").parent();},
'1598785905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='globalNavAppItemLabel']").filter(":containsTextNode("+fixed.elmTxt+")").closest("li").find("[data-automation-id='globalNavAddApp']");},
'1616142936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[role=button]").filter("[title="+fixed.btnTitleAttr+"]").find("svg.wd-icon-chevron-down");},
'1617969792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pdfIconButton']:visible")},
'1620341014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=menuItem]").find("[data-automation-id^=inbox_popup_item]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("svg.wd-icon-perspective").closest("li").find("button[data-automation-id=subMenuItemButton]").filter(":first");
if (oldElem.length){
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
}
else {
  return wmjQuery();
}},
'1620869165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id=pageHeader]").find("[data-automation-id]").filter("[data-automation-id="+fixed._dataAutomationId+"]").closest("[class*=IconContainer]").parent("div");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1634618204': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("span[data-automation-id=pageHeaderTitleText]").filter("[title="+fixed.elemText+"]");},
'1637273753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains('Allow Duplicate Name') + div div[data-automation-id=" + dollars[0] + "]")},
'1638098984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("button[data-automation-id='inbox-filter-dropdown']");
const newElem = wmjQuery("svg.wd-icon-perspective").closest("button[data-automation-id=menuItem]");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'1644392362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + dollars[0] + ") + div div[data-automation-id=\"checkbox\"]")},
'1647104524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(>label:contains(" + dollars[0] + "))")},
'1648394802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"dateWidgetContainer\"]:eq(" + dollars[0] + ")")},
'1655442510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "][title=" + dollars[1] + "]")},
'1664198608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Job Title)")},
'1664250000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=pageHeader]").find(".gwt-Label[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible");},
'1664623541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a, button").filter("[data-testid="+fixed._elemAttr+"]").find("span").filter(":last");},
'1666221266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.elemTxt+")").closest("[id^='wd-SectionView']");},
'1670107582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id=wd-ActiveList-addButton]:visible")},
'1671568196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader']").filter(":containsTextNode("+fixed.cardText+")").closest("[data-automation-id='card']").find("[data-automation-id='cardButton']").filter(":containsTextNode("+fixed.tgtText+")");},
'1679876331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=inbox_item_list]").find("img[data-automation-id='inbox-star-icon']").filter(":first");
const newElem = wmjQuery("[data-automation-id='inboxItemList']").find("button[data-automation-id='favoriteIcon']").filter(":first");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'1683190617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest("div[id*=wd-SectionView]");},
'1683523804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const myUL = wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headertxt+")").closest("[data-automation-id='pageHeader']").find("ul");
if (myUL.children('li').length === 5) {
	return myUL.filter(":mt_visible");
}
return wmjQuery();},
'1683989065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.label+")").closest("div[data-automation-id='radioGroupItemsContainer']");},
'1684092907': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Reason)")},
'1690386169': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=radioGroupItemsContainer]").find("label").filter(":containsTextNode("+fixed.labeltxt+")").closest("[data-automation-id='decorationWrapper']").find("[data-automation-id=selectSelectedOption]");},
'1691001497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;

return wmjQuery("span").filter(":directContains("+targetText+")").closest("[role=button]").parent();

},
'1691494124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "]:contains(" + dollars[1] + ") button:visible")},
'1694938825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.tgtElemText+")");},
'1703256912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:visible:contains(" + dollars[0] + "):first")},
'1705690735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption']:contains(" + dollars[0] + "):not(:contains(Payslips))")},
'1707610529': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:contains(Opening)")},
'1708178137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmRText+")").closest(".gwt-RadioButton").parent();},
'1710913636': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.gwt-Label").filter(":contains(" + dollars[0] + ")")},
'1714006297': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("[data-automation-id='pageHeaderTitleText']").filter("[title="+fixed.lmTitle+"]");},
'1714893275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("[id^='heading']").filter(":containsTextNode("+fixed.tgtElemLabelText+")").parent();},
'1716750528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains('Allow Duplicate Name') + div div[data-automation-id=\"checkbox\"]")},
'1718468540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuItem']").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'1718712909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("button[data-automation-id='inbox-filter-dropdown']");
const newElem = wmjQuery("svg.wd-icon-perspective").closest("button[data-automation-id=menuItem]");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'1719118406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerText+")").closest(":header").closest("[data-automation-id='pageHeader']").closest("#mainContent").find("button").filter(":contains("+fixed.elemText+")");},
'1720468709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=dragDropTarget]").closest("div[id*='wd-InlineEditPanel']").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'1723275915': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=" + dollars[0] + "]")},
'1734203412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='dateInputWrapper']")
if (newElem.length > 0){
  return newElem;
} return wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='selectWidget']").parent()

},
'1739294486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmTitleTxt+")").closest("[data-uxi-element-id='popupInfo']").find("button").filter("[title="+fixed.lmTitleAttr+"]"); },
'1739442035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='listbox']").find("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.optionDirectText+")").closest("[data-automation-id='promptLeafNode']");},
'1740739145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + "):eq(0)")},
'1743058147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("ul[role='tablist']").find(".gwt-Label").filter(":containsTextNode("+fixed.tabText+")").closest("li[role='tab']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1744364952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Create Job Requisition)")},
'1745084761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldTgtSvg = wmjQuery("div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]").find("svg");
const middleTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter("[aria-label="+fixed.lmAriaLabel+"]").find("svg");
const newTgtLm = wmjQuery("[data-automation-id='globalNavAppItemLink']").filter("[aria-label="+fixed.lmAriaLabel+"]").find("svg");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtSvg.length > 0){
  return oldTgtSvg;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLm.length > 0){
  return newTgtLm;
}
return wmjQuery();
},
'1749274004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title*=" + dollars[0] + "]")},
'1751187327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("[data-automation-id="+ fixed._lmDataAutomationId + "]");},
'1751723118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='columnItemLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").next("li");},
'1752280664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='decorationWrapper']").find("[role='button']").children().first();
},
'1758294224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"inbox_item_list\"]")},
'1763222247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("h3[data-automation-id=orgChartItemOwner]").filter(":containsTextNode("+fixed.elemTxt+")").closest("[data-automation-id=orgChartItem]").find("img").parent().filter(":first");
const newElem = wmjQuery("h3[data-automation-id=orgChartPrimaryInstance]").filter(":containsTextNode("+fixed.elemTxt+")").closest("[data-automation-id=orgChartCard]").find("[data-automation-id=orgChartPrimaryProfile]").find("button");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'1763412854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td,th").filter(":containsTextNode("+fixed.elemTxt+")");},
'1769507573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Cost Center)")},
'1770102017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("td").filter(":has(button)");},
'1772249187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h4:contains(Primary Phone)")},
'1778011612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*=" + dollars[0] + "]")},
'1789575616': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-SectionView']").filter(":containsTextNode("+fixed.sectionTitleTxt+")").find("[data-automation-id^='wd-ActiveListRow']");},
'1793718807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._btnDataAutomationContext+"],[datatest-id="+fixed._btnDataAutomationContext+"]").parent().parent();},
'1794185979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.popupHeaderDirectText+")").closest(".wd-popup-content");},
'1800041771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-context="+fixed._btnDataAutomationContext+"]").parent().parent();},
'1804369022': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=inboxItemList]").find(":header").filter(":containsTextNode("+fixed.elemTxt+")").closest("[data-automation-id*=inboxItem]");},
'1804408909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-button-type=\"AUXILIARY\"]:visible")},
'1805842147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:eq(6)")},
'1812936830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel[title=\"Health Care Elections\"]")},
'1825745977': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("div.workdayHome-ae,button[data-automation-id='pex-app-tiles-tile']").filter(":containsTextNode("+fixed.lmText+")");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
}else if (tgtLM.length > 0){
	return tgtLM
}
return wmjQuery();

},
'1827679017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("[class*=SearchBarContainer]");},
'1827722738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label='action bar']")},
'1829999056': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id=" + dollars[0] + "]")},
'1832516657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*='2'][data-automation-id=" + dollars[0] + "]")},
'1832589158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:eq(" + dollars[1] + ") [data-automation-id='formLabel']:eq(4)")},
'1834055193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']").find("[id*=heading]").filter(":containsTextNode("+fixed.elemTxt+"):mt_visible");},
'1835502115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.panelHeader+")").closest("[data-automation-id='panel']").find("button").filter("[title="+fixed.btnTitle+"]");},
'1841404609': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=" + dollars[0] + "]")},
'1841784581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='Label']").filter(":containsTextNode("+fixed.parentText+")").closest(":header").next("ul").find("button");},
'1846367564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.elemLabelText+")").closest("[data-automation-id='radioBtn']").find("input[type='radio']");},
'1846873853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-label*=" + dollars[0] + "]")},
'1848571053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=\"TiledListGallery\"]:visible")},
'1853260968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]")},
'1856710632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-ViewPage").find(":header").filter(":containsTextNode("+fixed.elmTxt+")").closest("div");},
'1865324216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerTxt+")").closest(".wd-popup").find("[id*=wd-PageContent]").children();},
'1876277518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":contains("+fixed.labelText+")").closest("[data-automation-id='viewStackHeaderTitle']").find("[data-automation-id='promptOption']");},
'1876984037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("div[class*=NumericSpinnerDiv]").filter("[id*=dateSectionMonth]").parent();},
'1877736435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsItem']").filter(":contains("+fixed.lmTet+")");},
'1879036019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem =wmjQuery("th[role='columnheader']").find("span").filter(":containsTextNode("+ fixed.btnText +")").closest("button");
if (elem.length)
 {return elem;} 
return wmjQuery("td[data-automation-id*='tabGridVisbleCell']").filter(":containsTextNode("+ fixed.btnText +")");},
'1880948848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmText+")");},
'1881804816': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[data-automation-id="+fixed._btnDataAutomationContext+"],[datatest-id="+fixed._btnDataAutomationContext+"]").parent().parent();},
'1882598451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='landingPageWorkletSelectionOption'][aria-label=" + dollars[0] + "]")},
'1883045032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + "):not(li:contains(Type)) [data-automation-id='responsiveMonikerInput']")},
'1885013757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "]:contains(" + dollars[1] + ") button")},
'1886036438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-button-type='PRIMARY']:visible")},
'1887606548': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").find("a").filter(":containsTextNode("+fixed.labelText+")").filter(":mt_visible");},
'1888043616': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN.gwt-InlineLabel").filter(":contains(" + dollars[0] + ")")},
'1894105623': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-metadata-id="+fixed._popupId+"]").closest(".wd-popup-content");},
'1899463744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.checkboxLabel+")").closest("li").find("[data-automation-id='checkboxPanel']").eq(4);},
'1899674473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const mainTabNav = wmjQuery("[data-automation-id='tabBar']").find("[data-automation-id='tabLabel']").filter(":containsTextNode("+fixed.elemText+")").parent();
const dropDownTab= wmjQuery("[data-automation-id='menuList']").find("[data-automation-id='popupOption']").filter(":containsTextNode("+fixed.elemText+")");
const ifDropDownOpen = wmjQuery("[data-automation-activepopup='true']");
const allPrevTabs = mainTabNav.closest("li").prevAll();
let elemsWith3ClassesArray = [];
for (i=0 ; i<allPrevTabs.length ; i++) {
  if (allPrevTabs[i].classList.length===3) {
    elemsWith3ClassesArray[elemsWith3ClassesArray.length] = allPrevTabs[i];
  }
}
if (elemsWith3ClassesArray.length > 1 && !ifDropDownOpen.length) {
	return "WD_Profile_more";
  } 
  else if (mainTabNav.length && !ifDropDownOpen.length) return mainTabNav;
  else if (ifDropDownOpen.length && dropDownTab.length) return dropDownTab;
return wmjQuery();},
'1901038102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='responsiveMonikerInput']").parent("div");},
'1902687810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("return wmjQuery(\"[data-metadata-id=" + dollars[0] + "] li:contains(\" + fixed.label + \") [data-automation-id=" + dollars[1] + "]:eq(" + dollars[2] + ")\")")},
'1905298631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='dropDownCommandButton']").find("button").filter("[title="+fixed.elemtitle+"]").filter(":first")},
'1907735299': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.labeltxt+")").closest("[data-automation-id='promptLeafNode']").find("input");},
'1907781436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find(".edit-link").filter(":containsTextNode("+fixed.lmText+")");},
'1909121869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='globalSearchInput']")},
'1913140261': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='Label']").filter(":containsTextNode("+fixed.parentText+")").closest(":header").next("ul").find("button");},
'1915375315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='globalNavAppItemLabel']").filter(":containsTextNode("+fixed.elemText+")").find("span[data-automation-id='truncatedText']").filter(":last");},
'1915614493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmLabel+")").closest("div");},
'1916890069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmTitleAttr+")");},
'1920917038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=\"tabpanel\"][aria-label=" + fixed.tab + "] label[data-automation-id=" + dollars[0] + "]")},
'1921160525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN[data-automation-id=" + dollars[0] + "]")},
'1931301096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]").filter(":visible")},
'1935286948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='monikerSearchBox']")},
'1939047843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][id*='56$309493']")},
'1942862881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("li[data-automation-id=menuItem]");},
'1944541150': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h4").filter(":contains(" + dollars[0] + ")")},
'1960723764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='Title']").filter("[data-automation-id="+fixed._txtattr+"]").closest("[class*='Container']").next("ul[class*='ListPanelContainer']");},
'1964846692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":contains(" + dollars[0] + "):visible")},
'1971146507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:eq(0)")},
'1975503740': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='label']").filter(":contains("+fixed.labelText+")").closest("[data-automation-id='dropDownCommandButton']").find("[data-automation-id='dropdownArrow']");},
'1976375468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='activeList']:eq(" + dollars[0] + ") div[data-automation-id*=" + dollars[1] + "]")},
'1978244956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridTitleLabel']").filter(":containsTextNode("+fixed.headerTxt+")").closest(".wd-SuperGrid").find("[data-automation-id='VisibleGrid']").parent();},
'1980524803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#bpSlimConclusionHeaderText").filter(":containsTextNode("+fixed.headerText+")").closest(".wd-popup");},
'1981157002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.wd-popup").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+ fixed.btnText +")").closest(".wd-popup-content")},
'1982674072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.columnHeaderLabel+")").closest("[data-uxi-widget-type='columnHeader']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1984563323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuItem']").find(".gwt-Label").filter(":containsTextNode("+fixed.lmText+")"); },
'1985126271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='AppointmentWidgetRoot'][data-automation-id=calendarevent]").find("[data-automation-id=icon]").filter("[data-automation-icontype='"+fixed._dataIconType+"']").parent();},
'1986762403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").find("button").filter(":contains("+fixed.lmtxt+")");},
'1987390697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li[role='presentation']").find("[class*='SearchBarContainer']");},
'1991038591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmRText+")").closest("div");},
'1993331734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabe']").filter(":containsTextNode("+fixed.formlabeltxt+")").closest("li").find("[data-automation-id='textView']");},
'1997501873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=viewStackHeaderTitle]").find("[data-automation-id=promptOption]");},
'2003315351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='pageHeaderTitleText']").closest(":header").filter("[id*='heading']");},
'2005969485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("[id*='wd-SectionView']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2014770125': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id=formLabelRequired]").filter(":containsTextNode("+fixed.labelTxt+")").find(".gwt-Label");},
'2016164805': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[data-automation-id="+fixed._dialogAttr+"]").find(":header").filter("[data-automation-id="+fixed._lmAttr+"]");},
'2027605052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("LABEL:contains(" + dollars[0] + "):eq(0)")},
'2028705615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptTitle'], [data-automation-id=promptOption]").filter(":containsTextNode("+fixed.lmText+")").closest("[data-automation-id='multiSelectHeader'], [data-automation-id=promptLeafNode]");},
'2032743707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='Current_User']")},
'2038831926': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[data-walkthru-id=" + dollars[0] + "]")},
'2040450818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='toolbarButtonContainer'] [data-automation-id='dropDownCommandButton']:visible:last")},
'2040986119': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=" + dollars[0] + "]").filter(":visible")},
'2041946372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(Optum Bank Silver) + td .gwt-RadioButton-disabled:contains(" + dollars[0] + ")")},
'2043841968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'2044378351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=navigationPanel]").find("button").filter(":containsTextNode("+fixed.buttonText+")");},
'2045989156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + "):eq(0)")},
'2055359180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("[data-automation-id=workerProfileMenuItemLabel]").filter(":containsTextNode("+fixed.elmTxt+")").closest("[data-automation-id='workerProfileMenuItemWrapper']").filter(":mt_visible");
if (oldlM.length){

 return oldlM;
} 
if (!oldlM.length){

 return "WD_Side_Panel_More";
} 
return  wmjQuery();
},
'2059274719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:visible:eq(1)")},
'2059470001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid="+fixed._lmTestId+"]");},
'2061033128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='panel']").filter(fixed._buttonAttr).find("button[data-automation-id='label']").filter("[title="+fixed.titleText+"]");},
'2062753752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendHeading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='fieldSetBody']").find("button[data-automation-id='addRow']");},
'2069974184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']:contains(Create Position)")},
'2071403808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("label").filter(":containsTextNode("+fixed.lblText+")").next("div").children("[data-automation-id='multiSelectContainer']").find("[class*=SearchBarContainer]");},
'2071791203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + "):visible")},
'2074769340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2[id*='heading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-metadata-id='wd-SectionGroupView']").find("[data-uxi-task-orch-section-group-task-id='2998$13382']");},
'2075525810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-context=startCourse]").parent().parent();},
'2076312535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div label[data-automation-id='formLabel']:contains(" + dollars[0] + ")")},
'2081396585': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workdayApplicationFrame").find("[data-automation-id='viewStackHeaderTitle']").find("span[data-automation-id="+fixed._dataAutomationAttr+"]");},
'2085942310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role='button']").filter("[data-uxi-element-id="+fixed._elemAttr+"]").find("svg");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2092673554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*=" + dollars[0] + "] div[style*=" + dollars[1] + "]").filter(":visible")},
'2097490228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id=tabBar]").find(".gwt-Label").filter(":containsTextNode("+fixed.labelText+")").closest("li");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2101518326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("[data-automation-id='textInputBox'],[data-metadata-id='NO_METADATA_ID']");},
'2114549441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains(" + fixed.selectedTab + ")li[data-automation-id='selectedTab']").parents("div[data-automation-id='subTabPanel']").find(":contains(" + fixed.targetText + ")[data-automation-id='fieldSetLegendHeading']")},
'2124105858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel'").filter(":containsTextNode("+fixed.labelText+")").closest("li[data-automation-id='formLabelRequired']").find("[data-automation-id='selectSelectedOption']").parent();},
'2124373291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=facetSidePanel]").find("[data-automation-id*=expandCollapseIcon]").filter("[title="+fixed.iconTitle+"]").closest("div");},
'2125157886': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']")},
'2131266023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] button")},
'2133217338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("[role='tabpanel']").find("[data-automation-id='globalNavAppItemLink']").filter(":containsTextNode("+ fixed.btnText +")")
if (elem.length)
 {return elem} 
return wmjQuery("[role='list']").find("[data-automation-id='globalNavEditableAppItem']").filter(":containsTextNode("+ fixed.btnText +")")},
'2133517178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3:contains(Salary)")},
'2134542269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id$=" + dollars[0] + "]").filter(":visible")},
'2135136240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='promptOption']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").parent();},
'2135165179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderDecoration']").find("button").filter("[data-automation-id='"+fixed._lmdata+"']");},
'2136082314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.elemText+")").closest("ul").find("[data-automation-id="+fixed._dataAutomationIdValue+"]");},
'2141450145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks'], div[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");

const oldLM =   wmjQuery("#wd-home-applets").find("li").find("div").filter(":containsTextNode("+ fixed.btnText +")");
const middleTgtLM =  wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed.btnText+"").closest("button").find("[class*='label']");
const newLM = wmjQuery("[data-automation-id='subMenuItem']").filter(":containsTextNode("+ fixed.btnText +")").find("span");
let newLMparent = newLM.closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem'][aria-expanded='false']");

debugger
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
  return "Apps_Menu_More";
} 
if (newLMparent.length){
	wmjQuery(newLM).closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem']").click();
	return newLM;
}  if (oldLM.length > 0){
  return oldLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newLM.length > 0){
	return newLM;
} return wmjQuery()},
'-894268591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtLM = wmjQuery("div.workdayHome-ae,button[data-automation-id='pex-app-tiles-tile']").filter(":contains("+fixed.lmText+")");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const newWrokletLM = wmjQuery("[data-automation-id='globalNavAppItemLabel']").filter(":contains("+fixed.lmText+")").closest("li").find("a[data-automation-id='globalNavAppItemLink']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (tgtLM.length > 0){
	return tgtLM;
} if (newWrokletLM.length > 0){
  return newWrokletLM;
}
return wmjQuery();

},
'-56335072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtSvg = wmjQuery("div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]");
let middleTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter("[aria-label="+fixed.lmAriaLabel+"]")
const newTgtLm = wmjQuery("[data-automation-id='globalNavAppItemLink']").filter("[aria-label="+fixed.lmAriaLabel+"]")
let newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']")
const isModal = wmjQuery("div[data-automation-id='pex-modal']")
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtSvg.length > 0){
  return oldTgtSvg;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLm.length > 0){
  return newTgtLm;
}
return wmjQuery();
},
'-1583912622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldTgtLM = wmjQuery("#wd-home-applets").find("svg."+fixed._lmSvg+"");
const middleTgtLM = wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed._lmSvg+"");
const newTgtLM = wmjQuery("svg."+fixed._lmSvg+"");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtLM.length > 0){
  return oldTgtLM
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLM.length > 0){
  return newTgtLM;
}
return wmjQuery();
},
'-1469770950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldTgtLM = wmjQuery("#wd-home-applets").find("div.workdayHome-ae").filter(":contains("+fixed.lmText+")").find("svg");
const middleTgtLM = wmjQuery("[data-uxi-element-id='pex-modal']").find("button[data-automation-id='pex-app-tiles-tile']").filter(":contains("+fixed.lmText+")").find("svg");
const newTgtLM = wmjQuery("[data-automation-id='globalNavAppItemLink']").filter(":contains("+fixed.lmText+")").find("svg");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtLM.length > 0){
  return oldTgtLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLM.length > 0){
  return newTgtLM;
}
return wmjQuery();

},
'-804597751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldTgtLM = wmjQuery("#wd-home-applets").find("svg."+fixed._lmSvg+"").closest("li").find("[data-automation-id='workletLabel']");
const middleTgtLM = wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed._lmSvg+"").closest("button").find("[class*='label']");
const newTgtLM = wmjQuery("[data-automation-id='globalNavContainer']").find("svg."+fixed._lmSvg+"").closest("li").find("[data-automation-id='globalNavAppItemLabel']");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtLM.length > 0){
  return oldTgtLM
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLM.length > 0){
  return newTgtLM;
}
return wmjQuery();

},
'-875827954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldTgtLM = wmjQuery("#wd-home-applets").find("div.workdayHome-ae").filter(":contains("+fixed.lmText+")").find("[data-automation-id='workletLabel']");
const middleTgtLM = wmjQuery("[data-uxi-element-id='pex-modal']").find("button[data-automation-id='pex-app-tiles-tile']").filter(":contains("+fixed.lmText+")").find("[class*='label']");
const newTgtLM = wmjQuery("[data-automation-id='globalNavAppItemLink']").filter(":contains("+fixed.lmText+")").find("[data-automation-id='globalNavAppItemLabel']");
const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtLM.length > 0){
  return oldTgtLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLM.length > 0){
  return newTgtLM;
}
return wmjQuery();

},
'-1880054430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtSvg = wmjQuery("div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]").find("[data-automation-id='workletLabel']");
let middleTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter("[aria-label="+fixed.lmAriaLabel+"]")
const newTgtLm = wmjQuery("[data-automation-id='globalNavAppItemLink']").filter("[aria-label="+fixed.lmAriaLabel+"]").find("[data-automation-id='globalNavAppItemLabel']");
let newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']")
const isModal = wmjQuery("div[data-automation-id='pex-modal']")
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");
if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
	return "Home-viewAll";
} if (oldTgtSvg.length > 0){
  return oldTgtSvg;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newTgtLm.length > 0){
  return newTgtLm;
}
return wmjQuery();
},
'-808429220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='promptOption']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1623899620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtSvg = wmjQuery("svg."+fixed._lmSvg+"").closest("li").find("svg");
let newTgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("button");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
     return "Home-viewAll"
} else if(newTgtLM.length > 0)  {
	return newTgtLM
} else if (oldTgtSvg.length > 0){
  return oldTgtSvg
}
return wmjQuery();

},
'-998378105': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("div.workdayHome-ae,button[data-automation-id='pex-app-tiles-tile']").filter(":containsTextNode("+fixed.lmText+")").find("svg");
let newTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter(":containsTextNode("+fixed.lmText+")");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
 return "Home-viewAll"
}  else if(newTgtLM.length > 0) {
	return newTgtLM
} else if (tgtLM.length > 0){
 return tgtLM
} 
return wmjQuery();

},
'-1699277616': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("li").find("span").filter(":directContains(" + dollars[0] + ")");
let newTgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("button");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
}  else if(newTgtLM.length > 0)  {
	return newTgtLM
} else if (oldTgtLM.length > 0){
  return oldTgtLM
}
return wmjQuery();

},
'-1866345166': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtSvg = wmjQuery("svg."+fixed._lmSvg+"").closest("li").find("[data-automation-id='workletLabel']");
let newTgtLM = wmjQuery("svg."+fixed._lmSvg+"").closest("button");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
     return "Home-viewAll"
} else if(newTgtLM.length > 0)  {
	return newTgtLM
} else if (oldTgtSvg.length > 0){
  return oldTgtSvg
}
return wmjQuery();

},
'-1906063250': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("div[data-automation-id='workletLabel']").filter(":contains("+fixed.lmText+")");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
}else if (tgtLM.length > 0){
	return tgtLM
}
return wmjQuery();

},
'-2079316211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile'],div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll";
}else if (tgtLM.length > 0){
	return tgtLM;
}
return wmjQuery();

},
'-1241983971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtLM = wmjQuery("div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]").find("span").filter(":directContains(" + dollars[0] + ")");
let newTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter("[aria-label="+fixed.lmAriaLabel+"]");
let newAllApps = wmjQuery("[data-automation-id='pex-quick-tasks'],[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
let isModal = wmjQuery("div[data-automation-id='pex-modal']");
if (newAllApps.length > 0 && isModal.length === 0) {
	return "Home-viewAll"
} else if (oldTgtLM.length > 0){
  return oldTgtLM
} else if(newTgtLM.length > 0)  {
	return newTgtLM
} 
return wmjQuery()

},
'-454584304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let oldTgtSvg = wmjQuery("div.workdayHome-ae").filter("[aria-label="+fixed.lmAriaLabel+"]").find("svg")
let newTgtLM = wmjQuery("button[data-automation-id='pex-app-tiles-tile']").filter("[aria-label="+fixed.lmAriaLabel+"]")
let newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks']").find("button[data-automation-id='pex-view-all-apps']")
let isModal = wmjQuery("div[data-automation-id='pex-modal']")
if (newAllApps.length > 0 && isModal.length === 0) {
     return "Home-viewAll"
} else if (oldTgtSvg.length > 0){
  return oldTgtSvg
} else if(newTgtLM.length > 0)  {
	return newTgtLM
} 
return wmjQuery()

},
'-1047083410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("button[data-automation-id='pex-announcements-view-button']").find("span.wdc-text-button-label")
if (newElem.length > 0){
  return newElem
} return wmjQuery(".workdayHome-aw")
},
'-1166033959': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":directContains("+fixed.lmHeader+")").closest("div[data-automation-id='workerProfileSummaryTaskCardContent']").find("span[title="+fixed.lmTitle+"]")},
'-589475332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("[data-automation-id='pex-announcements'] li:eq("+fixed._lmIndex+")").find("button[data-uxi-element-id='pex-announcement-card']");
if (newElem.length > 0){
 return newElem
} return wmjQuery("li[data-automation-id='announcementExpandedItem']").filter(":eq("+fixed._lmIndex+")").find("div.workdayHome-aac");
},
'-2010632637': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newButton = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']").find("[data-uxi-element-id='global-nav-apps-list-toggle'] svg")
if (newButton.length > 0){
	return newButton
}  return wmjQuery("[data-uxi-button-type='view-all']")},
'-1260409733': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newEditBtn = wmjQuery("button[data-automation-id='globalNavEditShortcuts']").find(".wdc-text-button-label");
if (newEditBtn.length > 0) {
 return newEditBtn
} return wmjQuery("button[data-automation-id='quickAccessPopupHeaderTextButton'][data-uxi-button-type='edit']")},
'-1763926644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newButton = wmjQuery("button[data-automation-id='globalNavButton']");
if (newButton.length > 0){
	return newButton 
} return wmjQuery("button[data-automation-id='quickAccessButton']");},
'-222385595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='dateInputWrapper'][role='group']");
if (newElem.length > 0){
  return newElem;
} return wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='dateWidgetContainer']");

},
'-1322124149': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newElem = wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='dateInputWrapper']")
if (newElem.length > 0){
  return newElem;
}  return wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.inputLabel+")").closest("li").find("div[data-automation-id='selectWidget']");
 
},
'-731059624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const isNewTableView = wmjQuery("input[role='switch']").closest("[role='region']").attr("data-uxi-togglebutton-state");
if (isNewTableView === "true") {
 return wmjQuery("[data-automation-id='tableWrapper']");	
} else if(isNewTableView === "false"){
 return wmjQuery("[data-automation-id='MainContainer']");
}
return wmjQuery();},
'-2020787775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("li[data-automation-id^=inbox_tab]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("button[data-automation-id=menuItem]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'-1226784792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='menuItem'],li[data-automation-id='gearMenuItem']").filter(":contains("+fixed.lmTetx+")");},
'-1331796657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=inbox_item_list]").find("img[data-automation-id='inbox-star-icon']").filter(":first");
const newElem = wmjQuery("[data-automation-id='inboxItemList']").find("button[data-automation-id='favoriteIcon']").filter(":first");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'6306385832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg.wd-applet-time-off,svg.wd-applet-employee-on-leave").closest("a")},
'-451964513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (oldElm.length){
 return oldElm;
} 
if(ftHelper.unQuote(fixed.lmText) === "My Absence") {
 const newElm = wmjQuery("a[data-automation-id='groupedListItem'], [data-automation-id='dropDownCommandButton']").filter(":containsTextNodeIgnore('My Time Off')");
 if(newElm.length){
  return newElm;
 }
	return wmjQuery();
}
return wmjQuery();
},
'-52039086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.titleText+")").closest("[data-automation-id='panel']").find("label").filter(":directContains("+fixed.lmLabel+")").closest("li").find("[data-automation-id='"+fixed._lmAttr+"']"); },
'-1305252631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskWizardListPane]").find("[data-automation-id=taskWizardMainHeaderTitle]").find("span[data-automation-id=truncatedText]").children("span").children("span");},
'-1198940469': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
const originalElem = wmjQuery(".gwt-Label").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("li[role='listitem']").find(".gwt-Label").parent();

if (originalElem.length)  return originalElem 
if (oldElm.length)   return oldElm;

if(ftHelper.unQuote(fixed.lmText)  === "My Individual Goals") {
  const newElm =  wmjQuery(".gwt-Label").filter(":containsTextNodeIgnore('My Goals')").closest("[data-automation-id='menuItem'], [data-automation-id='dropDownCommandButton']")
  if(newElm.length){
    return newElm;
  }
	return  wmjQuery();
}
return wmjQuery();},
'-471547071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
const originalElem = wmjQuery(".gwt-Label").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("li[role='listitem']").find(".gwt-Label")

if (originalElem.length)  return originalElem 
if (oldElm.length)   return oldElm;

if(ftHelper.unQuote(fixed.lmText)  === "My Individual Goals") {
  const newElm =  wmjQuery(".gwt-Label").filter(":containsTextNodeIgnore('My Goals')").closest("[data-automation-id='menuItem'], [data-automation-id='dropDownCommandButton']")
  if(newElm.length){
    return newElm;
  }
	return  wmjQuery();
}
return wmjQuery();},
'-1179504207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role*='menuitem']").find("span").filter(":containsTextNode("+fixed.lmtext+")");},
'-1874016971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-1427793533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:visible:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-1130861335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-39013866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("LABEL:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-2009681929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("return wmjQuery(\"label:contains(" + dollars[0] + "):eq(" + dollars[1] + ")\")")},
'-438327461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("return wmjQuery(\"[data-metadata-id=" + dollars[0] + "][data-automation-id=" + dollars[1] + "]:eq(" + dollars[2] + ") label:contains(" + dollars[3] + ")\")")},
'-670574217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*=" + dollars[0] + "]").filter(":visible")},
'-835010135': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:has(label:contains(" + dollars[0] + ")) [data-automation-id=" + dollars[1] + "]")},
'-358055925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]").filter(":visible")},
'-1078394764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"columnLabel-0\"]:contains(" + dollars[0] + ")")},
'-780447131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='columnLabel-0']:contains(" + dollars[0] + ")")},
'-85222487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='columnLabel']:contains(" + dollars[0] + "):not(:contains(Proposed))")},
'-1821433981': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='columnLabel']:contains(" + dollars[0] + ")")},
'-106015428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id*=\"columnLabel\"]").filter(":contains(" + dollars[0] + ")")},
'-2109995920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(label[data-automation-id='formLabel']:contains(" + dollars[0] + "))+div div[data-automation-id=" + dollars[1] + "]")},
'-1952053656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + ")")},
'-472333315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):visible")},
'-1605760315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + "):not(:contains(Insider))")},
'-329490457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + ")")},
'-1216018774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + ")")},
'-1945900906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):mt_visible")},
'-1376088910': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):visible")},
'-1989297432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:not(:contains('Job Description Summary')):contains(" + dollars[0] + ")")},
'-1309970538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":contains(" + dollars[0] + ")")},
'-103364025': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']:has(label:contains(" + dollars[0] + ")) div[data-automation-id=" + dollars[1] + "]")},
'-1378814326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-1364983304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "]:has(label:contains(" + dollars[1] + ")) div[data-automation-id='responsiveMonikerInput']")},
'-708211702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']:has(label:contains(" + dollars[0] + ")) div[data-automation-id='responsiveMonikerInput']")},
'-958166038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=\"presentation\"]:contains(" + dollars[0] + ") div[data-automation-id=\"responsiveMonikerInput\"]")},
'-1022219079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='formLabel']:contains(" + dollars[0] + ")")},
'-341243463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "]:contains(" + dollars[1] + ") div[data-automation-id=\"responsiveMonikerInput\"]")},
'-1588271865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "]:has(label:contains(" + dollars[1] + ")) [data-automation-id='responsiveMonikerInput']:visible")},
'-1191974899': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(label[data-automation-id='formLabel']:contains(" + dollars[0] + "))+div div[data-automation-id='responsiveMonikerInput']")},
'-1452824450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:has(label:contains(" + dollars[0] + ")) [data-automation-id='responsiveMonikerInput']:visible")},
'-1146269887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + ") div[data-automation-id='responsiveMonikerInput']")},
'-814846750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "][title*=" + dollars[1] + "]")},
'-852294506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='responsiveMonikerInput']:first")},
'-1234961579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabelRequired'] [data-automation-id=" + dollars[0] + "]")},
'-128694046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*=" + dollars[0] + "]").filter(":visible")},
'-1733160079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='pageHeaderTitleText']")},
'-1548074216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[data-automation-id=" + dollars[0] + "]")},
'-133630636': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:eq(6)")},
'-1104808072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN[data-automation-id=\"pageHeaderTitleText\"]")},
'-834626430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "]:visible")},
'-211800393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "][aria-label*=" + dollars[1] + "]")},
'-1422474777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[aria-label=" + dollars[0] + "]")},
'-21180449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul [aria-label^=" + dollars[0] + "]")},
'-201421276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*=" + dollars[0] + "]").filter(":mt_visible")},
'-1325213936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:visible:first label:visible:eq(" + dollars[0] + ")")},
'-1582250236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1751903836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"textView\"]")},
'-1114720423': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][aria-label=" + dollars[1] + "]")},
'-1191113875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*=" + dollars[0] + "]:visible:eq(" + dollars[1] + ") [data-automation-id='textView']:first")},
'-1558680373': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [aria-label=" + dollars[1] + "]")},
'-1344320369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"workdayApplicationFrame\"] SECTION DIV[data-automation-id=" + dollars[0] + "]:eq(0)")},
'-1861091408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[aria-label=" + dollars[0] + "]")},
'-752124117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"responsiveMonikerInput\"][title*=" + dollars[0] + "]")},
'-222032305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][tabindex=\"0\"]").filter(":mt_visible")},
'-273371143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:last")},
'-1170875827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:last")},
'-297800127': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*='wd-ActiveListRow']:visible:last [data-automation-id=" + dollars[0] + "]:first")},
'-745435897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='wd-ActiveListRow']:last [data-automation-id='formLabel']")},
'-2031349219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='responsiveMonikerInput']:eq(2)")},
'-291405774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.workdayHome-ae[aria-label=" + dollars[0] + "]")},
'-1321936291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='responsiveMonikerInput']:eq(2)")},
'-1058815091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id*=" + dollars[0] + "]:contains(9)")},
'-1803485737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='responsiveMonikerInput']:visible:eq(2)")},
'-25288990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id=" + dollars[0] + "]:mt_visible")},
'-23289912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='link']:contains(" + dollars[0] + ")")},
'-2138712101': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=\"wd-icon-edit wd-icon\"]:eq(1)")},
'-1951562272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):eq(0)")},
'-1054990392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=" + dollars[0] + "][aria-label=" + dollars[1] + "]:visible")},
'-1799751550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title|=" + dollars[0] + "]")},
'-575886521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title^=" + dollars[0] + "]")},
'-2108786874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title=" + dollars[0] + "]").filter(":visible")},
'-2141683247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=" + dollars[0] + "]:contains(" + dollars[1] + "):visible")},
'-1199470350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:eq(0)")},
'-668786831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"workdayApplicationFrame\"] SECTION DIV[tabindex]:eq(" + dollars[0] + ")")},
'-877361091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] div[title=" + dollars[1] + "]")},
'-2073939120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:visible:contains(" + dollars[0] + "):eq(0)")},
'-131788010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):eq(0)")},
'-189265608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label^=" + dollars[0] + "][role=" + dollars[1] + "]")},
'-789601758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):first:visible")},
'-27260203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(label:contains(" + dollars[0] + ")):last")},
'-585875534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):eq(0)")},
'-921921051': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label*='1'][data-automation-id=" + dollars[0] + "]")},
'-68757759': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:contains(" + dollars[0] + "):first")},
'-278363393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-SummaryPage div[role=" + dollars[0] + "]:visible:first label[data-automation-id=formLabel]:eq(" + dollars[1] + ")")},
'-1228114827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(0)")},
'-1112181421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='landingPageWorkletSelectionOption']:contains(" + dollars[0] + ")")},
'-2008481162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:eq(4)")},
'-1863792971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):first")},
'-1757639130': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:first")},
'-2045129602': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*=" + dollars[0] + "][data-automation-id=\"formLabel\"]:contains(" + dollars[1] + "):eq(0)")},
'-1188586205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*=" + dollars[0] + "][data-automation-id=\"formLabel\"]:eq(0)")},
'-479725107': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + ") div[aria-label=" + dollars[1] + "]")},
'-1728267367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + ") [data-automation-id='dateWidgetContainer']")},
'-1700424952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"fieldSetBody\"] label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-352695509': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"dateWidgetContainer\"]:eq(0)")},
'-1044742996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='fieldSetBody']:has(span[title=" + dollars[0] + "]) label[data-automation-id='formLabel']:contains(" + dollars[1] + ")")},
'-1595669211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*=" + dollars[0] + "]:eq(4)")},
'-1652919040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".WJMK.WHMK:contains(" + dollars[0] + ")")},
'-1702453808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:eq(8)")},
'-774871938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV.workdayHome-ae[title=" + dollars[0] + "]")},
'-1410588822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[for*='richTextEditor-uid']:contains(" + dollars[0] + ")")},
'-1361359420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=\"button\"][title=" + dollars[0] + "]").filter(":visible")},
'-883626594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateWidgetContainer']:eq(" + dollars[0] + ")")},
'-1391521712': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=\"heading\"]").filter(":contains(" + dollars[0] + ")")},
'-389975323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3[id*=\"heading\"]").filter(":contains(" + dollars[0] + ")")},
'-2079451995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains(" + dollars[0] + "):visible")},
'-334769515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateWidgetContainer']:eq(0)")},
'-353570355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"dateWidgetContainer\"]:eq(" + dollars[0] + ")")},
'-2137915647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=\"wd-SectionView\"]:eq(" + dollars[0] + "):mt_visible h3")},
'-763850328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3:contains(" + dollars[0] + "):not(:contains(Start)):not(:contains(Location))")},
'-774643411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=\"SectionView\"]:contains(" + dollars[0] + ") button").filter(":visible")},
'-1448349101': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] button[type=\"button\"][title]").filter(":mt_visible")},
'-127208779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] button[type=" + dollars[1] + "][title]:mt_visible")},
'-347430023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"pdfIconButton\"]")},
'-1002641640': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3.WJMK.WHMK:contains(" + dollars[0] + ")")},
'-1649547058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] button:visible:eq(" + dollars[1] + ")")},
'-50279783': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title*=" + dollars[0] + "]").filter(":visible")},
'-276526394': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pdfIconButton']")},
'-1350280304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li > div:has(label[data-automation-id=\"formLabel\"])").filter(":contains(" + dollars[0] + ")")},
'-26398307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains(" + dollars[0] + ")")},
'-1477399723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV.workdayHome-ae:contains(" + dollars[0] + ")")},
'-2113720196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderDecoration'] [data-automation-id=" + dollars[0] + "]")},
'-2000325044': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id=" + dollars[0] + "]:visible")},
'-1141392321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-button-type=" + dollars[0] + "]").filter(":visible")},
'-1329387601': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-button-type=" + dollars[0] + "]:contains(" + dollars[1] + "):visible")},
'-271952645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".workdayHome-ae:contains(" + dollars[0] + ")")},
'-1001557215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li > div:has(label[data-automation-id=" + dollars[0] + "])").filter(":contains(" + dollars[1] + ")")},
'-1314085684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":contains(" + dollars[0] + "):visible")},
'-1392467676': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=" + dollars[0] + "]:not([id=wd-icon-gear])")},
'-1522139861': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=" + dollars[0] + "]")},
'-1319577916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + dollars[0] + ") + div div[data-automation-id=" + dollars[1] + "]")},
'-1746741060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]").filter(":visible")},
'-742914697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] div[class~=" + dollars[1] + "]")},
'-1598165702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "]:eq(4) [data-automation-id=" + dollars[1] + "]")},
'-671042609': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='textView']:eq(" + dollars[0] + ")")},
'-1853817224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id='textView']:eq(" + dollars[1] + ")")},
'-951966690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:eq(" + dollars[0] + ")")},
'-128095737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=formLabel]:eq(" + dollars[0] + ")")},
'-524055953': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-751375471': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] [data-automation-id=" + dollars[1] + "]")},
'-2058956681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] div[data-automation-id=" + dollars[1] + "]")},
'-1599063681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] div[data-automation-id=" + dollars[1] + "]").filter(":visible")},
'-419413838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div [data-automation-id=" + dollars[0] + "]")},
'-1238722305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=" + dollars[0] + "]")},
'-1218844561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*=" + dollars[0] + "]")},
'-7290746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] span[data-automation-id='pageHeaderTitleText']")},
'-1979781744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] [data-automation-id='pageHeaderTitleText']")},
'-1549958730': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id*='pageHeaderTitleText']:last")},
'-1917238385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title*='5']")},
'-527161187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [title]").filter(":mt_visible")},
'-1659955737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] [data-automation-id='pageHeaderTitleText']")},
'-1234336540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN[data-automation-id=\"columnLabel-0\"]:eq(0)")},
'-1771770842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("return wmjQuery(\"li:contains(\" + fixed.label + \") [data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")\")")},
'-1298837824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:eq(" + dollars[0] + ") [data-automation-id='formLabel']:eq(" + dollars[1] + ")")},
'-848837489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:visible:eq(" + dollars[0] + ") [data-automation-id='formLabel']:eq(" + dollars[1] + ")")},
'-1421283802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:eq(" + dollars[0] + ") [data-automation-id='formLabel']:eq(" + dollars[1] + ")")},
'-1251390744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=" + dollars[0] + "]").filter(":contains(" + dollars[1] + "):visible")},
'-1079147744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SPAN:not([scope])").filter(":contains(" + dollars[0] + ")")},
'-248212481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title*=" + dollars[1] + "]").filter(":visible")},
'-474243283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1653475352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']:visible:eq(" + dollars[0] + ")")},
'-1993780890': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]~div [data-automation-id=" + dollars[1] + "]")},
'-1827820809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title*=" + dollars[1] + "]")},
'-1098267353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='wd-SectionView']:eq(" + dollars[0] + ") [data-automation-id=" + dollars[1] + "]")},
'-712791243': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=" + dollars[0] + "] [data-automation-id=" + dollars[1] + "]:mt_visible")},
'-752786517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id='textInput']:eq(" + dollars[1] + ") [dir='ltr']")},
'-1811421954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"workdayApplicationFrame\"] SECTION DIV[role=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-360286493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-SummaryPage div[role=region]:visible:first label[data-automation-id=formLabel]:eq(" + dollars[0] + ")")},
'-583908427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "][title=" + dollars[1] + "]").filter(":visible")},
'-1009633383': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title=" + dollars[1] + "]")},
'-1739643932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*=" + dollars[0] + "][title=" + dollars[1] + "]")},
'-170086638': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='notification_preview']")},
'-1249360114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-message.walkme-no-results")},
'-1148114756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='inbox_preview']")},
'-725159951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='hammy_current_user_item']")},
'-65005814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-label=" + dollars[0] + "]")},
'-696969806': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='toolbarButtonContainer']")},
'-199499095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=" + dollars[0] + "]:visible")},
'-1997337764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(":contains(" + dollars[0] + ")")},
'-1573406508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='Current_User']")},
'-1386493233': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter(":contains(" + dollars[0] + ")")},
'-599325154': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=\"wd-SectionView-NO_METADATA_ID\"]").filter(":contains(" + dollars[0] + ")")},
'-1513352335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#walkme-player")},
'-1993912938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dropDownCommandButton']:contains(" + dollars[0] + ")")},
'-460235793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title='Submit']")},
'-1629765524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:contains(Opening)")},
'-1015863512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:eq(1)")},
'-1696138193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label").filter(":contains(" + dollars[0] + ")")},
'-907542640': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']")},
'-118244319': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:last")},
'-732825890': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsContainer']")},
'-124025938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsButton']")},
'-2008643522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + ") + td .gwt-RadioButton-disabled:contains(Waive)")},
'-1722904967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(" + dollars[0] + ") + td .gwt-RadioButton-disabled:contains(" + dollars[1] + ")")},
'-300511516': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateTimeWidget']")},
'-1662267955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"inbox_preview\"]")},
'-1991245586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(Optum Bank Silver) + td .gwt-RadioButton-disabled:contains(Waive)")},
'-958043357': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=\"gridCell\"]:contains(Optum Bank Gold) + td .gwt-RadioButton-disabled:contains(Waive)")},
'-892282511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]:contains(Optum Bank Silver) + td .gwt-RadioButton-disabled:contains(Waive)")},
'-2034317114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]:contains(Optum Bank Gold) + td .gwt-RadioButton-disabled:contains(Waive)")},
'-1923612992': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=\"menuitem\"][aria-label=" + dollars[0] + "]:visible")},
'-1886985552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[title=\"Add Beneficiary\"]:visible")},
'-1554546995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:first")},
'-1020042872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dropDownCommandButton']:contains(Submit)")},
'-2010355303': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[title=\"Beneficiary Designations\"]")},
'-323984484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=" + dollars[0] + "][aria-label=\"Link Add My Dependent From Enrollment\"]:visible")},
'-182524611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[title=" + dollars[0] + "]")},
'-565654684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workerProfileDetailsPanel']")},
'-251949982': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=\"wd-ConfirmPage-1$427\"]").filter(":visible")},
'-1758036878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']:contains(Change Benefits for Open Enrollment)")},
'-2130274440': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Change Benefits for Open Enrollment)")},
'-357766248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='menuItem']:contains(" + dollars[0] + ")")},
'-2053270894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table:has([data-automation-id=" + dollars[0] + "][aria-label='Critical'])")},
'-1457798518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table:has([data-automation-id='menuItem'][aria-label=" + dollars[0] + "])")},
'-943602762': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table:has([data-automation-id='menuItem'][aria-label='Critical'])")},
'-274690047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table:has([data-automation-id=" + dollars[0] + "][aria-label=" + dollars[1] + "])")},
'-260943944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='inbox_preview']")},
'-2093474627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel:contains('Health Savings Election')")},
'-1345750392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='VisibleGrid']")},
'-1268286318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-search-box")},
'-2039865695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel[title=\"Additional Benefits Elections\"]")},
'-130996854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li div[role=" + dollars[0] + "][aria-label=\"Submenu Beneficiary Persons\"]:visible")},
'-283488114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-progress-bar")},
'-964216708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='checkboxPanel']")},
'-1091516908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-menu")},
'-1253996840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains('Allow Duplicate Name') + div div[data-automation-id='checkbox']")},
'-1576857719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-PageHeader']")},
'-1431707981': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title='Request Time Off']")},
'-1483939583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-automation-id=" + dollars[0] + "]")},
'-1001783037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:eq(" + dollars[0] + ")")},
'-1156771049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(Add)")},
'-1259152553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id=" + dollars[1] + "]:last")},
'-1098968766': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Job Profile)")},
'-1278271430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-cal-MonthView")},
'-941967352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=\"No matches found\"]")},
'-114093591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='navigationBarExpandCollapseButton']")},
'-1054131921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='hammy_profile_link']")},
'-1353453660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:eq(1)")},
'-944241459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:contains(Alert)")},
'-868044223': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-tabs .walkme-tab-button:has(span .walkme-contains-task)")},
'-200904138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[data-automation-id=" + dollars[0] + "]")},
'-1376489438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id*='inbox_list']")},
'-1639600897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"dropDownCommandButton\"]:contains(" + dollars[0] + ")")},
'-535847596': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:visible:eq(2)")},
'-176791238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='inbox_item_list']")},
'-2010486490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title='Submit']:visible")},
'-1151274629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "]")},
'-1500501900': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']:contains(Create Job Requisition)")},
'-1525034825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText'][title='Correct My Time Off']")},
'-1292839359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "][title='Correct My Time Off']")},
'-170236176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-label=\"Job Change\"]")},
'-86144176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeader']:contains(" + dollars[0] + ")")},
'-1433088042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=" + dollars[0] + "]:contains(" + dollars[1] + "):eq(1)")},
'-1041880560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='tabLabel']:contains(" + dollars[0] + ")")},
'-1980686171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:contains(Enter Time)")},
'-501509668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']:contains(" + dollars[0] + "):eq(1)")},
'-1677693240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsItem']:contains(" + dollars[0] + ")")},
'-578775204': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"menuItem\"]").filter(":contains(" + dollars[0] + ")")},
'-933699844': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(OK)")},
'-2040003853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=\"Personal Information\"]")},
'-1305463972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id=" + dollars[0] + "]:eq(1)")},
'-906723619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='errorWidgetBarCanvas']")},
'-274211395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='notification_preview']")},
'-1320288615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(Company)")},
'-2094864360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd-ProgressiveDisclosure-Popup']")},
'-1022191769': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel:contains(View)")},
'-1015891193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='saveButton']:mt_visible")},
'-1650075944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(Career)")},
'-1717036832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='subTabPanel']")},
'-1608792191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='wd-CommandButton_934$20_BPF_Button_Bar']")},
'-394873283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']:contains(" + dollars[0] + ")")},
'-1351482913': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:contains(" + dollars[0] + "):visible")},
'-257894245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='actionImage']")},
'-1228865963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='relatedActionsContainer']")},
'-1332840001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView-NO_METADATA_ID']:visible:eq(2)")},
'-213758247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(Actions)")},
'-645727160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-label=\"Time and Leave\"]")},
'-1654156013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"relatedActionsContainer\"]")},
'-1562678715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]:visible:eq(0)")},
'-332838361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=" + dollars[0] + "] div[data-automation-label=" + dollars[1] + "]")},
'-1991115400': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id='dropDownCommandButton']:visible:last")},
'-1001631175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id=\"formLabel\"]:contains(" + dollars[0] + "):eq(1)")},
'-115389764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id='inbox_item_list']")},
'-1864789421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] button:first")},
'-583216467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='calendarNavigationOverlay']")},
'-420103029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id=\"promptOption\"]:contains(" + dollars[0] + ")")},
'-198397064': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='inbox_toggle_button']")},
'-517023301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"promptIcon\"]:eq(" + dollars[0] + ")")},
'-424534230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:eq(3)")},
'-980940047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "] [data-automation-id='promptOption']")},
'-1948547307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='promptIcon']")},
'-1937092660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkme-icon-position-smartTip-id-20777")},
'-249582139': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='workerProfileDetailsPanel']")},
'-426600914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='addRow']")},
'-800057376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-automation-id=\"inbox_item_list\"]")},
'-51374126': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "]")},
'-2072703814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='bucketContainer'] [data-automation-id=" + dollars[0] + "]:last")},
'-489321827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-1825383856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("[data-uxi-widget-type=selectinput]").parent();},
'-1005067725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[data-automation-id='formLabel']:contains("+fixed.labelTxt+")").parents("li:first").find("[data-automation-id='richTextEditor']").children("div").filter(":mt_visible")},
'-1560036887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("[data-automation-id='formLabel']:contains(" + fixed.labelText+ ")").parent().next().find("[role='textbox']")},
'-1034639815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='tabGridVisbleCell']").find(":contains("+fixed.elemTxt+")[data-automation-id^='columnLabel']")},
'-1275773527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtContainer = wmjQuery("[aria-controls^='tabPanel']:contains("+fixed.elemTxt+")")
if(tgtContainer.length > 0){
	return tgtContainer.find(fixed._tgtTag).eq(fixed._index);
}
return wmjQuery();},
'-1835572155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']").filter(":directContains("+fixed.tgtText+")").closest("li[data-automation-id='formLabelRequired']").find("div[data-automation-id='responsiveMonikerInput']");},
'-1933483451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='quandrantHeaderText']").filter(":textEquals("+fixed.sectionTitle+")").closest("[data-automation-id='workletQuandrant']").find("[data-automation-id='wd-MoreLink']")},
'-788155949': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workletTitle']").filter(":textEquals("+fixed.titleTxt+")").closest("[data-automation-id='brickLayout']").find("[role='list']ul")},
'-455273693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".wd-popup-content").find("[data-automation-id=pageHeaderTitleText]");},
'-243870899': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='tabGridVisbleCell']").find("span").filter(":containsTextNode("+ fixed.btnText +")");},
'-1347717239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest("#mainContent").find("div").filter("[title="+fixed.tgtLmAttr+"]"); },
'-1706861234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.lmLabelText+")").closest("li").find(".wd-icon-check-small"); },
'-1996566227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("[id^='heading']").filter(":containsTextNode("+fixed.tgtElemLabelText+")").closest("[id^='wd-SectionView']")},
'-1011007512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-automation-id="+fixed._cardHeadingAttr+"]").closest("[data-automation-id='landingPageWelcomeCard']").find("[role='button']").filter("[data-automation-id="+fixed._lmClosesButtonAttr+"]").find(".wd-icon"); },
'-854428929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id$='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li[role='presentation']").find("[data-automation-id='menuItem']");},
'-500939011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mainContent").find("span").filter(":directContains("+fixed.elemText+")");},
'-454254478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":directContains("+fixed.elemText+")").closest("li").find("[data-automation-id="+fixed._dataAutomationIdValue+"]");},
'-1108593343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.mainTable").find("tbody").find("td:eq("+fixed.tgtIndex+")");},
'-557553654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest("#mainContent").find(":header").filter(":containsTextNode("+fixed.lmText+")"); },
'-1203393466': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-task-ids="+fixed._elemAttr+"]");},
'-152779842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("[data-uxi-widget-type='columnHeader']").find("span").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-803243604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[title="+fixed.headerAttr+"]").closest(":header").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='radioBtn']").find("label").filter(":first");},
'-901064766': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id='"+fixed._elemAttr+"']").closest("div");},
'-1252790863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("li").find(".wd-icon-check-small");},
'-864240205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.elemText+")").parent("div");},
'-616575421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("[data-metadata-id='NO_METADATA_ID']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1506900607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label").filter("[title="+fixed.elemAttr+"]").closest("ul").parent("div").closest("ul[role='presentation']").find("li").filter(":has(input)").find("[data-automation-id='responsiveMonikerInput']");},
'-493110813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.titleSection+")").closest("[id*='wd-SectionView']").find("button").filter(":contains("+fixed.elemAttr+")");},
'-356679610': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeader']").find("[data-automation-id='promptOption']");},
'-151614544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='viewStackHeaderTitle']").find("[data-automation-id='promptOption']");},
'-239323314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='wd-CommandButton_uic_okButton']")},
'-1983738779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[id^='wd-SectionView']").find("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.tgtElemLabelText+")").closest("li").find(".wd-Text[data-automation-id='textView']").first();},
'-843551453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.pageheaderText+")").closest("[data-automation-id='pageHeader']").closest("#mainContent").find("button").filter("[data-automation-task-ids='"+fixed._arrtElem+"']:first");},
'-172309077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='workerProfileContentContainer']").find("span[data-automation-id='fieldSetLegendLabel']").filter("[title="+fixed.headerAttr+"]").closest("div[id^='wd-PageContent']");},
'-525477788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter("[title="+fixed.headerAttr+"]").closest("div[id^='wd-AtlasMenuSection']").find("div.gwt-Label").filter(":contains("+fixed.elemText+")").parent("div");},
'-1064018786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='globalNavAppItemLabel']").filter(":containsTextNode("+fixed.elemText+")");},
'-1841896476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {  return wmjQuery(".wd-icon-user").closest("[data-automation-id='menuItem']").find("[data-automation-id='workerProfileMenuItemLabel']").parent("div");},
'-1040615465': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtElem = wmjQuery("p").filter(":containsTextNode("+fixed.questionTxt+")").closest("[data-automation-id*='wd-ActiveListRow']").find("button");
return tgtElem.length > 1 ? tgtElem.filter(":mt_visible").filter(":first") : tgtElem.filter(":first");},
'-286014380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='workerProfileMenuItemLabel']").filter("[title="+fixed.elemAttr+"]").closest("div[data-automation-id='workerProfileMenuItemWrapper']");},
'-16701323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='workerProfileMenuItemLabel']").filter("[title="+fixed.elemAttr+"]").closest("div[data-automation-id='workerProfileMenuItemWrapper']");},
'-973975730': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendHeading']").filter(":contains("+fixed.labelText+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='icon']");},
'-1710778881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1390842071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.elemText+")").closest("div");},
'-158645406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-automation-id="+fixed._labelAttr+"]").closest("div[class*='sectionHeader']");},
'-145015410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel'").filter(":containsTextNode("+fixed.labelText+")").closest("li[data-automation-id='formLabelRequired']").find("div[data-automation-id='responsiveMonikerInput']").find("div[role='option']");},
'-1095279754': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("[data-automation-id='wd-ActiveList-addButton']");},
'-1197041262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("div.gwt-Label").filter(":containsTextNode("+fixed.elemText+")").filter("[data-automation-id="+fixed._elemAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-531569287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-SectionView']").find("[data-automation-id='wd-ActiveList-addButton']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-426570045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-FileUploadAwesome']").find("button[data-automation-id='label']");},
'-462757665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id='"+fixed._elemAttr+"']").closest("div").parent();},
'-2030519418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workletTitle']").filter("[title="+fixed.titleAttr+"]").closest("div[id*='WorkletPanel']").find("button").filter("[title="+fixed.elemAttr+"]");},
'-1985621165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.gwt-Label").filter(":containsTextNode("+fixed.lmNextTxt+")").closest("[id*='wd-AtlasMenuSection']").find(".wd-icon-menu-group"); },
'-11130157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='viewStackHeaderTitle']").find("[id^='heading']").find("[data-automation-id='responsiveMonikerInput']");},
'-1829352393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[title="+fixed.btnTitleAttr+"]").closest("[data-automation-id='dropDownCommandButton']");},
'-1569210499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions =wmjQuery("[data-automation-id='tabLabel']").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-506944026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.gwt-Label[data-automation-id='gaugeWidgetInfoTitle']").filter("[title="+fixed.labelAttr+"]").closest("div[role='listitem']").filter("[data-automation-id="+fixed._elemAttr+"]");},
'-2011060655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.buttonAttr+"]").closest("td[role='cell']").filter(":first");},
'-398050687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[data-automation-id='fieldSetLegendHeading']").filter(":containsTextNode("+fixed.insideTitleText+")").closest("div[data-metadata-id='wd-SectionGroupView']");},
'-2123963337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='columnHeader']").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'-755582156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest("[id*='wd-SectionView']").find("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmText+")"); },
'-1491630043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-PageContent']").find("p"); },
'-862969004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='pageHeader']").find("[data-automation-id='pageHeaderTitle']");},
'-1965191305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.sectionHeaderText+")").closest("[id*='wd-SectionView']").find(".gwt-Label").filter(":containsTextNode("+fixed.lmAttr+")"); },
'-323612437': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-widget='employeeEnrollmentContainer']").find("div").filter("[title="+fixed.titleAtr+"]").parent("div");},
'-703039990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='leftColumnCard']").filter(":containsTextNode("+fixed.titleTxt+")").find("[role=tablist]");},
'-194998627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id='dateInputWrapper'],[data-automation-id='textInput']");},
'-1801863472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id='responsiveMonikerInput']");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-2033798600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[dir='ltr'][class*='GWTCKEditor']").filter(":containsTextNode("+fixed.panelQuestionText+")").closest("[aria-labelledby*='wd-PanelSet']").find("span.cke_top"); },
'-902872814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridToolbar']").find("li[data-automation-id^='toggleButton']").find("[data-automation-id^='toggleButtonContent']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1896653913': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter(":containsTextNode("+fixed.selectedTab+")").closest("[data-automation-id='subTabPanel']").find("li").filter(":containsTextNode("+fixed.labelTxt+")").find("[data-automation-id='datePickerButton']").parent();},
'-309026815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmLabelText+")").closest("li").find(".gwt-Label"); },
'-225994258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-2090129534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pex-announcements-section-header']").closest("[class$='fadeInWrapper']");},
'-554466379': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dateWidgetContainer']").closest("li").find("label").filter(":containsTextNode("+fixed.labelText+")").parent("div");},
'-1650092606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='taskWizardListPane']").find("[data-automation-id=pill]").filter("#"+fixed._elemId);},
'-117691152': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='facet']").find("[data-automation-id='focusableElement']").children(":first").children();},
'-2075410655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.headerTxt+")").closest("li").find("[data-automation-id='deltaProposed']").filter(":contains("+fixed.elemTxt+")").find("[data-automation-id='decorationWrapper']");},
'-944739621': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*='wd-TaskOrchestrationView']").find("h2").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-metadata-id='wd-SectionGroupView']").find(":header");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-177140515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView']").find(":header").filter(":containsTextNode("+fixed.elemText+")");},
'-1762368567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workerProfileMenuItemLabel']").filter("[title="+fixed.elemAttr+"]").closest("div");},
'-424225087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='applicationheader'").find("div[class*='InputContainer']").filter("#"+fixed._elemId);},
'-381081725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeader']").find(":header[id^='heading_']").filter(":containsTextNode("+fixed.elemTxt+")").find("[data-automation-id='pageHeaderTitleText']");},
'-1961574687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='advancedChartPanel']").find("svg.wd-icon-chart-config");},
'-112709123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#wd-Inbox-mainpage").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-810965499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-EditPage']").find("[id*='wd-FieldSet'][data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmText+")"); },
'-1101127953': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerText+")").closest("[id*='wd-EditPage']").find("[aria-label='row']").find(".gwt-InlineLabel").filter(":containsTextNode("+fixed.lmText+")"); },
'-2051081995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":contains("+fixed.headerTxt+")").closest("[data-automation-id='pageHeader']").find("[data-automation-id='viewStackHeaderTitle']");},
'-940308741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-metadata-id='wd-SectionGroupView']").children(":first");},
'-1239001024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.titleText+")").closest("[data-automation-id='panel']").find("[data-automation-id='"+fixed._lmAttr+"']"); },
'-1597915086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":directContains("+fixed.elemText+")").closest("li").find("[role='textbox']");},
'-681063346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role='button']").filter("[data-automation-id="+fixed._elemAttr+"]").find("svg");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-881555189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.HeaderText+")").closest("[data-automation-id='pageHeaderTitle']").find("[data-automation-id='promptOption']").closest("[data-automation-id*='selectedItem']");},
'-415380489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header span").filter("[title="+fixed.headerAttr+"]").closest("div.wd-popup");},
'-2054285283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[data-automation-id="+fixed._attrValue+"]").find("[class*='GlobalNavHeader']");},
'-1700827678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#quandrantHeaderText-Request").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='workletQuandrant']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'-90390908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='pageHeader']").find("[data-automation-id='menuItem']").find("[data-automation-id*='selectedItem']");},
'-1202322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.titleText+")").closest("[data-automation-id='panel']").find("label").filter(":directContains("+fixed.lmLabel+")").closest("li").find("[data-automation-id='"+fixed._lmAttr+"']"); },
'-1721924707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("[data-automation-id='gridTitleLabel']").closest(".wd-SuperGrid").find("[data-uxi-widget-type='columnHeader']").find("span").filter(":containsTextNode("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-786163298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.sectionTitle+")").closest("div[data-metadata-id='wd-SectionGroupView']").find("[id*='heading']").filter(":containsTextNode("+fixed.elemText+")");},
'-407127454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mainContent").find("span[data-automation-id=pageHeaderTitleText]").filter(":containsTextNode("+fixed.elemText+")");},
'-1408366459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridTitleLabel']").filter(":containsTextNode("+fixed.tableText+")").closest("[data-automation-id='rivaWidget']").find("span").filter(":directContains("+fixed.lmText+")").closest("button");},
'-868141830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.elemTxt+")").find("span.gwt-InlineLabel");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-340933634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workletTitle']").filter("[title="+fixed.elemAttr+"]");},
'-2056303567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='textView']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1419676768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")").closest("li").find("input"); },
'-1228010069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.buttonAttr+"]").closest("div[data-automation-id='fieldSetContent']");},
'-1660170380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._elemAttr+"]");},
'-2092111966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='tabPanel']").filter("[aria-label="+fixed.lmClosestAttr+"]").find("[data-automation-id='"+fixed._lmAttr+"']"); },
'-601654953': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=errorWidgetPopupCanvas]").find("[data-automation-id=errorWidgetMessageFieldCanvas]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1047744630': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mainContent").find("[data-automation-id=pageHeader]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-893155578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=selectedTab]").filter(":containsTextNode("+fixed.selectedTabTxt+")").closest("[data-automation-id=subTabPanel]").find("button[data-automation-id='wd-ActiveList-addButton']");},
'-135079620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id='selectedTab']").find("div.gwt-Label").filter(":containsTextNode("+fixed.elemText+")");},
'-530421211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").find("li").find("a").filter("[href_production*='"+fixed._hrefProdAttr+"']");},
'-1030617525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[data-automation-id='pex-search-results-header-title-link']").filter(":containsTextNode("+fixed.lmText+")");},
'-892073341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='quoteCreate_GI_shippingInformation']").find(":header").filter(":containsTextNode("+fixed.lmText+")"); },
'-1618055678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*='tabGridVisbleCell'],[data-automation-id*=buttonHeader]").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1213068833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=GlobalNavContent]").find("svg.wd-applet-pay").closest("a").find("span").filter(":directContains("+fixed.elemTxt+")");},
'-445215947': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='order_label_source_application_name_title']").closest(".field-block").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'-972868410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field-block").find(".field-title").filter(":containsTextNode("+ fixed.btnText +")").next().find("select");},
'-1198973539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-metadata-id='wd-SectionGroupView']").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id^='wd-ActiveListRowEditor']").find("[data-automation-id='checkboxPanel']");},
'-1857439158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*='StageContainer']").find("span").filter(":containsTextNode("+fixed.tgtElemText+")").last();},
'-1945168543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[class*='MultiSelectContainer']").parent("div");},
'-207807035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.wd-popup").find("span[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.elemText+")");},
'-19024298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-AtlasMenuSection']").find("svg.wd-icon-menu-group").parent().next(":header");},
'-864731517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-Worklet']").filter(":containsTextNode("+fixed.titleText+")").find("svg.wd-icon-gear");},
'-553257725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridTitleLabel']").filter(":containsTextNode("+fixed.tableTitleDirectText+")").closest(".wd-SuperGrid").find(".gwt-Label").filter(":containsTextNode("+fixed.labelDirectText+")").closest("tr").find("[class*='-SelectInputContainer']");},
'-2017762000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=compositeHeader]").filter(":containsTextNode("+fixed.cardContentText+")").closest("[data-automation-id=cardContent]").next().find("[data-automation-id=cardButton]");},
'-1068290802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='appHeader']").find("input").filter("[data-automation-id="+fixed._labelId+"]").closest(".wdappchrome-o");},
'-2125270107': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("pro-expandable-dashboard-iframe-sheet").find("[data-automation-id=Toolbar]").filter(":containsTextNode("+fixed.iframeTitle+")").next().find("iframe.sheet-frame").filter("[src_production*=Delivery]");},
'-1615465514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[src_production*='"+fixed._hrefProdAttr+"']");},
'-2128721393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.labelText+")").closest("[id*='wd-SectionView']").find("[id*='wd-delta-item-list'][data-automation-id='decorationWrapper']").filter(":containsTextNode("+fixed.tgtText+")");},
'-171928342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id*='wd-delta-item-list']").filter(":containsTextNode("+fixed.labelText+")").closest("li");},
'-967333571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.tgtText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-2061186863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id=primaryCourseAction],[data-testid=primaryCourseAction]").parent().parent();},
'-829383718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id="+fixed._btnDataAutomationContext+"],[data-testid="+fixed._btnDataAutomationContext+"]").parent().parent();},
'-487803536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=bucketContainerButton").find("svg").filter("."+fixed._firstClassOfSvg);},
'-491184951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='taskWizardListPane']").find(":header").find("span span span");},
'-649803511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-automation-id="+fixed._elemAttr+"]").find("button").filter(":first");},
'-122706527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=workletQuandrant]").find("[data-automation-id=groupedListItem]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("data-automation-id=menuList").find("li[data-automation-id=menuItem]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'-1489059493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("ul[data-automation-id=inbox_item_list]");
const newElem = wmjQuery("ul[data-automation-id=inboxItemList]");
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'-1930897066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[data-automation-id=menuItem]").find("[data-automation-id^=inbox_popup_item]").filter(":containsTextNode("+fixed.elemTxt+")");
const newElem = wmjQuery("svg.wd-icon-perspective").closest("li").find("button[data-automation-id=subMenuItemButton]").filter(":first");
if (oldElem.length){
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
}
else {
  return wmjQuery();
}},
'-386767025': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("ul[data-automation-id=inbox_item_list]");
const newElem = wmjQuery("ul[data-automation-id=inboxItemList]").parent();
if (oldElem.length) {
  return oldElem;
} else if (!oldElem.length && newElem.length) {
  return newElem;
} else {
  return wmjQuery();
}},
'-849020454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tablist']").find("span").filter("[title="+fixed.elemText+"]");},
'-2093499359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find(".wd-icon-question");},
'-247500109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.columnHeaderText+")").closest("td").closest("[data-automation-id='MainContainer']").find("[data-automation-id='fieldSetBody']").eq(fixed.thIndex-1).find("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='dateTimeWidget']");
},
'-1631393958': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("table").find(".gwt-InlineLabel").filter("[data-ecid='"+fixed._elemAttr+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-336699021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").find(".sortIconPrefix").filter(":contains("+fixed.tgtElemText+")").parent("div");},
'-281486484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id=relatedActionsButton]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-497188731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.wd-Text").filter(":containsTextNode("+fixed.elemTxt+")");},
'-186324287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='multiViewListDetailItem']").filter(":first").children("div");},
'-1394528020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='Editor-Disabled']").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").next("li").find("[data-automation-id="+ fixed._lmDataAutomationId + "]");},
'-1107834442': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=decorationWrapper]").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").next("li").find("textarea.gwt-TextArea");},
'-2059921471': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=decorationWrapper]").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").next("li").find("[data-automation-id=dateInputWrapper]");},
'-820559604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.wd-popup").find("span[data-automation-id='pageHeaderTitleText']");},
'-1068399889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("aside").filter("[data-testid="+fixed._cardAttr+"]").find("div[data-testid='responsiveButtonWrapper']").find("span").filter(":last");},
'-1794654827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.GECellHeader").filter(":contains("+fixed.labelText+")");},
'-1906550445': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("[data-uxi-widget-type=selectinput]").parent();},
'-421908405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type=columnHeader]").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1882927174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='verticalNavigationItemIconContainer']").parent("div").find("span").filter(":containsTextNode("+fixed.btnText+")").parent("div");},
'-1139226570': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id=promptOption]").filter("[title="+fixed.elemTxt+"]");},
'-925523921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='LabelContainer']").filter("[title="+fixed.titleText+"]").closest("[data-automation-id='responsiveMonikerPrompt']").find("div[class*='ListItemContainer']").filter(":contains("+fixed.elemText+")");},
'-278431227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='listbox']").find("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.optionDirectText+")").closest("[data-automation-id='promptLeafNode']");},
'-277677828': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.tgtText+")");},
'-1599426768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-icon-task-performance").closest("[data-automation-id='workerProfileMenuItemWrapper']").find("[data-automation-id='workerProfileMenuItemLabel']").parent("div")},
'-813252684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog").find("[id^='wd-PageHeader']").filter(":containsTextNode("+fixed.popUpTitle+")").closest(".wd-popup-content").find("label").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1147802167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='quandrantHeaderText-View']").filter(":containsTextNode("+fixed.elemTitle+")").closest("[data-automation-id='workletQuandrant']");},
'-261231336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.sectionTitle+")").closest("[id^='wd-EditPage']");},
'-2143194803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-widget='wd-popup']").find("[data-automation-id=promptTitle]").filter("[title="+fixed.elemTxt+"]");},
'-1722337077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")").closest("div[role='region']").find(".wd-icon-edit").closest("button");},
'-790096187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1 span[class*=emphasis]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1733894030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h4").filter(":contains("+fixed.elemHeader+")").closest("[id^='wd-SectionView']");},
'-1078291613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":contains("+fixed.elemHeader+")").closest("[id^='wd-SectionView']");},
'-1367584673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.headerTitle+")").closest("[id^='wd-FileUpload']").find("[data-automation-id='dragDropTarget']");},
'-1323719451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[id^='wd-SectionView']").find("button").filter("[title="+fixed.elemtTitleAttr+"]");},
'-2017524121': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gridToolbar']").find(".gwt-InlineLabel").filter(":containsTextNode("+fixed.headerText+")").closest(".wd-SuperGrid").find("[data-automation-id='MainContainer']>div");},
'-1517167734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.elemTxt+")").parent("div");},
'-103630145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='heading']").filter(":contains("+fixed.headerText+")").closest("[data-automation-id='panelSet']");},
'-38030008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id='pageHeaderDecoration']").find("svg.wd-icon-pdf");},
'-212487092': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstElem = wmjQuery("span").filter(":contains("+fixed.labelTxt+")").closest("div"); 
const secondElem = wmjQuery("span").filter(":containsTextNode("+fixed.labelTxt+")");
if (firstElem.length) {
 return firstElem;}
else if (secondElem.length) {
 return secondElem;}
 return wmjQuery();
},
'-1468804071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmtext+")").closest("li").find("[data-automation-id='multiselectInputContainer']");},
'-1428994016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
const headerCellIdx = wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.cellTitle+")").filter(":mt_visible").closest("td").index();

return wmjQuery("[data-automation-id*='toggleButton'][data-automation-id*='selected']").filter(":contains("+fixed.tableTabName+")").closest(".wd-SuperGrid").find(".mainTable tbody").find("tr:eq("+fixed.trIdx+")").find("td:eq("+headerCellIdx+")").find("[data-automation-id='activeGridCell']");
},
'-1313595697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[class*='"+fixed._iconName+"']").closest("[data-automation-id='workerProfileMenuItemWrapper']").find("[data-automation-id='workerProfileMenuItemLabel']").closest("div");},
'-749148564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workerProfileDetailsPanel']").find("[data-automation-id='menuList']").find("span").filter(":contains("+fixed.elemText+")").closest("div");},
'-1765874143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore("+fixed.lmText+")");
const originalElem = wmjQuery(".gwt-Label").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("li[role='listitem']").find(".gwt-Label").parent();

if (originalElem.length)  return originalElem;
if (oldElm.length)   return oldElm;

if(ftHelper.unQuote(fixed.lmText)  === "View Teams") {
  const newElm =  wmjQuery("a[data-automation-id='groupedListItem']").filter(":containsTextNodeIgnore('Team Absence Calendar')");
  if(newElm.length){
    return newElm;
  }
	return  wmjQuery();
}
return wmjQuery();},
'-1271006386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.tgtLmAttr+")").closest("[class*='MainHeaderContainer']");;},
'-444785252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=richTextEditor]").filter(":containsTextNode("+fixed.questionText+")").closest("[data-automation-id=panel]").find("textarea").parent().filter(":mt_visible");},
'-2075894501': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='wd-EditPage'],.wd-popup").filter(":containsTextNode("+fixed.sectionTitle+")").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id=multiselectInputContainer]");},
'-1353597813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type=multiselectlistitem]").find("[data-automation-id=promptOption]").filter("[data-automation-label="+fixed.elemTxt+"]");},
'-1487563888': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("label[data-automation-id='formLabel']").filter(":containsTextNodeIgnore("+fixed.elemText+")").closest("div");},
'-2105993654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id="+fixed._elermAttr+"]");},
'-1934640590': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[data-uxi-element-id="+fixed._formName+"]").closest("div").children(":header");},
'-982891171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabe']").filter(":containsTextNode("+fixed.formlabeltxt+")").closest("li").find("[data-automation-id='textView']");},
'-56544314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='taskOrchMegaNavBarListItem']").find("span").filter("[title="+fixed.btnTitleAttr+"]");},
'-259836337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._outerId+"]").find("input").filter("[type="+fixed._elmType+"]");},
'-16452660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg."+fixed._splitClassAttr+"").closest("[data-automation-id='workerProfileMenuItemWrapper']");},
'-1706196514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workerProfileDetailsPanel']").find("img");},
'-235470334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.headerText+")");},
'-1739416242': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-icon-search").closest("[data-automation-id='searchContainer']").find("input");},
'-2131009417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.popupHeaderDirectText+")").closest("div[role='dialog']");},
'-1721002258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.labelText+")").closest("li").next("li").find("input");},
'-863616885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.btnText+")").closest("li");},
'-1099318198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='fieldSetBody']").find("td").filter(":containsTextNode("+fixed.tgtDirectText+")").find(".gwt-InlineLabel").last();},
'-1749689656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tableHeader = wmjQuery("[data-automation-id=table]").find("[role=columnheader]").filter(":containsTextNode("+fixed.thText+")");
const tableHeaderIndex = tableHeader.length === 1 ? tableHeader.index() : null;
return tableHeaderIndex > -1 ? tableHeader.closest("table").find("tbody").find("[data-automation-id=row]").filter(":eq("+fixed.elmRowIndex+")").find("td[data-automation-id=cell]").filter(":eq("+tableHeaderIndex+")").find("[data-automation-id='responsiveMonikerInput']").parent() : null;},
'-793225138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tableHeader = wmjQuery("[data-automation-id=MainContainer]").find("[data-uxi-widget-type=columnHeader]").filter(":containsTextNode("+fixed.thText+")");
const tableHeaderIndex = tableHeader.length === 1 ? tableHeader.index() : null;
return tableHeaderIndex > -1 ? tableHeader.closest("[data-automation-id=MainContainer]").find(".mainTable").find("tbody").find("td").filter(":eq("+tableHeaderIndex+")").find("[data-automation-id='selectedItemList']").find("[data-automation-id=promptOption]") : null;},
'-970793158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.GECellHeader").filter(":containsTextNode("+fixed.labelText+")");},
'-1456329053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._popUpId+"']").find("button").filter("[data-automation-id='"+fixed._btnDataId+"']").closest("[data-automation-id=dropDownCommandButton]");},
'-1285477344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.dialogHeader+")").closest("[class*='HeaderContents']");},
'-1368982573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.GECellHeader").filter(":contains("+fixed.tgtElemText+")");},
'-1856995415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-2001434789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup .WKUS").filter(":containsTextNodeIgnore("+ fixed.headerDialog +")").next().find("label").filter(":containsTextNode("+fixed.sectionHeaderTxt+")").closest("li").find("[data-uxi-widget-type=selectinput]").parent();},
'-866210804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.popupHeader+")").closest(".wd-popup").find("[id^='wd-EditPage']");},
'-190649308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='tabContent']").filter("[aria-label="+fixed.ariaLabel+"]").find("button").filter(":contains("+fixed.btnText+")");},
'-1021214031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest(".wd-ViewPage");},
'-426451280': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader']").filter(":containsTextNodeIgnore("+fixed.headertxt+")").closest("[data-automation-id='cardContent']").find("[class*=StatusLabel]");},
'-768120481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[role="+fixed._liRole+"]").children("button").first();},
'-1364926736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("[data-automation-id='promptOption']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").parent("div");},
'-1160989764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='promptOption']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1975232694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskWizardMainHeaderTitle]").find("[data-automation-id=truncatedText]").find("span").find("span").first();},
'-998642693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.fieldLabel+")").closest("li").find("div").filter("[data-automation-id="+fixed._dataAutomationId+"]");},
'-1393426220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='multiSelectHeader']").filter(":contains("+fixed.headerText+")").closest("[class*='-StyledBoxElement']");},
'-2027990955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='workletTitle']").filter(":contains("+fixed.workletTitle+")").closest("[id*='WorkletPanel']");},
'-1082715964': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":contains("+fixed.fieldLabel+")").closest("li").find("span").filter("[data-automation-id="+fixed._dataAutomationId+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-417713110': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firsttry = wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headertxt+")").closest("[id*='wd-Panel']").eq(1).find("[data-automation-widget='richTextAreaInput']").children("[class*='Container']");
if (firsttry.length > 0) {
	return firsttry
}
else {
  return wmjQuery("[id*='heading']").filter(":containsTextNode("+fixed.headertxt+")").closest("[id*='wd-Panel']").eq(1).find("[data-automation-id='richTextEditor']").parent("div");
}
},
'-364262353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.fieldLabel+")").closest("div").next("[data-automation-id='decorationWrapper']").find("[data-automation-id='selectedItemList']").children("li");},
'-496392104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=pageHeader]").find(".gwt-Label").filter(":containsTextNode("+fixed.tgtElemText+")"); },
'-578728366': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-273881294': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='heading']").find("span").filter(":containsTextNode("+fixed.elemText+")");},
'-1368558387': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='taskWizardListPane']").find("[class*='FixedContentContainer']");},
'-1681066659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div[id*=wd-PageContent]").children();},
'-464955738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headertxt+")").closest(".wd-popup").find("[id*=wd-PageContent]").parent();},
'-824926365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.elmTxt+")").closest("[data-automation-id='dropDownCommandButton']").parent();},
'-771418562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.btnTitle+"]").closest("[data-automation-id='dropDownCommandButton']").parent();},
'-2120594613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby*='formLabel']").find("b").filter(":containsTextNode("+fixed.headerText+")");},
'-1013110385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabel']").filter(":containsTextNode("+fixed.lbltxt+")").closest("li").find("[data-automation-id='selectWidget']").eq(fixed.panelindex);},
'-556587786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='panelSetRow']").eq(fixed.panelindex).find("label").filter(":containsTextNode("+fixed.lbltxt+")").closest("li").find("[role='button']");},
'-1281720791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='panelSetRow']").eq(fixed.panelindex).find("label").filter(":containsTextNode("+fixed.lbltxt+")").closest("li").find("[data-automation-id='decorationWrapper']");},
'-523685861': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendHeading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[data-automation-id='fieldSetBody']").parent();},
'-1734174433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li").find("[data-automation-id=textView]").find("span");},
'-1493964458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='dropDownCommandButton']").find("button").filter(":containsTextNode("+fixed.BtnText+")");},
'-237270778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headertext+")").closest("li");},
'-1513099692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tableHeader = wmjQuery("[data-testid='table']").find("[role=columnheader]").filter(":containsTextNode("+fixed.thText+")");
const tableHeaderIndex = tableHeader.length === 1 ? tableHeader.index() : null;
return tableHeaderIndex > -1 ? tableHeader.closest("table").find("tbody").find("[data-automation-id=cell]").filter(":eq("+tableHeaderIndex+")").find(".wd-icon-edit").closest("button").filter(":mt_visible"): wmjQuery();},
'-2023440535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("li");},
'-564949292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='navigationItem']").filter("[aria-label="+fixed.elmAttr+"]");},
'-1752471448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type=columnHeader],[data-automation-id*=columnHeader]").find("span").filter(":containsTextNode("+fixed.elmTxt+")").parent();},
'-898118163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tab']").filter(":containsTextNode("+fixed.tabTxt+")").closest("ul[data-automation-id=tabBar]").parent();},
'-745320661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[id*='wd-PageContent']").find(":header").find("span");},
'-1675767113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelTxt+")").closest("li");},
'-1070012687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.headerTxt+")").closest(".wd-popup").find(".wd-popup-content");},
'-431594209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid="+fixed._elmAttr+"]");},
'-1283690135': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {  return wmjQuery("label").filter(":containsTextNode("+fixed.headertxt+")").closest("li").find("[data-automation-id='richTextEditor']").parent();},
'-278308865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='tabContent']").filter("[aria-label="+fixed.elmAttr+"]");},
'-241738294': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const columnHeader = wmjQuery("[role='columnheader']").filter(":containsTextNode("+fixed.thText+")");
if (columnHeader.length !== 1) return wmjQuery();
const headerIndex = columnHeader.index();
return headerIndex > -1 ? columnHeader.closest("table").find("tbody").find("[data-automation-id=cell]").filter(":eq("+headerIndex+")").find("[data-automation-id='"+fixed._elmAttr+"']") : wmjQuery();},
'-468699197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type='columnHeader'],[data-automation-id*='columnHeader']").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-304986777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-automation-id='gridTitleLabel']").filter(":containsTextNode("+fixed.gridTitleLabel+")").closest("[data-automation-id='gridToolbar']");},
'-427747866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.titleText+")").closest("li").find(".wd-icon-calendar");},
'-963520568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='total_label']").filter(":containsTextNode("+fixed.labelTxt+")").closest("tr").find("[data-testid='total_quantity']").filter("[data-testid="+fixed._elmAttr+"]");},
'-971517956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("p[data-automation-id=promptOption]");},
'-502406738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-automation-id="+fixed._parentAttr+"]").find("svg.wd-icon-related-actions");},
'-496349837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id=panelSetRow]").filter(":eq("+fixed.indx+")").find("label").filter(":containsTextNode("+fixed.lmText+")");},
'-906668733': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.lmText+")").closest(":header").closest("[data-automation-id='decorationWrapper']").closest("[data-automation-id='panel']").find("label").filter(":containsTextNode("+fixed.tgtLmText+")");},
'-421352453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const culomnnum = wmjQuery("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.columnheader+")").closest("td").index();
return wmjQuery("[data-uxi-widget-type='columnHeader']").filter(":containsTextNode("+fixed.columnheader+")").closest("[data-automation-id='MainContainer']").find(".dataTable tbody").find("td:eq('"+culomnnum+"')").find("[data-automation-id='"+fixed._lmdata+"']");
},
'-1628241871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".wd-ViewPage").find(".gwt-Label").filter(":containsTextNode("+fixed.labelText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-299983135': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-automation-id='selectedTab']").filter(":contains("+fixed.labelText+")").closest("[data-automation-id='subTabPanel']").find("[data-automation-id='panelSet']");},
'-1855310380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem1 = wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='fieldSetBody']").find("input[role='textbox']").filter(":first");
if (elem1.length)
{
  return elem1;
}
const elem2 = wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='fieldSetBody']").find("div.textInput").filter(":first");
if (elem2.length)
{
  return elem2;
}
return wmjQuery();},
'-686484960': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby*='input-formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("ul").find("[role='radiogroup']").closest("div[data-automation-id='decorationWrapper']");
},
'-257770000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automation-id='"+fixed._dataAutomationId+"']");},
'-2117496736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id]").filter("[data-automation-id="+fixed._parentDataAutomationId+"]").children("button");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-68576162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.buttonText+")");},
'-1763803262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest("[data-automation-id='cardContent']");},
'-1970536925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.checkboxLabel+")").closest("li").find("[data-automation-id='checkboxPanel']").eq(0);},
'-1930028939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.checkboxLabel+")").closest("li").find("[data-automation-id='checkboxPanel']").eq(2);},
'-1694103973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("h1").closest("ul").find("label").filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'-821118939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=sidePanel]").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-481125403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=facetSidePanel]").find("[id*='FacetValue']").filter("[title="+fixed.elmTitle+"]").parent("div");},
'-759268796': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='verticalNavigationItem']").filter("[title="+fixed.elmTitle+"]");},
'-970407511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[data-testid="+fixed._lmAttr+"]");},
'-1530382988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[id*='heading']").filter(":containsTextNode("+fixed.headertxt+")").closest("[role='region']").find("[data-automation-id='wd-CommandButton']");},
'-1704332206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.elemText+")").closest("button");},
'-1742264900': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[id$='"+fixed._iconid+"']").closest("button");},
'-1282287307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("label.slds-form-element__label").filter(":containsTextNode("+fixed.lmtext+")").filter(":mt_visible");
if (elem.length)
 {return elem} 
return wmjQuery(".test-id__field-label").filter(":containsTextNode("+fixed.lmtext+")").filter(":mt_visible");},
'-861770433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")");},
'-1077522678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldShortcutsElem = wmjQuery("[data-automation-id='globalNavEditShortcuts']").closest("[class*='ListHeader']").find("[class*='HeaderLabel']"); 
const newShortcutsElem = wmjQuery("[role='tablist']").find("[data-automation-id='globalNavShortcutsTab']"); 
if (oldShortcutsElem.length) return oldShortcutsElem;
if (newShortcutsElem.length) return newShortcutsElem;

return wmjQuery(); },
'-1149540772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldShortcutsEditElem = wmjQuery("[class*='HeaderLabel']").closest("[class*='ListHeader']").find("[data-automation-id='globalNavEditShortcuts']");
const newShortcutsEditElem = wmjQuery("[data-name='shortcut']").filter("[aria-selected='true']").closest("[class*='GlobalNavContent']").find("[data-automation-id='globalNavAddShortcuts']"); 
if (oldShortcutsEditElem.length) return oldShortcutsEditElem;
if (newShortcutsEditElem.length) return newShortcutsEditElem;

return wmjQuery(); },
'-1929492886': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id='wd-CommandButton']").filter("[title="+fixed.feedbackButtonTitleAttr+"]"); 

},
'-873505442': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const opDom= wmjQuery("header").find("[data-automation-id=ToolbarItem]").find("svg").filter("[class*=wd-icon-reorder]").closest("button");
if (opDom.length) return opDom;
const nopDom= wmjQuery("header").find(".navIcon").find("img").filter("[src_production*=hamburger]").closest("a");
if (nopDom.length) return nopDom;
return wmjQuery();},
'-297662976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-metadata-id='" + fixed.tgtData + "'] li:contains(" + fixed.label + ") [data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1152610603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const text = wmjQuery().identity(fixed.elemText);
return wmjQuery("[data-automation-id="+fixed.elemData+"]").filter(":contains("+text+")").filter(":mt_visible")},
'-379955326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=\"gridTitleLabel\"]:contains(" + dollars[0] + ") + div label[data-automation-id=" + dollars[1] + "]")},
'-473847952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[role="group"]:textStartsWith(' + fixed.tgtLabel + ') [data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")')},
'-134887587': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3:contains(" + dollars[0] + ")").parents("[id*='" + fixed.tgtId + "']")},
'-1697021607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-automation-id^='" + fixed.tgtAttr + "']")},
'-1093680350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='wd-SectionView'] h3:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-756638745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-SuperGrid:textStartsWith(" + fixed.tgtHeaderTxt + ") [data-automation-id='VisibleGrid']").parent()},
'-449293345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^=" + dollars[0] + "]:contains(" + fixed.headerTitle + ") [data-automation-id=" + dollars[1] + "]:eq(" + dollars[2] + ")")},
'-1200270008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-label^=" + dollars[0] + "]").parents("tr").find("input:first")},
'-1312020304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("[id*=\"heading\"]").filter(":contains(" + dollars[0] + ")").parent()},
'-1734192745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[data-automation-id=\"pageHeaderTitleText\"]").filter(":contains(" + dollars[0] + ")").parents("#mainContent").find(".wd-SummaryPage:eq(" + dollars[1] + ")")},
'-1617569021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='presentation']").find("label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").parent().next().find(".cke, .GWTCKEditor-Disabled")},
'-2134535098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup").find("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.dialogHeader+")").closest("[class*='HeaderContents']");},
'-1775557690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='gaugeWidgetInfoTitle']").filter(":contains("+fixed.labelText+")").closest("div[data-automation-id='gaugeWidget']");},
'-421464816': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[data-automation-id='formLabel']").filter(":contains("+fixed.labelText+")").closest("li").find("svg.wd-icon-prompts");},
'-640398819': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='gaugeWidgetInfoTitle']").filter(":contains("+fixed.labelText+")").closest("div[data-automation-id='gaugeWidget']").find("div[data-automation-id='gaugeWidgetDetailValue1']");},
'-1244144767': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[data-automation-id="+fixed._elemData+"]");},
'-1578939321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("[data-automation-id=workerProfileMenuItemLabel]").filter(":containsTextNode("+fixed.elmTxt+")").parent().filter(":mt_visible");
if (oldlM.length){
 return oldlM;
} 
if (!oldlM.length){
 return "WD_Side_Panel_More";
} 
return  wmjQuery();},
'-1408940568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks'], div[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");

const oldLM =  wmjQuery("li").find("div").filter(":containsTextNode("+ fixed.btnText +")").closest("a");
const middleTgtLM =  wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed.btnText+"").closest("button").find("[class*='label']");
const newLM = wmjQuery("[data-automation-id='globalNavContainer']").find("[data-automation-id='subMenuItem']").filter(":containsTextNode("+ fixed.btnText +")");
let newLMparent = newLM.closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem'][aria-expanded='false']");


if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
  return "Apps_Menu_More";
} 
if (newLMparent.length){
	wmjQuery(newLM).closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem']").click();
	return newLM;
}  if (oldLM.length > 0){
  return oldLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newLM.length > 0){
	return newLM;
} return wmjQuery()},
'-705649659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks'], div[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");

const oldLM =  wmjQuery("li").find("div").filter(":containsTextNode("+ fixed.btnText +")").closest("a").find("svg");
const middleTgtLM =  wmjQuery("[data-uxi-element-id='pex-modal']").find("svg."+fixed.btnText+"").closest("button").find("[class*='label']");
const newLM = wmjQuery("[data-automation-id='subMenuItem']").filter(":containsTextNode("+ fixed.btnText +")");
let newLMparent = newLM.closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem'][aria-expanded='false']");

if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
  return "Apps_Menu_More";
} 
if (newLMparent.length){
	wmjQuery(newLM).closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem']").click();
	return newLM;
}  if (oldLM.length > 0){
  return oldLM;
}if (middleTgtLM.length > 0){
	return middleTgtLM;
} if (newLM.length > 0){
	return newLM;
} return wmjQuery()},
'-499833071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newAllApps = wmjQuery("div[data-automation-id='pex-quick-tasks'], div[data-automation-id='pex-top-apps-section']").find("button[data-automation-id='pex-view-all-apps']");
const isModal = wmjQuery("div[data-automation-id='pex-modal']");
const globalNavContainer = wmjQuery("[data-automation-id='globalNavContainer'][data-automation-hiddenglobalnav='false']");

const newLM = wmjQuery("[data-automation-id='subMenuItem']").filter(":containsTextNode("+ fixed.btnText +")").find("span");
let newLMparent = newLM.closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem'][aria-expanded='false']");

if (newAllApps.length > 0 && isModal.length === 0 && globalNavContainer.length === 0) {
  return "Apps_Menu_More";
} 
if (newLMparent.length){
	wmjQuery(newLM).closest("[data-automation-id='expandedSubMenuItems']").prev("[data-automation-id='globalNavCollapsibleItem']").click();
	return newLM;
}  if (newLM.length > 0){
	return newLM;
} return wmjQuery()},
'-1240488197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistPopup']").find("[data-automation-id='relatedActionsItemLabel']").filter(".gwt-Label:contains(" + dollars[0] + ")");},
'-110672409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("[data-automation-id="+fixed._elmAttr+"]");},
'-1607229090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("input").closest("div");},
'-1211082063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistItem']").find(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")")},
'-1005511078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")").closest("[data-automation-id='relatedActionsSublistItem']");},
'-1222394455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistItem']").find(".gwt-Label[data-automation-id='relatedActionsItemLabel']:contains(" + dollars[0] + ")");},
'-1547540933': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmText+")").closest("div[data-automation-id*=card]");},
'-1439054007': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("[data-automation-id='headerContainer']").next("[id='scrollableDiv']").find("[class*=SegmentedButtonsContainer]").closest("div[class*=StepContainer]");},
'-1111431161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(":header[data-automation-id='pageHeaderTitleText'], span[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmText+")");},
'-202246080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=sidebar-navigation]").find("div[aria-label]").filter("[aria-label="+fixed.ariaLabel+"]").closest("a");},
'-1414443976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='textView'],.gwt-Label").filter(":containsTextNode("+fixed.elemTxt+")");},
'-862111236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").find(".wd-icon-calendar");},
'-1077980573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblTxt+")").closest("li").find("[data-automation-id='multiSelectContainer']").find("svg[class*=wd-icon-x]");},
'-1324216788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelTxt+")").closest("[class*='OnboardingCard']").find("[data-cy='Confirm_Button']");},
'-1625012614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.hdrTxt+")").closest("[data-automation-id='fieldSetBody']").find("[data-automation-id='tableWrapper']");},
'-1563188932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id="+fixed._filterAttr+"]").find(".wd-icon-caret-down").closest("div");},
'-565543538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id="+fixed._filterAttr+"]").find("div[class*=control]");},
'-506047368': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='relatedActionsSublistItem']").find(".gwt-Label").filter(":containsTextNode("+fixed.elemText+")");},
'-1532267391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[data-testid="+fixed._datatestid+"]").closest("[role='dialog']").find("label");},
'-1377953679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").find("textarea");},
'-308815345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='navigationBarMainTask']").filter("[aria-label="+fixed.lmAfiaLabel+"]");},
'-1278527584': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.labelText+")").closest("td[data-automation-id='tabGridVisbleCell-6']").closest(".WEHG").siblings(".WDHG").find("svg.wd-icon-x-small");},
'-1501814282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='pageHeaderTitleContainer']").closest("[data-automation-id='popUpDialog']").find("[id*=wd-EditPage]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-422405176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='timeOffTypeField']").find("span").filter(":containsTextNode("+fixed.text+")");},
'-1463847841': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[data-testid="+fixed._datatestid+"]").closest("[role='dialog']").find("label");},
'-1931418581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").find("textarea");},
'-1625692311': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[data-automation-id="searchInputAutoCompleteResultSubheader"]').filter(":containsTextNode("+fixed.elemTxt+")").closest('[data-automation-id="searchInputTypeaheadSearchItemLabel"]').find('[data-automation-id="searchInputAutoCompleteResultFullText"] > span');},
'-2087504315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.lblTxt+")").closest("[data-automation-id='promptLeafNode']").find("[data-automation-id='radioBtn']");},
'-308134122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='panelSetRow']").eq(fixed.lmindex).find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.txt+")").closest("li").find("[data-automation-id='richTextContent']");},
'-1085744321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tabpanel']").filter("[data-id="+fixed._dataId+"]").parent("div");},
'-1275044690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader'],[data-automation-id='cardFrameworkTitle']").filter(":contains("+fixed.headerTxt+")").closest("[data-automation-widget='employeeEnrollmentCard'],[data-automation-id='cardFrameworkCard']").find("button").filter(":containsTextNode("+fixed.btnTxt+")");},
'-2115428504': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-cy="+fixed._dataCy+"]").prev("div").parent("div");},
'-17848049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":contains("+fixed.formLabelTxt+")").closest("li").find("[aria-labelledby^='wd-delta-item-list-']").children("div").first();},
'-390731661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":contains("+fixed.lblTxt+")").closest("td").first();},
'-332410686': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").next("div").children("input");},
'-285554049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gwt-InlineLabel").filter(":containsTextNode("+fixed.lmText+")").closest("td").last();},
'-2102755222': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-widget-type=popup]").find("[data-automation-id=pageHeader]").find("[class*=HeaderContents]");},
'-476002212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=formLabel]").closest("li").find("label[data-automation-label]").filter(":containsTextNode("+fixed.labelText+")").closest(".gwt-RadioButton").find("input");},
'-663984698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest("span.gwt-RadioButton").find("input[type='radio']");},
'-1911481645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-popup-content").find("label[data-automation-id='formLabel']").filter(":containsTextNodeIgnore("+fixed.elemText+")").closest("div");},
'-1328063377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const oldElem = wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("li").find("[role='button']");
const newElem = wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("li").find("[data-automation-id=responsiveMonikerInput]");
if(oldElem.length){
	return oldElem;
} else if(newElem.length){
	return newElem;
}
return wmjQuery();},
'-13706228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.labelLabelText+")").closest("[data-automation-id='taskReviewCard']").find("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formItem']").find(".gwt-Label");},
'-235658944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='promptLeafNode']").find("[data-automation-id='radioBtn']");},
'-386545016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^=heading]").filter(":containsTextNode("+fixed.labelText+")").closest("[id^=wd-SectionView]").find("button").filter("[title="+fixed.lmTitle+"]");},
'-1264389050': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^=heading]").filter(":containsTextNode("+fixed.labelText+")").closest("[id^=wd-SectionView]").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'-176675343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("button").filter("[data-uxi-element-id="+fixed._lmAttr+"]");},
'-167567714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("[data-automation-id='relatedIconContainer']");},
'-1909195240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("[data-automation-id='relatedIconContainer']");},
'-234934143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='selectedItemList']").find("ul").find(".wd-icon-related-actions");},
'-931562063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id]").filter("[data-automation-id="+fixed._parentAttr+"]").find("span").filter("[data-automation-id="+fixed._lmAttr+"]");},
'-512116196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const viewMode =  wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='textView']");
const editMode =  wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='responsiveMonikerInput']").children("div").children("div");

if(viewMode.length > 0 ) {
  return viewMode;
}
else{
  return editMode;
}},
'-892369464': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[data-automation-id='checkboxPanel']");},
'-1771633058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.dialogHeadertext+")").closest("[role='dialog']");},
'-810467558': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("b").filter(":containsTextNode("+fixed.txt+")").closest(":header").closest("ul").find("[id*='dropDownSelectList']").find("svg[class*='wd-icon-caret-down']");},
'-78129072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-uxi-appsection-type='AWAITING_ACTION']").first();},
'-119664400': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-uxi-actionbutton-action="+fixed._lmAttr+"]");},
'-1441453542': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-automation-id='promptOption']").filter(":containsTextNode("+fixed.lmText+")");},
'-1916579279': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=wd-global-search-results]").find("div").filter("[data-automation-id="+fixed._lmAttr+"]").first();},
'-1604037687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='compositeHeader']").filter(":containsTextNode("+fixed.lmText+")").closest("[data-automation-id=cardContent]").next("div").children("button[data-automation-id='cardButton']");},
'-640143502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='formLabe']").filter(":containsTextNode("+fixed.formlabeltxt+")").closest("li").find("[data-automation-id='textView']").filter(":containsTextNode("+fixed.lmText+")");},
'-398864962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
let lm = wmjQuery("[data-automation-id=VisibleGrid]").find(" td[data-uxi-widget-type=columnHeader]").find("span").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (!lm.length)
{
  return wmjQuery(" th[role=columnheader]").find("span").filter(":containsTextNodeIgnore("+fixed.lmText+")");
}
return lm.length ? lm : wmjQuery();},
'-725146626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("[role=tablist][data-automation-id=tabBar]")},
'-1107409634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wd-icon-contact-card-matrix-manager").closest("a").parent("div").parent("div")},
'-1039439199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmText+")").closest("div.WGQO.WGRO.WLQO");
if (!elem.length)
{
  elem =  wmjQuery("[data-automation-id='fieldSetLegendLabel']").filter(":containsTextNode("+fixed.lmText+")").closest(":header").parent("div");
}
return elem.length ? elem : wmjQuery();},
'-917000592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")").closest("div").next("[data-automation-id='decorationWrapper']").find("div[class*=FocusContainer]").parent("div");},
'-2003236602': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions =  wmjQuery("[data-automation-id*=columnHeader],[data-uxi-widget-type=columnHeader]").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1410437271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").find("button").filter("[title="+fixed.lmTitle+"]");},
'-1132140391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role='button']").filter("[title="+fixed.sectionTitle+"]").closest("[data-automation-id='fieldSetBody']").find("button").filter(":contains("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-874685224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id*=toggleButtonContent]").filter(":containsTextNode("+fixed.lmText+")");},
'-791654487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[aria-label]").filter("[aria-label="+fixed.lmTitle+"]").closest("[id*= wd-CompactNote]").find(".gwt-HTML");},
'-240064499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='formLabel']").filter(":containsTextNode("+fixed.labelText+")").closest("[data-automation-id='formLabelRequired']").find("input").filter("[aria-label="+fixed.lmAriaLabel+"]");},
'-1637785317': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='gaugeWidgetInfoTitle']").filter(":containsTextNode("+fixed.lmText+")");},
'-1031736878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("div[data-automation-id]").filter("[data-automation-id="+fixed._parentAttr+"]").find("span").filter("[data-automation-id="+fixed._lmAttr+"]");},
'-255853018': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("div").filter("[data-automation-id="+fixed._dataAutomationId+"]").next("[data-automation-id='scrollableDiv']").find("[class*=StepContainer]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-312437794': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").children("div").filter(":containsTextNode("+fixed.lmText+")");},
'-960371439': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role='textbox']").filter("[aria-label="+fixed.lmAriaLabel+"]").find("p");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible").first() : targetOptions;},
'-690960583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='responsiveMonikerInput']").filter("[title="+fixed.lmTitle+"]").find("[data-automation-id='multiselectInputContainer']").first();},
'-1132565287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.txt+")").closest("label").closest("[data-automation-id*='Field']").find("[data-uxi-widget-type='selectinputicon']").find(".wd-icon");},
'-468929615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1135387030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='itemsColumnHeaderContent']").find("[data-automation-id='searchContainer']").find("input");},
'-714401721': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='pageHeaderTitleText']").filter(":containsTextNode("+fixed.hdttxt+")").closest("[data-automation-id='popUpDialog']").find("[data-automation-id='panelSet']").find(":header[id*='heading']").first();},
'-1734605967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid="+fixed._btnAttr+"]").closest("div");},
'-877110669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=application]").find("div").filter(":containsTextNode("+fixed.lblText+")").parent("label[data-automation-id='controlLabel']").parent("div").parent("div");},
'-1050162905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=taskWizardMainHeaderTitle]").find("[data-automation-id=truncatedText]").children("span").find("span:eq(" + dollars[0] + ")")},
'-1289543688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.lmText+"):eq(" + dollars[0] + ")");},
'-2094943593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=columnheader],[data-automation-id*=columnHeader]").find("button").filter(":containsTextNode("+fixed.elemText+")");},
'-760854658': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("legend").filter(":containsTextNode("+fixed.questionText+")").closest("fieldset").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("[role=textbox]");},
'-325801298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("ul").find(".gwt-Label");},
'-362061436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("a").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'-54334361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=GWTCKEditor]").filter(":containsTextNode("+fixed.lmText+")").closest("li").next("li").find("textarea");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);