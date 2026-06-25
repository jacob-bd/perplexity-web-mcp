(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '279864790': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ProcessControls").find("button").filter("[id="+fixed._lmIdAttr+"]");},
'-14869323': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._elemId+"]");},
'-860612482': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SideNav").filter("[id="+fixed._parentId+"]").find(".SideNavMenu__list");},
'-1210311284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id="+fixed._elemId+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);