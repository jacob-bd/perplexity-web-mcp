(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '166874252': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[aria-label='"+fixed._tgtLabel+"']");},
'190425434': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {    const header = wmjQuery("[aria-label='header'] table[aria-label='table'][class~='lmc'] tbody td").filter(":contains(" + fixed.colTitle + ")");
	if (header.length === 0) return wmjQuery();
    const colOffset = header.offset().left;


    const tableBody = wmjQuery("[aria-label='grid'] table[aria-label='table'][class~='lmc'] tbody");
    
    let mainGroup = tableBody.find("tr:contains(" + fixed.mainGroupText + ")").find("td[role='group']").first().closest("tr");
    let rows = mainGroup.nextAll().filter(":has(td[role='link'])");
	if (fixed.groupRowsCount == 0) rows = mainGroup.next();
    if (rows.length >= fixed.groupRowsCount) rows = rows.eq(fixed.groupRowsCount);
    if (rows.length > 1) rows = rows.first();
    if (fixed._rowType === "normal") {
      	rows = rows.next();
        for (i=0; i<fixed.normalRowsCount; i++) {
            rows = rows.next();
            if (rows.find("td[role='link']").length == 1) return wmjQuery(); 
        }
    }

	if (rows.length != 1) return wmjQuery();
	let rowOffset = rows.offset().top;
	const row = tableBody.find("tr").filter(function() {
          	let _el = this;
            return wmjQuery(_el).offset().top === rowOffset; 
        }).eq(fixed.mainGroupTable);

    const candidates = row.find("td" + fixed._elClass + fixed._elRole);
	const offsets = candidates.map(function() {
      let _el = this;
      return Math.abs(wmjQuery(_el).offset().left - colOffset);
	}).toArray();
	const minOffsetIdx = offsets.indexOf(Math.min.apply(Math, offsets));
    const candidate = candidates.eq(minOffsetIdx);
    
    if (candidate.is(fixed._elTag + fixed._elClass + fixed._elRole)){
        return candidate;   
    }
    return candidate.find(fixed._elTag + fixed._elClass + fixed._elRole);},
'336813295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='header'] table[aria-label='table'][class~='lmc'] tbody td span").filter(":contains(" + dollars[0] + ")");
},
'350704923': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*='object']").find("td").find("div").filter(":directContains("+fixed.labelText+")");},
'396576537': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("td.noclip:contains(" + fixed.elText + ")").closest("table").prev().find(fixed._elTag);},
'743498870': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {    const el = wmjQuery("table[id^=string]:contains(" + fixed.labelTitle + ")");
    if (el.length === 0) return wmjQuery();
	const elOffsetLeft = el.offset().left;
	const elOffsetTop = el.offset().top;
    const parentId = el.attr("id").split("string")[1];
	const candidates = wmjQuery("div[id=object" + parentId + "]").find("div[id^=cga]");
	const offsets = candidates.map(function() {
      let _el = this;
      return Math.abs(wmjQuery(_el).offset().left - elOffsetLeft) + Math.abs(wmjQuery(_el).offset().top - elOffsetTop);
	}).toArray();
	const minOffsetIdx = offsets.indexOf(Math.min.apply(Math, offsets));
    const candidate = candidates.eq(minOffsetIdx);
    return candidate;},
'749389606': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='navigation']").find("[role='button']").filter("[aria-label=" + fixed.titleText + "]");},
'870888061': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("td.noclip:contains(" + fixed.elText + ")").find(fixed._elTag);},
'1053271346': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("td.noclip:contains(" + fixed.elText + ")").closest(fixed._elTag);},
'1230501685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[aria-label='"+fixed._tgtLabel+"']");},
'1347999031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='navigation']").find("input").filter("[aria-label=" + fixed._titleText + "]")},
'1366819244': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='banner']").find("[role='button']").filter("[aria-label='" + fixed._titleText + "']");},
'1501609284': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='navigation']").find("[role='button']").filter("[aria-label='" + fixed._titleText + "']");},
'1652969343': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='complementary'] div[role='button']").filter("[aria-label="+fixed.elemAttr+"]");},
'1713912076': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[role='navigation']").find("input").filter("[aria-label=" + fixed._titleText + "]");},
'2000360214': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div.menu").find("input").filter("[aria-label='"+fixed._tgtLabel+"']");},
'-1734311448': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {    const tableBody = wmjQuery("[aria-label='grid'] table[aria-label='table'][class~='lmc'] tbody");
    
    let mainGroupOffset = tableBody.find("tr:contains(" + fixed.mainGroupText + ")").find("td[role='group']").first().closest("tr").offset();
	if (mainGroupOffset) mainGroupOffset = mainGroupOffset.top;
	const mainGroup = tableBody.find("tr").filter(function() {
          	let _el = this;
            return wmjQuery(_el).offset().top === mainGroupOffset; 
        }).eq(fixed.mainGroupTable);
	
    if (mainGroup.is(fixed._elTag + fixed._elClass + fixed._elRole)){
        return mainGroup;   
    }
    return mainGroup.find(fixed._elTag + fixed._elClass + fixed._elRole);},
'-257076853': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("input.plwInput[aria-label=" + dollars[0] + "]")},
'-1215727739': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("div>div[role='button'][aria-label='Display right panel']")},
'-1174550707': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label='header'] table[aria-label='table'][class~='lmc'] tbody td").filter(":contains(" + dollars[0] + ")");
},
'-1296605942': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("div[role=navigation]>table " + fixed._elTag + ":contains(" + dollars[0] + ")")},
'-356241623': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {    const tableBody = wmjQuery("[aria-label='grid'] table[aria-label='table'][class~='lmc'] tbody");
    
    let mainGroup = tableBody.find("tr td[role='group']").first().closest("tr")
	if (mainGroup.is( fixed._elTag + fixed._elClass)){
        return mainGroup;   
    }
    return mainGroup.find( fixed._elTag + fixed._elClass + ":first");},
'-2088952186': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return new wmjQuery("div[title=" + dollars[0] + "][aria-label=" + dollars[1] + "]")},
'-420860265': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {    return wmjQuery(fixed._elTag + fixed._elClass + fixed._elRole + fixed._elAriaLabel + fixed._elTitle);},
'-736063555': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[role=cell]").filter(":containsTextNode("+fixed.tgtText+"):first()");},
'-735790462': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[role=cell]").filter(":containsTextNode("+fixed.tgtText+"):first");},
'-1993445353': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[aria-label=header]").find("td").filter(":contains("+fixed.tgtText+")");},
'-1091418631': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=header]").find("td").filter(":containsTextNode("+fixed.tgtText+")");},
'-1115037027': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id*=header]").find("span").filter(":containsTextNode("+fixed.tgtText+")");},
'-2018780874': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table.table_window").filter(":containsTextNode("+ fixed.headerText +")").next().find("input").filter("[aria-label='" + fixed._titleText + "']")},
'-1317678961': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role=button]").filter("[aria-label='"+fixed._tgtLabel+"']");},
'-175689573': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("textarea").filter("[placeholder='"+fixed._placeholder+"']");},
'-1515412008': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td[role=cell]").filter(":containsTextNode("+fixed.tgtText+"):first()");},
'-1276459624': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".treeView").find("td").filter(":containsTextNode("+fixed.elemText+")");},
'-1853462217': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[aria-label="+fixed.elemAttr+"]");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);