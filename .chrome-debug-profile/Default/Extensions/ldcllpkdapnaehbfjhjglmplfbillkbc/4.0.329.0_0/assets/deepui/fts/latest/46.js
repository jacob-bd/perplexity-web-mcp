(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '996943315': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnReject").closest("button")},
'1902598908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.sapMBtnAccept").closest("button")},
'-1743337048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.sapMLabel").filter("[aria-label='"+fixed._labelText+"']").closest("div.sapUiFormCLElement").find("input");
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);