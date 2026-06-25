(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '623456927': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='issue-create.ui.modal.modal-body']").find("div").filter("[data-testid='"+fixed._elemId+"']").find("#ak-editor-textarea");},
'781009213': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[id='"+fixed._labelId+"']").closest("div[id]").find("#ak-editor-textarea");},
'1030208021': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".name").filter(":containsTextNode("+ fixed.btnText +")").next().find("a");},
'1123366571': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div").filter("[data-testid='"+fixed._elemId+"']").find("#ak-editor-textarea");},
'-659909751': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section").filter("[data-testid='"+fixed._sectionDataTestid+"']").find("div").filter("[id='"+fixed._containerId+"']").find("#ak-editor-textarea");},
'-860281024': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id='"+fixed._elemId+"']").find("#ak-editor-textarea");},
'-2082023611': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNodeIgnore("+fixed.labelTxt+")").closest(".field-group").find("textarea,input").filter(":mt_visible");},
'-264863366': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("h2[data-testid='issue-activity-feed.heading']").parent().nextAll("span").find("#ak-editor-textarea");},
'-27514772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest("div[id]").find("#ak-editor-textarea");},
'-1033575005': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").next("select");},
'-19979031': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.lblText+")").closest(".field-group").find("select");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);