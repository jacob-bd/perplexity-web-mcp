(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1261003986': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label[id$='PageHeader']").filter(":containsTextNode("+fixed.labelText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);