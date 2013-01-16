sand.define("toDOM/toDjson", ["toDOM/domParser"], function(r){
  String.prototype.trim  || (String.prototype.trim = function(){return this.replace(/^\s+|\s+$/g, '');});
  var parseStyle = function(styleStr){
    var pairs = styleStr.split(';'), res = {};
      
    for (var j = 0 ; j < pairs.length; j++) {
      var splt = pairs[j].split(':'), key = splt[0], value = splt[1];
         
      // transform x-color to xColor and trim
      key = key.replace(/-./, function(a){
        return a.charAt(0)+a.charAt(1).toUpperCase();  
      }).trim();
      
      res[key.trim()] = value.trim();
    }
    return res 
  };
  
  var getDjson = function(hE){
    // textNode handling 
    if(typeof(hE.data) === "string"){
      return {
        tag : "textNode",
        innerHTML : hE.data
      };
    }
           
    var res = {}, i;

    // tag
    res["tag"] = hE.tagName; 

    /*
    *  Manage attributes : attr and style
    */ 
       
    if(hE.attributes) for(i = 0 ; i < hE.attributes.length ; i++) {
      
      if (hE.attributes[i].name === 'style') {
      
        res["style"] = parseStyle(hE.attributes[i].value);
      
      } else if (hE.attributes[i].name.substr(0, 2) === 'on') {
      
        res["events"] || (res["events"] = {});
        res["events"][hE.attributes[0].name.substr(2)] = eval("(function(){" + hE.attributes[i].value + "})");   
      
      } else {
      
        res["attr"] || (res["attr"] = {});
        res.attr[hE.attributes[i].name] = hE.attributes[i].value;
      
      }
    }       
    
    /*
    * Manage Children of hE
    */  
      
    // Exception for just 1 text child put it in innerHTML
    if ((hE.childNodes.length === 1) && (typeof(hE.childNodes[0].data) === 'string')) { 
      
      res["innerHTML"] = hE.childNodes[0].data;   
      
    } else if(hE.childNodes.length > 0){
      
      res["children"] = [];
      for (i = 0; i < hE.childNodes.length; i++) {
        res.children.push(getDjson(hE.childNodes[i]));
      }
      
    }

    return res;  
  }; 
 
 
    
 /**          
  *  toDjson is a function that Build a djson object from an element or an html string.
  *  toDjson is the reverse function of toDom
  *  NB : BE CAREFUL, toDjson use 'eval' to eval on... functions,
  *  @param {string|HTMLElement} html it's an html String or a DOM element
  *  @example
  *  var htmlString = '<div class="a-class" style="background-color: pink;" onclick="function(){ return false; }">blabla<p></p></div>';
  *
  *  var el = toDjson(htmlString); //=> { 
  *    tag : "div", 
  *    innerHTML : "blabla", 
  *    style : { 
  *      backgroundColor : "pink" 
  *    }, 
  *    events : { click : function() { return false; } }, 
  *    attr : { "class" : "a-class" },
  *    children : [{ 
  *        tag : "p" 
  *    }]
  *  };            
  *
  *  @returns {djson} djson the djson Object 
  */  
     
  return function(html){    
    return getDjson((typeof(html) === "string") ? r.domParser(html).childNodes[0] : html);
  };
});   
