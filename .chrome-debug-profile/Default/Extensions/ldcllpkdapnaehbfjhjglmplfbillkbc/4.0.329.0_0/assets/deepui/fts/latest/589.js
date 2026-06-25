(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '915909921': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section.tasklist").find(".datainfo").find("p.text");},
'933831443': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a").filter("[data-name="+fixed._lmAttr+"]");},
'1900470713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".button").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'1954321357': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":header").filter(":contains("+fixed.parentHeaderText+")").closest(".container").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'-56060098': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("li.button").find("a").filter(":containsTextNode("+fixed.lmText+")");},
'-1180676372': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("section.service-record-days").find(".wrapper");},
'-1031949233': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("strong").filter(":containsTextNode("+fixed.LabelText+")").parent(".tdNoWrap").closest(".list_title_bg_left");},
'-1107817194': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#btnAddKeiyakusya").filter("[value="+fixed.LabelText+"]").closest("[class*='tableCellspacing']").parent("td");},
'-279920720': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.LabelText+")").closest(".label_field").next(".attribute_fields").find(".input_field");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);