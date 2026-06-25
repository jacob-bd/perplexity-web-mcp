(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-138788216': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[fieldref='"+fixed._lmAttr+"']");},
'-995502985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[actionref="+fixed._lmAttr+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);