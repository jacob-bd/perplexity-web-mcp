(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '86161375': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".bolt-link").filter(":containsTextNode("+fixed.LabelText+")").closest("div.flex-center");},
'619064330': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter(":containsTextNode("+fixed.tableText+")").closest(".C-table").parent("div");},
'988399396': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.labelText+")").closest("tr[id*=row]").find("input");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);