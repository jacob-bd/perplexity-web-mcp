(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '314203252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.field-caption.dataValueRead")},
'670705446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(".field-caption:contains(" + dollars[0] + ")").next()},
'988811316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.content-item.content-field span:contains(" + dollars[0] + ")")},
'1535158456': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".content-inner .field-item[class~=" + dollars[0] + "][class~=" + dollars[1] + "]:last")},
'-2026169452': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(".field-caption:contains(" + dollars[0] + ")").next().find(fixed._tgtTag)},
'-572451164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery(fixed._tgtTag + "[name*=" + dollars[0] + "]")},
'-1031336407': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[swp=" + dollars[0] + "]").siblings().find("[title=" + dollars[1] + "]")},
'-1908581936': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {   const colHeader = wmjQuery("table tr.cellCont th div:textEquals(" + fixed.colTitle + ")").parents("th");
    const parentElm = colHeader.closest("tbody");
    const colIndex = colHeader.prevAll().length;
    const row = parentElm.find("tr:eq("+ fixed.rowIndex + ")");
    const candidate = row.find("td:eq("+ colIndex + ")");
    if (candidate.is( fixed._elTag + fixed._elClass + ":deepui_visible")){
        return candidate;   
    }
    return candidate.find( fixed._elTag + fixed._elClass + ":first:deepui_visible");},
'-1651382306': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("[data-node-id='" + fixed._tgtData + "'] [id=" + dollars[0] + "]:visible")},
'-1676604681': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.dataValueRead:contains(" + dollars[0] + ")")},
'-1038724013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.field-item.dataValueRead span:eq(" + dollars[0] + ")")},
'-1728165467': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label.actionTitleBarLabelStyle:contains(" + dollars[0] + ")")},
'-742600013': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span.field-caption.dataLabelForRead:contains(" + dollars[0] + ")")},
'-1286635793': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[title=" + dollars[0] + "].selected")},
'-565710162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.cellIn:contains(" + dollars[0] + ")")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);