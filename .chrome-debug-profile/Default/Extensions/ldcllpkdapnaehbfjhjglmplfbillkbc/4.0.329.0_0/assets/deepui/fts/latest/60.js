(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '66348254': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bottomButtonBar").find(".save");},
'68857993': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("input").filter("[type="+fixed._searchInput+"]");},
'107485576': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split(" QE")[0]: null;
return wmjQuery(".vv-vof-detail-header-items").find(".vv-vof-detail-header-title").filter(":contains("+newlmTitle+")");

},
'136335793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-object-data-grid-header-cell").filter(":containsTextNode("+fixed.labelText+")").filter(":mt_visible");},
'203799088': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_item_header").find(".vv-picker-badge").find("button")},
'319280965': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[class*=MenuItem]").filter(":contains("+fixed.elemText+")");},
'416533451': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest(".vv-bp-picklist-field").find("input").filter("[type="+fixed._inputSearch+"]");},
'471110032': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv-bp-picklist-field").find(".fa-caret-down");},
'510527028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-dialog").find(".ui-dialog-title").filter(":containsTextNode("+fixed.lmText+")").closest(".ui-dialog-titlebar");},
'533799202': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-action-bar-menu").find("li.vv-action-bar-menu-item").filter(":contains("+fixed.elemText+")");},
'562931983': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-doc-attr-public-key="+fixed._elemAttr+"]");},
'576794386': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[data-icon="+fixed._lmIcon+"]").closest("button");},
'600368070': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".doc_info_title").find(".documentLifecycleStateBadgeContainer").filter(":contains("+fixed.elemText+")");},
'619000087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const visibleNav = wmjQuery("li.vof-section-navigation-tab[data-nav-target = "+fixed._lmText+"]").filter(":mt_visible");
 if (visibleNav.length){
	return visibleNav;
}
if (!visibleNav.length){
	return "Veeva_sidebar_filler"
}

},
'693896887': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.lmText+")").closest(".vv-vof-detail-header-status-label-container");},
'705086187': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-nav").find("span:not([class*='section-count'])").filter(":containsTextNode("+fixed.elemText+")").closest("[data-target*='case_assessment_result']");},
'778566762': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const visibleNav = wmjQuery("[class*='TabContainer']").find("span").filter(":containsTextNode("+fixed.lmText+")").filter(":mt_visible");
if (visibleNav.length){
	return visibleNav;
}
if (!visibleNav.length){
	return "Veeva_sidebar_filler"
}

},
'789851517': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("div[class*='SingleSelect-SingleSelect']");},
'881608280': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-navbar-item").find(".vv-navbar-link").filter(":containsTextNode("+fixed.labelText+")").closest(".vv-navbar-link").filter(":mt_visible").first();},
'930766310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split("*")[0]: null;
return wmjQuery("label.vv_label").find("span").filter(":contains("+newlmTitle+")");

},
'933820009': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=listbox]").find("[class*=MenuItem]").filter("[data-value="+fixed._elemVal+"]");},
'1007852318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".navbar-nav").find("span:not([class*='section-count'])").filter(":containsTextNode("+fixed.elemText+")").closest("li");},
'1075891591': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const MainNavLM =  wmjQuery("nav.vv-navbar").find(".vv-navbar-link").filter(":containsTextNode("+fixed.lmText+")");
const DropDownLM = wmjQuery("ul.vv-navbar-dropdown-menu").find(".vv-navbar-link").filter(":containsTextNode("+fixed.lmText+")");
if (MainNavLM.length){
	return MainNavLM;
}
if (DropDownLM.length){
	return DropDownLM;
} 
if (!MainNavLM.length && !DropDownLM.length){
	return "Veeve_nav_filler"
}

},
'1084306493': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.lmLabel+")").closest(".vv_field_row").find(".vv_right_value").find("span").filter(":containsTextNode("+fixed.lmText+")").closest("[class*='DisplayField']");},
'1107639191': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-action-bar-frequent-actions").find("svg").filter("[data-icon="+fixed._dataIcon+"]").closest("button");},
'1138023944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=MenuItem]").filter(":contains("+fixed.menuItemText+")");},
'1148446301': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":containsTextNode("+fixed.labeltxt+")").closest(".vv_field_row").find("a");},
'1151340717': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_dialog_body").find("a").filter(":containsTextNode("+ fixed.tgtElemText +")");},
'1197342420': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":containsTextNode("+fixed.labelText+")").closest(".vv_field_row").find("svg[class$=Input]");},
'1218348590': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".propsToolbar").find(".docInfoSaveButton").first();},
'1246136600': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split("-")[0]: null;
return wmjQuery(".vv-vof-detail-header-items").find(".vv-vof-detail-header-title").filter(":contains("+newlmTitle+")");

},
'1257001522': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_vof_section").filter("[id="+fixed._lmSectionId+"]").find("button").parent("div").filter(":containsTextNode("+fixed.lmText+")");},
'1313322201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":containsTextNode("+fixed.labelText+")").closest(".vv_field_row").find("svg[class$=Input]");},
'1324662318': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split("-")[0]: null;
return wmjQuery(".vv-vof-detail-header-items").find(".vv-vof-detail-header-title").filter(":contains("+newlmTitle+")");

},
'1405288849': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-navbar-dropdown-menu-item").find(".vv-navbar-link").filter(":containsTextNode("+ fixed.tgtElemText +")").filter(":mt_visible");},
'1488332287': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._elemAttr+"]").children(".vv_pill_container");},
'1679832230': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_alert_dialog").find(".buttonLabel").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'1694979973': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv-navbar-header").find(".vv-navbar-collapse");},
'1779633279': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv-bp-picklist-field").find(".fa-caret-down");},
'1961043879': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label span").filter(":containsTextNode("+fixed.labelText+")").closest(".vv_field_row").find("div.vv_right_value");},
'1986060103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=listbox]").find("[class*=MenuItem]").filter("[data-value="+fixed._elemVal+"]");},
'1991771484': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_vof_section").filter("[id="+fixed._lmSectionLabel+"]").find(".vv-related-record-list-button").filter(":containsTextNode("+fixed.lmText+")");},
'2017327041': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv-bp-picklist-field").find("svg.fa-caret-down");},
'2018959333': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[name="+fixed._elemAttr+"]");},
'2070786247': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vofSection").filter("[id="+fixed._lmLabeLID+"]").find("div.detail-section").parent();},
'-765561203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const MainNavLM =  wmjQuery("ul.vv-navbar-nav").find(".vv-navbar-link").filter(":containsTextNode("+fixed.lmText+")").closest("li").find("[data-icon='caret-down']");
const DropDownLM = wmjQuery("ul.vv-navbar-dropdown-menu").find(".vv-navbar-link").filter(":containsTextNode("+fixed.lmText+")").closest("li").find("[data-icon='caret-down']");
if (MainNavLM.length){
	return MainNavLM;
}
if (DropDownLM.length){
	return DropDownLM;
} 
if (!MainNavLM.length && !DropDownLM.length){
	return "Veeve_nav_filler"
}

},
'-2105511722': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const visibleNav = wmjQuery("[class*='TabContainer']").find("span").filter(":containsTextNode("+fixed.lmText+")").parent().filter(":mt_visible");
if (visibleNav.length){
	return visibleNav;
}
if (!visibleNav.length){
	return "Veeva_sidebar_filler"
}

},
'-1678010003': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const visibleNav = wmjQuery("span").filter(":directContains("+fixed.lmText+")").closest("li.vof-section-navigation-tab").filter(":mt_visible");
 if (visibleNav.length){
	return visibleNav;
}
if (!visibleNav.length){
	return "Veeva_sidebar_filler"
}

},
'-942827927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".css-wiepiv-HeaderSection-HeaderSection").find(".vv-object-data-grid-header-cell").filter(":containsTextNode("+ fixed.tgtElemText +")").filter(":mt_visible");},
'-142601855': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv-bp-picklist-field").find("[class*='Input-SingleSelect']");},
'-1767872328': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("div[class*='SingleSelect-SingleSelect']");},
'-236607177': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[class*=DropdownMenu]").filter("[role="+fixed._menuItem+"]").find("li[class*=MenuItem]").filter(":contains("+fixed.elemText+")");},
'-182313394': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='detail-header-title']").filter(":containsTextNode("+fixed.titleText+")");},
'-1152637566': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=MenuItem]").filter(":containsTextNode("+fixed.elemText+")");},
'-661833167': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("input").filter("[type="+fixed._searchInput+"]");},
'-265947255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("div[class*='SingleSelect-SingleSelect']");},
'-1635987266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter(":contains("+fixed.labelText+")").closest(".vv_field_row").find("div[class*='SingleSelect-SingleSelect']");},
'-953949682': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split("*")[0]: null;
return wmjQuery("label.vv_label").find("span").filter(":contains("+newlmTitle+")");

},
'-1765944911': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let newlmTitle =  ftHelper.unQuote(wmjQuery().identity(fixed.lmTitle));
newlmTitle = newlmTitle ?  newlmTitle.split(":")[0]: null;
return wmjQuery(".vv-vof-detail-header-items").find(".vv-vof-detail-header-title").filter(":contains("+newlmTitle+")");

},
'-254834372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_left_label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".vv_field_row").find(".vv_hover_line span");},
'-2146229491': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_side_nav").find(".facetGroupLabel").filter(":contains("+fixed.elemText+")").closest(".facet-group-header");},
'-158588448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("svg").filter("[data-icon="+fixed._elemIcon+"]").closest("li");},
'-1516310071': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_label").filter("[for="+fixed._forAttr+"]").find("span");},
'-983526194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vofSection").filter("[id="+fixed._lmLabeLID+"]").closest(".vofSection").find(".vv-object-data-grid-header-cell-internal").filter(":containsTextNode("+fixed.lmText+")").closest(".vv-object-data-grid-header-cell");},
'-2077410565': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vof-section-navigation").find(".vof-section-navigation-tab").find("span").filter(":containsTextNode("+fixed.lmText+")");},
'-983537190': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".paramFieldLabel").filter(":containsTextNode("+fixed.labelText+")").closest(".paramField").find(".dropdown");},
'-69962382': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".paramFieldLabel").filter(":containsTextNode("+fixed.elemText+")");},
'-1628636115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("img").filter("[data-icon="+fixed._lmDataIcon+"]").closest("button");},
'-1878595896': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.vv-navbar-link").filter(":containsTextNode("+fixed.lmText+")").closest("li.vv-navbar-item");},
'-702408908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelTxt+"]").closest(".detail-section-item").find("[data-corgix-internal='INPUT']");},
'-941765922': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href$="+fixed._lmHref+"]");},
'-971740655': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dialogBodyButtons").find("a").filter(":containsTextNodeIgnore("+ fixed.tgtElemText +")");},
'-683688804': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".vv_box_section").find("[class*=collapsibleSectionTitle]").filter(":containsTextNode("+fixed.elmTxt+")").closest(" div[class*=Collapse]");},
'-1336428481': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*=collapsibleSectionTitle]").filter(":containsTextNode("+fixed.lmText+")").closest("div.vv_box_section");},
'-162790728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role=dialog]").filter("[class^='"+fixed._dataHelpId+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);