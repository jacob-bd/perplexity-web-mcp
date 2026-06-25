(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1897244108': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".select-field").find(".ember-basic-dropdown-trigger");},
'1919485180': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-field").find(".ember-basic-dropdown-trigger");},
'-601888408': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".global-field").find(".search-select");},
'-1314308845': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-field--label").filter(":containsTextNode("+fixed.labelText+")").closest(".form-field").find(".ember-basic-dropdown-trigger");},
'-1496246702': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("li").find(".control-element");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);