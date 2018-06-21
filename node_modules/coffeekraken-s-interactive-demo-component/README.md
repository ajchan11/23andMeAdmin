# Coffeekraken s-interactive-demo-component <img src=".resources/coffeekraken-logo.jpg" height="25px" />

<p>
	<a href="https://travis-ci.org/Coffeekraken/s-interactive-demo-component">
		<img src="https://img.shields.io/travis/Coffeekraken/s-interactive-demo-component.svg?style=flat-square" />
	</a>
	<a href="https://www.npmjs.com/package/coffeekraken-s-interactive-demo-component">
		<img src="https://img.shields.io/npm/v/coffeekraken-s-interactive-demo-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-interactive-demo-component/blob/master/LICENSE.txt">
		<img src="https://img.shields.io/npm/l/coffeekraken-s-interactive-demo-component.svg?style=flat-square" />
	</a>
	<!-- <a href="https://github.com/coffeekraken/s-interactive-demo-component">
		<img src="https://img.shields.io/npm/dt/coffeekraken-s-interactive-demo-component.svg?style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-interactive-demo-component">
		<img src="https://img.shields.io/github/forks/coffeekraken/s-interactive-demo-component.svg?style=social&label=Fork&style=flat-square" />
	</a>
	<a href="https://github.com/coffeekraken/s-interactive-demo-component">
		<img src="https://img.shields.io/github/stars/coffeekraken/s-interactive-demo-component.svg?style=social&label=Star&style=flat-square" />
	</a> -->
	<a href="https://twitter.com/coffeekrakenio">
		<img src="https://img.shields.io/twitter/url/http/coffeekrakenio.svg?style=social&style=flat-square" />
	</a>
	<a href="http://coffeekraken.io">
		<img src="https://img.shields.io/twitter/url/http/shields.io.svg?style=flat-square&label=coffeekraken.io&colorB=f2bc2b&style=flat-square" />
	</a>
</p>

Provide a simple, powerful and nice way to display interactive html/css/js demo

## Features

- Use the [s-codemirror-component](https://github.com/coffeekraken/s-codemirror-component) as editor
- Display a nice preview of the editors results
- Support advanced compilation (sass/less/coffeescript/etc...) through [coffeekraken-compile-server](https://github.com/coffeekraken/compile-server)
- Support multiple display layout (top, right, bottom, left, horizontal or vertical)
- And more...

## Table of content

1. **[Demo](http://components.coffeekraken.io)** : The entire page use this component internally through the [coffeekraken-code-playground](https://github.com/coffeekraken/code-playground) package
2. [Install](#readme-install)
3. [Get Started](#readme-get-started)
4. [Javascript API](doc/js)
5. [Sugar Web Components Documentation](https://github.com/Coffeekraken/sugar/blob/master/doc/js/webcomponents.md)
6. [Browsers support](#readme-browsers-support)
7. [Contribute](#readme-contribute)
8. [Who are Coffeekraken?](#readme-who-are-coffeekraken)
9. [Licence](#readme-license)

<a name="readme-install"></a>
## Install

```
npm install coffeekraken-s-interactive-demo-component --save
```

<a name="readme-get-started"></a>
## Get Started

First, import the component into your javascript file like so:

```js
import SInteractiveDemoComponent from 'coffeekraken-s-interactive-demo-component'
import SCodemirrorComponent from 'coffeekraken-s-codemirror-component'
```

Then simply use it inside your html like so:

```html
<s-interactive-demo layout="right">
	<s-codemirror language="html">
		<h1 class="h1">
			Hello world
		</h1>
	</s-codemirror>
	<s-codemirror language="css">
		.h1 {
			color : red;
		}
	</s-codemirror>
</s-interactive-demo>
```

<a id="readme-browsers-support"></a>
## Browsers support

| <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/edge.png" alt="IE / Edge" width="16px" height="16px" /></br>IE / Edge | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/firefox.png" alt="Firefox" width="16px" height="16px" /></br>Firefox | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/chrome.png" alt="Chrome" width="16px" height="16px" /></br>Chrome | <img src="https://raw.githubusercontent.com/godban/browsers-support-badges/master/src/images/safari.png" alt="Safari" width="16px" height="16px" /></br>Safari |
| --------- | --------- | --------- | --------- |
| IE11+ | last 2 versions| last 2 versions| last 2 versions

> As browsers are automatically updated, we will keep as reference the last two versions of each but this component can work on older ones as well.

> The webcomponent API (custom elements, shadowDOM, etc...) is not supported in some older browsers like IE10, etc... In order to make them work, you will need to integrate the [corresponding polyfill](https://www.webcomponents.org/polyfills).

<a id="readme-contribute"></a>
## Contribute

This is an open source project and will ever be! You are more that welcomed to contribute to his development and make it more awesome every day.
To do so, you have several possibilities:

1. [Share the love ❤️](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-share-the-love)
2. [Declare issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-declare-issues)
3. [Fix issues](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-fix-issues)
4. [Add features](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-add-features)
5. [Build web component](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md#contribute-build-web-component)

<a id="readme-who-are-coffeekraken"></a>
## Who are Coffeekraken

We try to be **some cool guys** that build **some cool tools** to make our (and yours hopefully) **every day life better**.  

#### [More on who we are](https://github.com/Coffeekraken/coffeekraken/blob/master/who-are-we.md)

<a id="readme-license"></a>
## License

The code is available under the [MIT license](LICENSE.txt). This mean that you can use, modify, or do whatever you want with it. This mean also that it is shipped to you for free, so don't be a hater and if you find some issues, etc... feel free to [contribute](https://github.com/Coffeekraken/coffeekraken/blob/master/contribute.md) instead of sharing your frustrations on social networks like an asshole...
