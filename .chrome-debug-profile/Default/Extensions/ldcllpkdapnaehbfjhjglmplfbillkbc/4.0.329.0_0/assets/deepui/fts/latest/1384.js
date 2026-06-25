(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1557312037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".widget-header-text").filter(":containsTextNode("+fixed.lmText+")").closest(".container-inner-content");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);