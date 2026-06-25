(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '666463866': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sdf-button").filter("[aria-label='" + fixed._elemAttr + "']")[0];
const firstShadow = first && first.shadowRoot;
return firstShadow ? wmjQuery(firstShadow).find("div[part='beta-btn']") : wmjQuery();},
'746602910': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("[role='columnheader']").filter("[id$='"+fixed._lmid+"']");},
'794717035': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".nav-tabs").find("[role='tab']").filter(":containsTextNode("+fixed.tabTxt+")").find(".tab-icon");},
'1520658234': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("label").filter(":containsTextNode("+fixed.labelTxt+")").closest(".form-group");},
'1546756332': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sdf-button").find("span").filter(":containsTextNode("+fixed.elmTxt+")");},
'1974662303': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sdf-button").filter(":containsTextNode("+fixed.lmTxt+")");
const firstShadow = first.length ? first[0].shadowRoot : null;
return firstShadow ? wmjQuery(firstShadow).find(".button") : wmjQuery();},
'-1696181037': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sdf-button").filter("[id="+fixed._btnid+"]").closest("sdf-box");},
'-1272251818': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("span").filter(":containsTextNode("+fixed.LabelText+")").closest(".control-label").next(".ti-control-container").find(".ant-select-selection");},
'-1888777680': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("sfc-shell-app-bar").find(".nas-icon-bar__icon").filter("[id="+fixed._elemId+"]");},
'-480705865': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {const first = wmjQuery("sdf-page-header-layout")[0];
const firstShadow = first && first.shadowRoot;

if (firstShadow)
{
  return wmjQuery(firstShadow).find("[role='heading']").parent("div");
}
return wmjQuery();}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);