(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1175908425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("nav").find("svg").filter("[data-key="+fixed._datakey+"]").closest(".slds-button_icon");},
'-1958578559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".slds-page-header").find(".setup-header-title").filter(":containsTextNode("+fixed.txt+")").closest(".setup-header-element").parent("div");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);