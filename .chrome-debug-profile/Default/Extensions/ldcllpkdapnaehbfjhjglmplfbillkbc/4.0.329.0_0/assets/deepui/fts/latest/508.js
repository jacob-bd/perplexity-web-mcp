(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '11254560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").filter("[data-test="+fixed._labelText+"]").find("a");},
'45249198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-inner-panel-header-text:directContains("+fixed.titleText+")").closest(".x-panel-tbar").next().children("div");},
'147499415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapcnqr-button").find("span").filter("[data-trans-id='"+fixed._elemId+"']").closest("button");},
'305073813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-administration'],button[data-test='sapcnqr-shellbar-product-menu']")},
'310599931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("div.sapcnqr-card__body").filter(":containsTextNode("+fixed.elemTxt+")").filter(":first");
const newElem = wmjQuery("span.sapcnqr-button__text").filter(":containsTextNode("+fixed.elemTxt+")").closest("button.sapcnqr-button--create").filter(":first");
if(oldElem.length){
	return oldElem;
} else if(newElem.length){
	return newElem;
}
return wmjQuery();},
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
'429105666': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-tab-group").find("button").filter("[data-enablenow-id='"+fixed._elemId+"']");},
'490452023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.elemText+")[id$='label_cell']");
},
'524256986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:directContains("+fixed.labelText+")").closest(".divcell").find("input[role='combobox'], .x-form-field").filter(':mt_visible');
},
'577131189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("input");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'628273487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content").find("span").filter("[data-trans-id='"+fixed._elemTransIdAttr+"']").closest("button");},
'644847066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapcnqr-popper']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'687073212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=toolbar]").find("button").filter("[data-enablenow-id='"+fixed._dataAttr+"']");},
'889489566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._elemId+"']").children(".cnqr-panel").children(".cnqr-panel-heading").children("[role='button']");
},
'891611702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const envCheackNew = wmjQuery("nav[class*='sapcnqr-shellbar__nav']:first");
if (envCheackNew.length){
	return wmjQuery("ul[data-test='menu__list-primary']").find("svg[class*='sapcnqr-shellbar__home-icon']").filter("[data-test='SAPConcur_logo']");
}if (!envCheackNew.length){
	return wmjQuery("[data-test='menu__listitem-dashboard']").find("svg[data-test='SAPConcur_logo']").filter(":mt_visible")
}},
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
'1004260096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Return Date']").parent().parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1008150066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='searchText']")},
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
'1066364537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.cnqr-quicktask").find(".cnqr-outer").filter("[href*='"+fixed._hrefProdAttr+"']").find(".cnqr-inner");},
'1139690188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button--create:first")},
'1142180213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-trans-id='expenseHome.expenseHomeTitle']")},
'1147620854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__anchor-dashboard']")},
'1182154729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-qa='recallButton']")},
'1213873508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu-profile']")},
'1216709562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-element='msg-box-footer-buttonPrimary']")},
'1245489075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.x-btn-text.c-save-icon")},
'1253903141': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='field-transactionAmount']")},
'1265523918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-spend-forms-v4__legend--is-required-field")},
'1304008487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapcnqr-menu-button-item").find("button.sapcnqr-menu-button-item__item-button").filter("[data-nuiexp='"+fixed._elemDataId+"']");},
'1311163014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[data-enablenow-id=" + dollars[0] + "]")},
'1339934512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapcnqr-popper']").find("a").filter(":containsTextNode("+fixed.elemTxt+")");},
'1378487323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*='/expense/admin/expenseTools.asp']")},
'1406711755': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nui-id='saveRatesButton']")},
'1406905429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "]")},
'1411036626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Departure Date']").parent().parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1432214559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=col]").filter("[data-enablenow-id='"+fixed._elemId+"']").find(".cnqr-currency");},
'1513059511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='rate-rules-link-button']")},
'1514959785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='search-form-expandable-collapsed-view-button']")},
'1540940029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=combobox]").filter("[name*="+fixed._elemName+"]").filter(":mt_visible");},
'1541152951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class~=" + dollars[0] + "]")},
'1548762273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#coreui-app-header").find("button").filter("[data-test='"+fixed._btnDataTest+"']");},
'1558655015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-modal__header").find("[data-trans-id='"+fixed._elemId+"']");},
'1567896070': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryform-tab-content,.sapcnqr-tab-group__content").find("input").filter("[data-nuiexp="+fixed._elemAttr+"]");},
'1589720866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-nuiexp='field-transactionDate']")},
'1593039428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-button.sapcnqr-button--secondary.sapcnqr-input-group__button.sapcnqr-button--lg")},
'1597397903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='Minimize column']")},
'1614851095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.x-panel.x-panel-noborder.x-column button.x-btn-text:visible:eq(1)")},
'1633267288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='add-item-code-input-field']")},
'1636197016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem = wmjQuery(".sapcnqr-card-deck").find(".sapcnqr-card__title").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapcnqr-card__body").filter(":first");
if (elem.length)
 {return elem;}
return wmjQuery(".sapcnqr-toolbar").find(".sapcnqr-button").filter(":containsTextNodeIgnore("+ fixed.btnText +")").filter(":first");},
'1651271813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".airportblock").find("input").filter(":mt_visible");
const newElem = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").parent().next().find("li[data-element='search-type-round-trip']");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1713579873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[name=" + dollars[0] + "]")},
'1766756566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name=" + dollars[0] + "]")},
'1783469274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1:first")},
'1814151546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element='done-button']")},
'1814527342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='menu__button-administration']")},
'1826506367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name=" + dollars[0] + "]")},
'1827272880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("input[aria-label*='Return Date']").parent().filter(":mt_visible");
const newElem = wmjQuery("[data-element='date-input']").parent();
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'1850393269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[href*=" + dollars[0] + "]")},
'1921864973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id$='label_cell']:directContains("+fixed.elemText+")");
},
'1929721679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-nuiexp]").filter("[data-nuiexp="+fixed._dataNuiexp+"]").find(".sapcnqr-form-field__input");},
'1944405032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test=" + dollars[0] + "]")},
'1953964518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".x-toolbar-left").find(".x-btn-text").filter(":containsTextNode("+fixed.tgtText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1977216008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='ShowMobile']")},
'1981032381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnqr-panel[id="+fixed._parentId+"]").children(".cnqr-panel-heading");
},
'1989821102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input#txtDiscountCode")},
'2123720550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapcnqr-tab-group__content div.sapcnqr-button-toolbar__end button.sapcnqr-button.sapcnqr-button--default.sapcnqr-button-toolbar__item.sapcnqr-button--lg")},
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
'-2135427731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name=" + dollars[0] + "] span")},
'8733134833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-element=" + dollars[0] + "]")},
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
'9206620718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[Class*=" + dollars[0] + "]")},
'8433645520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-labelledby=" + dollars[0] + "]")},
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
'-243875384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='user-icon-profile'],[data-test='user-icon-avatar-shellbar']").closest("button");},
'-1339110455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1697003312': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']");},
'-757517191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").filter("[data-test='"+fixed._ulDataTest+"']").find("a[class*='sapcnqr-link']").filter(":containsTextNode("+fixed.elemTxt+")").find("span[class*='sapcnqr-link__text']");},
'-1701796440': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[data-test='menu__list-secondary']").find("a").filter("[href*='"+fixed._hrefProdAttr+"']").find("span[class*='sapcnqr-link__text']");},
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
'-461915008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._tgtId+"]").children("div").children(".sapcnqr-section").find(".sapcnqr-section__heading");},
'-231756023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[name="+fixed._tgtName+"]");},
'-1542534807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.wizardbutton").filter("[id="+fixed._tgtName+"]");},
'-1143638734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='group']").filter("[aria-label="+fixed._labelText+"]").find("li[class*='sapcnqr-menu-item__header']");},
'-831660876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='sapcnqr-app-header__listitem']").find("a").filter("[data-test='"+fixed._tgtTitle+"']");},
'-872609551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-form-field__label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapcnqr-form-field__heading").next().find("input.sapcnqr-form-field__input");},
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
'-1371530374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._elemTag+"[data-enablenow-id='"+fixed._elemData+"']");
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);