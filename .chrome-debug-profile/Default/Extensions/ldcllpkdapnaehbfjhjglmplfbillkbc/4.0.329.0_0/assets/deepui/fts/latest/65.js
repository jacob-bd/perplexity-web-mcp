(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '192118074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-test='assetAllocationModal']").find("[data-test='headerTitle']").filter(":containsTextNode("+ fixed.btnText +")");},
'546615240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-title").find("p").filter(":containsTextNode("+fixed.tgtElemText+")");},
'1029456510': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("con-number-input[data-test="+fixed._dataAttr+"]").find(".label");},
'1155917336': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.dialog-content").find("byo-header").filter("[data-translate-key=" + fixed._titleText + "]").find(":header")},
'1507793626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".tab-content").find(".overline").filter("[data-translate-key=" + fixed._titleText + "]");
},
'-324083369': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("con-number-input[data-test="+fixed._dataAttr+"]").find(".label");},
'-378555568': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("con-number-input[data-test="+fixed._dataAttr+"]").find(".mat-form-field-flex");},
'-1828323444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".data-entry-row[data-test="+fixed._dataAttrRow+"]").find("con-number-input[data-test="+fixed._dataAttrGroup+"]").find(".label").filter(":containsTextNode("+fixed.labelText+")");},
'-151470356': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return  wmjQuery(".title-bar").filter(":containsTextNode("+fixed.titleText+")").closest(".parent-container").find("button").filter(":containsTextNode("+fixed.btnText+")").first();},
'-1469593632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mat-form-field-wrapper").find(".label").filter(":containsTextNode("+ fixed.btnText +")");},
'-128146874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".con-form-field").filter("[data-test="+fixed._elemAttr+"]").closest(".field-container").find(".con-dropdown-selected-option");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);