(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '858364476': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".actions").find(".button").filter(":containsTextNode("+fixed.txt+")");},
'-610943024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='reskinformgroupcolumn']").find("a").filter(":containsTextNode("+ fixed.tgtElemText +")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);