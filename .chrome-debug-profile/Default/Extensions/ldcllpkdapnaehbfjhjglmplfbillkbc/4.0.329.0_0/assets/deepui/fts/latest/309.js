(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1234638485': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+ fixed.btnText +")").closest("a.dropdown-icons").filter(":mt_visible");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);