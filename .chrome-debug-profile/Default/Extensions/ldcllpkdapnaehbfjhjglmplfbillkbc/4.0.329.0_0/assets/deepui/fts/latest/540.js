(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '77904034': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for^='"+fixed._lmForAttr+"']").find(".fa-check");},
'248463379': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("wkc-core-combo[id='"+fixed._idAttr+"']").find(".text");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);