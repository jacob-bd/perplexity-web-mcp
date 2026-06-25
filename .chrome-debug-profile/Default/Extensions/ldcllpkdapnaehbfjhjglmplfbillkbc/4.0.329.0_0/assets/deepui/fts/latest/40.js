(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1007833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery( "macroponent-f51912f4c700201072b211d4d8c26010 ")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-canvas-appshell-main")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("macroponent-c276387cc331101080d6d3658940ddd2")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery(thirdShadow).find("sn-canvas-main#item-wsContent")[0];
const fourthShadow = fourth && fourth.shadowRoot;
const fifth = wmjQuery(fourthShadow).find("sn-canvas-screen:last")[0];
const fifthShadow = fifth && fifth.shadowRoot;
const sixth = wmjQuery(fifthShadow).find("macroponent-c3b08d71873e6a50ea2d64a09bbb35e8")[0];
const sixthShadow = sixth && sixth.shadowRoot;
const seventh = wmjQuery(sixthShadow).find("now-record-list-connected-related").filter(":mt_visible")[0];
const seventhShadow = seventh && seventh.shadowRoot;
const eighth = wmjQuery(seventhShadow).find("now-record-list-related")[0];
const eighthShadow = eighth && eighth.shadowRoot;
const ninth = wmjQuery(eighthShadow).find("now-grid")[0];
const ninthShadow = ninth && ninth.shadowRoot;

if (ninthShadow) {
    return wmjQuery(ninthShadow).find("thead").find("th").filter("[data-test-label='"+fixed._elemAttr+"']").find(".sn-text-link");
}


return wmjQuery();
},
'4959157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")").closest("li.item-card-column");},
'11174597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[id="+fixed._lmid+"]").find(fixed._tagname).eq(1);},
'22061155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul").find("div[role='option']").filter(":containsTextNode("+fixed.elemText+")");},
'54939850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-polaris-layout")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sn-polaris-header")[0];
const thirdShadow = third && third.shadowRoot;

if(thirdShadow){
 		 return wmjQuery(thirdShadow).find(".contextual-zone-button").filter("[data-id="+fixed._lmDataId+"]").filter(":mt_visible");
		
}


return wmjQuery();},
'56884046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "[global-navigation-config]",
    { selector: "sn-canvas-appshell-main#item-snCanvasAppshellMain", isShadowChild: true },
    { selector: "macroponent-c276387cc331101080d6d3658940ddd2", isShadowChild: true },
    { selector: "sn-canvas-main#item-wsContent", isShadowChild: true }
);
if (sectionShadow) {
    const lastUniqueShadowElem = sectionShadow.shadowRoot;
    const targethadowContainer = lastUniqueShadowElem && wmjQuery(lastUniqueShadowElem).find("sn-canvas-screen");
    const targetShadowArray = Array.from(targethadowContainer);
    let returnedValue = wmjQuery();
    targetShadowArray.forEach(target => {
        const TargetShadow = target && target.shadowRoot;
        const desiredElement = TargetShadow && wmjQuery(TargetShadow).find('macroponent-c3b08d71873e6a50ea2d64a09bbb35e8')[0];
        if (desiredElement) {
          	const first = desiredElement.shadowRoot;
          	const second = first && wmjQuery(first).find('now-uxf-tab-set[id*=item-tabs]')[0];
          	const secondShadow = second && second.shadowRoot;
          	const third = secondShadow && wmjQuery(secondShadow).find('now-tabs')[0];
          	const thirdShadow = third && third.shadowRoot;
            returnedValue = thirdShadow ? wmjQuery(thirdShadow).find('button').filter(":containsTextNode("+fixed.elemTxt+")") : wmjQuery();
        }
    });
    return returnedValue;
}
return wmjQuery();},
'60044675': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ng-binding").filter(":directContains("+fixed.labelText+")").closest("label").closest(".form-group").filter(':mt_visible');
},
'78188083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter-name").filter(":containsTextNode("+fixed.elmTxt+")");},
'79997934': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".level-one-topic-name").filter(":containsTextNode("+fixed.topicText+")").closest(".level-one-item").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'83831442': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.field-label").filter("[for="+fixed._elemForAttr+"]").find("span.help-tag-icon");},
'92015011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='header-title']").find(".title-content").filter("[title="+fixed.elemTitleAttr+"]");},
'97317737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-nav").find("[id='profile-dropdown']");},
'133906527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-body").find(".table-container").find("table");},
'150629220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.breadcrumb_container").filter("[id='"+fixed._lmId+"']").find("button.breadcrumb_link");},
'174546149': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".popover-header").find("a.btn").filter("[href*='"+fixed._hrefProdAttr+"']");},
'193314962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".column_head").filter(":containsTextNode("+fixed.columText+")");},
'194195097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find("#sncwsgs-typeahead-input");
} else {
    return wmjQuery();
}},
'200635922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".list_header_cell").filter(":containsTextNode("+fixed.thTxt+")").find(".icon-ellipsis-vertical");},
'208732743': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._lmid+"']").find(".form-field");},
'222295865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").find("textarea").filter("[id="+fixed._elemId+"]");},
'231587103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.labelText +")").closest(".form-group").find("a[class*=select]");},
'235006472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav b").filter(":containsTextNode("+fixed.elemText+")");},
'247907126': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='header-title']").find(".title-content").filter("[title="+fixed.elemTitleAttr+"]");},
'247991189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-main-menu.is-pinned", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    const targetShadow = wmjQuery("sn-collapsible-list", dropDown.shadowRoot);
    let returnedValue = wmjQuery();
    Array.from(targetShadow).forEach(sectionTitle => {
        const targetElem = sectionTitle && sectionTitle.shadowRoot && wmjQuery(".label", sectionTitle.shadowRoot).parent().filter(":containsTextNode(" + fixed.elemTxt + ")").closest("a.item-label");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}},
'257752753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".input-group-checkbox").find("label").filter(":containsTextNode("+fixed.tgtElemText+")");},
'260443933': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea.form-control").filter("[name$="+fixed._tgtName+"]");},
'274882129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[for="+fixed._elmAttr+"]");},
'276062641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-testid='"+fixed._dataTestID_Child+"']").parent("div");},
'277979378': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("now-record-date-picker", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-input", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-input", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("input");
}
return wmjQuery();},
'286058084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").find("input").filter("[id="+fixed._elemId+"]");},
'286353643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(":contains("+fixed.labelText+")");},
'288913632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_caption_text").filter(":containsTextNode("+fixed.txt+")").closest("[class*='_tab']");},
'293378277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='navbar']").find("button").filter("[id='"+fixed._lmid+"']");},
'301689040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-footer").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'305646698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.field-label").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span[class*='sp-field-label']").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'316879719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel").find("div").filter("[ng-if*="+fixed._lmAttr+"]");},
'324032117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='search']").filter("[id$='"+fixed._tgtId+"']").closest("div.form-field");},
'339929624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-control").filter("[id$="+fixed._tgtId+"]");},
'369045878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").filter("[name="+fixed._nameAttr+"]").find("i").filter("[title="+fixed.elmAttr+"]");},
'373651559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-actions").find(".sn-canvas-header-title");},
'375662561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.list_header_cell").filter("[name='"+fixed._btnNameAttr+"']").find(".list_header_cell_container").find(".column_head");},
'379304427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("input").filter("[name*="+fixed._elemAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'421210667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ng-binding").filter(":containsTextNode("+fixed.cardHeaderText+")").closest(".connectivity-services-content");},
'425505477': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find("button").filter(":containsTextNode("+fixed.buttonText+")");},
'436919948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".employee-center-navigation").find(".navigation-menu-item").filter("[aria-label="+fixed.lmAL+"]");},
'444078392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id='"+fixed._idAttr+"']").next(".label-text");},
'455985334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[sn-atf-area='"+fixed._attr+"']").find(".modal-content");},
'463169218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter_row_condition").find(".condition-row__operator-cell").find("select");},
'464630561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='modal-title']").filter(":containsTextNode("+fixed.headerText+")").closest(".modal-content");},
'465127029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
  const wantedShadowContainer = wmjQuery(".super-filter-header", dropDown.shadowRoot).filter(":containsTextNode("+fixed.sectionTitle+")").next(".results-section").find("sn-collapsible-list")[0];
  const wantedShadow = wantedShadowContainer && wantedShadowContainer.shadowRoot;
  const targetShadowContainer = wantedShadow && wmjQuery("sn-collapsible-list.nested-item", wantedShadow)[0];
  const targetShadow = targetShadowContainer && targetShadowContainer.shadowRoot;
    return targetShadow && wmjQuery("a.item-label", targetShadow).filter(":containsTextNode("+fixed.elemTxt1+")").filter(":containsTextNode("+fixed.elemTxt2+")");
}
return wmjQuery();},
'468156199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".subtopics-container").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'476757739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-open", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-polaris-nav");
} else {
    return wmjQuery();
}},
'492429968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._outerId+"]").find(".form-group").find("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'532027160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-type="+fixed._dataType+"]")},
'540757160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea.form-control").filter("[id$="+fixed._tgtName+"]");},
'582782918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter("[id='"+fixed._lmId+"']").find(".container-fluid");},
'601092231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find("[id*= chosen]");},
'606232292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chg-model-model-name").filter(":containsTextNode("+fixed.lmText+")").closest(".change-model-card-component");},
'610826239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#header-container").find("button.icon-arrow-down-triangle").filter("[picker-popup="+fixed._elemAttr+"]");},
'615619219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function traverseShadow(selectors) {
  let root = document;

  for (let i = 0; i < selectors.length; i++) {
    const el = root === document
      ? wmjQuery(selectors[i])[0]
      : wmjQuery(selectors[i], root)[0];

    if (!el) return [];

    const shadow = el.shadowRoot;
    if (!shadow) return [];

    root = shadow;
  }

  return root; // final shadow root
}

const chain = [
  "[component-id='hnctkwk']",
  "[component-id='hnctkwk-snCanvasAppshellMain']",
  "[component-id='cm0urau4j0002358r2pul3ic5']",
  "[component-id='cm0urau4j0002358r2pul3ic5-wsContent']",
  "[component-id='uv26d4uxrxs8-425']",
  "[component-id='cm0urbrtp0005358rya8vzk8w']",
  "now-record-common-uiactionbar",
  "sn-form-internal-uiactionbar",
  "now-button"
];

const finalShadow = traverseShadow(chain);
if (!finalShadow) return [];

return wmjQuery(".now-button", finalShadow);},
'617679554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[ng-if*='data.pageTitle']")},
'626594598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").find("input").filter("[id="+fixed._elemId+"]");},
'640685086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelDirectText+")").closest(".form-group").find(fixed._tgtTagName);},
'667068236': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function traverseShadow(selectors) {
  let root = document;

  for (let i = 0; i < selectors.length; i++) {
    const el = root === document
      ? wmjQuery(selectors[i])[0]
      : wmjQuery(selectors[i], root)[0];

    if (!el) return [];

    const shadow = el.shadowRoot;
    if (!shadow) return [];

    root = shadow;
  }

  return root; // final shadow root
}

const chain = [
  "[component-id='kdlhmou']",
  "[component-id='kdlhmou-polarisLayout']",
  "[component-id='u7249bo9zof7-6']"

];

const finalShadow = traverseShadow(chain);
if (!finalShadow) return [];

return wmjQuery(".polaris-header-logo", finalShadow).children("#header-logo-image");},
'685776490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for$="+fixed._labelFor+"]").find(".label-text");},
'687380021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._lmId+"']").find("select");},
'693484942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".col-panel").find(".title-text").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'698353318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sn-navhub-content").find("a").filter("[id="+fixed._elemId+"]");},
'699180390': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split("(")[0] : null;
return wmjQuery(".tab_caption_text").filter(":contains("+targetText+")").parent("span");},
'700000000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery("body").children("[global-navigation-config]")[0];
let shadowElem;
if (targetElem) {
	shadowElem = targetElem.shadowRoot;
	if (shadowElem) {
		return wmjQuery("iframe", shadowElem).filter("[id*="+fixed._iframeId+"]");
 	}
}
return wmjQuery("iframe").filter("[id*="+fixed._iframeId+"]");},
'700000001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery("body").find("[global-navigation-config]")[0];
let shadowElem;
if (targetElem) {
	shadowElem = targetElem.shadowRoot;
	if (shadowElem) {
		return wmjQuery("iframe", shadowElem).filter("[id*="+fixed._iframeId+"]");
 	}
}
return wmjQuery("iframe").filter("[id*="+fixed._iframeId+"]");},
'700000002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery("body").children("[component-id]")[0];
let shadowElem;
if (targetElem) {
	shadowElem = targetElem.shadowRoot;
	if (shadowElem) {
		return wmjQuery("iframe", shadowElem).filter("[id*="+fixed._iframeId+"]");
 	}
}
return wmjQuery("iframe").filter("[id*="+fixed._iframeId+"]");},
'700000003': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery("body").children("[app-id]")[0];
let shadowElem;
if (targetElem) {
	shadowElem = targetElem.shadowRoot;
	if (shadowElem) {
		return wmjQuery("iframe", shadowElem).filter("[id*="+fixed._iframeId+"]");
 	}
}
return wmjQuery("iframe").filter("[id*="+fixed._iframeId+"]");},
'701256919': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".control-label").filter(":containsTextNode("+fixed.labelDirectText+")").closest(".form-group").find(fixed._tgtTagName);},
'701966289': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-title").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".gbs-card-content");},
'719399188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i[role='button']").filter("[title="+fixed.lmTitle+"]");},
'736751748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".employee-center-navigation").find("[role='menuitem']").filter(":containsTextNode("+fixed.elmTxt+")");},
'737038253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-type='label']").filter("[id='"+fixed._parentId+"']").find("span.label-text");},
'755489006': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[id$="+fixed._tgtId+"]").closest("div.form-field");},
'757466342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".catalog-section-content").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("td");},
'759847328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("iframe").filter("[id="+fixed._lmId+"]");
return elem.length ? elem : wmjQuery();

},
'771146930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".employee-center-navigation").find("a, li").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'781433265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-content',
    { selector: "now-record-form-connected", isShadowChild: true },
    { selector: "sn-form-internal-workspace-form-layout", isShadowChild: true },
  	{ selector: "now-record-form-blob",isShadowChild: true },
    { selector: "sn-form-internal-tabs",isShadowChild: true },
  	{ selector: "sn-form-internal-tab-contents",isShadowChild: true },
  	{ selector: "now-record-form-section-column-layout",isShadowChild: true },
  	{ selector: "sn-record-choice-connected[name="+fixed._nameAttr+"]",isShadowChild: true },
  	{ selector: "now-select[name="+fixed._nameAttr+"]",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
      return targetShadow && wmjQuery(targetShadow).find("span.will-truncate");
} else {
    return wmjQuery();
}},
'808021654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").parent().filter("[id$="+fixed._elemText+"]").find(".field-decorations").next()
},
'828492983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".global-list-item").filter(":mt_visible");
} else {
    return wmjQuery();
}},
'837541178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.pageTitleText));
targetText = targetText ? targetText.split(" (")[0] : null;

return wmjQuery(".tab_caption_text").filter(":contains("+targetText+")").closest(".last_tab_closure");


},
'851463103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".custom-tooltip").filter("[ng-show='"+fixed._ngshow+"']").closest("a").find(".buttonText");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'853404381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".widget_body").find("button").filter(":containsTextNode("+ fixed.btnText +")");},
'864550834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-polaris-layout", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-polaris-header", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".polaris-header-controls") : wmjQuery();},
'868015154': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
  	{ selector: "sn-polaris-layout", isShadowChild: true },
  	{ selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery("nav", targetShadow).find(".super-filter-container");
}
return wmjQuery();},
'870919988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")").closest("a.circle_icon");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'873708839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i[aria-label='"+fixed._prevData+"']").next(".table-col-header").filter(':mt_visible');
},
'889526108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("sn-form-internal-header-layout", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("now-record-common-uiactionbar", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-uiactionbar", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-button", sixSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery("button", sevSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'904995011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id*='"+fixed._checkboxText+"']").find(".label-text");},
'928600650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").find("b").filter(":containsTextNode("+fixed.elmTxt+")");},
'938247829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-default :header").filter(":mt_visible");},
'964958667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sp-field-label-padding").filter(":containsTextNode("+fixed.lblText+")").closest("label").closest(".form-group").find("textarea");},
'981353240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[id='"+fixed._selId+"']").closest(".form-field");},
'987439761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-type='section_head']").find(".btn-default:directContains("+fixed.elemText+")");
},
'988925331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[ng-if*="+fixed._lmAttr+"]");},
'996557207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id="+fixed._containerId+"]").find(".form-group").find("label").filter("[for="+fixed._elemId+"]");},
'997104607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find(".form-field");},
'1009211984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.list_header").find("td").filter("[name='"+fixed._btnNameAttr+"']").find("input.list_header_search");},
'1018057938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.nav").find("li[uib-tooltip='"+fixed._elemAttr+"']");},
'1022429060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-title").filter(":contains("+fixed.navbar_title+")").closest(".list_nav").find("input.form-control").filter("[placeholder="+fixed._lmplaceholder+"]");},
'1024358749': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find(".tox");},
'1026608385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-canvas-appshell-main", isShadowChild: true },
    { selector: "macroponent-c276387cc331101080d6d3658940ddd2", isShadowChild: true },
    { selector: "sn-canvas-main", isShadowChild: true },
    { selector: "sn-canvas-screen", isShadowChild: true },
    { selector: "macroponent-5ac43b6f878a2d5099aa20ee8bbb3568", isShadowChild: true },
    { selector: "macroponent-eee473af878a2d5099aa20ee8bbb35d3", isShadowChild: true },
  	{ selector: "macroponent-a2b0596cec6b9d49dd1ff9bf76b5084b", isShadowChild: true },
    { selector: "sn-par-visualization-base[title="+fixed.elemTitleAttr+"]", isShadowChild: true },
  	{ selector: "now-heading", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".now-heading", targetShadow).filter("[title="+fixed.elemTitleAttr+"]");
} else {
    return wmjQuery();
}},
'1033308738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-list-module',
    { selector: "now-record-list-menu-connected", isShadowChild: true },
    { selector: "now-list-menu", isShadowChild: true },
  	{ selector: "sn-list-menu-display",isShadowChild: true },
 	{ selector: "now-content-tree",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
      return targetShadow && wmjQuery(targetShadow).find("li[role='treeitem'][data-tooltip="+fixed._treeNodeDataAttr+"]").find(".now-content-tree-node").filter(":containsTextNode("+fixed.treeHeaderText+")");
} else {
    return wmjQuery();
}},
'1058014650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='header-title']").find(".title-content").filter(":containsTextNode("+fixed.elemTitleAttr+")");},
'1068477742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_caption_text").filter(":containsTextNode("+fixed.lmText+")");},
'1071644272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.list_div").filter("[id="+fixed._listId+"]").find("a.column_head").filter(":containsTextNode("+fixed.tgtText+")");},
'1077134409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.field-label").filter("[for="+fixed._elemForAttr+"]").children("span[class*='sp-field-label']");},
'1078698151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-input-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-textarea", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-textarea", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("textarea");
}
return wmjQuery();},
'1094339413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id$='form_scroll']").filter("[id*="+fixed._tgtId+"]");},
'1100053257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("sn-canvas-appshell-main") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("macroponent-c276387cc331101080d6d3658940ddd2") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

const fourth = thirdShadow ? wmjQuery(thirdShadow).find("sn-canvas-toolbar") : wmjQuery();
const fourthShadow = fourth.length ? fourth[0].shadowRoot : null;

const fifth = fourthShadow ? wmjQuery(fourthShadow).find("sn-canvas-toolbar-button").filter("[id="+fixed._parentId+"]") : wmjQuery();
const fifthShadow = fifth.length ? fifth[0].shadowRoot : null;

return fifthShadow ? wmjQuery(fifthShadow).find("button") : wmjQuery();
},
'1110694909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[id='"+fixed._textareaId+"']").closest(".form-field");},
'1128474090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.list_header_cell").filter("[name='"+fixed._btnNameAttr+"']").find(".list_header_cell_container").find(".column_head");},
'1132431912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._elemContainerId+"']").find("button").filter("[id='"+fixed._elemId+"']");},
'1135988244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.list_header_cell").filter(":containsTextNode("+fixed.elemTxt+")").find(".list_header_cell_container").find(".column_head");},
'1148726332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[id*='software_master_table']").find(".glide_ref_item_link").eq(1);},
'1150635705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.nav-pills").find("a").filter(":containsTextNode("+fixed.elemAttr+")");},
'1159663839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_section").filter("[tab_caption_raw="+fixed._tabCaptionAtrr+"]").find(".section-content");},
'1175073038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find("img").filter("[src_production*="+fixed._imgSrcProd+"]").closest("a");},
'1183331964': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find("button.action_context").filter(":containsTextNode("+fixed.buttoText+")");},
'1188113954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'macroponent-0d2cdf1bc7761010d447c17cf4c26038',
    { selector: "sn-app-engine-studio", isShadowChild: true },
    { selector: "sn-aes-page-home", isShadowChild: true },
  	{ selector: "sn-aes-create-app-button", isShadowChild: true },
  	{ selector: "now-button", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    return wmjQuery("button", dropDown.shadowRoot);
}
return wmjQuery();},
'1191787672': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form-group").find("input.form-control");},
'1192703114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".progress-bar").find("li").filter(":containsTextNode("+fixed.elmTxt+")");},
'1215561205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[widget='widget']").filter("[sn-atf-area='"+fixed._elemAttr+"']").find("div.myhr-homepage-card-title");},
'1217356276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("sn-canvas-appshell-main") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("macroponent-c276387cc331101080d6d3658940ddd2") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

const fourth = thirdShadow ? wmjQuery(thirdShadow).find("sn-canvas-main") : wmjQuery();
const fourthShadow = fourth.length ? fourth[0].shadowRoot : null;

const fifth = fourthShadow ? wmjQuery(fourthShadow).find("sn-canvas-screen") : wmjQuery();
const fifthShadow = fifth.length ? fifth[0].shadowRoot : null;

const sixth = fifthShadow ? wmjQuery(fifthShadow).find("macroponent-1d033475eb3011106eb96bf3a252287f") : wmjQuery();
const sixthShadow = sixth.length ? sixth[0].shadowRoot : null;

const seventh = sixthShadow ? wmjQuery(sixthShadow).find("now-activity-stream-compose-connected") : wmjQuery();
const seventhShadow = seventh.length ? seventh[0].shadowRoot : null;

const eighth = seventhShadow ? wmjQuery(seventhShadow).find("now-heading") : wmjQuery();
const eighthShadow = eighth.length ? eighth[0].shadowRoot : null;

return eighthShadow ? wmjQuery(eighthShadow).find("h2").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();

},
'1232217719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("option[selected='SELECTED']").filter(":containsTextNode("+fixed.selectedText+")").closest("select").filter("[name='"+fixed._elemText+"']");},
'1248622679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[id='"+fixed._elemId+"']").find(".section-content").find(".row");},
'1262546713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").find("div.select2-container").filter("[id="+fixed._elemId+"]").find("input");},
'1262990993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":directContains("+fixed.labelText+")").closest(".form-group").find(".btn-default").filter(':mt_visible');
},
'1267833492': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".control-label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find(".form-field");},
'1283914537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-input-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-checkbox", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-checkbox", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("input");
}
return wmjQuery();},
'1293147488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find(".navbar-title-caption").filter(":containsTextNode("+fixed.elemTxt+")");},
'1294942918': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id="+fixed._lmId+"]");},
'1307282914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.dropdown-toggle").filter("[aria-controls="+fixed._elemAttr+"]");},
'1317479104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=heading]").filter(":containsTextNode("+fixed.elemLabel+")").closest("div.row").find("a[id*=lookup]");},
'1329943131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".level-two-topic-name").filter(":containsTextNode("+fixed.elmTxt+")");},
'1335457411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function isNavCollapsed(){
	 return +wmjQuery(".navpage-nav").css("width").split("px")[0] > 50 ? false: true;
}

if( isNavCollapsed() ){
	return wmjQuery("[data-original-title='"+fixed._elemData+"']")
}else{
	return wmjQuery("[data-original-title='"+fixed._elemData+"']").next("input");
}


},
'1341910459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_section").filter("[tab_caption='"+fixed._tabCaptionAttr+"']").find(".list_div");},
'1343142280': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").filter("[sn-atf-area='"+fixed._attr+"']").find(".modal-content");},
'1351998301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".category-widget").find("[role='treeitem']").children("div").find(".category").filter(":containsTextNode("+fixed.tgtElemText+")");},
'1354395630': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".outputmsg_text").filter(":containsTextNode("+fixed.lmtext+")").closest(".outputmsg");},
'1356031724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-footer").find("button ").filter(":containsTextNode("+fixed.lmText +")");},
'1372970327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function traverseShadow(selectors) {
  let root = document;

  for (let i = 0; i < selectors.length; i++) {
    const el = root === document
      ? wmjQuery(selectors[i])[0]
      : wmjQuery(selectors[i], root)[0];

    if (!el) return [];

    const shadow = el.shadowRoot;
    if (!shadow) return [];

    root = shadow;
  }

  return root; // final shadow root
}

const chain = [
  "[component-id='lgygmdj']",
  "[component-id='lgygmdj-snCanvasAppshellMain']",
  "[component-id='cm9cgbvkz0002358xjpc7p5gt']",
  "[component-id='cm9cgbvkz0002358xjpc7p5gt-wsContent']",
  "[component-id='mu57tv6fyan3-532']",
  "[component-id='cm9cgglco000f358x1p6qi561']",
  "[component-id='cm9cgglco000f358x1p6qi561-list']",
  "[component-id='mu57tv6fyan3-537']",
  "[component-id='mu57tv6fyan3-591']",
  "[component-id='mu57tv6fyan3-609']",
  "[component-id='mu57tv6fyan3-623']",
  "[component-id='mu57tv6fyan3-642']"
  
];

const finalShadow = traverseShadow(chain);
if (!finalShadow) return [];

return wmjQuery(".now-button", finalShadow);},
'1378810965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[sn-atf-area='"+fixed._elemSnAtfAttr+"']").closest("div[class^=col]");},
'1378968951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".sn-list-group--item").filter(":mt_visible");
} else {
    return wmjQuery();
}},
'1416249231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea.form-control").filter("[id$="+fixed._tgtName+"]");},
'1442524206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sn-canvas-header-title").filter(":containsTextNode("+fixed.tgtElemText+")").closest("#header-container");},
'1453550798': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sn-tooltip-basic").filter(":containsTextNode("+fixed.fieldHeader+")").closest("label").closest(".row").find("select");},
'1457176394': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.uib-tab").filter(":containsTextNode("+fixed.elmTxt+")").find(".badge");},
'1463722491': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-polaris-layout")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sn-polaris-header")[0];
const thirdShadow = third && third.shadowRoot;

if(thirdShadow){
  return wmjQuery(thirdShadow).find(".contextual-zone-button").filter("[aria-label="+fixed.lmAriaLabel+"]");
}


return wmjQuery();},
'1498101111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find("select");},
'1502247414': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-title").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".gbs-card-content");},
'1503770350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-title").filter(":containsTextNode("+fixed.elemTxt+")").closest(".modal-content");},
'1511496546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".popover-header").find("a.btn").filter(":containsTextNode("+fixed.elemTxt+")");},
'1517146666': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field-label").find("span").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'1527597986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter("[id='"+fixed._pageId+"']").find(".navbar_ui_actions").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'1530543168': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-tabs").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'1541168810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true },
  	{ selector: ".all-results-section sn-collapsible-list", isShadowChild: true },
	{ selector: "sn-collapsible-list.nested-item", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    return wmjQuery("a.nested-item", dropDown.shadowRoot).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'1546301538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-title").filter(":containsTextNode("+fixed.elemTitle+")").closest(".panel-heading").closest("div[class^=col]");},
'1560738090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-028dd27ac369ced4be6df2fc05013137")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-cx-navigation", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".sn-cx-navigation__utility-button", secondShadow).filter("[aria-label="+fixed.elemAttr+"]") : {};},
'1575680990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-ng-if='"+fixed._lmdata+"']").parent("[data='data']");},
'1583124410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".employee-center-navigation").find("[role='menuitem']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'1593865972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#homepage-search input.input-typeahead").filter(":mt_visible");},
'1594070245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("div.survey-button-container").find(".survey-heading-text").filter(":contains("+fixed.elemText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1600772382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[id="+fixed._lmid+"]").find(fixed._tagname).eq(0);},
'1606165963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sn-search-results-container")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-search-top-results",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-search-gr-carousel",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery("sn-search-genius-card-assist",thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;
return fourthShadow ? wmjQuery("div.genius-card-container", fourthShadow) : {};},
'1607477558': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-open",isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find("nav").find(".sn-polaris-nav-header-controls.pin").find("button");
} else {
    return wmjQuery();
}},
'1609103663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title-item-filters").find("option").filter(":containsTextNode("+fixed.elmTxt+")");},
'1624460790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".employee-center-navigation").find("a, li").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").find("span");},
'1664466859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
return wmjQuery(".tab_header").find(".tab_caption_text").filter(":contains("+targetText+")");
  
},
'1680334158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".btn").filter("[ng-click='"+fixed._ng_click+"']");},
'1686696139': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='tabpanel']").find(".toggle");},
'1691256190': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("select").filter("[name$='"+fixed._elemText+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1698946096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").find(".btn-default:directContains("+fixed.elemText+")");
},
'1711880846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.LabelText+")").closest("[data-type='label']").next(".input_controls").find(".input-group");},
'1713849526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navigation-menu-item").filter(":containsTextNode("+fixed.elmTxt+")");},
'1721974506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cardText").filter(":containsTextNode("+fixed.lmText+")").closest("a.cards");},
'1726849369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".global-list-item").filter(":mt_visible");
} else {
    return wmjQuery();
}},
'1731118106': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("p").filter(":containsTextNode("+fixed.lblText+")").closest(".article-line").closest(".connectivity-services-content");},
'1731336633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.labelDirectText+")").closest("label").find(".required-marker");},
'1740939567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='nav-link']").filter(":containsTextNode("+fixed.lmtext+")");},
'1755727564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-polaris-layout", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-polaris-header", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(thirdShadow).find(".sn-polaris-tab[role='menuitem']").filter(":containsTextNode("+fixed.lmText+")");
return elem.length ? elem : wmjQuery();},
'1759034788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find("a").filter("[id="+fixed._elmId+"]");},
'1796994252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".polaris-header-menu").find(".sn-polaris-tab").filter(":containsTextNode("+fixed.elemTxt+")").filter(":mt_visible");
} else {
    return wmjQuery();
}},
'1806411163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".navbar-right").find("button").filter("[id="+fixed._lmid+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1814997814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":directContains("+fixed.labelText+")").closest(".form-group").find("input").filter("[type='"+fixed._elemType+"']");
},
'1816599186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;

const second = wmjQuery("sn-canvas-appshell-main", firstShadow)[0];
const secondShadow = second && second.shadowRoot;

const third = wmjQuery("[component-id='cm2xc13un000l358t6nbzsefr']", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;

const fourth = wmjQuery("[component-id='cm2xc13un000l358t6nbzsefr-wsContent']", thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;

const fifth = wmjQuery("[component-id='bl3ppv85rip6-2469']", fourthShadow)[0];
const fifthShadow = fifth && fifth.shadowRoot;

const sixth = wmjQuery("[component-id='cm2xc4al6000p358t9ye1wczx']", fifthShadow)[0];
const sixthShadow = sixth && sixth.shadowRoot;

const seventh = wmjQuery("[component-id='cm2xc4al6000p358t9ye1wczx-form']", sixthShadow)[0];
const seventhShadow = seventh && seventh.shadowRoot;

const eighth = wmjQuery("[component-id='cm2xc4al6000p358t9ye1wczx-form_section_143e028d8742a910431043740cbb3550_choice_resolution_code']", seventhShadow)[0];
const eighthShadow = eighth && eighth.shadowRoot;

const ninth = wmjQuery("[component-id='bl3ppv85rip6-2726']", eighthShadow)[0];
const ninthShadow = ninth && ninth.shadowRoot;

return ninthShadow ? wmjQuery(".now-select-trigger", ninthShadow) : {};


},
'1828662907': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("li.select2-search-field").find("input").filter(":first");},
'1838375043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-content',
    { selector: "now-record-form-connected", isShadowChild: true },
  	{ selector: "sn-form-internal-workspace-form-layout", isShadowChild: true },
  	{ selector: "now-record-common-sidebar", isShadowChild: true },
  	{ selector: ".sidebar-panel sn-form-internal-sidebar-panel", isShadowChild: true },
  	{ selector: fixed._parentTagName, isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".aa-panel");
} else {
    return wmjQuery();
}},
'1854369777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='header-title']").find(".title-content").filter(":containsTextNode("+fixed.elemTitleAttr+")");},
'1854893220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-current]").filter(":containsTextNode("+fixed.curentPage+")").closest(".sp-page-root").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("textarea").filter(":first");},
'1864741832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("[global-navigation-config]")[0].shadowRoot;
let secondShadow = wmjQuery("sn-polaris-layout", firstShadow)[0].shadowRoot;
let thirdShadow = wmjQuery("sn-polaris-header", secondShadow)[0].shadowRoot;
return wmjQuery(thirdShadow).find("div").filter("#"+fixed._elemId);
},
'1871462976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("oi-select").filter("[ng-model='"+fixed._ng_model+"']").find("input");},
'1878667777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-right").find("span[id*=section_head_right]");},
'1878872414': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "[global-navigation-config]",
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find("#"+fixed._elemId);
} else {
    return wmjQuery();
}},
'1879566851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-title-caption").filter(":containsTextNode("+fixed.lmText+")").closest(".container-fluid");},
'1883811036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='button']").filter(":containsTextNode("+fixed.lmText+")").first();},
'1919684672': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.tgtLabel+")").closest("div.form-group").find("span[id$=attachment]").parent("div.input_controls");},
'1923289973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[name="+fixed._formName+"]").find("input[type='radio']").filter("[value="+fixed.Inputvalue+"]");},
'1948578802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.buttonText+")").closest(".wrapper-md").find("thead").find("tr");},
'1953364015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nr-breadcrumbs-container").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'1964580763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-headers", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-tabs", sixSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery("button", sevSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'1971285578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.th-title").filter(":containsTextNode("+fixed.elemText+")").closest("th");},
'1986266599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").find("label").filter(":containsTextNode("+fixed.elemTxt+")");},
'2010383127': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(".panel-heading").filter(":containsTextNode("+fixed.elemText+")").closest(".panel").closest("span").parent("div");},
'2016003114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.list_header").find("td").filter("[name='"+fixed._btnNameAttr+"']").find("input.list_header_search");},
'2036748169': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.txt+")").next(".form-group").find("span[id*='select']");},
'2046764928': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[data-th="+fixed._elemAttr+"]").find(":header").find("a").filter(":first");},
'2047036052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._containerId+"']").find(fixed._elemTagName+".form-control");},
'2050344449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tabpanel']").filter("[tab_caption='"+fixed._tabName+"']").find(".label-text").filter(":directContains("+fixed.elemText+")");
},
'2065331365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-container").find("a").find("span").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'2068380688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".card").filter("[href_production*='"+fixed._href_production+"']");},
'2074594001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-footer").find("a.btn").filter(":containsTextNode("+fixed.elemTxt+")");},
'2082837042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":contains("+fixed.elemTxt+"):first");},
'2094547521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-title-display-value").find(".section_view");},
'2095599570': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.field-label").filter(":containsTextNode("+fixed.elemTxt+")").find("span.help-tag-icon");},
'2116873191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id='"+fixed._parentId+"']").find("input").filter("[id*='"+fixed._elemId+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2125173013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const isNewUi = wmjQuery("[global-navigation-config]");
if (isNewUi.length > 0) {
    let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true },
        { selector: "sn-polaris-menu.is-open", isShadowChild: true }
    );
    if (dropDown) {
        const targetShadow = wmjQuery("sn-collapsible-list", dropDown.shadowRoot);
        let returnedValue = wmjQuery();
        Array.from(targetShadow).forEach(sectionTitle => {
            const targetElem = wmjQuery("[aria-label=" + fixed.sectionTitle + "]", sectionTitle.shadowRoot).parent().find("[role='menuitem'][aria-label=" + fixed.elemText + "]").find(".filter-match");
            if (targetElem.length) {
                returnedValue = targetElem;
            }
        });
        return returnedValue;
    } else {
        return "SNOW-Menu-ClickAll";
    }
} else {
    return wmjQuery("#concourse_application_tree").find("li.sn-widget:containsTextNode(" + fixed.sectionTitle + ")").filter(":mt_visible").find(".sn-widget-list-title").filter(":containsTextNode(" + fixed.elemText + ")");
}},
'2137036213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (sectionShadow) {
    const firstShadowContainer = wmjQuery("sn-collapsible-list", sectionShadow.shadowRoot);
    const rowsShadowArray = Array.from(firstShadowContainer);
    let returnedValue = wmjQuery();
    rowsShadowArray.forEach(target => {
        const targetElem = target && wmjQuery("span."+fixed._elemId, target.shadowRoot).filter(":containsTextNode("+fixed.elemTxt+")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}
return wmjQuery();},
'2143338111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-content").find("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'2145008677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find("button").filter("[title="+fixed.btnTitleAttr+"]");},
'-1689821110': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._elemTag+"[href].navbar-brand");
},
'-1732928593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2:directContains("+fixed.elemText+")").closest(".iconlink a");
},
'-1417969658': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-content").find(".label-text:textEquals("+fixed.elemText+")");
},
'-1780136157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":directContains("+fixed.labelText+")").closest(".form-group").find(".form-control");
},
'-1014815700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function isNavCollapsed(){
	 return +wmjQuery(".navpage-nav").css("width").split("px")[0] > 50 ? false: true;
}

if( isNavCollapsed() ){
	return wmjQuery("[data-original-title='"+fixed._elemData+"']")
}else{
	return wmjQuery("[data-original-title='"+fixed._elemData+"']").closest("form");
}


},
'-542990615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-body").find("[aria-hidden='false']").filter(":directContains("+fixed.elemText+")").closest(".btn-primary").filter("[name='"+fixed._elemName+"']");
},
'-1112093802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[sn-atf-area='"+fixed._parentData+"']").find(".text-default");
},
'-1202830697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("sn-form-internal-header-layout", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("now-record-common-uiactionbar", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-uiactionbar", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-button", sixSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery("button", sevSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-426810550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-reference-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-record-typeahead", eigSh)[0].shadowRoot;
const tenSh = wmjQuery("now-typeahead", ninSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-form-field-label-label .will-truncate", tenSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1025645629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-common-sidebar", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-sidebar-panel", forSh)[0].shadowRoot;
const sixSh = wmjQuery("now-agent-assist", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("sn-aa-headerbar", sixSh)[0].shadowRoot;
const tenSh = wmjQuery("now-heading", sevSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-heading", tenSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1132517931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-input-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-textarea", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-textarea", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("textarea");
}
return wmjQuery();},
'-2124159991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-choice-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-select", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-select", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("button");
}
return wmjQuery();},
'-1233937220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("macroponent-5354f3c5232000100e4bc50947bf65b2")[0].shadowRoot;
const secSh = wmjQuery("now-uxf-visualization-connected", firstSh).filter("[slot="+fixed._elemSlotAttr+"]")[0].shadowRoot;
if (secSh) {
  return wmjQuery(".title-bar", secSh).filter(":containsTextNode("+fixed.elemTxt+")").find(".label-placeholder");
}
return wmjQuery();},
'-566433256': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-canvas-appshell-main", isShadowChild: true },
    { selector: "macroponent-c276387cc331101080d6d3658940ddd2", isShadowChild: true },
    { selector: "sn-canvas-main", isShadowChild: true },
    { selector: "sn-canvas-screen", isShadowChild: true },
    { selector: "macroponent-5ac43b6f878a2d5099aa20ee8bbb3568", isShadowChild: true },
    { selector: "macroponent-eee473af878a2d5099aa20ee8bbb35d3", isShadowChild: true },
  	{ selector: "macroponent-a2b0596cec6b9d49dd1ff9bf76b5084b", isShadowChild: true },
    { selector: "sn-par-visualization-base[title="+fixed.elemTitleAttr+"]", isShadowChild: true },
  	{ selector: "now-heading", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".now-heading", targetShadow).filter("[title="+fixed.elemTitleAttr+"]");
} else {
    return wmjQuery();
}},
'-608897648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sp-field-label-padding").filter(":containsTextNode("+fixed.lmText+")").closest(".form-group").find("a");},
'-187642182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find(".form_action_button").filter(":containsTextNode("+fixed.lmtext+")");},
'-1181401130': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section#quick-link-content .form-container")},
'-380940063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._tgtId+"]").closest("div.form-field");},
'-1200921998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav[data-type='section_head']").find(".form_action_button").filter("[data-action-name="+fixed._tgtName+"]");},
'-1207342478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find("#"+fixed._elemId);
} else {
    return wmjQuery();
}},
'-1094407691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".sn-list-group--item").filter(":mt_visible");
} else {
    return wmjQuery();
}},
'-915978118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='"+fixed._elemSectionIdAttr+"']").find(".navbar-title-display-value");},
'-1464733173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.navbar-header").find("div.navbar-title-caption , span").filter(":contains("+fixed.elemText+")");},
'-1211666009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("span.label-title").filter(":containsTextNode("+fixed.titleText+")").closest("div.panel").find("div.panel-content");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-324939555': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newUi = wmjQuery("[global-navigation-config]");
if (newUi.length) {
    let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true }
    );
    if (headerShadow) {
        const targetShadow = headerShadow.shadowRoot;
        return wmjQuery(targetShadow).find("#all");
    } else {
        return wmjQuery();
    }
}},
'-712688558': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find("input[name="+fixed._elemNameAttr+"]");
} else {
    return wmjQuery();
}},
'-1636287478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[options='options']").find("span").filter(":directContains("+fixed.elemText+")");},
'-455357557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem']").filter(":contains("+fixed.elemText+")");},
'-141215091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.remove_declaration_btn").filter(":containsTextNode("+fixed.elemText+")");},
'-766456689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[type='submit']").filter(":containsTextNode("+fixed.elemText+")");},
'-1035648557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.tab.widget-title").filter(":containsTextNode("+fixed.elemText+")");},
'-1734765097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.myhr-left-filter-panel").find("a.tab.widget-title").filter(":containsTextNode("+fixed.elemText+")").closest("li.ng-scope");},
'-467640745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dropdown-menu .knowledge-base").find("a.sub-category").filter(":containsTextNode("+fixed.elemText+")");},
'-1367997904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cke_editable").find("p").filter(":containsTextNode("+ fixed.btnText +")");},
'-1762204898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea.form-control").filter("[name$="+fixed._tgtName+"]");},
'-1319269858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[sn-atf-area='"+fixed._elemAtfArea+"']").find(".card");},
'-378595446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group[id*="+fixed._lmId+"]").find(".label-text");},
'-1731822240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-canvas-appshell-main", isShadowChild: true },
    { selector: "macroponent-c276387cc331101080d6d3658940ddd2", isShadowChild: true },
    { selector: "sn-canvas-main", isShadowChild: true },
    { selector: "sn-canvas-screen:eq(" + dollars[0] + ")", isShadowChild: true },
    { selector: "macroponent-558adc930f0210107d20409dc4767e84", isShadowChild: true },
    { selector: "macroponent-a04c00820f901010a326b6ade7767ef9", isShadowChild: true },
    { selector: "macroponent-a0c4ddc60f141010a326b6ade7767eb8", isShadowChild: true },
    { selector: "now-record-form-section-column-layout", isShadowChild: true },
    { selector: "now-record-checkbox[name="+fixed._nameAttr+"]", isShadowChild: true },
    { selector: "now-checkbox", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(targetShadow).find("input");
} else {
    return wmjQuery();
}},
'-1101606132': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-type='label']").filter(":containsTextNode("+ fixed.btnText +")").next().find("select.form-control")},
'-82469994': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("strong").filter(":containsTextNode("+fixed.labelText+")").closest("p").find("span.ng-binding");},
'-2069017171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.user-details").find("span[id^='field-sys_user-title']");},
'-764532870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-canvas-appshell-main[id='item-snCanvasAppshellMain']", isShadowChild: true },
    { selector: "macroponent-e341e22cc32e2010ea04a5a1d840dd02", isShadowChild: true },
    { selector: "sn-canvas-main", isShadowChild: true },
    { selector: "sn-canvas-screen", isShadowChild: true },
    { selector: "macroponent-e680e5dbffa01110e13abb63aad33e58", isShadowChild: true },
    { selector: "sn-cmdb-nlq-search-connected[id='item-cmdb_nlq_search']", isShadowChild: true },
    { selector: "sn-nlq-query-input", isShadowChild: true },
    { selector: "now-button", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(targetShadow).find("button");
} else {
    return wmjQuery();
}},
'-2132332605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-type='label']").filter(":containsTextNode("+ fixed.btnText +")").next().find("select,input").filter(".form-control");},
'-19457425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='tab_caption_text']").filter(":containsTextNode("+fixed.elemText+")").closest(".default-focus-outline");},
'-363175521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label,button").filter(":containsTextNode("+fixed.labelText+")").closest(".padder-v").find("textarea");},
'-787423429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find("span[id^='select']");},
'-1755327442': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find("[data-id='header-starting']").find(".tab-name").filter(":containsTextNode("+fixed.elemTxt+")");
} else {
    return wmjQuery();
}},
'-1131358824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-polaris-nav");
} else {
    return wmjQuery();
}},
'-1193244055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-open.is-pinned",isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find("input#filter");
} else {
    return wmjQuery();
}},
'-1059164948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-open.is-pinned",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-polaris-nav");
} else {
    return wmjQuery();
}},
'-1268902920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("sn-workspace-toolbar").find("sn-workspace-toolbar-button[module-id="+fixed._idAttr+"]")[0].shadowRoot;
return wmjQuery("button.sn-workspace-toolbar-button", first);},
'-1526952449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-list-module',
    { selector: "now-record-list-menu-connected", isShadowChild: true },
    { selector: "now-list-menu", isShadowChild: true },
  	{ selector: "sn-list-menu-display",isShadowChild: true },
 	{ selector: "now-content-tree",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
      return targetShadow && wmjQuery(targetShadow).find(".now-content-tree-label").filter(":containsTextNode("+fixed.treeHeaderText+")").closest("li");
} else {
    return wmjQuery();
}},
'-1589947427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id='"+fixed._idAttr+"']");},
'-229270091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name='"+fixed._idAttr+"']");},
'-443032494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_action_button_container").find("button").filter(":containsTextNode("+fixed.elemText+")");},
'-2016351254': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-headers", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-tabs", sixSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery("button", sevSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1463807120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("now-activity-combo", sevSh)[0].shadowRoot;
const ninSh = wmjQuery("now-activity-stream-compose-connected", eigSh)[0].shadowRoot;
const tenSh = wmjQuery("now-heading", ninSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-heading", tenSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1698110568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-reference-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-record-typeahead", eigSh)[0].shadowRoot;
const tenSh = wmjQuery("now-typeahead", ninSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-form-field-label-label .will-truncate", tenSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1708372334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-common-sidebar", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-sidebar-panel", forSh)[0].shadowRoot;
const sixSh = wmjQuery("now-agent-assist", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("sn-aa-headerbar", sixSh)[0].shadowRoot;
const tenSh = wmjQuery("now-heading", sevSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-heading", tenSh).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-2130239415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("sn-record-choice-connected", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-select", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-select", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("button");
}
return wmjQuery();},
'-1029396489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("sn-workspace-content")[0].shadowRoot;
const secSh = wmjQuery("[id^='chrome-tab-panel-record'].is-active now-record-form-connected", firstSh)[0].shadowRoot;
const thrSh = wmjQuery("sn-form-internal-workspace-form-layout", secSh)[0].shadowRoot;
const forSh = wmjQuery("now-record-form-blob", thrSh)[0].shadowRoot;
const fifSh = wmjQuery("sn-form-internal-tabs", forSh).filter(":last")[0].shadowRoot;
const sixSh = wmjQuery("sn-form-internal-tab-contents", fifSh)[0].shadowRoot;
const sevSh = wmjQuery("now-record-form-section-column-layout", sixSh)[0].shadowRoot;
const eigSh = wmjQuery("now-record-date-picker", sevSh).filter("[name="+fixed._btnNameAttr+"]")[0].shadowRoot;
const ninSh = wmjQuery("now-input", eigSh)[0].shadowRoot;
if (sevSh) {
  return wmjQuery(".now-input", ninSh).filter(":containsTextNode("+fixed.elemTxt+")").find("input");
}
return wmjQuery();},
'-2088475443': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstSh = wmjQuery("macroponent-5354f3c5232000100e4bc50947bf65b2")[0].shadowRoot;
const secSh = wmjQuery("now-uxf-visualization-connected", firstSh).filter("[slot="+fixed._elemSlotAttr+"]")[0].shadowRoot;
if (secSh) {
  return wmjQuery(".title-bar", secSh).filter(":containsTextNode("+fixed.elemTxt+")").find(".label-placeholder");
}
return wmjQuery();},
'-1148831308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.list_header_cell").filter(":containsTextNode("+fixed.elemTxt+")").find(".list_header_cell_container").find(".column_head");},
'-2110245353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".esc-header-link-item").filter("[id="+fixed._elemId+"]");},
'-1887134566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.field-label").filter("[for="+fixed._elemId+"]").parent();},
'-252072592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".alert-success").find("[id="+fixed._elemId+"]");},
'-1081389884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.navbar-nav").find("li").filter("[id="+fixed._containerId+"]").find("[id="+fixed._elemId+"]");},
'-1504336853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#comments").find("span").filter(":containsTextNode("+fixed.labelText +")").closest(".form-group").find("textarea").first();},
'-271492564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("span").filter(":containsTextNode("+fixed.elemText+")").closest("div[role='treeitem']");},
'-727022158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("dashboard-overview-card[name='"+fixed._nameAttr+"']").find(".dashboard-overview-card");},
'-1711200095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dashboard-overview-tabs").find("[role='tab']").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-2116266553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
  	{ selector: "sn-polaris-header",isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu.is-pinned",isShadowChild: true },
  	{ selector: "sn-collapsible-list",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".menu-item-row").filter(":containsTextNode("+fixed.menuItemText+")");
} else {
    return wmjQuery();
}},
'-913157968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-content',
    { selector: "now-record-form-connected", isShadowChild: true },
  	{ selector: "sn-form-internal-workspace-form-layout",isShadowChild: true },
  	{ selector: "now-record-form-blob",isShadowChild: true },
  	{ selector: "sn-form-internal-tabs",isShadowChild: true },
  	{ selector: "sn-form-internal-tab-contents:last",isShadowChild: true },
  	{ selector: "now-record-form-section-column-layout",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-section-header-content[data-tooltip="+fixed._dataAttr+"]").closest(".sn-form-column-layout-col");
} else {
    return wmjQuery();
}},
'-460901176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-content',
    { selector: "now-record-form-connected", isShadowChild: true },
    { selector: "sn-form-internal-workspace-form-layout", isShadowChild: true },
    { selector: "sn-form-internal-header-layout", isShadowChild: true },
    { selector: "now-record-common-uiactionbar", isShadowChild: true },
    { selector: "sn-form-internal-uiactionbar", isShadowChild: true }

);
if (sectionShadow) {
    const lastUniqueShadowElem = sectionShadow.shadowRoot;
    const targethadowContainer = wmjQuery("now-button", sectionShadow.shadowRoot);
    const targetShadowArray = Array.from(targethadowContainer);
    let returnedValue = wmjQuery();
    targetShadowArray.forEach(target => {
        const TargetShadow = target && target.shadowRoot;
        const targetElem = TargetShadow && wmjQuery("button", TargetShadow).filter(":containsTextNode(" + fixed.btnText + ")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}
return wmjQuery();},
'-373069197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
  	{ selector: "sn-polaris-layout", isShadowChild: true },
  	{ selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu", isShadowChild: true },
  	{ selector: "sn-collapsible-list", isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".menu-item-row").filter(":containsTextNode("+fixed.elemTxt+")");
} else {
    return wmjQuery();
}},
'-227872180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
  	{ selector: "sn-polaris-layout", isShadowChild: true },
  	{ selector: "sn-polaris-header", isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".logo-area");
} else {
    return wmjQuery();
}},
'-1129316483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
  	{ selector: "sn-polaris-layout", isShadowChild: true },
  	{ selector: "sn-polaris-header", isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".pinned-tabs").parent();
} else {
    return wmjQuery();
}},
'-1665476455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter("[id='"+fixed._elemId+"']").find(".navbar_ui_actions");},
'-1076044077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter("[id='"+fixed._pageId+"']").find(".navbar_ui_actions").find("button").filter("[id="+fixed._elemId+"]");},
'-1766349930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_body").filter("[id='"+fixed._pageId+"']").find("button").filter("[id="+fixed._elemId+"]");},
'-1328982997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-list-module',
    { selector: "now-record-list-menu-connected", isShadowChild: true },
    { selector: "now-list-menu", isShadowChild: true },
    { selector: "sn-list-menu-display", isShadowChild: true },
    { selector: "now-content-tree", isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find("li[role='treeitem'][data-tooltip="+fixed._dataAttrTreeNode+"]").find(".now-content-tree-node[data-tooltip='"+fixed._dataAttrTreeItem+"']");
} else {
    return wmjQuery();
}},
'-1621686824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-header").find("button").filter("#"+fixed._elemId);},
'-1463130574': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true },
        { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
    );
    if (dropDown && dropDown.shadowRoot) {
    const targetShadow = wmjQuery("sn-collapsible-list", dropDown.shadowRoot);
    let returnedValue = wmjQuery();
    Array.from(targetShadow).forEach(sectionTitle => {
        const targetElem = sectionTitle && sectionTitle.shadowRoot && wmjQuery(".label", sectionTitle.shadowRoot).filter(":containsTextNode(" + fixed.sectionTitle + ")").closest(".snf-collapsible-list").find("a.item-label").filter(":containsTextNode("+fixed.elemText+")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}},
'-405040786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true },
        { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
    );
    if (dropDown && dropDown.shadowRoot) {
    const targetShadow = wmjQuery("sn-collapsible-list", dropDown.shadowRoot);
    let returnedValue = wmjQuery();
    Array.from(targetShadow).forEach(sectionTitle => {
        const targetElem = sectionTitle && sectionTitle.shadowRoot && wmjQuery("a.item-label", sectionTitle.shadowRoot).filter("[href*='"+fixed._hrefProdAttr+"']");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}},
'-1898449649': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'macroponent-0d2cdf1bc7761010d447c17cf4c26038',
    { selector: "sn-app-engine-studio", isShadowChild: true },
    { selector: "sn-aes-header-chrome", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    return wmjQuery("a.nav-item", dropDown.shadowRoot).filter("[id="+fixed._elemId+"]");
}
return wmjQuery();},
'-2042234753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'macroponent-0d2cdf1bc7761010d447c17cf4c26038',
    { selector: "sn-app-engine-studio", isShadowChild: true },
    { selector: "sn-aes-header-chrome", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    return wmjQuery("a.nav-item", dropDown.shadowRoot).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1646055189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'macroponent-0d2cdf1bc7761010d447c17cf4c26038',
    { selector: "sn-app-engine-studio", isShadowChild: true },
    { selector: "sn-aes-page-home", isShadowChild: true },
  	{ selector: "sn-aes-image-card[id='"+fixed._elemId+"']", isShadowChild: true },
  	{ selector: "sn-aes-fake-now-card", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
    return wmjQuery(".fake-now-card", dropDown.shadowRoot);
}
return wmjQuery();},
'-516550334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
  const wantedShadowContainer = wmjQuery(".super-filter-header", dropDown.shadowRoot).filter(":containsTextNode("+fixed.sectionTitle+")").next(".results-section").find("sn-collapsible-list")[0];
  const wantedShadow = wantedShadowContainer && wantedShadowContainer.shadowRoot;
  const targetShadowContainer = wantedShadow && wmjQuery("sn-collapsible-list.nested-item", wantedShadow)[0];
  const targetShadow = targetShadowContainer && targetShadowContainer.shadowRoot;
    return targetShadow && wmjQuery("a.nested-item", targetShadow).filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-1482830618': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true },
        { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true },
  		{ selector: "sn-collapsible-list", isShadowChild: true }
    );
    if (dropDown && dropDown.shadowRoot) {
    const targetShadow = wmjQuery("sn-collapsible-list", dropDown.shadowRoot);
    let returnedValue = wmjQuery();
    Array.from(targetShadow).forEach(sectionTitle => {
        const targetElem = sectionTitle && sectionTitle.shadowRoot && wmjQuery("a.item-label", sectionTitle.shadowRoot).filter("[href_production*='"+fixed._hrefProdAttr+"']");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}},
'-982199367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
        wmjQuery,
        '[global-navigation-config]',
        { selector: "sn-polaris-layout", isShadowChild: true },
        { selector: "sn-polaris-header", isShadowChild: true },
        { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true },
  		{ selector: "sn-collapsible-list", isShadowChild: true },
		{ selector: "sn-collapsible-list", isShadowChild: true }
    );
    if (dropDown && dropDown.shadowRoot) {
        return dropDown.shadowRoot && wmjQuery("a.item-label", dropDown.shadowRoot).filter(":containsTextNode("+fixed.elemTxt1+")").filter(":containsTextNode("+fixed.elemTxt2+")");
}
wmjQuery();},
'-2059541572': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let dropDown = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-polaris-menu.is-main-menu", isShadowChild: true },
  	{ selector: "sn-collapsible-list", isShadowChild: true }
);
if (dropDown && dropDown.shadowRoot) {
  return wmjQuery(".snf-collapsible-list", dropDown.shadowRoot).filter(":containsTextNode("+fixed.sectionTitle+")").find("a.item-label").filter(":containsTextNode("+fixed.elemTxt+")");
}
return wmjQuery();},
'-421767063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_caption_text").filter(":containsTextNode("+ fixed.btnText +")").closest("span[role='tab']");},
'-1993388814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id$='"+fixed._formGroupId+"']").find(".label-text");},
'-1657812324': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".form-group").filter("[id*="+fixed._formGroupId+"]").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1153601150': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("input");},
'-492402663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("textarea");},
'-875782863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").find("textarea").filter("[id="+fixed._elemId+"]");},
'-340539691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section-content").find(".label-text").filter(":containsTextNode("+fixed.tgtDirectText+")");},
'-69431834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".annotation-wrapper").filter(":containsTextNode("+fixed.sectionheader+")").closest("[data-annotation-type='Section Separator']").closest(".vsplit").find(".label-text").filter(":containsTextNode("+fixed.lmtext+")");},
'-1235138372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.label_text+")").closest(".form-group").find(".checkbox-label");},
'-2037524215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").find(".label-text").filter(":containsTextNode("+fixed.lmtxt+")").filter(":mt_visible");},
'-1617412861': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-current]").filter(":containsTextNode("+fixed.curentPage+")").closest(".sp-page-root").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("li.select2-search-field").find("input").filter(":first");},
'-1869191773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").filter(":containsTextNode("+fixed.labelTxt+")").find("textarea");},
'-751471674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-open.is-pinned",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-polaris-nav-header-filter").closest(".sn-polaris-nav-header");
} else {
    return wmjQuery();
}},
'-1846671797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter(":containsTextNode("+fixed.tgtText+")").find("a.column_head").filter(":mt_visible");},
'-1273252036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[name='"+fixed._elemId+"']").find("a.column_head").filter(":mt_visible");},
'-1345564634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='item-header']").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".panel").find("input").filter("[name='"+fixed._btnNameAttr+"']");},
'-1452959039': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadowElem = wmjQuery(":header").filter(":containsTextNode("+fixed.headerDirectText+")").closest(".input-group").find("sn-search-combobox")[0];
const firstShadow = firstShadowElem ? firstShadowElem.shadowRoot : null;
const secondShadowElem = firstShadow ? wmjQuery("sn-search-combobox-desktop",firstShadow)[0] : null;
return secondShadowElem ? wmjQuery(".search-combobox",secondShadowElem.shadowRoot).find(".input-container") : wmjQuery();},
'-1293663776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").filter(":containsTextNode("+fixed.formTitle+")").closest(".panel").find(".form-group").filter(":contains("+fixed.labelTxt+")").find("textarea");},
'-1828358203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._elemId+"']");},
'-996730154': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (sectionShadow) {
    const firstShadowContainer = wmjQuery("sn-collapsible-list", sectionShadow.shadowRoot);
    const rowsShadowArray = Array.from(firstShadowContainer);
    let returnedValue = wmjQuery();
    rowsShadowArray.forEach(target => {
        const targetElem = target && wmjQuery(".menu-item-header", target.shadowRoot).filter(":containsTextNode("+fixed.listHeaderText+")").closest(".snf-collapsible-list").find("span."+fixed._elemId).filter(":containsTextNode("+fixed.elemTxt+")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}
return wmjQuery();},
'-1167252264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (sectionShadow) {
    const firstShadowContainer = wmjQuery("sn-collapsible-list", sectionShadow.shadowRoot);
    const rowsShadowArray = Array.from(firstShadowContainer);
    let returnedValue = wmjQuery();
    rowsShadowArray.forEach(target => {
        const targetElem = target && wmjQuery("span."+fixed._elemId, target.shadowRoot).filter(":containsTextNode("+fixed.elemTxt+")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}
return wmjQuery();},
'-226958332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-main-menu", isShadowChild: true }
);
if (sectionShadow) {
    const firstShadowContainer = wmjQuery("sn-collapsible-list", sectionShadow.shadowRoot);
    const rowsShadowArray = Array.from(firstShadowContainer);
    let returnedValue = wmjQuery();
    rowsShadowArray.forEach(target => {
        const targetElem = target && wmjQuery(".menu-item-header", target.shadowRoot).filter(":containsTextNode("+fixed.listHeaderText+")").closest(".snf-collapsible-list").find("span."+fixed._elemId).filter(":containsTextNode("+fixed.elemTxt+")");
        if (targetElem.length) {
            returnedValue = targetElem;
        }
    });
    return returnedValue;
}
return wmjQuery();},
'-587185318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".form-group").find(".select2-container");},
'-1701306184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-menu").find("a[role=menuitem]").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1604719837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".form-group").find("a.form-control");},
'-1264967441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
  	{ selector: "sn-polaris-menu.is-pinned",isShadowChild: true }

);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(targetShadow).find(".sn-polaris-nav-header-filter").closest(".sn-polaris-nav-header");
} else {
    return wmjQuery();
}},
'-2106674575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find(".form_action_button").filter(":containsTextNode("+fixed.lmtext+")");},
'-1811206838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[sn-atf-area='"+fixed._idAttr+"']").find("h2").filter(":contains("+fixed.labelText+")");},
'-889680989': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[sn-atf-area='"+fixed._areaAttr+"']").find(".content-card-container");},
'-2097644577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".topic-name").filter(":containsTextNodeIgnore("+fixed.headertxt+")").closest("a");},
'-1541184745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-container").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-2132140411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".main-menu").find("[role='menuitem']").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1681792147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".my-favorite-apps").find(".app-name").filter(":containsTextNode("+fixed.elmTxt+")").closest("a").parent();},
'-1398663650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".my-favorite-apps").find("a").filter("[href_production*='"+fixed._hrefProd+"']").closest("div");},
'-2014756245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".level-one-topic-name").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1518008756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-container").find(".level-one-item").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1252650341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[global-navigation-config]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-polaris-layout",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-polaris-header",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".user-menu-icon").filter("[icon="+fixed._iconAttr+"]").closest("button") : wmjQuery();},
'-2006608200': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".topic-title").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1575237536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".my-favorite-apps").find("a").filter(":containsTextNode("+fixed.elmTxt+")").closest("div");},
'-65496196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".title-text").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-551364720': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".uib-tab").find("a").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1255250621': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".row").find("label").find(".sn-tooltip-basic").filter("[aria-label="+fixed.tgtElemAriaLabel+"]");},
'-69823600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".item-header").find("h2").filter(":containsTextNode("+fixed.lmText+")");},
'-1831826282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sn-tab-filter")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("now-tabs",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow).filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'-24157271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".level-one-topic-name").filter(":containsTextNode("+fixed.topicNameTxt+")").closest(".level-one-item").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1257824362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sn-search-results-container")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("now-pagination-control",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find(".now-pagination-control-button-iconic").filter("[data-testid='"+fixed._actionNameAttr+"']")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("button",thirdShadow) : wmjQuery();},
'-1574898681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(".proceed2B");},
'-1056563901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1716114920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNode("+fixed.buttonText+")");},
'-62527140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".header-menu-item").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-624971351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._outerId+"]").find(".form-group").find(".select2-chosen");},
'-1684780054': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".select2-container").filter("[id="+fixed._outerId+"]").find(".select2-chosen");},
'-677225121': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-heading").find(".panel-title").filter(":containsTextNode("+fixed.elmTxt+")");},
'-366049368': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-title").filter(":containsTextNode("+fixed.headerTxt+")").closest(".panel-heading");},
'-619581340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".progress-bar").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-163790285': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".field-label").filter(":containsTextNode("+fixed.lbltxt+")").closest("div");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1489957805': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.form-control").filter("[id="+fixed._inputid+"]");},
'-469141335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.form-control").filter("[name="+fixed._lmname+"]");},
'-1339617583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find("a").filter(":containsTextNode("+fixed.elemText+")");},
'-769829453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sn-workspace-header")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-workspace-notification-icon")[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery(secondShadow).find("button");},
'-2080184046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-title").filter(":containsTextNode("+fixed.kmtext+")");},
'-896801322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#editDatePickerLabel").filter(":containsTextNode("+fixed.lbltxt+")").closest(".date-content").find(".date-picker").find("input");},
'-695801765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[id='search-support']").find("[role='searchbox']");},
'-1583962536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".modal-header").find("button.close");},
'-869343396': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".buttonSupport").find(".buttonText").filter(":containsTextNode("+fixed.txt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-2054172698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest(".section-header").closest(".form-container");
},
'-1333050789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".page-heading").find(":header").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-563505803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.elmTxt+")").closest(".container-caption").parent();},
'-1211860012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter("[id="+fixed._headerId+"]").closest(".form-container-caption").parent();},
'-239212244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_header").find(".navbar-title-caption");},
'-889988035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find("input[name="+fixed._elemNameAttr+"]");
} else {
    return wmjQuery();
}},
'-2093189227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let headerShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    '[global-navigation-config]',
    { selector: "sn-polaris-layout", isShadowChild: true },
    { selector: "sn-polaris-header", isShadowChild: true },
    { selector: "sn-search-input-wrapper", isShadowChild: true },
    { selector: "sn-component-workspace-global-search-typeahead", isShadowChild: true }
);
if (headerShadow) {
    const targetShadow = headerShadow.shadowRoot;
    return wmjQuery(targetShadow).find("div[role='search']").find("input");
} else {
    return wmjQuery();
}},
'-1629512302': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav.navbar-inverse").find(".navbar-brand-logo").find("img");},
'-57767065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'sn-workspace-content',
    { selector: "now-record-form-connected", isShadowChild: true },
    { selector: "sn-form-internal-workspace-form-layout", isShadowChild: true },
    { selector: "now-record-form-blob", isShadowChild: true },
    { selector: "sn-form-internal-tabs", isShadowChild: true },
    { selector: "sn-form-internal-tab-contents", isShadowChild: true },
    { selector: "now-record-form-section-column-layout", isShadowChild: true },
    { selector: "sn-record-choice-connected[name='contact_type']", isShadowChild: true },
    { selector: "now-select", isShadowChild: true }
);
const wmSectionShadow = wmjQuery(sectionShadow);
if (wmSectionShadow.length) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".now-form-field-label").filter(":containsTextNode("+fixed.labelTxt+")").next("now-popover").find("button");
} else {
    return wmjQuery();
}},
'-1243798538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".breadcrumb_container").find("button").filter(".breadcrumb_link").filter(":mt_visible");},
'-296841066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find("select");},
'-620935838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id='"+fixed._lmId+"']");},
'-1653798887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dropdown-menu").find("[role=menuitem]").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-432642597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".notification-error[role='alert']");},
'-1919930600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const option1 = wmjQuery("input[type='search']").filter("[id$='" + fixed._tgtId + "']").closest("div.form-field");
const option2 = wmjQuery("input[type='text']").filter("[id$='" + fixed._tgtId + "']").closest(".input_controls");

return option1.length > 0 ? option1 : (option2.length > 0 ? option2 : wmjQuery());
},
'-981157984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.label-text").filter(":containsTextNode("+fixed.lmText+")").closest(".form-group").find(".input-group-checkbox");},
'-193374194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter_type").filter("[data-original-title="+fixed._arialabel+"]").find("a").eq(1);},
'-1300895734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter_row_condition").find(".select2-chosen");},
'-917517511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("span.label-text").filter(":containsTextNode("+fixed.lblText+")").closest("label").closest(".form-group").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-171372081': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[ng-controller='spWidgetDebug']").find(".alert-info");},
'-2000990656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[id*='software_master_table']").find(".glide_ref_item_link").eq(0);},
'-1350350689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest(".form-group").find("input").filter(":mt_visible");},
'-1474949281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-group").filter("[id='"+fixed._lmid+"']").find(".form-field");},
'-1738008808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_caption_text").filter(":containsTextNode("+fixed.txt+")").closest("[class*='_tab']");},
'-336872990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[app-id=a84adaf4c700201072b211d4d8c260b7]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-polaris-layout", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-polaris-header", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(".polaris-header-menu[role='menu']", thirdShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-1188453106': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[app-id=a84adaf4c700201072b211d4d8c260b7]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("sn-polaris-layout", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("sn-polaris-header", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(thirdShadow).find(".sn-polaris-tab[role='menuitem']").filter(":containsTextNode("+fixed.lmText+")");
return elem.length ? elem : wmjQuery();},
'-358757478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel").find(":header").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".item-header");},
'-901882171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-header").find(".header-menu-item").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-216305104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").filter(":containsTextNode("+ fixed.btnText +")");},
'-962246143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sn-search-facets");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("sn-search-facets-desktop");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".accordion-title").filter(":containsTextNode("+fixed.elmTxt+")").closest(".tree-expand-button") : wmjQuery();},
'-1913815068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".uib-tab").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1436425537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".gt-menu-item").find("now-icon").filter("[icon='"+fixed._iconAttr+"']");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("svg") : wmjQuery();},
'-1850750592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".level-one-topic-name").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".level-one-item").find(".sub-topic-groups").find("a").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-2032186663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-028dd27ac369ced4be6df2fc05013137")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("sn-cx-navigation")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".sn-cx-navigation__utility-avatar-label").filter(":containsTextNode(" + fixed.elemText + ")").parent(".sn-cx-navigation__utility-button"): wmjQuery();},
'-482131620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[role="tablist"]').find(".tabs2_tab").filter('[aria-controls="'+fixed._elemTxt+'"]');},
'-341272846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[aria-label="+fixed.lmAriaLabel+"]");},
'-1807819038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-polaris-layout")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sn-polaris-header")[0];
const thirdShadow = third && third.shadowRoot;


if(thirdShadow){
 		 return wmjQuery(thirdShadow).find("img").filter("[id="+fixed._lmId+"]");
		
}

return wmjQuery();},
'-701273273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("sn-polaris-layout")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("sn-polaris-header")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery(thirdShadow).find("sn-search-input-wrapper")[0];
const fourthShadow = fourth && fourth.shadowRoot;
const fifth = wmjQuery(fourthShadow).find("sn-component-workspace-global-search-typeahead")[0];
const fifthShadow = fifth && fifth.shadowRoot;

if(fifthShadow){
 		 return wmjQuery(fifthShadow).find("now-tooltip").filter("[aria-label="+fixed.lmAriaLabel+"]").closest(".sn-global-typeahead-control-container");
		
}


return  wmjQuery();},
'-886516580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-color").filter(":containsTextNode("+fixed.LabelText+")").siblings(".header-text").find(".ng-binding");},
'-1714052995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-type='label']").filter(":containsTextNode("+ fixed.btnText +")").next().find("select,input").filter(".form-control");},
'-1355073544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelFor+"]").find(".label-text").filter(":containsTextNode("+fixed.lmText+")");},
'-2002369628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='triage']").filter(":containsTextNode("+fixed.elemText+")").eq(1);},
'-689382296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ods-heading").filter(":containsTextNode("+fixed.labelTxt+")").closest(".events-header-tabs");},
'-1065505418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("sn-canvas-appshell-main") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("macroponent-c276387cc331101080d6d3658940ddd2") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

const fourth = thirdShadow ? wmjQuery(thirdShadow).find("sn-canvas-main") : wmjQuery();
const fourthShadow = fourth.length ? fourth[0].shadowRoot : null;

const fifth = fourthShadow ? wmjQuery(fourthShadow).find("sn-canvas-screen") : wmjQuery();
const fifthShadow = fifth.length ? fifth[0].shadowRoot : null;

const sixth = fifthShadow ? wmjQuery(fifthShadow).find("macroponent-fe9aa6e943310210583599612bb8f291") : wmjQuery();
const sixthShadow = sixth.length ? sixth[0].shadowRoot : null;

const seventh = sixthShadow ? wmjQuery(sixthShadow).find("macroponent-1f504957376b121029ad1df5e1c06799") : wmjQuery();
const seventhShadow = seventh.length ? seventh[0].shadowRoot : null;

const eighth = seventhShadow ? wmjQuery(seventhShadow).find("now-stylized-text") : wmjQuery();
const eighthShadow = eighth.length ? eighth[0].shadowRoot : null;

return eighthShadow ? wmjQuery(eighthShadow).find("span") : wmjQuery();},
'-1035786284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("macroponent-f51912f4c700201072b211d4d8c26010").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("sn-canvas-appshell-main") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("macroponent-c276387cc331101080d6d3658940ddd2") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

const fourth = thirdShadow ? wmjQuery(thirdShadow).find("sn-canvas-tabs") : wmjQuery();
const fourthShadow = fourth.length ? fourth[0].shadowRoot : null;

return fourthShadow ? wmjQuery(fourthShadow).find(".sn-chrome-one-tab-label") : wmjQuery();},
'-90784573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label-text").filter(":containsTextNode("+fixed.labelText+")").closest(".form-group").find(".input-group");},
'-1203487627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find("[type='search']").filter("[placeholder='"+fixed._placeholder+"']");},
'-1023163634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find("[type='search']").filter("[placeholder*='"+fixed._placeholder+"']");},
'-1625794062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar").find("button").filter("[id="+fixed._lmid+"]");},
'-634680180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
return wmjQuery(".tab_header").find(".tab_caption_text").filter(":contains("+targetText+")");
  
},
'-1968519750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
return wmjQuery(".tab_header").find(".tab_caption_text").filter(":contains("+targetText+")");
  
},
'-187214777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("textarea").filter("[aria-label="+fixed.lmAriaLabel+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1148137337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sn-canvas-header-title").filter(":containsTextNode("+fixed.lmText+")");},
'-1059343047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".feedback-drawer-container").find(".btn-feedback-drawer");},
'-1032361834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("now-assist-full-page-wrapper-app")[0];
const firstShadow = first ? first.shadowRoot : null;
const second = wmjQuery(firstShadow).find("now-assist-dialog")[0];
const secondShadow = second ? second.shadowRoot : null;
const third = wmjQuery(secondShadow).find("now-button-iconic").filter("[icon="+fixed._lmIcon+"]")[0];
const thirdShadow = third ? third.shadowRoot : null;
const elem = wmjQuery(thirdShadow).find("button");
return elem.length ? elem : wmjQuery();
},
'-177540851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".search-filter-sidebar").find(".facet-filter-title").filter(":containsTextNode("+fixed.titkeText+")").closest(".facet-filter-group-header").next(".facet-filter-group-body").find(".facet-filter-subgroup");},
'-331974907': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='search']").filter("[aria-label="+fixed.lmAriaLabel+"]");},
'-534249807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name="+fixed._lmBname+"]");},
'-213600573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split("(")[0] : null;
return wmjQuery(".tab_caption_text").filter(":contains("+targetText+")").parent("span");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);