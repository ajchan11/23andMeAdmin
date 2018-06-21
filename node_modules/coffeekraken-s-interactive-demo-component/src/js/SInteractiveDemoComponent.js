import SWebComponent from 'coffeekraken-sugar/js/core/SWebComponent'
import __throttle from 'coffeekraken-sugar/js/utils/functions/throttle'
import __prependChild from 'coffeekraken-sugar/js/dom/prependChild'
import _find from 'lodash/find';

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

export default class SInteractiveDemoComponent extends SWebComponent {

	/**
	 * Base css
	 * @definition 		SWebComponent.css
	 * @protected
	 */
	static defaultCss(componentName, componentNameDash) {
		return `
			@keyframes ${componentNameDash}-preview-loader {
				from {
					transform:rotate(0deg);
				}
				to {
					transform:rotate(360deg);
				}
			}
			${componentNameDash} {
				display: flex;
				width:100%;
				flex-flow: row wrap;
				position:relative;
				color:#777;
			}
			// ${componentNameDash}:not([layout="vertical"]) > * + *:after {
			// 	border-left:none;
			// }
			.${componentNameDash}__preview-container {
				display: flex;
				flex-flow: column nowrap;
				background: white;
			}
			.${componentNameDash}__header {
				user-selection:none;
				flex:0 0 auto !important;
				width:100%; height:32px;
				position:relative;
				background:rgba(0,0,0,.05);
			}
			.${componentNameDash}__preview {
				box-sizing : border-box;
				flex:1 0 auto;
				position:relative;
				flex-flow: column nowrap;
				display: flex;
			}
			.${componentNameDash}__preview iframe {
				flex: 1 1 auto;
			}
			.${componentNameDash}__display-toggle {
				padding:10px 15px 10px 30px;
				background-image:url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='#777' d='M24 10.935v2.13l-8 3.948v-2.23L21.64 12 16 9.21V6.987l8 3.948zM8 14.783L2.36 12 8 9.21V6.987l-8 3.948v2.13l8 3.948v-2.23zM15.047 4H12.97L8.957 20h2.073l4.017-16z'/></svg>");
				background-size:12px 12px;
				background-position:10px 10px;
				background-repeat:no-repeat;
				display:inline-block;
				font-size:12px;
				cursor:pointer;
				opacity:.45;
			}
			.${componentNameDash}__display-toggle.active {
				opacity:1;
			}

			${componentNameDash}[layout="vertical"] {
				flex-flow: column wrap;
			}
			${componentNameDash}[layout="vertical"] .${componentNameDash}__preview-container {
				order:-1;
			}
			${componentNameDash}[layout="vertical"] .${componentNameDash}__preview {
				order: -1;
			}
			${componentNameDash}[layout="top"] .${componentNameDash}__preview-container {
				flex:1 1 100%;
				order:-1;
			}
			${componentNameDash}[layout="top"] .${componentNameDash}__preview {
				order: -1;
			}
			${componentNameDash}[layout="bottom"] .${componentNameDash}__preview-container {
				flex:1 1 100%;
				order: 2;
			}
			.${componentNameDash}__preview-loader {
				position:absolute;
				top:0; left:0;
				width:100%; height:100%;
				background-color:rgba(38,50,56,.5);
				opacity: 0;
				transition:opacity .1s ease-in-out;
				pointer-events:none;
			}
			.${componentNameDash}__preview-loader:after {
				content:"";
				display:block;
				position:absolute;
				width:20px; height:20px;
				top:50%; left:50%;
				margin-top:-10px;
				margin-left:-10px;
				transform-origin:10px 10px;
				background-image:url("data:image/svg+xml;charset=UTF-8,<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'><path fill='white' d='M13 0c3.7.3 7 2.3 9 5l-2 1c-1.5-2-4-3.7-7-4V0zM2 12c0-1.5.3-3 1-4L1 7c-.6 1.3-1 3-1 5 0 1.8.4 3.6 1.2 5L3 16c-.7-1-1-2.5-1-4zm20 0c0 1.5-.3 3-1 4l1.8 1c.8-1.4 1.2-3.2 1.2-5s-.4-3.6-1.2-5L21 8c.7 1 1 2.5 1 4zm-2 6c-1.5 2-4 3.7-7 4v2c3.7-.3 7-2.3 9-5l-2-1zM4 6c1.5-2 4-3.7 7-4V0C7.3.3 4 2.3 2 5l2 1zm7 16c-3-.3-5.5-2-7-4l-2 1c2 2.7 5.3 4.7 9 5v-2z'/></svg>");
				background-position:50% 50%;
				background-size:20px;
				background-repeat:no-repeat;
				animation:${componentNameDash}-preview-loader 1s linear infinite;
				filter:drop-shadow(rgba(0,0,0,.3) 0 0 1px);
			}
			.${componentNameDash}--compiling .${componentNameDash}__preview-loader {
				opacity: 1;
				pointer-events:all;
			}
			${componentNameDash} > *:not(.${componentNameDash}__preview-container) {
				flex:1 0;
			}
			@media all and (max-width:600px) {
				${componentNameDash} {
					flex-flow: column wrap;
				}
			}
		`;
	}

	/**
	 * Default props
	 * @definition 		SWebcomponent.defaultProps
	 * @protected
	 */
	static get defaultProps() {
		return {
			/**
			 * Script to load inside the demo
			 * @prop
			 * @type 		{String|Array}
			 */
			scripts : null,

			/**
			 * Styles to load inside the demo
			 * @prop
			 * @type 		{String|Array}
			 */
			styles : null,

			/**
			 * Automatically resize the preview
			 * @prop
			 * @type 		{Boolean}
			 */
			resizePreview : true,

			/**
			 * Specify the layout wanted between vertical and horizontal
			 * @prop
			 * @type 		{String}
			 * @values 		top | right | bottom | left | vertical | horizontal
			 */
			layout : 'horizontal',

			/**
			 * Array of editors ids to hide by default
			 * @prop
			 * @type 		{Array}
			 */
			hide : [],

			/**
			 * Display toggles
			 * @prop
			 * @type 		{Boolean}
			 */
			displayToggles : true
		};
	}

	/**
	 * Physical props
	 * @definition 		SWebcomponent.physicalProps
	 * @protected
	 */
	static get physicalProps() {
		return ['layout'];
	}

	/**
	 * Component will mount
	 * @definition 		SWebcomponent.componentWillMount
	 * @protected
	 */
	componentWillMount() {
		super.componentWillMount();
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
	componentMount() {
		super.componentMount();

		// get the content
		const content = this.innerHTML;

		// find the editors
		this._refs.editors = [].filter.call(this.children, (child) => {
			return child.id && child.nodeName !== 'IFRAME';
		});

		this._refs.previewContainer = this.querySelector(`[${this._componentNameDash}-preview]`) || document.createElement('div');
		this._refs.previewContainer.className = `${this._componentNameDash}__preview-container`;

		// inject the html needed
		this._refs.preview = document.createElement('div');
		this._refs.preview.className = `${this._componentNameDash}__preview`;

		// loading
		this._refs.previewLoader = document.createElement('div');
		this._refs.previewLoader.className = `${this._componentNameDash}__preview-loader`;

		// header
		this._refs.header = document.createElement('div');
		this._refs.header.className = `${this._componentNameDash}__header`;

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
		if ( ! this._refs.previewContainer.parentNode) {
			this.appendChild(this._refs.previewContainer);
		}

		// listen for compilations
		this.addEventListener('compileStart', this._onCompileStart.bind(this));
		this.addEventListener('compileEnd', this._onCompileEnd.bind(this));
		this.addEventListener('compileError', this._onCompileEnd.bind(this));

		// listen for window resize
		window.addEventListener('resize', __throttle(this._onWindowResize.bind(this), 200));

		// listen for update from parts
		let updateTimeout = null;
		this.addEventListener('update', (e) => {

			// store the codes
			this._editors[e.target.id] = {
				id : e.target.id,
				elm : e.target,
				code : e.detail.data,
				language : e.detail.language
			};

			// create the editor toggle
			this._createEditorToggle(this._editors[e.target.id]);

			clearTimeout(updateTimeout);
			updateTimeout = setTimeout(() => {
				// update only if no more compilation is going one
				if ( this._compilationsCount <= 0) {
					// update the preview from the editor update
					this._refreshPreview();
				}
			});
		});

		// update editors display
		if (this.props.hide.length) {
			this.props.hide.forEach((editorId) => {
				const edt = this.querySelector(`#${editorId}`);
				if (edt) edt.style.display = 'none';
			});
		}
	}

	/**
	 * Create editor toggles
	 */
	_createEditorToggle(editorObj) {
		if (this.props.displayToggles) {
			if ( ! this._refs.header.querySelector(`[toggle-id="${editorObj.id}"]`)) {
				// create toggle for this editorElm
				const toggleElm = document.createElement('div');
				toggleElm.className = `${this._componentNameDash}__display-toggle`;
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
	_refreshPreview() {

		// replace the old iframe with a brand new one
		// this allow to have a fresh new context to work in
		// and avoid some issues
		const newIframe = document.createElement('iframe');
		let isFirstIframe = true;
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
		this._iframeRefs.document = this._refs.iframe.contentDocument || this._refs.iframe.contentWindow.document;

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
		this._iframeRefs.body.classList.add(`${this._componentNameDash}`);
		this._iframeRefs.html.classList.add(`${this._componentNameDash}`);

		// inject resources
		this._injectResourcesInsidePreview();

		// loop on each editors
		Object.keys(this._editors).forEach((editorId) => {
			const editorObj = this._editors[editorId];

			// check if has already the editor wrapper into the iframe
			if ( ! this._iframeRefs.wrapper.querySelector(`#${editorId}`)) {
				const innerIframePartElm = this._iframeRefs.document.createElement('div');
				innerIframePartElm.id = editorObj.id;
				this._iframeRefs.wrapper.appendChild(innerIframePartElm);
			}

			// update the content
			let codeElm;
			let updateHtml = false;
			// handle how to inject code
			switch(editorObj.language) {
				case 'css':
					codeElm = this._iframeRefs.document.createElement('style');
				break;
				case 'js':
				case 'javascript':
					codeElm = this._iframeRefs.document.createElement('script');
				break;
				default:
					codeElm = this._iframeRefs.document.createElement('div');
					codeElm.setAttribute('html',true);
				break;
			}
			// inject the code
			codeElm.innerHTML = editorObj.code;
			// append the new code into container
			this._iframeRefs.body.querySelector(`#${editorId}`).appendChild(codeElm);
		});

		// update preview size
		if (this.props.resizePreview) {
			if (isFirstIframe) {
				this._updatePreviewHeight();
			}
			setTimeout(() => {
				this._updatePreviewHeight();
			},500);
		}
	}

	/**
	 * On toggle display clicked
	 * @param 		{MouseEvent} 		e 		The mouse event
 	 */
	_onDisplayToggleClick(e) {
		// check if is active or not
		const isActive = e.target.classList.contains('active');
		// get the editor
		const editorObj = _find(this._editors, (editor) => {
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
	_onCompileStart(e) {
		// count the compilations in progress
		this._compilationsCount++;
		// add the compilation class
		this.addComponentClass(this, null, 'compiling');
	}

	/**
	 * On compilation end
	 * @param 		{Event} 	e 		The compilation end event
	 */
	_onCompileEnd(e) {
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
	_onWindowResize() {
		// update code and preview size
		if (this.props.resizePreview) this._updatePreviewHeight();
	}

	/**
	 * Inject scripts and styles inside preview
	 */
	_injectResourcesInsidePreview() {
		const stl = this._iframeRefs.document.createElement('style');
		stl.innerHTML = `
			body {
				margin:0;
				padding:0;
			}
			#wrapper {
				padding: 20px;
			}
		`;
		this._iframeRefs.body.appendChild(stl);

		if (this.props.scripts) {
			// make sure it's an array
			const scripts = [].concat(this.props.scripts);
			scripts.forEach((script) => {
				const scriptTag = this._iframeRefs.document.createElement('script');
				scriptTag.src = script;
				this._iframeRefs.body.appendChild(scriptTag);
			});
		}
		if (this.props.styles) {
			// make sure it's an array
			const styles = [].concat(this.props.styles);
			styles.forEach((style) => {
				const styleTag = this._iframeRefs.document.createElement('link');
				styleTag.href = style;
				styleTag.rel = 'stylesheet';
				this._iframeRefs.body.appendChild(styleTag);
			});
		}
	}

	/**
	 * Update iframe height
	 */
	_updatePreviewHeight() {
		setTimeout(() => {
			this._refs.iframe.removeAttribute('height');
			this._refs.iframe.height = this._iframeRefs.wrapper.scrollHeight + 15 + 'px';
		}, 50);
	}
}
