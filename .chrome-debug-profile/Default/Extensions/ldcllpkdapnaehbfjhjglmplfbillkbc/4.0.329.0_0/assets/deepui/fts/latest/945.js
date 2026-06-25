(function(a) {
      if(a && typeof a['cb-platformFTs'] !== 'undefined') {
        var obj = {};
        obj.getData = function() {
          return {
            '110954869': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery(".FormBox").find("label[for]").filter(":containsTextNode("+fixed.txt+")");},
'-331951908': function(fixed, dollars, __ctx, ftHelper, wmjQuery) { const elem1 = wmjQuery("div[role='button']").filter(":containsTextNode("+fixed.elemText+")");
if (elem1.length)
{
  return elem1;
}
const elem2 = wmjQuery("a").filter(":containsTextNode("+fixed.elemText+")");
if (elem2.length)
{
  return elem2;
}
return wmjQuery();

},
'-1021158417': function(fixed, dollars, __ctx, ftHelper, wmjQuery) {return wmjQuery("ul[role='tablist']").find("span").filter(":containsTextNode("+fixed.txt+")");}
          };
        };
        a['cb-platformFTs'](obj);
      }
    })(window && window._walkmeInternals);