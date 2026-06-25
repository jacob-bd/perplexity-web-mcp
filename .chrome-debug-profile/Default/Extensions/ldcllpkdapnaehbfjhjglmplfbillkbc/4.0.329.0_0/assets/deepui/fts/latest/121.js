(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '425862293': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-MenuItem").filter("[data-tid="+fixed._datatid+"]").find(".fui-MenuItem__content");},
'619843314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-MenuItem").filter("[data-tid="+fixed._datatid+"]");},
'1278101668': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='menuitem']").filter("[aria-label='"+fixed._elemAttr+"']");},
'1720331488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='menuitem']").filter("[data-tid="+fixed._elemData+"]");},
'-689184473': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".fui-Tab").filter("[data-tid="+fixed._dataTid+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);