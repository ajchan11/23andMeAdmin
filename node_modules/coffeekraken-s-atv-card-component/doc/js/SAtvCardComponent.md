# SAtvCardComponent

Extends **SWebComponent**

Create a nice apple tv card effect with a cool dynamic reflection effect.

### Example
```html
	<s-atv-card>
	<article class="card">
 	<h1 class="h3 m-b">Hello World</h1>
 	<p class="p p--lead m-b">Sed vitae nunc ac arcu convallis blandit. Duis vel feugiat.</p>
 	<p class="p">Quisque feugiat erat non leo tincidunt viverra. Proin non massa quam. Nunc porta mauris at lectus lacinia congue. Suspendisse lorem turpis, euismod sed lectus sed, bibendum venenatis nunc. Duis at.</p>
 </article>
</s-atv-card>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>




## Attributes

Here's the list of available attribute to set on the element.

### amount

Amount of effect to apply

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**

Default : **1**


### perspective

Set the CSS perspective to use for the particular card.
If not specified, will be calculated to apply something nice.

Type : **{ [Number](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/Number) }**




## Methods


### SAtvCardComponent

Create a nice apple tv card effect with a cool reflection effect.

#### Example
```html
	<style>
	s-atv-card {
 		max-width: 400px;
 	}
	.card {
		border-radius: 5px;
		color: white;
		text-shadow:rgba(0,0,0,.3) 1px 1px 3px;
		background: linear-gradient(to left, #283048 , #859398);
		background: #859398;
		padding: 40px;
	}
</style>
<s-atv-card>
	<article class="card">
 	<h1 class="h3 m-b">Hello World</h1>
 	<p class="p p--lead m-b">Sed vitae nunc ac arcu convallis blandit. Duis vel feugiat.</p>
 	<p class="p">Quisque feugiat erat non leo tincidunt viverra. Proin non massa quam. Nunc porta mauris at lectus lacinia congue. Suspendisse lorem turpis, euismod sed lectus sed, bibendum venenatis nunc. Duis at.</p>
 </article>
</s-atv-card>
```
Author : Olivier Bossel <olivier.bossel@gmail.com>