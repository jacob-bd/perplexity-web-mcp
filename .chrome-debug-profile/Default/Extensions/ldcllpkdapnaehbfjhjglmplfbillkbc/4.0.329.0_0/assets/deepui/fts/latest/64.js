(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1721278842': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".AccountLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest("td.MultiRowLabel").next("td.dataCell").find("input").filter(":mt_visible");},
'2075915763': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*=Clone").filter("[id^="+fixed._elemId+"]");},
'-1929253016': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.shell-sidebar-left.active").find("div.shell-left-nav-submenu-toggler").filter("[data-test-id="+fixed._elemAttr+"]").find(".shell-left-nav-submenu-toggler-arrow");},
'-120543448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dta-detail-table").find("select").filter("[id^="+fixed._elemId+"]");},
'-2012650802': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".AccountLabel").filter(":containsTextNode("+fixed.labelTxt+")").closest("td.MultiRowLabel").next("td.dataCell").find("select");},
'-1030634256': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input[id*=Clone").filter("[id^="+fixed._elemId+"]").filter(":mt_visible");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);