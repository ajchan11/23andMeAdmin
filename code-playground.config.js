module.exports = {
	title : 'Hello World',
	port : 3000,
	editors : {
		html : {
			data : `
				<h1>Hello World</h1>
			`
		},
		css : {
			language : 'sass',
			data : `
				body {
					background: red;
				}
			`
		},
		js : {
			data : `
				console.log('hello world');
			`
		}
	}
};