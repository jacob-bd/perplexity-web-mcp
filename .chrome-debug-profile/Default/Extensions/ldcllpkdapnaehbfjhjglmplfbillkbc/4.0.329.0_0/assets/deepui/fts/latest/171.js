(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '653869404': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mstrmojo-UnitContainer").filter("[aria-label='"+fixed._dataElem+"']").find(".vi-doc-tf-value-text");},
'680237991': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mstrmojo-UnitContainer").filter(":containsTextNode("+fixed.elemTxt+")").find(".vi-doc-tf-value-text");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);