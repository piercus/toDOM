## toDOM  - fast and lightweight DOM generation
-----------------------------------------------


### You :
* Do not like `<html>`
* Love javascript
* Want performance
* Are tired of document.createElement 

Here is toDOM :
``` javascript

var toDOM = sand.require("toDOM/toDOM");

var scope = {};

var el = toDOM({
	attr : { className : 'my_class' },
	events : {
		click : function() {
			console.log('div clicked');
	  },
  },
  children : [{
  		tag : 'p',
  		label : 'myParagraph',
  		innerHTML : 'Hello',
	    style : {
	    	backgroundColor : '#000'
	    }  
  }]
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
## Installation

### With NPM

    $ npm install toDOM

in your script add

```javascript 
    require("toDOM");
```

### Client-side

```html 
    <script src="path/to/toDOM.merged.js">
```
or

```html
    <script src="path/to/toDOM.min.js">
```

## Basic Usage
	 You can use sandjs synthax to write both client and server-side code.
	 see [sandjs](http://github.com/fjs/sandjs) for more informations on sand.js.

```javascript 
	 var S = sand.require("Seed/Seed", function(r){
		 var S = r.Seed;
		 /* code */
	 });
```
	 see [How to require a sandjs module](http://github.com/piercus/sandjs/blob/How-to-require-a-sandjs-module.md) for more ways to require toDOM

### Also :

* Default tag is 'div' 
* toDOM is defined with [sandjs](https://github.com/piercus/sandjs) module manager, so you can use it with requirejs if you want to

### Contribute
## Tests

run tests

    $ npm test

test uses sandcli and run on server-side with vowsjs
[sandcli](http://github.com/piercus/sandcli) provides a test command

## Documentation

By now documentation is inside the code and uses JSDoc synthax.

## TO DO

*   Make tests on both client-side and server-side
*   Make a demo
*   Debug toDjson
*   Compile documentation form JSDoc
*   Make performances tests
   
## Contribute

Add an issue if you find bugs or please

*   Fork me
*   Add your tests
*   Make your contribution
*   Pass all the tests 
*   Add a pull request

### Authors 
*   [Sam Ton That](https://github.com/KspR)
*   [Pierre Cole](https://github.com/piercus)
*   [Cyril Agosta](https://github.com/cagosta)
*   Ilamvazudhi Vijayarangam
