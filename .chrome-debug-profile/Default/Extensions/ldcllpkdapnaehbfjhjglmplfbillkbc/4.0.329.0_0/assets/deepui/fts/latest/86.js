(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1869389248': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ms-suiteux-search-box").find("[type='search']");},
'-774447403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ck-content").filter(":contains("+fixed.sectionTitle+")").closest(".CanvasSection").find("img");},
'-1367816601': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='heading']").filter(":containsTextNode("+fixed.sectionTitle+")").closest(".ControlZone");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);