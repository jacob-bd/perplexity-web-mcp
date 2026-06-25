(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1160520951': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("spl-select[formcontrolname="+fixed._lmAttr+"]")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(".c-spl-form-field-label-wrapper",firstShadow): wmjQuery();},
'-1209899773': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("spl-autocomplete").filter("[label='"+fixed.labelAttr+"']");
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);