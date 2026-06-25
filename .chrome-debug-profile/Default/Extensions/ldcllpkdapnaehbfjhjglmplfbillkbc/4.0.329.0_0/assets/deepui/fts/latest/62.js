(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '-1185146515': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("[id='"+fixed._elemId+"']")[0].shadowRoot;
return wmjQuery(fixed._tgElemTagName+"[id='"+fixed._elemId+"']",shadowElem);},
'-1692345920': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const shadowElem = wmjQuery("spl-textarea[id='"+fixed._elemId+"']")[0].shadowRoot;
return wmjQuery("textarea[id='"+fixed._elemId+"']",shadowElem);},
'-273723586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#"+fixed._inputNameAttr+",[name="+fixed._inputNameAttr+"]").closest(".column");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);