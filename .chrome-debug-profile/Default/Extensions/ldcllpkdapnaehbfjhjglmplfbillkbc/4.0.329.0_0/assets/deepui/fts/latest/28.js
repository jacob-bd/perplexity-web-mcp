(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '336691953': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const elemH= wmjQuery("[role='columnheader']").filter(":containsTextNode("+fixed.elemHeader+")");
if(elemH.length===1)
{
 const HeaderIndex= wmjQuery("[role='columnheader']").filter(":containsTextNode("+fixed.elemHeader+")").index();
return wmjQuery(elemH).closest("[id^='contentgrid']").find("[role='gridcell']").eq(HeaderIndex);
}
return wmjQuery();},
'648231627': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {if (fixed._formName) {
	return wmjQuery("form[name='" + fixed._formName + "']").next().find(fixed._class + "[id*='" + fixed._tgtId + "']").filter(":mt_visible")
} else {return wmjQuery()}
},
'-512829942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[fgid="+fixed._fGid+"]");},
'-698949087': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".entryInputCF").filter("[data-field-name="+fixed._dataFieldName+"]").find("input");},
'-746419240': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const parentShadow= wmjQuery("ui5-title").filter(":containsTextNode("+fixed.headerText+")").next("ui5-li").filter(":containsTextNode("+fixed.labelText+")");
const targetShadow= parentShadow.length && parentShadow[0].shadowRoot;
return targetShadow ? wmjQuery(targetShadow).find("li[role='listitem']") : wmjQuery();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);