(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '266611207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".dl-calendar-navigation-links").filter("[data-test="+fixed._parentAttr+"]").find("button").filter("[data-test="+fixed._lmAttr+"]");},
'1794030546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li").filter("[data-walkme="+fixed._liData+"]").find("button");},
'-1285310676': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-walkme="+fixed._lmData+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);