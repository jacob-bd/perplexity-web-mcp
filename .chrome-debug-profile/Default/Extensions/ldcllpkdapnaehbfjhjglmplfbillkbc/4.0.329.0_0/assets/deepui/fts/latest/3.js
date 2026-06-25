(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '340978': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-help-id=goalForm]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field[name="+fixed._goalName+"]",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.labelTxt+")")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(".ui5-label-required-colon",thirdShadow) : wmjQuery();},
'6862590': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("ui5-shellbar-sf-header")[0];
const secondShadow = second && second.shadowRoot ;
const third = wmjQuery(secondShadow).find("ui5-button-sf-header.ui5-shellbar-search-button")[0];
const thirdShadow = third && third.shadowRoot ;
const elem = wmjQuery(thirdShadow).find("button").filter("[title="+fixed.lmText+"]");

return elem.length ? elem : wmjQuery();
},
'7170765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapcnqr-data-grid__header").find(".sapcnqr-checkbox__input")},
'7877348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".title.section", isShadowChild:false});
} else {
 return wmjQuery(".sapSfTodoPanel").find("li:eq("+fixed._index+") [role='heading'] span")
}
},
'9512558': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("ui5-title").filter(":containsTextNode("+fixed.lmText+")").closest("ui5-dialog").find("div").filter("[id="+fixed._parentId+"]").children("div"): wmjQuery() ;

},
'9928868': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-help-id="+fixed._btnDataHelpIdAttr+"]");},
'10906797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] input:first")},
'12969604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMLabel").filter("[title="+fixed.tgtLabel+"]").find("bdi");},
'12974008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-side-navigation-sub-item-xweb-form-inbox").filter("[text="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find(".ui5-sn-item-text");
return elem.length ? elem : wmjQuery();},
'17371456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-opportunity-set").filter("[id="+fixed._lmId+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("span[id*=inner]");
return elem.length ? elem : wmjQuery();

},
'18550739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInputBaseContentWrapper.sapMInputBaseHasEndIcons:eq(1)")},
'19850463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("tr").find(".toggle");},
'19986708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button:last")},
'23682820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class*=" + dollars[0] + "]:eq(0)")},
'25183227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+text+")");
}else{
	return wmjQuery(".sub-nav-container").find(".globalNavigationActiveItem:directContains("+text+")");
}






},
'26645393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:contains(" + dollars[0] + "):eq(0)")},
'26703825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] span span span a:first")},
'27344928': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPlacematText.sapMBtn.surjUserPhoto.surjUserPhotoCircle.surjUserPhotoName-EAST.surjUtilityLinksMenu")},
'28607978': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".inline").filter(":containsTextNode("+fixed.lmText+")").closest(".workBenchPipeElem");},
'30006835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapUiCalHeadBFirst").filter(":mt_visible");},
'30285891': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div [id = \"bizXSearchField-I\"]")},
'30705329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".sfEnsureSAPTheme")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("[id='shellbar']")[0]
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").filter("[data-ui5-stable=" + fixed._elemText + "]") : wmjQuery();},
'32355395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer[class~=" + dollars[0] + "] button:contains(" + dollars[1] + ")")},
'32992553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnCustomIcon.sapUiIconMirrorInRTL:eq(" + dollars[0] + ")")},
'33402511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-card[class*='GoalActivityContainer']",
	{selector:"div.ui5-card-header" ,isShadowChild:true })
},
'38212531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-label="+fixed.elemAttr+"]").closest(".fieldWithOldValue");},
'39028628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[id=" + dollars[0] + "] th:first")},
'40046474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next();},
'42999990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiLoSplitterContent").find(".sapMTitle").filter(":containsTextNodeIgnore("+ fixed.titleText +")").closest(".sapMIBar");},
'45300503': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstOption = wmjQuery(".attachment_link").find("a.viewAttachment").filter(":mt_visible");
const secondOption = wmjQuery(".sapMText").filter(":containsTextNodeIgnore("+fixed.labelTxt+")");
if (firstOption.length) {
  return firstOption.find("span.fd-link__content");
} else if (secondOption.length) {
  return secondOption.closest("tr").find("a.sapMLnk");
}
return wmjQuery();},
'46063005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] a:first")},
'47578344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('ui5-dialog-xweb-mini-app-dialog ').find('[data-testid="headerTitle"]').filter(":containsTextNodeIgnore("+fixed.dialogHeader+")").parent();},
'47994515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=headerText]").filter(":containsTextNode("+fixed.headerText+")").closest("[class*=CardFloatingHeader_headerContainer]").closest("div[class*=CardWrapper_withFooter]");},
'50521309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[role='region']").find(".pmItemName").filter(":containsTextNode("+fixed.cardTitle+")").closest(".sfObjectPageSectionContainer");},
'54116806': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find("bdi").filter(":containsTextNodeIgnore("+fixed.bdiDirectText+")").closest("[class*='sapMFlexItem']");},
'54630521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "]:last")},
'56314618': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ectFormContainer").find(".buttonBar button").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'58700873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-card-xweb-people-profile").filter("[data-testid='"+fixed._dataTestId+"']").find("ui5-button-xweb-people-profile").filter("[icon=" + fixed._icon + "]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'59158633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.ttxt+")").closest(".field_label").closest(".form_field").find("[class*='writeField']");},
'63088206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span>button:contains(" + dollars[0] + ")")},
'65476776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id]").filter("[id="+fixed._spanId+"]").closest(".tableHeaderLabel").filter("[id="+fixed._lmId+"]");},
'65820093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.headerText+")").closest(".pmPortletContainer").find("label").filter(":containsTextNode("+fixed.lblText+")").closest(".HR").closest(".rowVT").find(".nrte_content_webkit").last();},
'67763639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.txt+")").closest("[class*='colGroupHeader']");},
'71384062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-text-sf-talent-feedback, [class*=Text]").filter("[id="+fixed._lmAttr+"]");},
'71511118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-todo-list")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find(".title").filter(":containsTextNode("+fixed.lmText+")")

return elem.length ? elem : wmjQuery();
},
'75147797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").find("span").filter(":directContains("+fixed.elemText+")");},
'75680903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter(":containsTextNode("+fixed.headertxt+")").closest(".form_header");},
'78601099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListTblCell.sapMListTblCellNoData:contains(" + dollars[0] + "):visible")},
'79624384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.labelTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'79968569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSToolbar").filter(":containsTextNode("+fixed.lmtext+")");},
'80057906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+ fixed.titleText +")");},
'80137025': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a[onclick*=" + dollars[1] + "]")},
'80742737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:contains(" + dollars[0] + "):visible")},
'81246384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").children().filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find("bdi").filter(":containsTextNode("+fixed.lmText+")");},
'85319577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMListTblCnt:eq(" + dollars[0] + ") input.sapMComboBoxInner:eq(1)")},
'88049352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".anchor_rel").filter("[title='"+fixed.sectionHeaderAttr+"']").closest("div[role='region']").find("[role='tab']").filter("[title='"+fixed.elemAttr+"']").filter(":first");},
'88755120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".magicTableWrapper").find("button").filter(":containsTextNode("+ fixed.btnText +")")},
'88820552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMListItems").find("button").filter("[title=" + fixed.titleText + "]");},
'88839178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstOption = wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.lmHeaderTxt+")");
return firstOption.length ? firstOption.closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find("bdi").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery(".sapMListHdr").filter(":containsTextNode("+fixed.lmHeaderTxt+")").parent().find("bdi").filter(":containsTextNode("+fixed.lmText+")");},
'90014730': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"ul[role='tablist']" ,isShadowChild:true });
} else {
 return wmjQuery(".globalHeaderHeight .surjContainer[role='navigation']")
}
},
'90404463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".actions_list_elem").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'91491531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=anchBar].sapUxAPAnchorBarButton:eq(2)")},
'92447787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'92675854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*=" + dollars[0] + "]:contains(" + dollars[1] + "):visible")},
'93039307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog'] footer button:contains(" + dollars[0] + ")")},
'93170424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};
let text = ftHelper.unQuote(wmjQuery().identity(fixed.elemText));
const headerCheckOld = wmjQuery("ui5-static-area-item");
const headerCheckNew = wmjQuery("ui5-static-area-item-sf-header");
if( headerCheckOld.length > 0 ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+"),ui5-li-sf-header:containsTextNode("+text+")", isShadowChild:false},
	{selector:"li", isShadowChild:true});
}if(headerCheckNew.length > 0){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li-sf-header:containsTextNode("+text+")", isShadowChild:false},
	{selector:".menuItemSpace", isShadowChild:false})
}},
'93293664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.lmText+")") : wmjQuery();
},
'95927299': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.axial").find("label").filter("[for=" + fixed._titleText + "]")},
'96548577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem[title=" + dollars[0] + "]:visible")},
'97356660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUshellTileInner").filter("[title="+fixed.titleText+"]").closest("li").find(".globalLPTileContent");},
'98461178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:contains(" + dollars[1] + "):last")},
'99560788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
	return wmjQuery("xweb-shellbar").length > 0; 
} function 

getHeaderBar1(){ 
	const one = wmjQuery("xweb-shellbar")[0].shadowRoot; 
	return wmjQuery("#shellbar", one)[0].shadowRoot; 
} 

if( headerCheck1() ){

	function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
  	 	 let containers = wmjQuery(nonUniqueContainer);
   		 let curr, last;
			const arr = Array.from(containers);
			for(let j = 0; j<arr.length; j++){
   		     curr = last = arr[j];
    		    for (let i = 0; i < args.length; i++) {
     		   	    last = curr;
       			     	if (last.length === 1 || i === 0) {
        	        	if (args[i].isShadowChild) {
                   	 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
               	 } else {
               	     curr = wmjQuery(args[i].selector, last);
               	 }
               	 if (i === args.length - 1) {
               	     return curr;
               	 }
           	 }
        	}
		}
    	return wmjQuery();
	};

	return findShadowDomWithoutUniqueContainer_1("ui5-static-area-item",
		{selector:".ui5-shellbar-menu-popover" ,isShadowChild:true },
		{selector:"section .ui5-popup-content" ,isShadowChild:true });
}else{
	return wmjQuery("#customHeaderModulePickerBtn-menuPopover-scroll")
}



},
'102478364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNode("+fixed.elemTxt+")")[1];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'103081480': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabButton.selected").filter(":containsTextNode("+fixed.selectedTab+")").closest(".tab_panel").find("[role='status']").parent("div");},
'103622734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle").filter(":containsTextNode("+fixed.elemTxt+")").next(".pmPortlet");},
'103639426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field[id='"+fixed._goalId+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(".ui5-label-required-colon",thirdShadow) : wmjQuery();},
'103732999': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[aria-label="+fixed.tgtLabel+"]").find("bdi");},
'108232336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	let three = wmjQuery(".ui5-shellbar-logo", two);
	return wmjQuery(three);
}else{
	return wmjQuery("#bizXHeaderCompanyLogo");
}
},
'108594163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] button.globalPrimaryButton:last")},
'108903474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog-xweb-people-profile[data-testid='quickActionsDialog']").find("ui5-li-xweb-people-profile").filter("[data-testid=" + fixed._titleText + "]");},
'112472889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class^=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'114163221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapMTitle span").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'114713789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[onclick*='tgmEdit']")},
'115144487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='Button']").filter("[data-help-id="+fixed._dataid+"]");},
'117510922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const evnCheck = wmjQuery("xweb-shellbar")
if(evnCheck.length){
let first = wmjQuery("[class*='MyTeamDialog_detailsContainer']").find("ui5-li").filter(":containsTextNode("+fixed.lmText+")")[0]
let firstShadow = first && first.shadowRoot; 
return wmjQuery(".ui5-li-title", firstShadow)
} 
return wmjQuery("#myTeamDialog").find("a").filter(":containsTextNode("+fixed.lmText+")")},
'117786077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("span[title='" + fixed.title + "']").parents("div.sapUiVlt:first").find("div.sapMInputBaseContentWrapper")

},
'120667079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panelHeaderTitle").filter(":containsTextNode("+fixed.labelText+")").closest(".panelHeader").next(".panelContent").find(".ectFCBody");},
'123152619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalSecondaryButton").filter(":containsTextNode("+fixed.lmNextBtnTxt+")").closest(".workflowActions").find(".globalPrimaryButton").filter(":containsTextNode("+fixed.lmText+")"); },
'123554257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("[id^='reportListPageView']").find("bdi").filter(":containsTextNode("+ fixed.btnText +")");
if (elem.length)
 {return elem;} 
return wmjQuery("#pageHeader nav").find(".sapMBreadcrumbsItem").find("span.sapMText").filter(":containsTextNode("+ fixed.btnText +")");},
'123883856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='button-row-container']").find("ui5-button-xweb-homepagex").filter(":containsTextNode("+fixed.elemTxt+")").parent("[role=listitem]");},
'123992238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=anchBar].sapUxAPAnchorBarButton:eq(" + dollars[0] + ")")},
'124009687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalRoundedCornersXSmall globalPrimaryButton']:last")},
'125176697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("[data-ui5-stable='sf-header-shellbar']",
	{selector:"[data-ui5-static-stable='shellbar-subnav-static']" ,isShadowChild:true },
	{selector:".ui5-tc__overflow--start" ,isShadowChild:true });
} else {
 return wmjQuery(".globalHeaderHeight div#surjSubTabBar")
}
},
'126065111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi:contains(" + dollars[0] + "):visible")},
'128262926': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfDropMenu a:contains(" + dollars[0] + ")")},
'129953490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='link']:contains(" + dollars[0] + "):mt_visible")},
'134353116': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] button[id*=" + dollars[1] + "]")},
'136410632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.globalMenu").find("a").filter("[title=" + fixed.titleText + "]");},
'141782698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*=" + dollars[0] + "]:first")},
'142336009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] + label:contains(" + dollars[1] + ")")},
'142757450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const result = ftHelper.findShadowDomWithoutUniqueContainer_2(
	wmjQuery, 
	"ui5-panel-xweb-goalmanagementx:eq("+fixed.btnText+")", 
	{selector:".ui5-panel-header-title",isShadowChild: true});
return wmjQuery(result);},
'144473670': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnCustomIcon:visible:eq(" + dollars[0] + ")")},
'144772298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='buttonset aquabtn active'] button[id*='dlgButton']:first")},
'145780472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIBShowSeparator.sapMLIBTypeActive.sapMSLI:not(.globalMenuItem):contains(" + dollars[0] + ")")},
'146623927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ectFCTitle").find(".headerButtonLinks").find("[role='button']").filter(":containsTextNode("+ fixed.btnText +")");},
'148293146': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();},
'151299484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[id='"+fixed._cardId+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-card-header-root") : wmjQuery();},
'154008928': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.sapMListTblCell.sapMListTblHeaderCell.sapMTableTH:contains(" + dollars[0] + ")")},
'156497433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newUI = wmjQuery("input[id*=swlang] + label[for*='"+fixed._elemId+"']:visible").find("span");
if (newUI.length) {
  return newUI;
} else { 
  return wmjQuery("input[id*=swlang] + label[for*='"+fixed._elemId+"']:visible");
}},
'156716087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form",
    { selector: "xweb-goal-form-enum-field[id='"+fixed._formFieldIdAttr+"']", isShadowChild: true }, 
	{ selector: "ui5-select-sf-goal-form", isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".ui5-select-root", targetShadow);
} else {
    return wmjQuery();
}
},
'156924479': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'157610720': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=quickActionIcon]").filter("[name="+fixed._iconName+"]").closest(".globalQuickActionText");},
'159375527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.tgtLabel+"]").find("bdi").filter(":first");},
'162103190': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardTitle").find("span").filter(":containsTextNode("+fixed.txt+")");},
'163777668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon-xweb-goalmanagementx").filter("[name="+fixed._lmicon+"]").closest("[slot=header]");},
'165482630': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field",firstShadow).filter("[id*=" + fixed._btnText + "]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery("ui5-select-sf-goal-form", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'167185142': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.sectionheader+")").closest("div[class*='sapUiRespGridSpan']");},
'167747427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[role=" + dollars[0] + "]:visible")},
'168420840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiMnuLst").find(".sapUiMnuItmTxt").filter(":containsTextNodeIgnore("+fixed.tgtText+")");},
'168976476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-help-id=goalForm]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field",firstShadow).filter("[name='"+fixed._fieldName+"']")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("[for=goalForm-field-category-inner]",secondShadow): wmjQuery();},
'169534413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall[type=\"button\"]:contains(" + dollars[0] + ")")},
'175484260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr .formFieldLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'179527694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest(".sapMDialog").find("label").filter("[title="+fixed.labelTitle+"]").closest(".sapUiVlt").find(".sapMInputBaseInner");},
'179559400': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] button:last")},
'186378964': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#bizXShellCustomHeader-BarLeft .surjTopNavHomeButton")},
'190251127': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant").filter("[data-label='"+fixed._dataLabel+"']")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("li[role=menuitem]");
return elem.length ? elem : wmjQuery();
},
'191167152': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toggle-button").filter("[data-testid="+fixed._lmAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery();},
'196574232': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] button:contains(" + dollars[1] + ")")},
'196591611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] button:eq(" + dollars[1] + ")")},
'196800267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] button")},
'198287021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#globalTodos:has(.globalHeaderAlertBadge):visible")},
'198590814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-talent-cpm-activity").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'201451570': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-manifest-toolkit").filter(":containsTextNode("+fixed.labelTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'202350240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest(".sapMCbHasLabel").find(".sapMCbBg");},
'203432148': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPage").filter("[id*="+fixed._sapMPageId+"]").find(".sapMPageHeader").find(".sapMTitle").find("span");},
'204928042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectTitle']").filter(":containsTextNode("+fixed.tgtTitle+")").closest("div.pmuFloatContainer").find(".nrte_showScrollbar");},
'210311114': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first ? first.shadowRoot : null;

const second = wmjQuery(firstShadow).find("xweb-goal-form-enum-field")[0];
const secondShadow = second ? second.shadowRoot : null;

const third = wmjQuery(secondShadow).find("ui5-select-sf-goal-form").filter("[id="+fixed._lmAttr+"]")[0];
const thirdShadow = third ? third.shadowRoot : null;

const fourth = wmjQuery(thirdShadow).find("ui5-icon-sf-goal-form")[0];
const fourthShadow = fourth ? fourth.shadowRoot : null;

const lm = fourthShadow ? wmjQuery(fourthShadow).find("svg") : null;
return lm ? lm : wmjQuery()},
'210688363': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class^='sapUiVltCell']:contains(" + dollars[0] + ") + div[class^='sapUiVltCell']")},
'210846252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[role='combobox']:first")},
'212081972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'213049307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th:contains(" + dollars[0] + ")+td input")},
'214007488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.field_label:contains(" + dollars[0] + ")+td.field_value input")},
'218530665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class*=" + dollars[0] + "]:last")},
'222006424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + "):visible")},
'222613364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore(" + fixed.columnTxt + ")").parents("[class*='Field']").find(".sapMLabelColonAndRequired").parent();},
'224661309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label:contains(" + dollars[0] + "):eq(" + dollars[1] + ") + .field_value .writeComp")},
'224992950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=navigation]").find("span.sapMITHTextContent").filter(":containsTextNode("+fixed.lmText+")");},
'226442854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class^='DialogFooter_footer']").find("[ui5-button]").filter(":containsTextNode("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'226880828': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPage").filter("[id="+fixed._modalPageAttr+"]").closest(".sapMDialogSection").closest(".sapMDialog").find("[id$=header-BarPH]");},
'229111982': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("label").filter("[title="+fixed.labelTitle+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");},
'229986270': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi[id*=__label]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest(".sapUiVlt").parent();},
'230245576': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUxAPObjectPageSectionContainer").find(".sapUxAPSubSectionSeeMoreButton");},
'231677046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer-sf-header" ,isShadowChild:true },
	{selector:".ui5-tc__tabStrip" ,isShadowChild:true });
} else {
 return wmjQuery(".globalHeaderHeight div#surjSubTabBar")
}
},
'236761006': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.globalHighlightText").filter(":containsTextNode("+fixed.lmText+")").closest("div[id*='pipeElem']");},
'237363773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase.sapUxAPAnchorBarButton:eq(3)")},
'238077607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(.sapMLabel[title=" + dollars[0] + "]) .sapMComboBox")},
'239006917': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[aria-rowindex='"+fixed._rowindex+"']").find(".sapMInputBase").filter("[data-help-id="+fixed._datahelpid+"]").find("[role='button']").filter("[data-sap-ui-icon-content="+fixed._icondata+"]");},
'244084669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstDom = wmjQuery("ui5-static-area-item-xweb-goal-learnings")[0].shadowRoot;
let secondDom = wmjQuery("ui5-li-xweb-goal-learnings",firstDom).filter(":contains("+fixed.elemText+")")[0].shadowRoot;
return wmjQuery("li .ui5-li-text-wrapper",secondDom);
},
'245382951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "ui5-static-area-item-sf-header[data-ui5-stable="+fixed._firstShadowAttr+"]",
    { selector: "xweb-sidepanel", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(".container", targetShadow).filter("[part='"+fixed._lmAttr+"']");
} else {
    return wmjQuery();
}
},
'246332649': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "]:visible:first")},
'246619426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageHeader").find(".sfObjectPageTitle").filter(":mt_visible");},
'248985399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[class~=" + dollars[0] + "] a:contains(" + dollars[1] + ")")},
'252358782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#renderTopNavFusion.globalHeaderHeight").find(".globalNavigationActiveItem").filter(":containsTextNode("+fixed.elemTxt+")");},
'253281740': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("xweb-goal-form-text-field").filter("[id="+fixed._lmId+"]")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-label-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();


},
'256722133': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenuItem:visible:eq(" + dollars[0] + ")")},
'260055513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=editDialog_DEPENDENT_INFORMATION]").find(".sapExtentUilibUtilEditFormGeneratorToolbar").filter("[id="+fixed._toolbarId+"]").find("button").filter("[title="+fixed.elmTitle+"]");},
'260929497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class^='sapUiRespGridSpanXL']").find("div.sfPeopleProfileBlockTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'261939183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery(".hoc-side-panel-header-as-of").find("a[onclick*=showPosition]").find("span.context_icon");
const newElem = wmjQuery(".hoc-side-panel-header-as-of").find("button[onclick*=showPosition]");
if (oldElem.length) {
  return oldElem;
} else if (newElem.length) {
  return newElem;
}
return wmjQuery();},
'262410388': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-ilx").filter("[tooltip="+fixed._parentToolTip+"]")[0];
const firstShadow = first && first.shadowRoot;
if(firstShadow){
  return wmjQuery(firstShadow).find("button");
}

return wmjQuery() ;},
'262852905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded:eq(" + dollars[0] + ") input:eq(" + dollars[1] + ")")},
'262986335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":contains("+fixed.headerText+")").closest(".globalPortletBody").find(".commentboxlabel").children("label");},
'264184522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine").filter(":containsTextNode("+ fixed.btnText +")").closest(".sapFCardHeader").next().find("img.sapMImg").parent();},
'264532965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:visible h3:eq(" + dollars[1] + ")")},
'266853103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='checkbox']").filter("[data-help-id="+fixed._elmAttr+"]");},
'266882789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-tab-strip-itemContent",firstShadow).filter(":containsTextNode("+fixed.elmTxt+")") : wmjQuery();},
'267582711': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog']:contains(" + dollars[0] + ") footer button:last")},
'268117010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	let three = wmjQuery(".ui5-shellbar-logo", two);
	return wmjQuery(three);
}else{
	return wmjQuery("#bizXShellHomeIcon-img");
}
},
'270385730': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='LabelValuePair_Label']").filter(":containsTextNode("+fixed.lblTxt+")").closest("[data-testid='LabelValuePair']").find("[data-testid='LabelValuePair_Text']");},
'270510551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[summary="+fixed._summary+"]").find(".sapExtentUilibFormPatternLabel").filter(":contains("+fixed.labelText+")").closest(".sapExtentUilibFormPatternBlockName");},
'270948836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[id*='link'][title*=" + dollars[0] + "]")},
'271368214': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href_production*='"+fixed._hrefProdAttr+"']").find("img");},
'272939632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid=card-header-title]").filter(":containsTextNodeIgnore("+fixed.cardHdrTxt+")").closest("[data-testid=cardWrapper]").find("[data-testid=viewAll]");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'273143353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.last.globalMenuItem:contains(" + dollars[0] + ")")},
'273985265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._dataAttr+"]").find(".sapUiIcon").filter(":containsTextNode("+fixed.elmtxt+")");},
'276778156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:eq(0)")},
'278426539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3[id*=" + dollars[0] + "]:visible")},
'280625168': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#bizXSearchField form")},
'280685685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-table-row[class*='ApplicantListRow']").filter(":first")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-checkbox[id='selection-component']")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find(".ui5-checkbox-inner");
}
return wmjQuery();},
'281955832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button:eq(0)")},
'284094017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button:has('.sapMBtnEmphasized'):mt_visible:first")},
'285937340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShasow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field", firstShasow).filter("[id="+fixed._elemId+"]")[0];
const socondShasow = second && second.shadowRoot;
const elem = wmjQuery("ui5-label-sf-goal-form",socondShasow).filter(":containsTextNode("+fixed.labelText+")").closest(".goalFormWidget-formItem").find(".goalFormWidget-fieldVerticalFlexBox");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'288699838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#customHeaderModulePickerBtn-menuPopover-scroll a[href*=" + dollars[0] + "]")},
'288704479': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='userselect']:contains(" + dollars[0] + ") span[class*=" + dollars[1] + "]")},
'289284490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] button:first")},
'289493294': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.lbltxt+"):first").closest("tr").find(".valuePattern");},
'289520779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowRoot = wmjQuery("ui5-side-navigation-xweb-form-inbox")[0];
const shadowRootOpen = shadowRoot ? shadowRoot.shadowRoot : wmjQuery();
return shadowRootOpen ? wmjQuery(shadowRootOpen).find("ul.ui5-sn-flexible[role=tree]") : wmjQuery()},
'289899084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"sfOverlayMgr\"] SPAN[class]:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'290814782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimary']:first")},
'291576109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field,xweb-goal-form-number-field", firstShadow).filter("[id="+fixed._elemIndx+"]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery(".goalFormWidget-label", secondShadow);
if (elem.length)
{  return elem;
}return wmjQuery();},
'292069287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionText").filter(":containsTextNode("+fixed.lmContainer+")").closest(".expanded").find("label.subtitle").filter(":directContains("+fixed.lmText+")");},
'292541677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='menu'] a:contains(" + dollars[0] + "):mt_visible")},
'296153760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("[id*=layout]").find("input");},
'297449556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".viewPanelFooterBtn").filter(":containsTextNode("+fixed.btnText+")");},
'299102810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']");},
'299479070': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'301426212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUxAPObjectPageSubSection");},
'302317111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBtnCustomIcon.sapMBtnIcon.sapMBtnIconLeft.sapUiIcon.sapUiIconMirrorInRTL:eq(0)")},
'304150253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid=search-filter-column]");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-fcl-column--middle") : wmjQuery();},
'304374992': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").find("[id*='inner']").filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest(".sapUiVlt").find("bdi").filter(":containsTextNode("+fixed.lmText+")");},
'305362123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.sapMLIB:contains(" + dollars[0] + "):contains(" + dollars[1] + ") td.sapMListTblCell:eq(0)")},
'306540738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibEditDialog:has(.sapMDialogTitle:contains(" + dollars[0] + ")) footer button:last")},
'308954926': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter("[id=" + fixed._btnText + "]").find(":header span");},
'311532408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const questionAnswerElem = wmjQuery("question-answer").filter("[id="+fixed._questionAnswerIdAttr+"]");
if (questionAnswerElem.length) {
  const buttonElem = wmjQuery(("ui5-button[id="+fixed._parentIdAttr+"]"),questionAnswerElem[0].shadowRoot);
  return wmjQuery(buttonElem.length) ? wmjQuery("button",buttonElem[0].shadowRoot) : wmjQuery();
}
else return wmjQuery();},
'312916884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='HRBP Relationship'] td:contains(" + dollars[0] + ")")},
'314625632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-company-settings").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'317010584': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("div[role=checkbox]").find(".sapMCbMark");},
'318012513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#bizXSearchField.bizXSF.sapMBarChild.sapMSF:visible")},
'318690419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header").find("[id$=title-inner]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'322776660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog").find("ui5-table-cell").filter(":containsTextNode("+fixed.lmText+")");},
'324117635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dasHeaderTitle--text ").filter(":containsTextNode("+fixed.lmText+")").closest(".dasHeader[type='Row']");},
'326869543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".documentHeader").find(":header").filter("[data-help-id="+fixed._lmAttr+"]");},
'327809870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[aria-labelledby="+fixed._ariaLabelledby+"]");},
'329119641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title").filter(":containsTextNodeIgnore("+fixed.lmtxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root") : wmjQuery();},
'330520972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUxAPObjectPageSectionContainer").find(".sapMBtnBase").filter(":containsTextNodeIgnore("+fixed.btnText +")");},
'330919922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmuToolbar").filter("[data-help-id="+fixed._parentAttr+"]").find("a").filter("[aria-label="+fixed.lmAriaLabel+"]");},
'331462143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog']:contains(" + dollars[0] + ") footer button:contains(" + dollars[1] + ")")},
'331506889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("ui5-title-xweb-performance-form-inbox").filter(":containsTextNode("+fixed.sectionTitleDirectText+")").closest("[data-component-name='ToolbarContent']").find("ui5-button-xweb-performance-form-inbox#"+fixed._ui5ButtonIdAttr);
const htmlElemShadowRoot = shadowElem.length ? shadowElem[0].shadowRoot : null;
return htmlElemShadowRoot ? wmjQuery(("button[title="+fixed.tgtTitleAttr+"]"),htmlElemShadowRoot) : wmjQuery(); },
'331726565': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id='form-header-navigation-bar']").find("a").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'332179355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerDirectText+")").closest(".sfObjectPageSection").find(".pm2FloatContainer");},
'332814812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalRoundedCornersXSmall globalPrimaryButton']:eq(" + dollars[0] + ")")},
'334269390': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.sapMListTblHeaderCell:contains(" + dollars[0] + ")")},
'337672575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find(".ui5-li-title");
return elem.length ? elem : wmjQuery();},
'338628756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a[class*=" + dollars[0] + "]:eq(0)")},
'339380401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimaryButton']:first")},
'340493573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".leftpart").filter(":contains("+fixed.headerTxt+")").closest(".pmPortletContainer").find(".globalRoundedCorners");},
'340585949': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageNavigation").find("button,.sapMITBFilterWrapper").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'341689984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id="+fixed._inputBaseAttr+"]").closest("tr").filter(":eq("+fixed.lmRowIndex+")").find(".sapMInputBase").filter("[data-help-id="+fixed._inputBaseAttr+"]").find("input");},
'342073415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode("+ fixed.btnText +")").next("").find(".sapUiIcon:first");},
'348387801': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(25)")},
'353603493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "][role=" + dollars[1] + "]")},
'357300913': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-datetime-picker[data-testid='DelegationStartTime']")
const firstShadow = first.length && first[0].shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-input.ui5-date-picker-input").find("ui5-icon[slot='icon']")
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("svg") :  wmjQuery();},
'360680162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnContent:contains(" + dollars[0] + ")")},
'374048834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-goalmanagementx").filter("[title="+fixed.elemText+"]").closest("div[aria-label='Pag-403235424']");},
'375865540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.labelDirectText+")").closest("[class*='CardWrapper_clickableArea__']");},
'376063716': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=CardWrapper_headerText]").filter("[id='"+fixed._lmId+"']");},
'377417099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".colGroupHeaderRow").find("[id="+fixed._innerId+"]").closest("div[class*=colGroupHeader]");},
'378828275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-notification:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:`div.ui5-nli-heading-wrapper` ,isShadowChild:true });
} else {
    return wmjQuery("#globalNotificationPanel").find(".sapMListBGSolid  ul li:eq("+fixed._index+")").find(".sapMNLITitleText");
}
},
'379938333': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button", one);
}else{
	return wmjQuery("div.globalHeaderBar #bizXShellCustomHeader-BarLeft").find(".sapMBtnContent");
}
},
'382543354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-team-goal ui5-button-xweb-team-goal")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(".ui5-button-root", firstShadow).filter(":containsTextNodeIgnore("+ fixed.btnText +")");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'382869172': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPortletContainer").find(".HRLabelCell").filter(":containsTextNode("+fixed.elmTxt+")");},
'384002916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):visible")},
'387827729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPlacematText.sapMBtn.surjUserPhoto")},
'387886020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pm2CompItemHeader").filter(":containsTextNode("+fixed.headerTxt+")").closest(".globalPortletBody").find(".nrte_content_webkit");},
'389115692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNode("+fixed.labelTitle+")").closest("ui5-dynamic-page-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-dynamic-page-title-root") : wmjQuery();},
'391344863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-sidepanel[data-ui5-stable='todopanel-panel']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery(".ui5-list-header",secondShadow);},
'394068988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldEnv = wmjQuery(".bizXMenuPopover");
if (oldEnv.length){
 return oldEnv ? wmjQuery(oldEnv).find(".globalMenuItem").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();

} 
const newEnv = wmjQuery("xweb-shellbar.sfEnsureSAPTheme");
if (newEnv.length){
  const firstShadow = newEnv.length && newEnv[0].shadowRoot;
  const second= wmjQuery(firstShadow).find("ui5-shellbar-sf-header[data-ui5-static-stable='shellbar-static']")
  const secondShadow = second.length && second[0].shadowRoot;
  return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").filter(":containsTextNode("+fixed.lmText+")").find(".menuItem") : wmjQuery();
 } 
return wmjQuery()
},
'394482164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] button[id*='dlgButton']:first")},
'394724206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a:contains(" + dollars[1] + ")")},
'395044833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelContent").eq(3);},
'396005447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapMListTblSubCntRow").find(".sapMInputBaseContentWrapper");},
'396209008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-form-label").filter(":containsTextNode("+fixed.lbltxt+")").closest(".changeListItem").find(".newValue");},
'402022152': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_title").filter(":containsTextNode("+fixed.headerTxt+")").closest(".form_header");},
'404621741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell:has(.sapMLabel[title=" + dollars[0] + "]) + .sapUiVltCell input")},
'405198451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(.sapMLabel[title=" + dollars[0] + "]) .sapMInputBase")},
'408129888': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type*=" + dollars[0] + "][name*=" + dollars[1] + "]")},
'408767183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.innerTxt+")").closest("[class^=CardWrapper_clickableArea]");},
'409097872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.headertext+")").closest(".sapUxAPObjectPageSubSection").find(".sapUiRespGrid[id*='grid']");},
'410744580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class^='FormItem_pseudoInvisibleText']").filter(":containsTextNode("+fixed.invisText+")").closest("div[class^='FormItem_content']").find("ui5-date-picker-xweb-dynamic-content").parent();},
'411248323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[id*=" + dollars[1] + "]")},
'412098747': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;

if(firstShadow){
  return wmjQuery(firstShadow).find(".ui5-label-text-wrapper");
}


return wmjQuery();},
'414931259': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] ul")},
'416264753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] div[id*='picker']:eq(" + dollars[1] + ")")},
'418937043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.labelTitleAttr+"]").closest(".sapUiVlt").find(".sapMInputBaseInner");},
'420378310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='listbox'] a[href*='/sf/pmreviews']")},
'421516750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class*='globalPrimaryButton']:first")},
'423556234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.viewRequisition.globalMenuItem:eq(0)")},
'424246553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[id="+fixed._lmId+"]").filter(":containsTextNode("+fixed.lmText+")").closest("th");},
'429150061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button:visible:eq(1)")},
'433111119': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.headerButton a[role=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'433367405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='_sectionTitle']").filter(":containsTextNode("+fixed.labelText+")").parent("[class*='HomepageSection']").find("div").filter("[data-testid="+fixed._dataTest+"]");},
'435759335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[class='sapMInputBaseInner']")},
'437868665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th:contains(" + dollars[0] + ")+td>input")},
'440263795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("TR[id=" + dollars[0] + "] TH:contains(" + dollars[1] + ")")},
'445645804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
   const text = wmjQuery().identity(fixed.btnText);
	return findShadowDomWithoutUniqueContainer_1("ui5-button:containsTextNode("+text+")",
	{selector:"button" ,isShadowChild:true })},
'451706738': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElemParent = wmjQuery("ui5-shellbar-search-xweb-global-header").find("ui5-search-item-xweb-global-header").find("ui5-avatar-xweb-global-header").eq(fixed.suggestionIndx);
const newElemShadow = newElemParent.length ? newElemParent[0].shadowRoot : null;
const targetNewElm = newElemShadow ? wmjQuery(newElemShadow).find(".ui5-avatar-root") : wmjQuery();
return targetNewElm.length ? targetNewElm : wmjQuery();},
'455173954': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[data-help-id="+fixed._lmData+"]");},
'459278012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sfObjectPageSectionLabel").filter(":containsTextNode("+fixed.btnText+")").find(".pmHelpIcon");},
'459957341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class='cell tableHeaderLabel']:eq(0)")},
'462101671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='globalContentBackground globalContentForeground sfoverlaycontainer'] div[class~=" + dollars[0] + "]")},
'464074375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] select:last")},
'466180013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[onclick*=" + dollars[0] + "] span.hoc-ui5-icon")},
'466423074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a[onclick*='tgmEdit']")},
'466767994': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").find("span").filter(":contains("+fixed.labelText+")");},
'470748145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class~=" + dollars[0] + "] td[class~=" + dollars[1] + "]")},
'473268160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div header:contains(" + dollars[0] + ")")},
'477189270': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-shellbar-sf-header")[0];
const secondShadow = second && second.shadowRoot;
if( secondShadow) {
  	const dropDown = wmjQuery(secondShadow).find(".menuItemSpace").filter(":containsTextNode("+fixed.lmText+")");
  	const tab = wmjQuery(secondShadow).find(".ui5-shellbar-menu-button-title").filter(":containsTextNode("+fixed.lmText+")");
  	return dropDown.length ? dropDown : tab;
}

return wmjQuery();},
'479033277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapMInputBase[data-help-id='"+fixed._datahelpid+"']").closest(".sapUiVltCell");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'479775682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const key1 = wmjQuery("ui5-busy-indicator-xweb-people-profile").find("ui5-label-xweb-people-profile").filter(":containsTextNode("+fixed.labelTxt+")").last()[0];
const key1Shadow = key1 && key1.shadowRoot;
return key1Shadow ? wmjQuery(key1Shadow).find("[class*='label-text-wrapper']") : wmjQuery();
},
'481610187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header").find(".sapMTitle span").filter(":containsTextNode("+ fixed.btnText +")")},
'484286854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form",
    { selector: ".goalFormWidget-field[id="+fixed._enumFieldId+"]", isShadowChild: true },
    { selector: "xweb-date-picker", isShadowChild: true },
    { selector: "ui5-input-sf-goal-form", isShadowChild: true }

);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery("input", targetShadow);
} else {
    return wmjQuery();
}},
'484451267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMenuBtn,.sapMITBItem").filter(":contains("+fixed.lmTetx+")").find(".sapUiIconTitle,.sapMSBArrow");},
'485988652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] [class*=" + dollars[1] + "]")},
'486594695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._inputAttr+"]").find(".sapUiIconPointer");},
'486739358': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon[name="+fixed._iconName+"]").closest("button[data-testid=quickActionTileButton]").closest("ui5-busy-indicator");},
'487036181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer button:last")},
'487915920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardWrapper = wmjQuery("[class^='CardTitle_headerText']:contains(" + fixed.cardTitle + ")").closest("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	let buttonRoot = wmjQuery("[id$='contentTitle']:contains(" + fixed.contentTitle + ")").closest(cardWrapper).find("ui5-button");
  	if (!!buttonRoot && !!buttonRoot.length) {
    	return wmjQuery(fixed._tag, buttonRoot[0].shadowRoot);
    }
} 
return wmjQuery();},
'490397230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a,ui5-link-xweb-myteam-content").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest("[class^=MyTeamDialog]");},
'491809636': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.lmHeader+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.lmText+")");},
'493635092': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-tabcontainer-sf-header",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("a.subTabLink",secondShadow).filter(":containsTextNodeIgnore("+fixed.tgtElemText+")") : wmjQuery();},
'494404973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-goalmanagementx[data-help-id='goal-list-tab-container']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span").filter(":containsTextNode(" + fixed.elemText + ")") : {};},
'494525640': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiIcon").filter("[id="+fixed._lmId+"]");},
'498640185': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[id*='link']").filter("[data-help-id*='"+fixed._datahelp+"']");},
'502449691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapExtentUilibUtilEditFormGeneratorTableContainer']:contains(" + dollars[0] + ") table tr td:eq(" + dollars[1] + ")")},
'505041420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=gridcell]").find("button").filter("[data-help-id="+fixed._dataHelpId+"]");},
'506080337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.axial").find("select").filter("[title=" + fixed.titleText + "]")},
'512752671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.lmtext+"]").closest("li.globalMenuItem");},
'514715295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiVltCell:contains(" + dollars[0] + ") ~ div.sapUiVltCell input:first")},
'515548054': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardWrapper = wmjQuery("[class^='CardTitle_headerText']:contains(" + fixed.cardTitle + ")").closest("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	return cardWrapper.find(fixed._tag + "[data-testid=" + dollars[0] + "]");
} 
return wmjQuery();},
'517128621': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] span[class~=" + dollars[1] + "]:first")},
'517575783': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-date-picker-xweb-calendar-widget").filter("[title="+fixed.elemAttr+"]").closest("div.datePicker");},
'518230252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfDropMenu").find("span").filter("[data-testid="+fixed._elemAttr+"]").filter(":containsTextNode("+fixed.elemText+")");},
'518286787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ul[data-testid=viewAllCardsContainer]").find("[data-testid=cardWrapper]").eq(fixed.elmIndex).find("[class*=cardActions]").find(".globalCardButton[icon='overflow']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'518562218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("[data-testid=takeActionItem]").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery("[role=listitem]", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li");
} else {
  return wmjQuery();
}},
'522401211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-sf-talent-activity").filter("[data-testid="+fixed._lmAttr+"]")[0];
const firstShadow = first ? first.shadowRoot : null;
const elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery();},
'522492485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-people-profile").filter("[id="+fixed._parentID+"]").filter(":containsTextNode("+fixed.buttonText+")");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find("[type=\"button\"]") : wmjQuery();
},
'523881589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmFormDatalist").find(".colHeaderText").find("span.cell").filter(":containsTextNode("+fixed.lmText+")").parent("div").filter(":mt_visible");},
'523919248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("#feedbackTopicInput");
if(firstShadow.length > 0 && firstShadow[0].shadowRoot){
	firstShadow = firstShadow[0].shadowRoot;
	return wmjQuery("input,textarea", firstShadow);
}
return wmjQuery();
},
'524632765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-sf-talent-feedback").filter(":containsTextNode("+fixed.elmTxt+")") ;
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-root").find("bdi") : wmjQuery();},
'524859663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[title*=" + dollars[0] + "]:visible")},
'526403212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-goal-ai").filter(":containsTextNode("+fixed.cardTitletext+")").closest("button");},
'526734722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("Label[for*=" + dollars[0] + "]:visible")},
'527933578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.lmText+"]").closest(".sapUiVlt").find("input");},
'528181971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery("ui5-label-sf-goal-form",firstShadow).filter(":containsTextNode("+fixed.tgtText+")");},
'528588489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.placeholder-value.search-box")},
'529336850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapIcon").filter(":containsTextNode("+fixed.lmText+")").closest(".toolbarButton");},
'530747975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.dialogTitle+")").closest(".sapMPage").find(".sapMBtnBase").filter(":containsTextNode("+fixed.lmText+")");},
'530893752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-xweb-versatile-writing-assistant");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-menu-li-xweb-versatile-writing-assistant").filter("[icon='"+fixed._actionNameAttr+"']");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".ui5-li-root") : wmjQuery();},
'531725156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".labelContainer").filter(":containsTextNode("+fixed.elemText+")");},
'531945690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMLabel").filter("[title="+fixed.tgtTitle+"]").find(".sapMLabelColonAndRequired");},
'533482952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive.sapMListTblRow:has([title=" + dollars[0] + "]) .sapMInputBaseInner:eq(" + dollars[1] + ")")},
'533980221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemCategory").filter(":containsTextNode("+fixed.itemHeaderDirectText+")").closest(".pmuItemHeader").find("span").filter(":directContains("+fixed.tgtDirectText+")");},
'535577571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapIcon[onclick*=" + dollars[0] + "]:first")},
'536142949': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.viewRequisition.globalMenuItem:eq(" + dollars[0] + ")")},
'536955902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}
if( headerCheck1() ){
	return wmjQuery(".ui5-shellbar-overflow-container-right-child", getHeaderBar1());
}else{
	return wmjQuery("div.globalHeaderBar").find(".sapMBarRight");
}
},
'541485174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapEPMUIEffectiveFilterWidgetItem-header-row").filter(":containsTextNode("+fixed.lmTitleAttr+")").find(".sapEPMUIEffectiveFilterWidgetItem-header-titleContent");},
'544813115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-card-xweb-manifest-toolkit").filter("[data-testid='"+fixed._datatestid+"']").find("[role='heading']");},
'545971055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody[id*=" + dollars[0] + "] td:nth-child(" + dollars[1] + ")")},
'546332765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase.sapUxAPAnchorBarButton:contains(" + dollars[0] + "):visible")},
'548506771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='title-inner']").filter(":containsTextNode("+fixed.lmTitleText+")").closest(".sapMDialog").find(".sapMPageEnableScrolling"); },
'548724693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild:visible:last")},
'550887791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pwhHeaderTitle").filter(":containsTextNode("+fixed.lmText+")").closest(".ectFCTopHeader").next("[id*=focusContainer]").find(".actBar").parent("div");},
'552279367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".columnLabel").filter(":containsTextNode("+fixed.elemTxt+")").closest(".nboxCell");},
'552615447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapExtentUilibUtilEditFormGeneratorTableContainer']:contains(" + dollars[0] + ") tr:last td:eq(" + dollars[1] + ")")},
'552926831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item").filter("[id="+fixed._parentId+"]")[0];
const firstShadow = first && first.shadowRoot;

if(firstShadow){
  return wmjQuery(firstShadow).find("[aria-roledescription='Segmented button']");
}


return wmjQuery();},
'553693458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.txt+")").closest("li").find(".filterItem");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'554768644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toggle-button").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery();},
'555139709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink:eq(" + dollars[0] + ")")},
'555779643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sr-only").filter(":containsTextNode("+fixed.labelText+")").parent(".workBenchPipeElem");},
'556654080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.anchor_rel").filter("[title="+fixed.headerAttr+"]").closest("div.globalPageTitle").find("a.globalPlacematLink");},
'559872467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] div:eq(" + dollars[1] + ")")},
'563521172': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".globalPortletBody").find("a").filter(":containsTextNode("+fixed.btnText+")");},
'563671667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class*='autocompinput']:last")},
'564446513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.pwhHeaderTitle").filter(":containsTextNode("+fixed.lmText+")").closest("div.ectFCTitle");},
'565974718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='button']:eq(3)")},
'567869608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest("[role='checkbox']").find(".sapMCbBg");},
'567988617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.lbltxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input").closest(".sapUiHLayoutChildWrapper");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'568363793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id=" + dollars[0] + "] a")},
'569888685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-li-custom-sf-header",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")")[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery("li",secondShadow);},
'571359592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiRespGrid").find(".sapMLabel").filter("[title=" + fixed.titleText + "]").parent();},
'573827968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span a:has(span:contains(" + dollars[0] + "))")},
'574047454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUiVlt").find(".sapMSwtCont ");},
'574729086': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._lmAttr+"]:eq(" + dollars[0] + ")").closest(".sapUiVltCell");},
'576627194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapMLIB ").filter("[data-autoid='"+fixed._tgtLabel+"']").find("div.sapMLIBContent");
},
'577484955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIBSelected").find("bdi[id*='editHeaderPopupList']").filter(":contains("+fixed.selectedTabText+")").closest(".sapMSplitContainer").find(":header").find("[id*='title']").filter(":containsTextNode("+fixed.lmText+")");},
'579200455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td select[id*='wf_sect_']:eq(" + dollars[0] + ")")},
'580732448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[role=form]").find("label").filter("[for$="+fixed._tgtName+"]");},
'583414708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=" + dollars[0] + "] [type=" + dollars[1] + "]")},
'585234017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formFieldLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".cke_top");},
'586350985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"formHeader\"] H1")},
'588318392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapEpmUiFormSectionItems").find(".sapEPMUIMiniDateRangeEditor-DimensionTitleContainer").filter(":containsTextNode("+fixed.elemTxt+")");},
'588350605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field",firstShadow).filter("[id*=" + fixed._btnText + "]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery("ui5-select-sf-goal-form", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'589293295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.dropDownButtonText:eq(" + dollars[0] + ")")},
'591318519': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapUiVltCell").next(".sapUiVltCell");},
'591475970': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-talent-cpm-activity").filter(":containsTextNodeIgnore("+fixed.titleText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root span") : wmjQuery();},
'603451304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'605674145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".text").filter(":containsTextNode("+fixed.lbl+")").closest(".field_label").closest(".form_field").find(".externalCode");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'607507401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-responsive-popover-xweb-goalmanagementx").find("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.btnText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'608464832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-responsive-popover-xweb-versatile-writing-assistant")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("h1").filter(":containsTextNode("+fixed.lmText+")");
return elem.length ? elem : wmjQuery();},
'610486880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("div.revolutionTSRight").find("span.revolutionTSInfoLabel").filter("[title=" + fixed.titleText + "]").next().find(".revolutionTSDatePickerWrapper");},
'610885874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cell.tableHeaderLabel:eq(0)")},
'612206353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button-sf-header[icon='sys-enter'],ui5-button[icon='sys-enter']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button#globalTodos");
}
},
'613815678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-tabs .walkme-tab-button:has(span .walkme-contains-task)")},
'618597489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("bdi").filter(":containsTextNode("+fixed.lblText+")").closest(".sapUiVltCell").next(".sapUiVltCell").find("input").closest(".sapMInputBaseContentWrapper");},
'620348933': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3[data-testid=contentTitle]").filter(":containsTextNode("+fixed.cardTitle+")").closest("[class*=CustomCard_root]").find("[class*=CustomCard_largeImage]");},
'620675817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.globalSecondaryButton[value="+ fixed.btnText +"]");},
'622513038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] li:contains(" + dollars[1] + "):last")},
'624417990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-manifest-toolkit").filter("[data-help-id='"+fixed._dataAttr+"']");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'624709695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "] .globalSecondaryButton:first")},
'624779205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle:contains(" + dollars[0] + ") button[title=" + dollars[1] + "]:visible")},
'626351896': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-ilx").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("h1.ui5-title-root").find("span");
return elem.length ? elem : wmjQuery();},
'627454468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetLm = wmjQuery("ui5-li-xweb-myteam-content:eq("+fixed.elemIdx+")");
let taregtShadow = targetLm ? targetLm && targetLm[0].shadowRoot : undefined;
return taregtShadow ? taregtShadow && wmjQuery(taregtShadow).find(".ui5-li-content").parent() : wmjQuery();},
'628779332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.writeComp:last")},
'642802009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#bizXSearchField.bizXSF.sapMBarChild.sapMSF")},
'643414498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectTitle']").filter(":contains("+fixed.sectTitle+")").closest("[id^='sect']").find("[id*='tab']").find("span").filter(":contains("+fixed.tabText+")");},
'644610527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div span[class=\"pwhHeaderTitle globalHumanistText\"]:last")},
'650424334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSplitContainer[id*=" + dollars[0] + "] header span[id^='__page'][id$='title-inner']")},
'650574332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiRespGridSpanL3 ").find("bdi").filter(":containsTextNodeIgnore(" + fixed.columnTxt + ")")},
'650886942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[role=" + dollars[0] + "] tr:eq(" + dollars[1] + ")")},
'651478552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("bdi").filter(":mt_visible");},
'654554714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfCurrentStep").filter(":contains("+fixed.labelNum+")").closest(".sfStepsChartStepItem").find(".sfStepsChartStepName");},
'656356108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-panel-xweb-goal-learnings[data-testid="+fixed._dataPanelAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-panel-header",firstShadow): wmjQuery();},
'657758469': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".middleSegment:last.globalHighlight")},
'662904403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=" + dollars[0] + "]:first")},
'664190485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'665131525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapReportEngineTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapLumiraStoryLayoutCommonSectionPanel");},
'666911202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='FormPatternLabel']:contains(" + dollars[0] + ")").parent().next().find("span")},
'667107341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find(".ui5-popup-header-text").filter(":containsTextNodeIgnore("+fixed.headertext+")")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find(".ui5-title-root").find("span[id*=inner]");
}
return wmjQuery();},
'667271118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer.sapMPageFooter button:contains(" + dollars[0] + ")")},
'669075320': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formFieldLabel").filter(":containsTextNode("+ fixed.btnText +")").next().find("span.readonly")},
'669185273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:`.container` ,isShadowChild:true });
} else {
 return wmjQuery(".globalPortletBodyBackground")
}
},
'673087721': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=" + dollars[0] + "]:visible")},
'673337631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore(" + fixed.columnTxt + ")").parents("[class*='Field']").find(fixed._tgtTag).filter(".sapUiSelectable");},
'675066164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMLabel bdi:contains(" + dollars[0] + "):mt_visible")},
'675904207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("div[class*=CardWrapper_headerText]").filter("[title="+fixed.elmTitle+"]").closest("[class*=CardWrapper_root]");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-card-header-root") : wmjQuery();},
'678372307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(6)")},
'679069660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first =  wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant").filter("[data-id='"+fixed._dataId+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-content") : wmjQuery();},
'679686581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toggle-button-xweb-people-profile").filter("[tooltip="+fixed._parentTooltip+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'680167405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

return findShadowDomWithoutUniqueContainer_1("ui5-static-area-item",
	{selector:".ui5-shellbar-menu-popover" ,isShadowChild:true },
	{selector:"section .ui5-popup-content" ,isShadowChild:true });







},
'682447640': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id^=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'684101614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header:containsTextNodeIgnore("+fixed.modalHeader+")").closest(".sapMDialog").find("label:containsTextNodeIgnore("+fixed.elemLabel+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");},
'685991291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("xweb-shellbar-search-input", getHeaderBarContainer1());
	return wmjQuery("input.ui5-input-inner", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("div#bizXSearchField");
}
},
'686561362': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapUiVlt").find(".sapUiVltCell").find("input").parent();},
'686708831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='overdueMessageStrip']").find("strong").filter(":containsTextNode("+fixed.elemTxt+")");},
'688726534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] footer button:contains(" + dollars[1] + ")")},
'688754147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[id='"+fixed._divIdAttr+"']").closest("[class^='HomepageSection_sectionWrapper']");},
'697742725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id=goalForm]");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldAttr+"']");
const secondShadow = second.length && second[0].shadowRoot;
const third = secondShadow && wmjQuery(secondShadow).find("ui5-select-sf-goal-form");
const thirdShadow = third.length && third[0].shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-label-root") : wmjQuery();},
'701091962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogTitleGroup").find(".sapMTitle").filter("[id="+fixed._parentId+"]").children("span");},
'702469493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'702824798': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.lmText+")") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();},
'704524012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery(".sapUshellTileBaseTitle").filter(":containsTextNode("+fixed.targetText+")").closest(".globalLPTileContent"); 
if (target.length){
 return target;}
return wmjQuery("[data-testid='lineClamp']").filter(":containsTextNode("+fixed.targetText+")").closest("ui5-busyindicator,ui5-busy-indicator");},
'704978818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("thead .sapMLabel").filter("[title='" + fixed.titleText + "']").parent();},
'708534894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".library-detail-column-labels").filter(":containsTextNode("+fixed.lmText+")");},
'709499180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._elemId+"]");},
'710000710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.inline").filter(":contains("+fixed.lmText+")").closest(".upperText").closest("div[id*=pipeElem]");},
'710087684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPlacematText.sapMBtn.surjUserPhoto.surjUserPhotoCircle.surjUserPhotoName-EAST")},
'711456537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "]:first")},
'711471175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='CardHeader_headerText']").filter(":containsTextNodeIgnore("+fixed.cardHeaderText +")");},
'712206595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();},
'714476220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"sfOverlayMgr\"] DIV:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'714724307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMFlexBoxAlignContentStretch").find(".catalogPanelTitle bdi");},
'718212547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button", one);
}else{
	return wmjQuery("div.globalHeaderBar #bizXShellCustomHeader-BarLeft").find("button.bizXShellDropMenuButton");
}
},
'718997271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr:contains(" + dollars[0] + ") input[value=" + dollars[1] + "]")},
'721984793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".sapMIBar").find("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'722292303': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPAnchorBarButton[aria-selected=true]").filter(":containsTextNode("+fixed.selectedTab+")").closest(".sapUxAPObjectPageHeaderTitle").next().find(".sapUiRespGrid");},
'725657945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='obj-act'] a[title=" + dollars[0] + "]:first")},
'726045554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='listbox']>a:eq(1)")},
'726365537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='buttonset aquabtn active'] button[id*=" + dollars[0] + "]:first")},
'729841782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]:contains(" + dollars[1] + ") ~ div[class='sapUiVltCell sapuiVltCell'] input")},
'730718772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("[role='combobox']");},
'731066518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-performance-management").filter("[title*=" + fixed.titleText + "]").closest("[data-testid=pmu_component_PageSection]").find("ui5-panel-xweb-performance-management");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-panel-root") : wmjQuery();},
'732918769': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("[data-help-id='"+fixed._datahelpid+"']").find(".sapMInputBaseContentWrapper").find(".sapUiIconPointer");},
'733911787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".magicTablePlacement").find("span").filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'734800079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.field_label:contains(" + dollars[0] + "):mt_visible")},
'744054276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiRespGrid div:has(span.sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + ")) button[title=" + dollars[1] + "]:mt_visible")},
'745098628': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header").filter("[data-ui5-stable="+fixed._headerStable+"]")[0];
if(first){
	const firstShadow = first && first.shadowRoot;
  	return firstShadow ? wmjQuery(firstShadow).find("ui5-li-sf-header").filter("[data-ui5-stable="+fixed._iconName+"]").find(".menuItemSpace"): wmjQuery();
}
else{
  const firstr = wmjQuery("xweb-shellbar")[0];
  const firstShadowr = firstr && firstr.shadowRoot;
  const sec = wmjQuery(firstShadowr).find("ui5-shellbar-sf-header")[0];
  const secShadow = sec && sec.shadowRoot;
  return secShadow ? wmjQuery(secShadow).find("ui5-li-sf-header").filter("[data-ui5-stable="+fixed._iconName+"]").find(".menuItemSpace") : wmjQuery();
}


},
'747620031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapMListItems").find(".sapUiIcon");},
'748595690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") + div[class~=" + dollars[1] + "] input")},
'749300382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalRoundedCornersXSmall globalPrimaryButton']:eq(0)")},
'749844586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid=takeActionButton]")[0];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-actions-btn']")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'750018615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-panel-xweb-goalmanagementx, ui5-panel-xweb-team-goal")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(".ui5-panel-header-title", firstShadow).filter(":containsTextNodeIgnore("+fixed.btnText+")");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'751332438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell'] input[class~=" + dollars[0] + "]")},
'751852526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink.globalMenuItem.tgm-menuitem.first")},
'752376276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery(".sapUshellTileBaseTitle").filter(":containsTextNode("+fixed.targetText+")").closest(".globalLPTileContent"); 
if (target.length){
 return target;}
return wmjQuery("[data-testid='lineClamp']").filter(":containsTextNode("+fixed.targetText+")").closest("button,a");},
'756721643': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiRespGridBreak").find(".sapMLabel").filter("[title=" + fixed.titleText + "]")},
'757128484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sfPeopleProfileBlockTitle'] :contains(" + dollars[0] + ") button[title=" + dollars[1] + "]")},
'757135544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon[name="+fixed._iconName+"]").closest("li");},
'757632988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='__button']:contains(" + dollars[0] + ")")},
'757823728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id="+fixed._lmid+"]").closest(".formFieldLabel").closest("tr").find("button").first();},
'758810582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-textarea-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find("textarea") : wmjQuery();},
'760948714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("xweb-todo-list");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".title").filter(":containsTextNode("+fixed.elemText+")").closest("ui5-busy-indicator-sf-header") : wmjQuery();},
'761167541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-text-field[name='"+fixed._parentId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-textarea-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find("textarea") : wmjQuery();
},
'765153221': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("[id^='reportListPageView']").find("bdi").filter(":containsTextNode("+ fixed.btnText +")");
if (elem.length)
 {return elem;} 
return wmjQuery("#pageHeader nav").find(".sapMBreadcrumbsItem").find("span.sapMText").filter(":containsTextNode("+ fixed.btnText +")");},
'768537914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("[role=tabpanel]").find(".label").filter(":containsTextNode("+fixed.lmText+")");},
'772094308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentId+"]").find("a").filter("[href$="+fixed._lmHref+"]").closest("p");},
'772299878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("ui5-button[data-ui5-stable="+fixed._elemText+"]", getHeaderBar1());
	return wmjQuery(".ui5-button-root", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("[type='button']").filter("[id*="+fixed._elemText.substring(0, fixed._elemText.length - 1)+"]");
}
},
'773460371': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("thead:has(.sapMLabel[title=" + dollars[0] + "]) + tbody .sapMListTblCell:eq(1) input")},
'774583069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.elemAttr+"]").closest("th.sapMListTblHeaderCell").filter(":last");},
'775222104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header[id=" + dollars[0] + "] [class=" + dollars[1] + "]")},
'777827301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class~=" + dollars[0] + "] input")},
'780142580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".wizFooter").find(".globalPrimaryButton").filter("[title="+fixed.tgtTitle+"]:mt_visible");},
'781165912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id="+fixed._elm+"]");},
'784347104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".radioLabel").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".globalRadio");},
'784505447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tgm-objective-actions:eq(" + dollars[0] + "):visible")},
'784999457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText)

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:"#popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+")", isShadowChild:false},
	{selector:"li", isShadowChild:true});
}else{
	return wmjQuery("#utilityLinksMenuId-menuPopover").find(".bizXMenuListItem:directContains("+text+")");
}







},
'787152649': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest("label").closest(".sapUiVlt").find("[data-help-id]").parent();},
'787410870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".fd-input-group").find("input").filter("[type="+fixed._elmAttr+"]");},
'787488387': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("#shellbar",  wmjQuery("xweb-shellbar")[0].shadowRoot);
	let two = wmjQuery(".ui5-shellbar-search-button", first[0].shadowRoot)[0].shadowRoot;
	return wmjQuery(".ui5-button-root", two)
}else{
	return wmjQuery(".globalHeaderBar").find("div.bizXSFB");
}
},
'791432985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMenuBtn").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'791657886': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-xweb-manifest-toolkit").filter("[data-help-id="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find(".ui5-link-text");
return elem.length ? elem : wmjQuery();},
'793062002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-button-xweb-team-goal").filter("[data-help-id="+fixed._dataHelpId+"]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'795001783': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".multiselectTypeAheadSelectedListContainer").filter("[id="+fixed._parentId+"]").find("div");},
'795395533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.tgtId+")").closest("div[class*='CustomCard_content']").prev("[data-testid='largeImage']");},
'795519668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[1] + ")")},
'797318651': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("xweb-goal-form")[0].shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field", first)
const tree = wmjQuery("ui5-select", second[0].shadowRoot).filter("[aria-label=" + fixed.btnText + "]")
return wmjQuery("div.ui5-select-root", tree[0].shadowRoot)
},
'801411599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine").filter(":containsTextNode("+fixed.cardTitle+")").closest(".sapMLIBContent");},
'801773342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter("[title="+fixed.lmtitle+"]").closest(".sapUiVlt").find("input").closest(".sapUiVltCell");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'803228742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='globalMenu sfDropMenu menuDefault'] a[title=" + dollars[0] + "]")},
'804198854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td label[for*=" + dollars[0] + "]")},
'806055106': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a:contains(" + dollars[0] + ")")},
'807417247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td input[class*='globalPrimaryButton']")},
'808661244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest("tr").find("ui5-date-picker-xweb-calendar-widget").filter("[data-testid="+fixed._dataTestAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("ui5-input-xweb-calendar-widget");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'810675446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*=" + dollars[0] + "] span.fd-menu__title")},
'811517173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapMComboBoxInner:eq(4)")},
'812494613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive.sapMListTblRow:last input:eq(" + dollars[0] + ")")},
'813877771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + "):first")},
'815049445': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapUxAPObjectPageSection").find("bdi").filter(":containsTextNode("+fixed.elmTxt+")");},
'815846269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").find("[slot='label']").filter("[name='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'817049080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr td").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("select:last");},
'819174164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=" + dollars[0] + "] td:contains(" + dollars[1] + ")")},
'819341140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid="+fixed._parentDataTestId+"]")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (fixed._parentDataTestId  === "goToButton") {
  const newButtonDataTestId = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-links-btn']")[0];
  const shadowElem = newButtonDataTestId ? newButtonDataTestId.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'819619935': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*='per_page']:first")},
'822127351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workflowApprovalBody").find(".globalContainer .commentsContent").find("textarea.formElement");},
'826931874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[name="+fixed._parentName+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;


return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-label-root") : wmjQuery();

},
'827501062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hoc-highlight-shim").first();},
'829204496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMFlexBox").find(".sapMSltLabel");},
'831245103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li[data-testid=takeActionItem]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span[role=button]");
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content[accessible-role=button]");
if (oldUI.length) {
  return oldUI;
}
else if (newUI.length) {
  return newUI;
}
else {
  return wmjQuery();
}},
'834385268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBaseContentWrapper");},
'834463091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='dlgButton']:first")},
'835961812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("bdi").filter(":containsTextNode("+fixed.lblText+")").closest(".sapUiVltCell").next(".sapUiVltCell").find("input").closest(".sapUiHLayoutChildWrapper");},
'838416004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div span bdi:contains(" + dollars[0] + ")")},
'841932098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElem = wmjQuery(".sapUxAPAnchorBarUpperCase").find("span").filter(":containsTextNode("+fixed.elemTxt+")").closest(".sapMITBItem");
if (newElem.length) {return newElem;}

const oldElem =wmjQuery(".sapUxAPAnchorBarUpperCase").find("button").filter(":containsTextNode("+fixed.elemTxt+")");
return oldElem.length ? oldElem : wmjQuery(); 
},
'846534498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode("+fixed.labelTxt+")").next("section").find("[id$=todoList]");},
'846550020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-responsive-popover-xweb-global-header").find("ui5-side-navigation-item-xweb-global-header").filter("[data-testid="+fixed._elemAttr+"]");},
'846889218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer")[0];
const firstShadow = first && first.shadowRoot ;

let newlmText =  ftHelper.unQuote(wmjQuery().identity(fixed.lmText));
newlmText = newlmText ?  newlmText.split(" (")[0] : null;
const elem = wmjQuery(firstShadow).find(".ui5-tab-strip-itemText").filter(":contains("+newlmText+")");
return elem.length ? elem : wmjQuery();
},
'847087602': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.titletxt+")").closest(".pmPortletContainer").find(".sfObjectPageSectionContainer");},
'849033983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "]>bdi:contains(" + dollars[1] + ")")},
'849055381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_homepageSection']")},
'849055382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").parent()},
'849985837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class='cell tableHeaderLabel']:eq(" + dollars[0] + ")")},
'850486923': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfDialogBoxButtonWrapper").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'850914830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'852284566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[id=" + dollars[0] + "]:contains(" + dollars[1] + ") a:first")},
'852717547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery(".hoc-side-panel-header-as-of").find("a[onclick*=showPosition]").find("span.context_icon");
const newElem = wmjQuery(".hoc-side-panel-header-as-of").find("button[onclick*=showPosition]");
if (oldElem.length) {
 return oldElem;
} else if (newElem.length) {
 return newElem;
}
return wmjQuery();},
'853065674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".jobTitle").filter(":containsTextNode("+fixed.elemText+")");},
'854551228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form[data-help-id='"+fixed._formIdAttr+"']",
    { selector: "xweb-goal-form-text-field[id="+fixed._idAttr+"]", isShadowChild: true },
    { selector: "ui5-textarea-sf-goal-form[id="+fixed._nameAttrTextArea+"]", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(targetShadow).find(".ui5-textarea-inner");
} else {
    return wmjQuery();
}},
'854841331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.bdiText+")").closest(".sapUxAPObjectPageHeaderIdentifierActions");},
'857312675': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":directContains("+fixed.containerTitle+")").closest("section").find(".mtrDescriptionContainer");},
'858431700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".btn").filter("[data-help-id="+fixed._tgtText+"]");},
'860144594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapIcon").filter(":containsTextNode("+fixed.lmText+")").closest(".toolbarButton");},
'860226449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a[href*='/sf/admin']")},
'861288719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-component-name="+fixed._attr+"]").children();},
'861362690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']")[0]
let firstShadow = first && first.shadowRoot
return wmjQuery("ui5-li-sf-header[data-ui5-stable="+fixed._lmAttr+"]",firstShadow).find(".menuItemSpace")

},
'862879069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[role="dialog"]:contains(' + fixed.dialogTitle + ') .panelContent')},
'863349182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:contains(" + dollars[0] + ") .sapMInputBaseInner")},
'863567625': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("ui5-dialog-sf-talent-activity").filter(":contains("+fixed.elemHeaderText+")")[0].shadowRoot; 
return wmjQuery(".ui5-popup-content",firstShadow); },
'863914002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-input-xweb-form-inbox[name='"+fixed._nameAttr+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("input") : wmjQuery();},
'863977128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='HomepageSection_sectionTitle']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_homepageSection']")},
'863977129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='HomepageSection_sectionTitle']").filter(":containsTextNode("+fixed.formHeader+")").parent();},
'868316975': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*='tgm-objective-row'] a[onclick*=" + dollars[0] + "]:first")},
'868907272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[role='columnheader']:contains(" + dollars[0] + ")")},
'872419997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapExtentUilibUtilEditFormGeneratorShowMoreLessButton");},
'873055026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[title=" + dollars[0] + "]>bdi")},
'874304570': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("span.revolutionTSInfoLabel").filter(":containsTextNodeIgnore(" + fixed.headerText + ")").closest(".revolutionTSInfo,.revolutionTSInfoSection").parent().next().find("span.revolutionTSDatePickerWrapper");
if (elem.length)
 {return elem;} 
return wmjQuery("span.revolutionTSGroupWrapperHeaderLabel").filter(":containsTextNodeIgnore(" + fixed.headerText + ")").closest(".revolutionTSInfoSection").find("span.revolutionTSDatePickerWrapper");

},
'875644579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] button:last")},
'876095607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem1 = wmjQuery(":header").filter(":contains("+fixed.lmText+")").closest("div[data-component-name='DynamicPageTitle']");
if (elem1.length)
{
  return elem1;
}
const elem2 = wmjQuery("ui5-dynamic-page-title-xweb-goalmanagementx").find("ui5-title-xweb-goalmanagementx").filter(":mt_visible").find("ui5-text-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmText+")").closest("ui5-dynamic-page-title-xweb-goalmanagementx");

if (elem2.length)
{
  return elem2;
}
return wmjQuery();},
'876608505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMText").filter(":containsTextNode("+fixed.elemTxt+")");},
'883075823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNode("+fixed.cardTitleText+")").closest("[data-testid='cardWrapper']");},
'883706665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='listbox'] a[href*=" + dollars[0] + "]")},
'884007777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	return wmjQuery("[role='banner']", two);
}else{
	return wmjQuery(".globalHeaderBar[role='banner']");
}
},
'886037804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".globalPageTitle").find(".dropDownButtonText").filter(":containsTextNodeIgnore("+fixed.btnText+")");},
'890480822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-pidget-element='toolbar']").find("ui5-button-xweb-goalmanagementx").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'891465122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest(".formGroup").find("[id^=arrowIcon]");},
'892098267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":containsTextNode("+fixed.labelTxt+")").closest(".pmPanelContent").find(".nrte_contentArea");},
'892629125': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField bdi").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUiVlt").find(".sapUiIcon");},
'895063909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPortletContainer").find("[role='region']");},
'896249922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[id*='field_4_lbl'] ~ td.field_value input")},
'896259422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapUiVltCell");},
'898423087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='sapExtentUilibFormPatternBlockTitle']:contains(" + dollars[0] + ") ~ button[title*=" + dollars[1] + "]")},
'899463876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibEditPageEffectiveDateVLToolbar").find(".sapUiIcon");},
'902754905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowRoot = wmjQuery("ui5-text-xweb-performance-management").filter(":containsTextNode("+fixed.lmText+")").closest("ui5-li-custom-xweb-performance-management")[0];
const shadowRootLm = shadowRoot ? shadowRoot.shadowRoot : null;
const lm = wmjQuery(shadowRootLm).find("li[role='listitem']");
return lm ? lm : wmjQuery();},
'906303938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("th").closest("tr").find("td");},
'906681920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("[class*='DynamicPageTitle-breadcrumbs']").find("[ui5-breadcrumbs]")[0]; 
let firstShadow = first && first.shadowRoot; 
let second = wmjQuery("[href*='goal-list']",firstShadow)[0]; 
let secondShadow = second && second.shadowRoot;
return wmjQuery(".ui5-link-root",secondShadow); 
},
'906767839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='sapExtentUilibFormPatternBlockTitle']:contains(" + dollars[0] + ")")},
'907514884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemContainer = wmjQuery("ui5-dialog").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (elemContainer) {
  const shadowElem =  elemContainer.shadowRoot;
  return shadowElem && wmjQuery("[id='ui5-popup-header']", shadowElem);
}
return wmjQuery();},
'908115556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem = wmjQuery("ui5-button-xweb-goalmanagementx").filter("[data-testid="+fixed._buttonDirectText+"]");
return elem.length ? wmjQuery("button",elem[0].shadowRoot) : wmjQuery();},
'908258045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^='HomePageSection']").filter("[data-testid="+fixed._elemDataTestId+"]");},
'908280181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] button[class*=" + dollars[1] + "]")},
'908452339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogTitle").filter(":containsTextNodeIgnore("+fixed.dialogHeaderTitle+")").closest("div.sapMDialog").find("div.sapUiVltCell").filter(":first");},
'909317594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("bdi").filter(":containsTextNodeIgnore(" + fixed.titleText + ")")},
'910103262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("ui5-text").filter(":containsTextNode("+fixed.lmText+")")[0]
const shadowElemOpen = shadowElem ? shadowElem.shadowRoot : wmjQuery();
return shadowElemOpen ? wmjQuery(shadowElemOpen).find("span") : wmjQuery();},
'910579131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.wrapperList a[title=" + dollars[0] + "]")},
'912661920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid=takeActionButton]")[0];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-actions-btn']")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'915051617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pm2LFloatBlock");},
'917115452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("ui5-dialog").find("ui5-label").filter(":containsTextNode("+fixed.lblText+")").next("ui5-combobox").last()[0];
 if (shadowElem)
 {
   const shadowElemOpen = shadowElem.shadowRoot
   return shadowElemOpen ? wmjQuery(shadowElemOpen).find("input") : wmjQuery();
   
 }
   return wmjQuery()},
'917513304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#customHeaderModulePickerBtn-menuPopover-cont a[href*=" + dollars[0] + "]")},
'919701971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded.sapMPanel:eq(" + dollars[0] + ")")},
'922819510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
const text = wmjQuery().identity(fixed.btnText);
	return findShadowDomWithoutUniqueContainer_1("ui5-tabcontainer.sf_goal_comp-GoalIconTabBar",
	{selector:"div.tab-description[title="+text+"]" ,isShadowChild:true }).parent()




},
'923822870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapUiVlt").find(".sapMInputBaseContentWrapper");},
'923892686': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorTableContainer").find(".sapMTitle span").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'924757348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("xweb-goal-form")[0].shadowRoot;
return wmjQuery("ui5-label-sf-goal-form",firstShadow).filter(":containsTextNode("+fixed.tgtText+")");},
'929498280': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[title=" + dollars[0] + "]:visible")},
'930432444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").find("[id*=inner]").filter(":containsTextNode("+fixed.lmText+")");},
'931785862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-date-field[name='"+fixed._parentId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-date-picker-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find("ui5-input-sf-goal-form") : wmjQuery();
},
'931866020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("[data-help-id='"+fixed._datahelpid+"']").closest(".sapExtentUilibUtilEditFormGeneratorField").find("label");},
'931977241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-label-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmTitle+")").closest("[data-testid='statusMenuReadonly']").closest("[class*=style_statusContainer]");},
'932871361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".toolbarButton").filter(":containsTextNode("+fixed.elemText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'933765169': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-goalmanagementx[data-help-id='goal-iconTabBar']")[0];
const firstShadow = first && first.shadowRoot;

if (firstShadow)
{
  return wmjQuery(firstShadow).find(".ui5-tab-strip-itemText").filter(":containsTextNode("+fixed.btntext+")").closest(".ui5-tab-strip-itemContent");
}
return wmjQuery();},
'934228224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".magicTableWrapper").find("input").filter("[value="+ fixed.btnText +"]");},
'935261689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1[id=" + dollars[0] + "]:visible")},
'939932987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:eq(" + dollars[0] + ")")},
'940298649': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase:visible")},
'946320318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").find("span").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'947527936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadowContainer = wmjQuery("ui5-breadcrumbs-xweb-goalmanagementx")[0];
const firstShadowElem = firstShadowContainer && firstShadowContainer.shadowRoot;
const secondShadowContainer = firstShadowElem && wmjQuery("ui5-link-xweb-goalmanagementx", firstShadowElem).filter(":containsTextNode("+fixed.elemTxt+")")[0];
const secondShadowElem = secondShadowContainer && secondShadowContainer.shadowRoot;
return secondShadowElem && wmjQuery("a.ui5-link-root", secondShadowElem);},
'947542347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='Form']").find("label").filter(":containsTextNode("+fixed.txt+")").closest("div[class*='Item']");},
'951293635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem[href*=\"/pmreviews\"]")},
'951869793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'952258921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] div[class~=" + dollars[1] + "]")},
'952865380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=title][id*=inner]").filter(":containsTextNode("+fixed.lmText+")").closest(".sapUiView").find(".nboxview");},
'955788633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("span,label").filter("[title="+fixed.tgtTitle+"]");},
'958222015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.lmText+")").closest("td"); },
'962354201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class='tab_list'] a[title=" + dollars[0] + "]")},
'964856282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".leftpart").filter(":contains("+fixed.headerTxt+")").closest(".pmPortletContainer").find("[class*='FloatContainer']");},
'964968719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("xweb-goal-form-number-field", secondShadow).filter("[accessible-name="+fixed._elemIndx+"]")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery("ui5-input-sf-goal-form", thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;
const elem = wmjQuery(".ui5-input-inner", fourthShadow).filter(":first");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'967912178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "] span[id*=" + dollars[1] + "]:visible")},
'971509446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "]:visible")},
'972972261': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field",firstShadow).filter("[id='"+fixed._fieldId+"']")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("ui5-label-sf-goal-form",secondShadow): wmjQuery();},
'973032226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a:contains(" + dollars[0] + "):mt_visible")},
'973102063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-user-settings-dialog-xweb-global-header[data-testid=profileUserSettings]")[0];
let firstShadow = first && first.shadowRoot;
let second = wmjQuery(firstShadow).find("ui5-li-xweb-global-header[id*=setting]").filter(":containsTextNode("+fixed.lmText+")")[0];
let secondShadow = second && second.shadowRoot;
let elem = wmjQuery(secondShadow).find("li");
return elem.length ? elem : wmjQuery();},
'973947862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field[name='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("bdi",thirdShadow) : wmjQuery();},
'976332174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-homepagex").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery();},
'976336174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-homepagex").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery();},
'976849140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class*="+fixed._divClass+"]").find(".sapMLabelTextWrapper").filter(":containsTextNode("+fixed.divTxt+")").closest("[role='checkbox']");},
'977114528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant[data-id='versatile-writing-assistant-make-longer']");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-root.ui5-li--focusable") : wmjQuery();},
'977522578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type*=" + dollars[0] + "]:eq(0)")},
'978735770': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[onclick*='menu'] span.hoc-ui5-icon")},
'980243270': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sectionTitle").filter("[aria-label="+fixed.lmAriaLabel+"]").closest(".columnDataSection");},
'983784682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] button.globalPrimaryButton")},
'986973366': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase:eq(0)")},
'989838705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "][class*='sapMBarChild']")},
'990128388': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalContainer").find(".pwhHeaderTitle").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'990467583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a.menuLink.globalMenuItem.tgm-menuitem.first:visible")},
'990527498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog#myTeamDialog [data-testid=myTeamList]");},
'990821461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='panel']:contains(" + dollars[0] + ") div[class='sapUiVltCell sapuiVltCell'] div[class*=" + dollars[1] + "]")},
'991156830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] button[class*=" + dollars[1] + "]")},
'991263598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id*=" + dollars[0] + "][class*='sapMPageEnableScrolling']")},
'993194914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
const selectedUI = oldUI ? oldUI : newUI;
const shadowElem = selectedUI ? selectedUI.shadowRoot : null;
return shadowElem ? wmjQuery("li[role=listitem],a[role=link]", shadowElem) : wmjQuery();},
'993208829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-goalmanagementx").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=GoalDetailInfo_moreInfoItem]").find("ui5-text-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'994364826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=checkbox]").filter("[id="+fixed._tgtId+"]").closest("td.FormData");},
'996190573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapMColumnHeader").closest(".sapMList").find(".sapMInputBase").eq(fixed.thIndex).find(".sapUiIcon ");},
'998079689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class~=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'998297260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]:contains(" + dollars[1] + ") + div[class='sapUiVltCell sapuiVltCell'] input")},
'998551603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class*=" + dollars[0] + "] span[class*=" + dollars[1] + "]")},
'1000066289': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=" + dollars[0] + "] EM")},
'1005601546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='menuLink']:contains(" + dollars[0] + ")")},
'1006722760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":contains("+fixed.labelText+")").closest(".sapMPanel").find(".sapExtentUilibUtilEditFormGeneratorShowMoreLessButton").find(".sapMBtnContent");},
'1007761048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("section").filter("[id='"+fixed._elemId+"']").nextAll("footer").find("button.sapMBtn").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'1007838538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='teamListContainer']").find("ui5-list[data-testid='myTeamList']");},
'1009291556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("tr").find(".nrte_contentArea");},
'1010094875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog']:contains(" + dollars[0] + ") button:contains(" + dollars[1] + ")")},
'1010562778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const modalElem = wmjQuery("div[role=dialog]").length ? 
 wmjQuery("div[role=dialog]") : 
	 wmjQuery("div[role=group]");

return modalElem.find("div.sapMBarPH").find("span").filter((index, elem) => !!elem.textContent.length);

},
'1010673789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-goal-form-text-field#goalForm-field-Org")[0];
const secondShadow = second && second.shadowRoot ;
const third = wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.lmText+")")[0];
const thirdShadow = third && third.shadowRoot ;
const elem = wmjQuery(thirdShadow).find("span.ui5-label-text-wrapper");

return elem.length ? elem : wmjQuery();
},
'1015608267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfDropMenu").find("a").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")");},
'1018813450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".topBar_label").filter(":containsTextNode("+fixed.elemText+")");},
'1022830673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='reportCenter']")},
'1023164562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='headerIcon']").filter("[name="+fixed._lmicon+"]").closest("[slot=header]");},
'1028213418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartStepName").filter(":containsTextNode("+ fixed.btnText +")").closest(".sfStepsChartStepItem");},
'1029137790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^=" + dollars[0] + "]:contains(" + fixed.headerTxt + ") span:contains(" + dollars[1] + ")")},
'1029351042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sfTH:contains(" + dollars[0] + ")~td span.sfDropDownContainer")},
'1029504495': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").filter("[data-help-id="+fixed._modalAttr+"]").find(".sapMPanelHeadingDiv").find("span").filter("[id^=__title][id$=inner]");},
'1029558516': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[onclick*=" + dollars[1] + "]")},
'1031600094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] span[class~=" + dollars[1] + "]")},
'1033344501': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formFieldLabel:contains(" + dollars[0] + ") + td input")},
'1040392620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "] span[id*='label']")},
'1040906917': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-ilx[data-testid='curriculumStatus']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-link-text") : wmjQuery();},
'1042336018': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
if( headerCheck1() ){
const newElemShadowFirst = wmjQuery("ui5-link").filter(":directContains("+fixed.elemText+")")[0];
const elemShadow = newElemShadowFirst && newElemShadowFirst.shadowRoot;
const newElem = wmjQuery("a.ui5-link-root",elemShadow);
return newElem;
}
const oldElemDiv = wmjQuery("[class*='FavoritesDialog_quickLinkWrapper']").filter(":containsTextNodeIgnore("+fixed.elemText+")");
if (oldElemDiv.length) return oldElemDiv;
return wmjQuery();},
'1043635509': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title=" + dollars[0] + "]:last")},
'1044136435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopoverScroll a:contains(" + dollars[0] + ")")},
'1044467153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstElem = wmjQuery(".form_field").find("#attachment_alt"); 
const secondElem = wmjQuery("span").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest("tr").find(".linkPattern");
if (firstElem.length) {
 return firstElem;}
else if (secondElem.length) {
 return secondElem;}
 return wmjQuery();
},
'1045701276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.text").filter(":directContains("+fixed.labelText+")").closest("tr").find(".ectFormFieldBorder");},
'1047807665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogTitle").filter(":containsTextNodeIgnore("+fixed.modalHeaderTitle+")").closest("div.sapMDialog").find("div.sapMPanelContent").find(".sapUiRespGrid");},
'1048738659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.placeholder-value.search-box.globalRoundedCornersXSmall")},
'1048877658': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUxAPObjectPageSubSectionHeaderTitle']:contains(" + dollars[0] + ")")},
'1050400079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon").filter("[name="+fixed._lmAttr+"]").closest("a[data-testid='quickActionTileButton']");},
'1050765802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._sectionTitleId+"]").closest("[class^='HomepageSection_homepageSection']");},
'1051599038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class~=" + dollars[0] + "] span[class='sfDropDownContainer']")},
'1053957991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-tabcontainer-xweb-ec-workflow")[0];
let firstShadow = first && first.shadowRoot;
let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
const elem1 = wmjQuery(".ui5-tab-strip-itemText", firstShadow).filter(":contains("+targetText+")").closest(".ui5-tab-strip-item").filter(":mt_visible");
if (elem1.length)
{
  return elem1;
}
 first = wmjQuery("ui5-static-area-item-xweb-ec-workflow")[0];
 firstShadow = first && first.shadowRoot;
const elem2 = wmjQuery(".ui5-tab-overflow-itemContent", firstShadow).filter(":contains("+targetText+")").closest(".ui5-tab-overflow-item");
if (elem2.length)
{
  return elem2;
}
return wmjQuery();
  
},
'1054476218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sfPeopleProfileBlockTitle").find("span.sapUiInvisibleText").filter(":containsTextNodeIgnore("+fixed.btnText+")").closest("button");},
'1056314238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+ fixed.btnText +")").closest(".sapMLIBContent");},
'1058453347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("thead:has(.sapMLabel[title=" + dollars[0] + "]) + tbody .sapMListTblCell:eq(" + dollars[1] + ") input")},
'1059893293': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class='globalRoundedCornersXSmall globalPrimaryButton']:first")},
'1060087803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("xweb-goal-form",
	{selector:"div.label" ,isShadowChild:true }).filter(":containsTextNode("+fixed.btnText+")")
},
'1063519306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='Label']>bdi:contains(" + dollars[0] + ")")},
'1063782959': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmuToolbar").filter("[data-help-id="+fixed._parentAttr+"]").find("a").filter("[title="+fixed.lmAriaLabel+"]");},
'1064042674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.viewRequisition.last.globalMenuItem")},
'1064287393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("span[class^='FormItem_pseudoInvisibleText']").filter(":containsTextNode("+fixed.invisText+")").closest("div[class^='FormItem_content']").find("ui5-input-xweb-dynamic-content")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow): wmjQuery();},
'1064622476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*='FullProfile_title']").filter(fixed._parentTag)[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("h2").find("span");
return elem.length ? elem : wmjQuery();},
'1068320059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=dialog]").find(".sapMInputBase[data-help-id="+fixed._dataHelpAttr+"]").find("input");},
'1071274218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-ilx").filter("[id*='"+fixed._outerId+"']");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root").find("span") : wmjQuery();},
'1071366013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog").find(":header").filter("[data-testid=" + fixed._titleText + "]").parent();},
'1071402684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sapMListTblCell.sapMListTblCellNoData:contains(" + dollars[0] + ")")},
'1071995435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-notification:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".ui5-nli-heading" ,isShadowChild:true });
} else {
    return wmjQuery(".sapMListBGSolid  ul li:eq("+fixed._index+")").find(".sapMNLITitleText");
}
},
'1074477667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "] button:first")},
'1077245480': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[value=" + dollars[1] + "]")},
'1078122038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-link__content").filter(":containsTextNode("+fixed.lmText+")").closest("a");},
'1080212713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._fieldAttr+"']");
const secondShadow = second.length && second[0].shadowRoot;
const third = secondShadow && wmjQuery(secondShadow).find("ui5-select-sf-goal-form");
const thirdShadow = third.length && third[0].shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-label-root") : wmjQuery();},
'1080863093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='dialog'] button[class*=" + dollars[0] + "]")},
'1081380966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("ui5-dynamic-page-xweb-goalmanagementx").find("xweb-goal-form").filter("[data-help-id="+fixed._formData+"]")[0];
const firstShadow = first && first.shadowRoot;

return firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-form"): wmjQuery();},
'1083709524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.first.globalMenuItem")},
'1085603511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[alt=" + dollars[0] + "]:visible")},
'1086461219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[role=navigation]").find("button.sapUxAPAnchorBarButton").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'1086581600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button[icon='sys-enter']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button#globalTodos");
}
},
'1087081016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest("div.pmPanelContent").find("select").filter("[aria-label="+fixed.elemAttr+"]");},
'1088440809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-mini-app-dialog").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("ui5-dialog-xweb-mini-app-dialog")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-popup-header-root",firstShadow) : wmjQuery();},
'1090643377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("[id*='title-inner']").filter(":containsTextNode("+fixed.lmText+")").closest("header").next("section").find(".sapMPage");},
'1090845610': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:visible[class*='sapUshellTileContainerHeader']:eq(" + dollars[1] + ")")},
'1094798639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-combobox[data-testid='"+fixed._dataAttr+"']")[1];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow) : wmjQuery();},
'1097370344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + "):not(:contains(nature))")},
'1098619521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("ui5-dialog").find("ui5-label").filter(":containsTextNode("+fixed.lmText+")").last()[0];
const shadowElemOpen = shadowElem ? shadowElem.shadowRoot : wmjQuery()
return shadowElemOpen ? wmjQuery(shadowElemOpen).find("span.ui5-label-text-wrapper") : wmjQuery();},
'1102148100': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dynamic-page").filter("[id="+fixed._pageId+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-dynamic-page-header-actions")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-button")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find("button").filter("[aria-label="+fixed.lmTitle+"]") : wmjQuery();},
'1102395077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSplitContainerDetail").find(".sapMTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'1103739904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-component-name='DynamicPageTitleActions'] ui5-toggle-button-xweb-goalmanagementx");},
'1105583208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-number-field", firstShadow).filter("[id="+fixed._elemIndx+"]")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(".ui5-label-root bdi", thirdShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1106088635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery(".hoc-side-panel-section-content").find("[onclick*=showPosition]");
const targetElemTagName = targetElem.prop("tagName");
if (targetElemTagName === "A") {
 return targetElem.find("span.context_icon");
} else if (targetElemTagName === "BUTTON") {
 return targetElem;
}
return wmjQuery();},
'1106755513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimaryButton']:contains(" + dollars[0] + ")")},
'1109437148': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id^='__box']:eq(" + dollars[0] + ")")},
'1111519834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("[id$='label-bdi']").filter(":containsTextNode("+fixed.elemTxt+")").closest("[id$='label-text']");},
'1111995974': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-chipid=" + dollars[0] + "]:mt_visible")},
'1114710752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-tab-strip-itemText",firstShadow).filter(":containsTextNode("+fixed.tgtText+")") : wmjQuery();},
'1116380607': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] button[class~=" + dollars[1] + "]:last")},
'1119113474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSplitContainer[id*=" + dollars[0] + "] header span[id^='__page'][id$='title-inner']")},
'1119617253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._fieldName+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("[id=goalForm-field-area-inner]") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-root") : wmjQuery();},
'1121210274': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapUxAPObjectPageSubSection").find("span").filter(":containsTextNode("+fixed.elemTxt+")");},
'1123895821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog").filter("[data-testid="+fixed._lmAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("section[role='alertdialog']");

return elem.length ? elem : wmjQuery();},
'1125195335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class^='"+fixed._dataHelpId+"']");},
'1125227637': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item-ilx").filter("[id="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("li");
return elem.length ? elem : wmjQuery();},
'1125463667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".titleOnLeftLayout [aria-level=\"4\"]:eq(12)")},
'1126933072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.sectionheader+")").closest("div[class*='sapUiRespGridSpan']");},
'1127265844': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tableHeaderLabel").find("span[id="+fixed._idAttr+"]");},
'1129421084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-card-xweb-manifest-toolkit").find("[class*='CardHeader_title']").filter("[id*='"+fixed._id+"']");},
'1132241664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=" + dollars[0] + "]:contains(" + dollars[1] + "):mt_visible")},
'1132970684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title=" + fixed.btnText + "]").closest("ul.tab_list").next().find("b:last")},
'1134342151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMessageToast").filter("[role="+fixed._roleElm+"]");},
'1136300175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("button").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'1138212229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid="+fixed._parentDataTestId+"]")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (fixed._parentDataTestId  === "goToButton") {
  const newButtonDataTestId = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-links-btn']")[0];
  const shadowElem = newButtonDataTestId ? newButtonDataTestId.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'1142983272': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=container] .globalSecondaryButton:first")},
'1145112445': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(".surjNotificationWrapper.sapMBarChild .surjUtilityLinksMenu")},
'1145323591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(.sapMLabelRequired[title=" + dollars[0] + "]) .sapMInputBaseInner")},
'1146601761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.LabelText+")").parent(".sapMTitle").closest("#__toolbar7, .sapMPanelHeadingDiv").next(".sapMPanelContent");},
'1146930406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title").filter(":containsTextNode("+fixed.headerText+")").closest("ui5-dialog")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-popup-content",firstShadow): wmjQuery();},
'1146941512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(2)")},
'1149588147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='dialog'] div>input[id*='picker']:visible")},
'1150282542': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form_field").find(".field_value").find("[id*=arrowIcon]");},
'1151723679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field[id="+fixed._elemID+"]").find("xweb-goal-form-field-label"): wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();


return wmjQuery("xweb-goal-form-enum-field").filter("[id="+fixed._elemID+"]").find(".ui5-label-root");},
'1152018792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMFlexBox").find(".sapMSelectListItemText");},
'1153707048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMListTblCnt:eq(2) input.sapMComboBoxInner:eq(" + dollars[0] + ")")},
'1155181698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[style*=" + dollars[0] + "] [id*='portlet']:first")},
'1156582197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[role='button'][title]").filter(":containsTextNode("+fixed.sectionTitleDirectText+")").closest("tr[id$='_rater']").next("tr[id$='_content']").find(fixed._tgtTagName).filter(":containsTextNode("+fixed.tgtDirectText+")");},
'1159894098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + ")")},
'1160379200': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall:contains(" + dollars[0] + ")")},
'1160988255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] button")},
'1162238568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".placeholder-value.search-box.globalRoundedCornersXSmall")},
'1162476482': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] a[title=" + dollars[1] + "]")},
'1164086497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]:contains(" + dollars[1] + ") footer button:last")},
'1169587756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardWrapper = wmjQuery("[class^='CardTitle_headerText']:contains(" + fixed.cardTitle + ")").closest("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	return wmjQuery("[id$='contentTitle']:contains(" + fixed.contentTitle + ")").closest(cardWrapper).find(fixed._tag + "[data-testid=" + dollars[0] + "]");
} 
return wmjQuery();},
'1173541300': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-checkbox-xweb-goalmanagementx").filter("[data-help-id='"+fixed._outerAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-checkbox-root",firstShadow) : wmjQuery();},
'1173589823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer button:contains(" + dollars[0] + ")")},
'1175831195': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMFlexBox").filter("[data-autoid='"+fixed._tgtLabel+"']").find(".sapMFlexItem").find(".sapMTitle");
},
'1179180010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='sfDialogBoxButtonWrapper'] button:contains(" + dollars[0] + ")")},
'1183102916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item[data-testid='"+fixed._btntext+"']")[0];
const firstShadow = first && first.shadowRoot;

if (firstShadow)
{
  return wmjQuery(firstShadow).find("li.ui5-segmented-button-item-root");
}
return wmjQuery();},
'1185485208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id$='description']").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest(".field_value");},
'1186800741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".othersRatingContainer").find(".nrte_content");},
'1187193620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.ectFCBody span:has(span.text):eq(" + dollars[0] + ")")},
'1188502756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='label']").filter(":containsTextNode("+fixed.lbltxt+")").closest("td").find(".sapUiIcon[data-sap-ui-icon-content="+fixed._lmicon+"]").closest("button");
                                                                                                 },
'1195549000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-sap-ui=" + dollars[0] + "] button.sapExtentUilibFormPatternActionButton:has(.sapUiIconMirrorInRTL)")},
'1196592266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogTitleGroup").find(":header").find("[id$=title-inner]").filter(":containsTextNode("+fixed.elemTxt+")");},
'1197445682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ?  wmjQuery(firstShadow).find(".ui5-popup-header-root").filter(":containsTextNodeIgnore("+fixed.lmText+")") : wmjQuery();},
'1201473797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(06)")},
'1201702212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.titleText+"]").closest("li.globalMenuItem");},
'1201916797': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='libEditPageEffectiveDateVL'] input:first")},
'1203148089': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".magicTableWrapper").find("input").filter("[title="+ fixed.btnText +"]");},
'1204115587': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapUiHiddenPlaceholder[id="+fixed._invisId+"]").closest(".sapMDialogScrollCont");},
'1205099391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='EditPageEffectiveDate'] input[role=" + dollars[0] + "]")},
'1205699118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("span").filter(":containsTextNode("+fixed.elemText+")");},
'1205809505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*=" + dollars[0] + "]:first a:first")},
'1207126966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-shellbar-sf-header#shellbar",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery(secondShadow).find("div").filter(":containsTextNode(" + fixed.elemLabel + ")");},
'1209240083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[id=" + dollars[0] + "][role='link']")},
'1209969993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapExtentUilibUtilEditFormGeneratorTableContainer:visible input.sapMComboBoxInner:visible:eq(" + dollars[0] + ")")},
'1212803077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.alterRow").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("button.new").filter(":mt_visible");},
'1219877603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#surjSubTabBar").find("a").filter("[title=" + fixed.titleText + "]");},
'1220261337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.fieldLabel+")").closest(".formFieldLabel").closest("tr").find(".sfTriangle");},
'1221680181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("[data-testid='card-header-title']").filter(":containsTextNode("+fixed.titleDirectText+")").closest("[class*='StandardCard_body__']").find(".globalCardLink").filter(":containsTextNode("+fixed.tgtDirectText+")");
return shadowElem.length === 1 ? wmjQuery(".ui5-link-root",shadowElem[0].shadowRoot) : wmjQuery();},
'1221730309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell").find("[data-help-id="+fixed._outerAttr+"]").find(".sapMSwt");},
'1223672398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] input[role='combobox']")},
'1224056991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-sf-talent-feedback").filter(":containsTextNode("+fixed.elmTxt+")") ;
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'1224528599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] textarea[id*=" + dollars[1] + "]")},
'1224556064': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class='link']:contains(" + dollars[0] + ")")},
'1225029251': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='customHeaderModulePickerBtn-menuPopover'] a[href*=" + dollars[0] + "]")},
'1226073526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.titleAttr+"]").closest("div.portletTitleMargin").closest("div[role='region']").find(".pmItemName span").filter(":first");},
'1226299143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".trrIcon").eq(1);},
'1226543444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.bizXMLIA.bizXMenuListItem.globalMenuItem.sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive:contains(" + dollars[0] + ")")},
'1231726591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for=" + fixed._titleText + "]").closest("td");},
'1232531593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnCustomIcon.sapMBtnIcon.sapMBtnIconLeft.sapUiIcon.sapUiIconMirrorInRTL:eq(" + dollars[0] + ")")},
'1239589248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='headerTitle']").filter(":containsTextNode("+fixed.header+")").closest(".sfObjectPageSubSections").find(".sapUiIcon").filter("[data-sap-ui-icon-content="+fixed._iconAttr+"]").closest(".sapExtentUilibFormPatternActionButton");},
'1241133598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.globalMenu").find("a").filter("[title=" + fixed.titleText + "]").parent();},
'1247068493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ectFormFieldFocusMark.noSearchIcon:last")},
'1248284206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest("[data-testid=pmu_component_PageSection]");},
'1248709604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='sapMBtnBase'][class*=" + dollars[0] + "]")},
'1249923944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldlm =  wmjQuery("[class*='SplashHeader_root']").find("[data-testid*='greetingText']");
const Newlm =  wmjQuery("[data-testid='greeting-banner']").find("ui5-title-xweb-homepagex");
return oldlm.length? oldlm:Newlm;},
'1252316562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter("[title="+fixed.sectionHeaderAttr+"]").closest("div.sfObjectPageSection").find("textarea");},
'1258481937': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field",firstShadow).filter("[id*=" + fixed._btnText + "]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery(".goalFormWidget-label", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1260037371': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul a[href*=" + dollars[0] + "]")},
'1262010019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form-dialog")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery("ui5-button-sf-goal-form", firstShadow).filter("[id="+fixed._elemId+"]")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow) : wmjQuery();},
'1262386238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] div>input[id*='box']:visible")},
'1265116823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header").filter("[data-ui5-stable='"+fixed._outerAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".title",firstShadow).filter(":containsTextNode("+fixed.headertxt+")").closest(".container") : wmjQuery();},
'1273627098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul#__list2-listUl").find("[role=option]").find(".sapMSLITitleOnly").filter(":containsTextNode("+fixed.elemTxt+")");},
'1279583564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li a:contains(" + dollars[0] + "):first")},
'1279972929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").find("span[id*='inner']").filter(":containsTextNode("+fixed.lmText+")");},
'1280071865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("ui5-button[data-help-id='"+fixed._tgtId+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1281480858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowKey = wmjQuery('ui5-button-xweb-versatile-writing-assistant[data-testid='+fixed._elemDataTest+']')[0];
const targetShadow = shadowKey && shadowKey.shadowRoot;
return targetShadow ? wmjQuery(targetShadow).find('button') : wmjQuery();},
'1281670751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBtnDisabled[aria-disabled='true']")},
'1283453433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".hoc-side-panel-header-layout-table").find(".icon-column").find("a,span").filter("[id*=_menu]");},
'1283675948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery(".sapUiVlt").find(".sapExtentUilibUtilEditFormGeneratorField").find("a").filter(":containsTextNode("+ fixed.btnText +")").parent();
if (elem.length)
 {return elem} 
return wmjQuery(".sapMPanelContent .sapUiVltCell").find("button.sapExtEntUilibFindWorkSchedule").filter(":containsTextNode("+ fixed.btnText +")")},
'1284412183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pipe").find(".upperText").find("div").filter(":containsTextNode("+fixed.lmText+")");},
'1285977289': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a[href*='/sf/pmreviews']")},
'1287513432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-ec-workflow")[0];
const firstShadow = first && first.shadowRoot;
let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
const elem = wmjQuery(".ui5-tab-strip-itemText", firstShadow).filter(":contains("+targetText+")").closest(".ui5-tab-strip-item");
if (elem.length)
{
  return elem;
}
return wmjQuery();
  
},
'1288929051': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopoverScroll  a:contains(" + dollars[0] + ")")},
'1289470095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListItems").find(".sapMSLITitleOnly").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("li").filter(":mt_visible");},
'1291961291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapExtentUilibUtilEditFormGeneratorTableContainer']:contains(" + dollars[0] + ") tr td:eq(" + dollars[1] + ")")},
'1292268663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'1292393987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='headerButton'] a:contains(" + dollars[0] + ")")},
'1300322502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span button:last")},
'1300656764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='dropDownButtonText']:eq(0)")},
'1302837498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem:contains(" + dollars[0] + "):not(a.globalMenuItem:contains(Reporting Lines))")},
'1304272487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*=" + dollars[0] + "] a[title=" + dollars[1] + "]")},
'1304707026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".buttonBar button").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1306553770': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer.sapMPageFooter button:eq(1)")},
'1306970767': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.bizXSF.sapMBarChild.sapMSF")},
'1307608635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-dynamic-content").filter(":containsTextNode("+fixed.labelText+")").closest("ui5-form-item-xweb-dynamic-content").find("ui5-text-xweb-dynamic-content").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();
},
'1308812826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id$='title-inner']").filter(":containsTextNodeIgnore("+fixed.sectionHeaderText+")").closest(".sapMDialog").find(".sapExtentUilibUtilEditFormGeneratorTableContainer");
},
'1314075372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const key1 =wmjQuery("ui5-title-xweb-people-profile").filter(":containsTextNode("+fixed.labelTxt+")")[0];
const key1Shadow = key1 && key1.shadowRoot;
return key1Shadow ? wmjQuery(key1Shadow).find("span") : wmjQuery();
},
'1314413284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const evnCheck = wmjQuery("xweb-shellbar");
if(evnCheck.length){
	let first = wmjQuery("ui5-li").filter(":containsTextNode("+fixed.lmText+")")[0];
	let firstShadow = first && first.shadowRoot; 
	return wmjQuery("li[role='listitem']", firstShadow);
}
return wmjQuery("#myTeamDialog").find("li").filter(":containsTextNode("+fixed.lmText+")");},
'1318389124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*='inner'][id*='title']").filter(":containsTextNode("+fixed.headerText+")").closest(".sapMPanelHeadingDiv").next(".sapMPanelContent").find(".sapExtentUilibUtilEditFormGeneratorField");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1318868820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[aria-required='true']:first")},
'1319764853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=" + dollars[0] + "] input")},
'1320813830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").filter("[id="+fixed._parentId+"]").find("button").filter(":containsTextNode("+fixed.elemText+")");},
'1322514122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("xweb-shellbar-search-input", getHeaderBarContainer1());
	return wmjQuery("input.ui5-input-inner", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("form#bizXSearchField-F");
}
},
'1324302671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMFlexBox").filter("[data-autoid='"+fixed._tgtLabel+"']").find(".sapMFlexItem").find("h3");
},
'1324410996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").filter("[data-help-id="+fixed._dialogAttr+"]").find(".sapMTitle").find("[id*=inner]").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'1326054394': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNode("+fixed.lbltxt+")").closest("[data-testid='action-list']");},
'1326480523': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formSectionBody textarea:last")},
'1332605344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-people-profile");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-popup-header-text").filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'1332780012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formSectionBody").find(".actionsSelectionHelp").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1333358802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.tgtDirectText+")");},
'1334068502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("#shellbar",  wmjQuery("xweb-shellbar")[0].shadowRoot);
  return wmjQuery(".ui5-shellbar-search-button", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("div.bizXSFB");
}
},
'1334354294': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[aria-label="+fixed.siblingAriaLabelAttr+"]").siblings(".sapMCbBg");},
'1334522849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button-sf-header[icon='sys-enter'],ui5-button[icon='sys-enter']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button[title*='To Do 項目が']");
}
},
'1335204416': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-button-xweb-mini-app-dialog").filter(":containsTextNode("+fixed.elemTxt+")")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'1339944633': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let one = wmjQuery("xweb-shellbar-search-input", getHeaderBarContainer1())[0].shadowRoot;
	return wmjQuery("div.ui5-input-content",one)
}else{
	return wmjQuery(".globalHeaderBar").find("form#bizXSearchField-F");
}
},
'1340030406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
const selectedUI = oldUI ? oldUI : newUI;
const shadowElem = selectedUI ? selectedUI.shadowRoot : null;
return shadowElem ? wmjQuery("li[role=listitem],a[role=link]", shadowElem) : wmjQuery();},
'1340925349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink.last.globalMenuItem:contains(" + dollars[0] + ")")},
'1341103528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody[id*='-tblBody']:last td[class~=" + dollars[0] + "]:first")},
'1343453433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-panel-xweb-team-goal ui5-multi-input-xweb-people-search")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("ui5-tokenizer-xweb-people-search",firstShadow).closest(".ui5-input-root");},
'1344533524': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea[id*=" + dollars[0] + "]:last")},
'1346407701': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table[name='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".columnContainer",secondShadow).filter(":containsTextNode("+fixed.tgtElemText+")").find("span") : wmjQuery();},
'1351182776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardTitle").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'1354302871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("xweb-goal-form-number-field", secondShadow).filter("[name="+fixed.elemIndx+"]")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery("ui5-input-sf-goal-form", thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;
const elem = wmjQuery(".ui5-input-inner", fourthShadow).filter(":first");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1354658158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-breadcrumbs-xweb-goalmanagementx").filter("[data-help-id='"+fixed._outerAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("ol",firstShadow) : wmjQuery();},
'1357231404': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.labelTxt+")").closest("td").next("td");},
'1357720269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog ui5-icon").filter("[data-testid="+fixed._elemIndx+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery("svg.ui5-icon-root", firstShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1360257651': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const one = wmjQuery("ui5-button-xweb-global-header[data-help-id='bizxHeaderModulePicker']")[0];
const oneShadow = one && one.shadowRoot;
return oneShadow ? wmjQuery(oneShadow).find("button") : wmjQuery();},
'1362820296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sectionContent").find("[type='Button']").filter("[data-testid="+fixed._datatestid+"]");},
'1363728986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[id*=pageTitle]");},
'1364946899': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiRespGrid:visible:eq(" + dollars[0] + ") div.sapMComboBox:eq(" + dollars[1] + ")")},
'1365533058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUi = wmjQuery("[class*=MyTeamDialog_actionItem]").filter(":containsTextNode("+fixed.elemTxt+")").closest("ui5-li")[0];
const newUi = wmjQuery("[class*=MyTeamDialog_listItem]").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
const newUi2 = wmjQuery("[class*=MyTeamDialog_listContainer]").find("ui5-link").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (oldUi) {
  const targetShadow = oldUi && oldUi.shadowRoot;
  return targetShadow && wmjQuery(targetShadow).find(".ui5-li-root");
} else if (newUi) {
  const targetShadow = newUi && newUi.shadowRoot;
  return targetShadow && wmjQuery(targetShadow).find(".ui5-link-root");
}
else if (newUi2) {
  const targetShadow = newUi2 && newUi2.shadowRoot;
  return targetShadow && wmjQuery(targetShadow).find(".ui5-link-root");
}
return wmjQuery();},
'1366372389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[placeholder*=\"MMM\"]:mt_visible")},
'1366908902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=ApprovalCard]").find("[data-testid*=contentTitle]").filter(":containsTextNodeIgnore("+fixed.cardHdrTxt+")").closest("[data-testid=cardWrapper]").find("[id*=viewAll]");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'1368204433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-user-settings-dialog-xweb-global-header")[0];
let firstShadow = first && first.shadowRoot;
let second = wmjQuery(firstShadow).find("ui5-li-xweb-global-header").filter(":containsTextNode("+fixed.tgtElemText+")")[0];
let secondShadow = second && second.shadowRoot;
let elem = wmjQuery(secondShadow).find("li");
return elem.length ? elem : wmjQuery();},
'1368456048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")");},
'1371540290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first=  wmjQuery("ui5-title-ilx").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("[id*=inner]");
return elem.length ? elem : wmjQuery() ;},
'1372214763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.MDFViewPanelToolbarContainer a[id*='link']:contains(" + dollars[0] + ")")},
'1374149336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("[id^='__dialog'][id$='-title-inner']").filter(":containsTextNodeIgnore("+ fixed.dialogHeaderDirectText +")").closest("[id^='__dialog'][id$='-header-BarPH']");},
'1375211715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1375743707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("span.revolutionTSInfoLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfo,.revolutionTSInfoSection").parent().next().find("span.revolutionTSDatePickerWrapper");
if (elem.length)
 {return elem;} 
return wmjQuery("span.revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("span.revolutionTSDatePickerWrapper");

},
'1378674589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-button[icon=arrow-down]",
	{selector:"button.ui5-button-root" ,isShadowChild:true })},
'1378749113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog label").filter(":containsTextNodeIgnore("+ fixed.btnText +"):eq(0)");},
'1380936074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='"+fixed._headerDataStable+"']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-sidepanel[data-ui5-stable='"+fixed._sidepanelDataStable+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-button-sf-header.end-button",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return wmjQuery("button",thirdShadow);},
'1382335111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header[class~=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1382474604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id*='timeOffLink']").find(".sapMLnkText");},
'1383390521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle").find(":header").filter("[title="+ fixed.btnText +"]").closest(".pmPortletContainer");},
'1386910634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):not(:contains( )):mt_visible")},
'1390945307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBaseContentWrapper.sapMInputBaseHasEndIcons:eq(2)")},
'1397837779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('bdi:contains(' + fixed.columnTxt + ')').parents('[class*="Field"]').find('input')},
'1399265765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id$='" + fixed.id + "']")},
'1401909878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-button-xweb-people-profile").filter("[data-testid="+fixed._datatestid+"]");},
'1402099645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-people-profile").filter("[id='"+fixed._btnId+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button").filter("[title="+fixed.elmTxt+"]") : wmjQuery();},
'1403029202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find(".ui5-popup-header-text").filter(":containsTextNode("+fixed.headertext+")")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find(".ui5-title-root").find("span");
}
return wmjQuery();},
'1406047405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='toolbar']").find(".sapMTitle").filter(":containsTextNode("+fixed.lmHeaderTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find("bdi").filter(":containsTextNode("+fixed.lmText+")").closest(".sapMColumnHeader");},
'1414350220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-person-input-sf-talent-feedback#personInput")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-person-input-support-sf-talent-feedback#input",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".ui5-input-icon-root",secondShadow): wmjQuery();},
'1416171353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".form_field").find(".field_value").find(".sap-icon").closest("button").closest("div");},
'1417816980': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.elemText+")");},
'1418254578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle :header").filter("[title="+ fixed.btnText +"]").closest(".pmPortletContainer");},
'1418374387': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form",
    { selector: ".goalFormWidget-field[id='"+fixed._goalFormWidgetID+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow ? wmjQuery(targetShadow).find(".goalFormWidget-label") : wmjQuery();
} else {
    return wmjQuery();
}},
'1419685804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.toolbarButtonWithLabel:has(.icon_save)")},
'1429327733': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const zu = wmjQuery("ui5-toolbar-button-xweb-performance-management").filter("[id*="+fixed._parentId+"]")[0];
const zuShadow = zu && zu.shadowRoot;
const first = wmjQuery(zuShadow).find("ui5-button-xweb-performance-management").filter("[id='"+fixed._lmId+"']")[0];
const firstShadow = first && first.shadowRoot;
if( firstShadow){ 
  return wmjQuery(firstShadow).find("[role=button]");
}

return wmjQuery();
},
'1431474300': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("p").filter(":containsTextNode("+fixed.fieldText+")").find("a").filter(":containsTextNode("+fixed.valText+")");},
'1431711684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstElem = wmjQuery("xweb-avatar-list-item")[0];
const firstShadow = firstElem && firstElem.shadowRoot;
return firstShadow && wmjQuery("ui5-icon", firstShadow);},
'1434213912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-xweb-goal-learnings")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".ui5-menu-item").filter(":containsTextNode("+fixed.linkText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".ui5-li-title",secondShadow): wmjQuery();},
'1434643099': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class='globalRoundedCornersXSmall globalPrimaryButton']:last")},
'1435674799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.titleText+")").closest(".sapMPanel").find(".sapMInputBase").closest(".sapUiVltCell")},
'1436463506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has(span.dropDownButtonText)")},
'1436588914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenu").find("li").filter(":containsTextNodeIgnore("+fixed.lmtext+")");},
'1436890557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._inputData+"]").closest(".sapMPanel").find("[id^=__title][id$=inner]");},
'1442273436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer[class='sapMPageFooter'] button[title=" + dollars[0] + "]")},
'1450204419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td input[type='text']:eq(" + dollars[0] + ")")},
'1451142321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("th").closest(".sapMList").find("td").eq(fixed.thIndex).find(".sapUiIcon");},
'1454068186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-label-sf-goal-form",firstShadow).filter(":containsTextNode("+fixed.labelText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow && wmjQuery(".ui5-label-required-colon",secondShadow);},
'1454255606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class='globalRoundedCornersXSmall globalPrimaryButton']:first")},
'1454416601': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("[data-help-id='goal-iconTabBar'],.sf_goal_comp-GoalIconTabBar")[0];
const containerElemShadow = containerElem ? containerElem.shadowRoot : null;
return containerElemShadow ? wmjQuery(".tab-description",containerElemShadow).filter(":containsTextNode("+fixed.tabDirectText+")").closest(".goal-tab-wrapper") : wmjQuery();},
'1455406591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name='"+fixed._lmname+"']");},
'1455558680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink.globalMenuItem:contains(" + dollars[0] + ")")},
'1457560751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMListItems").find(".sapMLIB .sapMSLITitleOnly").filter(":containsTextNodeIgnore("+fixed.lmText+")").filter(":mt_visible");
},
'1457731271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section.sapMPageEnableScrolling").find("button").filter(":containsTextNode("+ fixed.btnText +")").filter(":mt_visible")},
'1457782837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-tabcontainer.sf_goal_comp-GoalIconTabBar",
	{selector:"div.tab-description" ,isShadowChild:true }).filter(":containsTextNode("+fixed.btnText+")").prev(".tab-status-circle")



},
'1458970981': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("span.text").filter(":containsTextNode("+fixed.labelDirectText+")").closest("tr.form_field").find("[id*='arrowIcon_']");},
'1459435427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+ fixed.elemTitle +")")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(".ui5-title-root span", firstShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1459583449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#tgm-action-bar").find("a.globalPlacematAction").filter(":containsTextNode("+fixed.elemTxt+")");},
'1459640629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.field_label:contains(" + dollars[0] + ")")},
'1459856651': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] button[class~=" + dollars[1] + "]")},
'1464973435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._cardId+"']").find("[class*=CardWrapper_headerText]");},
'1466428850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link").filter(":containsTextNodeIgnore("+fixed.btnText+")");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-link-text") : wmjQuery();},
'1468546884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("bdi").filter(":first");},
'1469392164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + "):visible")},
'1474205320': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=title][id*=inner]").filter(":containsTextNode("+fixed.sectionText+")").closest(".sapExtentUilibFormPatternFadeIn, .sapExtentUilibFormPatternSubsequentBlock").find(".sapMText").filter(":containsTextNode("+fixed.lmText+")");},
'1475050384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='card-header-title']").filter(":containsTextNode("+fixed.headerText+")").closest("div[id*=cardContent]");},
'1475585580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".test")},
'1476503406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("li");},
'1476827935': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(09)")},
'1477432429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = ftHelper.unQuote(wmjQuery().identity(fixed.elemText));

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+")", isShadowChild:false},
	{selector:"li", isShadowChild:true});
}else{
	return wmjQuery("#customHeaderModulePickerBtn-menuPopover-scroll").find("a.globalMenuItem:textEquals("+text+")");
}},
'1479017067': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" -")[0] : null;

return wmjQuery("[id*=title-inner]").filter(":contains("+targetText+")");

},
'1479468220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogTitle").filter(":contains(" + fixed.headerText + ")").next().find(".sapExtentUilibUtilEditFormGeneratorTableContainer:first").find(".sapMTitle:first span");
},
'1481765374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfDropMenu a.tgm-menuitem:eq(" + dollars[0] + ")")},
'1484300177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-people-profile").filter(":containsTextNode("+fixed.labelTxt+")").closest("ui5-form-item-xweb-people-profile");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-form-item-label") : wmjQuery();},
'1484987118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id='"+fixed._dataHelpId+"']").parent();},
'1488994161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-button-xweb-versatile-writing-assistant").filter("[data-testid="+fixed._elmAttr+"]");},
'1490025145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartStepsContainer").find(".sfStepsChartStep").filter(":containsTextNode("+ fixed.btnText +")").closest("li")},
'1492849967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find("button").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1494648303': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.sectionHeader+")").closest("[role='region']").find(".sapExtentUilibFormPatternBlockTitle");},
'1494724713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapMInputBaseInner:eq(0)")},
'1496877639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='sectitle']").filter(":containsTextNodeIgnore("+fixed.globalSectTitle+")").closest(".pmPortletContainer").find("[id^='sectTitle']").filter(":containsTextNodeIgnore("+fixed.sectTitleText+")").closest(".pm2SectionOverallComment").find(".nrte_content_webkit");},
'1500312227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-select-sf-talent-activity").filter("[data-help-id="+fixed._elemIndx+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery("ui5-icon-sf-talent-activity", firstShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'1500651171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCorners").find(".globalHighlightText").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".workBenchPipeElem");},
'1501329713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1501560494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("ui5-dialog").filter("[accessible-name='"+fixed._dialogHeaderAccessibleNameAttr+"']");
return shadowElem.length ? wmjQuery("#ui5-popup-header",shadowElem[0].shadowRoot) : wmjQuery();},
'1506945244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.LabelText+")").closest(".field_label").parent(".form_field").find(".formElement");},
'1509935635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "]:last")},
'1510077300': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1512471716': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-switch-xweb-company-settings").filter("[id='"+fixed._elemAttr+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-switch-root[aria-checked=true]") : wmjQuery();},
'1513956544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.pmIconTextLink.rightLink:contains(" + dollars[0] + "):first")},
'1520232046': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-mini-app-dialog").filter(":containsTextNode("+fixed.headerText+")");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root") : wmjQuery();},
'1525548187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").find("[slot='label']").filter("[name='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();},
'1525764877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("[class*='CardWrapper_cardActions']").find("ui5-button-xweb-homepagex")[0];
let firstShadow = first && first.shadowRoot ;
let elem = wmjQuery(firstShadow).find("button").filter("[title="+fixed.btnAttr+"]");
return elem.length ? elem : wmjQuery();

},
'1529676344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const regexp = new RegExp("\u00AD","g");
const tds = wmjQuery("div[id$='gridContent']:contains(" + fixed.title + ")").parent().find('table:first').find('td.sapExtentUilibFormPatternBlockName')
let txt = wmjQuery().identity(fixed.tgtText).replace(regexp, '');
if(txt[0] === txt[txt.length -1] && txt[0] === "'"){
 txt = txt.slice(1,-1);
}
for(let i = 0; i < tds.length; i++) {
 if (tds[i].textContent.replace(regexp, '') === txt){
 return wmjQuery(tds[i]).find("span");
 }
}
return wmjQuery();},
'1530135883': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id*='Province']:visible")},
'1530519248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'1530549878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.labelTitle+"]").closest(".sapUiVlt").find("button");},
'1532093817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:contains(" + dollars[0] + ")")},
'1533300332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[data-help-id="+fixed._lmAttr+"]");},
'1534298340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.headertext+")").parent("div").parent("span");},
'1536631661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.lmTitle+"]").find("bdi");},
'1539080002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th:contains(" + dollars[0] + "):first")},
'1539193842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.titleDirectText+")").siblings(".globalCardLink").filter(":containsTextNode("+fixed.tgtDirectText+")");
return shadowElem.length === 1 ? wmjQuery(".ui5-link-root",shadowElem[0].shadowRoot) : wmjQuery();},
'1539662429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:eq(" + dollars[0] + ")")},
'1539871663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='sectitle']").filter(":containsTextNodeIgnore("+fixed.globalSectTitle+")").closest(".pmPortletContainer").find("a").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")");},
'1542319671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid='"+fixed._datatestid+"']").find("ui5-label-xweb-versatile-writing-assistant");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'1542898962': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabButton.selected").filter(":contains("+fixed.selectedTab+")").closest(".tab_panel").find(".outerScroll");},
'1544818084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id^='footer_buttons']").find("span.sfDialogBoxButtonWrapper").find("button").filter(":containsTextNode("+ fixed.btnText +")")},
'1547770579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell:contains(" + dollars[0] + ")+.sapUiVltCell")},
'1551010615': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiRespGrid:visible:eq(" + dollars[0] + ") div.sapMComboBox:eq(1)")},
'1551349447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("input");},
'1552833264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-side-navigation-sub-item-xweb-form-inbox[tooltip='En Route']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-sn-item") : wmjQuery();},
'1553858901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase.sapUxAPAnchorBarButton:contains(" + dollars[0] + ")")},
'1556801117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("[data-help-id='"+fixed._datahelpid+"']").find(".sapMInputBaseContentWrapper").find(".sapUiIconPointer");},
'1556827747': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery(".sapUxAPObjectPageHeaderIdentifierActions").find("span.sapUiIcon").filter("[data-sap-ui-icon-content=" + fixed.btnText + "]").closest("button").filter(":mt_visible");
if (elem.length)
 {return elem;} 
return wmjQuery("#placematIconsStart").find(".icon_eye");},
'1559461040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile-admin").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("h1").find("span");
return elem.length ? elem : wmjQuery();},
'1567465931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMWizardStepTitle").filter(":containsTextNode("+fixed.headerText+")").closest(".sapMWizardStep").find(".sapMListItems");},
'1567990974': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='submit'][value=" + dollars[0] + "]")},
'1568088922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id*="+fixed._inputId+"]").closest("[class*=sapUiRespGridSpan]").prev(".sapUiFormElementLbl").find("bdi");},
'1569261203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectitle']").filter(":containsTextNodeIgnore("+fixed.sectTitleText+")").closest(".pmPortletContainer").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("textarea");},
'1570350965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1573701944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sfDropMenu menuDefault'] a[onclick*=" + dollars[0] + "]")},
'1574488475': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form").filter("[id="+fixed._formId+"]").find("div").filter("[id="+fixed._lmId+"]");},
'1579296165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[type=" + dollars[0] + "]:first")},
'1579421227': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+ fixed.btnText +")").closest("th").next().find("input").filter(":mt_visible");},
'1583464792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("ui5-button[data-help-id='"+fixed._tgtId+"']");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1588012611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.text").filter(":containsTextNode("+fixed.LabelText+")").closest("td").next(".field_value").find(".ectTextAreaWrapperOldValueContainer");},
'1591642653': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[onclick*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1592187780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']:contains(" + fixed.headerTxt + ") button:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'1592929719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id*=" + dollars[0] + "]:eq(0)")},
'1594218363': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.lmtext+")").closest(".flow_field").find("ui5-date-picker-xweb-calendar-widget");},
'1599861634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiRespGridBreak:contains(" + dollars[0] + ") .sapUiVltCell.sapuiVltCell:contains(" + dollars[1] + ")")},
'1600288834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("button").filter("[title="+fixed.lmTitle+"]");},
'1602819161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id*=" + dollars[0] + "][class*=" + dollars[1] + "]")},
'1603482855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-panel-xweb-goalmanagementx").filter("[header-text='"+fixed._headertext+"']").find("[class*='GoalBaseCard_CardContent']");},
'1604153237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldEnv = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']")
if (oldEnv.length){
	const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']")[0];
	const firstShadow = first && first.shadowRoot;
	const second = wmjQuery("xweb-sidepanel[data-ui5-stable='todopanel-panel']",firstShadow)[0];
	const secondShadow = second && second.shadowRoot;
	const third = wmjQuery("ui5-button-sf-header.end-button",secondShadow)[0];
	const thirdShadow = third && third.shadowRoot;
	return thirdShadow ? wmjQuery(thirdShadow).find("button") : wmjQuery();
}
const newEnv = wmjQuery("xweb-shellbar.sfEnsureSAPTheme")
if(newEnv.length){
	const firstShadow = newEnv.length && newEnv[0].shadowRoot;
	const second = wmjQuery(firstShadow).find("xweb-todo-list#todoPanel");
	const secondShadow = second.length && second[0].shadowRoot;
	const third = wmjQuery(secondShadow).find("xweb-sidepanel[data-ui5-stable='todopanel-panel']")
	const thirdShadow = third.length && third[0].shadowRoot;
	return thirdShadow ? wmjQuery(thirdShadow).find("ui5-button-sf-header.end-button") :  wmjQuery();
} 
return wmjQuery()},
'1606213008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-manifest-toolkit, ui5-title-xweb-people-profile").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first ? first.shadowRoot : first;
const elem = wmjQuery(firstShadow).find("span[id*='inner']");
return elem.length ? elem :wmjQuery();},
'1610280432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	return wmjQuery("[role='banner']", two);
}else{
	return wmjQuery(".globalNavigationContainer");
}
},
'1612590505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog'] .field_label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".ectFormFieldBorder");},
'1615577309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.field_label:contains(" + dollars[0] + ") ~ td span[id*='fieldborder']")},
'1615612681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".listItem").find("label").filter("[id="+fixed._lblId+"]");},
'1616809915': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSInfoLabel").filter(":containsTextNode("+fixed.labelText+")");},
'1617146906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMessageBoxError header .sapMIBar");},
'1617538765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='hd'] input[value=" + dollars[0] + "]")},
'1620476932': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-dialog__footer").find("button").filter("[title="+fixed.title+"]").closest(".buttonWrapper");},
'1620973378': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]:mt_visible")},
'1623753498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('[role="dialog"]').filter(':contains(' + fixed.dialogTitle + ')').find('.panelContent')},
'1624526112': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.fd-list__title").filter(":containsTextNode("+fixed.labelName+")").closest("li").find(".fd-checkbox__checkmark");},
'1625543238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'1627939844': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id=" + dollars[0] + "]:last")},
'1629424253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;

if (firstShadow)
{
  return wmjQuery(firstShadow).find("span");
}
return wmjQuery();},
'1632677851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-cb-item[text*='no match']")[1];
const firstShadow = first && first.shadowRoot;

let elem1 =  firstShadow ? wmjQuery(firstShadow).find(".ui5-li-content") : wmjQuery();

if (elem1.length) {
 	return elem1; 
}

const second = wmjQuery("ui5-cb-item[text*='Geen match, ga ik afwijzen']")[1];
const secondShadow = second && second.shadowRoot;

let elem2 =  secondShadow ? wmjQuery(secondShadow).find(".ui5-li-content") : wmjQuery();

if (elem2.length) {
 return elem2;
}

return wmjQuery();},
'1633571119': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.lmTitle+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBaseContentWrapper");},
'1634875683': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCorners.globalPortletBodyBackground:contains(" + dollars[0] + ")")},
'1636102728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[title="+fixed.elemTxt+"]").closest(".sapUiVlt").parent();},
'1636161751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.lmText+")") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'1636339463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter("[data-help-id='"+fixed._elemAttr+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-root") : wmjQuery();},
'1637110485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle a").filter("[title="+fixed.headerAttr+"]").closest("div[role='region']").find(".pmItemWeight").closest("p").filter(":first");},
'1637246567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=applicationBodyHeader]").find(".paneBodyTitle").filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'1642104104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id="+fixed._elemId+"]");},
'1644368249': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetElem = wmjQuery(".hoc-side-panel-section-content").find("[onclick*=showPosition]");
const targetElemTagName = targetElem.prop("tagName");
if (targetElemTagName === "A") {
 return targetElem;
} else if (targetElemTagName === "BUTTON") {
 return targetElem;
}
return wmjQuery();},
'1644903375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class^='CapabilityTree_containerList']").find("ui5-custom-tree[data-testid='capabilityPickerCustomTree']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-custom-li-tree",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-checkbox",secondShadow)[0];
const thirdShadow = third &&third.shadowRoot;
return wmjQuery("input[type=checkbox]",thirdShadow).parent();},
'1645170821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find(".sapMInputBase").filter("[data-help-id='"+fixed._tgtDataHelpIdAttr+"']");},
'1647966355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] span button")},
'1648000902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("xweb-goal-form",
	{selector:"div.label" ,isShadowChild:true }).filter(":containsTextNode("+fixed.btnText+")")
},
'1648662911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='sapExtentUilibFormPatternBlockTitle']:contains(" + dollars[0] + ")")},
'1649913475': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar.sfEnsureSAPTheme")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-tabcontainer-sf-header",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery(".subTabLink",secondShadow).filter(":contains("+fixed.lmText+")").closest(".subTabLink");},
'1654234674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^='HomepageSection_subsectionTitle']").filter(":containsTextNode("+fixed.sectionTitle+")").closest("[class^='HomepageSection_sectionWrapper']");},
'1654624854': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id*=" + dollars[0] + "]:last")},
'1656320349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall:last")},
'1657151030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class~=" + dollars[0] + "]:eq(0)")},
'1658401851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.hdrtxt+")").closest(".sapUxAPBlockBase");},
'1662091048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input")},
'1663174945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*='cell tableHeaderLabel']:eq(" + dollars[0] + ")")},
'1665502265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + "):visible")},
'1667092664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bizXSF.sapMBarChild.sapMSF[title=" + dollars[0] + "]:visible")},
'1668972783': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header[class*='dialogHeaderText']").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("div[slot='header']");},
'1673404645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter:contains(" + dollars[0] + ") button:last")},
'1674990912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPopoverCont:visible li[class*='sapMLIBTypeActive']:eq(2)")},
'1680516884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class^='sapMInputBaseInner']:eq(" + dollars[0] + ")")},
'1683650875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sfDropDownContainer:eq(1)")},
'1684202265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header.sapMDialogTitle").find("span").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("h2");},
'1684620772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id=" + fixed._helpText + "]").find("input");},
'1685800604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[id="+fixed._thId+"]").find("span").filter("[id="+fixed._lmId+"]");},
'1686336752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-textarea-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find("textarea") : wmjQuery();},
'1687168717': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("span,label").filter("[title=" + fixed.titleText + "]").find("bdi")},
'1687686617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.formFieldLabel label").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'1687817044': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[name=" + dollars[0] + "] [value=" + dollars[1] + "]")},
'1689051421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bizXSF.sapMBarChild.sapMSF")},
'1689466611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody .form_field").find("span.text").filter(":containsTextNodeIgnore(" + fixed.titleText + ")")},
'1691245771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton")},
'1692434295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._parentAttr+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[id="+fixed._parentId+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".goalFormWidget-formItem").find("ui5-select-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-root") : wmjQuery();
},
'1693282688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalSecondaryButton.buttonDefault:eq(1)")},
'1694014831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id='"+fixed._dataHelpId+"']").closest(".sapExtentUilibUtilEditFormGeneratorField").find("bdi");},
'1694443522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*='peopleprofile/pages']:visible")},
'1694938825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'1698811061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has(span[class*=" + dollars[0] + "]):visible")},
'1700494792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:eq(0)")},
'1703135385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMLabelTextWrapper bdi").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1703378061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[class*=" + dollars[1] + "]")},
'1703878458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button[icon='feedback']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button#bizXShellFeedbackButton");
}
},
'1704119304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").parent().next().find(".sapUiIcon");},
'1704276242': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item[data-testid='"+fixed._datatestid+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-root") : wmjQuery();},
'1707006824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'1708318167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").find(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find(".sapMListTblCellNoData");},
'1711460668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] TABLE TBODY SPAN:contains(" + dollars[1] + ")")},
'1714420294': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalPlacematAction:eq(" + dollars[0] + ")")},
'1715729029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-panel-xweb-team-goal ui5-multi-input-xweb-people-search")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("ui5-tokenizer-xweb-people-search",firstShadow).closest(".ui5-input-root");},
'1715878989': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.headerTxt+")").closest("[class*=StandardCard_body]");},
'1716385463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":contains("+fixed.sectionTitleText+")").closest(".sapMPanel").find(".sapMBtnBase");},
'1719008952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] textarea[id=" + dollars[1] + "]")},
'1720540568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] a")},
'1722309253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadow = wmjQuery(".sfEnsureSAPTheme[data-ui5-stable='sf-header-shellbar']")[0];
const firstShadowRoot = firstShadow && firstShadow.shadowRoot;
const secondShadow = wmjQuery("ui5-tabcontainer-sf-header[data-ui5-stable='subnav']",firstShadowRoot)[0];
const secondShadowRoot = secondShadow && secondShadow.shadowRoot;
return wmjQuery("a.subTabLink",secondShadowRoot).filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'1724356066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link[role='heading']").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("[class*='MiniCard_root']");},
'1725792451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'1727117695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-button-xweb-people-profile").filter("[data-testid="+fixed._lmAttr+"]")[0];
let firstShadow = first ? first.shadowRoot : null;
let elem = firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();
if (!elem.length)
{
  elem = wmjQuery("ui5-button-xweb-people-profile").filter("[data-testid='previewQuickActions']");
}
return elem.length ? elem : wmjQuery(); },
'1730649813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button-sf-header[icon*='bell'],ui5-button[icon*='bell']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button#current-user-notification-count");
}
},
'1732583787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-avatar-xweb-performance-management").filter("[initials="+fixed._lmText+"]").closest("[class*=AvatarHeader_AvatarHeaderContainer]").find("[class*=AvatarHeader_AvatarHeaderContent]");},
'1733000002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery ("div:contains(" + fixed.headerTxt + ") table[class^=" + dollars[0] + "]:eq(" + dollars[1] + ") span:eq(" + dollars[2] + ")")},
'1733110188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table[id='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".columnContainer",secondShadow).filter(":containsTextNode("+fixed.tgtElemText+")").find(".goalFormWidget-inputTable-columnLabelRequired") : wmjQuery();},
'1734222198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.lmTitle+"]").closest(":header").find("span");},
'1734848948': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id='editDialog_YOU_MAY_CHANGE']").find("label").filter("[title="+fixed.btnTitleAttr+"]").find("bdi").filter(":mt_visible");},
'1738978420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog-sf-talent-activity, ui5-dialog").filter(":containsTextNode("+ fixed.headerText +")").find("ui5-button-sf-talent-activity, ui5-button").filter("[data-testid=" + fixed._btnText + "]");},
'1740465425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-form-inbox").filter(":containsTextNode("+fixed.lblText+")").closest("div").next("ui5-input-xweb-form-inbox")[0];
const firstShadow = first ?  first.shadowRoot : null;
const elem = wmjQuery(firstShadow).find("input");
return elem.length ? elem : wmjQuery(); },
'1741643055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "Go To") {
  const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNodeIgnore(Links)")[0];
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'1744639188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#tablist tr:eq(3)")},
'1747221761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockName").children("span").filter(":containsTextNode("+fixed.elemText+")").first();},
'1747744582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.bizXMenuListItem:contains(" + dollars[0] + ")")},
'1748000785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmuToolbar").filter("[data-help-id="+fixed._parentAttr+"]").find("span").filter("[role="+fixed._lmRole+"]");},
'1748075376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'xweb-goal-form',
    { selector: "xweb-goal-form-number-field[accessible-name='"+fixed._containerElemId+"']", isShadowChild: true },
    { selector: "ui5-input-sf-goal-form[accessible-name='"+fixed._elemId+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".ui5-input-icon-root", targetShadow);
} else {
    return wmjQuery();
}},
'1750553670': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-message-box__content").find(".guidelineMsgContainer").find("td.vrpWarningHardIcon").next("td");},
'1752971853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton.tgm-v12-wizard-btn.globalHumanistText:contains(" + dollars[0] + ")")},
'1753880747': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":directContains("+fixed.labelTxt+")").closest("li").find("input[type='checkbox']");},
'1755522879': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar']").filter(":containsTextNode("+ fixed.headerText +")").closest("div[role='form']").find("button").filter(":containsTextNode("+ fixed.btnText +")").filter(":mt_visible")},
'1761420015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMComboBox:eq(1)")},
'1762464978': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartSelected").find(".sfStepsChartStepName").filter(":contains("+fixed.activePageTab+")").closest(".form").find(".sfObjectPageSectionTitle").filter(":contains("+fixed.lmHeaderTxt+")").closest(".sfObjectPageSection").find(".nrte_content_webkit").filter(":first");},
'1762578507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalPlacematLink.pmIconTextLink.rightLink:eq(" + dollars[0] + ")")},
'1768427413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='DynamicPageTitle-toolbar']").find("ui5-button-xweb-goalmanagementx").filter("[data-help-id=" + fixed._titleText + "]");},
'1772841998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a span span:contains('Create New Rating Scale')")},
'1774542668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button,.ui5-shellbar-title", one);
}else{
	return wmjQuery("div.globalHeaderBar #bizXShellCustomHeader-BarLeft").find(".sapMBtnContent");
}
},
'1777164375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-illustrated-message-xweb-opportunity-set").find("ui5-button-xweb-opportunity-set")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("button");

return elem.length ? elem : wmjQuery();},
'1779364135': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartStepName").filter(":containsTextNode("+fixed.stepNameDirectText+")").closest(".sfStepsChartStepItem");},
'1782794625': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:contains(3)")},
'1783567713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:eq(0)")},
'1783664165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("ui5-li-xweb-people-profile[data-testid=" + fixed._elemText + "]")[0].shadowRoot;
return firstShadow && wmjQuery("li",firstShadow);},
'1785163391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter("[id$="+fixed._headerPartialId+"]").find("svg");},
'1786011232': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "Go To") {
  const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNodeIgnore(Links)")[0];
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'1787590679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + ") ~ button")},
'1791529326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("span").filter("[title=" + fixed.titleText + "]").find("bdi")},
'1792318340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapUiRespGridSpanXL8");},
'1792469953': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1795765909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title").filter(":containsTextNodeIgnore("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-title-root span",firstShadow) : wmjQuery();},
'1797989581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalSecondaryButton.buttonDefault:eq(" + dollars[0] + ")")},
'1798106218': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#divDataGrid").filter("[data-help-id="+fixed._headerAttr+"]").find("th.tableHeaderLabel").filter(":contains("+fixed.lmText+")");},
'1803468309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function unBracket(str){
	return ftHelper.unQuote(str).split("(")[0].replace(/\u200e/g,'').trim();
}
let text = wmjQuery().identity(fixed.elemText);
text = unBracket(text);
return wmjQuery(".sapMSplitContainerMasterVisible").find(".sapUiSelectable.sapMBarChild span[id$='title-inner']").filter(":contains("+text+")")
},
'1806725131': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:`.container` ,isShadowChild:true });
} else {
    return wmjQuery("#globalNotificationPanel").find(".sapMScrollCont");
}
},
'1806800678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "]:contains(" + dollars[1] + "):last")},
'1807997022': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._FormData+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field[id='"+fixed._parentId+"']") : wmjQuery();},
'1808133570': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMListItems").find(".sapMSLITitleOnly").filter(":containsTextNode("+ fixed.btnText +")").filter(":mt_visible")},
'1808876502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + ")~td")},
'1809539037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").filter(":mt_visible");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'1812559599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("ui5-tabcontainer-sf-header")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("a").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();


},
'1814831325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-help-id=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1816283189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter("[data-help-id="+fixed._parentAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[part='title']") : wmjQuery();},
'1817571151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] select[name='foldername']")},
'1819849523': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link-ilx").filter("[data-testid="+fixed._lmAttr+"]").find("span");},
'1819919230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel ").filter(":containsTextNode("+fixed.labeltext+")").closest("[class*='EditFormGeneratorField']").find(".sapMInputBase");},
'1819992498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goalmanagementx").filter(":mt_visible")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("ui5-title-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmText+")")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find("h1").find("span");

return elem.length ? elem : wmjQuery();
},
'1823473930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-icon-xweb-performance-management").filter("[name="+fixed._parentName+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("svg") : wmjQuery();

},
'1823859514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMColumnHeader").find(".sapMLabel").filter(":containsTextNodeIgnore("+fixed.bdiText+")");},
'1824033177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".text").filter(":containsTextNode("+fixed.labelText+")").closest(".form_field").find(".readonly");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1824176887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th:contains(" + dollars[0] + ")+td select")},
'1824601203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='BarRight'] button:last")},
'1824815419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let contentTitle = wmjQuery().identity(fixed.contentTitle);
let cardWrapper = wmjQuery("[class^='CardTitle_headerText']:contains(" + fixed.cardTitle + ")").closest("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	return wmjQuery("[id$='contentTitle']:contains(" + contentTitle + ")").closest(cardWrapper).find("[data-component-name='" + fixed._dataComp + "']").find(fixed._tag);
} 
return wmjQuery();},
'1824950762': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-label").filter(":containsTextNode("+fixed.lbltxt+")").closest("[data-testid='LabelValuePair']");},
'1826518604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".form_field").find(".sap-icon--slim-arrow-down").closest("span");},
'1827304614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li[data-testid="+fixed._elemDataId+"]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("a");
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldUI.length) {
  return oldUI;
} else if (newUI.length) {
  return newUI;
} else {
  return wmjQuery();
}},
'1827489383': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#formListHeaderRow th:eq(" + dollars[0] + ")")},
'1828526914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("TR[id=\"formListHeaderRow\"] TH:contains(" + dollars[0] + ")")},
'1828673372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.globalMenuItem:first")},
'1828810531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=CardWrapper_headerText]").filter(":containsTextNode("+fixed.lmText+")");},
'1829897624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(".sapMDialog").find(".sapMLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapUiVlt").find("input");
},
'1834754356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]:visible:first")},
'1837753567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("button.context_icon").filter("[title="+fixed.tgtTitle+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1840440652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.headerText+")").closest(".pm2CompItemHeader").next(".pmContainer").find("[class*=contentArea]");},
'1840921585': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] div>input[id*='picker']:visible")},
'1841168318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapUiVlt").find("svg");},
'1841502541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery(".sapExtentUilibEditPageYouCanChange").closest("section").find("bdi").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
if (oldElem.length) {
  return wmjQuery(oldElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "When would you like your changes to take effect?") {
  const newElem = wmjQuery(".sapExtentUilibEditPageYouCanChange").closest("section").find("bdi").filter(":containsTextNodeIgnore(When should these changes take effect?)");
  return wmjQuery(newElem);
} else {
  return wmjQuery();
}},
'1845524650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapMInputBaseInner:eq(1)")},
'1849614048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMFlexBox").find(".sapMSltArrow");},
'1853718186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._parentId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-input-sf-goal-form").filter("[id*='"+fixed._elemtId+"']") : wmjQuery();
},
'1858092068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='DialogHeader_headerText']").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("[class*='MessageDialog_defaultHeader']");},
'1861041788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".sapMInputBase").filter("[data-help-id="+fixed._lmText+"]").find("input");},
'1862590079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li,span").filter("[class^=MyTeamDialog]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'1862854850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
const text = wmjQuery().identity(fixed.btnText);
	return findShadowDomWithoutUniqueContainer_1("ui5-button[aria-label="+text+"]",
	{selector:"button" ,isShadowChild:true })},
'1863175906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapMListTblCnt']:first input:first")},
'1866035852': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-describedby='msgRequiredDescription']").find("div[id*='xmilestones_addBtn']").find("a");},
'1866340463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='application']").filter("[aria-labelledby='"+fixed._elemAttr+"']").find("div.nrte_contentArea");},
'1866955543': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tableHeaderLabel[id*='"+fixed._elmId+"']");},
'1870059846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest("[data-testid='pmu_component_PageSectionHeader']").find("[icon='"+fixed._btnIcon+"']").closest("[data-component-name='ToolbarContent'],ui5-toolbar-xweb-performance-management");},
'1870514678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")").closest("tr").find(".ectFindUserQCLinkIcon").filter(":mt_visible");},
'1873466465': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] span[class~=" + dollars[1] + "]:first")},
'1874756744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-tabcontainer",
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+fixed.btnText+")")
},
'1875400266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#formListHeaderRow th:first")},
'1879368162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMLabelTextWrapper").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'1883238268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".compTopShowMenuItemText").filter(":containsTextNode("+fixed.labelText +")");},
'1884119172': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sf-list-select").find(".primary").filter(":containsTextNodeIgnore("+ fixed.titleText +")");},
'1886416969': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='globalMenu sfDropMenu menuDefault'] li a[title=" + dollars[0] + "]")},
'1886459467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title").filter(":containsTextNode("+fixed.sectionTitleText+")").closest("[data-testid='detailsPage']").find("iframe");},
'1888238533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest(".sapMPanel").find(".sapExtentUilibUtilEditFormGeneratorShowMoreLessButton");},
'1891966212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-goalmanagementx").filter("[data-help-id="+fixed._parentAttr+"]")[0];
const firstShadow = first && first.shadowRoot;

if (firstShadow){
  return wmjQuery(firstShadow).find(".tab-total-count");
}






return wmjQuery();},
'1892485644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[name*=" + dollars[0] + "]:first")},
'1894950108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[aria-rowindex='"+fixed._rowindex+"']").find(".sapMInputBase").filter("[data-help-id="+fixed._datahelpid+"]").find("[role='button']").filter("[data-sap-ui-icon-content="+fixed._icondata+"]");},
'1896768407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem'][href*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1899396531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.alterRow").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("button.new").filter(":mt_visible");},
'1899945103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sfDropMenu menuDefault'] a[onclick*='tgmEdit']")},
'1901094544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] button:first ~ button:first")},
'1902763819': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const key1 = wmjQuery("ui5-label-xweb-people-profile").filter(":containsTextNode("+fixed.labelTxt+")")[0];
const key1Shadow = key1 && key1.shadowRoot;
return key1Shadow ? wmjQuery(key1Shadow).find("[class*='label-text-wrapper']") : wmjQuery();
},
'1902961143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-calendar-xweb-people-profile")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[data-ui5-cal-header-btn-prev='true']") : wmjQuery();},
'1905646365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='main']:contains(" + fixed.headerTxt + ") label:contains(" + dollars[0] + ")");},
'1905686250': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionHeader").filter(":containsTextNode("+fixed.elemText+")");},
'1905848597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1:contains(" + dollars[0] + "):visible")},
'1907204902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='sapMLnk sapMLnkMaxWidth']:contains(" + dollars[0] + ")")},
'1907275260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] button[id=" + dollars[1] + "]")},
'1907511456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode("+ fixed.headerText +")").closest("div.sapMDialog").find("button").filter(":containsTextNode(" + fixed.expectedText + ")").first()},
'1908640491': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMList").find("li.sapMLIB").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1909057491': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapUiVltCell").next().find(".calcFieldIcon:first");},
'1909782360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.sectionText+")").closest(".section-name").closest(".section_title").find("button.add_lib");},
'1912635996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest(".pm2ObjectItemHeader").find(".fd-button[id*=goalEditButton]");},
'1913259941': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:visible")},
'1914500346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[title=" + dollars[0] + "]:first")},
'1916314695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMComboBoxBase.sapMInputBase:visible:eq(" + dollars[0] + ")")},
'1916656731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='alertdialog']").find(".sapMDialogFooter").find("button:eq(1)");},
'1916886617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field[name='"+fixed._parentId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-root") : wmjQuery();
},
'1918613709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.tgm-action-link:nth-child(" + dollars[0] + ") > a:nth-child(" + dollars[1] + ")")},
'1921768028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const searchInput= wmjQuery("[data-testid='searchInput']")[0];
const searchInputShadow  = searchInput && searchInput.shadowRoot;
return wmjQuery(".ui5-input-inner",searchInputShadow);},
'1922506198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ezRaterItemName").filter(":containsTextNode("+fixed.labelText+")").closest("[role='button']").find(".ezRaterExpandControlIcon");},
'1923225986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInputBaseContentWrapper:eq(0)")},
'1925663706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class='globalPrimaryButton']:first")},
'1926971813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapMComboBoxInner:eq(" + dollars[0] + ")")},
'1927826485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='region']").find(".sapMWizardStepTitle").filter(":containsTextNode("+ fixed.btnText +")")},
'1932190722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id$="+fixed._childId+"]").parent("div");},
'1933121985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-performance-management").filter(":contains("+fixed.hdrTxt+")").closest("[data-testid=pmu_component_PageSection]").find("ui5-panel-xweb-performance-management");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-panel-root") : wmjQuery();},
'1940372747': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid*='component_PageSection").find("ui5-title-xweb-performance-management").filter("[title=" + fixed.btnText + "]");},
'1940678063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".jobReqTitleBarLinkWrapper.floatleft:eq(0)")},
'1941363627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalHeader input[type=" + dollars[0] + "]")},
'1943332178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-ilx").filter("[data-testid="+fixed._parentData+"]")[0];
const firstShadow = first && first.shadowRoot ;
elem = wmjQuery(firstShadow).find("section");
return elem.length ? elem : wmjQuery();},
'1943808146': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPlacematNavigationText .dropDownButtonText")},
'1944246813': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSection").find("div.sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'1944856756': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']")[0] && wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']")[0].shadowRoot;
return first && wmjQuery(".menuItemSpace", first).filter(":containsTextNode("+fixed.tgtElemText+")");},
'1944955383': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'1946707790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".globalArrowColor").last();},
'1952358877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[accessible-name='"+fixed._pageTitleText+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("form").filter("[aria-label="+fixed.lmAriaLabel+"]") : wmjQuery();},
'1953180509': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[title='Go to Home Page']")},
'1957480395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenuItemFocus").find("a").filter(":containsTextNode("+ fixed.btnText +")").closest("td");},
'1957526179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-tabcontainer-xweb-ec-workflow")[0];
let firstShadow = first && first.shadowRoot;
let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split(" (")[0] : null;
const elem1 = wmjQuery(".ui5-tab-strip-itemText", firstShadow).filter(":contains("+targetText+")").closest(".ui5-tab-strip-item").filter(":mt_visible");
if (elem1.length)
{
  return elem1;
}
 first = wmjQuery("ui5-static-area-item-xweb-ec-workflow")[0];
 firstShadow = first && first.shadowRoot;
const elem2 = wmjQuery(".ui5-tab-overflow-itemContent", firstShadow).filter(":contains("+targetText+")").closest(".ui5-tab-overflow-item");
if (elem2.length)
{
  return elem2;
}
return wmjQuery();
  
},
'1957685483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon").filter("[name='"+fixed._tgtIcon+"']").closest("[data-testid='actionChipButton']");},
'1961092369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimaryButton']:eq(0)")},
'1961601911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("tr").find("td").find("span");},
'1962219032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-table-column-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("th") : wmjQuery();},
'1965955746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button").filter("[data-help-id="+fixed._btnDataHelpIdAttr+"]");},
'1967190611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[name="+fixed._parentName+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;


return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-required-colon") : wmjQuery();

},
'1967588537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formFieldLabel:contains(" + dollars[0] + ") + td span")},
'1967858047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'1969285766': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='heading']").filter(":containsTextNode("+ fixed.btnText +")").closest("div.sapExtentUilibUtilEditFormGeneratorTableContainer").find("tbody").find("tr:eq("+ fixed.trIndex + ")").find("td:eq("+ fixed.tdIndex + ")").find("input").filter(":mt_visible");},
'1969955260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile[class*=Table_title]").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").filter(":mt_visible");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'1971141462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=titleMainSection]").filter(":containsTextNode("+fixed.elmTxt+")");},
'1971482003': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".colGroupHeaderRow").find("[id="+fixed._innerId+"]").closest("div[class*=colGroupHeader]");},
'1972739496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIB.sapMLIB-CTX.sapMLIBActionable.sapMLIBFocusable.sapMLIBHoverable.sapMLIBShowSeparator.sapMLIBTypeActive.sapMSLI:not(.globalMenuItem):contains(" + dollars[0] + ")")},
'1972872753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'1974239316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog-xweb-goal-copies,ui5-dialog-xweb-goalmanagementx").find("header,div").filter(":containsTextNode("+fixed.elemTxt+")");},
'1978997435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("a").filter("[title="+fixed.sectionTitle+"]").closest(".sfObjectPageSection").find('[role="button"]');
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1979075211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=mainHeader]").find("th").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'1980042024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNode("+fixed.elemText+")");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root") : wmjQuery();},
'1981842080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-text-xweb-form-inbox").filter("[title="+fixed.btnTitle+"]")[0];
const firstShadow = first && first.shadowRoot ;
return wmjQuery(firstShadow).find("span");
},
'1982072413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".subtitle").filter(":containsTextNode("+fixed.lbltxt+")").closest("[data-help-id*='form']").find(".fd-input-group").find(".sap-icon--slim-arrow-down");},
'1987609894': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MDFReadWriteForm").find(".form_field").find(".text").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1989334725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-split-button-xweb-performance-management").filter("[id="+fixed._parentId+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-performance-management")[0];
const secondShadow = second && second.shadowRoot;
if(secondShadow){
  return wmjQuery(secondShadow).find("button");
}

return wmjQuery();},
'1992246669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("h1#ui5-popup-header-text");
return elem.length ? elem : wmjQuery();},
'1993266246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-sf-quickcard").filter(":containsTextNode("+fixed.tgtElemText+")")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-link-root",firstShadow);},
'1993398748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:contains(" + dollars[0] + ") .sapMComboBoxBaseState")},
'1994881240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNode("+fixed.lmText+")").closest("div[data-testid='pmu_component_PageSectionHeader']");},
'2001047382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.sectionheader+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.txt+")").closest("td").find("textarea");},
'2001620112': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode("+ fixed.headerText +")").closest("div.sapMDialog").find("button").filter("[data-help-id=" + fixed._dataHelpId + "]");},
'2001690393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] input:first")},
'2001738599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("span.sapMLabel").filter(":mt_visible");},
'2005473041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBtnReject").closest("button");},
'2007496772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer[class~=" + dollars[0] + "] button[title=" + dollars[1] + "]")},
'2008781304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=FieldComponent_formInput]").filter("[data-testid='"+fixed._datatestid+"']");},
'2009687548': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='VltCell']:contains(" + dollars[0] + ") + div")},
'2013813241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='SplashHeader_content']").find("[data-testid=greetingText]");},
'2014339911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPortletBody:mt_visible:last")},
'2016772146': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem:eq(1)")},
'2016882866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(24)")},
'2018101116': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.comboBox:eq(" + dollars[0] + ")")},
'2021040728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name*=" + dollars[0] + "]:visible")},
'2023186531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1('ui5-static-area-item', {selector:'.ui5-valuestatemessage-popover' ,isShadowChild:true }, {selector:'.ui5-valuestatemessage-header' ,isShadowChild:false });
}else{
	return wmjQuery(".sapMPopoverWithoutSubHeader");
}},
'2025897594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.sectiontext+")").closest("[role='region']").find("th").filter(":containsTextNode("+fixed.tableheader+")").closest(".globalPortletSidePanel").closest("tbody").find(".sapIcon").filter(":containsTextNode("+fixed.icontext+")").first();},
'2027888464': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".Negative", isShadowChild:false});
} else {
 return wmjQuery(".sapSfTodoPanel").find("li:eq("+fixed._index+") .globalLPTileBodyText svg")
}
},
'2031002402': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field[name='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("bdi",thirdShadow) : wmjQuery();},
'2034263807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#surjSubTabBar").find("a").filter(":containsTextNode("+ fixed.btnText +")");},
'2034838492': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[class~=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'2036389805': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=CardHeader_title]").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest("[class*=CardWrapper_root]").find("[ui5-button]").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'2036446426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMessageBoxError header .sapMTitle");},
'2037724578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[id*="+fixed._outerId+"]").find("input").filter("[type="+fixed._elmAttr+"]");},
'2039345682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-breadcrumbs")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-link").filter(":containsTextNode("+fixed.linkText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("a.ui5-link-root",secondShadow): wmjQuery();},
'2039405346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-dialog__footer").find("button[name=Submit]");},
'2039527012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id=" + dollars[0] + "][class~=" + dollars[1] + "]")},
'2041175735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstElem = wmjQuery("xweb-avatar-list-item")[0];
const firstShadow = firstElem && firstElem.shadowRoot;
return firstShadow && wmjQuery("ui5-icon", firstShadow).filter("[name='"+fixed._elemId+"']");},
'2044249761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[class*=PageEffectiveDate]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span.sapUiIcon[id*=__picker]");
if (oldElem.length) {
  return wmjQuery(oldElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "When would you like your changes to take effect?") {
  const newElem = wmjQuery("[class*=PageEffectiveDate]").filter(":containsTextNodeIgnore(When should these changes take effect?)").find("span.sapUiIcon[id*=__picker]");
  return wmjQuery(newElem);
} else {
  return wmjQuery();
}},
'2046939706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.pmPortletTitle").find(":header").closest("div.pmPortletContainer").find("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("tr").find("div.nrte_contentArea");},
'2047073449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr#formListHeaderRow th:eq(" + dollars[0] + ")")},
'2047406266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find(".nrte_contentArea");},
'2050735669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle").find(":header").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'2051294729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:eq(1)")},
'2053077144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[type=" + dollars[0] + "]:contains(" + dollars[1] + "):last")},
'2053399327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection div[role=" + dollars[0] + "] button")},
'2055030929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label#label_tor_wf_sect_0_flistingLayout:visible")},
'2058677478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiInvisibleText").filter(":containsTextNodeIgnore("+fixed.invisibeElemTxt+")").closest("button").filter(":mt_visible");},
'2059383575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(\".sapMLabelRequired[title=" + dollars[0] + "]\") .sapMComboBoxInner")},
'2060030950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem']:contains(" + dollars[0] + ")")},
'2062759281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".actionLinks>.sapIcon:eq(" + dollars[0] + ")")},
'2064130788': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id$=\"gridContent\"]:textStartsWith(" + fixed.gridHeader + ") span:contains(" + dollars[0] + "):visible")},
'2066016780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapMTitle span").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'2066935015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest("[class*=sapUiRespGrid]").find(".sapExtentUilibFormPatternTable").filter(":containsTextNodeIgnore("+fixed.innerLblTxt+")");},
'2067363572': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[onclick*=" + dollars[0] + "]:last")},
'2068362529': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*='pmreview']:visible")},
'2068616929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem =  wmjQuery("a").filter("[title=" + fixed.btnText + "]").closest("ul.tab_list").next().find("[target='_blank'] b");
if (elem.length)
 {return elem} 
return wmjQuery("a").filter("[title=" + fixed.btnText + "]").closest("ul.tab_list").next().find("[target='_blank']")},
'2070849161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") ~ div[class='sapUiVltCell sapuiVltCell']:first input")},
'2071583846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='HomepageSection']").find("[class*='QuickActions']").find("a").filter("[data-help-id="+fixed._tgtId+"]");},
'2071591660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:`ui5-list[header-text='To-Do']` ,isShadowChild:false },
	{selector:".ui5-list-header" ,isShadowChild:true })
}else{
	return wmjQuery(".sapSfTodoPanel").find(".sapMListHdrText");
}
},
'2073689955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.elemText+")").eq(0);},
'2076699916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalSecondaryButton.buttonDefault:first")},
'2077085493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.wrapperList a[title=" + dollars[0] + "]:visible")},
'2079640167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sfDropMenu menuDefault'] a[class*=" + dollars[0] + "]")},
'2080483505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("ui5-title-xweb-performance-management").filter("[slot="+fixed._lmAttr+"], [slot=snappedHeading]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2082226599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=LineClampText_lineClamp]").filter(":containsTextNode("+fixed.lmText+")").closest("ui5-busy-indicator")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-busy-indicator-root") : wmjQuery();},
'2085083834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardTitle").filter(":containsTextNodeIgnore("+fixed.lmTxt+")");},
'2086522422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-bar--footer").find("button").filter(":containsTextNode("+fixed.elmTxt+")").closest(".buttonWrapper");},
'2086982583': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name="+fixed._parentId+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
},
'2094470700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id*=" + dollars[0] + "] [class*=" + dollars[1] + "]")},
'2095398818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-text-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.btnText+")");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'2097178185': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button:last")},
'2098454554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.titelText+")").closest(".sapUiVltCell");},
'2098512753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find("label").filter("[title=" + fixed.titleText + "]").find(".sapMLabelTextWrapper");},
'2099921603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery(".sapUiInvisibleText").filter(":containsTextNode("+fixed.invisibeElemTxt+")").closest("button");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'2101712155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("span[role='heading']").filter(":containsTextNodeIgnore("+fixed.elmtxt+")");},
'2105516314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tablist]").find(".sub-item").filter(":containsTextNode("+fixed.elmTxt+")");},
'2106737837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive.sapMListTblRow:has([title=" + dollars[0] + "]) .sapMInputBaseInner:eq(1)")},
'2107741468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form-dialog")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery("ui5-button-sf-goal-form", firstShadow).filter(":containsTextNode("+fixed.elemTxt+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow) : wmjQuery();},
'2108353518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPage").filter("[data-sap-ui="+fixed._modalPageAttr+"]").closest(".sapMDialogSection").closest(".sapMDialog").find("[id$=header-BarPH]");},
'2110395972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='title-inner']").filter(":containsTextNode("+fixed.headerText+")").closest(".sapMDialog").find(".sapMLabel").filter(":contains("+fixed.elemText+")");},
'2112076515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td select[id*=" + dollars[0] + "]:eq(0)")},
'2114832301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tree-item").filter("[title="+fixed.lmTitle+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("li") : wmjQuery();},
'2116053441': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form_field").find("input");},
'2116458024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPopoverCont:visible li[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'2116839487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.lblText+")").closest(".field_label").closest(".form_field").find("button");},
'2117368029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("ui5-shellbar-sf-header")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").filter("[data-ui5-stable="+fixed._lmText+"]").find(".menuItemSpace") : wmjQuery();},
'2118079517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHeadingDiv").find(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span[id*=inner]").filter(":mt_visible");},
'2118749333': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPrimaryButton:visible:last")},
'2121582758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMComboBoxBaseState:eq(" + dollars[0] + ")")},
'2122114864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='application']").filter("[aria-labelledby='"+fixed._elemAttr+"']").closest("div[class*='FloatBlock']");},
'2122225144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=CardHeader_title]").filter(":containsTextNodeIgnore("+fixed.cardHeaderTxt+")").closest("ui5-card-xweb-manifest-toolkit")
.find("ui5-li-custom-xweb-manifest-toolkit").filter("[data-index='"+fixed._dataIndex+"']").find("[class*=ListCard_itemInfo]");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'2123110234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNode("+fixed.elemTxt+")")[1];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'2129745078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (ftHelper.unQuote(fixed.elemTxt)  === "Go To") {
  const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNodeIgnore(Links)")[0];
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'2129998467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElemButton = wmjQuery("[id*='accountOverviewDialog']").find("button").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (oldElemButton.length) return oldElemButton; 
const newElemSpan = wmjQuery("[id*='accountOverviewDialog']").find("span.sapMITHTextContent").filter(":containsTextNodeIgnore("+fixed.lmText+")");
if (newElemSpan.length) return newElemSpan;
return wmjQuery();
},
'2133176667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem =  wmjQuery("a").filter("[title=" + fixed.btnText + "]").closest("ul.tab_list").next().find("[target='_blank'] b");
if (elem.length)
 {return elem} 
return wmjQuery("a").filter("[title=" + fixed.btnText + "]").closest("ul.tab_list").next().find("[target='_blank']")},
'2133594562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:contains(4)")},
'2136334826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elmlContainers = wmjQuery("ui5-static-area-item");
let labelElm ;
for (const elmlContainer of elmlContainers) {
  const shadowRoot = elmlContainer.shadowRoot;
  if (!shadowRoot) continue;
  labelElm = wmjQuery(shadowRoot).find("ui5-responsive-popover").filter("[accessible-name='"+fixed.lmAttr+"']");
  if (labelElm.length) break;
  }
const second = wmjQuery(labelElm).find("ui5-time-selection-clocks")[0];
const secondShadow = second && second.shadowRoot;
const third =  wmjQuery(secondShadow).find("ui5-segmented-button-item").filter(":containsTextNode("+fixed.elemText+")")[0];
const thirdShadow = third && third.shadowRoot;
const tgtElem = wmjQuery("li.ui5-button-root", thirdShadow);
return tgtElem.length ? tgtElem : wmjQuery();
},
'2138856715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.lmTitle+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find("span[role='button']");},
'2138999679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-text-xweb-people-profile").filter(":containsTextNode("+fixed.elmTxt+")");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("span") : wmjQuery();},
'2139150534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id='wizNextButtonedit'][title=" + dollars[0] + "]")},
'2141101171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalContentForeground .globalPrimaryButton:eq(" + dollars[0] + ")")},
'2141187877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":contains(" + fixed.headerText + ")").closest(".sapMLIBContent");
},
'2142134531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest("div").next("div").find("a").filter(":containsTextNode("+fixed.lmText+")").filter(":first");},
'2142737840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("xweb-goal-form")[0];
const shadowRootElem = shadowElem && shadowElem.shadowRoot;
return shadowRootElem ? wmjQuery("form[aria-label="+fixed.labelAriaLabelAttr+"]",shadowRootElem).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.tgtDirectText+")") :wmjQuery();},
'2143867338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='bizXSearchField'] input")},
'2143894130': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell:has(.sapMLabel[title=" + dollars[0] + "]) + .sapUiVltCell")},
'2144952787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-menu__link").filter("[title="+fixed.titleAttr+"]").find(".menuIcon");},
'2145270408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPageTitle").filter(":containsTextNodeIgnore("+fixed.headerText+")").parent("div");},
'-1602673462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldEnv = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']");
if (oldEnv.length){
 const firstShadow = oldEnv.length && oldEnv[0].shadowRoot;
 return firstShadow ? wmjQuery(firstShadow).find(".menuItemSpace").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();

} 
const newEnv = wmjQuery("xweb-shellbar.sfEnsureSAPTheme");
if (newEnv.length){
  const firstShadow = newEnv.length && newEnv[0].shadowRoot;
  const second= wmjQuery(firstShadow).find("ui5-shellbar-sf-header[data-ui5-static-stable='shellbar-static']")
  const secondShadow = second.length && second[0].shadowRoot;
  return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").filter(":containsTextNode("+fixed.lmText+")").find(".menuItem") : wmjQuery();
 } 
return wmjQuery()
},
'-75844073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldEnv = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-profile-static']")
if(oldEnv.length){
  const firstShadow = oldEnv.length && oldEnv[0].shadowRoot;
  return firstShadow ? wmjQuery(firstShadow).find("ui5-li-sf-header[icon="+fixed._iconAttr+"]").find(".menuItemSpace") : wmjQuery(); 
}
const newEnv = wmjQuery("xweb-shellbar[data-ui5-stable='sf-header-shellbar']")
if (newEnv.length){
	const firstShadow = newEnv.length && newEnv[0].shadowRoot;
    const second = wmjQuery(firstShadow).find("xweb-utility-links#utilityLinks")
    const secondShadow = second.length && second[0].shadowRoot;
    return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header[icon="+fixed._iconAttr+"]").find("a.menuItem") : wmjQuery();
}
 
return wmjQuery();
},
'-57062288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item[icon="+fixed._tabIcon+"]")
const firstShadow = first.length && first[0].shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-icon.ui5-button-icon,ui5-icon.ui5-segmented-button-item-icon")
const secondShadow = second.length && second[0].shadowRoot;
return  secondShadow ? wmjQuery(secondShadow).find("svg") :  wmjQuery();},
'-1565299424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-switch[data-testid='DelegationToggle']")
const firstShadow = first.length && first[0].shadowRoot;
return  firstShadow ? wmjQuery(firstShadow).find(".ui5-switch-root") :  wmjQuery();},
'-1028451542': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-datetime-picker[data-testid='DelegationStartTime']")
const firstShadow = first.length && first[0].shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-input.ui5-date-picker-input");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("input.ui5-input-inner") :  wmjQuery();},
'-2093291199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first= wmjQuery("[data-testid='viewMore']")
const firstShadow = first.length && first[0].shadowRoot;
return  firstShadow ? wmjQuery(firstShadow).find("button.ui5-button-root") :  wmjQuery();},
'-1522184872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#myTeamDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
 return wmjQuery("section[role='dialog']",targetShadow);
} 
 return wmjQuery("div[role='dialog']");
},
'-1522184859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#myTeamDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("header#ui5-popup-header",targetShadow);
} 
return wmjQuery("[id*='manageMyTeamContainer-Master']").find(".sapMBarPH");
},
'-1522184835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#myTeamDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("header#ui5-popup-header",targetShadow);
} 
return wmjQuery("[id*='teamMemberProfilePage']").find(".sapMBarPH");
},
'-1522142348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-li:eq("+fixed._elemIndex+")")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if(targetShadow){
  return wmjQuery("li",targetShadow);
} 
 return wmjQuery("li[id*='teamMemberList']:eq("+fixed._elemIndex+")");
},
'-1522184847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-button").filter(":directContains("+fixed.targetText+")")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery(".ui5-button-root",targetShadow);
} 
  return wmjQuery(".sapMDialogOpen").find("bdi").filter(":directContains("+fixed.targetText+")").closest("button");
},
'-1522184834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='myTeamMemberTitle']")
if (!target.length > 0){
	return wmjQuery("span[id*='teamMemberProfilePage--jobTitle']")
} 
return target;},
'-1522184823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-button#takeActionButton")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  	return wmjQuery("button",targetShadow);
}  
return wmjQuery("[id*='teamMemberProfilePage']").find("bdi").filter(":directContains("+fixed.tgtText+")").closest("button");

},
'-1522184826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-button#goToButton")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  	return wmjQuery("button",targetShadow);
}
return wmjQuery(".sapMPanelContent").find("a.sapMLnk");

},
'-1522184828': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const target = wmjQuery("[data-testid='myTeamMemberLocation']").closest("div");
if(!target.length > 0){
  	return wmjQuery("[id*='teamMemberProfilePage--location']");
}
return target
},
'-1521184858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#favoritesDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("section[role='dialog']",targetShadow);
} 
return wmjQuery("div[role='dialog']");
},
'-1522184829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#favoritesDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("header#ui5-popup-header",targetShadow);
} 
  return wmjQuery("div[id$='header-BarPH']");},
'-1524315830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("section[data-testid='favoritesDialogBody']");
if (!target.length) {
  return target = wmjQuery("div.sapMDialogOpen").find("div[data-sap-ui$=quickLinksTabBar]");
}
return target;},
'-1522112833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-segmented-button-item").filter(":directContains("+fixed.targetText+")")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("li.ui5-button-root",targetShadow);
} 
  return wmjQuery("div[role='dialog']").find(".sapMITHTextContent").filter(":directContains("+fixed.targetText+")").closest(".sapMITBItem");
},
'-1522112834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-segmented-button-item").filter(":directContains("+fixed.targetText+")")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("bdi",targetShadow);
} 
  return wmjQuery("div[role='dialog']").find(".sapMITHTextContent").filter(":directContains("+fixed.targetText+")")
},
'-1522112836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("section[data-testid='favoritesDialogBody']");
if (!target.length) {
  return target = wmjQuery("[data-sap-ui$='quickLinksTabBar']").find("div.sapMScrollContScroll");
}
return target;},
'-1522112837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-link").filter(":directContains("+fixed.targetText+")").prev("ui5-icon")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("svg",targetShadow);
} 
  return wmjQuery(".sapMLnk").filter(":containsTextNode("+fixed.targetText+")").closest(".sapMFlexItem").prev(".sapMFlexItem");
},
'-1522112839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-link").filter(":directContains("+fixed.targetText+")")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("a.ui5-link-root",targetShadow);
} else {
  const ancestorElem = wmjQuery("[id$=quickLinksTabBar-containerContent]");
  return ancestorElem.length ? ancestorElem.find(".sapMLnk").filter(":containsTextNode("+fixed.targetText+")") : wmjQuery();
}},
'-1522184824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery(".sapMDialog").find("bdi").filter(":containsTextNode("+fixed.tgtText+")").closest("button");
if (!target.length) {
  	return wmjQuery(".sapMDialog").find("button").filter(":containsTextNode("+fixed.tgtText+")").closest("li");
}
return target;

},
'-711953010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='lineClamp']").filter(":directContains("+fixed.targetText+")").closest("a");
if (!target.length > 0){
  return wmjQuery(".sapUshellTileBaseTitle").filter(":directContains("+fixed.targetText+")").closest(".globalLPTileContent")
} return target},
'-715453942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-icon[name='manager']").closest("button");
if (!target.length > 0){
  return wmjQuery(".globalLPTileContent[data-tourchipid='team-manageMyTeam']");
} return target;},
'-1522184830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("h2[class*=FavoritesDialog_dialogHeader]");
if (!target.length) {
  target = wmjQuery("div.sapMDialogOpen").find("span[id$='-title-inner']");
}
return target;},
'-715453011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='lineClamp']").filter(":directContains("+fixed.targetText+")").closest("a");
if (!target.length > 0){
  return wmjQuery("li").filter(":contains("+fixed.targetText+")").find(".globalLPTileContent");
} return target;},
'-1522184825': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const terget = wmjQuery("ul[class*='MyTeamDialog_list']");
if(!terget.length > 0){
    	return wmjQuery("[role='application']");
} 
return terget;


},
'-715453895': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-icon[name='history']").closest("a");
if (!target.length > 0){
  return wmjQuery(".globalLPTileContent[data-tourchipid='info-timeSheet']")
} return target},
'-715453013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='lineClamp']").filter(":directContains("+fixed.targetText+")").closest("a");
if (!target.length > 0){
  return wmjQuery("[class*='TileImageDisplayTitle']").filter(":directContains("+fixed.targetText+")").parent();
} return target;},
'-1522112830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("section[data-testid='favoritesDialogBody']");
if (!target.length) {
  return target = wmjQuery("div.sapMDialogOpen").find(".sapMDialogSection");
}
return target;},
'-715873040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const target = wmjQuery("[data-testid='teamListContainer']");
if (!target.length > 0){
   return wmjQuery("[id*='manageMyTeamContainer-Master']").find(".sapMPageEnableScrolling");
} return target;

},
'-1522182348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[class*='MyTeamDialog_detailsContainer']");
if (!target.length > 0){
  return wmjQuery("[id*='teamMemberProfilePage']").find(".sapMFlexBoxFit");
} 
return target;


},
'-1522112838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-link").filter(":directContains("+fixed.targetText+")").closest("[class*=FavoritesDialog_quickLinkWrapper]");
if (target.length) {
  return wmjQuery(target);
} else {
  return wmjQuery(".sapMLnk").filter(":containsTextNode("+fixed.targetText+")").closest(".sapMFlexBox");
}},
'-715453012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='lineClamp']").filter(":directContains("+fixed.targetText+")").closest("a");
if (!target.length > 0){
  return wmjQuery("[class*='TileImageDisplayTitle']").filter(":directContains("+fixed.targetText+")");
} return target;},
'-715453014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='lineClamp']").filter(":directContains("+fixed.targetText+")").closest("a");
if (!target.length > 0){
  return wmjQuery("li").filter(":contains("+fixed.targetText+")").find(".surjUserPhotoImg")
} return target},
'-715453010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-icon[name='course-book']").closest("a");
if (!target.length > 0){
  return wmjQuery(".globalLPTileContent[data-tourchipid='info-learning']")
} return target},
'-772453010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-icon[name='manager-insight']").closest("a");
if (!target.length > 0){
  return wmjQuery(".globalLPTileContent[data-tourchipid='team-ManagerReports']")
} return target},
'-1522184849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[class*='MyTeamDialog_detailsContent']");
if (!target.length > 0){
	return wmjQuery("[id*='teamMemberProfilePage--profilePanel-content']");
} 
return target

},
'-1522184848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[class*='MyTeamDialog_detailsContent']").find("img");
if (!target.length > 0){
  return wmjQuery("[id*='teamMemberProfilePage']").find("img.surjUserPhotoImg");
} 
return target;


},
'-1522184842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("[data-testid='myTeamMemberName']");
if (!target.length > 0){
  return wmjQuery("span[id*='fullName']")
} 
return target;


},
'-1522184860': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("#MyTeamDialogHeader").find("span");
if (!target.length) {
  target = wmjQuery("[id*='manageMyTeamContainer-Master']").find("span[id$='-title-inner']");
}
return target;},
'-1522184836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("#MyTeamDialogHeader").find("span");
if (!target.length) {
  target = wmjQuery("[id*='teamMemberProfilePage']").find("span[id$='-title-inner']");
}
return target;},
'-1522196831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("div[class*=FavoritesDialog_segmentedbuttonWrapper]");
if (!target.length) {
  target = wmjQuery("div.sapMDialogOpen").find("[data-sap-ui$='quickLinksTabBar--header']");
}
return target;},
'-1522112832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("div[class*=FavoritesDialog_segmentedbuttonWrapper]");
if (!target.length) {
  target = wmjQuery("div.sapMDialogOpen").find("div[id$='quickLinksTabBar--header-head']");
}
return target;},
'-1522112835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("section[data-testid='favoritesDialogBody']");
if (!target.length) {
  target = wmjQuery("[data-sap-ui$='quickLinksTabBar']").find("div.sapUiContentPadding");
}
return target;},
'-715453016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let target = wmjQuery("ui5-icon[name='favorite-list']").closest("button");
if (!target.length > 0){
  return wmjQuery(".globalLPTileContent[data-tourchipid='info-quickLinks']")
} return target},
'-1522992837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-link").filter(":directContains("+fixed.targetText+")").prev("ui5-icon")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("svg",targetShadow);
} 
  return wmjQuery(".sapMLnk").filter(":containsTextNode("+fixed.targetText+")").closest(".sapMFlexItem").prev(".sapMFlexItem").find(".sapMRISelector");
},
'-264290396': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
if ( headerCheck1()){
let res = ftHelper.findShadowDomWithoutUniqueContainer_2(wmjQuery,"ui5-static-area-item-sf-header", 
	{selector:".descriptionContainer:last",isShadowChild:true});
	return wmjQuery(res).last().prev().find("span");
 
}else{
	return wmjQuery(".bizXSuggestExternalSearch");
}},
'-65891263': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery(".ui5-button-root", wmjQuery("ui5-button-sf-header[icon='feedback'],ui5-button[icon='feedback']", getHeaderBar1())[0].shadowRoot );
}else{
	return wmjQuery(".globalHeaderBar").find("button#bizXShellFeedbackButton");
}
},
'-25497413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newHeaderCheck = wmjQuery("[data-ui5-stable='shellbar-profile-static']");
if (newHeaderCheck.length){
  const menuElem = wmjQuery("[data-ui5-stable='shellbar-profile-static']")[0];
  const menuShadow = menuElem && menuElem.shadowRoot;
  return wmjQuery(".menuItemSpace", menuShadow).filter(":contains("+fixed.lmText+")");
}	
const oldElem = wmjQuery(".globalMenuItem").filter(":contains("+fixed.lmText+")");
if(oldElem) return oldElem;
return wmjQuery();},
'-1044582060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("ui5-segmented-button-item").filter(":directContains("+fixed.targetText+")")[0];
if (oldElem) {
  const targetShadow = oldElem && oldElem.shadowRoot;
  if (targetShadow) {
    return wmjQuery("li.ui5-button-root",targetShadow);
} 
  return wmjQuery("div[role='dialog']").find(".sapMITHTextContent").filter(":directContains("+fixed.targetText+")").closest(".sapMITBItem");
}
else {
  console.log("newelem");
  const tabContainer = wmjQuery("ui5-tabcontainer")[0];
  if (tabContainer) {
    const tabContainerShadow = tabContainer.shadowRoot;
    return wmjQuery(".ui5-tab-strip-itemText",tabContainerShadow).filter(":directContains("+fixed.targetText+")").closest("[role=tab]");
  } else wmjQuery();
}},
'-38873068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer-sf-header" ,isShadowChild:true },
	{selector:".ui5-tab-strip-item" ,isShadowChild:true }).filter(":containsTextNode("+text+")");
}else{
	return wmjQuery(".sub-nav-container").find(".surjSubTabItem:containsTextNode("+text+")");
}
},
'-739301995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='balancesList-header'],[id*='balancesPanel-header']");},
'-672459591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = ftHelper.unQuote(wmjQuery().identity(fixed.elemText));

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+"),ui5-li-sf-header:containsTextNode("+text+")", isShadowChild:false},
	{selector:"li", isShadowChild:true});
}else{
	return wmjQuery("#customHeaderModulePickerBtn-menuPopover-scroll").find("a.globalMenuItem:textEquals("+text+")");
}},
'-584390080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog [data-testid='myTeamDialogContent']").find("div").filter("[data-testid="+fixed._tgtName+"]");},
'-132930940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.lblText+")").closest(".field_label").closest(".form_field").find("button");},
'-1372801857': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-team-goal[accessible-role='AlertDialog']:visible")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery("#ui5-popup-header", firstShadow).filter(":containsTextNodeIgnore("+ fixed.btnText +")");
if (elem.length)
{  return elem;}return wmjQuery();},
'-1212582223': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid=takeActionButton]")[1];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-actions-btn']")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-342920322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid=takeActionButton]")[0];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-actions-btn']")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-433498309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("span[class^=MyTeamDialog]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
const newUI = wmjQuery("ui5-link-xweb-myteam-content").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
if (oldUI.length) {
  return oldUI;
}
else if (newUI.length) {
  return newUI;
}
else {
  return wmjQuery();
}},
'-384374291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("ui5-li").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery("span.ui5-li-title", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li[class^=MyTeamDialog_listItem]");
} else {
  return wmjQuery();
}},
'-1952010013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("[data-testid=takeActionItem]").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery(".ui5-li-text-wrapper span.ui5-li-title", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li");
} else {
  return wmjQuery();
}},
'-318084726': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("ui5-li").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery("li.ui5-li-root", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li[class^=MyTeamDialog_listItem]");
} else {
  return wmjQuery();
}},
'-1597319241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "Go To") {
  const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNodeIgnore(Links)")[0];
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-1041589289': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
const selectedUI = oldUI ? oldUI : newUI;
const shadowElem = selectedUI ? selectedUI.shadowRoot : null;
return shadowElem ? wmjQuery("li.ui5-li-root,a.ui5-link-root", shadowElem) : wmjQuery();},
'-224381161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name="+fixed._name+"]");},
'-596833859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfPeopleProfileBlockTitle").find("span[role='heading']").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'-1663950566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapUiRespGridSpanXL8")},
'-799444822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header.sapMDialogTitle").find("span").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'-546093687': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").find(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'-995500082': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.revolutionTSRight").find("span.revolutionTSInfoLabel").filter("[title=" + fixed.titleText + "]").next().find(".revolutionTSDatePickerWrapper")},
'-1794858013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMTitle").filter(":containsTextNodeIgnore(" + fixed.headerText + ")").parents("div[role='dialog']").find("button.sapMBtnBase").filter(":containsTextNode(" + fixed.buttonText + ")").filter(":mt_visible")},
'-2080538080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.revolutionTSInfoLabel").filter("[title=" + fixed.headerText + "]").parents(".revolutionTSRight").find("span.revolutionTSInfoLabel").filter("[title=" + fixed.titleText + "]").next().find(".revolutionTSDatePickerWrapper")},
'-126448019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("div.revolutionTSRight").find("span.revolutionTSInfoLabel").filter("[title=" + fixed.titleText + "]").next().find(".revolutionTSDatePickerWrapper")},
'-1878592814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("div[role='toolbar']").find("button").filter("[title=" + fixed.btnText + "]")
if (elem.length){return elem}
return wmjQuery("div.placematIcons").find("a.globalIconFont1Container").filter("[title=" + fixed.btnText + "]")
},
'-129763659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id^='footer_buttons']").find("span.sfDialogBoxButtonWrapper").find("button").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'-2033636350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.revolutionTSInfoLabel").filter("[title=" + fixed.titleText + "]").closest(".revolutionTSInfo").parent().next().find("span.revolutionTSDatePickerWrapper")},
'-927883102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMTitle").filter(":containsTextNode(" + fixed.tgtText + ")").parents("div[role='dialog']").find("button.sapMBtnBase").filter(":containsTextNode(" + fixed.buttonText + ")")},
'-545155579': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMSplitContainerMasterVisible").find("section.sapMPageEnableScrolling ")},
'-393398967': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+ fixed.headerText +")").closest("div[role='region']").find("bdi").filter(":containsTextNode("+ fixed.btnText +")").parents("button")},
'-220092230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartStepsContainer").find(".sfStepsChartStep").filter(":containsTextNode("+ fixed.btnText +")").closest("li")},
'-576282072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='HomepageSection']").find("[class*='QuickActions']").find("a").filter("[data-help-id="+fixed._tgtId+"]");},
'-2128328534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_homepageSection']")},
'-2128328539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")").closest("[class*='Card_wrapper']")},
'-2128328536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")").closest("[class*='StandardCard_body']")},
'-2128328537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")").closest("[data-testid='standard-card']").find("[class*='cardImage']")},
'-2128328538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").parent()},
'-2128328535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")")},
'-1103011311': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=" + dollars[0] + "] " + fixed.tgtTag + "")},
'-301428942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if (wmjQuery("[data-help-id='" + fixed.selectedTab + "'].selected").length !== 0) {return wmjQuery("[data-help-id=" + dollars[0] + "] > "+ fixed.tag + "")} else {return wmjQuery()}},
'-308676246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFDynamicPageTitleMainInner:has(h1:contains(" + dollars[1] + "))")},
'-876669686': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']:contains(" + fixed.tgtTitle + ") ~ button[title=" + dollars[0] + "]")},
'-216020041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form_field:contains(" + fixed.tgtLabel + ") " + fixed.tgtTag + "[class='" + fixed.tgtClass + "']")},
'-1443667478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog'] button:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-1667780799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='form']:contains(" + fixed.headerTxt + "):eq(" + dollars[0] + ") [id*=" + dollars[1] + "] [class*=" + dollars[2] + "]")},
'-350764299': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='form']:contains(" + fixed.headerTxt +"):eq(" + dollars[0] + ") [data-help-id=" + dollars[1] + "]").parent()},
'-494687002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='FormPatternLabel']:contains(" + dollars[0] + ")").parent().next().find("span:contains(" + dollars[1] + ")")},
'-541725999': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("span[title=" + fixed.tgtTxt + "]").parent().siblings().find("[class*='BaseContentWrapper']")},
'-1719731359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let modal = wmjQuery(".modalOverlay").filter(":mt_visible");
if (fixed.tgtTxt && modal && modal.length) {
	if (fixed._class === ".collapsible_handle") {
    	return modal.find(".form_header:containsTextNode(" + fixed.tgtTxt + ")").children(fixed._tag + fixed._class);
    } else {
    	return modal.find(fixed._tag + fixed._class + ":containsTextNode(" + fixed.tgtTxt + ")");
    }
} else {
	return wmjQuery()
}},
'-2146233911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let inner = wmjQuery("[name$=" + dollars[0] + "]").filter(":mt_visible");
if (inner && inner.length) {
	return inner.closest("td");
} return wmjQuery();},
'-1974715671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.innerTxt+")").closest("[class^=CardWrapper_clickableArea]");},
'-328828789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='topEndSlot']").find("ui5-button").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-317690419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":contains("+fixed.labelText+")").closest(".MDFLabel").closest(".form_field").find("input").filter("[placeholder="+fixed.placeHolder+"]");},
'-1340680764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":contains("+fixed.filedLabel+")").closest("span.MDFLabel").closest(".form_field").find("span.writeFieldBlank input");},
'-1673519697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	let three = wmjQuery(".ui5-shellbar-logo", two);
	return wmjQuery(three);
}else{
	return wmjQuery("#bizXHeaderCompanyLogo").find(".globalLogoPrimaryImage");
}
},
'-2077858878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("xweb-shellbar-search-input", getHeaderBarContainer1());
	return wmjQuery("input.ui5-input-inner", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("input[type='search']");
}
},
'-128648376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button", one);
}else{
	return wmjQuery("div.globalHeaderBar").find("button.bizXShellDropMenuButton");
}
},
'-830615823': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:`ui5-list[header-text='NOTIFICATIONS']` ,isShadowChild:false },
	{selector:".ui5-list-header" ,isShadowChild:true })
}else{
	return wmjQuery("#globalNotificationPanel").find("header");
}
},
'-480340424': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-notification:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:"li" ,isShadowChild:true })
} else {
    return wmjQuery("#globalNotificationPanel").find(".sapMListBGSolid  ul li:eq("+fixed._index+")")
}
},
'-1821919853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-notification:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".ui5-nli-description" ,isShadowChild:true });
} else {
    return wmjQuery(".sapMListBGSolid  ul li:eq("+fixed._index+")").find(".sapMNLIFooterItem:eq(1)");
}
},
'-1614132066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("[profile-btn]", getHeaderBar1());
	return wmjQuery(".ui5-button-root", first[0].shadowRoot);
}else{
	return wmjQuery("div.globalHeaderBar").find(".surjUserPhotoCircle");
}

},
'-1830215414': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:"#popover",isShadowChild:true},
	{selector:".popover-header", isShadowChild:false});
}else{
	return wmjQuery("#utilityLinksMenuId-menuPopover").find(".sapMTitle");
}
},
'-1975001097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:"#popover",isShadowChild:true},
	{selector:"div.ui5-popup-content", isShadowChild:true});
}else{
	return wmjQuery("#utilityLinksMenuId-menuPopover");
}
},
'-838860053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false })
} else {
 return wmjQuery(".sapSfTodoPanel").find("ul li:eq("+fixed._index+") .sapMLIBContent")
}
},
'-448428388': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".titleSection", isShadowChild:false});
} else {
 return wmjQuery(".sapSfTodoPanel").find("li:eq("+fixed._index+") .sapMFlexBoxAlignItemsStretch.sapMFlexItem")
}
},
'-1768374067': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".subinfo:eq(0)", isShadowChild:false});
} else {
	return wmjQuery(".sapSfTodoPanel").find("li:eq("+fixed._index+") .sapMTextBreakWord");
}
},
'-1726734808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:"ui5-li-custom:eq("+fixed._index+")" ,isShadowChild:false },
	{selector:".info", isShadowChild:false});
} else {
 return wmjQuery(".sapSfTodoPanel").find("li:eq("+fixed._index+") .globalLPTileBodyText:last")
}
},
'-1605675421': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".ui5-content-density-compact",
	{selector:"xweb-sidepanel" ,isShadowChild:true },
	{selector:`.container` ,isShadowChild:true });
} else {
 return wmjQuery(".sapSfTodoPanel .sapMScrollCont")
}
},
'-964044151': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+text+")");
}else{
	return wmjQuery(".sub-nav-container").find(".globalNavigationItem:directContains("+text+")");
}},
'-1777458260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1 ) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+text+")");
}else{
	return wmjQuery(".sub-nav-container").find(".surjSubTabItem:directContains("+text+")");
}
},
'-147185129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:"#popover",isShadowChild:true},
	{selector:".popover-header", isShadowChild:false});
}else{
	return wmjQuery("[id*='utilityLinksMenuId']").find(".surjUserPhotoName");
}
},
'-1291399185': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("[profile-btn]", getHeaderBar1());
	return wmjQuery(".ui5-button-root", first[0].shadowRoot);
}else{
	return wmjQuery("div.globalHeaderBar").find("#utilityLinksMenuId");
}

},
'-223409598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button", one);
}else{
	return wmjQuery("div.globalHeaderBar #bizXShellCustomHeader-BarLeft").find("#customHeaderModulePickerBtn-img");
}
},
'-1522184858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	let three = wmjQuery(".ui5-shellbar-logo", two);
	return wmjQuery(three);
}else{
	return wmjQuery("#bizXShellHomeIcon");
}
},
'-1627283589': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("ui5-static-area-item", 
	{selector:"ui5-popover",isShadowChild:true},
	{selector:"xweb-global-search-intro", isShadowChild:false},
	{selector:".searchIntroTitle", isShadowChild:true});
}else{
	return wmjQuery(".globalActionSearchIntro").find(".searchIntroTitle");
}},
'-1105193669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};


if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar", 
	{selector:"ui5-shellbar",isShadowChild:true},
	{selector:"ui5-button[icon='learning-assistant']", isShadowChild:true},
	{selector:".ui5-button-root", isShadowChild:true});
}else{
	return wmjQuery(".globalHeaderBar").find("#bizXShellHelpAndTrainingButton");
}},
'-951408431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	return wmjQuery("[role='banner']", two);
}else{
	return wmjQuery("#renderTopNavFusion div.globalNavigationContainer");
}
},
'-1987380459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if(wmjQuery("xweb-shellbar").length === 1){
	let one = wmjQuery("xweb-shellbar")[0].shadowRoot;
	let two = wmjQuery("#shellbar", one)[0].shadowRoot;
	return wmjQuery("[role='banner']", two);
}else{
	return wmjQuery(".globalHeader ");
}
},
'-138856307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:"#popover",isShadowChild:true},
	{selector:".popover-header", isShadowChild:false});
}else{
	return wmjQuery("#utilityLinksMenuId-menuPopover").find(".sapMTitle span");
}
},
'-2137753568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("[profile-btn]", getHeaderBar1());
	return wmjQuery(".ui5-button-root", first[0].shadowRoot);
}else{
	return wmjQuery("div.globalHeaderBar").find(".surjUserPhotoCircle .surjUserPhotoInner");
}

},
'-485936942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	let first = wmjQuery("#shellbar",  getHeaderBarContainer1() );
	return wmjQuery(".ui5-shellbar-overflow-container-left", first[0].shadowRoot);
}else{
	return wmjQuery(".globalHeaderBar").find("#bizXShellCustomHeader-BarLeft");
}
},
'-1843034839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+text+")");
}else{
	return wmjQuery(".sub-nav-container").find(".sapMBarChild:containsTextNode("+text+")");
}






},
'-1133849051': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
 return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};

let text = wmjQuery().identity(fixed.elemText);

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1("xweb-shellbar",
	{selector:"ui5-tabcontainer" ,isShadowChild:true },
	{selector:"li" ,isShadowChild:true }).filter(":containsTextNode("+text+")").find("div.ui5-tab-strip-itemContent");
}else{
	return wmjQuery(".sub-nav-container").find(".globalNavigationActiveItem:directContains("+text+")");
}
},
'-1173362368': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}

function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};

let text = ftHelper.unQuote(wmjQuery().identity(fixed.elemText));

if( headerCheck1() ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+")", isShadowChild:false});
}else{
	return wmjQuery("#customHeaderModulePickerBtn-menuPopover-scroll").find("a.globalMenuItem:textEquals("+text+")");
}},
'-997268128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBarContainer1(){
  return wmjQuery("xweb-shellbar")[0].shadowRoot;
}

if( headerCheck1() ){
	return wmjQuery("xweb-shellbar-search-input", getHeaderBarContainer1());
}else{
	return wmjQuery(".globalHeaderBar").find("form#bizXSearchField-F");
}
},
'-1337261409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
const text = wmjQuery().identity(fixed.btnText);	
return findShadowDomWithoutUniqueContainer_1("ui5-button[title="+text+"]",
	{selector:"button" ,isShadowChild:true })},
'-1467282916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-tabcontainer.sf_goal_comp-GoalIconTabBar",
	{selector:"div.tab-description" ,isShadowChild:true }).filter(":containsTextNode("+fixed.btnText+")").closest(".goal-tab-status")




},
'-1163755917': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
 let containers = wmjQuery(nonUniqueContainer);
 let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
 curr = last = arr[j];
 for (let i = 0; i < args.length; i++) {
 last = curr;
 if (last.length === 1 || i === 0) {
 if (args[i].isShadowChild) {
 curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
 } else {
 curr = wmjQuery(args[i].selector, last);
 }
 if (i === args.length - 1 ) {
 return curr;
 }
 }
 }
	}
 return wmjQuery();
};
	return findShadowDomWithoutUniqueContainer_1("ui5-tabcontainer.sf_goal_comp-GoalIconTabBar",
	{selector:"div.tab-description" ,isShadowChild:true }).filter("[title="+fixed.btnText+"]").prev(".tab-status-circle")



},
'-1613549246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("xweb-goal-form")[0].shadowRoot;
const second = wmjQuery("ui5-label", first).filter(":contains("+fixed.btnText+")")
return  wmjQuery("label.ui5-label-root", second[0].shadowRoot)
},
'-505104268': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[data-help-id="+fixed._parentId+"]").find("span").filter("[id="+fixed._elemId+"]");},
'-773256325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNode("+fixed.lbltxt+"):first").closest("tr").find(".valuePattern");},
'-956804096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMText").filter(":containsTextNodeIgnore("+fixed.rowtext+")").closest("td").next("td").find(".sapMText");},
'-2062766416': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workflowView").find(".pwhHeaderTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-94135673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workflowApprovalBody").find(".globalContainer .commentsContent").find("textarea.formElement");},
'-1147722665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".ectTextAreaWrapperOldValueContainer .readonly").filter(":mt_visible");},
'-1416057416': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":contains("+fixed.labelText+")").closest("tr.form_field").find("span.ectFieldshow");},
'-1137855997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-input").filter("[aria-label=" + fixed.btnText + "]")},
'-848754454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-help-id=" + dollars[0] + "] input")},
'-1422932664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:contains(2):visible")},
'-1020317743': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th:contains(" + dollars[0] + ") + td input")},
'-76848385': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".actionLinks>.sapIcon:eq(0)")},
'-1120761619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:first")},
'-115935694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapIcon[onclick*='editItem']:first")},
'-337931930': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMListTblCnt:eq(" + dollars[0] + ") input.sapMComboBoxInner:eq(" + dollars[1] + ")")},
'-1720827800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase:eq(0)")},
'-1444605706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):mt_visible")},
'-1210645916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='listbox'] a:contains(" + dollars[0] + ")")},
'-237137429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='customHeaderModulePickerBtn-menuPopover-cont'] a[href*=" + dollars[0] + "]")},
'-1451168784': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopoverCont a[href*=" + dollars[0] + "]")},
'-92163159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.bizXMenuListItem.globalMenuItem:contains(" + dollars[0] + ")")},
'-92411453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'-364348058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#customHeaderModulePickerBtn-menuPopover a[href*=" + dollars[0] + "]")},
'-1368915252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem[href*=" + dollars[0] + "]")},
'-2012863871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.bizXMLIA.bizXMenuListItem.globalMenuItem.sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIB[href*=" + dollars[0] + "]")},
'-63129479': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'-690849594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='customHeaderModulePickerBtn-menuPopover-scroll'] a[href*=" + dollars[0] + "]")},
'-831865368': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInputBaseContentWrapper:eq(" + dollars[0] + ")")},
'-1018965208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a:contains(" + dollars[0] + ")")},
'-692813809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bizXMenuListItem.globalMenuItem:contains(" + dollars[0] + ")")},
'-2091009973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup UL a[href*=" + dollars[0] + "]")},
'-1391057438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem'][href*=" + dollars[0] + "]")},
'-122987220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopoverScroll a[href*=" + dollars[0] + "]")},
'-1449615009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role=" + dollars[0] + "][href*=" + dollars[1] + "]")},
'-1012395896': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td input[type='text']:eq(1)")},
'-386062124': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenu a[href*=" + dollars[0] + "]")},
'-229345560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#customHeaderModulePickerBtn-menuPopover-scroll a:contains(" + dollars[0] + ")")},
'-1514205369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapMPopoverScroll'] a[href*=" + dollars[0] + "]")},
'-1382107868': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "][role='menuitem']")},
'-1758157327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*=" + dollars[0] + "]")},
'-10723984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapMPopoverCont'] a[href*=" + dollars[0] + "]")},
'-1510702667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "]:visible")},
'-845923012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + "):visible")},
'-339720266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive.sapMListTblRow:last input:eq(1)")},
'-573349568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='text']:first")},
'-703622711': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td b:eq(" + dollars[0] + ")")},
'-869647671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell'] input[class~=" + dollars[0] + "]:first")},
'-1358607052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "][role=" + dollars[1] + "]")},
'-326191266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalLPTile [data-tourchipid=" + dollars[0] + "]")},
'-46711731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog'] header:contains(" + dollars[0] + ")")},
'-579424310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[placeholder*=" + dollars[0] + "]:mt_visible")},
'-1667039709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] label:contains(" + dollars[1] + ")")},
'-661595881': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] a[href*='peopleprofile']")},
'-2064711739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "][style*=" + dollars[1] + "]")},
'-1690394459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='/xi/ui/peopleprofile/']")},
'-1297273125': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='xi/ui/peopleprofile/']")},
'-1016926493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapMPopoverCont'] a[href*='/xi/ui/peopleprofile/pages']")},
'-1115586173': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='peopleprofile']")},
'-1855899969': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='bizXSearchField']:eq(0)")},
'-795460725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='bizXSearchField']:eq(" + dollars[0] + ")")},
'-669757290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='apMInput sapMInputBase'] input:first")},
'-556203901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=\"dialog\"] button:first")},
'-1481240060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td b:eq(3)")},
'-408295354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") + div[class='sapUiVltCell sapuiVltCell'] input")},
'-1614870993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class~=" + dollars[0] + "] input:first")},
'-965355435': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class~=" + dollars[0] + "]:first")},
'-2016778781': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] span[class~=" + dollars[1] + "]")},
'-1417540203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] + td div input:first")},
'-771335541': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] span[class*=" + dollars[1] + "]")},
'-697495068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "]:first + td[class~=" + dollars[1] + "] input")},
'-107852074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[class~=" + dollars[0] + "]:contains(" + dollars[1] + ") input:first")},
'-2122773842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='dropDownButtonText']:eq(" + dollars[0] + ")")},
'-1686383057': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiVltCell:contains(" + dollars[0] + ") + div.sapUiVltCell:first input")},
'-6663677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] input[type=" + dollars[1] + "]")},
'-861811682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(\".sapMLabelRequired[title=" + dollars[0] + "]\") .sapMInputBaseInner")},
'-1817622946': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] input[role=" + dollars[1] + "]")},
'-1474865897': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalContainer .globalPrimaryButton")},
'-292284466': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]:contains(" + dollars[1] + ") ~ div[class='sapUiVltCell sapuiVltCell'] input:first")},
'-403317111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") ~ div[class~=" + dollars[1] + "] input:first")},
'-549633614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a span[id*='menu']")},
'-1045701262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog'] button:contains(" + dollars[0] + ")")},
'-1706367839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='EditPageEffectiveDate'] input")},
'-1880517807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='EditPageEffectiveDate'] input[role='combobox']")},
'-1617707288': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") ~ div[class='sapUiVltCell sapuiVltCell'] input:first")},
'-950997219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell'] input[class='sapMInputBaseInner']")},
'-1927710158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] a[href*=" + dollars[1] + "]:first")},
'-2034742672': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] div:contains(" + dollars[1] + ") input")},
'-1873381073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") ~ div[class~=" + dollars[1] + "]:first input")},
'-2077509544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='dialog'] div>input[id*='picker']")},
'-792408473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "] .globalPrimaryButton")},
'-500226105': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table a[href*=" + dollars[0] + "]:first")},
'-1818880474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-chipid=" + dollars[0] + "]:visible")},
'-412380439': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]:contains(" + dollars[1] + ") ~ div[class='sapUiVltCell sapuiVltCell']:first input")},
'-910431157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:mt_visible")},
'-610932222': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id='bizXShellHomeIcon'][title=" + dollars[0] + "]")},
'-2098183832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalHeader input[type=\"search\"]")},
'-1347455332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimaryButton']:last")},
'-1072319691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopover:visible")},
'-761809238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]:visible")},
'-1560599724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=" + dollars[0] + "] a[onclick*='activateMenu']:first")},
'-872707084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div:has(label:contains(" + dollars[0] + "))[class*=" + dollars[1] + "]")},
'-1408654042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[placeholder=" + dollars[0] + "]:first")},
'-2128671039': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMListTblCnt:eq(2) input.sapMComboBoxInner:eq(1)")},
'-1260686132': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[placeholder=" + dollars[0] + "]:last")},
'-1765684655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] span")},
'-1106777603': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] footer button:last")},
'-2000353877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapExtentUilibUtilEditFormGeneratorTableContainer:visible input.sapMComboBoxInner:visible:eq(3)")},
'-1821293234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name*=" + dollars[0] + "][type=" + dollars[1] + "]:visible")},
'-1359197960': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer[class='sapMPageFooter'] button:contains(" + dollars[0] + ")")},
'-652796647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog'] footer button:last")},
'-409182400': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiRespGridBreak .sapMComboBoxBaseState:eq(" + dollars[0] + ")")},
'-588135549': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name*=" + dollars[0] + "][type='submit']:visible")},
'-1023753718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=" + dollars[0] + "] a:first")},
'-1388803403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nodeContainer.subContainer:first .hoc-title-area")},
'-1609839305': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.bizXDisableMobile.sapMBarChild.sapMBtn.sapMBtnBase.surjTopNavHomeButton")},
'-127907691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMComboBoxBaseState:eq(1)")},
'-127570661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):not(:contains( )):mt_visible")},
'-842245875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer button:visible:last")},
'-281572401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:last")},
'-329966267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[id*=" + dollars[0] + "] a:first")},
'-1613264289': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input:submit:eq(" + dollars[0] + ")")},
'-692836799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:visible")},
'-267071186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input:submit:eq(3)")},
'-1795348217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-1610905138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button+button.sapMBarChild")},
'-21030562': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHeaderTB:contains(" + dollars[0] + "):last")},
'-1304130411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='dlgButton']:last")},
'-111083677': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.autocompinput:eq(" + dollars[0] + ")")},
'-265030138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] input:first")},
'-1001943791': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.globalMenuItem.tgm-menuitem.first")},
'-569244939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenuItem:visible:eq(1)")},
'-248482849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] button[class~=" + dollars[1] + "]")},
'-1792337434': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] button[class='globalRoundedCornersXSmall globalPrimaryButton']:last")},
'-1109551483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.search-box:eq(0)")},
'-1504753348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[role=" + dollars[1] + "]:first")},
'-1108423217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPrimaryButton:contains(" + dollars[0] + "):visible")},
'-370180361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='menuitem'] a[onclick*=" + dollars[0] + "]")},
'-1120899453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton:first")},
'-346483680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):mt_visible")},
'-1373405691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.search-box:eq(" + dollars[0] + ")")},
'-1171121300': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[class~=" + dollars[1] + "]:first")},
'-273079013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):not(:contains( )):mt_visible")},
'-1645741182': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='tgm-menuitem']:contains(" + dollars[0] + ")")},
'-1349550104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[class~=" + dollars[0] + "] th:contains(" + dollars[1] + ")")},
'-1066983888': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[role=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-225969657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "]:eq(0)")},
'-817149210': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar.sapMTB.sapMTB-Transparent-CTX.sapMTBInactive.sapMTBNewFlex:contains(" + dollars[0] + ")")},
'-1767049063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class^='sapMInputBaseInner']:eq(3)")},
'-678551925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td input[class*=" + dollars[0] + "]")},
'-1706007485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink.first.globalMenuItem:contains(" + dollars[0] + ")")},
'-1703894961': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):mt_visible:first")},
'-488520179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='menuitem'] a[onclick*='tgmEdit']")},
'-355748399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='writeComp ectFormFieldFocusMark comboBox writeField']:eq(" + dollars[0] + ")")},
'-1467969062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):not(:contains(Mass)):mt_visible")},
'-5624691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] a[onclick*='edit']")},
'-2115472497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='submit']:visible")},
'-1167331397': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapMPopoverCont'] li:contains(" + dollars[0] + ")")},
'-1463098681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIBTypeActive.sapMSLI:contains(" + dollars[0] + ")")},
'-1626314040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*=" + dollars[0] + "]:last")},
'-1174598681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.sapMLIBShowSeparator:contains(" + dollars[0] + ")")},
'-120437174': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListBGSolid  ul li:visible:eq(" + dollars[0] + ")")},
'-912767405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1[id='tableHeaderBarDescription']:visible")},
'-1082060392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfDropMenu a.tgm-menuitem:eq(0)")},
'-1101667243': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + ") + td input")},
'-1696260516': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='text']:eq(1)")},
'-2020941373': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInputBaseContentWrapper:eq(1)")},
'-374993304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + ") ~ td input")},
'-86574183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div input[id*=" + dollars[0] + "]:first")},
'-1538988705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + ")+td input")},
'-340526514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class*='globalPrimaryButton']")},
'-1234897859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='dialog'] li:contains(" + dollars[0] + ")")},
'-1977766719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea:visible:eq(0)")},
'-2044341966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:contains(" + dollars[0] + "):last")},
'-1720769055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "]:first")},
'-1332289512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:last")},
'-2041860879': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] button[class='globalRoundedCornersXSmall globalPrimaryButton']")},
'-1079761864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*=" + dollars[0] + "]:first")},
'-318144996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[onclick*='click']")},
'-62534988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + "):not(:contains(Journalize)):mt_visible")},
'-157436682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id^='__box']:eq(1)")},
'-2077719170': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapExtentUilibUtilEditFormGeneratorField:has(bdi:contains(" + dollars[0] + ")) input")},
'-186584812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(.sapMLabel[title=" + dollars[0] + "]) .sapMComboBoxInner")},
'-1065842166': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalContainer button:contains(" + dollars[0] + ")")},
'-1615201736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=" + dollars[0] + "] a:contains(" + dollars[1] + ")")},
'-156674764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class='globalRoundedCornersXSmall globalPrimaryButton']")},
'-1284388538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class~=" + dollars[0] + "]:last")},
'-2117849000': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class^='sapMInputBaseInner']:eq(2)")},
'-1147275717': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPopoverCont:visible li[class*='sapMLIBTypeActive']:eq(" + dollars[0] + ")")},
'-780558869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type*=" + dollars[0] + "]:visible")},
'-1264014210': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1.tgm-wizard-title:contains(" + dollars[0] + "):visible")},
'-1097895775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.formFieldLabel:contains(" + dollars[0] + ")+td textarea")},
'-476110449': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='objectPage-anchBar'] button:contains(" + dollars[0] + ")")},
'-313513830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase.sapUxAPAnchorBarButton:eq(" + dollars[0] + ")")},
'-1668051865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#req_supportingDocs div")},
'-531865069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#req_supportingDocs .multi-attachment")},
'-1242330213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem[title=" + dollars[0] + "]")},
'-1533223503': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#req_supportingDocs>.multi-attachment")},
'-2022455748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='/sf/pmreviews']")},
'-1768031740': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopoverScroll a[href*='sf/pmreviews']")},
'-832227822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=" + dollars[0] + "].sapUxAPAnchorBarButton:eq(" + dollars[1] + ")")},
'-1576595276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem:eq(3)")},
'-2076330636': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:eq(" + dollars[0] + ")")},
'-2057693815': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.moduleDropDownPopup a[href*='pmreviews']")},
'-171481972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPrimaryButton:contains(" + dollars[0] + "):not(:contains(nature))")},
'-558662619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:last")},
'-1527853575': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title=" + dollars[0] + "] [id*='__label']")},
'-793170624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[style*=" + dollars[0] + "]:eq(1)")},
'-67701750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tgm-objective-row.tgm-v12-polt-first-col:eq(" + dollars[0] + ")")},
'-554657172': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".active .globalPrimaryButton:eq(" + dollars[0] + ")")},
'-529188961': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='objectPage-anchBar']:eq(" + dollars[0] + ")")},
'-991148673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection .sapMBtn:has(.sapMBtnEmphasized)")},
'-803291391': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] li:last")},
'-193862181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.dropDownButtonText:eq(0)")},
'-186735622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.headerButton a[role=" + dollars[0] + "]:eq(0)")},
'-1634615306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.headerButton a[role='button']:eq(" + dollars[0] + ")")},
'-1334312090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell:contains(" + dollars[0] + ")~.sapUiVltCell")},
'-1182486869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.link:contains(" + dollars[0] + ")")},
'-1058668538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPlacematLink.pmIconTextLink.rightLink:eq(" + dollars[0] + ")")},
'-113111800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span select:visible:last")},
'-391692744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalIconFont1Container:first:visible")},
'-1755511168': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select:visible:eq(1)")},
'-1437130015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiVltCell:contains(" + dollars[0] + "):eq(" + dollars[1] + "):visible")},
'-1099421844': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*=" + dollars[0] + "][role=" + dollars[1] + "]")},
'-1344430859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInput:visible:eq(" + dollars[0] + ")")},
'-1219156729': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class^='sapUiVltCell']:contains(" + dollars[0] + ") ~ div[class^='sapUiVltCell']")},
'-1274968103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiVltCell:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-243241267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.buttonDefault:eq(" + dollars[0] + ")")},
'-1989549160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".link:contains(" + dollars[0] + "):visible")},
'-1814315071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalSecondaryButton:eq(" + dollars[0] + ")")},
'-1617524413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall[type=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-813290648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalSecondaryButton.buttonDefault:eq(0)")},
'-1441176730': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + "):enabled")},
'-1570213874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='portlet']:eq(0)")},
'-797137522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalIconFont1Container.toolbarButtonWithLabel.toolbarButton:eq(0)")},
'-1443223972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalIconFont1Container.toolbarButtonWithLabel.toolbarButton:eq(" + dollars[0] + ")")},
'-1095352276': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td>textarea:first")},
'-925713864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='portlet']:eq(" + dollars[0] + ")")},
'-1289874865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#rsnVacancy input")},
'-2070686395': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfCollapse:eq(" + dollars[0] + ")")},
'-102683349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfCollapse:eq(0)")},
'-208790258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='sfToolbar'] a:first")},
'-398742428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".toolbarButton:has(.icon_save)")},
'-1325219746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#sourcerTeam_operator_selection .composeView")},
'-97655344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#recruiterTeam_operator_selection .composeView")},
'-2086433901': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class='globalIconFont1Container toolbarButtonWithLabel toolbarButton']:contains(" + dollars[0] + ")")},
'-1288851356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#hiringManagerTeam_operator_selection .composeView")},
'-982217026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.hd a:contains(" + dollars[0] + ")")},
'-341334616': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] em:first")},
'-1673247721': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.globalSecondaryButton[aria-label*=" + dollars[0] + "]")},
'-1554449713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sfTH:contains(" + dollars[0] + ") ~ td input")},
'-1404711231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select:visible:eq(2)")},
'-1305064183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[class='globalIconFont1Container toolbarButtonWithLabel toolbarButton']:first")},
'-1819294233': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role=" + dollars[0] + "]>a:eq(1)")},
'-390776413': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='hd'] a[class='globalIconFont1Container toolbarButtonWithLabel toolbarButton']:first")},
'-1624663486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalSecondaryButton.buttonDefault:eq(" + dollars[0] + ")")},
'-1898796399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='globalIconFont1Container']:first")},
'-998895511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[href*=" + dollars[1] + "]:last")},
'-2003925229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sfTH:contains(" + dollars[0] + ")~td input")},
'-907494343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "][role='link']")},
'-1314169347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td:contains(" + dollars[0] + ")+td>input")},
'-920079845': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[title*=" + dollars[1] + "]:last")},
'-592610410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel.sapUiSelectable:contains(" + dollars[0] + ") bdi")},
'-898548299': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("BDI:contains(" + dollars[0] + "):eq(" + dollars[1] + ")")},
'-608082277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".jobReqTitleBarLinkWrapper.floatleft:eq(" + dollars[0] + ")")},
'-1010851565': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBtnCustomIcon.sapMBtnIcon.sapMBtnIconLeft.sapUiIcon.sapUiIconMirrorInRTL:eq(" + dollars[0] + ")")},
'-1065546400': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.colGroupHeader_rt:contains(" + dollars[0] + ")")},
'-984460331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] li:first + li")},
'-525388505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[id*=" + dollars[0] + "] textarea[id*=" + dollars[1] + "]:last")},
'-1945218025': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3:contains(" + dollars[0] + "):visible")},
'-162634267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='dlgButton']:contains(" + dollars[0] + ")")},
'-1942314167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapIcon:contains()")},
'-887292695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] select:first")},
'-636829123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".surjTopNavHomeButton .sapMBtnIconFirst .sapMBtnIcon")},
'-2077499064': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#groupedStatusDiv .sfDropDownContainer")},
'-1623846489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class='globalRoundedCornersXSmall globalPrimaryButton']:contains(" + dollars[0] + ")")},
'-2055562002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id=" + dollars[0] + "]:first")},
'-893703102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.ectFormFieldBorder.globalRoundedCorners [aria-label=" + dollars[0] + "]")},
'-1920614167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(9)")},
'-2102433904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span:contains(" + dollars[0] + ") button:last")},
'-1432011876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='sfDialogBoxButtonWrapper active'] button[class~=" + dollars[0] + "]:last")},
'-503314209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='sfDialogBoxButtonWrapper active'] button[class='globalRoundedCornersXSmall globalPrimaryButton']:last")},
'-703712458': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:has(img[src*=" + dollars[0] + "]):visible")},
'-469300809': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"sfOverlayMgr\"] DIV.globalCallout.calloutPopupWrapper")},
'-1574500077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"content\"]:eq(0)")},
'-2076676147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "][style*='display: block']")},
'-341029296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "] button:last")},
'-613447196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + ")")},
'-446134348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*='_wrapper']:eq(" + dollars[0] + ")")},
'-1387439945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=\"content\"]:eq(" + dollars[0] + ")")},
'-1083463420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='buttonset sfDialogBoxButtonWrapper active'] button[id*='dlgButton']:first")},
'-799592485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "][id*='text']:last")},
'-1081294332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] UL")},
'-324180761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUshellTileContainerHeader:has([title*=" + dollars[0] + "])")},
'-317287396': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapUshellTileContainerHeader']:visible[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1822857392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + "):visible")},
'-1304558380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapUshellTileContainerHeader']:visible[class*='sapUshellTileContainerHeader']:eq(" + dollars[0] + ")")},
'-1955383996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody[id*='-tblBody']:first td[class~=" + dollars[0] + "]:first")},
'-734979814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#groupedStatusDiv span")},
'-685772166': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#groupedStatusDiv>.sfDropDownContainer")},
'-1345909679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button#wizNextButtonedit:visible")},
'-2051814621': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class~=" + dollars[0] + "][title=" + dollars[1] + "]:last")},
'-1935640522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nodeContainer:visible:first")},
'-409603888': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] span[class='sfDropDownContainer']")},
'-1460901743': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("Span[class*=\"sfDropDownContainer\"]:eq(" + dollars[0] + ")")},
'-590123344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nodeContainer.subContainer:eq(" + dollars[0] + ")")},
'-252692830': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton.tgm-v12-wizard-btn.globalHumanistText:contains(" + dollars[0] + "):visible")},
'-1499576177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] button[title=" + dollars[1] + "]")},
'-674115304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalPrimaryButton.tgm-v12-wizard-btn.globalHumanistText:contains(" + dollars[0] + ")")},
'-1648613302': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody[id*=" + dollars[0] + "]:first td[class~=" + dollars[1] + "]:first")},
'-1526936535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tbody[id*=" + dollars[0] + "]:last td[class~=" + dollars[1] + "]:first")},
'-1392166434': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#edit.wizContainer button[title=" + dollars[0] + "]")},
'-644886198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sapMListTblCell.sapMListTblCellNoData")},
'-803843216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sfDropDownContainer:eq(" + dollars[0] + ")")},
'-97496777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='wizNextButtonedit']:visible")},
'-895258073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*=" + dollars[0] + "]:last")},
'-486475019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button#wizNextButtonedit.globalPrimaryButton")},
'-1287112081': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(02)")},
'-969123470': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] button:contains(" + dollars[1] + ")")},
'-973090175': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.wizFooter button[id='wizNextButtonedit']")},
'-894234535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.wizFooter button[id=" + dollars[0] + "]")},
'-994660642': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='text']:eq(3)")},
'-1917970542': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfDialogBoxButtonWrapper.active .globalPrimaryButton")},
'-1713491354': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id*='cont']:eq(" + dollars[0] + ")")},
'-1673631972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + ")")},
'-533275906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(19)")},
'-256303566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(20)")},
'-1404573805': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(21)")},
'-1602856087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class*='tgm-objective-row'] a[onclick*='activateMenu']:first")},
'-1026296785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalRoundedCornersXSmall globalPrimaryButton']:contains(" + dollars[0] + ")")},
'-1361741469': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#formListHeaderRow th:eq(0)")},
'-1170406750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.ectFormFieldFocusMark.comboBox:last")},
'-635356476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] input[id*='write']")},
'-923280927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label:contains(" + dollars[0] + ")+input")},
'-246891637': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[class~=" + dollars[0] + "] span[class~=" + dollars[1] + "]")},
'-163904259': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#tablist tr:eq(" + dollars[0] + ")")},
'-881797821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPopoverCont:visible li[class*=" + dollars[0] + "]:eq(2)")},
'-1427356902': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table[role=\"tabpanel\"] tr:eq(" + dollars[0] + ")")},
'-2036580088': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sfPeopleProfileBlockTitle']:contains(" + dollars[0] + ") button[title=" + dollars[1] + "]")},
'-2121409934': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='sapUiRespGridSpanL']:contains(" + dollars[0] + "):last")},
'-49713364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternActionButton[title=" + dollars[0] + "]:visible")},
'-54281492': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr#formListHeaderRow th:first")},
'-1910138532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[class~=" + dollars[0] + "] span[class='sfDropDownContainer']:first")},
'-1612971230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='listbox'] li:contains(" + dollars[0] + "):last")},
'-1918405091': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle:contains(" + dollars[0] + ") .sapMBtn[title=" + dollars[1] + "]")},
'-175067126': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*=" + dollars[0] + "]:eq(0)")},
'-1162006558': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class='globalRoundedCornersXSmall globalPrimaryButton']:contains(" + dollars[0] + "):last")},
'-1471413608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle:has(.sapExtentUilibFormPatternBlockTitle:contains(" + dollars[0] + ")) .sapMBtn[title=" + dollars[1] + "]")},
'-258364984': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiRespGridSpanL3:contains(" + dollars[0] + ")")},
'-1387691246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle:contains(" + dollars[0] + ") button[title=" + dollars[1] + "]")},
'-1632543401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sf-combo-listselect:visible")},
'-1396290181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='buttonset sfDialogBoxButtonWrapper'] button[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1772084518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*='cell tableHeaderLabel']:eq(0)")},
'-695570746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-help-id*=" + dollars[0] + "]:last")},
'-166230075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUxAPObjectPageSubSectionHeaderTitle:contains(" + dollars[0] + ")")},
'-1696398705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.cell.tableHeaderLabel:contains(" + dollars[0] + ")")},
'-206113220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("TR[id=\"formListHeaderRow\"] TH:nth-of-type(" + dollars[0] + ")")},
'-517531804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:contains(" + dollars[0] + "):last")},
'-1189000148': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".titleOnLeftLayout [aria-level=\"4\"]:eq(" + dollars[0] + ")")},
'-1758440711': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='__section'].sapUxAPObjectPageSubSectionHeaderTitle:contains(" + dollars[0] + ")")},
'-546353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#formListHeaderRow .cell:first")},
'-1357366892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-help-id=" + dollars[0] + "]:last")},
'-789361287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=" + dollars[0] + "].sapUxAPObjectPageSubSectionHeaderTitle:contains(" + dollars[1] + ")")},
'-988189477': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUxAPObjectPageSubSectionHeaderTitle:contains(" + dollars[0] + "):visible")},
'-1414671178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.formFieldLabel:has(label:contains(" + dollars[0] + "))~td div")},
'-2005875898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "] button:contains(" + dollars[1] + ")")},
'-1389935782': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.formFieldLabel:contains(" + dollars[0] + ")+td div:first")},
'-955553795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase.sapMBtnDisabled")},
'-143151245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=" + dollars[0] + "].sapUxAPAnchorBarButton:eq(2)")},
'-1580034245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea.sapMTextAreaInner:first")},
'-721462982': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe[id*='iframe']:visible")},
'-1624617977': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarChild.sapMBtn.sapMBtnBase.sapMBtnDisabled:visible")},
'-2135017885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase.sapMBtnDisabled:visible")},
'-1556688938': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menuLink.viewRequisition.last.globalMenuItem:contains(" + dollars[0] + ")")},
'-1618863586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class='buttonset sfDialogBoxButtonWrapper active'] button:contains(" + dollars[0] + ")")},
'-715512038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".aquabtn .globalPrimaryButton")},
'-1948958359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cell.tableHeaderLabel:first")},
'-1010556835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalRoundedCornersXSmall.globalPrimaryButton:contains(Go)")},
'-1652261646': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] H1")},
'-1033235219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='objectPage-anchBar']:eq(3)")},
'-1235415250': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cell.tableHeaderLabel:eq(" + dollars[0] + ")")},
'-1472003532': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.headerButton a[role='button']:eq(0)")},
'-1046137798': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle:contains(" + dollars[0] + "):visible")},
'-682679847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] div[class~=" + dollars[1] + "]").filter(":contains(" + dollars[2] + ")");},
'-1028795072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#bizXShellCustomHeader-BarLeft .bizXShellDropMenuButton")},
'-1084075803': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bizXDisableMobile.bizXShellDropMenuButton.sapMBarChild.sapMBtn.sapMBtnBase")},
'-1318315113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.bizXDisableMobile.bizXShellDropMenuButton.sapMBarChild.sapMBtn.sapMBtnBase")},
'-1523182722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] a:contains(" + dollars[1] + ")")},
'-1404577011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section:has(div[role='toolbar']:contains(" + dollars[0] + ")):last input:visible:eq(" + dollars[1] + ")")},
'-2118616922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] TABLE TBODY TH:contains(" + dollars[1] + ")")},
'-123597554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem:contains(" + dollars[0] + ")")},
'-1017468683': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenuItem:contains(" + dollars[0] + "):visible")},
'-1344517940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='globalMenuItem']:contains(" + dollars[0] + ")")},
'-1314704914': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:visible")},
'-1595470966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class*=" + dollars[1] + "]")},
'-560378325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "]:visible")},
'-497592454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapuiVlt:contains(" + dollars[0] + ") .sapMInputBaseInner:eq(" + dollars[1] + ")")},
'-1670485599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input.sapMInputBaseInner:eq(" + dollars[0] + ")")},
'-1178473061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*=" + dollars[0] + "][class*=" + dollars[1] + "]")},
'-1439823314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name=" + dollars[0] + "]:visible")},
'-1942386078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table input[name*=" + dollars[0] + "]")},
'-1244830398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase:eq(" + dollars[0] + ")")},
'-1525201353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapuiVlt:contains(" + dollars[0] + ") .sapMInputBaseContentWrapper.sapMInputBaseHasEndIcons:eq(" + dollars[1] + ")")},
'-170127108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] input")},
'-1370027863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBarChild.sapMBtn.sapMBtnBase:eq(1)")},
'-1494281504': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div [class*=" + dollars[0] + "]")},
'-530805073': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='text']:eq(" + dollars[0] + ")")},
'-270549116': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMBarLeft button:visible:last")},
'-663774513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*='button']:eq(" + dollars[0] + ")")},
'-1670137267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-649048556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class*=" + dollars[1] + "]:first")},
'-1243077862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='toolbar'] button[title=" + dollars[0] + "]")},
'-362501666': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button:first")},
'-49900393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMDialog button:visible:last")},
'-1512073776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class~=" + dollars[1] + "]:first")},
'-716482331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-413247184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button:eq(" + dollars[1] + ")")},
'-17075338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] button[class~=" + dollars[1] + "]")},
'-439561746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem']:contains(" + dollars[0] + "):visible")},
'-1683329578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role=\"menuitem\"]:contains(" + dollars[0] + ")")},
'-1502637319': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem']:contains(" + dollars[0] + "):mt_visible")},
'-335179186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[title*=" + dollars[0] + "]:mt_visible")},
'-1003114931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] input[class~=" + dollars[1] + "]")},
'-1443155202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class~=" + dollars[0] + "][id*=" + dollars[1] + "]:last")},
'-1406067774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1983217551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] button[class*=" + dollars[1] + "]")},
'-1642413605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id*=" + dollars[0] + "].sapMBarChild.sapMBtnBase")},
'-1643335419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[class*=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1227206156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] button:first + button")},
'-1434524292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell:has(.sapMLabel[title=" + dollars[0] + "]) + .sapUiVltCell .sapMComboBox")},
'-1955681561': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] div[title=" + dollars[1] + "]")},
'-1485297585': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "]:contains(" + dollars[1] + ") + div")},
'-1353601567': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLIB.sapMLIB-CTX.sapMLIBFocusable.sapMLIBShowSeparator.sapMLIBTypeInactive.sapMListTblRow:last .sapMInputBaseInner:eq(" + dollars[0] + ")")},
'-994769737': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has([class*=" + dollars[0] + "])")},
'-708389886': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "] a:contains(" + dollars[1] + ")")},
'-1935179750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'-955083503': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[title=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-1092763703': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li:contains(" + dollars[0] + "):visible")},
'-1689434707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has(span[class*=" + dollars[0] + "])")},
'-68007886': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalPlacematAction:eq(0)")},
'-1832250478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] li:first + li a")},
'-320609725': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.menuLink:contains(" + dollars[0] + ")")},
'-1272742336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id=" + dollars[0] + "] input[class='sapMInputBaseInner']")},
'-72886990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection div[role='toolbar'] button")},
'-1615594502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] div>input[id*='picker']")},
'-1945170527': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td input[type=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-2066159935': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.tgm-action-link:nth-child(" + dollars[0] + ") > a:nth-child(1)")},
'-1272807712': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href*=" + dollars[0] + "][class*=" + dollars[1] + "]")},
'-1770245364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role=" + dollars[0] + "]:contains(" + dollars[1] + "):visible")},
'-868326461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=" + dollars[0] + "]:visible")},
'-1043269905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class~=" + dollars[0] + "]:visible")},
'-1392878951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("DIV[id=" + dollars[0] + "] TABLE TBODY A:contains(" + dollars[1] + ")")},
'-1291993995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td a:contains(" + dollars[0] + ")")},
'-1957128664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField:has(\".sapMLabel[title=" + dollars[0] + "]\") .sapMComboBoxBase")},
'-771262115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id=" + dollars[0] + "] a[href*=" + dollars[1] + "]")},
'-200778163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField.sapUiVlt.sapuiVlt:contains(" + dollars[0] + ") .sapMInputBase.sapMInputBaseHeightMargin")},
'-213836910': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMComboBox:eq(" + dollars[0] + ")")},
'-1975125063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[class~=" + dollars[1] + "]")},
'-1400296860': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[title*=" + dollars[0] + "]:eq(0)")},
'-246932587': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a:has(span:contains(" + dollars[0] + "))")},
'-750447353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] a[title=" + dollars[1] + "]")},
'-1719224612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.field_label:contains(" + dollars[0] + ") ~ td.field_value span[id*='fieldFocusMark']")},
'-895310838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='ectFormFieldBorder']:eq(" + dollars[0] + ")")},
'-1435998196': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sfoverlaycontainer span.writeComp:eq(" + dollars[0] + ")")},
'-929563352': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "] li:contains(" + dollars[1] + ")")},
'-2080444855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea:visible:eq(" + dollars[0] + ")")},
'-1298513450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=" + dollars[0] + "][value=" + dollars[1] + "]")},
'-755006985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label:contains(" + dollars[0] + ") + .field_value .writeComp")},
'-1424450226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter button:visible:eq(" + dollars[0] + ")")},
'-2136815241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1[class*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-307356708': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea[id*=" + dollars[0] + "]:visible")},
'-458728100': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=" + dollars[0] + "] button[onclick*=" + dollars[1] + "]")},
'-806431480': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[value=" + dollars[0] + "]:visible")},
'-63807381': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='menuLink globalMenuItem']:contains(" + dollars[0] + ")")},
'-848529341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalLPTileContent.sapSfHp3DT.sapSfHp3Tile.sapUshellTileBase:contains(" + dollars[0] + ")")},
'-1865490311': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[value*=" + dollars[0] + "]:visible")},
'-643860705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type='text']:eq(4)")},
'-1737471483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1:visible:contains(" + dollars[0] + ")")},
'-1365270940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] textarea[id*=" + dollars[1] + "]")},
'-1381348038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='heading']:contains(" + dollars[0] + ")")},
'-1373218019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type*='submit'][name*=" + dollars[0] + "]")},
'-813615334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[class*='globalPrimaryButton']:eq(" + dollars[0] + ")")},
'-1368986794': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer button:eq(" + dollars[0] + ")")},
'-1319888368': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer.sapMPageFooter button:eq(" + dollars[0] + ")")},
'-758364487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapExtentUilibEditDialog:contains(" + dollars[0] + ") button:has(span:contains(" + dollars[1] + "))")},
'-37309361': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='sapUiVltCell sapuiVltCell']:contains(" + dollars[0] + ") ~ div[class='sapUiVltCell sapuiVltCell']:first div[class*=" + dollars[1] + "]")},
'-1877452244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-1400598817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.globalMenuItem:visible:eq(" + dollars[0] + ")")},
'-1057173865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class~=" + dollars[0] + "]:contains(" + dollars[1] + ")")},
'-1276083702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class~=" + dollars[0] + "] li:contains(" + dollars[1] + ")")},
'-73057608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=" + dollars[0] + "] li:contains(" + dollars[1] + ")")},
'-2057398771': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.globalContainer span:contains(" + dollars[0] + ")")},
'-112851597': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td a[onclick*=" + dollars[0] + "]")},
'-1100894098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=" + dollars[0] + "] input[class~=" + dollars[1] + "]")},
'-971354989': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class~=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-930273282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[name=" + dollars[0] + "]:first")},
'-1103525241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.globalPrimaryButton.tgm-v12-wizard-btn.globalHumanistText")},
'-1133657795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cnjr_icon_button.globalPrimaryButton:last")},
'-1347363985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='productView'] a[href*=" + dollars[0] + "]:last")},
'-2076078309': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class='panelButtonLayout'] button[class~=" + dollars[0] + "]:first")},
'-1492116286': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class~=" + dollars[0] + "]:last input")},
'-572460398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea[id*='xmetric']:last")},
'-42729471': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[id*=" + dollars[0] + "]:first")},
'-1953938841': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a span em span:contains(" + dollars[0] + "):first")},
'-2054320013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.adminHomepagePortletHeader:contains(" + dollars[0] + ") a:contains(" + dollars[1] + ")")},
'-439295785': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a span span:contains(" + dollars[0] + ")")},
'-1736073862': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div#surjSubTabBar a[href*=" + dollars[0] + "]")},
'-859279040': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=menuitem]").filter("[data-autoid="+fixed._tgtName+"]");},
'-654094754': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("bdi").filter(":containsTextNode("+fixed.btnTxt+")").closest("button");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-297712689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery("[class*=PageEffectiveDate]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span.sapUiIcon[id*=__picker]");
if (oldElem.length) {
  return wmjQuery(oldElem);
} else if (ftHelper.unQuote(wmjQuery().identity(fixed.elemTxt))  === "When would you like your changes to take effect?") {
  const newElem = wmjQuery("[class*=PageEffectiveDate]").filter(":containsTextNodeIgnore(When should these changes take effect?)").find("span.sapUiIcon[id*=__picker]");
  return wmjQuery(newElem);
} else {
  return wmjQuery();
}},
'-2108745407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMVBox ").filter("[data-autoid='"+fixed._tgtLabel+"']").find(".sapMFlexItem").find(".sapMTitleNoWrap");
},
'-1841096102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role=treeitem]").filter("[data-autoid='"+fixed._tgtLabel+"']").find("div[id*=content]");
},
'-738309318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("span.revolutionTSInfoLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfo,.revolutionTSInfoSection").parent().next().find("span.revolutionTSDatePickerWrapper");
if (elem.length)
 {return elem;} 
return wmjQuery("span.revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("span.revolutionTSInfoLabel").filter(":containsTextNodeIgnore("+ fixed.titleText +")").next().find(".revolutionTSInfoInput");

},
'-548911102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon").filter("[name='"+fixed._elemIconName+"']").parent();},
'-896465096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-dynamic-content").filter(":containsTextNode("+fixed.labelText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("label.ui5-label-root",firstShadow): wmjQuery();},
'-1816618612': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table[name='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".goalFormWidget-inputTable-columnLabelRequired",secondShadow) : wmjQuery();},
'-835859860': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table[id='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".goalFormWidget-inputTable-columnLabelRequired",secondShadow) : wmjQuery();},
'-1651762571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table[id='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".columnContainer",secondShadow).filter(":containsTextNode("+fixed.tgtElemText+")").find("span") : wmjQuery();},
'-1674169225': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardTitle = wmjQuery().identity(fixed.titleTxt);
return wmjQuery("[id$='contentTitle']:contains(" + cardTitle + ")").parents("[class^='CardWrapper_root']").find(fixed._tag + "[class^='" + fixed._class + "']");},
'-1279664832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardWrapper = wmjQuery("[class^='CardTitle_headerText']:contains(" + fixed.cardTitle + ")").closest("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	return wmjQuery("[id$='contentTitle']:contains(" + fixed.contentTitle + ")").closest(cardWrapper).find(fixed._tag + "[class^='" + fixed._class + "']");
} 
return wmjQuery();},
'-879942386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let tgtContainer = wmjQuery("[role*='dialog']").find('h2')
if(tgtContainer.length > 0){
	return tgtContainer.find(fixed._tgtTag).eq(fixed._index);
}
return wmjQuery();
},
'-1921107147': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMLabelTextWrapper").filter(":containsTextNode("+fixed.title+")").closest("div.sapExtentUilibUtilEditFormGeneratorField").find("input");
},
'-162751296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*=text]").filter(":textEquals(" + fixed.tgtText + ")");},
'-558798267': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfDropMenu").find("a[class*=" + dollars[0] + "]");},
'-1016624163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+ fixed.btnText +")").parent(".sapUxAPObjectPageSubSectionHeader");},
'-102320784': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")").closest("[class*='CustomCard_root']");
if (elem.length)
 {return elem;} 
return wmjQuery("[id*='sectionLabel']").filter(":containsTextNode("+fixed.formHeader+")").closest("[class*='HomepageSection_sectionWrapper']").find("[data-testid='contentTitle']").filter(":containsTextNode("+fixed.elemText+")").closest("[data-testid='CustomCard_root']");
},
'-484225113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.selectAreaLabel").filter(":containsTextNode("+ fixed.btnText +")").closest(".content").prev().find("a.topBar_label")},
'-1249268691': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+ fixed.btnText +")").closest(".round.sysmsg.confirm");},
'-1699629398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#myTeamDialog").find("[data-testid='teamListContainer']");},
'-94323071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":contains(" + fixed.headerText + ")").closest(".sapFCard");
},
'-11482731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header.sapMDialogTitle").find("span").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("h2").parent();},
'-1939692205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panelHeaderTitle").filter("[title=" + fixed.titleText + "]").closest(".panelHeader").next().find(".commentsSection .ectFormFieldBorder");
},
'-1848712301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.dialogBoxWrapper").find(".panelHeaderTitle").filter(":containsTextNode("+ fixed.btnText +")");},
'-1436643112': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.globalMenu").find("a").filter("[title=" + fixed.titleText + "]");},
'-1965052822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode("+ fixed.btnText +")").closest(".sapMDialog").find("span.sapWorkflowParticipantsTitle");},
'-1640288820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMITBBadgeHolder").filter(":containsTextNode("+ fixed.btnText +")").closest(".sapMITH").next().find(".sapMFlexBoxAlignContentStretch").find(".catalogPanelTitle bdi");},
'-2083379617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest(".sapMBarPH:not(.sapUiInvisibleText)");},
'-783782945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find(".sapMSelectListItemText").closest(".sapMSltLabel");},
'-333166996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.alterRow").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("button.new").filter(":mt_visible").parent();},
'-692493431': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pwhHeaderTitle").filter(":directContains("+fixed.elemText+")").filter(":last");},
'-278218647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine").filter(":directContains("+fixed.contentText+")").closest(".sapMLIBContent");},
'-2101392254': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".if-add:visible:first").filter(":containsTextNode("+ fixed.btnText +")").closest(".dataRow, .dataRowAlt");},
'-1693275709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUshellTileInner").filter("[title="+fixed.titleAttr+"]").closest("li").find("[data-chipid*='info-nonManagerOrgChart']");},
'-890002915': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*=label]").filter("[title="+fixed.tgtTitle+"]");},
'-903602990': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul.sapMListItems").find(".sapMSLITitleOnly").filter(":containsTextNode("+ fixed.btnText +")").filter(":mt_visible")},
'-115146487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSEmployeeColumn").closest(".revolutionTSResultTableHeader").find(".revolutionTSCheckBoxItemUncheck");},
'-1871719838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.headerAttr+"]").closest(".globalPortletBodyBackground").find(".commentboxlabel").find("label");},
'-330360889': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class^='HomepageSection_sectionTitle']").filter(":containsTextNode("+fixed.sectionTitle+")").closest("[class^='HomepageSection_sectionWrapper']");},
'-1108282765': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='actionChipButton']").filter("[data-help-id="+fixed._tgtData+"]");},
'-2109105084': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='button']").filter("[data-help-id="+fixed._tgtId+"]");},
'-1048970856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-help-id='"+fixed._dataAttr+"']").find(".compTopShowMenuItems");},
'-370278079': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectitle']").filter(":containsTextNodeIgnore("+fixed.sectTitleText+")").closest(".pmPortletContainer").find("label.lbspace").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input");},
'-1138186331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapMLabel").filter(":containsTextNode("+ fixed.titleText +")").closest(".sapUiRespGridSpanL3");},
'-968171436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='sectTitle']").filter("[title="+fixed.tgtTitle+"]").closest("div.pmuFloatContainer").find(".nrte_showScrollbar");},
'-1757564625': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.lab").filter(":containsTextNode("+fixed.tgtLabel+")").closest("tr.propTable").find("td.val");},
'-644364178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.bizXMenuPopover").find("a.globalMenuItem").filter(":containsTextNode("+fixed.elemText+")");},
'-1269467555': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVlt").filter(":containsTextNodeIgnore("+fixed.titleText+")").find("span").filter("[id$="+fixed._partialId+"]");},
'-1833005329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const tgtOptions = wmjQuery("ul[id$='-listUl']").find(".sapMSLITitleOnly").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
return tgtOptions.length > 1 ? tgtOptions.filter(":mt_visible") : tgtOptions;},
'-761871569': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header.sapMDialogTitle").find("span").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-724924680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#__dialog5-title-inner").filter(":containsTextNode("+fixed.elemText+")");},
'-1468186486': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const dialogElem = wmjQuery("ui5-dialog").filter("[data-testid="+fixed._dialogDataIdAttr+"]");
if (dialogElem.length) {
  const shadowInputElem = dialogElem.find("ui5-input").filter("[id="+fixed._ui5InputIdAttr+"]");
  return shadowInputElem.length ? wmjQuery("input",shadowInputElem[0].shadowRoot) : wmjQuery();
}
return wmjQuery();},
'-2018175550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header.sapMDialogTitle").find("span").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-1762848251': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[id="+fixed._tgtId+"]").find(".tgm-category-name");},
'-765483137': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelContent").find(".sapExtentUilibUploadCollection").filter("[data-help-id="+fixed._lmAttr+"]"); },
'-2008131292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.tgtElemHeaderTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("bdi[id*='label']").filter(":containsTextNode("+fixed.elemText+")");},
'-2060866922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiVltCell").find("span.sapMLabel").filter(":containsTextNode("+fixed.tgtLmText+")");},
'-1644892488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.tgtLmText+")").parents("[class*='Field']").find(".sapMLabel");},
'-1953450552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBarContainer").filter(":containsTextNode("+fixed.LmOuterHeader+")").closest("[role='dialog']").find(".sapExtentUilibUtilEditFormGeneratorFGPanel").closest("section"); },
'-484385811': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.lmBdiText+")").closest(".sapExtentUilibEditPageEffectiveDateVLToolbar").find(".sapMInputBaseInner"); },
'-1517313645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='sectTitle_anchor']").filter(":containsTextNodeIgnore("+fixed.globalSectTitle+")").closest(".pm2PortletContainer").find("[id^='sectTitle']").filter(":containsTextNodeIgnore("+fixed.sectTitleText+")").closest(".pm2SectionOverallComment").find(".nrte_content_webkit");},
'-684149796': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadow = wmjQuery("#DelegateWorkflowsDialog")[0];
const shadowElem = firstShadow && firstShadow.shadowRoot;
return wmjQuery(".ui5-popup-root",shadowElem);},
'-550465422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id^='reportListPageView']").find("bdi").filter(":containsTextNodeIgnore("+fixed.bdiText+")");},
'-1629172695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapMBarContainer").find(".sapMTitle");},
'-1880551919': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageFooter").find("button").filter("[title="+fixed.elemAttr+"]");},
'-1992246016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='button']").filter(":containsTextNode("+fixed.elemText+")");},
'-1475651773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletContainer").filter(":containsTextNode("+fixed.labelTxt+")").find("span.routeFormtoText");},
'-241053160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.reportNamelnk").filter(":containsTextNode("+fixed.tgtText+")");},
'-1900192710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const questionAnswerElem = wmjQuery("question-answer").filter("[question='"+fixed._questionAnswerQuestionAttr+"']");
if (questionAnswerElem.length) {
  const parentUi5Elem = wmjQuery("ui5-button[accessible-name='"+fixed._ui5buttonAccessibleNameAttr+"']",questionAnswerElem[0].shadowRoot);
  return parentUi5Elem.length ? wmjQuery("button",parentUi5Elem[0].shadowRoot) : wmjQuery();
}
return wmjQuery();},
'-211404093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.sectionHeaderDirectText+")").closest(".pmPortletContainer").find("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest("tr").find("select");},
'-1901252108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMInputBase").filter("[title=" + fixed.titleText + "]").find("input");},
'-2122144250': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='application']").filter("[aria-labelledby='"+fixed._elemAttr+"']").find("div.nrte_content_webkit");},
'-1036672405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find("label").filter("[title=" + fixed.titleText + "]").find(".sapMLabelTextWrapper");},
'-1687685641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListTblCell").find(".sapMLnk").filter(":containsTextNode("+ fixed.btnText +")")},
'-985440773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[title=" + fixed.titleText + "]").closest(".tgm-category-name").find("a");},
'-1551323349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[for='fbo5_groupEdit0_xname']").closest("th").next().find("input").filter(":mt_visible");},
'-1343613329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.lmLabelText+")").closest(".sapUxAPObjectPageSubSection").find("span").filter(":containsTextNode("+fixed.lmText+")").closest("div.sapUiHLayout"); },
'-1443189519': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest("div[slot='header']");},
'-1926934225': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".tabTitle").filter(":containsTextNode("+fixed.titleText+")").closest("div[class*='SupportData']").filter(":first");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1021162986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.panelHeaderDirectText+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest("td").find("select");},
'-383448093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.panelHeaderDirectText+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelDirectText+")").closest("td").find(".nrte_contentArea");},
'-2118696408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNode("+ fixed.btnText +")").next().find(".fieldWithContext")},
'-567971755': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[type=checkbox").filter("[id="+fixed._elemId+"]").next("label");},
'-1175372165': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.tgtText+"]").closest(".sapUiVlt").find(".sapMComboBoxBase");},
'-1103692028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUshellContainerTitle").filter(":containsTextNode("+fixed.lmText+")").closest(".sapUshellTileContainerHeader").find(":header"); },
'-539008969': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMColumnHeader").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'-1127987748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiLoSplitterContent").find(".sapMTitle").filter("[title=" + fixed.titleText + "]").closest(".sapMIBar");},
'-419994808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.headerToolbar").find("a[role='button']").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'-1146690065': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const ui5Panel = wmjQuery("ui5-panel").filter("[header-text='"+fixed._panelHeaderText+"']");
const ui5PanelShadowRoot = ui5Panel.length ? ui5Panel[0].shadowRoot : null;
return wmjQuery(".ui5-panel-header",ui5PanelShadowRoot);},
'-602061883': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("th[role='columnheader']");},
'-1096358206': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("div[data-testid='contentTitle']").filter(":containsTextNodeIgnore("+fixed.elemText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-958589777': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog").find(":header").filter("[data-testid=" + fixed._titleText + "]").parent();},
'-849350787': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMMenuBtn").find("button[class*='sapMSBArrow']");},
'-365615610': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button.sapMBtn").filter(":containsTextNode("+fixed.elemTxt+")");},
'-979878059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.rcmJobReqDisplayOptionsTable").find("label").filter(":containsTextNode("+fixed.labelTxt+")").prev("input[type=checkbox]");},
'-876657284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle").find(":header").filter("[title="+fixed.elemAttr+"]");},
'-275158296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[id*="+fixed._elemId+"]");},
'-249440673': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-popover#takeActionPopover").find("ui5-li [role='button']").filter(":containsTextNode("+ fixed.btnText +")");},
'-2135604341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#historyDetails").find("button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'-2108202688': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".image-widget-editor").find("img").filter("[src_production*='"+fixed._srcProdAttr+"']");},
'-1357749892': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-label="+fixed.elemAttr+"]");},
'-248361742': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function findShadowDomWithoutUniqueContainer_1(nonUniqueContainer, ...args) {
    let containers = wmjQuery(nonUniqueContainer);
    let curr, last;
	const arr = Array.from(containers);
	for(let j = 0; j<arr.length; j++){
        curr = last = arr[j];
        for (let i = 0; i < args.length; i++) {
            last = curr;
            if (last.length === 1 || i === 0) {
                if (args[i].isShadowChild) {
                    curr = i === 0 ? wmjQuery(args[i].selector, last.shadowRoot) : wmjQuery(args[i].selector, last[0].shadowRoot);
                } else {
                    curr = wmjQuery(args[i].selector, last);
                }
                if (i === args.length - 1) {
                    return curr;
                }
            }
        }
	}
    return wmjQuery();
};
let text = ftHelper.unQuote(wmjQuery().identity(fixed.elemText));
const headerCheckOld = wmjQuery("ui5-static-area-item");
const headerCheckNew = wmjQuery("ui5-static-area-item-sf-header");
if( headerCheckOld.length > 0 ){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li:containsTextNode("+text+"),ui5-li-sf-header:containsTextNode("+text+")", isShadowChild:false},
	{selector:"li", isShadowChild:true});
}if(headerCheckNew.length > 0){
	return findShadowDomWithoutUniqueContainer_1(".globalShellbarMenu", 
	{selector:".ui5-shellbar-menu-popover",isShadowChild:true},
	{selector:"ui5-li-sf-header:containsTextNode("+text+")", isShadowChild:false},
	{selector:".menuItemSpace", isShadowChild:false})
}},
'-1203708346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.elemText+")").closest(".textBox");},
'-1734344917': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dataRegionTitle").find(".sapReportEngineTitle").filter(":containsTextNode("+fixed.elemTxt+")");},
'-928769358': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapLumiraStoryLayoutCommonSectionPanel").find(".sapFpaBiRichTextEditorTextEditor").filter(":containsTextNode("+fixed.elemTxt+")").find("p");},
'-144721143': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-labelledby="+fixed._ariaLabelledbyAttr+"]");},
'-1035656554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalCardHeaderIcon").filter("[name="+fixed._elemAttr +"]").closest("[class*='StandardCard_body']");},
'-1240804560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").find("button").filter("[title=" + fixed.titleText + "]")},
'-1392686334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmPortletTitle :header").filter(":containsTextNode("+ fixed.btnText +")").closest(".pmPortletContainer");},
'-249266991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("span.revolutionTSInfoLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfo,.revolutionTSInfoSection").parent().next().find("span.revolutionTSDatePickerWrapper");
if (elem.length)
 {return elem;} 
return wmjQuery("span.revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("span.revolutionTSInfoLabel").filter(":containsTextNode("+ fixed.titleText +")").next().find(".revolutionTSInfoInput");

},
'-834707408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".form_field").find("button.helpLink");},
'-725133987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemCategory").filter(":containsTextNode("+fixed.panelHeaderDirectText+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelDirectText+")").find("[role='button']");},
'-497380252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMLabelTextWrapper").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapMListTblSubCntRow").find("textarea");},
'-415685754': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFpaBiRichTextEditorTextEditor").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapLumiraStoryLayoutCommonSectionPanel").last();},
'-493165014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFpaBiRichTextEditorTextEditor").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapFpaBiVisualization-vizControl").last();},
'-851334405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr").find(".sapExtentUilibFormPatternBlockName").filter(":containsTextNodeIgnore("+fixed.blockNameText+")").closest("tr").find(".sapExtentUilibFormPatternBlockValue").find("span");},
'-714561140': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".sapUiVlt").find(".sapUiIcon");},
'-125737320': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formFieldLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".cke_top");},
'-1065089365': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.revolutionTSGroupWrapperHeaderLabel").filter("[title=" + fixed.headerText + "]").closest(".revolutionTSInfoSection").find("span.revolutionTSInfoLabel").filter("[title="+ fixed.titleText +"]").next().find(".revolutionTSInfoInput");},
'-1748657061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id*='title']").filter(":containsTextNode("+fixed.tgtText+")").closest("div.sapMPanelHeaderTB");},
'-691124916': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest(".sapUxAPObjectPageSubSection").find(".sapUiRespGrid");},
'-1181456968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".globalPortletBody").find("a").filter(":containsTextNode("+fixed.btnText+")");},
'-779666604': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstShadow = wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("tr").find("ui5-date-picker-xweb-calendar-widget")[0];
const firstShadowRoot = firstShadow && firstShadow.shadowRoot;
const secondShadow = wmjQuery("ui5-input-xweb-calendar-widget",firstShadowRoot)[0];
const secondShadowRoot = secondShadow && secondShadow.shadowRoot;
return wmjQuery(".ui5-input-root input.ui5-input-inner",secondShadowRoot);},
'-2111688581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":contains("+fixed.labelText+")").closest(".sapMColumnHeader").closest(".sapMList").find(".sapMInputBase").eq(fixed.thIndex).find(".sapUiIcon ");},
'-1909532553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("[id=libSelectLabel]").filter(":containsTextNode("+fixed.labelTxt+")").next()[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("input",firstShadow);},
'-559022010': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("[ui5-button]").filter("[data-testid="+fixed._dataTestId+"]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'-1483894641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class^='CapabilityTree_containerList']").find("ui5-custom-tree[data-testid='capabilityPickerCustomTree'],sf-custom-tree[data-testid='capabilityPickerCustomTree']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-custom-li-tree,sf-custom-li-tree",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-checkbox,ui5-checkbox-sf-capability-picker",secondShadow)[0];
const thirdShadow = third &&third.shadowRoot;
return wmjQuery("input[type=checkbox]",thirdShadow).parent();},
'-1542699593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {function headerCheck1() {
  return wmjQuery("xweb-shellbar").length > 0;
}
function getHeaderBar1(){
  const one =  wmjQuery("xweb-shellbar")[0].shadowRoot;
  return wmjQuery("#shellbar", one)[0].shadowRoot;
}

if( headerCheck1() ){
	let one = getHeaderBar1();
	return wmjQuery(".ui5-shellbar-menu-button,.ui5-shellbar-title", one);
}else{
	return wmjQuery("div.globalHeaderBar #bizXShellCustomHeader-BarLeft").find("button.bizXShellDropMenuButton");
}
},
'-302946321': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("bdi").filter(":mt_visible");},
'-1612324963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("bdi").filter(":mt_visible");},
'-1972368348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("label").filter(":mt_visible");},
'-192224712': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("label").filter(":mt_visible");},
'-577799514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("span.sapMLabel").filter(":mt_visible");},
'-592303502': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("span.sapMLabel").filter(":mt_visible");},
'-1260192690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").filter(":containsTextNode("+fixed.elemTxt+")").find("span.sapMLabel").filter(":mt_visible");},
'-624066200': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("span.sapMLabel").filter(":mt_visible");},
'-2033238826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("bdi").filter(":mt_visible");},
'-1932095775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='title-inner']").filter(":containsTextNode("+fixed.modalTitle+")").closest("header").next(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("label").filter(":mt_visible");},
'-726093019': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMListTblHeader").find(".sapMTableTH").filter(":containsTextNode("+fixed.elemTxt+")").find("label").filter(":mt_visible");},
'-1288254506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.bdiDirectText+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMComboBoxInner").closest(".sapUiVltCell");},
'-1334599256': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapMDialogOpen").find("header").find("[id^='__dialog'][id$='-title-inner']");
return targetOptions.length > 1 ? targetOptions.last() : targetOptions;},
'-1111495336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":containsTextNode("+fixed.sectionTitleText+")").closest("section").find(".sapUiIconMirrorInRTL").filter(":first").closest(".sapExtentUilibFormPatternActionButton");},
'-129216156': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find(".sapMLabel").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapUiVltCell").next(".sapUiVltCell");},
'-507597535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find(".sapMLabel").filter("[title="+fixed.labelTitleAttr+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input").closest(".sapUiVltCell");},
'-1126973465': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[summary='"+fixed._elemAttr+"']");},
'-1611883456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first =  wmjQuery("ui5-button[id$='approve-action']")[0].shadowRoot;
return wmjQuery("button", first);},
'-2085140179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id="+fixed._dataAttr+"]").find(".sapUiIconPointer");},
'-51367702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MDFLabel .text").filter(":containsTextNode("+fixed.labelText+")").closest("div.flow_field").find(".comboBox");},
'-937200339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find("bdi").filter(":containsTextNode("+fixed.bdiDirectText+")").closest(".sapMColumnHeaderContent").last();},
'-1327193258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.headingText+")").parent("div");},
'-1349256275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._tgtText+"]").closest(".sapUiRespGridBreak");},
'-637848674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li,span").filter("[class^=MyTeamDialog]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");},
'-1170098592': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[role=button],ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest("[class^=MyTeamDialog]");},
'-1378013952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li[data-testid="+fixed._elemDataId+"]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("a");
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldUI.length) {
  return oldUI;
} else if (newUI.length) {
  return newUI;
} else {
  return wmjQuery();
}},
'-1174155684': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter("[data-testid=takeActionButton]")[1];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter("[data-testid='segment-actions-btn']")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-1632762062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("ui5-li").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery("span.ui5-li-title", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li[class^=MyTeamDialog_listItem]");
} else {
  return wmjQuery();
}},
'-1565849237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("[data-testid=takeActionItem]").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery(".ui5-li-text-wrapper span.ui5-li-title", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li");
} else {
  return wmjQuery();
}},
'-335252178': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("[data-testid=takeActionItem]").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery("[role=listitem]", shadowElem);
} else if (newListItem) {
  return newListItem.closest("li");
} else {
  return wmjQuery();
}},
'-1016424348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldListItem = wmjQuery("[data-testid=takeActionItem]").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newListItem = wmjQuery("ui5-link-xweb-myteam-content[accessible-role=button]").filter(":containsTextNode("+fixed.elemTxt+")");
if (oldListItem) {
  const shadowElem = oldListItem ? oldListItem.shadowRoot : undefined;
  return wmjQuery(".ui5-li-text-wrapper span.ui5-li-title", shadowElem);
} else if (newListItem) {
  return newListItem;
} else {
  return wmjQuery();
}},
'-2125367549': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("span[class^=MyTeamDialog]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
const newUI = wmjQuery("ui5-link-xweb-myteam-content").filter(":containsTextNodeIgnore("+fixed.elemTxt+")");
if (oldUI.length) {
  return oldUI;
}
else if (newUI.length) {
  return newUI;
}
else {
  return wmjQuery();
}},
'-1074270577': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li[data-testid=takeActionItem]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("span[role=button]");
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem]").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content[accessible-role=button]");
if (oldUI.length) {
  return oldUI;
}
else if (newUI.length) {
  return newUI;
}
else {
  return wmjQuery();
}},
'-176777494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUI = wmjQuery("ui5-li").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
const newUI = wmjQuery("li[class^=MyTeamDialog_listItem").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
const selectedUI = oldUI ? oldUI : newUI;
const shadowElem = selectedUI ? selectedUI.shadowRoot : null;
return shadowElem ? wmjQuery("li.ui5-li-root,a.ui5-link-root", shadowElem) : wmjQuery();},
'-1442961075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNodeIgnore("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton.shadowRoot;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (ftHelper.unQuote(fixed.elemTxt)  === "Go To") {
  const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNodeIgnore(Links)")[0];
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-1571910942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldButton = wmjQuery("ui5-button").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const newButton = wmjQuery("ui5-segmented-button-item-xweb-myteam-content").filter(":containsTextNode("+fixed.elemTxt+")")[0];
if (oldButton) {
  const shadowElem = oldButton ? oldButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else if (newButton) {
  const shadowElem = newButton ? newButton.shadowRoot : undefined;
  return wmjQuery(".ui5-button-root", shadowElem);
} else {
  return wmjQuery();
}},
'-2073972885': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MDFLabel").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("tr").find("span.comboBox");},
'-1845384698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest(".sapUiRespGrid").find(".sapMText").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")").closest("td");},
'-1775716706': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("footer").find(".footer-item").filter(":contains("+fixed.lmText+")");},
'-117776496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest(".sapUxAPObjectPageSubSection").find(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")");},
'-1901210822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-tab-title").filter(":containsTextNode("+ fixed.tgtElemText +")");},
'-771307245': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions =  wmjQuery("p").find("span").filter(":containsTextNode("+fixed.labelText +")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-341932397': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-tab-title").find("span").filter(":containsTextNode("+ fixed.tgtElemText +")");},
'-57999203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.titleText+")").closest(".pmPortletTitle").find(".pmTextLink").filter(":containsTextNode("+fixed.labelText+")").closest("div.rightLink");},
'-2042971827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=contentTitle]:containsTextNode("+fixed.elemTxt+")").parent().parent();},
'-1293549444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='ActionChip_quickActionLabel']").filter(":containsTextNodeIgnore("+fixed.labelText+")");},
'-1529495229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.headerText+")").closest(".sapMCbHasLabel").find(".sapMCbBg");},
'-649938493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiCalItemText").filter(":containsTextNode("+fixed.labelText+")").first();},
'-1433734735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetLm = wmjQuery("ui5-li-xweb-myteam-content:eq("+fixed.elemIdx+")");
let taregtShadow = targetLm ? targetLm && targetLm[0].shadowRoot : undefined;
return taregtShadow ? taregtShadow && wmjQuery(taregtShadow).find("li.ui5-li-root") : wmjQuery();},
'-555270144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldUi = wmjQuery("[class*=MyTeamDialog_actionItem]").filter(":containsTextNode("+fixed.elemTxt+")").closest("ui5-li")[0];
const newUi = wmjQuery("[class*=MyTeamDialog_listItem]").filter(":containsTextNode("+fixed.elemTxt+")").find("ui5-link-xweb-myteam-content")[0];
if (oldUi) {
  const targetShadow = oldUi && oldUi.shadowRoot;
  return targetShadow && wmjQuery(targetShadow).find(".ui5-li-root");
} else if (newUi) {
  const targetShadow = newUi && newUi.shadowRoot;
  return targetShadow && wmjQuery(targetShadow).find(".ui5-link-root");
}
return wmjQuery();},
'-1893095499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("section").filter("[id='"+fixed._elemId+"']").find("span[id^=__title]").filter(":containsTextNode("+fixed.elemTxt+")");},
'-483660217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNode("+fixed.tgtElemText+")").closest("[class*='MiniCard_root']");},
'-1809258656': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[data-help-id='"+fixed._dataHelpAttr+"']").find("span");},
'-1347211657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("div").find("input");},
'-365138571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":containsTextNode("+fixed.labelText+")");},
'-123489007': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblTxt+")").closest("td").next("td").find(".HRContentCell");},
'-1559886636': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tableHeader").find("label").filter(":containsTextNodeIgnore("+fixed.tgtDirectText+")");},
'-1077813875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.bdiText+")").closest(".sapUiVlt").find(".sapUiHLayout");},
'-67588082': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiMnuLst").find(".sapUiMnuItmTxt").filter(":containsTextNode("+fixed.tgtText+")");},
'-1696144608': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenuItem").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'-1644643922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery("a.menuItem",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")");},
'-1195902338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-static']")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery("ui5-li-sf-header",firstShadow).filter("[data-ui5-stable='"+fixed._dataStableAttr+"']").find("a.menuItem");},
'-1374897308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form-dialog[header-text='"+fixed._elementFilter+"']",
    { selector: "xweb-goal-form[accessible-name='"+fixed._elementFilter+"']", isShadowChild: true },
    { selector: "xweb-goal-form-item[label="+fixed.elemTitleAttr+"]", isShadowChild: true },
    { selector: "xweb-goal-form-field-label[label="+fixed.elemTitleAttr+"]", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".goalFormWidget-label", targetShadow).filter(":containsTextNode("+fixed.elemTitleAttr+")");
} else {
    return wmjQuery();
}},
'-975085610': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item-sf-quickcard[data-action-type="+fixed._dataAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-button-root",firstShadow);},
'-83279339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form-dialog[message-type='Toast']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-success-message#successMessage",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-toast-sf-goal-form#messageToast",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return wmjQuery("[role='alert'].ui5-toast-root",thirdShadow);},
'-1045812388': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstShadow = wmjQuery("ui5-select-sf-talent-activity").filter(":contains("+fixed.elemHeaderText+")")[0].shadowRoot; 
return wmjQuery(".ui5-input-focusable-element",firstShadow); },
'-1573893943': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapUiRespGridBreakXL");},
'-1521403992': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSInfoLabel").filter(":containsTextNode("+fixed.labelText+")").closest(".revolutionTSInfo");},
'-638854870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".ui5-menu-item[accessible-name='"+fixed._attrText+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery("li",secondShadow);},
'-2033336260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter(":containsTextNode("+fixed.lmHeaderText+")").closest("table").find("td").filter(":eq("+fixed.lmIndex+")").find("input");},
'-906684384': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartStepName").filter(":containsTextNode("+fixed.tgtDirectText+")");},
'-300928547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.labelText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow) : wmjQuery();},
'-959601068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.titleText+")").closest(".sapMPanel").find("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");},
'-1860854216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.titleText+")").closest(".sapMPanel").find("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input").closest(".sapUiVltCell");},
'-1119531876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-li-custom-sf-header",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")")[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery("li",secondShadow);},
'-469045257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar.sfEnsureSAPTheme")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-tabcontainer-sf-header",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return wmjQuery(".subTabLink",secondShadow).filter(":containsTextNode("+fixed.lmText+")").closest(".ui5-tab-strip-itemText");},
'-827658694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'xweb-goal-form',
    { selector: "xweb-goal-form-number-field[id='"+fixed._containerElemId+"']", isShadowChild: true },
    { selector: "ui5-input-sf-goal-form[id="+fixed._elemId+"]", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery(".ui5-input-icon-root", targetShadow);
} else {
    return wmjQuery();
}},
'-330613105': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th.tableHeaderLabel").find("[id$='_compHeaderId']").filter(":containsTextNode("+fixed.labelText+")");},
'-878852503': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("div").find("input").filter("[placeholder="+fixed.inputPlaceHolder+"]");},
'-1423945066': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartSelected").find(".sfStepsChartStepName").filter(":containsTextNode("+fixed.elemText+")");},
'-416790208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfStepsChartSelected").find(".sfStepsChartStepName").filter(":contains("+fixed.activePageTab+")").closest(".form").find(":header").filter(":contains("+fixed.lmHeaderTxt+")").closest(".sfObjectPageSectionContainer").find(".nrte_content_webkit");},
'-1979259215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[data-help-id='"+fixed._dataAttr+"']").next("td");},
'-110044315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").filter("[data-help-id="+fixed._dialogAttr+"]").find(".sapMDialogTitleGroup").find(".sapMTitle");},
'-1588120837': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").filter("[data-help-id="+fixed._dialogAttr+"]").find(".sapMPageHeader").find("[id$=title-inner]");},
'-1209242375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").filter("[data-help-id="+fixed._dialogAttr+"]").find(".sapMDialogTitleGroup").find("[id$=title-inner]");},
'-1842646020': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panelContent").find("a").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("[class*='section-header']").next().find(".sidepanelsubsection:first")},
'-1571998205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMBtnContent").filter(":contains("+fixed.btnText+")").closest("[id*='footer']").closest(".sapMDialog").find(".sapMTitle").closest(".sapMBarContainer");},
'-1651393560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalQuickActionText").filter("[data-help-id='"+fixed._elemHref+"']");},
'-492829873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalQuickActionText").filter("[href_production*='"+fixed._elemHref+"']");},
'-1138549935': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-testid="+fixed._elemAttr+"]");},
'-251884657': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#container_fry").find(".formHeadTitle");},
'-175969111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalTileHeader").filter("[title="+fixed.headerAttr+"]").find(".titleWrapper");},
'-97054331': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='navigation']").find("[class*='table-Of-contents-links']").filter(":contains("+fixed.lmtext+")");},
'-578714581': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPage").filter("[id="+fixed._sapMPageId+"]").find(".sapMBarPH");},
'-179422711': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":contains("+fixed.headerTxt+")").closest(".pmPortletContainer").find(".pmUserInfo");},
'-747874821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-panel-xweb-goalmanagementx ui5-icon-xweb-goalmanagementx:first").filter("[name=" + fixed._titleText + "]").closest(".sf_common_comp-Container-Header");},
'-1972605668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNode("+fixed.labelTxt+")").closest(".field_label").siblings(".field_value").find("span[id*=field]").children("span");},
'-1853180741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeader").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".sapUiRespGridHSpace1");},
'-673063432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.elemTxt+"]").find("bdi").filter(":first");},
'-1711511304': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiLoSplitterContent").find(".sapMFlexItem span").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-547594047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection .sapMLabel").filter("[title="+fixed.tgtLabel+"]").find("bdi");},
'-1580308822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const headerCellIndex = wmjQuery(".sapMListTblHeaderCell").filter(":containsTextNode("+fixed.lmHeaderText+")").index();
return wmjQuery(".sapMListTblHeaderCell").filter(":containsTextNode("+fixed.lmHeaderText+")").closest("table").find("tbody").find("tr").filter(":eq("+fixed.lmRowIndex+")").find("td").filter(":eq("+headerCellIndex+")").find("input");},
'-1450154337': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").find("bdi").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-2072012941': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapMLabelTextWrapper").siblings(".sapMLabelColonAndRequired");},
'-1646041499': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table#mainHeader").find("th span").filter("[id*="+fixed._headerId+"]");},
'-682065839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("footer ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.btnText+")").filter(":mt_visible")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button",firstShadow) : wmjQuery();},
'-557787831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog")[0];
const firstShadow = first && first.shadowRoot;
return wmjQuery("#ui5-popup-header-text",firstShadow).filter(":containsTextNode("+fixed.lmText+")");},
'-1915098329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMCb").filter("[id*="+fixed._outerId+"]").find("bdi");},
'-1548148539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalTabText").filter(":containsTextNode("+fixed.labelText+")");},
'-1974796043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListItems").find(".sapMSLITitleOnly").filter(":containsTextNodeIgnore("+ fixed.btnText +")").closest("li").filter(":mt_visible");},
'-1605465153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-242748689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[data-help-id="+fixed._tgtId+"]").find("button");},
'-516522340': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSInfoTitle").filter(":containsTextNode("+fixed.elemTxt+")");},
'-554949076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form_field").find(".ectFormFieldBorder");},
'-769547329': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='HeaderTitle']").filter(":containsTextNode("+fixed.modalHeader+")").closest(".globalContainer").find("input ").filter("[aria-label="+fixed.elemAttr +"]");},
'-1340839952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pwhHeaderTitle").filter(":contains("+fixed.titleText+")").closest("[id*='container']").find(".MDFLabel").closest(".form_field").filter(":contains("+fixed.labelText+")").find(".formElement.fd-input");

},
'-1690385627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenu").find("li.globalMenuItem").filter(":contains("+fixed.lmText+")");},
'-946174965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMLIBContent");},
'-226369647': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalMenu").find("li").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'-1341855714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pwhHeaderTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest("[id*='container']").find(".MDFLabel").closest(".form_field").filter(":containsTextNodeIgnore("+fixed.labelText+")").find(".formElement.fd-input");

},
'-697566727': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter(":containsTextNodeIgnore("+fixed.labeltext+")").closest("div").next(".sapMInputBase").find(".sapMInputBaseInner");},
'-1083018433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageHeader").find(".sapMTitle").filter("[id="+fixed._headerId+"]").closest(".sapMDialog").find("button").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1695963111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-shellbar",
    { selector: "ui5-shellbar-sf-header", isShadowChild: true },
    { selector: "ui5-button-sf-header[data-ui5-text="+fixed._sfHeaderDataTextAttr+"]", isShadowChild: true }
);

if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery("button", targetShadow);
} else {
    return wmjQuery();
}
},
'-402919226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstDom = wmjQuery("ui5-dialog")[0].shadowRoot;
if (firstDom) {
    return wmjQuery("section",firstDom).filter("[aria-label="+fixed.lmattrAria+"]").find(".ui5-popup-content");
}
return wmjQuery();

},
'-1773114716': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.lmtext+")");},
'-1753678778': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form_field").find(".datePicker");},
'-1330397639': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".createNewJobReqPageGroupWrapper").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'-1779011689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[role='button'][title]").filter(":containsTextNode("+fixed.sectionTitleDirectText+")").closest("tr[id$='_rater']").next("tr[id$='_content']").find(fixed._tgtTagName);},
'-2123652979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.titleText+")").closest(".sapExtentUilibFormPatternSubsequentBlock").find(".sapExtentUilibCountryFlagStyle").next(".valuePattern").filter(":mt_visible");},
'-1892083093': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[class*='StandardCard_linkButton']").filter(":contains("+fixed.innerHeaderTxt+")").closest("[class*='Card_wrapper']");},
'-1507664849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogOpen").find("[id^=__title][id$=-inner]").filter(":containsTextNode("+fixed.panelTitleDirectText+")").closest(".sapMPanel").find(".sapUiRespGrid[id*='__grid']").last();},
'-1308900826': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").filter("[data-help-id='"+fixed._dialogDataHelpId+"']").find("[data-help-id='"+fixed._elemDataHelpId+"']:eq("+fixed._sectionIdx+")").find("input");},
'-1472688550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id='editDialog_EMERGENCY_CONTACT_INFORMATION']").find(".sapMPanelContent:eq("+fixed._sectionIdx+")").find(".sapUiVlt").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").find("input");},
'-1326348884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "ui5-static-area-item-sf-header[data-ui5-stable='shellbar-todopanel-static']",
    { selector: "xweb-sidepanel[data-ui5-stable='"+fixed._dataUi5Attr+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow && wmjQuery("ui5-button-sf-header[icon="+fixed._elemIconAttr+"]", targetShadow);
} else {
    return wmjQuery();
}},
'-2076240436': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").filter("[data-help-id='"+fixed._dialogDataId+"']").find("[id*='title-inner']").filter(":mt_visible");},
'-2107128496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery('ui5-dialog-xweb-mini-app-dialog ').find('[data-testid="headerTitle"]').filter(":containsTextNodeIgnore("+fixed.dialogHeader+")").parent();},
'-626942346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='checkbox']").filter(":containsTextNodeIgnore("+fixed.jobChange+")").closest("section");},
'-579385995': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalHighlight").filter(":containsTextNode("+ fixed.btnText +")").find(".workBenchPipeElem");},
'-1681891872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr td").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find("select:last");},
'-1266507661': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".formSectionBody").find(".actionsSelectionHelp").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-1855731176': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[summary="+fixed._blockSummaryName+"]").closest(".sapExtentUilibFormPatternSubsequentBlock");},
'-1510328694': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-input").filter("[aria-label="+fixed.lmaria+"]");},
'-579417356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("#learninghome-app").find("ui5-input-xweb-common-search-widget").filter("[data-testid=common-search-input]").filter(":mt_visible");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) {  
  return wmjQuery("input.ui5-input-inner", targetShadow);
}
return wmjQuery(); },
'-1441620588': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".buttonRowWrapper").find("[type='button']").filter("[value="+fixed.inputValue+"]");

},
'-2105787259': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='headerTitle']").filter(":containsTextNode("+fixed.lmheader+")").closest("[role='region']").find(".sapUiRespGrid");},
'-483750113': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.titleText+")").closest(".sapExtentUilibUtilEditFormGeneratorFGPanel");},
'-701294521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.bdiText+")").closest(".sapExtentUilibUtilEditFormGeneratorField");},
'-534559955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "ui5-static-area-item",
    { selector: "ui5-menu-li[accessible-name='"+fixed._accessibleName+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.closest("ui5-list").shadowRoot;
    return targetShadow ? wmjQuery(targetShadow).find("[role=menu]") : wmjQuery();
} else {
    return wmjQuery();
}},
'-620474072': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable='"+fixed._parentShadowAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".section.title",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")"): wmjQuery();},
'-1443941564': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.titelText+")").closest(".sapMDialog");},
'-361299939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMenu").find("li").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-59333547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MDFLabel").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1233131239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiInvisibleText").filter(":containsTextNode("+fixed.invisibeElemTxt+")").closest("button").filter(":mt_visible");},
'-1259491322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiView").find("button").filter("[title="+fixed.elemTitleAttr+"]").filter(":mt_visible");},
'-421324827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSLIDescriptionText").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMMsgViewItem").find("span.sapUiIcon");},
'-2113706243': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='SplashHeader_content']").find(":header").filter(".globalGreetingText");},
'-2071051054': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstDom = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable="+fixed._lmattr+"]")[0] && wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable="+fixed._lmattr+"]")[0].shadowRoot;
if (firstDom) {
    return wmjQuery("ui5-li-sf-header",firstDom).filter("[icon="+fixed._iconAttr+"]").find(".menuItemSpace");
}
return wmjQuery();

},
'-1159242199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'ui5-static-area-item',
    { selector: "ui5-menu-li", isShadowChild: true }
);
if (sectionShadow) {
    const firstShadowContainer = wmjQuery(sectionShadow);
    const rowsShadowArray = Array.from(firstShadowContainer);
    let returnedValue = wmjQuery();
    rowsShadowArray.forEach(target => {
        const targetElem = target && wmjQuery(target.shadowRoot).find("li").filter(":containsTextNode("+fixed.elemText+")");
        if (targetElem.length) {
            let returnedValueContainer = targetElem.closest("ui5-list")[0];
            let returnedValueContainerShadow = returnedValueContainer.shadowRoot;
          	returnedValue = returnedValueContainerShadow && wmjQuery(returnedValueContainerShadow).find("ul");
        }
    });
    return returnedValue;
}
return wmjQuery();


},
'-2014651202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("form[id="+fixed._idAttr +"]").find(".paneBodyTitle");},
'-1807789513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShasow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field", firstShasow).filter("[name="+fixed._elemName+"]")[0];
const socondShasow = second && second.shadowRoot;
const elem = wmjQuery("ui5-label-sf-goal-form",socondShasow).filter(":containsTextNode("+fixed.labelText+")").closest(".goalFormWidget-formItem").find("ui5-input-sf-goal-form");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-1966812169': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPortletContainer").find("label").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1297777660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field[id="+fixed._goalId+"]",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.labelTxt+")")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(".ui5-label-required-colon",thirdShadow) : wmjQuery();},
'-1995057715': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapUiVlt").find(".sapMCb");},
'-204252745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".pmItemName:header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-146196521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("td");},
'-779289014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest(".pm2CompItemHeader");},
'-1290282786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".pmContainer").find(".sfComboBox");},
'-1865853252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("td").find("input[type=text]");},
'-959523518': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pm2ObjectItemHeader").find(".fd-button").filter("[title="+fixed.elmAttr+"]");},
'-1194583840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest(".pm2ObjectItemHeader").find(".fd-button").filter("[title="+fixed.elmAttr+"]");},
'-1722010410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-xweb-versatile-writing-assistant")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".ui5-menu-item[icon="+fixed._iconName+"]",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(".ui5-li-content",secondShadow) : wmjQuery();},
'-1639090446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field[name='"+fixed._actionNameAttr+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-input-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("input",thirdShadow) : wmjQuery();},
'-1261870563': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.titelText+")").closest(".sapUiVltCell");},
'-358227286': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field[name='"+fixed._goalName+"']",firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(".ui5-label-required-colon",thirdShadow) : wmjQuery();},
'-1674203484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx[data-testid='"+fixed._nameAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-1677031876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-breadcrumbs-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-link-xweb-goalmanagementx").filter(":containsTextNode("+fixed.linkText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("a.ui5-link-root",secondShadow): wmjQuery();},
'-1836351189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx[data-help-id='"+fixed._nameAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-571801256': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "ui5-wizard-xweb-goalmanagementx",
    { selector: "ui5-wizard-tab-xweb-goalmanagementx[title-text='"+fixed._titleText+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return wmjQuery(".ui5-wiz-step-texts", targetShadow).filter(":containsTextNode("+fixed.labelText+")");
} else {
    return wmjQuery();
}},
'-466954893': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-button-xweb-team-goal[data-testid='"+fixed._iconBtn+"']");},
'-1700833920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-button-xweb-team-goal[icon='"+fixed._iconBtn+"']")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-button-root",firstShadow);},
'-2049049508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx[icon='"+fixed._nameAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-951570028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-panel-xweb-goalmanagementx").first()[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-panel-header-title",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")");},
'-84525163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-segmented-button-item-xweb-goalmanagementx[data-item-key='"+fixed._dataBtn+"']")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("li.ui5-button-root",firstShadow);},
'-212613456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-breadcrumbs-xweb-team-goal")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-link-xweb-team-goal").filter(":containsTextNode("+fixed.linkText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("a.ui5-link-root",secondShadow): wmjQuery();},
'-621208879': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPortletContainer").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".pm2ReviewInfo");},
'-1934727030': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-form-inbox").filter(":containsTextNode("+fixed.folderText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-title-root",firstShadow).find("span"): wmjQuery();},
'-53653083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form",
    { selector: ".goalFormWidget-field[id='"+fixed._goalFormWidgetID+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow ? wmjQuery(targetShadow).find(".goalFormWidget-labelgoalFormWidget-label") : wmjQuery();
} else {
    return wmjQuery();
}},
'-1906188528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPopoverScroll").find("div.sapMSLITitleOnly").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'-431035734': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListItems").find("li").filter("[title="+fixed.lmTitle+"]").find("span[id*=titleText]");},
'-403074944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-dynamic-content").filter(":containsTextNode("+fixed.labelText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("label.ui5-label-root",firstShadow): wmjQuery();},
'-1523807135': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class^='FormItem_pseudoInvisibleText']").filter(":containsTextNode("+fixed.invisText+")").closest("div[class^='FormItem_content']").find("ui5-date-picker-xweb-dynamic-content").parent();},
'-1625313311': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("span[class^='FormItem_pseudoInvisibleText']").filter(":containsTextNode("+fixed.invisText+")").closest("div[class^='FormItem_content']").find("ui5-input-xweb-dynamic-content")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("input",firstShadow): wmjQuery();},
'-526337884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toggle-button-xweb-people-profile[data-testid="+fixed._btnIcon+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-213999559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiRespGrid").find(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.lmText+")");},
'-1973989023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable=shellbar-sessiontimer-static]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".footer-button",firstShadow).filter(":containsTextNode("+fixed.btnText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery("button",secondShadow) : wmjQuery();},
'-1273086776': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='tab']").filter(":containsTextNodeIgnore("+fixed.tgtElemText+")");},
'-157731367': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_list").find("a").filter("[title="+fixed.elmTitle+"]");},
'-150078552': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode("+fixed.sectionHeaderText+")").closest(".sapUxAPObjectPageSubSection").find(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.blockTitleText+")").closest(".sapUiRespGrid").find(".sapExtentUilibFormPatternCustomBlock").closest(".sapUiRespGridSpanXL12");},
'-934562248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("xweb-goal-form-input-table").filter("[id='"+fixed._tableId+"']")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("span").filter(":containsTextNodeIgnore("+fixed.elmTxt+")") : wmjQuery();},
'-1747998987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field",firstShadow).filter("[id='"+fixed._fieldId+"']")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery("label",thirdShadow) : wmjQuery();},
'-830121800': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(".goalFormWidget-field",firstShadow).filter("[id='"+fixed._fieldId+"']")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form",secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(".ui5-label-text-wrapper",thirdShadow) : wmjQuery();},
'-67409380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#workflowView").find(".pwhHeaderTitle").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'-735377429': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").filter(":containsTextNodeIgnore("+ fixed.btnText +")").next().find(".ectTextAreaWrapperOldValueContainer .readonly").filter(":mt_visible");},
'-1197059709': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header").filter("[data-ui5-stable='"+fixed._outerAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".title",firstShadow).filter(":containsTextNode("+fixed.headertxt+")").closest(".titleSection") : wmjQuery();},
'-592323722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header").filter("[data-ui5-stable='"+fixed._outerAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".title",firstShadow).filter(":containsTextNode("+fixed.headertxt+")") : wmjQuery();},
'-866281229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardWrapper = wmjQuery("[id$='contentTitle']:contains(" + fixed.titleTxt + ")").parents("[class^='CardWrapper_root']");
if (!!cardWrapper && !!cardWrapper.length) {
	let buttonRoot = cardWrapper.find("ui5-button");
  	if (!!buttonRoot && !!buttonRoot.length) {
    	return wmjQuery(fixed._tag, buttonRoot[0].shadowRoot);
    }
}
return wmjQuery();},
'-348684198': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapMLIB").filter("[data-help-id="+fixed._elmAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1618064588': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-mini-app-dialog").filter(":containsTextNode("+fixed.elmTxt+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-title-root span",firstShadow) : wmjQuery();},
'-1263662003': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog").filter("[data-help-id='"+fixed._dialogAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-popup-header-root",firstShadow) : wmjQuery();},
'-1504467427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let cardTitle = wmjQuery().identity(fixed.titleTxt);
return wmjQuery("[id$='contentTitle']:contains(" + cardTitle + ")").parents("[class^='CardWrapper_root']").find(fixed._tag + "[class^='" + fixed._class + "']");},
'-1321538011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("button").filter("[data-help-id="+fixed._elmAttr+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-116883986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid=headerTitle]").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("ui5-dialog-xweb-mini-app-dialog")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("[id=ui5-popup-header]",firstShadow) : wmjQuery();},
'-1947600264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").filter("[id*="+fixed._parentId+"]").find("div[class*=ColumnHeader_header]");},
'-697143389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*=text]").filter(":containsTextNode("+fixed.lmText+")").closest("div[class*=ColumnHeader_header]");},
'-211454665': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=DynamicPage_contentContainer]").find("div").filter("[data-testid="+fixed._lmAttr+"]");},
'-794465296': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[ui5-button]").filter(":containsTextNode("+fixed.linkText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-2101274789': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-xweb-goal-learnings")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-menu-li-xweb-goal-learnings",firstShadow).filter("[id*=" + fixed._btnText + "]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery(".ui5-li-content", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-763665749': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-segmented-button-xweb-goalmanagementx[data-testid='"+fixed._dataAttr+"']");},
'-549794703': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.parTitle+"]").parent().find("div.rightLink");},
'-880502736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").parent().next(".rightLink");},
'-780500466': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-enum-field", firstShadow).filter("[id="+fixed._parentId+"]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery(".goalFormWidget-fieldVerticalFlexBox", secondShadow);
if (elem.length)
{
  return elem;
}

return wmjQuery();},
'-497538966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab_list").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1907873284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tabButton").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'-542083034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=tablist]").find("a").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1862587278': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").find("[role='heading']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest("div");},
'-1552053076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='GoalPageHeaderTitle_titleText']").filter("[tooltip='"+fixed._titleText+"']");},
'-2140089668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".ui5-tab-strip-itemContent",firstShadow).filter(":containsTextNode("+fixed.tgtElemText+")"): wmjQuery();},
'-1859017097': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".viewDetailsBar").find("#formsSearchToggle_Text").filter(":containsTextNode("+fixed.lmtxt+")");},
'-1866834654': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section[id*=objectPage-anchorBar]").find("bdi").filter(":containsTextNode("+fixed.lmText+")").closest("button");},
'-337488328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle[data-help-id='"+fixed._dataAttr+"']").find(".sapExtentUilibFormPatternBlockTitle");},
'-452839909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMIBar").filter("[data-help-id="+fixed._lmAttr+"]");},
'-1788300438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-multi-input-xweb-people-search").filter("[data-help-id="+fixed._dataHelpId+"]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-input-root",firstShadow);},
'-1700712891': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-multi-input-xweb-people-search").filter("[data-testid="+fixed._dataTestId+"]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery(".ui5-input-root",firstShadow);},
'-121093987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("tr").find(".fd-input-group--control");},
'-552339580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("tr").find(fixed._tagName);},
'-1113068373': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("xweb-goal-form-number-field", secondShadow).filter("[accessible-name="+fixed._elemIndx+"]")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery("ui5-input-sf-goal-form", thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;
const elem = wmjQuery(".ui5-input-inner", fourthShadow).filter(":first");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-280952412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-input-table", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("xweb-goal-form-number-field", secondShadow).filter("[name="+fixed._elemIndx+"]")[0];
const thirdShadow = third && third.shadowRoot;
const fourth = wmjQuery("ui5-input-sf-goal-form", thirdShadow)[0];
const fourthShadow = fourth && fourth.shadowRoot;
const elem = wmjQuery(".ui5-input-inner", fourthShadow).filter(":first");
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-1208435906': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").filter(":containsTextNodeIgnore("+fixed.headerText+")").closest(".sapUiRespGrid").find(".sapExtentUilibFormPatternCustomBlock");},
'-2135474593': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pidgetContentTr .pidgetContentTh").filter(":containsTextNodeIgnore("+ fixed.btnText +")").find("div:first")},
'-659580275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-list").filter("[data-testid="+fixed._datatestid+"]").closest("[role='region']");},
'-1583091818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapExtentUilibEditPageEffectiveDateVLToolbar").find(".sapUiVltCell").last();},
'-1820375298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lmtext+")").closest("tr").find(".comboDropDown");},
'-64496905': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".hdrText").filter("[id*="+fixed._headerIdSplit+"]");},
'-631728401': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id='"+fixed._datahelpid+"']").filter("[id="+fixed._lmid+"]");},
'-1345508512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapFCardHeader").find("[id*=title-inner]").filter(":containsTextNode("+fixed.elmTxt+")");},
'-380879052': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header:containsTextNode("+fixed.modalHeader+")").closest(".sapMDialog").find("label:containsTextNode("+fixed.elemLabel+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input.sapMInputBaseInner");},
'-457471487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".jobListingBtnRow").find("input[type='button']").filter("[value="+fixed.valAttr+"]").first();},
'-135895903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=jobReqTabNavBar]").find("span.jobReqDetailTitleSpan").filter(":containsTextNode("+fixed.lmText+")");},
'-1360852047': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=pipeElem]").find(".upperText").find("div.inline").filter(":contains("+fixed.lmText+")");},
'-921689409': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".atFooterActions").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'-1452297827': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=columnheader]").find(".sapMText").filter("[title="+fixed.lmTitle+"]");},
'-1075274909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter("[id="+fixed._tableId+"]").find("th").filter("[id="+fixed._lmId+"]");},
'-1022987566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.inline").filter(":containsTextNode("+fixed.lmText+")").closest(".upperText").closest("div[id*=pipeElem]");},
'-1556517220': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=columnheader]").find("a").filter(":containsTextNode("+fixed.elemText+")");},
'-271403515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=pipeStatusLabel]").find("div").filter(":containsTextNode("+fixed.lmText+")");},
'-1932999447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.labelText+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBaseContentWrapper");},
'-1771867944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(":containsTextNode("+fixed.elemHEad+")").closest(".pmPortletTitle").find(".pmTextLink").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1599439560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._fieldAttr+"']");
const secondShadow = second.length && second[0].shadowRoot;
const third = secondShadow && wmjQuery(secondShadow).find("ui5-select-sf-goal-form");
const thirdShadow = third.length && third[0].shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-label-root") : wmjQuery();},
'-2076816418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-suggestion-item-custom-sf-header").filter(":containsTextNode("+fixed.btntext+")")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find("li");
}
return wmjQuery();},
'-1166931857': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.elemText+")");
const firstShadow = first && first[0].shadowRoot;
return firstShadow ? wmjQuery("li",firstShadow) : wmjQuery();},
'-321969584': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-sf-talent-activity").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("button.ui5-button-root");

return elem.length ? elem : wmjQuery();
},
'-1194627752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.elemTxt+"]").closest(".sapUiVlt").parent();},
'-37042226': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.elemTxt+")").closest(".sapMPanel");},
'-1631796580': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("xweb-goal-form-enum-field[name='"+fixed._myName+"']")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find(".goalFormWidget-fieldVerticalFlexBox");
}
return wmjQuery();},
'-1482228547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-widget-name*='people-search']").closest("[class*='Toolbar_OrgchartToolbar']");},
'-1197317153': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".section_title_wrapper").find("button.add_lib");},
'-2012695168': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.cardtxt+")").closest(".sapUiRespGrid");},
'-365437242': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-form-inbox").filter(":containsTextNode("+fixed.lblTxt+")").closest("ui5-form-item-xweb-form-inbox").find("ui5-input-xweb-form-inbox");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("input") : wmjQuery();},
'-1503487533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode(" + fixed.headerText + ")").closest(".sfPeopleProfileBlockTitle").find(".sapUiIcon").filter("[data-sap-ui-icon-content=" + fixed.expectedText + "]").closest("button.sapExtentUilibFormPatternActionButton")
},
'-1799699443': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":contains(" + fixed.headerText + ")").closest(".sfPeopleProfileBlockTitle").find("button[title=" + dollars[0] + "]")
},
'-230313836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUxAPObjectPageSubSectionHeaderTitle").filter(":containsTextNode(" + fixed.tgtText + ")").parents(".sapUxAPObjectPageSubSection").find("div.sapUiRespGridHSpace0").filter(":first")},
'-1888378522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMBarContainer").filter(":containsTextNode(" + fixed.tgtText + ")").parents("div[role='dialog']").find("button.sapMBtnBase").filter(":containsTextNode(" + fixed.buttonText + ")")},
'-1803051820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode(" + fixed.tgtText + ")").closest("div[role='dialog']").find("footer").find("button").filter("[title=" + fixed.buttonText + "]")},
'-1374080956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapUiFupInputMask").filter("[title=" + fixed.titleText + "]").prev().find("button")},
'-138720859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").filter(":containsTextNode(" + fixed.headerText + ")").parents("div[role='dialog']").find("span").filter("[title=" + fixed.titleText + "]").find("bdi")},
'-1549586539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection .sapMLabel").filter("[title="+fixed.tgtLabel+"]").find("bdi");},
'-1079093986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text").filter(":containsTextNodeIgnore("+fixed.titleText +")").closest(".form_field").find(".sap-icon--slim-arrow-down").closest("span");},
'-203570215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='dialog']").find("span.text").filter(":containsTextNodeIgnore("+fixed.labelDirectText+")").closest("tr.form_field").find("[id*='arrowIcon_']");},
'-1064779059': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog#myTeamDialog [data-testid*=myTeamList]");},
'-1931687215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find(".sapMTitle span").filter(":containsTextNodeIgnore("+ fixed.btnText +")")},
'-2059935341': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".globalQuickActionText").filter("[data-help-id='"+fixed._elemHref+"']");},
'-643375239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id*='_help_compNewUIV']").find("button,a").filter("[title=" + fixed.titleText + "]");},
'-1429188722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMessageBoxError .sapMDialogSection .sapMDialogScrollCont");},
'-81658035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMMessageBoxError header .sapMBarPH");},
'-1648271266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-bar-xweb-goalmanagementx").find("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+ fixed.btnText +")");},
'-94394197': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const containerElem = wmjQuery("#learninghome-app").find("ui5-input-xweb-common-search-widget").filter("[data-testid=common-search-input]").filter(":mt_visible");
const targetShadow = containerElem.length ? containerElem[0].shadowRoot : null;
if (targetShadow) {  
  return wmjQuery("input.ui5-input-inner", targetShadow);
}
return wmjQuery(); },
'-1958019836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    'xweb-goal-form[data-help-id="goalForm"]',
    { selector: "xweb-goal-form-text-field", isShadowChild: true },
    { selector: "ui5-textarea-sf-goal-form", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow =  sectionShadow.shadowRoot;
    return targetShadow && wmjQuery("textarea",targetShadow);
} else {
    return wmjQuery();
}},
'-1683448973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field,xweb-goal-form-number-field", firstShadow).filter("[id="+fixed._elemIndx+"]")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(".ui5-label-root", thirdShadow);
if (elem.length)
{  return elem;
}return wmjQuery();},
'-48400239': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field,xweb-goal-form-number-field", firstShadow).filter("[id="+fixed._elemIndx+"]")[0];
const secondShadow = second && second.shadowRoot;
const elem = wmjQuery(".goalFormWidget-label", secondShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-1867746701': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("xweb-goal-form-text-field,xweb-goal-form-number-field", firstShadow).filter("[id="+fixed._elemIndx+"]")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery("ui5-label-sf-goal-form", secondShadow)[0];
const thirdShadow = third && third.shadowRoot;
const elem = wmjQuery(".ui5-label-root", thirdShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-712396506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest("label").closest(".sapExtentUilibEditPageEffectiveDateVLToolbar").find(".sapMInputBaseIconContainer").find("span:last");},
'-1447530846': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const evnCheck = wmjQuery("xweb-shellbar")
if(evnCheck.length){
	return wmjQuery("[class*='MyTeamDialog_goToItem']").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible")
} 
return wmjQuery("#myTeamDialog").find("a").filter(":containsTextNode("+fixed.lmText+")")},
'-486452036': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elem = wmjQuery("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.elemText+")");
if (elem.length)
{
  return wmjQuery("button",elem[0].shadowRoot);
}
const first = wmjQuery("ui5-toolbar-xweb-goalmanagementx[data-help-id=goal-list-header-actions-bar]")[0];
const firstShadow = first && first.shadowRoot;

const elem2 = wmjQuery(firstShadow).find("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.elemText+")");
if (elem2.length)
{
  return wmjQuery("button",elem2[0].shadowRoot);
}
return  wmjQuery();},
'-844631814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let sectionShadow = ftHelper.findShadowDomWithoutUniqueContainer_2(
    wmjQuery,
    "xweb-goal-form",
    { selector: ".goalFormWidget-field[id='"+fixed._goalFormWidgetID+"']", isShadowChild: true }
);
if (sectionShadow) {
    const targetShadow = sectionShadow.shadowRoot;
    return targetShadow ? wmjQuery(targetShadow).find(".goalFormWidget-label") : wmjQuery();
} else {
    return wmjQuery();
}},
'-1346906624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*=swlang] + Label[for*=" + dollars[0] + "]:visible");},
'-589936223': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='heading']").filter(":contains("+fixed.labelText+")").closest("div.sapExtentUilibUtilEditFormGeneratorTableContainer").find("button").filter(":contains("+fixed.elemText+")").filter(':mt_visible:first');
},
'-618657383': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*='PageHeaderTitle']").find("span").filter(":contains("+fixed.elemText+")")},
'-591136629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-suggestion-item-custom-sf-header").filter(":containsTextNode("+fixed.btntext+")")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find("li");
}
return wmjQuery();},
'-1017459560': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.workBenchPipeElem").filter("[Id="+fixed._Id+"]");},
'-64915976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.fd-menu__title").closest("a[class*=" + dollars[0] + "]")},
'-1206110972': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElem = wmjQuery(".hoc-side-panel-header-as-of").find("a[onclick*=showPosition]");
const newElem = wmjQuery(".hoc-side-panel-header-as-of").find("button[onclick*=showPosition]");
if (oldElem.length) {
 return oldElem;
} else if (newElem.length) {
 return newElem;
}
return wmjQuery();},
'-571202679': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const firstTarget = wmjQuery("ui5-dialog#favoritesDialog")[0] ;
const targetShadow = firstTarget && firstTarget.shadowRoot;
if (targetShadow) {
  return wmjQuery("header#ui5-popup-header",targetShadow).filter(":contains("+fixed.lmText+")");
} 
  return wmjQuery("div[id$='header-BarPH']").filter(":contains("+fixed.lmText+")");},
'-1902943780': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let firstDom = wmjQuery("ui5-static-area-item-sf-header[data-ui5-stable=shellbar-todopanel-static]")[0].shadowRoot;
return wmjQuery("ui5-busy-indicator-sf-header.liContent",firstDom).filter(":containsTextNode("+fixed.elemText+")");},
'-1820688768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi, .sapMITHTextContent").filter(":containsTextNode("+fixed.lmText+")").closest(".sapMBtnBase, .sapMITBItem");},
'-671006189': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=LineClampText_lineClamp]").filter(":containsTextNode("+fixed.lmText+")").closest("[class*=CustomCard_content]");},
'-254433117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=LineClampLink_root]").filter(":containsTextNode("+fixed.lmText+")").closest("[class*=CustomCard_content]");},
'-1243034599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item").filter(":containsTextNode("+fixed.btnText+")");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("li") : wmjQuery();},
'-901448998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-shellbar-sf-header");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").find(".menuItemSpace").filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'-687213699': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".revolutionTSInfoLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest(".revolutionTSInfo");},
'-1546724664': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._datahelpid+"]").find("textarea");},
'-1497599430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title").filter(":containsTextNode("+fixed.hdrTxt+")").next("ui5-panel").find("ui5-radio-button").filter("[data-testid*='"+fixed._dataTestidAttr+"']");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-radio-root") : wmjQuery();},
'-403217322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-dialog__header").find(".pwhHeaderTitle");},
'-356404998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-sf-talent-feedback").filter(":containsTextNode("+fixed.elmTxt+")") ;
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-root") : wmjQuery();},
'-1041427940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button").filter("[data-help-id='"+fixed._btnAttr+"']");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-949208148': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-table[id='"+fixed._btntext+"']").find("ui5-table-row").filter(":first")[0];
const firstShadow = first && first.shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-checkbox[id='selection-component']")[0];
const secondShadow = second && second.shadowRoot;
if (secondShadow)
{
  return wmjQuery(secondShadow).find(".ui5-checkbox-inner");
}
return wmjQuery();},
'-1770630154': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-shellbar-sf-header");
const secondShadow = second.length && second[0].shadowRoot;
const third = secondShadow && wmjQuery(secondShadow).find("ui5-button-sf-header").filter("[icon='"+fixed._iconAttr+"']");
const thirdShadow = third.length && third[0].shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find("button") : wmjQuery();},
'-820950634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sidebarContainer").find("[role=button]").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1326647457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toolbar-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmText+")")[0];
const secondShadow = second && second.shadowRoot;

if(secondShadow){
  return wmjQuery(secondShadow).find("button");
}


return wmjQuery();},
'-2069023745': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMFlexBox").next(".sapMFlexBox").find("input");},
'-922940127': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".MDFLabel").filter(":contains("+fixed.labelText+")").closest(".form_field").find("button.context_icon");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1109193770': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.labelTxt+")").closest(".section_title").find("button");},
'-1678293853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toolbar-xweb-form-inbox").filter("[accessible-name="+fixed.parentAccessibleName+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-form-inbox").filter(":containsTextNode("+fixed.parentText+")")[0];
const secondShadow = second && second.shadowRoot;

if(secondShadow){
  return wmjQuery(secondShadow).find("button").filter("[aria-controls="+fixed.lmAriaControls+"]");
}

return wmjQuery();},
'-728590293': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-sf-talent-feedback").filter(":containsTextNode("+fixed.parentText+")")[0];
const firstShadow = first && first.shadowRoot;

if(firstShadow){
  return wmjQuery(firstShadow).find(".ui5-label-text-wrapper");
}



return wmjQuery();},
'-346408735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-goal-linked-activities").filter(":containsTextNode("+fixed.lmText+")").closest("[slot='header']");},
'-554491794': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabelTextWrapper").filter(":containsTextNode("+fixed.txt+")").closest("[id*='layout'].sapUiVlt").find("input");},
'-452107307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link-ilx").filter("[id="+fixed._lmId+"]").find("span");},
'-2047828447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.colText+")").closest("table").find("tbody").find("tr").first().find("td.cell").filter(":eq("+fixed.indx+")");},
'-35298919': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("div").filter("[data-testid="+fixed._lmAttr+"]").find("ui5-label-xweb-versatile-writing-assistant")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("span.ui5-label-text-wrapper");
return elem.length ? elem : wmjQuery();},
'-1094398931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon-xweb-versatile-writing-assistant").filter("[data-id="+fixed._lmAttr+"]");},
'-1146628128': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNode("+fixed.hdrTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find(".sapExtentUilibUtilEditFormGeneratorAddRowButton");},
'-678435386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link[role=heading]").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=CardWrapper_clickableArea][data-testid*=clickableArea]");},
'-904315231': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
const first = wmjQuery("feedback-question-answer-sf-talent-feedback").filter("[id="+fixed._lmId+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-textarea-sf-talent-feedback")[0];
const secondShadow = second && second.shadowRoot;

const elem = wmjQuery(secondShadow).find("textarea");
return elem.length ? elem : wmjQuery();},
'-1808861123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
const first = wmjQuery("ui5-static-area-item-xweb-versatile-writing-assistant")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-menu-li-xweb-versatile-writing-assistant")[0];
const secondShadow = second && second.shadowRoot;

const elem = wmjQuery(secondShadow).find(".ui5-menu-item-text").filter(":containsTextNode("+fixed.lmText+")").closest(".ui5-li-content");
return elem.length ? elem : wmjQuery();},
'-384905053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").find("a").filter(":containsTextNode("+fixed.txt+")");},
'-570293842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='taskTitle']").filter(":containsTextNode("+fixed.txt+")").closest("[data-testid='sidebarListItem']").find("div:first");},
'-1437990852': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUiIcon").filter("[data-help-id*='"+fixed._datahelp+"'][data-sap-ui-icon-content='"+fixed._lmicon+"']").find(".sapUiIconTitle");},
'-797461265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").filter("[data-help-id="+fixed._parentAttr+"]").find(".sapExtentUilibFormPatternBlockTitle");},
'-281695750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sectionTitle").filter(":containsTextNode("+fixed.lmText+")").closest(".columnDataSection");},
'-1398195659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-text-sf-talent-feedback, [class*=Text]").filter("[data-testid="+fixed._lmAttr+"]");},
'-687835848': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-text-xweb-goalmanagementx").filter(":containsTextNode("+fixed.cardText+")").closest("ui5-card-xweb-goalmanagementx").find("ui5-button-xweb-goalmanagementx");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-1617045307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").filter("[data-help-id="+fixed._datahelpid+"]").closest(".sapUxAPBlockBase");},
'-637432671': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine").filter(":containsTextNode("+fixed.lmText+")").closest(".sapFCard");},
'-1518111271': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-panel-xweb-goalmanagementx[accessible-name='Unit Goal']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-panel-header-title").filter(":containsTextNode(" + fixed.elemText + ")") : wmjQuery();},
'-1401696112': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.labelTitle+"]").closest(".sapUiVlt").find(".sapMInputBaseInner");},
'-2086686430': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapMLabel").filter(":containsTextNode("+fixed.txt+")").closest(".sapMFlexBox").find(".sapMSwtLabel");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-644313339': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon[name="+fixed._iconName+"]").closest("button[data-testid=quickActionTileButton]");},
'-1222518476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapMInputBase").filter("[data-help-id='"+fixed._datahelpid+"']").closest(".sapUiVltCell");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1040618545': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input").closest(".sapUiVltCell");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-754921753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBaseContentWrapper");},
'-1001671085': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("bdi");

return elem.length ? elem : wmjQuery();
},
'-1832019056': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-learning-manager").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("h1").find("span");
return elem.length ? elem : wmjQuery();},
'-1049408027': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx[accessible-name*='"+fixed._btntext+"']").filter(":mt_visible")[0];
const firstShadow = first && first.shadowRoot;
if (firstShadow)
{
  return wmjQuery(firstShadow).find("button");
}
return wmjQuery();},
'-1126571638': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[ui5-button]").filter(":containsTextNode("+fixed.linkText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("button.ui5-button-root",firstShadow): wmjQuery();},
'-1230364060': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1287736237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-sf-header").filter("[data-ui5-stable="+fixed._parentAttr+"]")[0];
const firstShadow = first && first.shadowRoot;

if(firstShadow){
  return wmjQuery(firstShadow).find(".section.title").filter(":containsTextNode("+fixed.lmTitleText+")").closest("ui5-busy-indicator-sf-header");
}


return wmjQuery() ;},
'-2084562485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("[class*=CustomCard_content]");},
'-843905950': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-utility-links")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find(".menuItemSpace").filter(":containsTextNode("+fixed.lmText+")")

return elem.length ? elem : wmjQuery();
},
'-1694475898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item-ilx").filter("[id*='"+fixed._lmText+"']")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("div.ui5-li-content");
return elem.length ? elem : wmjQuery();},
'-1235542345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapUiVlt");},
'-60641795': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=panelTitle]").filter(":containsTextNode("+fixed.lmText+")");},
'-160331167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[title="+fixed.lmTitle+"]").closest(".globalMenuItem");},
'-2130840207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-cb-item:eq(03)")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery("span",firstShadow).filter(":containsTextNode(" + fixed.elemText + ")").closest("div#content") : {};},
'-2049551925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.txt+")").closest(".formFieldLabel").closest("tr").find("button").first();},
'-476920912': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapIcon").filter("[data-help-id="+fixed._lmdata+"]");},
'-46806546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.sectionH+")").closest(".pmPanelContent").find(".sfObjectPageSectionLabel").filter(":containsTextNode("+fixed.txt+")").closest(".pm2ReviewInfo").find(".expRating");},
'-72070748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.sectionH+")").closest(".pmPanelContent").find(".expRating");},
'-1028437406': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-icon").filter("[data-testid="+fixed._lmAttr+"]").closest("div[class*=CardWrapper_cardContent]");},
'-2133208204': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter("[title="+fixed.lblAttr+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input").closest(".sapUiHLayoutChildWrapper");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1164907775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("header").find(":header").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest(".sapMBarPH").find(".sapUiIcon");},
'-1798899238': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.LabelText+")").closest(".sapUiVltCell").next("div").find(".sapMInputBaseContentWrapper");},
'-1296829736': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMWizardStepTitle").filter(":containsTextNode("+fixed.hdrtext+")").closest(".sapMWizardStep").find("bdi").filter(":containsTextNode("+fixed.txt+")").closest(".sapMLabel");},
'-925160983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-shellbar-sf-header");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".menuItemSpace, .ui5-shellbar-menu-button-title").filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'-383678133': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemDesc").filter(":contains("+fixed.ratingQuestion+")").closest(".pmPanelContent").find(".fd-input-group__button");},
'-1460761935': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMApp").find(".sapMTitle").filter(":containsTextNode("+fixed.panelHeader+")").closest(".sapMPanel").find(".sapMInputBase").filter("[data-help-id="+fixed._dataHelpIdParent+"]").find("input");},
'-810182557': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.sapMTitle").closest("div[role=dialog]").find(".sapMInputBase[data-help-id="+fixed._dataHelpAttr+"]").find("input");},
'-673079979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerText+")").parent(".sapMTitle").closest(".sapExtentUilibUtilEditFormGeneratorTableContainer").find(".sapMTableTBody");},
'-1953489273': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.headerText+")").closest("[class^=sapUiRespGridSpan]");},
'-307444690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapMLabel").filter("[title="+fixed.headerText+"]").closest(".sapUiRespGridBreak").find("button.sapMBtn").filter(":contains("+fixed.elemText+")");},
'-1290307021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerText+")").parent(".sapMIBar").closest(".sapMPanelHeadingDiv").closest(".sapMPanelExpandable").find("div.sapMPanelContent");},
'-1064148398': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.headerText+")").parent(".sapMIBar").closest(".sapMPanelHeadingDiv").closest(".sapMPanelExpandable").find("div.sapUiRespGrid");},
'-1447576812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle:header").filter(":containsTextNode("+fixed.dialogHeaderText+")").closest("[role='alertdialog']").find("button").filter(":containsTextNode("+fixed.elemText+")");},
'-1126667269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible")[0];
const firstShadow = first && first.shadowRoot ;;
const elem = wmjQuery(firstShadow).find(".ui5-segmented-button-item-text").find("bdi");
return elem.length ? elem : wmjQuery();
},
'-735524909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-goal-form-input-table")[0];
const secondShadow = second && second.shadowRoot ;
const third = wmjQuery(secondShadow).find("ui5-button-sf-goal-form").filter("[id="+fixed._lmText+"]")[0];
const thirdShadow = third && third.shadowRoot ;
const elem = wmjQuery(thirdShadow).find("button");
return elem.length ? elem : wmjQuery();},
'-1822982029': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const lmStart = wmjQuery("[name='fbproxy_start']").filter("[id="+fixed._lmIdStart+"]");
const lmEnd = wmjQuery("[name='fbproxy_end']").filter("[id="+fixed._lmIdEnd+"]");

if(lmStart.length && lmEnd.length){
  return lmStart.closest("td");
}

return wmjQuery();},
'-501451934': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid=card-header-title]").filter(":containsTextNodeIgnore("+fixed.cardHdrTxt+")").closest("[data-testid=cardWrapper]").find("[id*=viewAll]");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-button-root") : wmjQuery();},
'-476555195': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=ApprovalCard]").find("[data-testid*=contentTitle]").filter(":containsTextNodeIgnore("+fixed.cardHdrTxt+")").closest("[data-testid=cardWrapper]").find("[data-testid=viewAll]");
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-2044133619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field_label").find("span[id*=text]").filter(":containsTextNodeIgnore("+fixed.elemText+")");},
'-1276265829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter("[data-help-id="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("li");
return elem.length ? elem : wmjQuery();},
'-416139048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".RowHeaderText").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'-1873600600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentId+"]").find("a").filter("[title="+fixed.lmTitle+"]").closest("p");},
'-1767930624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLnkText").filter(":containsTextNode("+fixed.LabelText+")").closest("ol");},
'-318211790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTextMaxLine").filter(":containsTextNode("+fixed.LabelText+")").closest(".sapMFlexBox");},
'-106767063': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._childAttr+"]").closest(".sapUiVltCell");},
'-1824026322': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pmItemName").filter(":containsTextNode("+fixed.sectionHeaderText+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find(".search-box").find(".fd-input-group");},
'-1942763258': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-help-id=editDialog_DEPENDENT_INFORMATION]").find("button").filter("[title="+fixed.elmTitle+"]").eq(fixed.elmIndex);},
'-1147524358': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-help-id='"+fixed._dialogAttr+"']").find(".sapExtentUilibUtilEditFormGeneratorToolbar").filter("[id='"+fixed._toolbarId+"']").find("button").filter("[title="+fixed.elmTitle+"]");},
'-842660931': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogSection").find(".sapMLabelTextWrapper").filter(":containsTextNode("+fixed.txt+")").closest(".sapExtentUilibYouMayAlso");},
'-443277675': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*='SummaryCard_headerTitle']").filter(":containsTextNode("+fixed.elemHeader+")").closest("ui5-card-xweb-people-profile-admin").find("ui5-label-xweb-people-profile-admin").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("label").find("span.ui5-label-text-wrapper");
return elem.length ? elem : wmjQuery();},
'-129052459': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".richTextContent").find("p").find("img")},
'-1897357526': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-company-orgchart").filter("[accessible-name='" + fixed._elemAttr + "']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-button-root") : wmjQuery();},
'-950830511': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialogFooter").children("div");},
'-1112513833': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHeadingDiv").next(".sapMPanelContent").eq(1);},
'-1408569605': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-segmented-button-item").filter(":containsTextNode("+fixed.elemTxt+")").filter(":mt_visible")[0];
let firstShadow = first && first.shadowRoot ;
let elem = wmjQuery(firstShadow).find("li");
if (elem.length) {return elem;} 

first = wmjQuery("ui5-button").filter(":containsTextNode("+fixed.elemTxt+")")[0];
 firstShadow = first && first.shadowRoot ;
elem = wmjQuery(firstShadow).find("button");

return elem.length ? elem : wmjQuery();
},
'-950167505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapUiVlt").find("input");},
'-2074510586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-static-area-item-xweb-versatile-writing-assistant")[1];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("[accessible-name='Make More Professional']", firstShadow)[0];
const secondShadow = second && second.shadowRoot;

let elem1 =  secondShadow ? wmjQuery(secondShadow).find(".ui5-li-content") : wmjQuery();

if (elem1.length) {
 	return elem1; 
}

const first1 = wmjQuery("[data-label='Make More Professional']")[0];
const firstShadow1 = first1 && first1.shadowRoot;

let elem2 =  firstShadow1 ? wmjQuery(firstShadow1).find(".ui5-li-content") : wmjQuery();

if (elem2.length) {
 return elem2;
}

return wmjQuery();},
'-1829183117': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNode("+fixed.cardText+")").closest("[class*=StandardCard_body]");},
'-575675001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-link").filter(":containsTextNode("+fixed.cardTitleText+")").closest("[data-testid='cardWrapper']");},
'-1991000161': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".positionTitle").filter(":containsTextNodeIgnore("+fixed.labelTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root").find("span") : wmjQuery();},
'-1503511880': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-manifest-toolkit").filter(":containsTextNode("+fixed.labelTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'-2007784883': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery(".positionTitle").filter(":containsTextNodeIgnore("+fixed.labelTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root").find("span") : wmjQuery();},
'-969915598': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-segmented-button-item").filter(":containsTextNode("+fixed.elemTxt+")").filter(":mt_visible")[0];
let firstShadow = first && first.shadowRoot ;
return wmjQuery(firstShadow).find("li").find("bdi");},
'-38330199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-segmented-button-item").filter(":containsTextNode("+fixed.elemTxt+")").filter(":mt_visible")[0];
let firstShadow = first && first.shadowRoot ;
return wmjQuery(firstShadow).find("li");},
'-2101259595': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-segmented-button-item-xweb-myteam-content,ui5-segmented-button-item").filter(":containsTextNode("+fixed.elemTxt+")")[0];
const shadow = first && first.shadowRoot;
return shadow ? wmjQuery(shadow).find(".ui5-button-root bdi") : wmjQuery();},
'-1501960478': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant").filter("[data-id=" + fixed._titleText + "]");},
'-1670250816': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item-xweb-learning-manager").filter("[text='"+fixed._lmText+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-content") : wmjQuery();


},
'-1545035028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-card-xweb-manifest-toolkit").filter("[id='"+fixed._lmText+"']")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("ui5-busy-indicator-xweb-manifest-toolkit")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find(".ui5-busy-indicator-root");
return elem.length ? elem : wmjQuery();},
'-131378127': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMListTblHeaderCell").filter(":containsTextNode("+fixed.labelText+")").find("bdi");},
'-1876512920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-side-navigation-sub-item-xweb-form-inbox")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-sn-item") : wmjQuery();},
'-323475750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-split-button-xweb-performance-management")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("ui5-button-xweb-performance-management").filter("[tooltip='"+fixed._parentToolTip+"']")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("button").filter("[title="+fixed.lmTitle+"]") : wmjQuery();

},
'-1333969004': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-wizard-step-xweb-goalmanagementx").filter("[data-help-id="+fixed._lmDataHelpId+"]").find("ui5-title-xweb-goalmanagementx").closest("div");},
'-1053923834': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[name="+fixed._parentName+"]")[0];
const secondShadow = second && second.shadowRoot;
const third= wmjQuery(secondShadow).find("ui5-label-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
return secondShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();



},
'-1450280145': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-date-field").filter("[name="+fixed._parentname+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-date-picker-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

const fourth = thirdShadow ? wmjQuery(thirdShadow).find("ui5-icon-sf-goal-form") : wmjQuery();
const fourthShadow = fourth.length ? fourth[0].shadowRoot : null;

return fourthShadow ? wmjQuery(fourthShadow).find("svg") : wmjQuery();


},
'-1656035839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter("[icon="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("li");
return elem.length ? elem : wmjQuery();},
'-1286891359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfPeopleProfileBlockTitle").find(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNode("+fixed.lmText+")");},
'-145983186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPageHeader").find(".sapMTitle").filter(":containsTextNode("+fixed.txt+")");},
'-2014504282': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase").filter("[data-help-id="+fixed._dataHelpId+"]").find("input[id*=picker]");},
'-1514575122': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter("[icon="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("li");
return elem.length ? elem : wmjQuery();},
'-1991228205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const key1 = wmjQuery("ui5-label").filter(":containsTextNode("+fixed.labelTxt+")").last()[0];
const key1Shadow = key1 && key1.shadowRoot;
return key1Shadow ? wmjQuery(key1Shadow).find("label") : wmjQuery();
},
'-358448118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-form-inbox").filter(":containsTextNode("+fixed.lmTitle+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[id*=inner]") : wmjQuery();



},
'-2145385659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-xweb-homepagex").filter(":containsTextNode("+fixed.titleText+")").closest("[data-testid=cardWrapper]").find("ui5-button-xweb-homepagex[id$=viewAll]").filter("[data-testid="+fixed._btnAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery(); },
'-252256903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-homepagex").find(".sfDialogHeaderEnd").find("ui5-button-xweb-homepagex").filter("[data-testid='"+fixed._btnAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(firstShadow).find("button");
return elem.length ? elem : wmjQuery(); },
'-1442388760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='quickActionTileButton'],[data-testid='quick-action-button']").filter("[data-help-id*="+fixed._lmId+"]");},
'-2119542925': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-side-navigation-item-xweb-global-header").filter("[icon="+fixed._btnText+"]");},
'-1128960867': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-user-settings-dialog-xweb-global-header[data-testid=profileUserSettings]")[0];
let firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("ui5-li-xweb-global-header[id*=setting]").filter(":containsTextNode("+fixed.lmText+")");
return elem.length ? elem : wmjQuery();},
'-1194568662': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-button-xweb-homepagex").filter("[data-testid="+fixed._elemAttr+"]");},
'-1506397298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='quick-action-button'],[data-testid='quickActionTileButton']").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-810939327': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-shellbar-search-xweb-global-header")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find(".ui5-search-field-inner-input");
return elem.length ? elem : wmjQuery();},
'-5472682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElemParent = wmjQuery("ui5-shellbar-search-xweb-global-header").find("ui5-avatar-xweb-global-header").closest("ui5-search-item-xweb-global-header").eq(fixed.suggestionIndx);
const newElemShadow = newElemParent.length ? newElemParent[0].shadowRoot : null;
const targetNewElm = newElemShadow ? wmjQuery(newElemShadow).find(".ui5-search-item-titles-container") : wmjQuery();
return targetNewElm.length ? targetNewElm : wmjQuery();
},
'-38659254': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const newElemParent = wmjQuery("ui5-shellbar-search-xweb-global-header").find("ui5-avatar-xweb-global-header").closest("ui5-search-item-xweb-global-header").eq(fixed.suggestionIndx);
const newElemShadow = newElemParent.length ? newElemParent[0].shadowRoot : null;
const targetNewElm = newElemShadow ? wmjQuery(newElemShadow).find(".ui5-search-item-text") : wmjQuery();
return targetNewElm.length ? targetNewElm : wmjQuery();},
'-1322007506': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-li-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("li") : wmjQuery();},
'-1763766619': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-switch-xweb-company-settings").filter("[id='"+fixed._elemAttr+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-switch-root[aria-checked=false]") : wmjQuery();

},
'-1758379348': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-shellbar-branding-xweb-global-header");
const firstShadow = first && first[0].shadowRoot;
return wmjQuery(firstShadow).find("span.ui5-shellbar-logo");
 return wmjQuery();},
'-841459624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer-xweb-global-header");
const firstShadow = first && first[0].shadowRoot;
return wmjQuery(firstShadow).find(".ui5-tab-strip-item").filter(":containsTextNode("+fixed.elemTxt+")");
 return wmjQuery();},
'-506358257': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-shellbar-xweb-global-header")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-global-header").filter("[data-help-id=bizxHeaderUserMenuButton]")[0];
const secondShadow = second && second.shadowRoot ;
let elem = wmjQuery(secondShadow).find("button");
return elem.length ? elem : wmjQuery();
},
'-1634787724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-user-menu-item-xweb-global-header").filter("[icon="+fixed._btnText+"]")[0];
const firstShadow = first && first.shadowRoot;
let elem = wmjQuery(firstShadow).find("li");
return elem.length ? elem : wmjQuery();},
'-675807904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("[ui5-button]").filter("[data-testid="+fixed._dataTestId+"]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'-1358929111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-label="+fixed.lmAriaLabel+"]");},
'-944564216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id^=label]").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1008342461': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=label]").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find(".comboBox");},
'-283772417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("p:not(:has(img))").filter(":containsTextNode("+fixed.labelText+")").closest(".nrte_content").find(".pmuTextTruncateControl");},
'-2013954988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[role='heading']").filter(":containsTextNodeIgnore("+fixed.headerTxt+")").closest("ui5-card-xweb-people-profile").find("ui5-button-xweb-people-profile").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-1537054720': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-combobox").filter("[data-testid='"+fixed._datatestid+"']").filter(":mt_visible").last();
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("ui5-icon[name*=arrow]") : wmjQuery();},
'-917471183': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-combobox").filter("[data-testid='"+fixed._datatestid+"']").filter(":mt_visible").first();
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("ui5-icon[name*=arrow]") : wmjQuery();},
'-1661142521': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-ilx").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[id$=inner]"): wmjQuery();
},
'-1278955007': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMTitle").filter(":containsTextNodeIgnore("+fixed.elmTxt+")").closest(".sapMPanel").find(".sapExtentUilibUtilEditFormGeneratorShowMoreLessButton");},
'-732365045': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-performance-management").filter("[title=" + fixed.elemTitle + "]")[0];
const firstShadow = first && first.shadowRoot;
const elem = wmjQuery(".ui5-title-root span", firstShadow);
if (elem.length)
{
  return elem;
}
return wmjQuery();},
'-2030402462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-manifest-toolkit").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first && first.shadowRoot ;
const elem = wmjQuery(firstShadow).find("h2").find("span");
return elem.length ? elem : wmjQuery();},
'-81438460': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toolbar-button-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-goalmanagementx").filter(":containsTextNode("+fixed.lmText+")")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find("button");

return elem.length ? elem : wmjQuery();
},
'-92245790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-card").find("[class*='InfoLabel']").filter(":containsTextNode("+fixed.txt+")");},
'-1020274865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-card-xweb-performance-management").find("div").filter("[data-help-id=" + fixed._titleText + "]").find("ui5-label-xweb-performance-management[data-testid='pmu_component_BoldText']");},
'-1319080068': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='pmu_component_PageSection']").find("ui5-title-xweb-performance-management").filter("[title=" + fixed.titleText + "]");},
'-1014426419': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='pmu_component_PageSection']").find("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+ fixed.titleText +")")},
'-1963393866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-button").filter("[data-testid="+fixed._elemAttr+"]");},
'-2100584291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest("[id*=PageSection]").find("[class*=PageSectionContent]");},
'-400418872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=PageSectionHeader]").filter(":containsTextNodeIgnore("+fixed.hdrTitle+")").find("[ui5-toolbar-button]").filter("[icon='"+fixed._btnIcon+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".ui5-tb-button") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("button") : wmjQuery();},
'-1854241849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest("[data-testid='pmu_component_PageSectionHeader']").find("[icon='"+fixed._btnIcon+"']").closest("[data-component-name='ToolbarContent']");},
'-1789980474': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dynamic-page").filter("[id="+fixed._pageId+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-dynamic-page-header-actions")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-button")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find("button").filter("[title="+fixed.lmTitle+"]") : wmjQuery();},
'-1311451927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toolbar-button-xweb-goalmanagementx").filter("[data-help-id="+fixed._parentText+"]")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-button-xweb-goalmanagementx")[0];
const secondShadow = second && second.shadowRoot;

return secondShadow ? wmjQuery(secondShadow).find("button"): wmjQuery();},
'-1855754724': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter("[title="+fixed.lmTitle+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[id*=inner]"): wmjQuery();},
'-565203277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-manifest-toolkit").filter("[tooltip='"+fixed._parentId+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("button").filter("[aria-label="+fixed.lmAriaLabel+"]"): wmjQuery();},
'-624824434': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile").filter("[title="+fixed.parenttitle+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[id*=inner]") : wmjQuery();},
'-2020550490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-side-navigation-item-xweb-form-inbox").filter("[data-name="+fixed._lmAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[class*=item-text]").filter(":containsTextNode("+fixed.lmText+")"): wmjQuery();},
'-1279142623': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-side-navigation-sub-item-xweb-form-inbox").filter("[tooltip="+fixed._parentToolTip+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("[role='treeitem']").filter("[title="+fixed.lmTitle+"]") : wmjQuery();},
'-2017252698': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[title="+fixed.lmTitle+"]");},
'-903958909': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {
const elmlContainers = wmjQuery("ui5-dialog").find("ui5-cb-item").filter(":mt_visible");
for (const elmlContainer of elmlContainers) {
  const shadowRoot = elmlContainer.shadowRoot;
  if (!shadowRoot) continue;
  const labelElm = wmjQuery(shadowRoot).find(".ui5-li-title").filter(":containsTextNode("+fixed.lmText+")").closest(".ui5-li-content[part=content]");
  if (labelElm.length) return labelElm;
  }
return wmjQuery();
},
'-507198979': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.mainLabelText+")").closest("div.sfObjectPageSection").find("th").filter(":containsTextNode("+fixed.lmText+")").closest("tr").next("tr").find(".ezRaterExpandControlIcon");},
'-1752423318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.lmText+")").closest(".sapMLabelTextWrapper").closest(".sapUiVltCell").next(".sapUiVltCell").find("input");},
'-326005290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-dialog").find("ui5-label").filter(":containsTextNode("+fixed.lblText+")").closest("ui5-table-header-cell").last();},
'-1947176924': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowLm = wmjQuery("ui5-dialog-xweb-mini-app-dialog").filter("[data-testid="+fixed._lmAttr+"]")[0];
const shadowLmOpen = shadowLm ? shadowLm.shadowRoot : wmjQuery();
return shadowLmOpen ? wmjQuery(shadowLmOpen).find("section[role='dialog']") : wmjQuery();},
'-1352235496': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid=goalWizardDialog]");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-popup-header-text").filter(":containsTextNodeIgnore("+fixed.elmtxt+")") : wmjQuery();},
'-849697678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=ContextSwitcher_contingentWorker]").filter(":containsTextNode("+fixed.lmText+")");},
'-999286484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=inner][id*=title]").filter(":containsTextNode("+fixed.tableTitleText+")").closest(".sapMPanelContent").find(".sapUiVlt").children(".sapUiVltCell").eq(fixed.lmIndex).find("button")
.filter(":containsTextNode("+fixed.lmText+")");},
'-1685045678': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("ui5-tabcontainer-sf-header")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("a").filter(":containsTextNode("+fixed.lmText+")").closest(".ui5-tab-strip-itemContent") : wmjQuery();
},
'-812512956': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.lmTitle+"]").closest(".buttonset ");},
'-1367910840': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name="+fixed._lmTitle+"]").closest(".buttonset ");},
'-347885366': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".statusItem").filter("[id="+fixed._sectionId+"]").find("select");},
'-1162731260': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name="+fixed._buttonName+"]").closest('.' + fixed._lmClass);},
'-953581572': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[title="+fixed.buttonName+"]").closest('.' + fixed._lmClass);},
'-1394395528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.elemText+")");},
'-2032375428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-goal-form-field-label")[0];
const secondShadow = second && second.shadowRoot ;
const third = wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.lmText+")")[0];
const thirdShadow = third && third.shadowRoot ;
const elem = wmjQuery(thirdShadow).find(".ui5-label-text-wrapper");

return elem.length ? elem : wmjQuery();
},
'-54147876': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("[id*=datepicker]");},
'-669469325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[id*=text]").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("button");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1825986347': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+"), :containsTextNode(When should these changes take effect?)").closest(".sapUiVlt,.sapUiCompFilterBarItem").find(".sapMInputBaseIconContainer").find(".sapUiIcon");},
'-16665599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.labelText+")").closest("[role='form']").find("textarea");},
'-93002572': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[accessible-name='"+fixed._parentId+"']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("xweb-goal-form-text-field")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-input-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find("input") : wmjQuery();},
'-1872220976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter("[title="+fixed.labelTitle+"]").closest("ui5-dynamic-page-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-dynamic-page-title-root") : wmjQuery();},
'-1173944051': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id='"+fixed._pageTitleText+"']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("form").filter("[aria-label="+fixed.lmAriaLabel+"]") : wmjQuery();},
'-1034061851': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapUiVlt").find(".sapUiIcon").filter("[aria-label="+fixed.ariaLabel+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1072792399': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".sapUiVlt").find(".sapUiIcon").filter("[aria-label="+fixed.ariaLabel+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-463189345': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowSection = wmjQuery("ui5-label-xweb-people-profile").filter(":containsTextNode("+fixed.lblText+")").closest("ui5-form-item-xweb-people-profile").find("ui5-input-xweb-people-profile")[0];
const shadowElem = shadowSection ? shadowSection.shadowRoot : wmjQuery();
const elem = shadowElem ? wmjQuery(shadowElem).find("input") : wmjQuery();
return elem ? elem : wmjQuery();
},
'-410894811': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".documentHeader").find(".paneBodyTitle");},
'-348125692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-card-xweb-people-profile").filter("[id='"+fixed._parentID+"']").find("[class^='CardHeader_interactionContaine']");},
'-1226856460': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-form-xweb-people-profile").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("ui5-title-xweb-people-profile").filter(":containsTextNode("+fixed.elemText+")") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

return secondShadow ? wmjQuery(secondShadow).find("span") : wmjQuery();},
'-515402856': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-people-profile").filter("[data-type = "+fixed._dataType+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-1830887451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("tr").find(".sfComboBox");},
'-1878362380': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerTxt+")").closest(".pmPanelContent").find("label").filter(":containsTextNode("+fixed.elmTxt+")").parent("div");},
'-1172567998': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").children("span").filter(":containsTextNode("+fixed.elemText+")");},
'-1722630471': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let targetText = ftHelper.unQuote(wmjQuery().identity(fixed.targetText));
targetText = targetText ? targetText.split("(")[0] : null;
return wmjQuery(".currentSelectionText").filter(":contains("+targetText+")");},
'-1241232374': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-tabcontainer.feedbackTabsContainer")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-tc__header") : wmjQuery();},
'-1647166159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-date-picker-xweb-calendar-widget").filter("[title="+fixed.elmTitle+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".ui5-date-picker-input") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("input") : wmjQuery();},
'-636486283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find(".ui5-popup-header-text").filter(":containsTextNodeIgnore("+fixed.titleText+")")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".ui5-title-root span") : wmjQuery();},
'-1321027433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[ui5-title]").filter(":containsTextNodeIgnore("+fixed.titleText+")")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-title-root span") : wmjQuery();},
'-966102652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid*='component_PageSection']").find("ui5-title-xweb-performance-management").filter("[title=" + fixed.titleText + "]");},
'-2002218452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-date-picker-xweb-calendar-widget").filter("[title="+fixed.elmTitle+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".ui5-date-picker-input") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("input") : wmjQuery();},
'-1572348997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-label-xweb-dynamic-content").filter(":containsTextNode("+fixed.labelText+")").next("[class*=FormItem_content]").find("ui5-date-picker-xweb-dynamic-content").parent("div");},
'-1170765648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'-1775528781': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'-1099705510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;

const second = firstShadow && wmjQuery(firstShadow).find("xweb-goal-form-text-field").filter("[accessible-name='"+fixed._labelaccessiblename+"']").find("xweb-goal-form-field-label")[0];
const secondShadow = second && second.shadowRoot;

const third = secondShadow && wmjQuery(secondShadow).find("ui5-label-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
if (thirdShadow)
{
  return wmjQuery(thirdShadow).find(".ui5-label-text-wrapper");
}
return wmjQuery();},
'-1362115534': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first && first.shadowRoot;

const second = firstShadow && wmjQuery(firstShadow).find("xweb-goal-form-text-field").filter("[id='"+fixed._elemid+"']").find("xweb-goal-form-field-label")[0];
const secondShadow = second && second.shadowRoot;

const third = secondShadow && wmjQuery(secondShadow).find("ui5-label-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
if (thirdShadow)
{
  return wmjQuery(thirdShadow).find(".ui5-label-text-wrapper");
}
return wmjQuery();},
'-517664090': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-carousel-ilx")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery("ui5-button-ilx", firstShadow)[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find(".ui5-button-root") : wmjQuery();},
'-1283579820': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[id="+fixed._labelID+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-root.ui5-input-focusable-element") : wmjQuery();
},
'-938289714': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[accessible-name='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'-1765863536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();},
'-1137888290': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNode("+fixed.lmText+")") : wmjQuery();
},
'-1827030032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
},
'-1623415864': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find(".goalFormWidget-enumField") : wmjQuery();
},
'-1497645855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".goalFormWidget-formItem").find(".goalFormWidget-enumField") : wmjQuery();
},
'-826847463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[accessible-name='"+fixed._parentAttr+"']").find("xweb-goal-form-field-label") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form").filter(":containsTextNodeIgnore("+fixed.lmText+")") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-text-wrapper") : wmjQuery();},
'-1271976001': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._parentAttr+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-enum-field").filter("[id="+fixed._parentId+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-select-root") : wmjQuery();
},
'-834757023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id='"+fixed._parentIAttr+"']")[0];
const firstShadow = first && first.shadowRoot;
const second = wmjQuery(firstShadow).find("xweb-goal-form-text-field").filter("[id='"+fixed._parentId+"']")[0];
const secondShadow = second && second.shadowRoot;
const third = wmjQuery(secondShadow).find("ui5-input-sf-goal-form")[0];
const thirdShadow = third && third.shadowRoot;
return thirdShadow ? wmjQuery(thirdShadow).find("input") : wmjQuery();},
'-2031948028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._parentAttr+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id="+fixed._parentId+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-date-picker-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find("ui5-input-sf-goal-form") : wmjQuery();
},
'-1225002578': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-text-field") : wmjQuery();
const secondShadow = second.length ? second[1].shadowRoot : null;

const third = secondShadow ? wmjQuery(secondShadow).find("ui5-textarea-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;

return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-textarea-inner") : wmjQuery();},
'-1560706650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find(".sectionTitle").filter(":containsTextNode("+fixed.lmText+")");},
'-1488510343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNodeIgnore("+fixed.labelTitle+")").closest("ui5-dynamic-page-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-dynamic-page-title-root") : wmjQuery();},
'-1528629497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.sidepaneldetailsectionlabel").filter(":containsTextNode("+fixed.labelText+")").next("td.sidepaneldetailsectionvalue");},
'-1304367344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").find("[slot='label']").filter("[name='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find(".ui5-label-root") : wmjQuery();},
'-2018475405': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._fieldId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find(".goalFormWidget-enumField") : wmjQuery();},
'-1330986697': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-people-profile[data-testid='spotlightToggle']").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".ui5-button-root") : wmjQuery();},
'-949889810': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").first();
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field[name='"+fixed._parentId+"']") : wmjQuery();},
'-1529793228': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.elemText+")").parent("p");},
'-2058698009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot ;
return firstShadow ? wmjQuery(firstShadow).find("h1").filter("[id="+fixed._lmId+"]") : wmjQuery();},
'-2111067444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._FormData+"]");
const firstShadow = first.length ? first[0].shadowRoot : null;

return firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field[name='"+fixed._parentId+"']") : wmjQuery();},
'-1091139626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-dialog-xweb-goal-ai")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-popup-header-root").filter("[id="+fixed._lmId+"]") : wmjQuery();},
'-1000461702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("ui5-dynamic-page-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-dynamic-page-title-focus-area") : wmjQuery();},
'-1969734420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form").filter("[data-help-id="+fixed._formDataHelpId+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-form").filter("[aria-label="+fixed.lmAriaLabel+"]"): wmjQuery();},
'-613083904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.headerText+")").closest(".ectFCTopHeader").next("[id*='focusContainer']").find("[id*='contentBlock']").children("div").first();},
'-2121256376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.lmText+")").closest("[id*=primary]");},
'-817072659': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.labelText+")").closest(".sapMListTblSubCntRow").find(".sapMInputBaseContentWrapper");},
'-1996817517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-goalmanagementx").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest("ui5-dynamic-page-title-xweb-goalmanagementx")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-dynamic-page-title-focus-area") : wmjQuery();},
'-174654635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-icon-xweb-performance-management").filter("[name="+fixed._parentName+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("svg.ui5-icon-root"): wmjQuery();},
'-2024671457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("[id*=header-Bar]").find("[id*=title-inner]");},
'-71550387': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first =  wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant").filter("[data-id='"+fixed._dataId+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("li") : wmjQuery();},
'-1492563850': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").filter("[data-column-id='"+fixed._elmAttr+"']");},
'-1058489043': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first =  wmjQuery("ui5-menu-item-xweb-versatile-writing-assistant").filter("[data-id='"+fixed._dataId+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-li-content") : wmjQuery();},
'-459872013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter("[title="+fixed.hdrTxt+"]").closest("[id*=PageSection]").find("[class*=PageSectionContent]");},
'-1069552882': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMITHTextContent").filter(":containsTextNodeIgnore("+fixed.labelText+")").closest(".sapMITBItem").find(".sapUiIconTitle");},
'-186271626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-sf-talent-feedback").filter("[for='"+fixed._elmAttr+"']") ;
const firstShadow = first.length && first[0].shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-label-root") : wmjQuery();},
'-1593860492': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("[data-help-id='"+fixed._datahelpid+"']").closest(".sapExtentUilibUtilEditFormGeneratorField").find("label").find("bdi");},
'-1107212278': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("label").filter("[title="+fixed.labelTitle+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find("input");},
'-1138596741': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("[data-help-id='"+fixed._datahelpid+"']").closest(".sapExtentUilibUtilEditFormGeneratorField").find("label").find("bdi");},
'-212339483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".sapExtentUilibUtilEditFormGeneratorPanelExpanded").find("bdi").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-250086642': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter("[title*=" + fixed.titleText + "]").next();},
'-750459695': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBase[data-help-id='"+fixed._datahelpid+"']").closest(".sapUiVltCell");},
'-1495711494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibUtilEditFormGeneratorField").find("label[title="+fixed.lmtitle+"]").closest(".sapUiVlt").find("input").closest(".sapUiVltCell");
},
'-1075040031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("ui5-dynamic-page-title-xweb-performance-management").filter("[slot="+fixed._parentSlot+"]").find("ui5-title-xweb-performance-management");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1736647463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-plu-delegation").filter("[id="+fixed._lmId+"]")[0];
const firstShadow = first ? first.shadowRoot : null;
const lm = wmjQuery(firstShadow).find("span[id*=inner]");
return lm ? lm : wmjQuery();},
'-618609235': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[class*=PodAction_PodAction]").filter("[data-testid="+fixed._lmId+"]").find("ui5-icon-xweb-performance-management")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-icon-root") : wmjQuery();
},
'-137792988': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link[id*= contentTitle]").filter(":containsTextNode("+fixed.titleText+")").closest("[class*=CardWrapper_cardContent]").next("[class*=CardWrapper_cardActions]").find("ui5-button")[0];
const firstShadow = first ? first.shadowRoot : null;
const lm = wmjQuery(firstShadow).find("button").filter("[title="+fixed.btntitle+"]");
return lm.length ? lm : wmjQuery(); },
'-1639091481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[id="+fixed._parentId+"]") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("ui5-select-sf-goal-form") : wmjQuery();
},
'-1695284674': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-label-xweb-form-inbox").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=Grid-gridSpan]").find("ui5-icon-xweb-form-inbox");},
'-414330566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-label-xweb-form-inbox").filter(":containsTextNode("+fixed.labelText+")").closest("[class*=Grid-gridSpan], [class*=gridSpan]").find("ui5-icon-xweb-form-inbox");},
'-415682508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='lineClamp']").filter(":containsTextNode("+fixed.lmText+")").closest("ui5-busy-indicator");},
'-1757926836': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.sectionHeaderText+")").closest(".dontbreak").find("p");},
'-2069351389': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("input");},
'-122372629': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar")[0];
const firstShadow = first && first.shadowRoot;
const second= wmjQuery(firstShadow).find("ui5-shellbar-sf-header")[0];
const secondShadow = second && second.shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").filter("[data-ui5-stable="+fixed._lmText+"]").find(".menuItemSpace") : wmjQuery();},
'-396268898': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-shellbar");
const firstShadow = first.length && first[0].shadowRoot;
const second = firstShadow && wmjQuery(firstShadow).find("ui5-shellbar-sf-header");
const secondShadow = second.length && second[0].shadowRoot;
return secondShadow ? wmjQuery(secondShadow).find("ui5-li-sf-header").find(".menuItemSpace").filter(":containsTextNode("+fixed.btnText+")") : wmjQuery();},
'-531377075': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.labelTitle+"]").closest("[id*=layout][id*=wrapperfor]");},
'-789844700': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-button-xweb-goalmanagementx[accessible-name*='"+fixed._btntext+"']").filter(":mt_visible")[0];
const firstShadow = first && first.shadowRoot;
if (firstShadow)
{
  return wmjQuery(firstShadow).find("button");
}
return wmjQuery();},
'-1101519611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".ococLabelTextPair").find(".subtitleVal");},
'-1341244308': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".ococRatingLabelInputPair").find(".trrRatingDropdown");},
'-766627693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("[data-help-id='form-summary-manual-rating']");},
'-1987473528': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-person-input").filter("[id="+fixed._lmText+"]")[0];
const firstShadow = first && first.shadowRoot ;
const second = wmjQuery(firstShadow).find("xweb-person-input-support")[0];
const secondShadow = second && second.shadowRoot ;
const elem = wmjQuery(secondShadow).find("input");

return elem.length ? elem : wmjQuery();
},
'-725615094': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHdr").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1649329184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=panel]").filter("[title="+fixed.panelTitle+"]").find("[id*=header]");},
'-757554744': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").find(".sapMBreadcrumbsLink").filter("[id="+fixed._lmid+"]");},
'-1682386155': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-popover__body").find("button.closeDialog").filter("[id*="+fixed._elemId+"]");},
'-1379958166': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'-1111639888': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id]").filter("[id="+fixed._spanId+"]").closest("th").filter("[id="+fixed._lmId+"]");},
'-341192410': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ycFPLabel").filter(":containsTextNode("+fixed.lmtext+")").closest(".ycFPItem").find(".sfDropMenuBtn");},
'-2002799062': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[name='"+fixed._btnname+"']").closest("div");},
'-1102551494': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHdr").filter(":containsTextNode("+fixed.lmtxt+")").closest(".sapMPanel").find(".sapMPanelContent");},
'-211061053': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[id]").filter("[id="+fixed._spanId+"]").closest("th[class*=tableHeaderLabel]").filter("[id="+fixed._lmId+"]");},
'-1083672644': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th[class*=tableHeaderLabel]").filter(":containsTextNodeIgnore("+fixed.lmText+")");},
'-611631952': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".trrRatingDesc").filter(":containsTextNode("+fixed.elemTxt+")");},
'-1599129032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".trrRatingDesc");},
'-1698291955': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".othersRatingContainer").find(".nrte_content").find("div").eq(1);},
'-1069900710': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":contains("+fixed.headerTxt+")").closest(".pmPanelContent").find(".pm2ReviewInfo").find(".trrRatingDesc");},
'-1627428515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMLabel").filter("[title="+fixed.lmTitle+"]").closest(".sapExtentUilibUtilEditFormGeneratorField").find(".sapMInputBaseContentWrapper");},
'-1146001699': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-field-label").filter("[name='"+fixed._labelAttr+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find("label") : wmjQuery();},
'-23549018': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form[data-help-id=goalForm]");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("xweb-goal-form-field-label").filter("[name='"+fixed._labelAttr+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
const third = secondShadow ? wmjQuery(secondShadow).find("ui5-label-sf-goal-form") : wmjQuery();
const thirdShadow = third.length ? third[0].shadowRoot : null;
return thirdShadow ? wmjQuery(thirdShadow).find("label") : wmjQuery();},
'-1457416455': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-performance-management").filter("[slot="+fixed._lmAttr+"]");},
'-419988978': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-title-xweb-people-profile")[0];
const firstShadow = first && first.shadowRoot;

return firstShadow ? wmjQuery(firstShadow).find("[id*=inner]") : wmjQuery();},
'-1050892109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-avatar-xweb-performance-management").filter("[data-testid="+fixed._lmAttr+"]").closest("[class*=AvatarHeader_AvatarHeaderContainer]").find("[class*=AvatarHeader_AvatarHeaderContent]");},
'-2076270660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".colGroupHeaderRow").find("th[id="+fixed._thId+"]").find(".colGroupHeader_rt");},
'-158115680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelHdr").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-1310146275': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.lmText+")").closest(".sapUiRespGrid");},
'-18163663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.sectionTitleText+")").closest(".sapUiRespGrid").find("button").filter(":containsTextNode("+fixed.lmText+")").last();},
'-2064357237': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-dynamic-content").filter(":containsTextNode("+fixed.labelText+")").closest("ui5-form-item-xweb-dynamic-content")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-form-item-label") : wmjQuery();},
'-1175894144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sfObjectPageSectionTitle").filter(":containsTextNode("+fixed.lblText+")").closest(".pmPortletContainer").next(".globalPortletBodyBackground").find(".othersRatingContainer").find(".trrRatingDesc");},
'-1269592540': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-title-xweb-manifest-toolkit, ui5-title-xweb-people-profile").filter(":containsTextNode("+fixed.lmText+")").closest("[class*=CardContainer_header]").next().children("div[class*=CardContainer_gridRoot]");},
'-1356927822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=title][id*=inner]").filter(":containsTextNode("+fixed.lmText+")").closest("[id*=toolbar]");},
'-110342838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.lmTitle+"]").closest(".sapUiVlt").find(".sapMInputBaseContentWrapper");},
'-1580590890': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const editMode =  wmjQuery("[id*=title][id*=inner]").filter(":containsTextNode("+fixed.lmText+")").closest("[id*=toolbar]");
const viewMode =  wmjQuery("[id*=title][id*=inner]").filter(":containsTextNode("+fixed.lmText+")").parent("[id*=title]").parent();
return editMode.lenght ? editMode : viewMode;},
'-1629295831': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.bdiDirectText+")").closest(".sapUiVlt").find(".sapUiIconTitle");},
'-1277214817': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[title="+fixed.bdiDirectText+"]").closest(".sapUiVlt").find(".sapUiIconTitle");},
'-2119746878': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find(".goalFormWidget-field").filter("[name='"+fixed._parentId+"']") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("#goalForm-field-weight-inner") : wmjQuery();
},
'-1722093766': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNodeIgnore("+fixed.lmText+")").closest(".sapUiVlt").find("input");},
'-763493939': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("xweb-goal-form")[0];
const firstShadow = first ? first.shadowRoot : null;
const second = wmjQuery(firstShadow).find("xweb-goal-form-input-table")[0];
const secondShadow = second ? second.shadowRoot : null;
const third = wmjQuery(secondShadow).find("ui5-table-row-sf-goal-form").filter("[data-row-index="+fixed.lmAttr+"]").find("xweb-goal-form-text-field")[0];
const thirdShadow = third ? third.shadowRoot : null;
const fourth = wmjQuery(thirdShadow).find("ui5-textarea-sf-goal-form")[0];
const fourthShadow = fourth ? fourth.shadowRoot : null;

const elem = fourthShadow ? wmjQuery(fourthShadow).find("textarea") : null;

return elem.length ? elem : wmjQuery();},
'-1542239359': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1").filter(":containsTextNode("+fixed.headerTxt+")").closest(".sapMDialog");},
'-802048799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-xweb-pay-statement").filter(":containsTextNode("+fixed.lmText+")")[0];
const firstShadow = first ? first.shadowRoot : first;
const elem = wmjQuery(firstShadow).find("a.ui5-link-root");
return elem.length ? elem :wmjQuery();},
'-1472640129': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-link-xweb-pay-statement").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible")[0];
const firstShadow = first ? first.shadowRoot : first;
const elem = wmjQuery(firstShadow).find("a.ui5-link-root");
return elem.length ? elem :wmjQuery();},
'-1416467551': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSubSectionHeaderTitle, .sapUxAPObjectPageSubSectionTitle").filter(":containsTextNodeIgnore("+fixed.elmTxt+")");},
'-59956219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase[id$="+fixed._inputId+"]").closest("div[id*=wrapper]");},
'-843560101': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".section_title").filter(":containsTextNode("+fixed.headerTxt+")").find(".sectionActions");},
'-643555344': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fd-list__title").filter(":containsTextNode("+fixed.labelText+")").closest(".sfCheckBoxMenuItem").find(".fd-checkbox__checkmark");},
'-144288849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapExtentUilibFormPatternBlockTitle").filter(":containsTextNodeIgnore("+fixed.hdrTxt+")").closest(".sapUiRespGrid[id*=innerGrid]");},
'-832969768': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=dialog]").find("bdi").filter(":containsTextNode("+fixed.lblText+")").closest(".sapUiVltCell").next(".sapUiVltCell").find("input[id*='picker']").last();},
'-1450311199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapUxAPObjectPageSectionTitle").filter(":containsTextNodeIgnore("+fixed.containerTitle+")").closest("section").find(".mtrDescriptionContainer");},
'-1547813404': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.sapMPopover.sapMRPCalendar").find(".sapUiCal");},
'-1010557804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMDialog").find("button[data-help-id='editPageSaveButton']");},
'-940174349': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMInputBase[data-help-id='"+fixed._inputAttr+"']").find(".sapUiIconPointer");},
'-1321759495': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-menu-item[data-item-id='"+fixed._datatestid+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("li") : wmjQuery();},
'-705591839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-toolbar-button-xweb-assignment").filter("[data-testid='"+fixed._datatestid+"']");
const firstShadow = first.length ? first[0].shadowRoot : null;
const second = firstShadow ? wmjQuery(firstShadow).find("ui5-button-xweb-assignment") : wmjQuery();
const secondShadow = second.length ? second[0].shadowRoot : null;
return secondShadow ? wmjQuery(secondShadow).find("button") : wmjQuery();},
'-1594486571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-assignment[id='"+fixed._labelId+"']").closest("[class*=FieldComponent_formItem]").find("ui5-busy-indicator-xweb-assignment");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-busy-indicator-busy-area") : wmjQuery();},
'-1861596635': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery("ui5-label-xweb-assignment[id='"+fixed._labelId+"']").closest("[class*=FieldComponent_formItem]").find("div[class*=FieldComponent_formInput]");},
'-1863480298': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("[data-testid='attribute-card-title']").filter(":containsTextNode("+fixed.cardheader+")").closest("[class*='cardHeaderContent']").find("[icon*='heart']")[0];
const firstShadow = first && first.shadowRoot;
if (firstShadow)
{
  return wmjQuery(firstShadow).find("button");
}
return wmjQuery();},
'-176923241': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=label]").filter(":containsTextNode("+fixed.lmText+")").closest("[class*= sapUiRespGridSpanL]");},
'-1571445799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMPanelContent").find("bdi").filter(":containsTextNode("+fixed.elemText+")").closest("[class*=sapUiRespGridSpan]");},
'-541681508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=CardWrapper_headerText]").filter("[title="+fixed.elmTitle+"]").closest("div[class*=CardHeader_headerContainer]");},
'-1398841871': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._cardId+"']").find("[class*=CardHeader_headerContainer]");},
'-265154179': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=CardWrapper_headerText]").filter("[title="+fixed.elmTitle+"]");},
'-1510340976': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[class*=CardWrapper_headerText]").filter(":containsTextNodeIgnore("+fixed.elmTitle+")").filter(":mt_visible");},
'-1571138793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.PageTitle").filter(":containsTextNode("+fixed.lmText+")");},
'-671345843': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let elem = wmjQuery("ui5-label-xweb-talent-cpm-activity[id=activity-name-label]").parent("div");
if (!elem.length)
{
  elem = wmjQuery("ui5-textarea-sf-talent-activity"); 
}
  
return elem.length ? elem : wmjQuery(); },
'-398316890': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("ui5-label-xweb-people-profile").filter(":containsTextNode("+fixed.labelTxt+")").closest("ui5-form-item-xweb-people-profile");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".ui5-form-item-label") : wmjQuery();},
'-92335758': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const rawText = ftHelper.unQuote(wmjQuery().identity(fixed.elmText));
const splitText = rawText ? rawText.split(" (")[0] : null;
const newlmText = splitText ? splitText.trim() : null;
if (!newlmText) {
 return wmjQuery();
}
const first = wmjQuery("ui5-button-xweb-homepagex").filter(":contains("+newlmText+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find("button") : wmjQuery();},
'-1815413369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const oldElm = (() => {
  const first = wmjQuery("[ui5-button]").filter("[data-testid=fullProfileNav]")[0];
  const firstShadow = first && first.shadowRoot;
  return wmjQuery("button", firstShadow);
})();

if (oldElm.length) {
  return oldElm;
}

return wmjQuery("[data-testid='fullProfileNav']").find("ui5-icon-xweb-people-profile");
},
'-1757774641': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let first = wmjQuery("ui5-card-xweb-people-profile").filter("[data-testid='"+fixed._dataTestId+"']").find("ui5-button-xweb-people-profile").filter("[icon=" + fixed._icon + "]")[0];
let firstShadow = first && first.shadowRoot;
return wmjQuery("button",firstShadow);},
'-1562179482': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ui5-card-xweb-people-profile").filter("[data-testid='"+fixed._dataTestId+"']").find("ui5-button-xweb-people-profile").filter("[icon=" + fixed._icon + "]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);