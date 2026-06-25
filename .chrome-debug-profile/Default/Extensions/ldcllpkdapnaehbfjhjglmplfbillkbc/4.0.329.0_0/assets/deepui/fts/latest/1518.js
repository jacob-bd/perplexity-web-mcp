(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '3121433': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span#me:contains(" + dollars[0] + ")")},
'1192855544546': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".SectionHeader_sectionHeaderTopRow__74prL").filter(":contains("+fixed.elemText+")");},
'8455188675426': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const cardElem = wmjQuery("article.slds-card_boundary").filter(":mt_visible");
if (fixed._tgtTag === "SPAN") {
	return cardElem.find("span.slds-truncate").filter(":containsTextNode(" + fixed.tgtText + ")");
} else {
	return cardElem.find(fixed._tgtTag).filter(":containsTextNode(" + fixed.tgtText + ")");
}
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);