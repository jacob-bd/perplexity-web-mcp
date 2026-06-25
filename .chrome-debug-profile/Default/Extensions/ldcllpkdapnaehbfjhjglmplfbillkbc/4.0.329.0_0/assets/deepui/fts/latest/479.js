(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '452991058': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ms-Callout-main").find("[role='menuitem']").filter(":containsTextNode("+fixed.lmTxt+")");},
'553984761': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".headerContent-titleButton").filter(":containsTextNode("+fixed.lmText+")").closest("[class*=listHeader]");},
'797636586': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find("input");},
'1215843801': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i").filter(":containsTextNode("+fixed.elemText+")");},
'1994679731': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".ms-Checkbox-label").filter(":containsTextNode("+fixed.elmTxt+")");},
'-1812051533': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='questionTitle']").filter(":containsTextNode("+fixed.questionTitleText+")").closest("[data-automation-id='questionItem']").find("input");},
'-1373485760': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div").find(".ms-BasePicker");},
'-386444940': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='HeroPatternElement']").filter("[aria-label='"+fixed._aria_label+"']").find("img");},
'-482048487': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2").filter(":containsTextNode("+fixed.LabelText+")").closest("div").parent("div");},
'-1032313277': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='QuicklinksItemTitle']").filter("[title="+fixed.lmTitle+"]").closest("[data-automation-id='compact-card']");},
'-144984014': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[data-automationid="+fixed._lmAttr+"]");},
'-191535602': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter("[id='"+fixed._sectionId+"']").closest("[data-automation-id='CanvasControl']").next("[data-automation-id='CanvasControl']").find("[data-automation-id='HeroPatternElement']").filter("[aria-label='"+fixed._lmAttr+"']").find("img").parent("div");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);