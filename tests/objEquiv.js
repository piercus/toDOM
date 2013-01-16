sand.define("toDOM/tests/objEquiv", ["assert", "Function/curry", "util/inspect"], function(r){
   var objEquiv = function(o, k, cbFail) { 
    cbFail || (cbFail = function(i,a,b){ 
      r.assert.fail(a, b, "\n"+r.inspect(a, "        ")+'\n not equivalent to \n'+r.inspect(b, "        ")+', path : '+i);
    });
    var included = function(o, k) {
      for(var i in o) if(o.hasOwnProperty(i)) {
         if (typeof(o[i]) === "object") {
           objEquiv(o[i], k[i], function(i, j, a, b){
             console.log(i,j,o,k);
             cb(i+"."+j,o,k);
             
           }.curry(i));
         } else { // o[i] is not an object
             if (o[i] !== k[i]) return false;
         }
      } return true;
    }
    if (!(included(o, k) && included(k, o)) && cbFail) cbFail("", o, k);
    return (included(o, k) && included(k, o));
  };
  
  return objEquiv;
});
