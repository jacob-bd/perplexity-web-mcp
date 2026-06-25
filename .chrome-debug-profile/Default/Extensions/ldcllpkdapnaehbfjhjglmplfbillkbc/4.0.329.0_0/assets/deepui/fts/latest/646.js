(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1881116469': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".messageLeftAnimation").find("div.btn-li").filter("[value="+fixed.elemValue+"]").last();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);