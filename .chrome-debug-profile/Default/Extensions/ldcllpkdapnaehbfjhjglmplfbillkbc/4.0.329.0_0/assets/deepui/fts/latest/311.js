(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '831643946': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.elemTxt+")").next(".form-control-static");},
'-944778538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._lmId+"]").children(".form-group").find(".field-label").parent("div");},
'-1108925211': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".mx-name-textBox_OpportunityGrpId .form-control-static");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);