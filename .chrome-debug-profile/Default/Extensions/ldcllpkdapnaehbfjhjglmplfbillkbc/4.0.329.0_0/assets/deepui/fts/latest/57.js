(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '85800158': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".PSSRCHEDITBOXLABEL").filter(":containsTextNode("+fixed.labelText+")");},
'130905904': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id='"+fixed._labelId+"']").closest("td").next("td").find(".PSEDITBOX_DISPONLY");},
'152039314': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").next().find("input").filter("[id^="+fixed._elemId+"]");},
'194610371': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.btnText+")").closest(".ps_box-dropdown").find(".ps-dropdown");
},
'333947307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".PSDROPDOWNLABEL").filter(":containsTextNode("+fixed.labelText+")").closest("tr").find("select");},
'421875685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".PSGROUPBOX").find(".PSEDITBOX_DISPONLY").filter("[id="+fixed._elemID+"]");},
'453541415': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[id="+fixed._elemId+"]");},
'495645623': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter(":containsTextNode("+fixed.labelText+")").closest("tr").prev("tr").find("select");},
'807635531': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").find("td.PSGROUPBOXLABEL").filter(":containsTextNode("+fixed.labelText +")");},
'954137821': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id='"+fixed._ElemSplitId+"']");},
'965119693': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[value="+fixed.attrElem+"]").closest("a");},
'1146310544': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[id="+fixed._parentId+"]").children("h1").find(".ps-text").filter("[id="+fixed._id+"]");},
'1150799144': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter(".PSPAGECONTAINER").find("td").find(".PTCPGRIDTITLE");},
'1417604884': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery("[class$='GRIDCOLUMNHDRTXT']").filter(":containsTextNode("+fixed.labelText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1525615118': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").find(".ps-text").filter("[id="+fixed._elemId+"]");},
'1700160690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#PSTAB").find("#app_label").filter(":containsTextNode("+fixed.elemText+")");},
'1833092903': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".PTCPGRIDTITLE").filter(":containsTextNode("+fixed.titleText+")").closest("td").find("a[class*='GRIDCOLUMNHDR']").filter(":containsTextNode("+fixed.labelText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'2024764792': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id^='"+fixed._tgtName+"']").filter(":mt_visible");},
'2130755214': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[value="+fixed.attrElem+"]").closest("div");},
'2131042489': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[id$="+fixed._lmId+"]");},
'-717712728': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.labelText+")").closest("tr").prev("tr").find("span");},
'-1206339620': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".PTCPGRIDTITLE").filter(":contains("+fixed.labelText+")");},
'-2086509432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select[id="+fixed._idAttr+"]");},
'-1737399863': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("td").next("td").next("td").find("select");},
'-1412922215': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='tab']").find("span").filter(":contains("+fixed.labelText +")");},
'-1742532690': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".PSEDITBOXLABEL").filter(":containsTextNode("+fixed.labelText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-262552427': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a[role='menuitem']").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-76868769': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.PT_CP_PAGETABTD a[aria-label='Advanced Options'] span");},
'-1364322971': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("select").filter("[name="+fixed._selectName+"]");},
'-1369852816': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._aId+"]").find("#"+fixed._elemId+"");},
'-226168750': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id="+fixed._aId+"]").find("#"+fixed._elemId+"").filter(":containsTextNode("+fixed.elemText+")");},
'-1313369822': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ps_box-pagetabs").find("#PSTAB").find("#app_label");},
'-593291760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[id='"+fixed._parentId+"']").find("img").filter("[id='"+fixed._elemId+"']");},
'-94608637': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("input").filter("[value="+fixed.inputValue+"]").closest("div").filter("[id="+fixed._elemId+"]");},
'-1737660910': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id='"+fixed._parentId+"']").find(".PSLONGEDITBOX");},
'-202014752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ps-label").filter(":contains("+fixed.lblTxt+")").closest(".ps_box-radio");},
'-304894832': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest("tr").prev("tr").find("img");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);