(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-107233346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter("[data-sap-ui-colid='"+fixed._lmId+"']").find("input").first();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);