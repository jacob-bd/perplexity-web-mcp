(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '887496872': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-qa='mo-popup-content']").find("a[data-qa='result-row']").filter(":containsTextNode("+fixed.elemTxt+")").children("div[data-qa^='stage-option']");},
'1161830987': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".profile-call-to-actions").find("a.button").filter("[data-qa='"+fixed._parentDataQa+"']").children("div");},
'2128041364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lists-candidates").find(".opportunity-profile-sidebar-wrapper").find("svg.icon-email-s").parent();},
'-1224208594': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".opportunity-profile-main-column").find(":header[data-qa=opportunity-profile-name]").find("input");},
'-212331467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lists-candidates").find(".opportunity-profile-sidebar-wrapper").find(".content-link").filter("[data-qa='"+fixed._elemDataQa+"']");},
'-2001553877': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".lists-candidates").find(".opportunity-profile-sidebar-wrapper").find("a.email-address");},
'-289738718': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".opportunity-card").find("button").filter("[data-qa='"+fixed._elemDataQa+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);