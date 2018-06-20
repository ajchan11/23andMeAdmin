module.exports = {
	// server port
	port : 3000,

	// secret used to encrypt and decrypt vars
	// like the req.query.cwd, etc...
	// DON'T FORGET TO CHANGE THAT IN YOUR CONFIG
	secret : null,

	// map some app names to some cwd on the server.
	// by setting this up you will be able to target different apps on the same code-playground server
	// with the query string ?app={appname} or by /{appname},
	// format : {appname} : {cwd}
	// other : {NODE_ENV} : {...}
	apps : {},

	// set the working directory if you want to target an app that lives in
	// another folder that the code-playground installation one
	cwd : null,

	// logo url
	logo : null,

	// title
	title : 'Code Playground',

	// layout to use (top, right, bottom, left, vertical, horizontal)
	layout : 'right',

	// compile server options
	// see https://github.com/coffekraken/compile-server for full options reference
	compileServer : {

		// compile server port
		port : 4000

	},

	// editors
	editors : {

		// html editor
		html : {
			language : 'html',
			data : `
				<script type="text/javascript" src="https://code.jquery.com/jquery-3.3.1.min.js" integrity="sha256-FgpCb/KJQlLNfOu91ta32o/NMZxltwRo8QtmkMRdAu8=" crossorigin="anonymous"></script>
				<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/mustache.js/2.3.0/mustache.min.js"></script>
				<script id="mustacheTempalte_a" type="text/template">
				<div class="item">
					<h1>Upcoming Shows</h1>
					{{#shows}}
						<ul>
							<li><strong>Title:</strong> {{title}}</li>
							<li><strong>Description:</strong> {{{description}}}</li>
							<li><strong>Video:</strong> {{video}}</li>
							<li><strong>Category:</strong> {{category}}</li>
						</ul>
					{{/shows}}
				</div>
				</script>

				<script id="mustacheTempalte_b" type="text/template">
				<div class="item">
					<h1>Upcoming Shows</h1>
					{{#shows}}
						<ul>
							<li><strong>Title:</strong> {{title}}</li>
							<li><strong>Description:</strong> {{{description}}}</li>
							<li><strong>Video:</strong> {{video}}</li>
							<li><strong>Category:</strong> {{category}}</li>
						</ul>
					{{/shows}}
				</div>
				</script>


				<div class="target-output" data-template-chosen="a"></div>
			`
		},

		// css editor
		css : {
			language : 'css', // available : css / sass / scss / stylus
			data : `

				body {
					background: linear-gradient(to left, #f46b45 , #eea849);
				}
				.card {
					max-width : 400px;
					background: white;
				}
				.card__content {
					padding: 40px;
					transform:translate3d(0,0,20px);
				}
			`
		},

		// js editor
		js : {
			language : 'js', // available : js / coffeescript / typescript
			data : `
			window.onload = function() {
				var targetContainer = $(".target-output"),
					templateDefined = $(".target-output").data("template-chosen"),
					template = $("#mustacheTempalte_" + templateDefined).html();
				var shows = { "shows": [{ "category": "children",
						"description": "<a>A show</a> about a cake",
						"title": "Strawberry Shortcake",
						"video": "none"
					}, { "category": "children",
						"description": "A show about a ice",
						"title": "Vanilla Ice",
						"video": "none"
					}] };
				var html = Mustache.to_html(template, shows);
				$(targetContainer).html(html);
			}
			`
		}
	}
}
