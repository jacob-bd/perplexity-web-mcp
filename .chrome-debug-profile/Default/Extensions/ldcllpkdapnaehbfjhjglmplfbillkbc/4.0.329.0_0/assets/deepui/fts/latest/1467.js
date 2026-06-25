(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '7204399262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[id=" + dollars[0] + "]")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);