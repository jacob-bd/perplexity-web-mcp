(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1290558096': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[as="+fixed._elemAttr+"]").children("div").first();},
'1368846943': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".h-mkt-header-height").find(".btn-primary").filter(fixed._elemTag);},
'1555673188': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".text-token-text-primary").find(".btn-secondary").filter(fixed._elemTag).first();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);