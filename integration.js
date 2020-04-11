'use strict';

// include async
var async = require('async');

// include jQuery
var jsdom = require("jsdom");
const { JSDOM } = jsdom;
const { window } = new JSDOM();
const { document } = (new JSDOM('')).window;
global.document = document;

var jQuery = require('jquery')(window);
var $ = jQuery;

// include cytoscape
var cytoscape  = require('cytoscape');
let dagre = require('cytoscape-dagre');
cytoscape.use( dagre );
var cy = cytoscape();

// evaluate cytoscape scripts
var fs = require('fs');
eval(fs.readFileSync('./res/cytoscape-prov-core.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-json.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-mqtt.js')+'');
eval(fs.readFileSync('./res/cytoscape-prov-menu.js')+'');

// mongoDB connection
const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const connectionString = 'mongodb://localhost:27017';
var gl_client;

async.waterfall([
	// create connection to mongoDB
  function connectToMongoDb(cb){
    MongoClient.connect(connectionString, (err, client) => {
      if (err) {
        console.log('Failed to connect.', err.message);
        process.exit(1);
      }
      gl_client = client;
      const database = client.db('Import');
      // collection with 2495 objects: mqtt
      // collection with 200 objects: provenance
	  // TODO: define collection
      const collection = database.collection('provenance');
      console.log('Connected to DB: '+ database.databaseName +
                  ', in Collection: '+ collection.collectionName);
      cb(null, collection);
    })
  },
  // load all entries from database
  function getAllObjects(collection, cb){
    // set query parameters
    var query = {};
    collection.find(query,cb);
  },
  // get data from the entries
  function getData(entries, cb){
    var array = [];

    entries.each((err,data)=>{
      if(err) return cb(err);
      if(data == null){
        gl_client.close();
        return cb(null, array);
      }
      array.push(JSON.stringify(data));
    });
  },
	// create network
  function parseData(data, cb){
    for(var i = 0; i < data.length; i++){
      try{
      cy.prov_json().parse(data[i]);
      cy.prov_core().weight('rdt:duration', 1);
      }
      catch(e){
        console.log('Error at element '+ (i+1));
        console.log('Errormessage: '+ e );
      }
    }
    return cb(null);
  },
	// save network
  function saveNetwork(){
    // save network in document
    fs.appendFileSync('./networks/cyto_network_'+new Date().toISOString() +'.json', JSON.stringify(cy.json()), function(err){
                          if(err) throw err;
                        });
    console.log('Network saved.')
    process.exit(1);

    // save network in MongoDB
    // MongoClient.connect(connectionString, (err, client)=>{
    //   if (err) {
    //     console.log('Failed to connect.', err.message);
    //     process.exit(1);
    //   }
    //   const database = client.db('Networks');
    //   const collection = database.collection('prov_networks');
    //   console.log('Connected to DB: '+ database.databaseName + ', in Collection: '+ collection.collectionName);
    //   var network = cy.json();
    //   var id = "prov_netork"+new Date().toISOString() ;
    //   collection.insertOne({_id:id, network}, (err, res) => {
    //     if (err) throw err;
    //     console.log("network inserted");
    //     client.close();
    //   });
    // });
  }],
  function(err){
    console.log('An error occoured: '+ err);
    process.exit(1);
  }
);
