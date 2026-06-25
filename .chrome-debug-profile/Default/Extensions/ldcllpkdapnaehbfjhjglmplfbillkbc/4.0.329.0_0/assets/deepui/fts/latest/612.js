(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '8485561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']").find("sap-crm-button").filter("[title="+fixed.elmTitle+"]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow) : wmjQuery();},
'87145705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "sap-crm-object-card:containsTextNode("+fixed.btnAriaLabel+") sap-crm-toggle-button",
    { selector: "button", isShadowChild: true }
);
if (sectionShadow) {
    return wmjQuery(sectionShadow);
} else {
    return wmjQuery();
}},
'179916056': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("[role=dialog]").find("sap-crm-object-card").find("sap-crm-button");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) { 
  return wmjQuery(targetShadow).find(".sap-crm-icon").filter("[aria-label="+fixed._iconAttr+"]").closest("button");
}
return wmjQuery();},
'237702026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='main']").filter("[class*="+fixed._parentClass+"]").find("sap-crm-multi-tabs");},
'265906473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-card").filter("[aria-label='"+fixed._lmAttr+"']").find("sap-crm-search-input[id*=search-input]");},
'565905215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".sap-crm-table__cell[id="+fixed._tabelCellId+"] sap-crm-input",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow).filter("[aria-label="+fixed.elmAriaLabel+"]") : wmjQuery();},
'673501793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNode("+fixed.elmTxt+")").closest("sap-crm-object-card")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-list-obj") : wmjQuery();},
'675298186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-list-item").filter(":containsTextNode("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list__item__content",firstShadow) : wmjQuery();},
'691986382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-tabs")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-tabs__link",firstShadow).filter(":containsTextNodeIgnore("+fixed.elmTxt+")") : wmjQuery();},
'840807344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("app-lead-filter-bar").find("sap-crm-toolbar").filter("[slot="+fixed._lmAttr+"]");},
'955494791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[role=dialog]").find("sap-crm-button")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow).filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'1001125409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadowHost =  wmjQuery(fixed._closestShadowHostNameTag).filter("[icon='"+fixed._closestShadowAttr+"']");
const firstShadow = firstShadowHost.length && firstShadowHost[0].shadowRoot;
return wmjQuery(firstShadow).find("button");},
'1202036581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-button").filter("[title='"+fixed.btnTitle+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow) : wmjQuery();},
'1218484382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-list-item").filter(":containsTextNodeIgnore("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list__item__content",firstShadow) : wmjQuery();},
'1233208510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-label").filter(":containsTextNode("+fixed.lmText+")").closest("sap-crm-list-item");},
'1250973766': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = findElmlInMultipleShadowRoots();
return targetElem ? targetElem : wmjQuery();

function findElmlInMultipleShadowRoots() {
  const targetShadows = wmjQuery('sap-crm-navigation-item');
  for (const target of targetShadows) {
    const shadowRoot = target.shadowRoot;
    if (!shadowRoot) continue;
    const targetElm = wmjQuery(shadowRoot).find('button').filter(":containsTextNode("+fixed.elmTxt+")");
    if (targetElm.length) return targetElm;
    }
  return wmjQuery();
}},
'1256329559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "sap-crm-button",
    { selector: "button[aria-label='"+fixed._btnAriaLabel+"']", isShadowChild: true }
);
if (sectionShadow) {
    return wmjQuery(sectionShadow);
} else {
    return wmjQuery();
}},
'1276569249': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-label").filter(":containsTextNode("+fixed.lblText+")").parent("sap-crm-flex").parent("sap-crm-flex");},
'1314032024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-popover").filter("[class*="+fixed._parentClass+"]").find("sap-crm-avatar");},
'1319937204': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-tabs").filter("[slot="+fixed._slotAttr+"]");},
'1335972250': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-shell-toolbar").find("sap-crm-navigation-menu");},
'1368168092': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']").find("sap-crm-input")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow).filter("[aria-label="+fixed._elmAriaLabel+"]") : wmjQuery();},
'1370572731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-combo-box")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sap-crm-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow).filter("[aria-label='"+fixed._elmAriaLabel+"']") : wmjQuery();},
'1416332746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-navigation-menu").filter("[slot="+fixed._slotAttr+"]");},
'1437552049': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-form-field").filter("[data-testid='"+fixed._datatestidAttr+"']").find("sap-crm-combo-box")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sap-crm-input",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'1497613613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sap-crm-scrollbar").find("sap-crm-navigation-item").filter(":eq("+fixed.indx+")");},
'1613645967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-drop-down")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sap-crm-drop-down-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow).filter("[aria-label='"+fixed._elmAriaLabel+"']") : wmjQuery();},
'1675546276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']") : wmjQuery();},
'1684491964': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("tbody").find(".sap-crm-table__row").eq(fixed.rowIndex).find("sap-crm-input").filter("[data-testid="+fixed._inputAttr+"]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'1704153075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-input").filter("[formcontrolname='"+fixed._formcontrolname+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow) : wmjQuery();},
'1761154761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-list-item").filter(":containsTextNode("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list__item__content",firstShadow) : wmjQuery();},
'1813810184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-combo-box")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sap-crm-button").filter("[icon='"+fixed._elmIcon+"']").closest("sap-crm-input")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("input",thirdShadow) : wmjQuery();},
'1832288257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sap-crm-input[data-testid="+fixed._inputAttr+"]",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'1863384843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "sap-crm-object-card:containsTextNode("+fixed.btnAriaLabel+") sap-crm-toggle-button",
    { selector: "button", isShadowChild: true }
);
if (sectionShadow) {
    return wmjQuery(sectionShadow);
} else {
    return wmjQuery();
}},
'1977045758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']") : wmjQuery();},
'1992329071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-combo-box").filter("[aria-label="+fixed._elmAriaLabel+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sap-crm-input")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'2035821360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-tabs")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-tabs__link",firstShadow).filter(":containsTextNodeIgnore("+fixed.elmTxt+")") : wmjQuery();},
'2139197108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elmlContainers = wmjQuery("[role=dialog]").find('sap-crm-button');
for (const elmlContainer of elmlContainers) {
  const shadowRoot = elmlContainer.shadowRoot;
  if (!shadowRoot) continue;
  const labelElm = wmjQuery(shadowRoot).find('button').filter(":containsTextNode("+fixed.elemText+")");
  if (labelElm.length) return labelElm;
  }
return wmjQuery();},
'-1136183399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadowHost =  wmjQuery(fixed._closestShadowHostNameTag).filter("[icon='"+fixed._closestShadowAttr+"']");
const firstShadow = firstShadowHost.length && firstShadowHost[0].shadowRoot;
return wmjQuery(firstShadow).find("button");},
'-1585769918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadowHost =  wmjQuery(fixed._closestShadowHostNameTag).filter("[title="+fixed.closestShadowAttr+"]");
const firstShadow = firstShadowHost.length && firstShadowHost[0].shadowRoot;
return wmjQuery(firstShadow).find("button");},
'-691711939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("sap-crm-label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest("sap-crm-list-item").find("sap-crm-flex");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) {  
  return wmjQuery(".sap-crm-flex", targetShadow);
}
return wmjQuery();},
'-1133913439': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[role=dialog]").find("sap-crm-button")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow).filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'-2111278328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sap-crm-input[data-testid="+fixed._inputAttr+"]",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'-1002382246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("[role=dialog]").find("sap-crm-object-card").find("sap-crm-button");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) { 
  return wmjQuery(targetShadow).find(".sap-crm-icon").filter("[aria-label="+fixed._iconAttr+"]").closest("button");
}
return wmjQuery();},
'-1244825326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-button").filter("[title='"+fixed.btnTitle+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow) : wmjQuery();},
'-1688951872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']").find("sap-crm-input")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow).filter("[aria-label="+fixed._elmAriaLabel+"]") : wmjQuery();},
'-575319004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNode("+fixed.elmTxt+")").closest("sap-crm-list").find("sap-crm-list-item")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list__item",firstShadow) : wmjQuery();},
'-1808486408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell").filter("[id$='"+fixed._tabelCellId+"']").find("sap-crm-button").filter("[title="+fixed.elmTitle+"]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow) : wmjQuery();},
'-1400774631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-combo-box")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sap-crm-button").filter("[icon='"+fixed._elmIcon+"']").closest("sap-crm-input")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("input",thirdShadow) : wmjQuery();},
'-532681905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-input").filter("[data-testid='"+fixed._elmAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow) : wmjQuery();},
'-766343467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-form-field").filter("[data-testid='"+fixed._datatestidAttr+"']").find("sap-crm-combo-box")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sap-crm-input",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'-949556011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-button").filter("[title="+fixed.elmTitle+"]");},
'-1121201916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-label").filter(":contains("+fixed.lmtext+")").closest("sap-crm-card").find("sap-crm-table");},
'-458290646': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-label").filter(":containsTextNode("+fixed.titleText+")").closest("sap-crm-flex").next().next("sap-crm-form-field").filter("[aria-label='"+fixed._elemAttr+"']").find("sap-crm-input")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("input[id=inputControl]");
return elem.length ? elem : wmjQuery();},
'-1090084604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-quickcreate-footer").find("sap-crm-button")[0];
const firstShadow = first && first.shadowRoot;

const elem = wmjQuery(firstShadow).find("button").filter(":containsTextNode("+fixed.btnText+")");
return elem.length ? elem : wmjQuery();},
'-635789706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-flex").filter("[aria-label="+fixed._elemAttr+"]");},
'-633263698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-flex").find("sap-crm-label").filter(":containsTextNode("+fixed.lmText+")");},
'-842469763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-shell-toolbar").find("sap-crm-navigation-menu").filter("[slot="+fixed._lmAttr+"]");},
'-1132099486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-group").find("sap-crm-button").filter("[data-help-id="+fixed._lmAttr+"]");},
'-738387029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sap-crm-card").filter("[aria-label='"+fixed._lmAttr+"']").find("sap-crm-table");},
'-23153771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[aria-label='"+fixed._parentAriaLabel+"']").find("sap-crm-label").filter(":containsTextNode("+fixed.lmText+")").closest("sap-crm-list-item");},
'-1919865778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-input").filter("[formcontrolname='"+fixed._formcontrolname+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow) : wmjQuery();},
'-1451295792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-button").filter("[title='"+fixed.btnTitle+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow) : wmjQuery();},
'-618083627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("tbody").find(".sap-crm-table__row").eq(fixed.rowIndex).find("sap-crm-input").filter("[data-testid="+fixed._inputAttr+"]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'-1670013565': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".sap-crm-table__cell[id="+fixed._tabelCellId+"] sap-crm-drop-down",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sap-crm-drop-down-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow).filter("[aria-label='"+fixed.elmAriaLabel+"']") : wmjQuery();},
'-1612910658': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("[role=dialog]").find("sap-crm-label").filter(":containsTextNode("+fixed.labelTxt+")").closest("sap-crm-flex").find("sap-crm-input");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) {  
  return wmjQuery("input", targetShadow);
}
return wmjQuery();},
'-1628950395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".sap-crm-table__cell[id="+fixed._tabelCellId+"] sap-crm-input",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow).filter("[aria-label="+fixed.elmAriaLabel+"]") : wmjQuery();},
'-1302203086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-combo-box")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sap-crm-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow).filter("[aria-label='"+fixed._elmAriaLabel+"']") : wmjQuery();},
'-1706521639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-table")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".sap-crm-table__cell[id$='"+fixed._tabelCellId+"']").find("sap-crm-drop-down")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sap-crm-drop-down-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow).filter("[aria-label='"+fixed._elmAriaLabel+"']") : wmjQuery();},
'-1924780674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNode("+fixed.elmTxt+")").closest("sap-crm-list").find("sap-crm-list-item")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list__item",firstShadow) : wmjQuery();},
'-1615655939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNode("+fixed.elmTxt+")").closest("sap-crm-object-card")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-list-obj") : wmjQuery();},
'-1000000210': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-combo-box").filter("[aria-label="+fixed._elmAriaLabel+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sap-crm-input")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("input",secondShadow) : wmjQuery();},
'-1809104540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-input").filter("[data-testid='"+fixed._elmAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow) : wmjQuery();},
'-1879062260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("app-service-order-table-view").find("sap-crm-card")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-card__header",firstShadow) : wmjQuery();},
'-401872854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("sap-crm-object-card")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-list-obj") : wmjQuery();},
'-1464879626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-object-card-title").filter(":containsTextNodeIgnore("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".sap-crm-list-obj__title",firstShadow) : wmjQuery();},
'-58176490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sap-crm-list").find("sap-crm-label").filter(":containsTextNodeIgnore("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".sap-crm-label") : wmjQuery();},
'-853615305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentID+"]").find("sap-crm-search-input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);