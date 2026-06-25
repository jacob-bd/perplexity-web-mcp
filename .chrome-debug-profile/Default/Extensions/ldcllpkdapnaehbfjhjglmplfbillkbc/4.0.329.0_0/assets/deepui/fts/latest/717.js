(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1671632297': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".field-label").filter(":containsTextNode("+fixed.elemText+")").first();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);