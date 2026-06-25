(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '304182547': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("td").filter(":containsTextNode("+fixed.lmLabel+")").siblings("td").find("input");},
'796865026': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".CmicInput").children("label").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'1245743316': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("fieldset").filter("[id="+fixed._parentId+"]").find(".legend");},
'1356909617': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".gt-hd-row").find("span").filter(":containsTextNode("+fixed.lmText+")").closest("td").filter("[class*="+fixed._lmClass+"]");},
'-2090358418': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".xProjectsHeaderDiv").find("[id=COG_Title]").closest("table").parent("td")},
'-1743257446': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[id*=topToolbarHorizontalGroupLayout]").find("table[id*=brandingGroup]").closest("tbody").closest("td")},
'-268473893': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("table").filter(":contains("+fixed.mainTitleText+")").next("div").children("[id*='Main::content']").find("div[id*='INSERTRECORD_toolbarButton']").children("a").filter(":contains("+fixed.lmText+")");


},
'-2092126266': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const targetOptions = wmjQuery(".CmicInput").children("label").filter(":containsTextNode("+fixed.lmText+")");
return targetOptions.length > 1 ? targetOptions.filter(":mt_visible") : targetOptions;},
'-452141713': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("button").filter("[class*="+fixed._lmClass+"]").filter(":containsTextNode("+fixed.lmText+"):mt_visible()");},
'-1183738342': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":contains("+fixed.lmLabel+")").closest("td").siblings("td[valign='top']").find("input:eq(0)");},
'-346161807': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("th").filter("[data-title="+fixed._lmLabel+"]").find("span");},
'-584856626': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("div[id]").filter("[id="+fixed._parentId+"]").find("div.row").find("div.col").find("div.row").find("span.legend");},
'-1895127553': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".cmicBannerPageText").filter("[id="+fixed._lmId+"]");},
'-64431505': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("fieldset").filter("[id="+fixed._fieldsetId+"]").find(".legend");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);