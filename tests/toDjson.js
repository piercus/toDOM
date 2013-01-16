sand.define("toDOM/tests/toDjson", ["toDOM/toDjson", "jsdom", "toDOM/tests/objEquiv", "toDOM/tests/testsCases", "vows", "assert", "Array/each", "core/isArray"],   
  function(r) {

	  var suite = r.vows.describe("djson toDOM"), assert = r.assert;
	  r2 = {};
	  r.testsCases.each(function(tC){
	    if(!tC.reverse){
	      return;
	    }
	    var o = tC, i = 0;
	    r2[tC.name] = {
         topic : function(){ return r.toDjson(o.htmlString); },
         "djson is ok" : function(topic){
            var html = topic;
            r.objEquiv(html, o.djson[0]);
         }
      };
      

	  });          
    suite.addBatch(r2);
	
	  return suite.run();
});

