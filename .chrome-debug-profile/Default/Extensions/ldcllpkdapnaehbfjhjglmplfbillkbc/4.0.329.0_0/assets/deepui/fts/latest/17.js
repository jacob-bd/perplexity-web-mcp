(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '45101444': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("." + fixed._parentClass + " " + fixed._tagName + "." + fixed._class);
if (res.length > 1) res = res.filter(fixed._extra);
return res;},
'171342334': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("." + fixed._ancestorClass + " #" + fixed._parentId);
if (fixed._tagName) {
  res = res.find(fixed._tagName);
}
return res;
},
'208452536': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("." + fixed._parentClass + " " + fixed._tagName + "." + fixed._class);},
'480434611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("#walkme-player");
if (fixed._tagName) {
  res = res.find(fixed._tagName + "." + fixed._class);
}
return res;},
'786953945': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("." + fixed._ancestorClass + " #" + fixed._parentId);
if (fixed._tagName) {
  res = res.find(fixed._tagName);
}
return res;
},
'817072098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("." + fixed._parentClass + " " + fixed._tagName + "." + fixed._class);},
'1058539985': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("#" + fixed._id + " " + fixed._tagName + "." + fixed._class);
return res;},
'1954922042': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("." + fixed._ancestorClass);
if (fixed._parentId) {
  res =  res.find("#" + fixed._parentId);  
}
if (fixed._tagName) {
  res = res.find(fixed._tagName);
  if (res.length > 1 && fixed._class.length > 0) {
    res = res.filter("." + fixed._class);
  }
}
return res;
},
'-2027389460': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._id + " " + fixed._tagName + "[data-walkthru-id=" + fixed._walkthruId + "]");},
'-21642425': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._id + " " + fixed._tagName + "[data-bizflow-id=" + fixed._bizFlowId + "]");},
'-1221452775': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#walkme-menu " + fixed._tagName + "." + fixed._class);},
'-563937403': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("." + fixed._parentClass + " " + fixed._tagName + "." + fixed._class);},
'-1455140404': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._parentId + " #" + fixed._id);},
'-1911216074': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("." + fixed._parentClass + " " + fixed._tagName + "." + fixed._class);},
'-220743508': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {let res = wmjQuery("." + fixed._ancestorClass + " [role=button][aria-expanded=false]");
if (fixed._tagName) {
  res = res.find(fixed._tagName + "." + fixed._class);
}
return res;},
'-1853976184': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#" + fixed._id + " " + fixed._tagName + "." + fixed._class);}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);