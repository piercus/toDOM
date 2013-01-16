sand.define("toDOM/tests/testsCases", function(r) {
  
  return [{
      djson : [{
          "tag" : "div"
        },
        "div"
      ],
      htmlString : "<div></div>",
      name : "basic",
      reverse : true  
    },{
      djson : [{
          tag : "a", 
          children : [{ 
              tag : "textNode", 
              innerHTML : "go go " 
            },{ 
              tag : "strong", 
              innerHTML : "go" 
            },{ 
              tag : "textNode", 
              innerHTML : "!"
          }]
      }],
      htmlString : "<a>go go <strong>go</strong>!</a>",
      name : "textNode tag",
      reverse : true  
    },{
      djson : [{ children : [{ tag : "a.foo.bar" }] },{ children : [{ tag : "a", attr : { className : "foo bar"} }] },{ children : ["a.foo.bar"] }],
      htmlString : '<div><a class="foo bar"></a></div>',
      name : "hybrid notation"      
    },{      
      djson : [{
          "tag" : "foo"
        },
        "foo"
      ],
      name : "js reference",
      htmlString : "<foo></foo>"//
    },{
      djson : [{ tag : "div", attr : { foo : 'bar' }}],
      htmlString : '<div foo="bar"></div>',
      name : "foo bar attr key/value",
      reverse : true
    },{
      djson : [{ as : 'foo' }, "div->foo"],
      htmlString : '<div></div>',
      cb : function(err, o){
        return o.scope.foo === o.el;
      },
      name : "as property"
    },{
      djson : [{ innerHTML : 'my lord <d>Stark </d>' }, "div my lord <d>Stark </d>"],
      htmlString : '<div>my lord <d>Stark </d></div>',
      name : "innerHTML"
    },{
      djson : [{ events : { click : function(){ return "yeye" }} }],
      htmlString : '<div></div>',
      cb : function(err, o){
        return "yeye" === o.el.onclick();
      },
      name : "events"     
    },{
      djson : [{ style : { backgroundColor : "red" } }],
      htmlString : '<div style="background-color: red;"></div>',
      cb : function(err, o){  
        return o.el.style.backgroundColor === "red";
      },
      name : "style"
    },{
      djson : [{ children : [{ children : [{}] }] }, "div[div[div]]"],
      htmlString : '<div><div><div></div></div></div>',
      name : "children"  
    },{
      djson : [{ children : [{ children : [{}] }] }, "[[]]"],
      htmlString : '<div><div><div></div></div></div>',
      name : "hybrid"
    },{
      djson : [{ 
           tag : "div", 
           innerHTML : "blabla", 
           style : { 
             backgroundColor : "pink" 
           }, 
           events : { click : function() { return false; } }, 
           attrs : { "class" : "a-class" },
           children : [{ 
               tag : "p", 
               as : "foo", 
             },
             null 
           ]
       }],
       htmlString : '<div class="a-class" style="background-color: pink;">blabla<p></p></div>',
       cb : function(err, o){
         return (false == o.el.onclick()) && (o.scope.foo === o.el.childNodes[1]) ;
       },
       name : "realistic"
     },{
       djson : [{ children : [{ tag : "a", children : [] },{ tag : "div", children : [] },{ tag : "yo", children : [] }]}, "div[a, div, yo]"],
       htmlString : '<div><a></a><div></div><yo></yo></div>',
       name : "multiple children"
     },{
       djson : ['a.a-class.an-other-class'],
       htmlString : '<a class="a-class an-other-class"></a>',
       name : "short class"
     },{
       djson : ['table.a-class[tr.other-class,tr.yo->column2]#main-table->table1'],
       htmlString : '<table class="a-class" id="main-table"><tr class="other-class"></tr><tr class="yo"></tr></table>',
       name : "short complex alias",
       cb : function(err, o){
         var el2 = o.el.childNodes[1];
         return (o.scope.table1 === o.el && o.scope.column2 === el2) ;
       }
     },{
        djson : ['table.a-class[tr.other-class,tr[td[img], td].yo->column2]#main-table->table1'],
        htmlString : '<table class="a-class" id="main-table"><tr class="other-class"></tr><tr class="yo"><td><img/></td><td></td></tr></table>',
        name : "short 2-level complex alias"
     },{
       djson : ["a#an-id"],
       htmlString : '<a id="an-id"></a>',
       name : "short id"
     },{
       djson : ['div yo yo yo '],
       htmlString : '<div>yo yo yo </div>',
       name : "short innerHTML"
     },{
       djson : ['bar   '],
       htmlString : '<bar>  </bar>',
       name : "short tag" 
  }];
});
