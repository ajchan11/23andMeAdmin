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
			data : 
`<script id="mustacheTempalte_a" type="text/template">
<div class="item">
	{{#data}}
		<h2>Hi <span>{{name}},</span>
		<br>
		{{info}}
		</h2>
		<p>{{detail}}</p>
		<img src="{{imgURL}}" />
	{{/data}}
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
				font-family: -apple-system, BlinkMacSystemFont;
				background-color: white;
				padding: 20px;
			}
			h1 {
				margin: 30px 0; 
				font-weight: 300;
				line-height: 40px;
			}
			h2 {
				font-weight: 300;
				line-height: 35px;
			}
			p {
				line-height: 25px;
			
				font-weight: 300;
				margin-bottom: 40px;
			}
			img {
				width: 100%;
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
				var data = { "data": [{ 
						name: "Alex",
						info: "Have you ever wondered how caffeine impacts the blood pressure for me?",
						detail: "According to the American journal of cardiology men who drink Caffeine have increased blood pressure and do increased vascular resistance as opposed to increased cardio output.",
						imgURL: "https://i.imgur.com/LMw9Wkj.png"
					}] 
				};
				var html = Mustache.to_html(template, data);
				$(targetContainer).html(html);
			}
			`
		}
	}
}
