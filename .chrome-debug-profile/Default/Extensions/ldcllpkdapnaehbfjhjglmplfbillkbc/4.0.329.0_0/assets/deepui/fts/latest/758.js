(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '143784454': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.LabelText+")").next("td").children("a");},
'253196095': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#docShareAlertArea").find(".ui-table").find("tr:eq(2)").find("a");},
'1305355002': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-widget-header").filter(":containsTextNode("+fixed.LabelText+")").next(".ui-colhTableRow");},
'1372734468': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-widget-header").filter(":containsTextNode("+fixed.LabelText+")").next(".ui-colhTableRow").find(".ui-input");},
'-947912599': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-widget-header").filter(":containsTextNode("+fixed.LabelText+")").next(".ui-colhTableRow").find("input.ui-input");},
'-1529953111': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.LabelText+")").eq(1)},
'-2085979969': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ui-table").find("tr:eq(10)").find("a");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);