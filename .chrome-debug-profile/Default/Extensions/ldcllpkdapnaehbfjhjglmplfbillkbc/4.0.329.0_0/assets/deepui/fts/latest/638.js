(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '20047993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".ptcs-wrapper").filter("[label="+fixed.labelAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("ptcs-hbar",firstShadow) : wmjQuery();},
'219213476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").closest(".widget-mashup");},
'247216932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-item-name").filter("[href_production*='"+fixed._hrefP+"']");},
'301040369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".BMCollectionViewCell");
}
return null;
},
'309495606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const labelElem = findLabelInMultipleShadowRoots();
return labelElem ? wmjQuery(labelElem).closest(".tw-flex-column") : wmjQuery();

function findLabelInMultipleShadowRoots() {
  const labelContainers = wmjQuery('.widget-ptcslabel[id*=KPICell]');
  for (const lblContainer of labelContainers) {
    const shadowRoot = lblContainer.shadowRoot;
    if (!shadowRoot) continue;
    const labelElm = wmjQuery(shadowRoot).find('#label').filter(":containsTextNode("+fixed.labelTxt+")");
    if (labelElm.length) return labelElm;
    }
  return wmjQuery();
}},
'340061928': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const labelElem = findLabelInMultipleShadowRoots();
return wmjQuery(labelElem).closest("ptcs-button");

function findLabelInMultipleShadowRoots() {
  const labelContainers = wmjQuery(".tabButton").find("ptcs-button");
  for (const lblContainer of labelContainers) {
    const shadowRoot = lblContainer.shadowRoot;
    if (!shadowRoot) continue;
    const labelElm = wmjQuery(shadowRoot).find('[part=label]').filter(":containsTextNode("+fixed.labelTxt+")");
    if (labelElm.length) return labelElm;
    }
  return wmjQuery();
}},
'364464162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const labelElem = findLabelInMultipleShadowRoots();
return labelElem ? wmjQuery(labelElem).closest(".tw-flex-column").closest(".widget-bounding-box") : wmjQuery();

function findLabelInMultipleShadowRoots() {
  const labelContainers = wmjQuery('.widget-ptcslabel[id*=KPICell]');
  for (const lblContainer of labelContainers) {
    const shadowRoot = lblContainer.shadowRoot;
    if (!shadowRoot) continue;
    const labelElm = wmjQuery(shadowRoot).find('#label').filter(":containsTextNode("+fixed.labelTxt+")");
    if (labelElm.length) return labelElm;
    }
  return wmjQuery();
}},
'384099144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const labelElem = findLabelInMultipleShadowRoots();
const targetElem = wmjQuery(labelElem).closest(".widget-container").closest(".widget-bounding-box").closest(".widget-container").find("ptcs-button");
return targetElem ? targetElem.closest(".widget-bounding-box") : wmjQuery();

function findLabelInMultipleShadowRoots() {
 const labelContainers = wmjQuery('.widget-ptcslabel[id*=KPICell]');
 for (const lblContainer of labelContainers) {
 const shadowRoot = lblContainer.shadowRoot;
 if (!shadowRoot) continue;
 const labelElm = wmjQuery(shadowRoot).find('#label').filter(":containsTextNode("+fixed.labelTxt+")");
 if (labelElm.length) return labelElm;
 }
 return wmjQuery();
}},
'406178181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_MachineMetricCell']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".flex-leaf-static");
}
return {};
},
'435529356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".widget-menu li.selected").filter("[mashup-name=" + fixed._titleText + "]").find("img");},
'519660874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".mashup-popup ptcs-label:visible:first");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("[part='root']").find("[part='label']").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest("ptcs-label").closest("[id*='popup_flexcontainer-2-bounding-box']").children().first();
}
return {};
},
'536905909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-level0").find("li img").filter("[title=" + fixed.titleText + "]")},
'704520458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".BMCollectionViewCell[id*='cell_KPICellSmall']").find(".walkMe[class*="+ fixed._btnText + "]").prev();},
'796300534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".outer-container").find(".widget-mashup:first");
}
return {};
},
'965974866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem;
}
return {};
},
'1052384912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery("ptcs-list:visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
  debugger;
  for(const innerChild of shadowChildren) {
    candid = wmjQuery("ptcs-list-item ptcs-label", innerChild)
    for(a of candid){
      isShadow = a?.shadowRoot?.children;
     if (!isShadow) continue;
      desiredElem = wmjQuery(isShadow).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
if (desiredElem.length == 1 && desiredElem.closest("ptcs-list-item")){
  return desiredElem.closest("ptcs-list-item");
}
    }
    
  }
}
return {};
},
'1072565705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".widget-bounding-box").filter("[id=" + fixed._btnText + "]").find("ptcs-dropdown")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("#select");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1107780175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ptcs-tab-set.widget-ptcstabset")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("[part=tabs-header]").find("ptcs-label[part=tabs-tab-label]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("#label").filter(":containsTextNode("+fixed.elmTxt+")") : wmjQuery();},
'1167320680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".tw-flex-row");
}
return {};
},
'1188842836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_MachineMetric']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".tw-flex-row");
}
return {};
},
'1441735011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-bounding-box .widget-ptcsbutton:visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).find("[part='root'] [part='label']").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest("div[id*='bounding-box']");
}
return {};
},
'1460134209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_MachineMetricCell']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").filter(":containsTextNode("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem;
}
return {};
},
'1629038201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".popup-mashup-goes-here ptcs-button:visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("[part='root']").find("[part='label']").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest("ptcs-button");
}
return {};
},
'1674590864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li img").filter("[title=" + fixed.titleText + "]").closest("a");},
'1723984362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-bounding-box .widget-ptcsbutton:visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent && candidateParent.shadowRoot && candidateParent.shadowRoot.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("[part='root']").find("[part='label']").filter(":containsTextNode("+ fixed.elem + ")");
  if (desiredElem.length == 1) 
    
      return wmjQuery(desiredElem[0].getRootNode().host);
}
return {};
},
'1741669216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".tw-flex-column");
}
return {};
},
'1993982291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ptcs-toggle-button:visible").filter("[label="+fixed.elemText+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery("#root", firstShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'2005213217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").closest(".flex-leaf-static").prev().find("ptcs-label").parent();},
'-692600498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-item-name").filter(":containsTextNode("+fixed.elmTxt+")");},
'-17913142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const labelElem = findLabelInMultipleShadowRoots();
return labelElem ? wmjQuery(labelElem).closest(".widget-container") : wmjQuery();

function findLabelInMultipleShadowRoots() {
  const labelContainers = wmjQuery('.widget-ptcslabel[id*=KPICell]');
  for (const lblContainer of labelContainers) {
    const shadowRoot = lblContainer.shadowRoot;
    if (!shadowRoot) continue;
    const labelElm = wmjQuery(shadowRoot).find('#label').filter(":containsTextNode("+fixed.labelTxt+")");
    if (labelElm.length) return labelElm;
    }
  return wmjQuery();
}},
'-1092638221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ptcs-dropdown").filter("[label="+fixed.labelAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("[id=select]",firstShadow) : wmjQuery();},
'-1025060182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".widget-bounding-box").filter("[id=" + fixed._btnText + "]").find("ptcs-dropdown")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("#select");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-169298544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".BMCollectionViewCell").find(".outer-container:first");
}
return {};},
'-1233770117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".widget-flexcontainer-bounding-box");
}
return {};
},
'-1022369626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_MachineMetric']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".widget-bounding-box");
}
return {};
},
'-1539060087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.elem + ")");
    if (desiredElem.length == 1) return desiredElem.closest(".outer-container");
}
return {};
},
'-533498470': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_MachineMetricCell']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem;
}
return {};
},
'-338131863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".kcc-headertitle ptcs-label[id^='root_ptcslabel']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem;
}
return {};
},
'-2133542421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='cell_KPICellSmall']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNode("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem.closest("div#root");
}
return {};
},
'-1695924877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").parent(".widget-content");


},
'-1203906324': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").closest(".outer-container");


},
'-1017443380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".walkMeUserLanguage .widget-ptcsdropdown")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ptcs-hbar#select ptcs-label", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery("div[id='label']", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-713928984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elmlContainers = wmjQuery("[id*='root_mashupcontainer']").find('ptcs-button');
for (const elmlContainer of elmlContainers) {
  const shadowRoot = elmlContainer.shadowRoot;
  if (!shadowRoot) continue;
  const labelElm = wmjQuery(shadowRoot).find('[part=label]').filter(":containsTextNode("+fixed.btntext+")").closest("ptcs-button");
  if (labelElm.length) return labelElm;
  }
return wmjQuery();
},
'-297065167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#snackbar-container").find(".snackbar").filter("[data-content='"+fixed._firstClass+"']");},
'-1671631494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-level0").find("li.selected img").filter("[title=" + fixed.titleText + "]");},
'-408978120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery("li.selected").find("img").filter("[src*="+ fixed._SplitSrc + "]");
},
'-1869930486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {candidateShadowParents = wmjQuery(".widget-content ptcs-label[id^='root_mashupcontainer']:mt_visible");
for (const candidateParent of candidateShadowParents) {
    shadowChildren = candidateParent?.shadowRoot?.children;
    if (!shadowChildren) continue;
    desiredElem = wmjQuery(shadowChildren).filter("div#root").find("#label").filter(":containsTextNodeIgnore("+ fixed.btnText + ")");
    if (desiredElem.length == 1) return desiredElem;
}
return {};
},
'-479194750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".widget-menu").find("li").filter("[mashup-name=" + fixed._titleText + "]").find("a");},
'-1907011596': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").prev();},
'-1976737632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { return wmjQuery(".walkMe[class*="+ fixed._btnText + "]").parent(".widget-content").closest(".widget-bounding-box").prev().find(".widget-content:first");


}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);