# SInteractiveDemoComponent

Extends **SWebComponent**

Provide a nice webcomponent to display interactive html/css/js demo (codepen like).

### Example
```html
	<s-interactive-demo>
	<s-codemirror language="html">
 	<h1>My Cool demo</h1>
 </s-codemirror>
	<s-codemirror language="css">
 	h1 {
 		color : red
 	}
 </s-codemirror>
</s-interactive-demo>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### scripts

Script to load inside the demo

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **null**


### styles

Styles to load inside the demo

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) , [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **null**


### resizePreview

Automatically resize the preview

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**

Default : **true**


### layout

Specify the layout wanted between vertical and horizontal

Type : **{ [String](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/String) }**

Values : **top,right,bottom,left,vertical,horizontal**

Default : **horizontal**


### hide

Array of editors ids to hide by default

Type : **{ [Array](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Array) }**

Default : **[]**


### displayToggles

Display toggles

Type : **{ [Boolean](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Boolean) }**