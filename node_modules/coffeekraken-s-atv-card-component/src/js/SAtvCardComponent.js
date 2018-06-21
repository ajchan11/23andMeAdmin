import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import __prependChild from 'coffeekraken-sugar/js/dom/prependChild'

/**
 * @name 	SAtvCardComponent
 * @extends 	SWebComponent
 * Create a nice apple tv card effect with a cool dynamic reflection effect.
 * @example 	html
 * <s-atv-card>
 * 	<article class="card">
 *  	<h1 class="h3 m-b">Hello World</h1>
 *  	<p class="p p--lead m-b">Sed vitae nunc ac arcu convallis blandit. Duis vel feugiat.</p>
 *  	<p class="p">Quisque feugiat erat non leo tincidunt viverra. Proin non massa quam. Nunc porta mauris at lectus lacinia congue. Suspendisse lorem turpis, euismod sed lectus sed, bibendum venenatis nunc. Duis at.</p>
 *  </article>
 * </s-atv-card>
 *
 * @author 		Olivier Bossel <olivier.bossel@gmail.com>
 */

 /**
  * @name 	SAtvCardComponent
  * Create a nice apple tv card effect with a cool reflection effect.
  * @example 	html
  * <style>
  * 	s-atv-card {
  *  		max-width: 400px;
  *  	}
  * 	.card {
  * 		border-radius: 5px;
  * 		color: white;
  * 		text-shadow:rgba(0,0,0,.3) 1px 1px 3px;
  * 		background: linear-gradient(to left, #283048 , #859398);
  * 		background: #859398;
  * 		padding: 40px;
  * 	}
  * </style>
  * <s-atv-card>
  * 	<article class="card">
  *  	<h1 class="h3 m-b">Hello World</h1>
  *  	<p class="p p--lead m-b">Sed vitae nunc ac arcu convallis blandit. Duis vel feugiat.</p>
  *  	<p class="p">Quisque feugiat erat non leo tincidunt viverra. Proin non massa quam. Nunc porta mauris at lectus lacinia congue. Suspendisse lorem turpis, euismod sed lectus sed, bibendum venenatis nunc. Duis at.</p>
  *  </article>
  * </s-atv-card>
  *
  * @author 		Olivier Bossel <olivier.bossel@gmail.com>
  */

export default class SAtvCardComponent extends SWebComponent {

	/**
	 * Default props
	 * @definition 		SWebComponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {

			/**
			 * Amount of effect to apply
			 * @prop
			 * @type	{Number}
			 */
			amount : 1,

			/**
			 * Set the CSS perspective to use for the particular card.
			 * If not specified, will be calculated to apply something nice.
			 * @prop
			 * @type 	{Number}
			 */
			perspective : null
		};
	}

	/**
	 * Physical props
	 * @definition 		SWebComponent.physicalProps
	 * @protected
	 */
	static get physicalProps() {
		return [];
	}

	/**
	 * Css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			${componentNameDash} {
				display : inline-block;
			}
			.${componentNameDash} {
				transform-style: preserve-3d;
				-webkit-tap-highlight-color: rgba(#000,0);
			}
			.${componentNameDash}-container {
				position: relative;
				transition: all 0.2s ease-out;
			}
			.${componentNameDash}-layer {
				position:relative;
				transition: all 0.1s ease-out;
				transform-style: preserve-3d;
			}
			.${componentNameDash}-shine {
				position: absolute;
				top: 0;
				left: 0;
				right: 0;
				bottom: 0;
				opacity:0;
				background: linear-gradient(135deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 60%);
				transform:translate3d(0,0,1px);
				transform-style: preserve-3d;
				transition: opacity .2s ease-in-out;
			}
			${componentNameDash}:hover .${componentNameDash}-shine {
				opacity:1;
			}
		`;
	}

	/**
	 * Component will mount
 	 * @definition 		SWebComponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();
		this._refs = {};
	}

	/**
	 * Mount component
	 * @definition 		SWebComponent.componentMount
	 * @protected
	 */
	componentMount() {
		super.componentMount();

		let layers = this.querySelectorAll(`[${this._componentNameDash}-layer]`),
			totalLayerElems = layers.length,
			supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

		this.classList.add(this._componentNameDash);

		this._refs.card = this.querySelector('*:first-child');

		const shineElm = this.querySelector(`${this._componentNameDash}-shine`);
		if (shineElm) {
			this._refs.shine = shineElm;
		} else {
			const shineHTML = this.ownerDocument.createElement('div');
			this._refs.card.appendChild(shineHTML);
			this._refs.shine = shineHTML;
		}
		this._refs.shine.classList.add(`${this._componentNameDash}-shine`);

		this.classList.add(`${this._componentNameDash}-container`);
		this._refs.card.classList.add(`${this._componentNameDash}-layer`);

		let w = this.clientWidth || this.offsetWidth || this.scrollWidth;
		this.style.transform = 'perspective('+ (this.props.perspective || w*3) +'px)';

		if(supportsTouch){
			// window.preventScroll = false;
			// this.addEventListener('touchmove', function(e){
			// 	if (window.preventScroll){
			// 		e.preventDefault();
			// 	}
			// 	this._processMovement(e,true);
			// });
            // this.addEventListener('touchstart', function(e){
            // 	window.preventScroll = true;
			// 	this._processEnter(e);
			// });
			// this.addEventListener('touchend', function(e){
			// 	window.preventScroll = false;
			// 	this._processExit(e);
			// });
	    } else {
			this.addEventListener('mousemove', function(e){
				this._processMovement(e,false);
			});
            this.addEventListener('mouseenter', function(e){
				this._processEnter(e);
			});
			this.addEventListener('mouseleave', function(e){
				this._processExit(e);
			});
	    }
	}

	_processMovement(e, touchEnabled) {

		let bdst = window.pageYOffset || this.ownerDocument.documentElement.scrollTop || this.ownerDocument.body.scrollTop || 0,
			bdsl = window.pageXOffset || this.ownerDocument.documentElement.scrollLeft || this.ownerDocument.body.scrollLeft || 0,
			pageX = (touchEnabled)? e.touches[0].pageX : e.pageX,
			pageY = (touchEnabled)? e.touches[0].pageY : e.pageY,
			offsets = this.getBoundingClientRect(),
			w = this.clientWidth || this.offsetWidth || this.scrollWidth, // width
			h = this.clientHeight || this.offsetHeight || this.scrollHeight, // height
			wMultiple = 320/w,
			offsetX = 0.52 - (pageX - offsets.left - bdsl)/w, //cursor position X
			offsetY = 0.52 - (pageY - offsets.top - bdst)/h, //cursor position Y
			dy = (pageY - offsets.top - bdst) - h / 2, //@h/2 = center of container
			dx = (pageX - offsets.left - bdsl) - w / 2, //@w/2 = center of container
			yRotate = (offsetX - dx)*(0.07 * wMultiple), //rotation for container Y
			xRotate = (dy - offsetY)*(0.1 * wMultiple), //rotation for container X
			imgCSS = 'rotateX(' + (xRotate * this.props.amount) + 'deg) rotateY(' + (yRotate * this.props.amount) + 'deg)', //img transform
			arad = Math.atan2(dy, dx), //angle between cursor and center of container in RAD
			angle = arad * 180 / Math.PI - 90; //convert rad in degrees

		//get angle between 0-360
		if (angle < 0) {
			angle = angle + 360;
		}

		// apply the card transform
		this._refs.card.style.transform = imgCSS;

		//gradient angle and opacity for shine
		this._refs.shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst)/h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
	}

	_processEnter(e) {
		this._refs.card.classList.add('over');
	}

	_processExit(e) {
		this._refs.card.classList.remove('over');
		this._refs.card.style.transform = '';
		this._refs.shine.style.cssText = '';
	}
}
