(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '575590291': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode(" + fixed.elemText + ")").parent(".form-submit").eq(1)},
'1338184479': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[href_production*='nbox_newxxx']").children(".menu-icon");},
'1495675545': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[name="+fixed._labelAttr+"]").closest("a.button").siblings("ul.button-set").find(".js-download");},
'1892884069': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").siblings("span");},
'-1722842438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[href_production*='module=report_library_newxxx']").children(".menu-icon");},
'-1725197936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("dt").filter(":containsTextNode("+fixed.elemText+")");},
'-1672261475': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#individual_move_ins").find(".action-button").filter("[type="+fixed._elemAttr+"]").eq(1);}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);