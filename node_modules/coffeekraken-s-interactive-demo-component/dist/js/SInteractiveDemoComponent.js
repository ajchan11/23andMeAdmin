Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _SWebComponent2 = require('coffeekraken-sugar/js/core/SWebComponent');

var _SWebComponent3 = _interopRequireDefault(_SWebComponent2);

var _throttle = require('coffeekraken-sugar/js/utils/functions/throttle');

var _throttle2 = _interopRequireDefault(_throttle);

var _prependChild = require('coffeekraken-sugar/js/dom/prependChild');

var _prependChild2 = _interopRequireDefault(_prependChild);

var _find2 = require('lodash/find');

var _find3 = _interopRequireDefault(_find2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @name 		SInteractiveDemoComponent
 * @extends 	SWebComponent
 * Provide a nice webcomponent to display interactive html/css/js demo (codepen like).
 * @example 	html
 * <s-interactive-demo>
 * 	<s-codemirror language="html">
 *  	<h1>My Cool demo</h1>
 *  </s-codemirror>
 * 	<s-codemirror language="css">
 *  	h1 {
 *  		color : red
 *  	}
 *  </s-codemirror>
 * </s-interactive-demo>
 * @author 	Olivier Bossel <olivier.bossel@gmail.com>
 */

var SInteractiveDemoComponent = function (_SWebComponent) {
	_inherits(SInteractiveDemoComponent, _SWebComponent);

	function SInteractiveDemoComponent() {
		_classCallCheck(this, SInteractiveDemoComponent);

		return _possibleConstructorReturn(this, (SInteractiveDemoComponent.__proto__ || Object.getPrototypeOf(SInteractiveDemoComponent)).apply(this, arguments));
	}

	_createClass(SInteractiveDemoComponent, [{
		key: 'componentWillMount',


		/**
   * Component will mount
   * @definition 		SWebcomponent.componentWillMount
   * @protected
   */
		value: function componentWillMount() {
			_get(SInteractiveDemoComponent.prototype.__proto__ || Object.getPrototypeOf(SInteractiveDemoComponent.prototype), 'componentWillMount', this).call(this);
			this._updateTimeout = null;
			this._compilationsCount = 0;
			this._refs = {};
			this._iframeRefs = {};
			this._editors = {};
		}

		/**
   * Component mount
   * @protected
   */

	}, {
		key: 'componentMount',
		value: function componentMount() {
			var _this2 = this;

			_get(SInteractiveDemoComponent.prototype.__proto__ || Object.getPrototypeOf(SInteractiveDemoComponent.prototype), 'componentMount', this).call(this);

			// get the content
			var content = this.innerHTML;

			// find the editors
			this._refs.editors = [].filter.call(this.children, function (child) {
				return child.id && child.nodeName !== 'IFRAME';
			});

			this._refs.previewContainer = this.querySelector('[' + this._componentNameDash + '-preview]') || document.createElement('div');
			this._refs.previewContainer.className = this._componentNameDash + '__preview-container';

			// inject the html needed
			this._refs.preview = document.createElement('div');
			this._refs.preview.className = this._componentNameDash + '__preview';

			// loading
			this._refs.previewLoader = document.createElement('div');
			this._refs.previewLoader.className = this._componentNameDash + '__preview-loader';

			// header
			this._refs.header = document.createElement('div');
			this._refs.header.className = this._componentNameDash + '__header';

			// iframe
			this._refs.iframe = document.createElement('iframe');
			this._refs.iframe.width = '100%';
			this._refs.iframe.setAttribute('frameborder', 'no');

			// append elements
			this._refs.preview.appendChild(this._refs.iframe);
			this._refs.preview.appendChild(this._refs.previewLoader);
			if (this.props.displayToggles) {
				this._refs.previewContainer.appendChild(this._refs.header);
			}
			this._refs.previewContainer.appendChild(this._refs.preview);
			if (!this._refs.previewContainer.parentNode) {
				this.appendChild(this._refs.previewContainer);
			}

			// listen for compilations
			this.addEventListener('compileStart', this._onCompileStart.bind(this));
			this.addEventListener('compileEnd', this._onCompileEnd.bind(this));
			this.addEventListener('compileError', this._onCompileEnd.bind(this));

			// listen for window resize
			window.addEventListener('resize', (0, _throttle2.default)(this._onWindowResize.bind(this), 200));

			// listen for update from parts
			var updateTimeout = null;
			this.addEventListener('update', function (e) {

				// store the codes
				_this2._editors[e.target.id] = {
					id: e.target.id,
					elm: e.target,
					code: e.detail.data,
					language: e.detail.language
				};

				// create the editor toggle
				_this2._createEditorToggle(_this2._editors[e.target.id]);

				clearTimeout(updateTimeout);
				updateTimeout = setTimeout(function () {
					// update only if no more compilation is going one
					if (_this2._compilationsCount <= 0) {
						// update the preview from the editor update
						_this2._refreshPreview();
					}
				});
			});

			// update editors display
			if (this.props.hide.length) {
				this.props.hide.forEach(function (editorId) {
					var edt = _this2.querySelector('#' + editorId);
					if (edt) edt.style.display = 'none';
				});
			}
		}

		/**
   * Create editor toggles
   */

	}, {
		key: '_createEditorToggle',
		value: function _createEditorToggle(editorObj) {
			if (this.props.displayToggles) {
				if (!this._refs.header.querySelector('[toggle-id="' + editorObj.id + '"]')) {
					// create toggle for this editorElm
					var toggleElm = document.createElement('div');
					toggleElm.className = this._componentNameDash + '__display-toggle';
					toggleElm.setAttribute('toggle-id', editorObj.id);
					toggleElm._toggleId = editorObj.id;
					toggleElm.innerHTML = editorObj.id;
					// check if need to be displayed or not
					if (this.props.hide.indexOf(editorObj.id) === -1) {
						toggleElm.classList.add('active');
					} else {
						// hide the editor
						editorObj.elm.style.display = 'none';
					}
					// append to header
					this._refs.header.appendChild(toggleElm);
					// listen for click
					toggleElm.addEventListener('click', this._onDisplayToggleClick.bind(this));
				}
			}
		}

		/**
   * Inject editor data
   */

	}, {
		key: '_refreshPreview',
		value: function _refreshPreview() {
			var _this3 = this;

			// replace the old iframe with a brand new one
			// this allow to have a fresh new context to work in
			// and avoid some issues
			var newIframe = document.createElement('iframe');
			var isFirstIframe = true;
			newIframe.width = '100%';
			if (this._refs.iframe && this._refs.iframe.hasAttribute('height')) {
				newIframe.height = this._refs.iframe.getAttribute('height');
				isFirstIframe = false;
			}
			newIframe.setAttribute('frameborder', 'no');
			this._refs.iframe.parentNode.insertBefore(newIframe, this._refs.iframe);
			this._refs.iframe.parentNode.removeChild(this._refs.iframe);
			this._refs.iframe = newIframe;

			// get the document of the iframe reference
			this._iframeRefs.document = this._refs.iframe.contentDocument || this._refs.iframe.contentWindow.document;

			// firefox bugfix
			this._iframeRefs.document.open();
			this._iframeRefs.document.write('<div id="wrapper"></div>');
			this._iframeRefs.document.domain = document.domain;
			this._iframeRefs.document.close();

			// wrapper
			this._iframeRefs.wrapper = this._iframeRefs.document.getElementById('wrapper');

			// get the iframe body reference
			this._iframeRefs.body = this._iframeRefs.document.body;
			this._iframeRefs.html = this._iframeRefs.document.querySelector('html');

			// append wrapper
			this._iframeRefs.body.appendChild(this._iframeRefs.wrapper);

			// set classes
			this._iframeRefs.body.classList.add('' + this._componentNameDash);
			this._iframeRefs.html.classList.add('' + this._componentNameDash);

			// inject resources
			this._injectResourcesInsidePreview();

			// loop on each editors
			Object.keys(this._editors).forEach(function (editorId) {
				var editorObj = _this3._editors[editorId];

				// check if has already the editor wrapper into the iframe
				if (!_this3._iframeRefs.wrapper.querySelector('#' + editorId)) {
					var innerIframePartElm = _this3._iframeRefs.document.createElement('div');
					innerIframePartElm.id = editorObj.id;
					_this3._iframeRefs.wrapper.appendChild(innerIframePartElm);
				}

				// update the content
				var codeElm = void 0;
				var updateHtml = false;
				// handle how to inject code
				switch (editorObj.language) {
					case 'css':
						codeElm = _this3._iframeRefs.document.createElement('style');
						break;
					case 'js':
					case 'javascript':
						codeElm = _this3._iframeRefs.document.createElement('script');
						break;
					default:
						codeElm = _this3._iframeRefs.document.createElement('div');
						codeElm.setAttribute('html', true);
						break;
				}
				// inject the code
				codeElm.innerHTML = editorObj.code;
				// append the new code into container
				_this3._iframeRefs.body.querySelector('#' + editorId).appendChild(codeElm);
			});

			// update preview size
			if (this.props.resizePreview) {
				if (isFirstIframe) {
					this._updatePreviewHeight();
				}
				setTimeout(function () {
					_this3._updatePreviewHeight();
				}, 500);
			}
		}

		/**
   * On toggle display clicked
   * @param 		{MouseEvent} 		e 		The mouse event
  	 */

	}, {
		key: '_onDisplayToggleClick',
		value: function _onDisplayToggleClick(e) {
			// check if is active or not
			var isActive = e.target.classList.contains('active');
			// get the editor
			var editorObj = (0, _find3.default)(this._editors, function (editor) {
				return editor.id === e.target._toggleId;
			});
			if (isActive) {
				editorObj.active = false;
				e.target.classList.remove('active');
				editorObj.elm.style.display = 'none';
			} else {
				editorObj.active = true;
				e.target.classList.add('active');
				editorObj.elm.style.display = 'block';
				editorObj.elm.refresh && editorObj.elm.refresh();
			}
		}

		/**
   * On compilation start
   * @param 		{Event} 	e 		The compilation start event
   */

	}, {
		key: '_onCompileStart',
		value: function _onCompileStart(e) {
			// count the compilations in progress
			this._compilationsCount++;
			// add the compilation class
			this.addComponentClass(this, null, 'compiling');
		}

		/**
   * On compilation end
   * @param 		{Event} 	e 		The compilation end event
   */

	}, {
		key: '_onCompileEnd',
		value: function _onCompileEnd(e) {
			// update the compilations in progress
			this._compilationsCount--;
			// check if end of compilations
			if (this._compilationsCount <= 0) {
				// add the compilation class
				this.removeComponentClass(this, null, 'compiling');
			}
		}

		/**
   * On window resize
   */

	}, {
		key: '_onWindowResize',
		value: function _onWindowResize() {
			// update code and preview size
			if (this.props.resizePreview) this._updatePreviewHeight();
		}

		/**
   * Inject scripts and styles inside preview
   */

	}, {
		key: '_injectResourcesInsidePreview',
		value: function _injectResourcesInsidePreview() {
			var _this4 = this;

			var stl = this._iframeRefs.document.createElement('style');
			stl.innerHTML = '\n\t\t\tbody {\n\t\t\t\tmargin:0;\n\t\t\t\tpadding:0;\n\t\t\t}\n\t\t\t#wrapper {\n\t\t\t\tpadding: 20px;\n\t\t\t}\n\t\t';
			this._iframeRefs.body.appendChild(stl);

			if (this.props.scripts) {
				// make sure it's an array
				var scripts = [].concat(this.props.scripts);
				scripts.forEach(function (script) {
					var scriptTag = _this4._iframeRefs.document.createElement('script');
					scriptTag.src = script;
					_this4._iframeRefs.body.appendChild(scriptTag);
				});
			}
			if (this.props.styles) {
				// make sure it's an array
				var styles = [].concat(this.props.styles);
				styles.forEach(function (style) {
					var styleTag = _this4._iframeRefs.document.createElement('link');
					styleTag.href = style;
					styleTag.rel = 'stylesheet';
					_this4._iframeRefs.body.appendChild(styleTag);
				});
			}
		}

		/**
   * Update iframe height
   */

	}, {
		key: '_updatePreviewHeight',
		value: function _updatePreviewHeight() {
			var _this5 = this;

			setTimeout(function () {
				_this5._refs.iframe.removeAttribute('height');
				_this5._refs.iframe.height = _this5._iframeRefs.wrapper.scrollHeight + 15 + 'px';
			}, 50);
		}
	}], [{
		key: 'defaultCss',


		/**
   * Base css
   * @definition 		SWebComponent.css
   * @protected
   */
		value: function defaultCss(componentName, componentNameDash) {
			return '\n\t\t\t@keyframes ' + componentNameDash + '-preview-loader {\n\t\t\t\tfrom {\n\t\t\t\t\ttransform:rotate(0deg);\n\t\t\t\t}\n\t\t\t\tto {\n\t\t\t\t\ttransform:rotate(360deg);\n\t\t\t\t}\n\t\t\t}\n\t\t\t' + componentNameDash + ' {\n\t\t\t\tdisplay: flex;\n\t\t\t\twidth:100%;\n\t\t\t\tflex-flow: row wrap;\n\t\t\t\tposition:relative;\n\t\t\t\tcolor:#777;\n\t\t\t}\n\t\t\t// ' + componentNameDash + ':not([layout="vertical"]) > * + *:after {\n\t\t\t// \tborder-left:none;\n\t\t\t// }\n\t\t\t.' + componentNameDash + '__preview-container {\n\t\t\t\tdisplay: flex;\n\t\t\t\tflex-flow: column nowrap;\n\t\t\t\tbackground: white;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__header {\n\t\t\t\tuser-selection:none;\n\t\t\t\tflex:0 0 auto !important;\n\t\t\t\twidth:100%; height:32px;\n\t\t\t\tposition:relative;\n\t\t\t\tbackground:rgba(0,0,0,.05);\n\t\t\t}\n\t\t\t.' + componentNameDash + '__preview {\n\t\t\t\tbox-sizing : border-box;\n\t\t\t\tflex:1 0 auto;\n\t\t\t\tposition:relative;\n\t\t\t\tflex-flow: column nowrap;\n\t\t\t\tdisplay: flex;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__preview iframe {\n\t\t\t\tflex: 1 1 auto;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__display-toggle {\n\t\t\t\tpadding:10px 15px 10px 30px;\n\t\t\t\tbackground-image:url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'><path fill=\'#777\' d=\'M24 10.935v2.13l-8 3.948v-2.23L21.64 12 16 9.21V6.987l8 3.948zM8 14.783L2.36 12 8 9.21V6.987l-8 3.948v2.13l8 3.948v-2.23zM15.047 4H12.97L8.957 20h2.073l4.017-16z\'/></svg>");\n\t\t\t\tbackground-size:12px 12px;\n\t\t\t\tbackground-position:10px 10px;\n\t\t\t\tbackground-repeat:no-repeat;\n\t\t\t\tdisplay:inline-block;\n\t\t\t\tfont-size:12px;\n\t\t\t\tcursor:pointer;\n\t\t\t\topacity:.45;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__display-toggle.active {\n\t\t\t\topacity:1;\n\t\t\t}\n\n\t\t\t' + componentNameDash + '[layout="vertical"] {\n\t\t\t\tflex-flow: column wrap;\n\t\t\t}\n\t\t\t' + componentNameDash + '[layout="vertical"] .' + componentNameDash + '__preview-container {\n\t\t\t\torder:-1;\n\t\t\t}\n\t\t\t' + componentNameDash + '[layout="vertical"] .' + componentNameDash + '__preview {\n\t\t\t\torder: -1;\n\t\t\t}\n\t\t\t' + componentNameDash + '[layout="top"] .' + componentNameDash + '__preview-container {\n\t\t\t\tflex:1 1 100%;\n\t\t\t\torder:-1;\n\t\t\t}\n\t\t\t' + componentNameDash + '[layout="top"] .' + componentNameDash + '__preview {\n\t\t\t\torder: -1;\n\t\t\t}\n\t\t\t' + componentNameDash + '[layout="bottom"] .' + componentNameDash + '__preview-container {\n\t\t\t\tflex:1 1 100%;\n\t\t\t\torder: 2;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__preview-loader {\n\t\t\t\tposition:absolute;\n\t\t\t\ttop:0; left:0;\n\t\t\t\twidth:100%; height:100%;\n\t\t\t\tbackground-color:rgba(38,50,56,.5);\n\t\t\t\topacity: 0;\n\t\t\t\ttransition:opacity .1s ease-in-out;\n\t\t\t\tpointer-events:none;\n\t\t\t}\n\t\t\t.' + componentNameDash + '__preview-loader:after {\n\t\t\t\tcontent:"";\n\t\t\t\tdisplay:block;\n\t\t\t\tposition:absolute;\n\t\t\t\twidth:20px; height:20px;\n\t\t\t\ttop:50%; left:50%;\n\t\t\t\tmargin-top:-10px;\n\t\t\t\tmargin-left:-10px;\n\t\t\t\ttransform-origin:10px 10px;\n\t\t\t\tbackground-image:url("data:image/svg+xml;charset=UTF-8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\'><path fill=\'white\' d=\'M13 0c3.7.3 7 2.3 9 5l-2 1c-1.5-2-4-3.7-7-4V0zM2 12c0-1.5.3-3 1-4L1 7c-.6 1.3-1 3-1 5 0 1.8.4 3.6 1.2 5L3 16c-.7-1-1-2.5-1-4zm20 0c0 1.5-.3 3-1 4l1.8 1c.8-1.4 1.2-3.2 1.2-5s-.4-3.6-1.2-5L21 8c.7 1 1 2.5 1 4zm-2 6c-1.5 2-4 3.7-7 4v2c3.7-.3 7-2.3 9-5l-2-1zM4 6c1.5-2 4-3.7 7-4V0C7.3.3 4 2.3 2 5l2 1zm7 16c-3-.3-5.5-2-7-4l-2 1c2 2.7 5.3 4.7 9 5v-2z\'/></svg>");\n\t\t\t\tbackground-position:50% 50%;\n\t\t\t\tbackground-size:20px;\n\t\t\t\tbackground-repeat:no-repeat;\n\t\t\t\tanimation:' + componentNameDash + '-preview-loader 1s linear infinite;\n\t\t\t\tfilter:drop-shadow(rgba(0,0,0,.3) 0 0 1px);\n\t\t\t}\n\t\t\t.' + componentNameDash + '--compiling .' + componentNameDash + '__preview-loader {\n\t\t\t\topacity: 1;\n\t\t\t\tpointer-events:all;\n\t\t\t}\n\t\t\t' + componentNameDash + ' > *:not(.' + componentNameDash + '__preview-container) {\n\t\t\t\tflex:1 0;\n\t\t\t}\n\t\t\t@media all and (max-width:600px) {\n\t\t\t\t' + componentNameDash + ' {\n\t\t\t\t\tflex-flow: column wrap;\n\t\t\t\t}\n\t\t\t}\n\t\t';
		}

		/**
   * Default props
   * @definition 		SWebcomponent.defaultProps
   * @protected
   */

	}, {
		key: 'defaultProps',
		get: function get() {
			return {
				/**
     * Script to load inside the demo
     * @prop
     * @type 		{String|Array}
     */
				scripts: null,

				/**
     * Styles to load inside the demo
     * @prop
     * @type 		{String|Array}
     */
				styles: null,

				/**
     * Automatically resize the preview
     * @prop
     * @type 		{Boolean}
     */
				resizePreview: true,

				/**
     * Specify the layout wanted between vertical and horizontal
     * @prop
     * @type 		{String}
     * @values 		top | right | bottom | left | vertical | horizontal
     */
				layout: 'horizontal',

				/**
     * Array of editors ids to hide by default
     * @prop
     * @type 		{Array}
     */
				hide: [],

				/**
     * Display toggles
     * @prop
     * @type 		{Boolean}
     */
				displayToggles: true
			};
		}

		/**
   * Physical props
   * @definition 		SWebcomponent.physicalProps
   * @protected
   */

	}, {
		key: 'physicalProps',
		get: function get() {
			return ['layout'];
		}
	}]);

	return SInteractiveDemoComponent;
}(_SWebComponent3.default);

exports.default = SInteractiveDemoComponent;