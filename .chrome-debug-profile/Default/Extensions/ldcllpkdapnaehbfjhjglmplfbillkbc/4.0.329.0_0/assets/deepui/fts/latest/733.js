(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1791384869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMFlexBox").filter("[id="+fixed._lmId+"]").find("button").filter("[title="+fixed.lmTile+"]");},
'1864122963': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMFlexBox").filter("[id="+fixed._lmId+"]").find("iframe.tox-edit-area__iframe");},
'2105253757': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSLITitleOnly").filter(":containsTextNode("+fixed.labelText+")").closest("li");},
'-786417138': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("bdi").filter(":containsTextNode("+fixed.lmText+")").closest("label").closest(".sapUiFormCLElement").find("input");},
'-1069431402': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("body").filter("[id="+fixed._lmId+"]").find("p");},
'-879723774': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".sapMSLITitleOnly").filter(":directContains("+fixed.elemText+")").closest("li");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);