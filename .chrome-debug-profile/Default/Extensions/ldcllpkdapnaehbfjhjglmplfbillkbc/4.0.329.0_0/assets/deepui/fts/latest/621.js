(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1537046332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[message-key='TELLER_TRANSFORM_ADDNOTES_LBL']").filter(":containsTextNode("+fixed.btnTxt+")").closest(".secondaryActionButton");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);