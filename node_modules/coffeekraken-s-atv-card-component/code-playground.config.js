module.exports = {
	// server port
	port : 3001,

	// title
	title : 's-atv-card-component',

	// layout
	layout : 'right',

	// compile server
	compileServer : {

		// compile server port
		port : 4001

	},

	// editors
	editors : {
		html : {
			language : 'html',
			data : `
				<div class="container">
					<s-atv-card amount=".3" perspective="700">
						<article class="card">
							<img src="http://www.hollywoodreporter.com/sites/default/files/custom/Blog_Images/interstellar3.jpg" />
						</article>
					</s-atv-card>
				</div>
			`
		},
		css : {
			language : 'sass',
			data : `
				@import 'node_modules/coffeekraken-sugar/index';
				@include s-init();
				@include s-classes();
				@include s-typography-classes();
				body {
					background: linear-gradient(to bottom, #f6f7fc 0%, #d5e1e8 40%);
				}
				.container {
					@include s-position(absolute, middle, center);
				}
				.card {
					@include s-depth(20);
					position:relative;
					max-width:400px;
					img {
						width:100%;
					}
				}
			`
		},
		js : {
			language : 'js',
			data : `
				import 'webcomponents.js/webcomponents-lite'
				import SAtvCardComponent from './dist/index'
			`
		}
	}
}
