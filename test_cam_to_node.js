// import jQuery
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;
var $ = jQuery = require('jquery')(window);

// import cytoscape
var cytoscape  = require('cytoscape');
let dagre = require('cytoscape-dagre');
cytoscape.use( dagre );
var cy = cytoscape();

// import fileReader
var fs = require('fs');

// include scripts
eval(fs.readFileSync('./res/cytoscape-prov-core.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-json.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-mqtt.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-menu.js')+'');

// read test file
let inputFile = fs.readFileSync('./res/test_data.txt', 'utf8',
	function(err){
		if(err)throw err;
	});

// create network
cy.prov_json().parse(inputFile);

// save network
fs.appendFileSync('./networks/outputCamflow.json', JSON.stringify(cy.json()),
function(err){
	if(err) throw err;
});
