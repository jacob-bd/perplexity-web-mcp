(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '119285554': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SectionHeader_sectionHeaderTopRow__74prL").filter(":contains("+fixed.elemText+")");},
'1408531463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".estytest1")},
'-638607692': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-626241514': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[testqa-id=" + dollars[0] + "]:eq(" + dollars[1] + ")")},
'-1471213750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".GreetingBanner_leftContent__mCxvS:containsTextNode("+fixed.txt+")")},
'-1203103022': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".estyTest1("+fixed.txt+")")},
'-1304024330': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".estyTest4")},
'-1802371786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EstyTest6").filter(":contains("+fixed.elemText+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);