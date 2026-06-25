(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '421059422': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[id="+fixed._btnId+"]");},
'1705596669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".efTableRow").find("input");},
'-1958517411': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("iframe").filter("[src_production*='"+fixed._Href+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);