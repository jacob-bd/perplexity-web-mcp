(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1820898229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".profile-contact-info").find("button");},
'-1445217360': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.preference-section-title").find("div").filter(":containsTextNode("+fixed.txt+")");},
'-384491083': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".switch").filter("[aria-label='"+fixed._aria_label+"']");},
'-1508610926': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class*='"+fixed._lmclass+"']").children(".tab-heading").find("span");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);