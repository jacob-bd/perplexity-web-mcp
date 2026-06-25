(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '54696255': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".smb-DropdownMenu").find("[role='menuitem']").filter(":containsTextNodeIgnore("+ fixed.btnText +")");},
'72910213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".chr-EditorPanel").find(".chr-FormField-label").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'108464752': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".smb-DropdownItem").filter(":containsTextNode("+fixed.elmTxt+")");},
'387767023': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormFooter").find("button").filter(":containsTextNode("+fixed.lmText+")");},
'407508723': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".chr-EditorPanel").find(".chr-FormField-label").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'485245652': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".smb-SelectList").find("span.smb-DropdownItem-text").filter(":containsTextNode("+fixed.tgtElemText+")");},
'499016432': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div."+fixed._parentClass+"").find("div."+fixed._attrClass+"");},
'733169748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-label").filter(":contains("+fixed.labelText+")").closest(".chr-FormField").find(".chr-ParentEditor-noAccess");},
'777956997': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-ParentEditor").filter("[aria-label='"+fixed._ariaAttr+"']").find(".chr-ParentEditor-linkSpan");},
'884632977': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField").find("label").filter("[for='"+fixed._tgtElemForAttr+"']");},
'1183228048': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.fieldLabelText+")").closest(".chr-FormField").find(".smb-SingleItemDropdown").children();},
'1240137949': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-label").filter(":containsTextNode("+fixed.formLabelDirectText+")").closest(".chr-FormField").find(".smb-DropdownTrigger");},
'1258438505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-testid='"+fixed._dataTestid+"']").children("div").filter("[class*="+fixed._elemClass+"]");},
'1304242428': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter("[class*="+fixed._elemClass+"]");},
'1437215727': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.fieldLabelText+")").closest(".chr-FormField").find(".smb-SingleItemDropdown").children();},
'1451114556': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-input").filter("[data-testid='"+fixed._dataTestid+"']").find("li").filter(":contains("+fixed.elemText+")").find("div");},
'1475574660': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-label").filter(":containsTextNode("+fixed.fieldLabelText+")").closest(".chr-FormField").find("button").filter("[aria-label='"+fixed._tgtElemAriaLabel+"']");},
'1547811012': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-SectionBuilder-sectionGrid").find(".chr-FormField-label").filter(":containsTextNode("+fixed.lmText+")");},
'1573453539': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-input").find("input").filter("[aria-label='"+fixed._tgtElemAriaLabel+"']");},
'1587931262': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-input").filter("[data-testid='"+fixed._dataTestid+"']").find("div").filter("[role="+fixed._elemRole+"]");},
'1996262498': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-ReorderableLayout").find("label,span").filter(":containsTextNode("+fixed.lmText+")");},
'2023260157': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-EditorFormField").filter("[data-testid*='"+fixed._datatestid+"']").find(".chr-FormField-label");},
'2027615968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-ParentEditor").find(".chr-ParentEditor-linkSpan");
},
'2101339507': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-label").filter(":containsTextNode("+fixed.fieldLabelText+")").closest(".chr-FormField").find("button").filter("[aria-label='"+fixed._tgtElemAriaLabel+"']");},
'-1551009207': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-label").filter(":contains("+fixed.labelText+")").closest(".chr-FormField").find(".chr-ParentEditor-noAccess");},
'-885261808': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".chr-EditorPanel").find(".chr-FormField-label").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1503026253': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".smb-DataTable-headerRow").find("div.smb-TableHeaderCell-childrenWrapper").filter(":containsTextNode("+fixed.tgtElemText+")");},
'-250928814': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField").find("label").filter("[for='"+fixed._tgtElemForAttr+"']");},
'-1680366859': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField--workItemCPrimaryFeatureWorkType").find("label");},
'-1705942123': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.FieldLabelText+")").closest("div.chr-FormField");},
'-1584481447': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelForAttr+"']").closest(".chr-FormField").find(".smb-DropdownTrigger-text");},
'-1407829229': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-EditorForm").find(".chr-DetailHeader-title");
},
'-2064909109': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelForAttr+"']").closest(".chr-FormField").find(".chr-ParentEditor-linkSpan");},
'-1236457038': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".smb-HeaderGroup-title").filter(":containsTextNode("+fixed.PanelHeader+")").closest(".smb-Panel").find("iframe");},
'-513311574': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-input").filter("[data-testid='"+fixed._dataTestid+"']").find("div").filter("[role="+fixed._elemRole+"]");},
'-693428735': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-ReorderableLayout").find("label,span").filter(":containsTextNode("+fixed.lmText+")");},
'-842373437': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".chr-EditorPanel").find(".chr-FormField-label").filter(":containsTextNode("+fixed.elmTxt+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-178935163': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-ParentEditor").find(".chr-ParentEditor-linkSpan");
},
'-1475109162': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelFor+"']").closest("div").filter("[class*="+fixed._elemClass+"]");},
'-2130734705': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelForAttr+"']").closest(".chr-FormField").find(".smb-DropdownTrigger-text");},
'-1880691472': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelForAttr+"']").closest(".chr-FormField").find(".chr-ParentEditor-linkSpan");},
'-461650326': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[class*="+fixed._parentClass+"]").children("button");},
'-1679109213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField-input").filter("[data-testid='"+fixed._dataTestid+"']").find("li").filter(":contains("+fixed.elemText+")").find("div");},
'-807600159': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-EditorFormField").filter("[data-testid*='"+fixed._datatestid+"']").find(".chr-FormField-label");},
'-384176164': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-EditorFormField").filter("[data-testid='"+fixed._dataTestid+"']").find("label");},
'-590355748': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for='"+fixed._labelFor+"']");},
'-742478320': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-FormField").filter("[data-testid='"+fixed._formfieldDataTestIdAttr+"']").find("[class*=" + dollars[0] + "]");},
'-670455364': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".chr-EditorPanel").find(".chr-FormField-label").filter("[for='"+fixed._tgtForAttr+"']");},
'-851025786': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".chr-EditorPanel").find("label,.chr-FormField-label").filter(":contains("+fixed.tgtDirectText+")").filter(":mt_visible").first();
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-1448655392': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='option']").filter(":contains("+fixed.elelmText+")").find("div")},
'-86302393': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li[role='option']").filter(":contains("+fixed.elelmText+")")}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);