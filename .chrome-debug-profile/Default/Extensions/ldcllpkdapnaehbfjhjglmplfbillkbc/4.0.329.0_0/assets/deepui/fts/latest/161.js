(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '1807961209': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[_name='"+fixed._nameAttr+"']").filter(":mt_visible");},
'-534168839': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[data-model-name="+fixed._nameAttr+"]");},
'-1263811463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=ModalContainer]").find("[data-rbd-draggable-id='"+fixed.elemIndex+"']").find("[data-qa='recipient-menu-text']").filter(":containsTextNode("+fixed.childAttr+")").closest("button[data-qa='recipient-menu']");},
'-2086930555': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-describedby="+fixed._ariaDescribedby+"]").first();},
'-1038073219': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[data-qa="+fixed._dataQa+"]").first();},
'-973762858': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[class*='RECIPIENT_CARD_CONTAINER']:eq("+fixed._elemIndex+")").find("textarea");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);