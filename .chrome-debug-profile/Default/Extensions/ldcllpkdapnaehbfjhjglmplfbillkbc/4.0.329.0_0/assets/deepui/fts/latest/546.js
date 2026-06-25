(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '260335812': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".panel-primary").filter("[id="+fixed._parentId+"]").find(".panel-heading");},
'1556335008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mega-menu").find("input").filter("[id="+fixed._elemId+"]");},
'1922469530': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='checkbox']").filter("[name="+fixed._inputName+"]").closest("span");},
'1985278208': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[id="+fixed._liId+"]").find(".div-action-center");},
'-1105514199': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".div-action-center").filter("[id="+fixed._elemId+"]");},
'-2120814209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-link").filter("[data-auto="+fixed._elemDataAuto+"]");},
'-1916422203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-item").filter("[id="+fixed._liId+"]").find(".nav-link");},
'-800993545': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[type='checkbox']").filter("[name="+fixed._elemName+"]");},
'-175114168': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-item").filter("[id="+fixed._liId+"]").find(".dropdown-toggle-searchlink");},
'-460869519': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".btn-primary").filter("[data-target='"+fixed._elemDataTarget+"']");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);