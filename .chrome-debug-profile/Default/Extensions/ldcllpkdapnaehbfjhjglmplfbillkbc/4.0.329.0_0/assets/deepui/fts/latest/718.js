(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-662911423': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".accordion--body").filter("[id='"+fixed._accordionbodyById+"']").find(".fdp-table__body");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);