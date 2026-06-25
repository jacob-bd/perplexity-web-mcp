(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '315829102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".label").filter(":containsTextNode("+fixed.LabelText+")").next("[data-test-id='input-class-wrapper']").find("[class*='combobox__search ']");},
'1578749355': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter("[data-test-id='"+fixed._headerLabel+"']").closest(" .page-header ");},
'1660578377': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form__row").find("label").filter(":containsTextNode("+fixed.lmtxt+")");},
'1699262219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".button").filter("[data-test-id="+fixed._btnId+"]");},
'1922777485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".filter-group__header__text").filter(":containsTextNode("+fixed.headerLabel+")").closest(".filter-group__header");},
'1931925464': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FormEntry").filter("[data-vfe-column="+fixed._data_vfe_column+"]").find("textarea");},
'2130443015': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".card__title").filter("[data-test-id='"+fixed._titleAttr+"']");},
'-1321182158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-test-id='"+fixed._elemId+"']").children(".label");},
'-851216829': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.card__title").filter(":containsTextNode("+fixed.elemText+")");},
'-360184513': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header.card__title").filter(":containsTextNode("+fixed.elemText+")");},
'-1961824326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form__row").filter("[data-test-id='"+fixed._fieldLabelId+"']").find(".combobox__control input");},
'-244143376': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".button").filter("[data-test-id="+fixed._elemID+"]");},
'-1613747351': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-test-id="+fixed._elemId+"]");},
'-1020239005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test-id=widget-image-link]").filter("[href_production*='"+fixed._href_production+"']").find("[data-test-id='image-widget-image-container']");},
'-1200748663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test-id*='widget-title']").find("span").filter(":directContains("+fixed.lmtxt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);