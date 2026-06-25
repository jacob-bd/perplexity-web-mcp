(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '76084775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.MuiTypography-root").filter(":contains("+fixed.elemText+")").closest("li").find("a.MuiListItem-button");},
'86027648': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":contains("+fixed.labelText+")").closest("div[class*='HeaderContainer']").closest("div[role='dialog'");},
'224110582': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":directContains("+fixed.pageHeaderTxt+")").closest("[data-test-link='topbar-breadcrumb']").find("span:first");},
'823366160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-testid=" + dollars[0] + "]").closest("div[role='dialog']").filter(":mt_visible")},
'988948852': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test-id='"+fixed._elemData+"']").find(fixed._elemTag);
},
'1016052317': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[id=" + dollars[0] + "]")},
'1082624618': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains("+fixed.elemText+")[class*='TitleWrapper']");
},
'1117609652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='Title']:directContains("+fixed.elemText+")").parent("[class*='TitleWrapper']").parent("[class*='NavigationItem']");
},
'1150916501': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":contains("+fixed.attrText+")").closest("[data-test-link='row=2 col=1']");},
'1212087205': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test-link='reports-table']").find(".TopRightGrid_ScrollWrapper");},
'1260684520': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-testid=" + dollars[0] + "]").find("div[role='button']").filter(":mt_visible")},
'1293842818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2:contains("+fixed.elemText+")").closest("[class*='StyledDigitalToolBar']").filter(':mt_visible');
},
'1598191749': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[href_production*='"+fixed._hrefTgt+"']");},
'1608760125': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span[class*='styles__TitleWrapper']").filter(":contains("+fixed.elemText+")").closest("[class*='StyledStackNavigationItem']");},
'1643764038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='styles__StyledSubtitle']").filter(":contains("+fixed.headerTxt+")").closest("[class*='currentWidgets__Wrapper']");},
'1954425693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._childId+"']").parent("[data-test-link^='filters-selector-']");
},
'2022389986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tgtTag+"[data-test-id='"+fixed._elemData+"']");
},
'2054924412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='TextWrapper']").filter(":contains("+fixed.tgtTxt+")").closest("[class*='StyledCollapsibleBarMainWrapper']").find("span[class*='StyledCollapsibleBarFloatingTitleWrapper']");},
'-72007622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(fixed._tgtTag+"[data-test-link='"+fixed._elemData+"']");
},
'-424319944': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id='"+fixed._elemId+"']").closest("[class*='SearchContainer']");
},
'-1069458457': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MuiListItemText-primary:directContains("+fixed.elemText+")").closest(fixed._elemTag+".MuiListItem-button");
},
'-447239246': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test-id='"+fixed._prevData+"']").next("[class*='FiltersContainer']");
},
'-1570145634': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[title="+fixed.elemTitle+"][class*='NavigationItem']");
},
'-324278307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains("+fixed.elemText+")[class*='StyledSubtitle']");
},
'-470532824': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='StyledCard']").find("h2:directContains("+fixed.elemText+")");
},
'-602292614': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".MuiFormLabel-root").filter(":contains("+fixed.labelText+")").closest(".MuiFormControl-root").find("div[role='button']");},
'-2129479483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[data-testid=" + dollars[0] + "]").closest("div.MuiDialogContent-root")},
'-1824774199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='StyledHeaderContainer']").filter(":directContains("+fixed.headerText+")").closest("#user-menu-index");},
'-1545866879': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":directContains("+fixed.headerText+")").closest("[data-test-link='topbar-breadcrumb']").closest("#custom-report-wrapper").find(".TopRightGrid_ScrollWrapper");},
'-1113881160': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":directContains("+fixed.headerText+")").closest("[data-test-link='topbar-breadcrumb']").closest("#custom-report-wrapper").find("[data-test-id="+fixed._attrElem+"]");},
'-2125528283': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-test-id="+fixed._attrElem+"]").filter(':mt_visible');
},
'-2003679335': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menu']").find("a").filter("[data-test-id="+fixed._elemAttr+"]").filter(':mt_visible');
},
'-376495170': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h1").filter(":directContains("+fixed.headerText+")").closest("div[class*='styles__StyledModalContent']");},
'-729642622': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='styles__StyledSubtitle']").filter(":contains("+fixed.labelText+")").closest("[class*='archivedWidgets__Wrapper']");},
'-1620376799': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='StyledToolTitle']").filter(":contains("+fixed.tgtText+")").closest("[class*='StyledDigitalToolWrapperPageWrapper']").find("[class*='ContentCardBodyWrapper']");},
'-1155218056': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-test="+fixed._attrElem+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);