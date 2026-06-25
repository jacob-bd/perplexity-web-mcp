(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-911711080': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[id="+fixed._spanID+"]").find("select").filter("[name='"+fixed._elemNameAttr+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);