(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '424185650': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-view-container").find(".menu-expanded__view-name").find("a")
},
'-685460104': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='button']").filter(":containsTextNode("+fixed.tileTitleText+")").closest(".tile-title").closest("li");},
'-1161157793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-header-midget='"+fixed._lmAttr+"']").find("img.iconButton").filter(":mt_visible");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);