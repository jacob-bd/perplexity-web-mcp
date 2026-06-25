(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '294438': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.elemData+")").filter("[class^='SubTierNav']").filter(':mt_visible');
},
'159917488': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel").filter(":directContains("+fixed.labelText+")").closest("[id^='editRow']").filter(':mt_visible');
},
'175915132': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[data-automation-id='"+fixed._elemText+"']").filter("[class^='SubTierNav']").filter(':mt_visible');
},
'348538669': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='bhWindowsTabBar']").find(".WindowTab").filter(":containsTextNode(" + fixed.expectedText + ")")},
'427774968': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.labelText+")").prev().closest("td").find(".EditField").filter("[id='"+fixed._elemName+"']").filter(':mt_visible');
},
'488352307': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("#menu-expand").find(".XPButton").filter(":contains("+fixed.expectedText+")")},
'541051295': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-label-text").filter(":directContains("+fixed.labelText+")").closest(".menu-label").find("i").filter(':mt_visible');
},
'643838324': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").find(".page-title").filter(":textEquals("+fixed.expectedText+")")},
'855430417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel").filter(":directContains("+fixed.labelText+")").closest("tr").find(".EditField ").find(".EditField ").filter(":directContains("+fixed.elemText+")").filter(':mt_visible');
},
'867371497': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id='"+fixed._elemName+"']").filter(".EditField").filter(':mt_visible');
},
'894065100': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.labelText+")").prev().closest("td").find(".picker-multi").filter(':mt_visible');
},
'998169835': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.EditFieldLabel").filter(":contains("+fixed.expectedText+")").next().find(".select2-container")},
'1522607538': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i").filter("."+fixed._labelText).closest(fixed._tagName).filter(':mt_visible');
},
'1711292753': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel ").filter(":directContains("+fixed.labelText+")").closest("[id^='editRow']").find(".picker-multi ").filter(':mt_visible');
},
'1714168613': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".main-content").children("header").filter(":containsTextNode(" + fixed.expectedText + ")").parents(".main-content").find("div.scrollable")},
'1739666039': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-label-text").filter(":directContains("+fixed.labelText+")").closest("[class*='"+fixed._elemClass+"']"+fixed._tagName).filter(':mt_visible');
},
'1854385689': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel").filter(":containsTextNode(" + fixed.tgtText + ")").next(".DateField").children("input");},
'1919795512': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelText+")").closest(".novo-control-container").find("input");},
'1946270981': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter("[for="+fixed._labelText+"]").closest(".novo-control-container").find("input");},
'-789211463': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("i").filter("."+fixed._labelText).closest(".menu-label").closest(".menu ").filter(':mt_visible');
},
'-336013772': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".criteria-title").filter(":containsTextNode(" + fixed.tgtText + ")").closest(".criteria-header").next(".search-criteria-list").find("span").first();},
'-1284610017': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel ").filter(":directContains("+fixed.labelText+")").closest("tbody").find("input[type='button']").filter("[value='"+fixed.elemId+"']").filter(":first").filter(':mt_visible');
},
'-1820042203': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":directContains("+fixed.labelText+")").closest(".ThemeHeadingText ").filter(':mt_visible');
},
'-310825996': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel").filter(":directContains("+fixed.labelText+")").closest(".editRow").find("select").filter(':mt_visible');
},
'-957820338': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-label-text").filter(":directContains("+fixed.labelText+")").closest(".menu-label").filter(':mt_visible');
},
'-2117591525': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".menu-label-text").filter(":textEquals("+fixed.labelText+")").closest("th").filter(':mt_visible');
},
'-1132789120': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":directContains("+fixed.labelText+")").next().find(fixed._tagName+"."+fixed._elemClass).filter("[name='"+fixed._elemName+"']").filter(':mt_visible');
},
'-715890632': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("tr.editRow").filter(":contains("+fixed.expectedText+")").find("input")},
'-884701663': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.EditFieldLabel").filter(":contains("+fixed.expectedText+")").next().find("ul.select2-choices")},
'-1232454171': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td.EditFieldLabel").filter(":contains("+fixed.expectedText+")").next().find(".picker-multi")},
'-360834102': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("header").find("label.button").filter(":textEquals("+fixed.expectedText+")")},
'-1552509685': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("a.active ").filter(":directContains("+fixed.activeTab+")").closest(".modal ").find("textarea").filter("[id='"+fixed._elemId+"']").filter(':mt_visible');
},
'-903474873': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(":contains("+fixed.elemText+")").filter(".ThemeHeadingText ").filter(':mt_visible');
},
'-924265311': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".EditFieldLabel").filter(":directContains("+fixed.labelText+")").closest(".editRow").find("[name^='jobPosting']").filter(':mt_visible');
}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);