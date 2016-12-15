var args = process.argv.slice(2);

var Nightmare = require('nightmare');
var browser = Nightmare();

browser.goto(args[0]);

browser
	//Inject axe-core
	.inject('js', __dirname+'/node_modules/axe-core/axe.min.js')
	//Wait for the body element to be present
	.wait('body')
	//Evaluate axe-core 
	.evaluate(function () {
		var promise = axe.run();
		return promise;
	})
	//Wait for queue to end and then end the process
	.end()
	//Wait for promise to complete
	.then(function (result) {
		console.log(JSON.stringify(result, null, '  '));
	})
	.catch(function (error) {
		console.error('axe failed:', error);
	});
