(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '745733980': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".__menu-item").next("[data-testid='sidebar-item-library']");},
'1386542525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='create-new-chat-button']").next(".__menu-item");},
'-208650453': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".truncate").filter(":containsTextNode("+fixed.LabelText+")").closest(".group");},
'-1646456042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-testid='create-new-chat-button']").eq(1)}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);