(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '137419411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[value='"+fixed.elemValue+"']").find(".thumbnail");},
'241376078': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title").filter(":containsTextNode("+fixed.elemTitleText+")").closest(".thumbnail");
},
'760376719': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid='"+fixed._buttonDataTestid+"']").closest(".tri-side-pane-title").find("span").filter(":containsTextNode("+fixed.tgtElemText+")");},
'889045667': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slicerItemContainer").filter("[data-row-index="+fixed._lmIndexAttr+"]");},
'1208180158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".visual-actionButton").filter(":contains("+fixed.lmtext+")").find("svg.tileSVG");},
'1376494181': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".btn-group").filter("[id="+fixed._parentId+"]").find("button");},
'1685753203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slicerItemContainer").filter("[title="+fixed.lmTitle+"]");},
'1727330779': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pages").find("button").filter("[data-toggle="+fixed._tgtElemDataToggle+"]");},
'1749001966': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".card").filter("[aria-label*='"+fixed._noNumsAttr+"']").closest(".report");},
'-693982450': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".visual").filter("[data-testid='"+fixed._elemDataTestId+"']").find(".textRun").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-1090183500': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title").filter(":containsTextNode("+fixed.elemTitleText+")").closest("li");},
'-44052350': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".title").filter(":containsTextNode("+fixed.elemTitleText+")").closest(".thumbnail");
},
'-386682838': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".pages").find(".btn").filter("[data-toggle="+fixed._tgtelemDataToggle+"]");},
'-1604872440': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-testid="+fixed._tgtElemDataTestid+"]");},
'-1271324224': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slicer-header-title h3").filter(":containsTextNode("+fixed.fieldLabelText+")").closest(".slicer-container").find(".slicer-dropdown-menu");},
'-109137310': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter("[title="+fixed.labelText+"]").closest(".slicer-container").find(".slicer-dropdown-menu");},
'-1033168723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h3").filter(":containsTextNode("+fixed.charTitle+")").closest("div.report").find(".donutChart");},
'-1128478483': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".visualContainer[role='group'][tab-order="+fixed.tabAttr+"]").find(".legend-item").filter(":containsTextNode("+fixed.labelText+")");},
'-341713281': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("p").filter(":containsTextNode("+fixed.labelText+")").closest(".visualContainer").find(".tileSVG");},
'-1985517325': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("p").filter(":containsTextNode("+fixed.labelText+")").closest(".visualContainer[tab-order="+fixed.tabOrder+"]").find(".tileSVG");},
'-556886650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":containsTextNode("+fixed.headerText+")").closest(".visualWrapper.report");},
'-1227352028': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".slicerItemContainer").filter("[data-row-index="+fixed._lmIndxAtt+"]");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-708789115': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-role-button-text").filter(":containsTextNode("+fixed.lmText+")").closest(".visual").find("svg");},
'-415639269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-role-button-text").filter(":containsTextNode("+fixed.lmText+")").closest("visual-modern").find("svg");},
'-1877167490': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-role-button-text").filter(":containsTextNode("+fixed.elemText+")").closest(".pageNavigator").find(".tileSVG");},
'-890577292': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".textRun").filter(":containsTextNode("+fixed.lmText+")");},
'-793475269': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[localize]").filter("[localize="+fixed._locolizeAttr+"]").closest("section");},
'-322798929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.LabelText+")").parent(".itemRow").first();},
'-1591979055': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("article[data-testid='outspace-pane']").children(".paneHeader");},
'-1224313103': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".report").find(".card").filter("[aria-label*='"+fixed._noNumsAttr+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);