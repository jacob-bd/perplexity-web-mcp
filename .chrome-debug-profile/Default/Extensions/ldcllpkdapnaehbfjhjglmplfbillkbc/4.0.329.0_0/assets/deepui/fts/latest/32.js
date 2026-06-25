(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '84575645': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[src*="+fixed._elemSrc+"]img");
},
'139910866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[for='"+fixed._elemFor+"']label");
},
'1182610201': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr[id="+fixed._parentId+"]").find(".label");
},
'1862839559': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button:directContains("+fixed.elemText+")").parent(fixed._elemTag+".button");
},
'2133135550': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[src*="+fixed._elemSrc+"]img").closest(fixed._elemTag).filter(":first");
},
'-390333818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[name='"+fixed._elemName+"']"+fixed._elemTag);
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);