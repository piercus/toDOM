sand.define("toDOM/tests/toDOM", ["toDOM/toDOM", "jsdom", "toDOM/tests/testsCases", "vows", "assert", "Array/each", "core/isArray"],   
  function(r) {
    GLOBAL.document = r.jsdom.jsdom("<html><body></body></html>");
	  var suite = r.vows.describe("djson toDOM"), assert = r.assert;
	  r2 = {};
	  r.testsCases.each(function(tC){
	    var o = tC, res = r2[tC.name] = {}, i = 0;
	    o.djson.each(function(e){
	      i++;
	      var scope = {}, cb = o.cb;
	      var res = r2[tC.name+"-"+i.toString()] = {
	         topic : function(){ return r.toDOM(e, scope); },
	         "el is ok" : function(topic){
	            var html = topic;
	            assert.equal(html.outerHTML, o.htmlString);
	         }
	      };   
	      cb && (res["cb is ok"] = function(topic){
          assert.isTrue(cb(null, {scope : scope, el : topic}));
	      });
	    });

	  });          
    suite.addBatch(r2);
	
	  return suite.run();
});

