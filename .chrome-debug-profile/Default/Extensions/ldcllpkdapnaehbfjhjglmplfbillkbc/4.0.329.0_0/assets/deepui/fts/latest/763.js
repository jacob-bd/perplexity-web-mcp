(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1706360264': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id=draft-comment-question-sub-label]").find("[class*=singleValue]").filter(":containsTextNode("+fixed.elmTxt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);