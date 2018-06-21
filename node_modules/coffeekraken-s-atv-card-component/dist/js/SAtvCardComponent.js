Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _prependChild = require('coffeekraken-sugar/js/dom/prependChild');

var _prependChild2 = _interopRequireDefault(_prependChild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

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

var SAtvCardComponent = function (_SWebComponent) {
	_inherits(SAtvCardComponent, _SWebComponent);

	function SAtvCardComponent() {
		_classCallCheck(this, SAtvCardComponent);

		return _possibleConstructorReturn(this, (SAtvCardComponent.__proto__ || Object.getPrototypeOf(SAtvCardComponent)).apply(this, arguments));
	}

	_createClass(SAtvCardComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
  	 * @definition 		SWebComponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get(SAtvCardComponent.prototype.__proto__ || Object.getPrototypeOf(SAtvCardComponent.prototype), 'componentWillMount', this).call(this);
			this._refs = {};
		}

		/**
   * Mount component
   * @definition 		SWebComponent.componentMount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			_get(SAtvCardComponent.prototype.__proto__ || Object.getPrototypeOf(SAtvCardComponent.prototype), 'componentMount', this).call(this);

			var layers = this.querySelectorAll('[' + this._componentNameDash + '-layer]'),
			    totalLayerElems = layers.length,
			    supportsTouch = 'ontouchstart' in window || navigator.msMaxTouchPoints;

			this.classList.add(this._componentNameDash);

			this._refs.card = this.querySelector('*:first-child');

			var shineElm = this.querySelector(this._componentNameDash + '-shine');
			if (shineElm) {
				this._refs.shine = shineElm;
			} else {
				var shineHTML = this.ownerDocument.createElement('div');
				this._refs.card.appendChild(shineHTML);
				this._refs.shine = shineHTML;
			}
			this._refs.shine.classList.add(this._componentNameDash + '-shine');

			this.classList.add(this._componentNameDash + '-container');
			this._refs.card.classList.add(this._componentNameDash + '-layer');

			var w = this.clientWidth || this.offsetWidth || this.scrollWidth;
			this.style.transform = 'perspective(' + (this.props.perspective || w * 3) + 'px)';

			if (supportsTouch) {
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
				this.addEventListener('mousemove', function (e) {
					this._processMovement(e, false);
				});
				this.addEventListener('mouseenter', function (e) {
					this._processEnter(e);
				});
				this.addEventListener('mouseleave', function (e) {
					this._processExit(e);
				});
			}
		}
	}, {
		key: '_processMovement',
		value: function _processMovement(e, touchEnabled) {

			var bdst = window.pageYOffset || this.ownerDocument.documentElement.scrollTop || this.ownerDocument.body.scrollTop || 0,
			    bdsl = window.pageXOffset || this.ownerDocument.documentElement.scrollLeft || this.ownerDocument.body.scrollLeft || 0,
			    pageX = touchEnabled ? e.touches[0].pageX : e.pageX,
			    pageY = touchEnabled ? e.touches[0].pageY : e.pageY,
			    offsets = this.getBoundingClientRect(),
			    w = this.clientWidth || this.offsetWidth || this.scrollWidth,
			    // width
			h = this.clientHeight || this.offsetHeight || this.scrollHeight,
			    // height
			wMultiple = 320 / w,
			    offsetX = 0.52 - (pageX - offsets.left - bdsl) / w,
			    //cursor position X
			offsetY = 0.52 - (pageY - offsets.top - bdst) / h,
			    //cursor position Y
			dy = pageY - offsets.top - bdst - h / 2,
			    //@h/2 = center of container
			dx = pageX - offsets.left - bdsl - w / 2,
			    //@w/2 = center of container
			yRotate = (offsetX - dx) * (0.07 * wMultiple),
			    //rotation for container Y
			xRotate = (dy - offsetY) * (0.1 * wMultiple),
			    //rotation for container X
			imgCSS = 'rotateX(' + xRotate * this.props.amount + 'deg) rotateY(' + yRotate * this.props.amount + 'deg)',
			    //img transform
			arad = Math.atan2(dy, dx),
			    //angle between cursor and center of container in RAD
			angle = arad * 180 / Math.PI - 90; //convert rad in degrees

			//get angle between 0-360
			if (angle < 0) {
				angle = angle + 360;
			}

			// apply the card transform
			this._refs.card.style.transform = imgCSS;

			//gradient angle and opacity for shine
			this._refs.shine.style.background = 'linear-gradient(' + angle + 'deg, rgba(255,255,255,' + (pageY - offsets.top - bdst) / h * 0.4 + ') 0%,rgba(255,255,255,0) 80%)';
		}
	}, {
		key: '_processEnter',
		value: function _processEnter(e) {
			this._refs.card.classList.add('over');
		}
	}, {
		key: '_processExit',
		value: function _processExit(e) {
			this._refs.card.classList.remove('over');
			this._refs.card.style.transform = '';
			this._refs.shine.style.cssText = '';
		}
	}], [{
		key: 'defaultCss',


		/**
   * Css
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return '\n\t\t\t' + componentNameDash + ' {\n\t\t\t\tdisplay : inline-block;\n\t\t\t}\n\t\t\t.' + componentNameDash + ' {\n\t\t\t\ttransform-style: preserve-3d;\n\t\t\t\t-webkit-tap-highlight-color: rgba(#000,0);\n\t\t\t}\n\t\t\t.' + componentNameDash + '-container {\n\t\t\t\tposition: relative;\n\t\t\t\ttransition: all 0.2s ease-out;\n\t\t\t}\n\t\t\t.' + componentNameDash + '-layer {\n\t\t\t\tposition:relative;\n\t\t\t\ttransition: all 0.1s ease-out;\n\t\t\t\ttransform-style: preserve-3d;\n\t\t\t}\n\t\t\t.' + componentNameDash + '-shine {\n\t\t\t\tposition: absolute;\n\t\t\t\ttop: 0;\n\t\t\t\tleft: 0;\n\t\t\t\tright: 0;\n\t\t\t\tbottom: 0;\n\t\t\t\topacity:0;\n\t\t\t\tbackground: linear-gradient(135deg, rgba(255,255,255,.25) 0%,rgba(255,255,255,0) 60%);\n\t\t\t\ttransform:translate3d(0,0,1px);\n\t\t\t\ttransform-style: preserve-3d;\n\t\t\t\ttransition: opacity .2s ease-in-out;\n\t\t\t}\n\t\t\t' + componentNameDash + ':hover .' + componentNameDash + '-shine {\n\t\t\t\topacity:1;\n\t\t\t}\n\t\t';
		}
	}, {
		key: 'defaultProps',


		/**
   * Default props
   * @definition 		SWebComponent.defaultProps
   * @protected
   */
		get: function get() {
			return {

				/**
     * Amount of effect to apply
     * @prop
     * @type	{Number}
     */
				amount: 1,

				/**
     * Set the CSS perspective to use for the particular card.
     * If not specified, will be calculated to apply something nice.
     * @prop
     * @type 	{Number}
     */
				perspective: null
			};
		}

		/**
   * Physical props
   * @definition 		SWebComponent.physicalProps
   * @protected
   */

	}, {
		key: 'physicalProps',
		get: function get() {
			return [];
		}
	}]);

	return SAtvCardComponent;
}(_SWebComponent3.default);

exports.default = SAtvCardComponent;