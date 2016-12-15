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
		//With some options, just as an example...
		var axe_options = {
				"runOnly": {
					"type": "tag",
					"values": ["wcag2a", "wcag2aa"]
				},
				"rules": {
					"video-description": { "enabled": false },
					"video-caption": {"enabled": false}
				}
			};
		
		var promise = axe.run(axe_options);
		return promise;
	})
	//Wait for queue to end and then end the process
	.end()
	//Wait for promise to complete
	.then(function (result) {
		console.log(result)
	})
	.catch(function (error) {
		console.error('axe failed:', error);
	});
