(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1445962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-form-check-wrap").find(".x-form-cb-label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").prev("[type='checkbox']");},
'3016338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=toolbar]").find("span").filter(":containsTextNode("+fixed.buttonText+")").closest("button");},
'7904671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.btnTxt+")").closest(".sapcnqr-modal__content").find("button.sapcnqr-modal__button");},
'11254560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").filter("[data-test="+fixed._labelText+"]").find("a");},
'11575617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#UnusedTickets").next("h3").filter(":containsTextNode("+fixed.tgtText+")");},
'16430967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id='"+fixed._elemId+"']");},
'23205557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.entry-receipts-accessible-skeleton").closest("div.entry-receipts-panel__body,div.entry-receipt-panel__body");},
'23817940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=sideNavBar]").find("a[href_production$='"+fixed._hrefProd+"']").find("i").parent();},
'25883049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab-bar__tab,.sapcnqr-tab-group__button").filter(":containsTextNode("+fixed.tgtText+")");},
'27009872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").find("span").filter("[data-trans-legacyid='"+fixed._dataIdAttr+"']");},
'32730433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button").filter("[id="+fixed._labelId+"]").closest(".sapcnqr-toolbar__toolbar");},
'41119504': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr").filter("[name="+fixed._elemAttr+"]");},
'45249198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-inner-panel-header-text:directContains("+fixed.titleText+")").closest(".x-panel-tbar").next().children("div");},
'46481569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._inputId+"]").closest(".sapcnqr-form-field");},
'51364097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("form").filter("[id="+fixed._elemAttr+"]").children("div.sapcnqr-row");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'52175847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab-group__content .sapcnqr-form-group__label, .sapcnqr-form-field__label").filter(":containsTextNode("+fixed.elemText+")");},
'54903902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-quicktask").find("a").filter("[href_production$='"+fixed._hrefProd+"']").children("div");},
'57522288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span, div").filter("[class*='sapcnqr-list']").filter(":directContains("+fixed.elemText+")");},
'58923906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".terminal-button").filter("[id^="+fixed._labelId+"]").find(".x-btn-text");},
'59207179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[data-nuiexp="+fixed._fieldAttr+"]").find(".sapcnqr-form-field__heading");},
'61748642': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel").filter("[id="+fixed._panelId+"]").closest(".x-window").find(".x-window-header-text");},
'62675527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-shellbar'").filter("[role="+fixed._elemRole+"]");},
'80800659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dialog__title").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-dialog__container").find(".sapcnqr-button__text").filter(":containsTextNode("+fixed.elemText+")").closest(".sapcnqr-button");},
'92138579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id="+fixed._elemId+"]");},
'95344776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id="+fixed._parentId+"]").find("input").filter("[id="+fixed._elemId+"]");},
'104735932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-legacyid='"+fixed._elemId+"']").closest("button");},
'106855443': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[data-id=mytasks]").find("div.my-tasks-card").filter("[data-id='"+fixed._elemId+"']").find(".content").parent();
const newUI = wmjQuery("[data-id=mytasks]").find("li.hhsg-task-tile-item").filter("[data-id='"+fixed._elemId+"']").find("svg");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'111171630': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelText +")");},
'114744139': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tag + "[aria-labelledby='" + fixed._aria + "']");},
'119633857': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":contains("+fixed.listLabel+")").closest(".sapcnqr-list-item").find(".sapcnqr-list--expanded");},
'122830699': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel").filter("[id='"+fixed._panelId+"']").find("thead").find("td").find("div").filter(":containsTextNode("+fixed.elmTxt+")");},
'125242634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._btnAttr+"']").closest(".sapcnqr-button__text").closest(".sapcnqr-toolbar").closest(".entryform-tab-content");},
'141997076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-modal__container, div.sapcnqr-dialog__container").find("label").filter(":containsTextNode("+fixed.lblTxt+")").closest("div[class*=sapcnqr-col]");},
'142575924': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").find("[class*= hd-inner]").filter(":containsTextNode("+fixed.lmText+")");},
'144142096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-id="+fixed._lmAttr+"]");},
'147499415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-id='"+fixed._elemId+"']").closest("button");},
'151482578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").find("span").filter("[data-trans-id='"+fixed._innerAttr+"']").closest(".sapcnqr-modal__header");},
'155249667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").find("a").filter("[data-test='"+fixed._tgtTitle+"']");},
'171032234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-combo-list-item").filter(":containsTextNode("+fixed.elmTxt+")");},
'179977846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-inv-add-item-panel").find("td").filter(":containsTextNode("+fixed.tableColumnHeaderTextByIndex+")").closest(".x-grid3-viewport").find("tbody").find("td").eq(fixed.tableValueCellIndex).find("div");},
'217202027': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title").find("span").filter("[data-trans-id="+fixed._tgtId+"]");},
'221120524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-id="+fixed._dataIdAttr+"]").find("a[href_production*='"+fixed._href+"']").find(".sapcnqr-link__text");},
'224877650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-legacyid='"+fixed._elemId+"']").closest("button");},
'225383684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title,.sapcnqr-dialog__title").filter(":containsTextNode("+fixed.lmTxt+")");},
'226635650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#app-header-container").find("ul[data-test='menu__list-primary'] button[data-test='sapcnqr-shellbar-product-menu']");},
'239578361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id$="+fixed._splittedElemId+"]");},
'243049779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapcnqr-form-control").filter("[id*="+fixed._elemId+"]").closest(".sapcnqr-combobox");},
'245027678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputAttr+"]").closest(".sapcnqr-form-field").find("label");},
'247093945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.spend-common__drag-n-drop__button").closest(".sapcnqr-grid-list-item__body");},
'255397393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeRound]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-round-trip']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'255809482': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id=mytasks]").find("li.hhsg-task-tile-item,div.my-tasks-card").filter("[data-id='"+fixed._elemId+"']");},
'255973065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id*="+fixed._tgtId+"]");},
'260573092': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*="+fixed._parentClass+"]").find("span").filter(":containsTextNode("+fixed.buttonText+")").closest("button");},
'262992070': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-menu-item").find("span[data-trans-id*='"+fixed._spanTransId+"']").closest("span.sapcnqr-menu-item__item");},
'267043246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._inputAttr+"]").closest(".sapcnqr-form-field").find("label");},
'270777309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._closestIdAttr+"]").find(".sapcnqr-title").filter(":containsTextNode("+fixed.elemTxt+")");},
'273712605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tag + "[id='" + fixed._id + "']");},
'275612141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._tgtId+"]").children("div").children(".sapcnqr-section").find(".sapcnqr-section__heading");},
'279257878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.sapcnqr-menu-button-item__item-button").filter("[href*='"+fixed._elemHref+"']");},
'280862110': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#cnqr-app-content").find(".sapcnqr-section__header").filter(":contains("+fixed.elemText+")");},
'283422656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-checkbox").filter(":contains("+fixed.elemText+")");},
'285151384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("input").filter("[id*="+fixed._elmId+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'285424201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[data-element="+fixed._data_element+"]").find("[data-element='search-button']");},
'289732643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'305073813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-administration'],button[data-test='sapcnqr-shellbar-product-menu']")},
'307893782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.LabelText+")").closest(".sapcnqr-form-field__heading").siblings(".sapcnqr-form-field__control-container").find(".sapcnqr-form-field__control");},
'308312094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.lblTxt+")").closest(".divcell").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'310599931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("div.sapcnqr-card__body").filter(":containsTextNode("+fixed.elemTxt+")").filter(":first");
const newElem = wmjQuery("span.sapcnqr-button__text").filter(":containsTextNode("+fixed.elemTxt+")").closest("button.sapcnqr-button--create").filter(":first");
if(oldElem.length){
	return oldElem;
} else if(newElem.length){
	return newElem;
}
return wmjQuery();},
'311833871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class*='sapcnqr-app-header__menu']").find("svg").filter("[data-test="+fixed._svgDataTest+"]").closest("a");},
'353288395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__footer").find("span[data-trans-id*=" + dollars[0] + "]").closest("button").filter(":visible");},
'357189234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test="+fixed._ulAttr+"]").find("button").filter("[data-test="+fixed._elemAttr+"]");},
'383160473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-id="+fixed._elemAttr+"]").find(":header");},
'383317226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelFor+"]").closest("div.sapcnqr-form-field__heading").find("span.sapcnqr-form-field__required");},
'383389975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._titleAttr+"']").closest(".sapcnqr-modal__container").find(".sapcnqr-modal__body");},
'384237829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-field");},
'387826992': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("#quicktasks-menu").find("[href*='/invoice']").find(".action")
const oldNLM = wmjQuery("a[data-id='quicktasks-invoiceCreateInvoice']").find(".quick-task-button-inner");
const newLM = wmjQuery("a[class*='create-menu-item'][href*='invoice'],a[class*='menu-item__item'][href*='invoice']");
if (oldlM.length){
 return oldlM;
} 
else if (oldNLM.length){
 return oldNLM;
} 
else if  (newLM.length){
 return newLM;
} 
else if  (!newLM.length && !oldlM.length){
 return "Conc_Create_new_filler";
} 
return  wmjQuery();},
'388649937': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")").closest("[data-nuiexp='entry-receipt-panel']").find(".entry-receipt-panel__body");},
'392058246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#flightTabDiv").find(".search-widget-flightTab").find(":header");},
'398740579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__container, .sapcnqr-dialog__container").find(".sapcnqr-button__text").filter(":containsTextNode("+fixed.btnText+")").closest("button");},
'400927836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._headerData+"']").closest(".sapcnqr-modal__header").find(".sapcnqr-modal__close");},
'409233656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").find(".screen-reader-only").filter(":containsTextNode("+fixed.readerOnlyTxt+")").closest("[class*=datePicker]").find("button");},
'410740422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabcontent").find("h4").filter("[id="+fixed._tgtId+"]");},
'413564760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel").filter("[id="+fixed._panelId+"]").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'416438973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-fieldset__legend").filter(":containsTextNode("+fixed.headerText+")").closest(".cnqr-segment-fieldset").find("label").filter(":containsTextNode("+fixed.lmText+")");},
'418194231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid__select-all").closest(".sapcnqr-data-grid__header-text");},
'418374517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find(":header.sapcnqr-title").filter(":containsTextNode("+fixed.lmText+")"); },
'429105666': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab-group").find("button").filter("[data-enablenow-id='"+fixed._elemId+"']");},
'436819470': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[aria-label='"+fixed._elemAttr+"']");},
'447897372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._dataAttr+"']").closest(".sapcnqr-toolbar__title").closest(".sapcnqr-modal").find(".sapcnqr-modal__title");},
'460028228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel-nav").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'460122970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._headerData+"']").closest(".sapcnqr-modal__header").find(".sapcnqr-modal__close");},
'465248293': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__control").filter("[id*="+fixed._controlAttr+"]").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__label");},
'490452023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.elemText+")[id$='label_cell']");
},
'490460804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentDivId+"]").find(".sapcnqr-grid-list");},
'494140786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("strong").filter(":containsTextNode("+fixed.txt+")").closest("[class*='Option-module__locationText']").closest("[class*='ListboxItem__sapcnqr-listbox-item']");},
'495638087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#featured").find("h1").filter(":containsTextNode("+fixed.tgtText+")");},
'511856484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role=combobox]").filter("[name*="+fixed._noNumsName+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'524256986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:directContains("+fixed.labelText+")").closest(".divcell").find("input[role='combobox'], .x-form-field").filter(':mt_visible');
},
'528123645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeMulti]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='MULTI_CITY']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'530618094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#cnqr-app-content").filter(":containsTextNodeIgnore("+fixed.titlePage+")").find("form").filter("[id="+fixed._formId+"]").find("input").filter("[id="+fixed._elemId+"]");},
'537792796': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__body").find(".sapcnqr-toolbar");},
'539997676': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("div.sapcnqr-form-group").find(".sapcnqr-input-group__addon");},
'542605908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[role='tabpanel'][aria-hidden='false']").filter("[id="+fixed._activeTabIdAttr+"]").find("h3.cnqr-first");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'546850816': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formContainer").filter("[id="+fixed._formId+"]").find("input").filter("[id$="+fixed._elemId+"]");},
'553675351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='sapcnqr-app-footer__link']").filter("[target="+fixed._tgtName+"]");},
'560567058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-grid-list-item").filter("[data-id="+fixed._data_id+"]").find(".sapcnqr-toolbar__toolbar").find("[class*='sapcnqr-icon--plus']");},
'561246928': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._formId+"]").find("[role='combobox']").filter("[name="+fixed._parentNameAttr+"]").find("[role='textbox']");},
'562464333': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[data-nuiexp="+fixed._datanuiexp+"]").find(".sapcnqr-modal__body, .sapcnqr-dialog__body");},
'566188531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-window-header-text").filter(":containsTextNode("+fixed.elemTxt+")");},
'570239757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-id]").filter("[data-trans-id='"+fixed._innerData+"']").closest(".sapcnqr-title");},
'577131189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("input");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'581489488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".group_label,label").filter(":containsTextNode("+fixed.labelText+")");},
'584294817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button--default").filter("[type="+fixed._elemAttr+"]").closest(".report-header-button-container").find("button.sapcnqr-button").filter(":eq("+fixed.elemLocate+")");},
'584468347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions =  wmjQuery(".add-expense-modal").find(".sapcnqr-modal__title").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-modal__content");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'585806443': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.txt+")").closest("button").last();},
'598073615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id^="+fixed._startId+"]").filter("[id$="+fixed._endId+"]");},
'602951015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='combobox']").filter("[name="+fixed._parentNameAttr+"]").find("[role='textbox']");},
'628256377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.titleText+")").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__control").filter(":mt_visible");},
'628273487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content").find("span").filter("[data-trans-id='"+fixed._elemTransIdAttr+"']").closest("button");},
'631718624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav[class*='sapcnqr-app-header__nav--utility']");},
'644847066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapcnqr-popper']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'646401776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#app-header-container").find("ul[data-test='menu__list-primary'] button[data-test='sapcnqr-shellbar-product-menu']");},
'650718071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__list").find(".sapcnqr-list-item__content").filter(":contains("+fixed.bdiText+")");},
'650930384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id^='"+fixed._tgtIdAttr+"']").first();},
'653756174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.cellLabel+")").closest(".divcell").find("input");},
'660131062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapcnqr-menu-group").find("span[data-trans-legacyid='"+fixed._dataTransLegacyId+"']").closest("[role=menuitem]");},
'666150152': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class^='"+fixed._parentClass+"']").find(":header");},
'671598791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id*="+fixed._tgtId+"]");},
'675098911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-form-group").find("input");
return tgtOptions.length > 1 ? tgtOptions.filter(":last") : tgtOptions;},
'677463850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title").filter(":contains("+fixed.titleText+")").closest(".sapcnqr-modal__header").closest(".sapcnqr-modal__content").find(".sapcnqr-button").filter(":contains("+fixed.elemText+")");},
'685870685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tablist']").find("a").filter("[id="+fixed._tgtId+"]");},
'687073212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=toolbar]").find("button").filter("[data-enablenow-id='"+fixed._dataAttr+"']");},
'687985750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")").find("span[class*='sapcnqr-link__text']");},
'691378562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id='"+fixed._parentAId+"']").find("span");},
'708278451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").filter("[id='"+fixed._elemAttr+"']");},
'712742151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-fieldset__legend").filter(":containsTextNode("+fixed.LabelText+")").siblings(".border-crossing-controls").find("#cnqr-jctrrkGuht");},
'716724389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-form-field__control");},
'716747999': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._tgtId+"']").closest("div");},
'720720321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='x-toolbar']").find(".x-btn-text").filter(":containsTextNode("+fixed.elemText+")");},
'723349694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-messageinline").filter("[data-nuiexp="+fixed._elemAttr+"]").find("div.sapcnqr-messageinline__title");},
'725384701': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[data-id=mytasks]").find("div.my-tasks-card").filter("[data-id='"+fixed._elemId+"']").find(".content").parent();
const newUI = wmjQuery("[data-id=mytasks]").find("li.hhsg-task-tile-item").filter("[data-id='"+fixed._elemId+"']").find(".hhsg-task-tile-content");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'731749109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id="+fixed._labelId+"]").closest(".sapcnqr-form-field").find("input");},
'732542295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-tbar").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'742667764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[aria-label="+fixed._lmAriaLabel+"]").eq(fixed.lmIndex);},
'745695566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i.sapcnqr-icon--trash").closest("button").filter("[data-nuiexp='"+fixed._dataNuiexpAttr+"']");},
'756507736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dialog, .sapcnqr-modal").filter("[data-nuiexp="+fixed._elemForm+"]").find(".sapcnqr-button__text").filter(":containsTextNode("+fixed.elemText+")").closest(".sapcnqr-button");},
'758714446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name^='"+fixed._tgtDataNuiexpAttr+"']").first();},
'761016457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapcnqr-form-group, .sapcnqr-form-field").find(".sapcnqr-input-group__addon, .sapcnqr-select__icon");},
'768765694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel-heading").filter(":containsTextNode("+fixed.headerPanel+")").closest(".cnqr-panel").next().find("input[type='button']").filter("[value="+fixed.btnValue+"]");},
'768902498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-menu']").find("span[data-trans-id*='"+fixed._spanTransId+"']").closest("span.sapcnqr-menu-item__item,button.sapcnqr-menu-button-item__item-button");},
'772874323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar").find("button.sapcnqr-button").filter("[data-nuiexp='"+fixed._elemId+"']");},
'774771840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='group']").filter("[aria-label="+fixed._labelText+"]").find("li[class*='sapcnqr-menu-item__header']");},
'779284692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-checkbox__label").filter(":containsTextNode("+fixed.labelText+")").closest("label").find("input.sapcnqr-checkbox__input");},
'786181580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.headerText+")").closest("[role=dialog]").find(".sapcnqr-modal__body,.sapcnqr-dialog__body");},
'786635175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._titleDataAttr+"']").parent(".sapcnqr-title").closest("[role='dialog']").siblings(".sapcnqr-overlay").find(".sapcnqr-listbox");},
'790408350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".sapcnqr-select-field, .sapcnqr-form-field").find("span.sapcnqr-form-field__input, input").filter(":mt_visible")
},
'793273116': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[data-nuiexp='"+fixed._dataAttr+"']");},
'796227771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").find("span").filter("[data-trans-legacyid='"+fixed._innerAttr+"']").closest(".sapcnqr-modal__header");},
'801269973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=menubar], [class*=sapcnqr-shellbar__right]").find("ul[class*=sapcnqr-shellbar__menu--utility]");},
'815064137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__footer,.sapcnqr-dialog__footer").find("button").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'818137737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=Calendar__sapcnqr-calendar__dates]");},
'821319005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entry-subheader").find("li").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'826013048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-id="+fixed._lmDataId+"]").find("[class*=castle-quick-tasks-item]");},
'834863751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("li[data-element='search-type-round-trip']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'834921900': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".reporttable").find(".sortheader").filter(":containsTextNode("+fixed.lmText+")");},
'835558196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Return Date']").parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'841379493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.cStdForm").filter("[summary='"+fixed._bodyAttr+"']").closest(".sapcnqr-modal").find(".sapcnqr-modal__title");},
'862929406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:not(.icon-with-text-right)").filter(":containsTextNode("+fixed.elemText+")").closest("a.btn-primary.button-style");},
'881088107': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-form-field").parent("div");},
'883480692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='sliver-overview-header-marketing-carrier']").filter(":containsTextNode("+fixed.lmHeader+")").closest("[class*='SliverOverview-module__overview']").find("[data-element='sliver-overview-header-travel-times']").find("time").filter("[datetime='"+fixed._lmTimeStart+"']").next().filter("[datetime='"+fixed._lmTimeEnd+"']").closest("[class*='SliverOverview-module__overview']");},
'887924004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='sapcnqr-app-footer__link']").filter("[data-name="+fixed._tgtName+"]");},
'888567414': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._elemAttr+"']").closest("div.sapcnqr-modal__header");},
'889489566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._elemId+"']").children(".cnqr-panel").children(".cnqr-panel-heading").children("[role='button']");
},
'891611702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const envCheackNew = wmjQuery("nav[class*='sapcnqr-shellbar__nav']:first");
if (envCheackNew.length){
	return wmjQuery("ul[data-test='menu__list-primary']").find("svg[class*='sapcnqr-shellbar__home-icon']").filter("[data-test='SAPConcur_logo']");
}if (!envCheackNew.length){
	return wmjQuery("[data-test='menu__listitem-dashboard']").find("svg[data-test='SAPConcur_logo']").filter(":mt_visible")
}},
'898569331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._inputId+"]").closest("label");},
'915893880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtRow = wmjQuery("tbody").children("tr").eq(fixed.elemRowIndex);
return wmjQuery(tgtRow).find("div").filter(":containsTextNode("+fixed.elemTxt+")").parent(".exp-expName, .expense-type-cell");},
'939628474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("SECTION[class~='" + fixed._sectionClass + "']").find(fixed._tag + "[class~='" + fixed._class + "']");},
'945316643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[data-test='"+fixed._dataAttr+"']").find("span[role='button']");},
'950419032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("input");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'951586887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElem = wmjQuery("ul[class*='sapcnqr-product-menu']").find("ul[class*='sapcnqr-product-menu']").find("a").filter("[data-test="+fixed._button+"]");
const oldElem =wmjQuery("nav[class*='nav--primary']").find("ul[class*='sapcnqr-app-header__menu']").find("a").filter("[data-test="+fixed._button+"]");
const envCheackNew = wmjQuery("nav[class*='sapcnqr-shellbar__nav']");
if (envCheackNew .length && !newElem.length ){
	return "concur_nav"

}
if (newElem.length){
	return newElem
}
if(oldElem.length){
return oldElem
}
return wmjQuery();},
'956651633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").find("[class*='FieldError']");},
'967889156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.lmText+")").closest(".sapcnqr-modal__content");},
'974377898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal, .sapcnqr-dialog").filter("[data-nuiexp="+fixed._dialogData+"]").find(".sapcnqr-modal__title, .sapcnqr-dialog__title");},
'978361437': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("."+fixed._outerClass).find("button");},
'983677624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Departure Date']").parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'984750379': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='" + fixed._nuiexp + "']").find(".sapcnqr-modal__subhead").find(fixed._tag + ":eq(" + dollars[0] + ")");},
'986182652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")").closest(".cnqr-panel-heading").next(".cnqr-panel-body").find("a").filter(":containsTextNode("+fixed.elemText+")");},
'995552144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class*="+fixed._parentClass+"]").children(":header").filter("[class*="+fixed._elemclass+"]");},
'995921452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fieldgroupcell").find("div").filter(":containsTextNode("+fixed.tgtText+")");},
'997819193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-form-field__input,.sapcnqr-select__text-content");},
'1004260096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Return Date']").parent().parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1007334058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").filter("[class*="+fixed._modalType+"]").find(".sapcnqr-modal__title");},
'1007995845': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[data-nuiexp="+fixed._tableAttr+"]").find("tr").filter("[aria-rowindex="+fixed._rowIndx+"]").find("input").filter("[data-nuiexp*="+fixed._lmAttr+"]");},
'1008150066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='searchText']")},
'1015050361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav.expense-breadcrumbs").next(":header").find("span").filter("[data-trans-legacyid='"+fixed._elemId+"']");},
'1027221327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.btnText+")").closest("button").next(".sapcnqr-toolbar__item").find(".sapcnqr-icon--slim-arrow-down").closest("button");},
'1031861732': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.modalHeadet+")").closest(".sapcnqr-modal__header").closest(".sapcnqr-modal__content").find("label").filter(":containsTextNode("+fixed.elemText+")");},
'1038054088': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-nuiexp='exp-save-expense']")},
'1048151574': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter-multi-select")},
'1058959272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeRound]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='ROUND_TRIP']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1062226252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":contains("+fixed.elemText+")");},
'1064931578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp="+fixed._dataAttr+"]").filter(":containsTextNode("+fixed.lmtext+")");},
'1066364537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.cnqr-quicktask").find(".cnqr-outer").filter("[href*='"+fixed._hrefProdAttr+"']").find(".cnqr-inner");},
'1067014945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").filter("[data-nuiexp='"+fixed._labelAttr+"']");},
'1069338497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title span").filter("[data-trans-legacyid='"+fixed._modalId+"']").closest("[role=dialog]").find("input").filter("[id="+fixed._elemId+"]");},
'1090942050': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".expenseTypeSelector__expense-type-item").children("div").filter(":containsTextNode("+fixed.elemTxt+")");},
'1094272598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").filter("[data-test="+fixed._labelText+"]").find("a");},
'1099350281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-messagelist__header-content").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-messagelist__header");},
'1105280129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapcnqr-title").find("span[data-trans-id*='"+fixed._ButtonTransId+"']");},
'1108870539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dialog__header").find(".sapcnqr-title").filter(":containsTextNode("+fixed.lmText+")");},
'1113054689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-qa="+fixed._btnDataQaAttr+"]");},
'1121359359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")");},
'1136590409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id^="+fixed._lmId+"]");},
'1139690188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button--create:first")},
'1142180213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-trans-id='expenseHome.expenseHomeTitle']")},
'1143816470': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".exp-expName").children("div").filter(":containsTextNode("+fixed.elemTxt+")").first();},
'1146350177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entry-content-columns,.entryform-tab-content").find("span[data-trans-id='common.indicatesRequiredField'], span[class*=required]").filter(":containsTextNode("+fixed.elemTxt+")");},
'1147620854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__anchor-dashboard']")},
'1156540347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-inner-panel-header-text").filter(":containsTextNode("+fixed.tableHeader+")").closest(".x-panel-bwrap").find(".x-grid3-scroller");},
'1160399786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-form-field__input,.sapcnqr-select__text-content");},
'1161835420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-form-group, .sapcnqr-form-field").find("input,.sapcnqr-form-field__control"); },
'1170538293': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-qa="+fixed._btnDataAttr+"]").closest("[role=toolbar]").children("div");},
'1173489402': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelFor+"]").closest(".sapcnqr-form-field");},
'1174294544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").find("span").filter("[data-trans-id='"+fixed._dataIdAttr+"']");},
'1175414898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".x-panel").filter("[id="+fixed._panelId+"]").find(".x-panel-footer").find("button");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1176126288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='label_cell']").filter(":containsTextNode("+fixed.labelText+")").closest(".divcell").find(".x-form-field");},
'1182154729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-qa='recallButton']")},
'1207670047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-inner-panel-header-text").filter(":containsTextNode("+fixed.labelText+")").closest("tbody").closest("td");},
'1213873508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu-profile']")},
'1216709562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-element='msg-box-footer-buttonPrimary']")},
'1218422278': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".divcell").find("label").filter("[for$="+fixed._elemForAttr+"]");},
'1220085756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='img']").filter("[data-test="+fixed._innerAttr+"]").closest("button");},
'1222541063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.nuiexp-report-header").find("button.delete-button-trash").closest("div");},
'1224628852': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("fieldset").filter("[data-element="+fixed._fieldsetAttr+"]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[class*=BoundFields-module]").find("input").parent();},
'1242990176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[for='" + fixed._tgtAttr + "']").closest("." + fixed._tgtClass);},
'1245489075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.x-btn-text.c-save-icon")},
'1248491316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":containsTextNode("+fixed.listTitleTxt+")").closest(".sapcnqr-list-item").find(".sapcnqr-button").filter("[data-nuiexp$='"+fixed._labelAttr+"']");},
'1253903141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='field-transactionAmount']")},
'1264613908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").find(".screen-reader-only").filter(":containsTextNode("+fixed.readerOnlyTxt+")").closest("[class*=datePicker]").find("input").closest("[class*=sapcnqr-form-field__control]");},
'1265523918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-spend-forms-v4__legend--is-required-field")},
'1267483183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-grid-list-item").filter("[data-id="+fixed._dataid+"]").find(".sapcnqr-icon-link");},
'1268086586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='result-card-body']").find("[class*='button']").filter("[data-element="+fixed._data_element+"]").filter(":first");},
'1269474903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-checkbox__label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("label").find("input");},
'1277750932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.fieldText+")").closest(".x-form-item").find("a.x-form-arrow-trigger");},
'1280565341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-control-label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-group").find("[role='textbox']");},
'1282345505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__content").find(".sapcnqr-tab-group__button").filter("[data-nuiexp="+fixed._tgtId+"]");},
'1292699062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-id="+fixed._dataIdAttr+"]").find("a[href_production*='"+fixed._href+"']").find(".sapcnqr-link__text");},
'1304008487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapcnqr-menu-button-item").find("button.sapcnqr-menu-button-item__item-button").filter("[data-nuiexp='"+fixed._elemDataId+"']");},
'1311163014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-enablenow-id=" + dollars[0] + "]")},
'1311216059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".name").filter(":containsTextNode("+fixed.lmText+")").closest(".service-card");},
'1313822438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("input");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1325623045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest(".sapcnqr-form-group").find(".sapcnqr-select__text-content");},
'1339934512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapcnqr-popper']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'1347369230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-nuiexp='"+fixed._dataNuiexp+"']").children(".sapcnqr-grid-list-item__body");},
'1350210362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=combobox]").filter("[name="+fixed._nameAttr+"]").closest(".sapcnqr-form-field").find("label");},
'1351906208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button").find("span").filter("[data-trans-legacyid='"+fixed._innerDataAttr+"']").closest(".sapcnqr-toolbar__toolbar");},
'1353493048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqrRequestReportStatus").find(".status-text").filter(":containsTextNode("+fixed.lmText+")");},
'1353509753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid-list").filter("[data-nuiexp="+fixed._grandParentAttr+"]").find(".sapcnqr-data-grid-list__cell").filter("[data-nuiexp="+fixed._parentAttr+"]:eq(" + dollars[0] + ")").find(".sapcnqr-data-grid-list__cell-content");},
'1356368249': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[data-element="+fixed._parentId+"]").find("[aria-haspopup='listbox']");},
'1359604375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._titleAttr+"']").closest(".sapcnqr-modal__container").find(".sapcnqr-modal__body");},
'1359947989': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.hederTxt+")").closest(".sapcnqr-modal__header").find(".sapcnqr-modal__close");},
'1361798849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelAttr+"]");},
'1368103631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.tabTitle+")").closest(".sapcnqr-modal__body").find(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.inputTitle+")").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__input");},
'1368332137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__footer").find("button").filter(":containsTextNodeIgnore("+ fixed.ButtonTransId +")");},
'1369282073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeRound]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='ROUND_TRIP']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1370121806': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".sapcnqr-modal__header,.sapcnqr-dialog__header").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".sapcnqr-modal__content,.sapcnqr-dialog__container");},
'1378487323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*='/expense/admin/expenseTools.asp']")},
'1381103162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._dataAttr+"']");},
'1382576937': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp="+fixed._dataNuiexp+"]").closest(".ere-entry-header").find(".sapcnqr-title");},
'1383490503': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar__item").filter("[id="+fixed._sectionId+"]").find(".sapcnqr-form-field__heading").filter(":containsTextNode("+fixed.labelTxt+")").next(".sapcnqr-form-field__control-container").find(".sapcnqr-form-field__control");},
'1384035134': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[id='"+fixed._listId+"']").find("li").filter("[id*='"+fixed._elemId+"']").children("div");},
'1384286292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[class*='"+fixed._lmclass+"']").find("[role='menuitem']");},
'1401571347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.cellLabel+")").closest(".divcell").find("input").filter("[role="+fixed._inptRole+"]");},
'1406711755': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-id='saveRatesButton']")},
'1409819134': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=sapCnqrSideNavContainer]").find("a,i[role=img]").filter("[aria-label="+fixed.elmAttr+"]").closest("a");},
'1411036626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Departure Date']").parent().parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1415936153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".c-toolbar").filter("[id='"+fixed._containerId+"']").find("button").filter("[id*="+fixed._tgtId+"]");},
'1432214559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=col]").filter("[data-enablenow-id='"+fixed._elemId+"']").find(".cnqr-currency");},
'1436359537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.fieldTxt+")").closest(".sapcnqr-form-group").find(".sapcnqr-input-group");},
'1443033564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode(" + fixed.titleText + ")").closest(".sapcnqr-radio-group");},
'1453140954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._partialId+"]");},
'1459777656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__subhead").find("li").filter(":containsTextNode("+ fixed.tgtText +")");},
'1461262812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._divId+"]").find(".title");},
'1461348157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")");},
'1461977802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-popper li").find("[class*='sapcnqr-listbox-item']").filter(":containsTextNodeIgnore("+fixed.elemText+")"); },
'1474887745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapcnqr-title").find("span[data-trans-legacyid='"+fixed._ButtonTransId+"']");},
'1475510082': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#frmMain").find("h1").filter(":containsTextNode("+fixed.tgtText+")");},
'1476703911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._dataAttr+"']").closest(".sapcnqr-modal").find(".sapcnqr-modal__title");},
'1479956483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapcnqr-menu-group").find("span[data-trans-id='"+fixed._dataTransId+"']").closest("[role=menuitem]");},
'1486040641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=CabinDropdown-module]").find("[class*=sapcnqr-form-field__control]").find("i");},
'1489196873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[title="+fixed.headerText+"]").closest("div.sapcnqr-modal__content").find("div.sapcnqr-modal__body");},
'1489792325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field,.sapcnqr-select-field").filter("[data-nuiexp="+fixed._dataNuiexp+"]").find(".sapcnqr-form-field__input");},
'1494314094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-widgets='menuitem-leaf']").filter("[data-test="+fixed._datatest+"]").find("span");},
'1497102979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-section").find(".expenseit-image-formats-message").children();},
'1500254005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._dataNuiexp+"]").find(".sapcnqr-form-field__input");},
'1513059511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='rate-rules-link-button']")},
'1513489557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapcnqr-form-group__label, .sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group, .sapcnqr-form-field");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1514798077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.cnqr-quicktask").find(".cnqr-outer").filter("[href*='"+fixed._hrefProdAttr+"']").find(".cnqr-inner");},
'1514959785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='search-form-expandable-collapsed-view-button']")},
'1523264876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal").filter("[data-nuiexp='"+fixed._modalAttr+"']").find(".sapcnqr-modal__title");},
'1531527415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.tabcontentdiv").filter("[id="+fixed._tgtId+"]");},
'1536428956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=banner]").find("ul").filter("[data-test="+fixed._ulDataAttr+"]").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'1540940029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=combobox]").filter("[name*="+fixed._elemName+"]").filter(":mt_visible");},
'1541152951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=" + dollars[0] + "]")},
'1542721795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUiElem = wmjQuery("ul.cnqr-tiles.task").find("div[data-id='"+fixed._cardDataId+"']").closest("li");
const newUiElem = wmjQuery(".my-tasks-cards").find(".my-tasks-card").filter("[data-id='"+fixed._cardDataId+"']");
if (oldUiElem.length) {
  return oldUiElem;
}
if (newUiElem.length) {
  return newUiElem;
}
return wmjQuery();},
'1548762273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#coreui-app-header").find("button").filter("[data-test='"+fixed._btnDataTest+"']");},
'1554415281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#"+fixed._panelIdAttr).closest(".cnqr-panel").find(".cnqr-panel-body");},
'1558655015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find("[data-trans-id='"+fixed._elemId+"']");},
'1567896070': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content,.sapcnqr-tab-group__content").find("input").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'1569137864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab").filter("[data-nuiexp="+fixed._tabData+"]").find(".entryform-tab-content");},
'1582102362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._partialId+"]");},
'1589720866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='field-transactionDate']")},
'1592653951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeMulti]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-multi-city']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1593039428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button.sapcnqr-button--secondary.sapcnqr-input-group__button.sapcnqr-button--lg")},
'1597397903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='Minimize column']")},
'1605188061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("#"+fixed._btnParentIdAttr).find("button");},
'1614851095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.x-panel.x-panel-noborder.x-column button.x-btn-text:visible:eq(1)")},
'1616590076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__control");},
'1623072714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").filter("[data-nuiexp="+fixed._labelAttr+"]");},
'1628390588': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tabpanel]").filter("[id="+fixed._panelId+"]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-combobox").filter("[data-element="+fixed._dataElement+"]").find("input");},
'1633267288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='add-item-code-input-field']")},
'1636197016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem = wmjQuery(".sapcnqr-card-deck").find(".sapcnqr-card__title").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapcnqr-card__body").filter(":first");
if (elem.length)
 {return elem;}
return wmjQuery(".sapcnqr-toolbar").find(".sapcnqr-button").filter(":containsTextNodeIgnore("+ fixed.btnText +")").filter(":first");},
'1641674237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-enablenow-id="+fixed._elemId+"]").find("span:first");},
'1651271813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("li[data-element='search-type-round-trip']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1652261779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._btnAttr+"']").closest(".sapcnqr-button__text").closest(".sapcnqr-toolbar").closest(".entryform-tab-content");},
'1653028349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab").filter("[data-nuiexp="+fixed._tabAttr+"]").find("span").filter(":containsTextNode("+fixed.innerTxt+")").closest(".sapcnqr-button");},
'1658605855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-window-footer").find("table").filter("[id='"+fixed._tableId+"']").find(".x-btn-text");},
'1663269215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id="+fixed._labelId+"]").closest(".cnqr-panel-heading").closest(".cnqr-panel");},
'1663551113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button").find("span").filter("[data-trans-id='"+fixed._innerDataAttr+"']").closest(".sapcnqr-toolbar__toolbar");},
'1665548361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__list-primary']").find("[class*='sapcnqr-button__text']").filter(":containsTextNode("+fixed.lmtext+")").closest("[data-test='sapcnqr-shellbar-product-menu']");},
'1690436455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-nuiexp="+fixed._inputDataAttr+"]").closest(".sapcnqr-form-group");},
'1694678008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-nuiexp="+fixed._parentAttr+"]").find("tbody").find("tr").eq(fixed.lmIndex).find("button").filter("[aria-label="+fixed._lmAriaLabel+"]");},
'1699209036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-combobox[data-element="+fixed._dataAttr+"]").find("input");},
'1699984491': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-icon--calendar").closest("button");},
'1702471078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[aria-label='"+fixed._labelAriaLabel+"']").find("[class*='sapcnqr-shellbar-nav-bar__item-text']").filter(":containsTextNode("+fixed.elemText+")");},
'1706460610': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")");},
'1711453445': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
return wmjQuery("section").filter("[data-id="+fixed._sectionDataId+"]").find(":header").filter(":contains("+targetText+")");},
'1713579873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[name=" + dollars[0] + "]")},
'1713831580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href_production$='"+fixed._hrefProdAttr+"']").parent("[role='banner']").find("[class*='sapcnqr-shellbar__menu--utility']");},
'1721021016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".jpt_station").parent("div");},
'1728998838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions =  wmjQuery(".divcell").find("label").filter(":containsTextNode("+fixed.tgtElemText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1734617831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div[class*=col]").find("input");},
'1748893001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button").filter("[aria-label*='"+fixed._tgtName+"']");},
'1750814607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-form-group").find("input"); },
'1762086191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.labelText+")");},
'1764700536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("input").filter("[name*="+fixed._inputAttr+"]").closest("div");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1766666051': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-id]").filter("[data-trans-id='"+fixed._lmAttr+"']").next("span").next("span");},
'1766756566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name=" + dollars[0] + "]")},
'1767965670': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").filter(":containsTextNode("+fixed.modalTitlte+")").closest(".sapcnqr-modal__content").find(".sapcnqr-button").filter(":containsTextNode("+fixed.elemTxt+")");},
'1773283763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toggle-switch__label").filter(":containsTextNode("+fixed.labelText+")");},
'1774647750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=receipt-view]").find(":header.sapcnqr-title").filter(":containsTextNode("+fixed.lmText+")");},
'1777068876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-modal__body").find(".form-inset");},
'1782975209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[name="+fixed._elemName+"], [id="+fixed._elemName+"]");},
'1783469274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1:first")},
'1783554225': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._inptId+"]");},
'1796246438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__input").filter("[data-nuiexp*="+fixed._inputAttr+"]").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__label");},
'1800427644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".expense-entries-skeleton").find("span").filter(":containsTextNode("+fixed.lmText+")").prev("input[type='checkbox']");},
'1806285360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-combo-list-item").filter(":containsTextNode("+fixed.lmText+")");},
'1812761860': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp="+fixed._btnAttr+"]").next(".sapcnqr-toolbar__item").find(".sapcnqr-icon--slim-arrow-down").closest("button");},
'1814151546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='done-button']")},
'1814527342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-administration']")},
'1819605273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblTxt+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").parent();},
'1826506367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name=" + dollars[0] + "]")},
'1827272880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Return Date']").parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1842415767': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#quicktasks-menu").find("ul.nav");},
'1850393269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[href*=" + dollars[0] + "]")},
'1854813595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapcnqr-control-label, label.sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelAttr+")").closest("div.sapcnqr-form-group,.sapcnqr-form-field").find("button.sapcnqr-input-group__button,button.sapcnqr-form-field__button");},
'1857755999': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("div.sapcnqr-modal__content").find("div.sapcnqr-modal__body");},
'1863951983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode(" + fixed.elemText + ")").closest("button[data-nuiexp='ht-new-tab']").siblings("button[data-nuiexp='ht-favorite-tab']");},
'1870608905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-group,.sapcnqr-form-field").filter(":containsTextNode("+fixed.labelTxt+")").find("input,[role=textbox]");},
'1878962167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabcontentdiv").find("select").filter("[id="+fixed._tgtId+"]");},
'1879951621': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.LabelText+")").closest(".delete-step").prev(".approval-flow-steps").find(".sapcnqr-button ");},
'1881647016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem'][class*='sapcnqr-menu-button-item']").filter(":containsTextNode("+fixed.lmtext+")");},
'1892119376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-link").filter("[href$='"+fixed._lmhref+"']").find("i[class*='sapcnqr-icon--plus']");},
'1899125286': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").find("ul").filter("[data-test="+fixed._ulAttr+"]").find("button").filter("[data-test="+fixed._elemAttr+"]");},
'1901610947': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._headerDataAttr+"']").closest(".sapcnqr-modal__header").closest(".sapcnqr-modal").find("button").filter("[type="+fixed._elemType+"]");},
'1904649876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").find("button").filter("[aria-label="+fixed._buttonAl+"]:eq(" + dollars[0] + ")").closest(".sapcnqr-popper__target");},
'1906840871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-fieldset__legend").filter(":containsTextNode("+fixed.LabelText+")").siblings(".border-crossing-controls").find(".sapcnqr-button[aria-describedby*='popper']");},
'1916079223': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputName+"]").closest(".x-panel-body");},
'1921864973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id$='label_cell']:directContains("+fixed.elemText+")");
},
'1929721679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._dataNuiexp+"]").find(".sapcnqr-form-field__input");},
'1931914462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-enablenow-id='"+fixed._dataAttr+"']");},
'1942591534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dialog__title").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-dialog__container");},
'1944405032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test=" + dollars[0] + "]")},
'1952365587': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=sapCnqrSideNavContainer]").find("a").filter("[href_production*='"+fixed._tgtElemHrefProd+"']");},
'1953964518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".x-toolbar-left").find(".x-btn-text").filter(":containsTextNode("+fixed.tgtText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1960838856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[aria-label="+fixed._ulAriaLabel+"]").find("li").eq(fixed.liIndex).find("button");},
'1965914897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._headerDataAttr+"']").closest(".sapcnqr-modal__header").closest(".sapcnqr-modal").find("button").filter("[type="+fixed._elemType+"]");},
'1967697201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:directContains("+fixed.labelText+")").closest(".divcell").find("input").filter(':mt_visible');
},
'1971000578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[id="+fixed._ulAttr+"]").find("a[role='menuitem']").filter(":containsTextNode("+fixed.elemTxt+")");},
'1974712706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=sapCnqrSideNavContainer]").find("a").filter("[href_production*='"+fixed._tgtElemHrefProd+"']");},
'1974918726': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-nuiexp="+fixed._elemData+"]");},
'1975587885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tree__text").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapcnqr-tree__node").find(".sapcnqr-tree__leaf").filter(":eq("+fixed.elmIndex+")").find(".sapcnqr-tree__text");},
'1977216008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='ShowMobile']")},
'1981032381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel[id="+fixed._parentId+"]").children(".cnqr-panel-heading");
},
'1986350217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelAttr+"]").closest("div.sapcnqr-form-group");},
'1989821102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input#txtDiscountCode")},
'1995841450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tablist]").find("a").filter("[title="+fixed.lmTitle+"]");},
'1999140339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firsttry = wmjQuery(":header.sapcnqr-modal__title:containsTextNode("+fixed.headerTxt+")").closest(".sapcnqr-modal__content");
if (firsttry.length >=1 ){
	return firsttry;
}
return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapcnqr-dialog__container");

},
'2002100588': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=flightTabDiv],[id='cnqr-air-search']").find("h3");},
'2006305895': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=sapcnqr-expanded-side-nav__link-container]").filter(":containsTextNode("+fixed.lmText+")").next("i[class*=sapcnqr-icon--navigation-right-arrow]");},
'2006767341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__input, .sapcnqr-form-field__button").filter("[data-nuiexp^='"+fixed._btnDataAttr+"']").closest(".sapcnqr-form-field__control");},
'2019854441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find(":header.sapcnqr-title").filter(":containsTextNode("+fixed.elemText+")").children();},
'2028841897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.tgtText+")").next("select");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2030259575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#coreui-app-header").find("button").filter("[data-test='"+fixed._btnDataTest+"']");},
'2037457276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-nuiexp="+fixed._sectionDataNuiexp+"]").find(".sapcnqr-layout-panel__content").find(".sapcnqr-layout-panel__body");},
'2039290793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-combobox").filter("[data-element="+fixed._dataAttr+"]").find("input");},
'2039800718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__container").find(".expense-type-list__label").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'2044331262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dropdown-menu").find("span[role='menuitem']").filter(":containsTextNode("+fixed.lmText+")");},
'2048016336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("button").filter("[data-nuiexp='"+fixed._elemAttr+"']");},
'2063221535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar").find(".sapcnqr-button").filter(":contains("+fixed.elemtxt+")");},
'2078564409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":containsTextNode("+fixed.lblText+")").closest(".sapcnqr-form-field__heading").closest(".sapcnqr-form-field").find("input");},
'2081538447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title span").filter("[data-trans-id='"+fixed._modalId+"']").closest("[role=dialog]").find("input").filter("[id="+fixed._elemId+"]");},
'2088271741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").find(".sapcnqr-listbox-item__wrapper").filter(":containsTextNode("+fixed.elemText+")");},
'2090952074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first =  wmjQuery("[role='combobox']").filter("[aria-labelledby*="+fixed._lmAttr+"]");
const sec = wmjQuery("input").filter("[aria-labelledby*="+fixed._lmAttr+"]").closest(".sapcnqr-form-field__control");
return first.length ? first : sec;},
'2115170580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=name]").filter(":containsTextNode("+fixed.lmText+")").closest("a");},
'2123320803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("div").find("input");},
'2123720550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-tab-group__content div.sapcnqr-button-toolbar__end button.sapcnqr-button.sapcnqr-button--default.sapcnqr-button-toolbar__item.sapcnqr-button--lg")},
'2133568564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-field").find("input");},
'2136668419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=combobox]").filter("[name*="+fixed._elemName+"]").filter(":mt_visible");},
'2139029533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerElem = wmjQuery("[data-trans-id='" + fixed._tgtAttr + "']").closest("[data-nui-widgets]");
return headerElem.find("label[for='" + fixed._forAttr + "']").filter(":mt_visible");},
'2140195526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._labelAttr+"']").closest("label").closest(".sapcnqr-form-group").find("input");},
'2140309625': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toggle-switch__label").filter(":containsTextNode("+fixed.labelText+")");},
'2140624221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']").find("span[class*='sapcnqr-link__text']");},
'2142068815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tableHeaderCellByText = wmjQuery("th").filter(":containsTextNode("+fixed.columnHeaderDirectTextByIndex+")");
const tableHeaderCellIndex = tableHeaderCellByText ? tableHeaderCellByText.index() : -1;
return tableHeaderCellIndex !== -1 ? tableHeaderCellByText.closest("table").find("tbody").find("td").eq(tableHeaderCellIndex).find("div") : wmjQuery();},
'2143298113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[class*=SelectField__sapcnqr-select-field]").find("i");},
'2144523224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".divcell").find(".formTextDiv");},
'2173789419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu-profile']")},
'2182924937': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-walkmeid='mytasks']")},
'2363954066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='IsExpAcctCodeTracking']")},
'2534206473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.c-save-icon")},
'2599009480': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input#userName")},
'2599632532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name=" + dollars[0] + "]")},
'2745978654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='bSave']")},
'2997408660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-walkme-element-id='canSubmit']")},
'3010987840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type=" + dollars[0] + "]")},
'3174412662': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input#groupByField")},
'3340957807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__anchor-administration_0']")},
'3415791749': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.x-form-text.x-form-field.x-box-item:eq(" + dollars[0] + ")")},
'3434269611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input#UOMFiscalYear")},
'3501253970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-walkme-element-id='PermissionTripLinkPolicy']")},
'3607357203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='AccumulationMethod']")},
'3731469218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-button-toolbar__start button[data-enablenow-id=" + dollars[0] + "]")},
'3798930043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select#ddTravelVendor")},
'4021889226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-walkme-element-id='canAdmin']")},
'4132194628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=" + dollars[0] + "]")},
'4219701336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-administration']")},
'9206620718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[Class*=" + dollars[0] + "]")},
'8733134833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element=" + dollars[0] + "]")},
'8433645520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby=" + dollars[0] + "]")},
'4453839606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='chat-entry-point-button']")},
'7385464151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button.sapcnqr-button--default.sapcnqr-button-toolbar__item")},
'9969136386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".reports")},
'8988691760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=" + dollars[0] + "]")},
'8596166413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-enablenow-id=" + dollars[0] + "]")},
'8529968530': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp=" + dollars[0] + "]")},
'7091249945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ua-line-graph")},
'6834199921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__anchor-expense']")},
'8077052157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#userFormFieldsSave")},
'5670205475': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__button:last")},
'4336746538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#txtTripLinkDiscountCode")},
'9072568785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='continue-button']")},
'6744835885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='add-button']")},
'4413348649': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__anchor-request']")},
'7795257314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#eti-exptypes-dropdown")},
'7388241415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-controls=" + dollars[0] + "]")},
'4709213604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-card__body")},
'5559239142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-grid-list")},
'5840450628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='Close']")},
'7129930581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#ExpenseCompliance-Button")},
'9661872596': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dropdown-menu")},
'6969667341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#ExpenseTypesForExpenses-Button")},
'6150803270': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#activateBtn")},
'4845314508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='add-item-name-input-field']")},
'7348998858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='modal__button']")},
'6353917639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='checkout-form-book-button']")},
'6900214452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='activities-card']")},
'9769582120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#editInviteBtn")},
'8015591547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#sendInviteToAllCheckbox")},
'7496335984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#btnSubmit")},
'4511059534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='Expense']")},
'7659931936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#userSearchTextbox")},
'7462250226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#accountCode")},
'8974349367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#ddRoleName")},
'6484292080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#PermissionTripLinkPolicy")},
'8510058010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-qa=" + dollars[0] + "]")},
'5940996561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp*='submitButton']")},
'6541903260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-switch__slider")},
'9676555767': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#help-portal-menu-toggle")},
'9632037497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-help-portal-menu-toggle']")},
'5970778005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#EmergencyContact")},
'9035921995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#ProcessorSearchValueField_1")},
'7545074807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#PaymentTypes-Button")},
'4727647620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-id='showHistoricCheckBox']")},
'4965196563': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-id=" + dollars[0] + "]")},
'8520274789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".shop-page__results-list-holder")},
'7022792682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#UseHeaderRowCheckbox")},
'9731362141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='no-results']")},
'7587129181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#mileageSaveBtn")},
'5370326180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#product-filter")},
'5002511271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='Product']")},
'8296656773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='search-button']")},
'8295603137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#UserAccounts-Button")},
'4703717680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-describedby='UserAccountsCaption']")},
'9669349922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#CostTracking-Button")},
'5355047026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='confirm-trip-button']")},
'8783530664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".report-add-expense")},
'6186664113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#txtDiscountCode")},
'4793002007': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby='customerServiceTitle']")},
'4898722872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".travel-preference-card")},
'5057892594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#OverdueCctEmailReminderCheckbox")},
'9060555095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id='mytasks']")},
'6216913301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#eti-download-link")},
'8871704589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__listitem-connect']")},
'5330822268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#enable-activation-wizard")},
'6478439442': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#user-list-header th:nth-child(2)")},
'4942381014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".policy-violation-card")},
'7564965157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='policy-violation-comment-input']")},
'9916451476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#canProcess")},
'9778794182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".delivery-and-collection-section")},
'9259707539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='checkout-location-details-button']")},
'7632400449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#search-text-field")},
'5153469211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#expenseApprovalActive")},
'7006457598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='change-search-button']")},
'5958325232': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='cancel-policy-modal-close-button']")},
'5217946657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='star-rating-button']")},
'6953956763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hotel-details-sustainability-awards")},
'7002385406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='hotel-details-sustainability-link']")},
'9677062892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='cost-panel-toggle']")},
'6600411792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#searchFieldsInput")},
'7568663233': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#IsExpAcctCodeTracking")},
'8874502456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='cost-card']")},
'8636521115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-id='country']")},
'9814175824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-muted")},
'7507183933': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='drag-n-drop__button']")},
'8680602142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#fieldInvoiceCopyDownHdr")},
'7549957185': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#saveDelegateChangesBtn")},
'8841625175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#importSubmitBtn")},
'8892069542': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='goback-link']")},
'9006764134': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='itm-save-itemization']")},
'7511230452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-qa='submitButton']")},
'9069349737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='expandable-text-button']")},
'4866916752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='checkout-back-button']")},
'6343162058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='payment-cvv-input']")},
'-1100992441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-menu-item__item").filter(":containsTextNode("+fixed.elmTxt+")");},
'-390621059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("fieldset").filter("[data-element="+fixed._fieldsetAttr+"]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("[class*=BoundFields-module]").find("button");},
'-407439752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-element="+fixed._btnAttr+"]").parent("div");},
'-915438132': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem']").filter("[href_production*='"+fixed._splittedElemHrefProd+"']");},
'-1317072004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='" + fixed._id + "']").siblings(fixed._tag);},
'-894945281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[for='" + fixed._tgtAttr + "']");},
'-942747979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-widgets=" + dollars[0] + "][href*='" + fixed._href + "']").find(fixed._tag);},
'-1980224665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlM = wmjQuery("#quicktasks-menu").find("[href*='/expense?']").find(".action")
const oldNLM = wmjQuery("a[data-id='quicktasks-expenseStartReport']").find("div.quick-task-button-inner");
const newLM = wmjQuery("[class*='create-menu-item'][href*='expense']");
if (oldlM.length){
 return oldlM;
} 
if (oldNLM.length){
 return oldNLM;
} 
if (newLM.length){
 return newLM;
} 
if (!newLM.length && !oldLM.length){
 return "Conc_Create_new_filler";
} 
return  wmjQuery();
},
'-1805829195': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldLM = wmjQuery("a[data-id='quicktasks-expenseStartReport'],#quicktasks a[href*='expense?'] .cnqr-inner")
const newLM = wmjQuery("[class*='create-menu-item'][href*='expense']")
if (oldLM.length){
 return oldLM
} 
if (newLM.length){
 return newLM
} 
if (!newLM.length && !oldLM.length){
 return "Conc_Create_new_filler"
} 
return  wmjQuery()
},
'-62387216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldLM = wmjQuery("nav").find("a.quick-task-button").filter(":containsTextNode("+fixed.elmTxt+")").find(".quick-task-button-inner");
const newLM = wmjQuery("a[class*=create-menu-item]").filter(":containsTextNode("+fixed.elmTxt+")");
if (oldLM.length){
 return oldLM;
} 
if (newLM.length){
 return newLM;
} 
if (!newLM.length && !oldLM.length){
 return "Conc_Create_new_filler";
} 
return  wmjQuery();
},
'-591909603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldLM = wmjQuery("a[data-id='quicktasks-invoiceCreateInvoice'],#quicktasks-menu a[href*='invoice'] .cnqr-inner");
const newLM = wmjQuery("a[class*='create-menu-item'][href*='invoice']");
if (oldLM.length){
 return oldLM;
} 
if (newLM.length){
 return newLM;
} 
if (!newLM.length && !oldLM.length){
 return "Conc_Create_new_filler";
} 
return  wmjQuery();
},
'-1324130350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("legend").filter(":containsTextNode("+fixed.legendTxt+")").closest("fieldset").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-combobox").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1024867861': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='combobox']").filter("[data-nuiexp="+fixed._parentDataAttr+"]").find("span");},
'-1534947737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".c-toolbar").filter("[id='"+fixed._containerId+"']").find("button").filter("[id*="+fixed._tgtId+"]");},
'-1002559431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").filter("[data-nuiexp='"+fixed._labelAttr+"']");},
'-1857649658': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field,.sapcnqr-select-field").filter("[data-nuiexp="+fixed._dataNuiexp+"]").find(".sapcnqr-form-field__input");},
'-1157415628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-menu']").find("span[data-trans-id*='"+fixed._spanTransId+"']").closest("span.sapcnqr-menu-item__item,button.sapcnqr-menu-button-item__item-button");},
'-172392201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar__toolbar").find("button").filter("[data-enablenow-id='"+fixed._elemId+"']");},
'-1992750199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-legacyid='"+fixed._elemId+"']").closest("button");},
'-1513668304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find("[data-trans-legacyid='"+fixed._elemId+"']");},
'-764171695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter("[data-nuiexp='"+fixed._elemId+"']");},
'-26663259': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".attach-receipt-dragdrop").find("button.spend-common__drag-n-drop__button");},
'-2049213010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp="+fixed._dataAttr+"]").filter(":containsTextNode("+fixed.lmtext+")");},
'-243875384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='user-icon-profile'],[data-test='user-icon-avatar-shellbar']").closest("button");},
'-1339110455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1697003312': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']");},
'-757517191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")").find("span[class*='sapcnqr-link__text']");},
'-1701796440': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']").find("span[class*='sapcnqr-link__text']");},
'-2135427731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name=" + dollars[0] + "] span")},
'-735778236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=flightTabDiv],[id='cnqr-air-search']").find("h3");},
'-168310559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeRound]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-round-trip']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1416627063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeOne]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='ONE_WAY']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-216023820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeOne]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-one-way']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1290371758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeMulti]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-multi-city']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1431255214': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[id^=flightseg_airports]").find("input[id^=fltDepCityDisplay]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='origin-location-field']").find("input[data-element='location-suggestion-input']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1757308161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[id^=flightseg_airports]").find("input[id^=fltArrCityDisplay]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='destination-location-field']").find("input[data-element='location-suggestion-input']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1608324418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Departure Date']").parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-2035773041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeMulti]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='MULTI_CITY']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1598660292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav.expense-breadcrumbs").next(":header").find("span").filter("[data-trans-id='"+fixed._elemId+"']");},
'-860047547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav.expense-breadcrumbs").next(":header").find("span").filter("[data-trans-legacyid='"+fixed._elemId+"']");},
'-123475802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").find("input").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'-1478278353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").find("div").filter("[id="+fixed._elemAttr+"]").find("input");},
'-1768850513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").find("div").filter("[name="+fixed._elemAttr+"]").find("input");},
'-1871236703': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElem =wmjQuery("ul[class*='sapcnqr-product-menu']").find("a").filter("[data-test="+fixed._button+"]").closest("li[areaurls]").find("a")
const middleNewElem = wmjQuery("ul[class*='sapcnqr-product-menu']").find("a").filter("[data-test="+fixed._button+"]").find("span.sapcnqr-product-menu__anchor-span").closest("span[class*='sapcnqr-product-menu__linktext']");
const oldElem =wmjQuery("nav[class*='nav--primary']").find("ul[class*='sapcnqr-app-header__menu']").find("a").filter("[data-test="+fixed._button+"]").find("span[class*='sapcnqr-app-header__linktext']");
const envCheackNew = wmjQuery("nav[class*='sapcnqr-shellbar__nav']:first");
if (envCheackNew .length && !newElem.length && !middleNewElem.length){
	return "concur_nav"
}if (middleNewElem.length){
	return middleNewElem
}if(newElem.length){
	return newElem
}if(oldElem.length){
return oldElem
}
return wmjQuery();},
'-461915008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._tgtId+"]").children("div").children(".sapcnqr-section").find(".sapcnqr-section__heading");},
'-231756023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[name="+fixed._tgtName+"]");},
'-1542534807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[id="+fixed._tgtName+"]");},
'-1143638734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='group']").filter("[aria-label="+fixed._labelText+"]").find("li[class*='sapcnqr-menu-item__header']");},
'-831660876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").find("a").filter("[data-test='"+fixed._tgtTitle+"']");},
'-872609551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapcnqr-form-field__heading").next().find("input.sapcnqr-form-field__input");},
'-81304001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-modal__content").find(".sapcnqr-modal__body");},
'-8520971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__anchor']").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-722937489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-card__title").filter(":containsTextNode("+fixed.titleText+")").closest(".sapcnqr-card__body");},
'-1445883746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._tgtLabel+"]").closest(".sapcnqr-form-group").find(".sapcnqr-select__text-content");},
'-1565202543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest(".sapcnqr-form-group").find("i.sapcnqr-icon");},
'-618656661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content").find("span").filter("[data-trans-id='"+fixed._elemTransIdAttr+"']").closest("button");},
'-184502537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-nuiexp="+fixed._elemDataNuiexpAttr+"]").closest("div");},
'-1051111149': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.required").filter(":containsTextNode("+fixed.lmLabelText+")").closest(".divcell").find(".x-form-arrow-trigger"); },
'-1076272194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("form").filter(":containsTextNode("+fixed.labelTxt+")").find("input");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-330405520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.fieldLabeltxt+")").closest(".sapcnqr-form-group").find(".sapcnqr-select");},
'-1243567527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input, textarea").filter("[name="+fixed._elemAttr+"]");},
'-931623215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapcnqr-form-group__label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-group").find("input").filter("[type="+fixed._elemAttr+"]");},
'-454357102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.tgtLabel+")").closest(".divcell").find("input");},
'-891025036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.tgtLabel+")").closest(".sapcnqr-form-group").find("input");},
'-223849851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id='mytasks-availablecardcharges']").find("h3").filter("[id='"+fixed._tgtId+"']");},
'-377618709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id*="+fixed._tgtId+"]");},
'-1575694715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title").filter("[title="+fixed.elemHeaderAttr+"]").closest("div.sapcnqr-modal__content");},
'-775552742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^='sapcnqr-app-header__content']").find("button").filter("[data-test="+fixed._btnDataTestAttr+"]");},
'-1384459322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapcnqr-control-label").filter(":containsTextNode("+fixed.labelAttr+")").closest("div.sapcnqr-form-group").find("button.sapcnqr-input-group__button");},
'-393854612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").find("div, span").filter(":directContains("+fixed.elemText+")");},
'-300725880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-authtype="+fixed._elemAttr+"]");},
'-2140024020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.searchbutton").filter("[aria-label="+fixed._elemAttr+"]");},
'-1268652526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelTxt+")").closest(".divcell").find("input").filter(":mt_visible");},
'-612063913': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-id]").filter("[data-trans-id='"+fixed._labelAttr+"']").closest("button.sapcnqr-button");},
'-1863220796': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-legacyid]").filter("[data-trans-legacyid='"+fixed._labelAttr+"']").closest("button.sapcnqr-button");},
'-1387587756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._tgtText+"']").closest(".sapcnqr-button__text").closest(".sapcnqr-button");},
'-162647142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._tgtName+"']").closest(".sapcnqr-button__text").closest(".sapcnqr-button");},
'-557427193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").find("span").filter("[data-nuiexp='"+fixed._tgtName+"']");},
'-502413230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".expense-report__page_header").find("span").filter("[data-nuiexp='"+fixed._tgtName+"']");},
'-1285280163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-button-toolbar").find("button").filter("[data-nuiexp='"+fixed._btnDataAttr+"']");},
'-1953883112': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[id="+fixed._tgtId+"]").find(".totalValue");},
'-490524866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id="+fixed._tableId+"]").find("span.totalValue").filter("[id="+fixed._tgtId+"]");},
'-902122200': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._tgtId+"']").closest("div");},
'-1046609138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=tabpanel]").filter("[id='"+fixed._elemId+"']").find(".dropdown-menu-expensetypes");},
'-1519855395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=menuitem]").find("span").filter("[data-trans-id='"+fixed._tgtId+"']");},
'-973897659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__content").find(".sapcnqr-tab-group__button").filter("[aria-controls="+fixed._tgtId+"]");},
'-1468207332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='option']").filter("[data-nuiexp="+fixed._labelId+"]").find(".sapcnqr-button--primary");},
'-368624598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[id="+fixed._tgtId+"]").find(".x-tab-strip-text");},
'-157305551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").filter(":containsTextNode("+fixed.titleTxt+")").next(".sapcnqr-modal__body");},
'-1196611521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapcnqr-form-control").filter("[id*="+fixed._elemId+"]");},
'-1972827213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=combobox]").filter("[id='"+fixed._continerId+"']").find(".sapcnqr-select__text-content,input");},
'-131027370': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.expense-entries-table").find("tfoot.sapcnqr-data-grid__footer").find("td.currency-cell").prev("td");},
'-1407273277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".base-receipt-modal").find(".sapcnqr-modal__header").filter(":containsTextNode("+fixed.elemTxt+")");},
'-698685688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-group__label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-group").find(".sapcnqr-select__text-content");},
'-108956403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapcnqr-form-group__label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1695125425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-tbar").find("table").filter("[id="+fixed._labelId+"]").find("button");},
'-1626880402': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-window-footer").find(".x-btn-text").filter(":containsTextNode("+fixed.tgtText+")");},
'-1589475764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-window-footer").find(".x-toolbar-cell").find("button").filter(":containsTextNode("+fixed.tgtText+")");},
'-517642639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-group__label").filter(":containsTextNode("+fixed.elemText+")");},
'-1181281581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=tabpanel]").filter("[id='"+fixed._elemId+"']").find("[class*='dropdown-menu-expensetypes']");},
'-1087979865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().find(".sapcnqr-control-label__required,.sapcnqr-form-field__required");},
'-1274922347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.lmText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-input-group__addon,.sapcnqr-form-field__decorator");},
'-540550030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class*='sapcnqr-app-header__menu']").find("a").filter("[data-test='"+fixed._elemContainerDataSet+"']").find("svg").filter("[data-test='"+fixed._elemDataSet+"']");},
'-737891671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let v1 = wmjQuery("label").filter(":contains("+fixed.labelText+")").next(".sapcnqr-select").find("[role='textbox']");
if(v1.length){
  return v1;
}
return wmjQuery(".sapcnqr sapcnqr-form-field__heading").next(".sapcnqr-popper__target").find("[role='textbox']");
},
'-1547915348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const headerCellIdx = wmjQuery("div[class*=ReqItemEd]").filter(":containsTextNode("+fixed.cellTitle+")").closest("td").index() -1;
console.log(headerCellIdx)
return  wmjQuery("div[class*=ReqItemEd]").filter(":containsTextNode("+fixed.cellTitle+")").closest("div[class*=viewport]").find("div[class*=scroller]").find("td.editableGridCell:eq("+headerCellIdx+")").find("div");},
'-2078742982': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-form-group__input,.sapcnqr-select__text-content,.sapcnqr-select-field__input");;},
'-1270288193': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title").filter(":containsTextNode("+fixed.modalTitleText+")").closest(".sapcnqr-modal__content").find(".sapcnqr-modal__header");},
'-491959717': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title").filter("[title="+fixed.modalTitleText+"]").closest(".sapcnqr-modal__content").find(".sapcnqr-modal__header");},
'-1792118500': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-field,.sapcnqr-form-group").find(".sapcnqr-form-field__input,.sapcnqr-form-group__input");},
'-1673161490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[name="+fixed._tgtName+"]");},
'-1318430630': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[id="+fixed._tgtName+"]");},
'-1665449644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".x-toolbar-left").find(".x-btn-text").filter(":containsTextNode("+fixed.tgtText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-980905177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1373438153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']");},
'-1770125461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._navBarDataTest+"']").find("svg").filter("[data-test="+fixed._elemDataTest+"]");},
'-1021010441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#ListHelperCard").find("[class*='cell-inner']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-527569686': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-column-layout-ct").filter(":containsTextNode("+fixed.labelTxt+")").find("button.btn_af_insert_above");},
'-1242150472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar__start").find("button").filter("[data-nuiexp='"+fixed._elemAttr+"']");},
'-2051677575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.x-toolbar-cell").find("span").filter(":containsTextNode("+fixed.labelText+")");},
'-2048108060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#createNewExpense-tab .sapcnqr-list").find("li:not(.menu-category-item)").filter(":eq("+fixed.listIndex+")").find("ul").find("li.sapcnqr-list-item").filter(":eq("+fixed.tgtInd+")").find(".sapcnqr-button");
},
'-1187485064': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".add-expense-modal__tabs__new-expense .sapcnqr-list").find("li:not(.menu-category-item)").filter(":eq("+fixed.listIndex+")").find("ul").find("li.sapcnqr-list-item").filter(":eq("+fixed.tgtInd+")").find("button");
},
'-223643681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid__body").find("tr").eq(fixed._closestTrIndex).find("button").filter("[aria-label='"+fixed._tgtAriaLabelAttr+"']").filter(":has(.sapcnqr-icon--upload)");},
'-738436683': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-modal__close").filter(":last");},
'-1068788302': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":containsTextNode("+fixed.headerText+")").closest("li").find(".menu-category-item__button").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-886785974': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-id='"+fixed._dataAttr+"']").closest("button");},
'-559846257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tabpanel']").filter("[id="+fixed._sectionId+"]").closest("div.tabcontent");},
'-571196787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tabpanel']").filter("[id="+fixed._sectionId+"]").find("h3").filter(":containsTextNode("+fixed.tgtText+")");},
'-1650481301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-mytasks").find(":header").filter(":contains("+fixed.labelText+")");},
'-1956815095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":contains("+fixed.headerText+")").closest(".sapcnqr-section").find(".sapcnqr-grid-list");},
'-468218161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.labelText+")").closest("section.sapcnqr-section");},
'-978252207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toggle-switch[id='"+fixed._idAttr+"']").parent("div");},
'-59942929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel-heading").find("a").filter("[id="+fixed._tgtId+"]");},
'-981953531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel-heading").find("a").filter("[id="+fixed._labelId+"]").closest("h2");},
'-23844655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='radiogroup']").filter("[aria-label="+fixed._labelText+"]").parent("div");},
'-377855970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._labelId+"]").parent(".x-panel-body");},
'-541416633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid__select-all").closest(".sapcnqr-data-grid__header-text");},
'-1121130340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid__row").find("button[class*='spend_receipts--add-receipt-button']")},
'-2097707509': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("input[id=tripTypeOne]").next("label").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[id*='ONE_WAY']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1196617815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[id^=flightseg_airports]").find("input[id^=fltDepCityDisplay]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='origin-location-field']").find("input[data-element='location-suggestion-input']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-2119430043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[id^=flightseg_airports]").find("input[id^=fltArrCityDisplay]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='destination-location-field']").find("input[data-element='location-suggestion-input']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1405483583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("#flighttype").find("label[for=tripTypeOne]").filter(":mt_visible");
const newElem = wmjQuery("[data-element='search-type-toggle']").find("li[data-element='search-type-one-way']").filter(":mt_visible");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'-1726551150': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-field,.sapcnqr-form-group").find("[class*='sapcnqr-icon--arrow']").closest("button.sapcnqr-form-field__button ");},
'-425541411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest(".sapcnqr-select-field").find("span.sapcnqr-form-field__input").filter(":mt_visible");},
'-2056381389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-select-field--custom-input-value").find(".sapcnqr-select-field__input");},
'-415218415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".sapcnqr-form-group,.sapcnqr-form-field").find(".sapcnqr-form-field__input,.sapcnqr-select__text-content").filter(":contains("+fixed.lmText+")");},
'-933137868': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#reportsFilter").closest(".sapcnqr-dropdown__label"); },
'-1699823417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav.expense-breadcrumbs").next(":header").find("span").filter("[data-trans-id='"+fixed._elemId+"']");},
'-699981545': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-id='"+fixed._elemId+"']").closest("button");},
'-1710874426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".attach-receipt-dragdrop").find("button.spend-common__drag-n-drop__button");},
'-24085762': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-menu']").find("span[data-trans-legacyid*='"+fixed._spanTransId+"']").closest("span.sapcnqr-menu-item__item,button.sapcnqr-menu-button-item__item-button");},
'-2031128328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='combobox']").filter("[data-nuiexp="+fixed._parentDataAttr+"]").find("span");},
'-1189541381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[name='"+fixed._parentNameAttr+"']").find("label");},
'-1514202221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._inputIdAttr+"]").closest(".sapcnqr-form-group");},
'-429107584': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputNameAttr+"]").closest(".sapcnqr-form-group");},
'-1506042481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._headerDataAttr+"']").parent(":header").closest(".sapcnqr-modal__content");},
'-1114245768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._headerDataAttr+"']").parent(":header").closest(".sapcnqr-modal__content");},
'-720244604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapcnqr-modal__header").closest("[role='document']");},
'-495241308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id='"+fixed._tableId+"']").find("button");},
'-233965203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("input").filter("[id*="+fixed._noNumsId+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1050829096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._divDataAttr+"]").parent("[role='group']").find(".segment-header").find("span");},
'-1401432246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id="+fixed._buttonId+"]").closest("[role=toolbar]").children("div");},
'-116168799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=alertdialog]").find("span").filter(":containsTextNode("+fixed.innerTxt+")").parent("button");},
'-372762750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").find("span").filter("[data-trans-legacyid='"+fixed._dataAttr+"']");},
'-648782520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1912508145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test="+fixed._elemDataAttr+"]");},
'-1468713083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id]").filter("[id="+fixed._spanId+"]").closest("ul");},
'-1984126905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-form-field").parent("div");},
'-209709599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[id="+fixed._imgId+"]").closest(".title");},
'-2012655068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._divId+"]").find(".sapcnqr-layout-panel");},
'-404378095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-nuiexp="+fixed._DataAttr+"]").children("header");},
'-150343680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._labelDataAttr+"']").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__input");},
'-75443914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._labelDataAttr+"']").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__input");},
'-59623673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-nuiexp="+fixed._parentDataAttr+"]").children(".sapcnqr-select-field").find(".sapcnqr-select-field__input");},
'-2033179128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-window-header-text").filter(":containsTextNode("+fixed.modalHeaderTxt+")").closest("#DistributionsWindow").find("button").filter(":containsTextNode("+fixed.lmTxt+")");},
'-1317834958': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp='"+fixed._btnDataAttr+"']").closest("div");},
'-95086499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._siblingId+"]").siblings("[role='combobox']");},
'-341462723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name$="+fixed._siblingName+"]").siblings("[role='combobox']");},
'-977386000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar").find("span").filter(":containsTextNodeIgnore("+fixed.innerTxt+")").parent(".sapcnqr-button");},
'-124142833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ere-entry-header").find("span").filter(":containsTextNodeIgnore("+fixed.innerTxt+")").parent(".sapcnqr-button");},
'-807456073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-quicktask").find("div").filter(":containsTextNode("+fixed.elemText+")");},
'-489314038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content,.sapcnqr-tab-group__content").find("input").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'-722081041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._divId+"]").find("span").filter(":containsTextNode("+fixed.innerTxt+")").closest(".sapcnqr-button");},
'-235503690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-shellbar-nav-bar").find("a").filter("[href_production*='"+fixed._href_ProdAttr+"']").closest(".sapcnqr-shellbar-nav-bar");},
'-345018372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='label_cell']").filter(":contains("+fixed.inputLabel+")").closest(".divcell").find("input.x-form-field");},
'-1627199465': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='Request.RequestLineItemAddEditGrid']").find("div[class*='cell-inner'][class*='Custom"+fixed._elemClassNum+"']");},
'-1594433386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='Request.RequestLineItemAddEditGrid']").find("input.x-form-field[id*='Custom"+fixed._elemClassNum+"']");},
'-955440786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[data-nuiexp="+fixed._dataAttr+"]").find("label");},
'-2100381336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".receipt-tabs").find("span").filter("[data-nuiexp="+fixed._childData+"]").parent(".sapcnqr-title");},
'-1903499141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[data-trans-legacyid]").filter("[data-trans-legacyid='"+fixed._innerData+"']").closest(".sapcnqr-title");},
'-359674030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-btn").filter("[id='"+fixed._btnId+"']").closest(".cnqr-vendor-panel").find(".formFieldText");},
'-238513780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-id="+fixed._parentData+"]").children("div");},
'-956610918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._outerId+"]").find(".sapcnqr-title");},
'-1290627554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-legacyid='"+fixed._titleDataAttr+"']").parent(".sapcnqr-title").closest("[role='dialog']").siblings(".sapcnqr-overlay").find(".sapcnqr-select__listbox");},
'-1746831269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-nuiexp="+fixed._parentData+"]").children("div");},
'-2033146929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._divData+"]").find(".sapcnqr-layout-panel");},
'-808469156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputAttr+"]").closest(".sapcnqr-form-field");},
'-1662894077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-nuiexp="+fixed._inputAttr+"]").closest(".sapcnqr-form-field");},
'-928220745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__control");},
'-1749550921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-test]").filter("[data-test="+fixed._dataAttr+"]").find("button");},
'-194220723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find(":header").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1432929881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.nextButtonText+")").closest(".attach-receipt-dragdrop").find(".sapcnqr-icon");},
'-666213473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".spend-forms-checkbox").find(".sapcnqr-checkbox__label").filter(":containsTextNode("+fixed.lmText+")");},
'-329938173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id="+fixed._formAttr+"]").find("input").filter("[type="+fixed._inputType+"]");},
'-610595581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[name="+fixed._formAttr+"]").find("input").filter("[type="+fixed._inputType+"]");},
'-198271084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[data-nuiexp="+fixed._outerAttr+"]").find("[role='combobox']");},
'-1344565894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[data-nuiexp="+fixed._outerAttr+"]").find(".sapcnqr-form-field__control");},
'-83935692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__control, .sapcnqr-form-field__input").filter("[name="+fixed._nameAttr+"]").closest(".sapcnqr-form-field__control-container").find(".sapcnqr-form-field__input");},
'-1196723796': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__control").filter("[data-nuiexp*="+fixed._controlAttr+"]").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__label");},
'-1317204672': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.innerTxt+")").closest("label").closest(".sapcnqr-form-field__heading");},
'-1991298488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id='"+fixed._labelAttr+"']").closest("label").closest(".sapcnqr-form-group").find("input");},
'-1448023146': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp='"+fixed._dataAttr+"']");},
'-1304818830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find("[data-trans-id='ExpenseJS.createNewReport'],[data-trans-id='ExpenseJS.reportInfo']").closest(".sapcnqr-title");},
'-1462269643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel-nav").find("a").filter("[href_production*='"+fixed._hrefProd+"']");},
'-837373115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[id="+fixed._ulAttr+"]").find("a[role='menuitem']").filter("[href_production*='"+fixed._hrefProd+"']");},
'-1824615436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").find("[class*=sapcnqr-shellbar__link],[class*=sapcnqr-link__text]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1064410529': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-listbox__label").filter(":containsTextNode("+fixed.headerLabelTxt+")").closest(".sapcnqr-listbox__group").find("li").filter(":eq("+fixed.elemIndex+")").find(".sapcnqr-listbox-item__wrapper");},
'-1585996750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*=heading]").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1891211638': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapcnqr-menu-button-item").find("button.sapcnqr-menu-button-item__item-button").filter("[data-nuiexp='"+fixed._elemDataId+"']");},
'-659375213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title span").filter("[data-trans-id='"+fixed._modalId+"']").closest("[role=dialog]").find("textarea").filter("[id="+fixed._elemId+"]");},
'-241909723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title span").filter("[data-trans-legacyid='"+fixed._modalId+"']").closest("[role=dialog]").find("textarea").filter("[id="+fixed._elemId+"]");},
'-622157155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id="+fixed._formId+"]").find("input").filter("[id="+fixed._elemId+"]");},
'-1238971755': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id="+fixed._formId+"]").find("textarea").filter("[id="+fixed._elemId+"]");},
'-287906461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-date-picker__popper-contents").find("[data-calendar-action='month-view-toggle']");},
'-1742321957': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.tgtText+")").closest(".sapcnqr-modal__content");},
'-652995181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[data-id=quicktasks]").find("a[href*='"+fixed._hrefProdAttr+"']").find(".quick-task-button-inner");
const newUI = wmjQuery("nav[data-id=quicktasks] a[href*='"+fixed._hrefProdAttr+"']");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'-1467510088': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const reskinUI = wmjQuery(".is-hhsg");
if(reskinUI.length) {
	return wmjQuery("[data-id=mytasks]").find("a").filter("[href*='"+fixed._hrefProdAttr+"']").closest(".hhsg-task-tile-item");
}
return wmjQuery("[data-id=mytasks]").find("a.header").filter("[href*='"+fixed._hrefProdAttr+"']").closest(".my-tasks-card");
},
'-1425935310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[data-id=mytasks]").find("div.my-tasks-card").filter("[data-id='"+fixed._elemId+"']").find(".content svg");
const newUI = wmjQuery("[data-id=mytasks]").find("li.hhsg-task-tile-item").filter("[data-id='"+fixed._elemId+"']").find("svg");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'-1230216653': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUiElem = wmjQuery("ul.cnqr-tiles.task").find("h3").filter(":containsTextNodeIgnore("+fixed.elemTitle+")").closest("li");
const newUiElem = wmjQuery(".my-tasks-cards").find("h3").filter(":containsTextNodeIgnore("+fixed.elemTitle+")").closest(".my-tasks-card");
if (oldUiElem.length) {
  return oldUiElem;
}
if (newUiElem.length) {
  return newUiElem;
}
return wmjQuery();},
'-948801869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__footer").find(".sapcnqr-button[data-nuiexp*='"+fixed._ButtonTransId+"']");},
'-783172182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":containsTextNode("+fixed.listLabelText+")").closest("li").find("ul");},
'-325617501': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab").filter("[id="+fixed._tabId+"]").closest(".sapcnqr-tab-group__content");},
'-1265544068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-list__label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find("button").filter(":containsTextNode("+fixed.elemText+")");},
'-972624768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter(":containsTextNodeIgnore("+fixed.labelTxt+")");},
'-2132748626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".quick-task-button-label").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("a");},
'-95166985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.labeltext+")").closest("[data-nuiexp*='amount-remaining']");},
'-1856581411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.cellLabel+")").closest(".divcell").find("input").filter("[role="+fixed._inptRole+"]");},
'-1563768812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id*="+fixed._labelId+"]").closest(".divcell").find("input");},
'-92415902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[class*='sapcnqr-site-banner-']");},
'-1185556871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-title").filter(":containsTextNode("+fixed.headerText+")").closest(".x-panel.FramedPanel").find("label").filter(":containsTextNode("+fixed.lmText+")");},
'-799425327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapcnqr-listbox__label").filter(":containsTextNode("+fixed.tgtDirectText+")");},
'-1344530988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tabpanel]").filter("[id="+fixed._panelId+"]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-combobox").find("input");},
'-1344217661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid=" + dollars[0] + "]").find("DIV[class~=" + dollars[1] + "] > " + fixed._tag);},
'-1213556592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-grid-list-item").filter("[data-id="+fixed._gridListDataId+"]").find(".sapcnqr-title");},
'-1530513046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id=" + dollars[0] + "]").find(fixed._tag + "[class~=" + dollars[1] + "]");},
'-374588306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class*="+fixed._parentClass+"]").children("div").filter("[data-nuiexp="+fixed._dataNuiexp+"]");},
'-281846046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".x-toolbar").find("button").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-964465292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='heading']").filter("[data-element="+fixed._formlabelbydta+"]").find("[class*='checkinCheckoutTimes']");},
'-1489828580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[id*="+fixed._splitLiId+"]").find("[class^='ListboxItem__sapcnqr-listbox-item__wrapper-']");},
'-1490225536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("fieldset").filter("[data-element="+fixed._fieldsetDataElement+"]").find("[class*='FormField__sapcnqr-form-field--']").filter("[data-element="+fixed._dataElement+"]").find('[class*="Icon__sapcnqr-icon--arrow-"]');},
'-706299954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hhsg-qt-item-display-container").filter("[data-id="+fixed._containerDataId+"]").find(".sapcnqr-button--lg");},
'-351032814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.panelHeader+")").closest(".cnqr-panel-heading").next(".cnqr-panel-body");},
'-1718688467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='location-autocomplete-option']").filter(":contains("+fixed.lbltxt+")").closest("[class*='listbox-item']").filter("[class*="+fixed._elemclass+"]");},
'-1723096417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='shop-grid']").find(".sapcnqr-button").filter("[data-element="+fixed._data_element+"]").filter(":first");},
'-37081266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".sapcnqr-form-field").find("input");},
'-1472569990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hhsg-qt-name").filter(":containsTextNode("+fixed.lmText+")").closest(".sapcnqr-link__text");},
'-703586976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-id="+fixed._dataid+"]").find(".sapcnqr-avatar");},
'-1284369606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hhsg-qt-name").filter(":containsTextNode("+fixed.elmTxt+")").closest("a").find(".sapcnqr-avatar");},
'-1919609561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.elemText+")");},
'-551052239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".x-panel").find(".x-panel-bwrap");},
'-170540036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".x-panel-header-text").filter(":containsTextNode("+fixed.headerTxt+")").closest(".x-panel").find("div[class*=scroller]");},
'-1394043684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")").closest(".sapcnqr-modal__header");},
'-969548655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^='sapcnqr-user-profile-menu__list-item-content']").filter(":containsTextNode("+fixed.elemText+")");},
'-477794931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-shellbar-nav-bar").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1644932795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._inputAttr+"]").closest("div").find(".x-form-arrow-trigger");},
'-13648014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("input").filter("[id*="+fixed._inputAttr+"]").closest(".x-form-field-wrap");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1096047153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._inputAttr+"]").closest(".form-field-wrapper");},
'-1509855299': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[aria-colindex="+fixed._tdColIndex+"]").find("span").filter(":containsTextNode('"+fixed.labelText+"')").closest("table").find("tr").filter("[aria-rowindex='"+fixed._trRowIndex+"']").find("td").filter("[aria-colindex="+fixed._tdColIndex+"]").find("input");},
'-1278793569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._divDataNuiexp+"]").find(".sapcnqr-layout-panel__body");},
'-548825700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[aria-label="+fixed._navAriaLabel+"]").next(".ere-entry-header").find(":header");},
'-156822044': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".report-header").filter("[data-nuiexp="+fixed._parentDataNuiexp+"]").find(".sapcnqr-dialog__body");},
'-1610079903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button__text").filter(":containsTextNode("+fixed.btntxt+")").closest(".sapcnqr-button--link");},
'-1501294096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formContainer").find("label:containsTextNode("+fixed.labelTxt+")").closest(".divcell").find("input.x-form-field");},
'-215433038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-toolbar").find(".sapcnqr-form-field__input");},
'-1921698984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest(".sapcnqr-layout-panel__header").closest("section").find(".sapcnqr-dropzone");},
'-560042406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-test="+fixed._elemAttr+"]");},
'-294561101': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapcnqr-data-grid__header-text").filter(":containsTextNode("+fixed.thText+")").closest("thead").next("tbody").find("tr").filter("[aria-rowindex="+fixed._lmRowIndex+"]").find("td").filter("[aria-colindex="+fixed._lmCellIndex+"]").find("input");},
'-1365096677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[id="+fixed._lmId+"]").filter(":mt_visible");},
'-1357291141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__heading").filter(":contains("+fixed.labelText+")").closest(".sapcnqr-form-field").find(".sapcnqr-form-field__input");},
'-362629201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.fieldLabel+")").closest(".sapcnqr-form-field").parent("div");},
'-1723846347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-toolbar__title").filter(":containsTextNode("+fixed.elmtxt+")");},
'-551330710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-popper").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'-1972379346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-listbox-item__wrapper").filter(":containsTextNode("+fixed.elemText+")");},
'-845531628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").filter("[data-id="+fixed._navDataId+"]").find("a").filter("[data-id="+fixed._lmDataId+"]");},
'-1368159456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=HotelSearch-module]").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-combobox").find("input");},
'-100000000001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[id=featured]").find("div[id="+fixed._elemId+"]").find("h2").find("span");
const newUI = wmjQuery(".widget").filter("[data-id="+fixed._elemId+"]").find("h2");
if (oldUI.length) {
  return oldUI;
}
if (newUI) {
  return newUI;
}
return wmjQuery();},
'-100000000002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery(".cnqr-section").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("h2").find("span");
const newUI = wmjQuery(".widget").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("h2");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'-100000000003': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("[id=featured]").find("div[id="+fixed._elemId+"]").find("h2");
const newUI = wmjQuery(".widget").filter("[data-id="+fixed._elemId+"]").find("h2");
if (oldUI.length) {
  return oldUI;
}
if (newUI) {
  return newUI;
}
return wmjQuery();},
'-100000000004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery(".cnqr-section").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("h2");
const newUI = wmjQuery(".widget").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("h2");
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'-100000000008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("div").filter("[data-id='"+fixed._elemId+"']").find("div.cnqr-inner");
const newUI = wmjQuery("div").filter("[data-id='"+fixed._elemId+"']").find("div.content").parent();
if (oldUI.length) {
  return oldUI;
}
if (newUI.length) {
  return newUI;
}
return wmjQuery();},
'-100000000009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has(.count)").filter(":containsTextNodeIgnore("+fixed.cardTitleText+")").closest("h3").next("div");},
'-100000000005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find(".cnqr-inner,.body").find("[class*='date']");},
'-100000000006': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find(".cnqr-inner,.body").find(".cnqr-bold,.item-name");},
'-100000000007': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find(".cnqr-inner,.body").find(".cnqr-bold,.item-name").siblings("div");},
'-100000000010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-mytasks,.my-tasks-cards").find(":header").filter(":containsTextNode("+fixed.labelDirectText+")");},
'-100000000011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find("a").filter("[href_production*='"+fixed._tgtHrefProdAttr+"']").parent(":header");},
'-100000000012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-mytasks,.my-tasks-cards").find("a").filter(":containsTextNode("+fixed.labelDirectText+")");},
'-100000000013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find("a").filter("[href_production*='"+fixed._tgtHrefProdAttr+"']");},
'-100000000014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.labelDirectText+")").children(".count");},
'-100000000015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-id="+fixed._containerDataIdAttr+"]").find(".count");},
'-100000000017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-tiles,.widget").find("h3").filter(":containsTextNode("+fixed.elemTxt+")").parent();},
'-100000000016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-tiles,.widget").find("div").filter("[data-id='"+fixed._elemDataId+"']");},
'-80990554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapcnqr-title").find("span[data-trans-id*='"+fixed._ButtonTransId+"']");},
'-1359684984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__footer").find("button").filter(":containsTextNodeIgnore("+ fixed.ButtonTransId +")");},
'-1371530374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._elemTag+"[data-enablenow-id='"+fixed._elemData+"']");
},
'-1954555988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='" + fixed._id + "']").find("[data-nuiexp=" + dollars[1] + "]");},
'-939479124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='" + fixed._id + "']").closest(fixed._tag);},
'-583238441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-trans-id='" + fixed._dataTransId + "']").closest(fixed._tag);},
'-2127879744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp=" + dollars[0] + "]").find(fixed._tag);},
'-760866774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp=" + dollars[0] + "]").find("[class~=" + dollars[1] + "]").closest(fixed._tag);},
'-1721765329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='" + fixed._id + "']").find(fixed._tag);},
'-615051080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='" + fixed._data + "']").find(fixed._tag);},
'-217743779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.hdrTxt+")").closest("[role='dialog']").find(".sapcnqr-modal__body, .sapcnqr-dialog__body");},
'-2050819223': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[aria-label="+fixed._lmAriaLabel+"]").eq(fixed.lmIndex).closest(".sapcnqr-menu-button__container");},
'-1752815757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.LabelText+")").closest(".sapcnqr-dialog__title-container").siblings(".sapcnqr-dialog__subheader-container").find("li").eq(0);},
'-359531391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapcnqr").filter(":containsTextNode("+fixed.LabelText+")").siblings("div.sapcnqr-popper__target").find(".sapcnqr-button");},
'-665768045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.LabelText+")").parent("div.sapcnqr-form-field__heading").siblings("div.sapcnqr-form-field__control-container").find("div.sapcnqr[name='expenseType'], span.sapcnqr[name='expenseType']");},
'-1738868375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.LabelText+")").closest(".sapcnqr-form-field__heading").siblings(".sapcnqr-form-field__control-container").find(".sapcnqr-form-field__input");},
'-386617392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header,.sapcnqr-dialog__header").find("[data-trans-id='"+fixed._dataAttr+"']");},
'-282730174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapcnqr").filter(":containsTextNodeIgnore("+fixed.LabelText+")").siblings("div.sapcnqr-popper__target").find(".sapcnqr-button");},
'-1092283383': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-trans-id^='"+fixed._innerData+"']").closest(".sapcnqr-dialog__title");},
'-846614394': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-micro-process-flow__item").eq(fixed.elemIndex).find(".sapcnqr-button").filter("[data-nuiexp="+fixed._elemData+"]");},
'-580468650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".divcell").find(".x-form-field-wrap");},
'-1436989296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-nuiexp="+fixed._lmAttr+"]");},
'-145838241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapcnqr-title").filter(":containsTextNode("+fixed.titleText+")").closest(".panel-header--no-border").next(".sapcnqr-layout-panel__content").find(".sapcnqr-layout-panel__body");},
'-126783596': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=menubar]").find("[class*=sapcnqr-link__text]").filter(":containsTextNode("+fixed.lmTxt+")");},
'-658645726': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=menubar]").find("[class*=sapcnqr-link__text]").filter(":containsTextNode("+fixed.lmTxt+")");},
'-2081577050': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-dialog__header,.sapcnqr-modal__header").filter(":containsTextNode("+fixed.elmTxt+")");},
'-74784661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field").filter("[id="+fixed._fieldId+"]").find(".sapcnqr-icon--calendar").closest("button");},
'-536349039': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapcnqr-form-field").find(".sapcnqr-popper__target");},
'-1974272465': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".sapcnqr-form-field").find("input").closest(".sapcnqr-form-field__control");},
'-913914996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const opDom = wmjQuery("[id=sideNavBar]").find(".sapcnqr-expanded-side-nav__anchor--submenu").filter(":containsTextNode("+fixed.elmTxt+")");
if (opDom.length) return opDom;
const nopDom = wmjQuery("[id=sideNavBar]").find("i[aria-label="+fixed.elmTxt+"]").closest("button[class*=sapcnqr-sidenav__list-item]");
if (nopDom.length) return nopDom;
return wmjQuery();},
'-148605859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=sapCnqrSideNavContainer]").find("i, a").filter("[aria-label="+fixed.lmAruaLabel+"]");},
'-238485290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("label").filter(":contains("+fixed.lmText+")").closest(".sapcnqr-form-field");},
'-1605585991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".sapcnqr-form-field__heading").next(".sapcnqr-form-field__control-container").find(".sapcnqr-form-field__control[role='combobox']");},
'-78630265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapcnqr-title").filter(":containsTextNode("+fixed.headerTitle+")").closest(".panel-header--box-shadow");},
'-765672426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-trans-id='Menu.manageExpenses']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1657253699': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-id="+fixed._sectionAttr+"]").find(".sapcnqr-link__text").filter(":containsTextNode("+fixed.lmText+")");},
'-312200664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-report-library").filter("[id="+fixed._lmId+"]").find(".sapcnqr-layout-panel__body");},
'-140076878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.sectionHeaderText+")").closest("section").find(".sapcnqr-layout-panel__body");},
'-709863024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".report-body__entries-panel").filter("[data-nuiexp="+fixed._lmAttr+"]").find(".sapcnqr-checkbox__input:eq(" + dollars[0] + ")");},
'-482894407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[data-nuiexp="+fixed._tableAttr+"]").find("button").filter("[aria-label="+fixed._lmAriaLabel+"]").eq(fixed._lmIndex);},
'-1997369423': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-checkbox--screen-reader-only").filter(":containsTextNode("+fixed.lmText+")").closest(".sapcnqr-data-grid__header-cell");},
'-1110809846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__title, .sapcnqr-dialog__title").filter(":containsTextNode("+fixed.lmText+")").closest(".sapcnqr-modal__content, .sapcnqr-dialog__container").find(".sapcnqr-modal__body, .sapcnqr-dialog__body");},
'-2026046667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmText+")").closest(".sapcnqr-form-field").find("button").filter("[aria-label="+fixed._lmAL+"]");},
'-1927281892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.hhsg-qt-name").filter(":containsTextNode("+fixed.LabelText+")").next("span");},
'-280259752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-object-header__content").find(".sapcnqr-object__text").filter(":containsTextNode("+fixed.btnText+")").closest("button");},
'-721719844': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-title").filter(":containsTextNode("+fixed.labelText+")").closest(".sapcnqr-toolbar").find(".sapcnqr-select-field").find("i.sapcnqr-select__icon");},
'-1296655232': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-calendar").find("button").filter(":containsTextNode("+fixed.lmText+"):eq(" + dollars[0] + ")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);