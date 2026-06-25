(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '124537703': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".button-text").filter(":containsTextNode("+fixed.btnTxt+")");},
'684686693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-application='"+fixed._elmAttr+"']").find(".button-text");},
'1131634801': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-application="+fixed._elmAttr+"]");},
'1445207535': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".profile-text-field__label").filter(":containsTextNode("+fixed.lblText+")").closest("label");},
'1633583873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-onboarding="+fixed._elmAttr+"]");},
'1883768412': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-application=" + dollars[0] + "]").filter(fixed._labelWrapper);},
'-259422095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("wrike-panel.collapsible-views__container");},
'-1944181210': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".glow-folder-header__toolbar").find("button").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1101162746': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem']").filter("[data-item-id='"+fixed._dataitemid+"']").find(".text-card__info-main");},
'-1054536875': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem']").filter("[data-key="+fixed._datakey+"]").find(".text-card__info-main");},
'-1870856212': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='menuitem']").filter("[data-item-id='"+fixed._menuitemAttr+"']").find(".action-menu-item");},
'-2073147929': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sidebar-items__header").filter(":containsTextNode("+fixed.headertxt+")").find("button");},
'-888084764': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sidebar-item__text").filter(":containsTextNode("+fixed.itemText+")").closest(".sidebar-item").find(".sidebar-item__button");},
'-1399001716': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sidebar-item__text").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1779368370': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".collapsible-toogler__text").filter(":containsTextNode("+fixed.labelText+")").closest("expand-collapse-button").find(".collapsible-toogler__button");},
'-645867492': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button[aria-label='Collapse section pinned'], button[aria-label='Expand section pinned']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);