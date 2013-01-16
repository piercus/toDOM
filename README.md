## toDOM  - fast and lightweight DOM generation
-----------------------------------------------


### You :
* Do not like `<html>`
* Love javascript
* Want performance
* Are tired of document.createElement 

Here is toDOM :
``` javascript

var scope = {};

var el = toDOM({
	attr : { className : 'my_class' },
	events : {
		click : function() {
			console.log('div clicked');
	  },
  },
  children : [
  	{
  		tag : 'p',
  		label : 'myParagraph',
  		innerHTML : 'Hello',
	    style : {
	    	backgroundColor : '#000'
	    }
    }
  ]
}, scope);

document.body.appendChild(el);

```

Will create the following : 

``` html 
<body>
	<div class="my_class">
		<p style="background-color:#000">
			Hello
		</p>
	</div>
</body>
```

With a console.log on click and a reference of the `<p>` DOM element in scope : 

```javascript
	scope.myParagraph //  domElement
	scope.myParagraph.innerHTML // 'Hello'
```


### Usage in object oriented javascript : 

```javascript

var View = function(o) {
	if (o.domDescription) {
	  this.buildEl(o.domDescription);
	}
};

View.prototype = {
	buildEl : function(domDescription) {
		this.el = toDOM(domDescription, this);
  }
}

var myView = new View({
	domDescription : {
		tag : 'p',
		children : [
			{
				label : 'helloEl',
				innerHTML : 'hello!'
			}
		]
	}
});

myView.el // DOM element
myView.helloEl // DOM element
myView.helloEl.innerHTML // 'hello!'

```


### Also :

* Default tag is 'div' 
* Is defined in a AMD module if a loader is present, just `require('toDOM')`


### Authors 
*[Sam Ton That](https://github.com/KspR)
*[Pierre Cole](https://github.com/piercus)
*[Cyril Agosta](https://github.com/cagosta)
