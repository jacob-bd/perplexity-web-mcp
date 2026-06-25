(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-103061011': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").parent("div").next("div");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);