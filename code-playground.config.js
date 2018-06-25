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
`
<script id="mustacheTempalte_a" type="text/template">
<div class="item">
	{{#data}}
		{{#isSexNotSet}}
			<h1>Memory, Cognition and Caffeine?</h1>
			<p class="green">The University of Barcelona has shown that caffeine may contribute to increase memory and cognition as we age.</p>
			<img src="https://i.imgur.com/ex8tFnt.png">
		{{/isSexNotSet}}
		{{#isMale}}
		<h2>Hi <span class="blue underline">{{name}},</span>
		<br>
		Have you ever wondered how caffeine impacts blood pressure for men?
	</h2>
		<p class="blue">According to the American journal of cardiology men who drink Caffeine have increased blood pressure and do increased vascular resistance as opposed to increased cardio output.</p>
		<img src="https://i.imgur.com/LMw9Wkj.png" />
		{{/isMale}}
		
		{{#isFemale}}
		<h2>Hi <span class="red underline">{{name}},</span>
		<br>
		Have you ever wondered how caffeine impacts women ability to solve complex tests?
	</h2>
		<p class="red">Researchers at Bristol University in UK have shown that women who drink caffeine performed complex tasks better than women who did not.</p>
		<img src="https://i.imgur.com/yl2GJcr.png" />
		{{/isFemale}}	
		
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
				padding: 0 20px;
			}
			h1 {
				margin: 0 0 30px; 
				font-weight: 300;
				line-height: 40px;
			}
			h2 {
				margin: 0 0 30px;
				font-weight: 300;
				line-height: 35px;
				font-size: 24px;
				line-height: 1.42;
			}
			p {
				font-weight: 300;
				margin-bottom: 40px;
				font-size: 14px;
				font-weight: 300;
				line-height: 1.57;
			}
			img {
				width: 100%;
			}
			.blue {
				color: #14bbe8;
			}
			.red {
				color: #D21068;
			}
			.green {
				color: #7ABD15;
			}
			.underline {
				text-decoration: underline;
			}
			`
		},

		// js editor
		js : {
			language : 'js', // available : js / coffeescript / typescript
			data : `
			window.onload = function () {
				var name = getParameterByName("name");
				var isMale = getParameterByName("isMale");
				var isFemale = getParameterByName("isFemale");
				var isSexNotSet = isMale || isFemale ? false : true;
				var targetContainer = $(".target-output"),
					templateDefined = $(".target-output").data("template-chosen"),
					template = $("#mustacheTempalte_" + templateDefined).html();
				var data = { "data": [{
						name: name,
						isMale: isMale,
						isFemale: isFemale,
						isSexNotSet: isSexNotSet
					}]
				};
				var html = Mustache.to_html(template, data);
				$(targetContainer).html(html);
			};

			function getParameterByName(name, url = window.location.href) {
				var keep = false
				var query = url.split("query=")[1]
				if (!query) return false
				var results = query.split("&")
				results.map(function(v) {
					if (v.includes(name)) {
						keep = v.split(name+'=')[1]
					}
				})
				return keep
			}
			`
		}
	}
}
