(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1732384839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("g").filter("[data-icon-name="+fixed._iconName+"]").closest(".internal-header-navigation-group");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);