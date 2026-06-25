(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '316514613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".attribute-field").filter("[id="+fixed._attributeFieldIdAttr+"]").find(".CodeMirror");},
'1033145077': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".component-label").filter(":containsTextNode("+fixed.componentLabelDirectText+")").closest(".element-wrapper").find(".CodeMirror");},
'-1434318031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".form-label").filter(":containsTextNode("+fixed.formLabelDirectText+")").closest(".element-wrapper").find("pre.CodeMirror-line");},
'-739880107': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#pvlp-base-message").next(".tray-content-widget");},
'-850818847': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.LabelText+")").parent("div");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);