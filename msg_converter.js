
var mqtt = require('mqtt');
var atob = require('atob');
var btoa = require('btoa');
var pako = require('pako');
const zlib = require('zlib');
var count =0;

// get data
var client  = mqtt.connect("mqtt://127.0.0.1",{clientId:"transformerjs" , port: 1883     });
//var client  = mqtt.connect("mqtt://192.168.178.37",{clientId:"mqttjs01" , port: 1883     });
console.log("connected flag  " + client.connected);


// resend data
var client2retransmit  = mqtt.connect("mqtt://127.0.0.1",{clientId:"transformerjs_retransmit" , port: 1883     });
//var client  = mqtt.connect("mqtt://192.168.178.37",{clientId:"mqttjs01" , port: 1883     });
console.log("connected flag  " + client2retransmit.connected);


var message2="eJztWGtv2jAU/Sson7fixHlL+2BIp3Zbu6FN07RpqgJxQjZIWBJwq4r/PufFSAgFt4QENEugOLGv7XN8z7XvIzcLsO3ec/ojffIXXEfvcOMomundLiHkgsALP3C6XthNvr7qcCOb09dbjMypPfFJ3Ixb0u/Yi9zoIbY3snWELlFS+ugGDK7TZyTSn9G1CVovb7IurkXt86ooqSr3KpmTHj3MMH1puxNMX9E2Q9+P7uKGvJjUp+Zo7Ho4eRXXoaDIStp0gYPQ9T1OB0nVMqPYlAB4TQeqzktfeFUXZZ0X0ua/XNt2cUibiIImagrU+MwQnvmjMR1RSWrzZHQAUqtOoTb1rXgMcK/ytp12dj2f0yUow7TFPOnOgay8rvjLS47BxBziCe3zI0bhZwdQrEsAe1eIAWCoCorWDoDFQwEs8kBSagPY6F+Rm02ASTXAAhAVeNgdDJ8GGG4FWDvYDhaFbL4vBxhyy1guiBkaOHAX2Hob+NNcNpwUUecagdsVvvvsaiiLJcwz+O4yXWJF/xn7eRPuwvqrJmROqITiePQomON8BfMQW5eZnBb3Yh99qFJTZw2WzIaDPRzQNbAZIgVDtIc9MZ14kSCtRmb4O0WL5yVBVlfOgnopb72ot7KxB28a4Eu0heO7AJvWMfja1J8CX4WZsBJlLK6cCtFYx+FpotAgIyroDyoMDbYRpcauZw/LdAlAABrcoAu9c1Z7ZzddEApqOXYcjy8o18hXX3t/GL4QknOja4aMoofu5qvsXv2ML4FVFuVNvkjgRuzh6CDxp0zY2lT2ZexpoI8ghXsylgvinFEQhbodbDtftQri/DQE8ZZREDXYGF+1CmJPdsiOa0Wjgpi714LRvZqjq173ik7DvT6xupd0nu6FzO+70iJtcC/0mZWv8tX3TPgyxI8VfBlt46tHGOWwfGs+FzkMT0MOv7K5F6z/utzQaQPdtPr6lfP1jZWvMz0dGsMqOWwLX/+yiJD1uqwcKYv47EvzIbKIWzLa7FfnPVLjz8si3jOGseZOifWGseA0wpjJKosVWalzkEXk31bA3J5TYp5FlFhlsSLr+z+L+CIpZDx4WKweVnuevqm0VCXMrfGwPIA9MAaw5gSx3gD2p50BbLn8CwahHI4=";






//handle incoming messages
client.on('message',function(topic, message, packet){
	// console.log("#vomServer#"+   message );
	// console.log("#gutVergleich#"+   message2 );
	// console.log("message is "+   inflateB64(message) );
	console.log("topic is "+ topic);
	// ##############
	// resend data to message broker
	//var optionsresend={
	//retain:true,
	//qos:1};

	inflateB64(message);

	//client2retransmit.publish("/transformed/1",  inflateB64(message)   ,optionsresend);
	
	
});


// connected
client.on("connect",function(){	
	console.log("connected  "+ client.connected);
})
client2retransmit.on("connect",function(){	
	console.log("connected  "+ client2retransmit.connected);
})





//handle errors
client.on("error",function(error){
	console.log("Can't connect" + error);
	process.exit(1)
});
client2retransmit.on("error",function(error){
	console.log("Can't connect" + error);
	process.exit(1)
});





//publish
function publish(topic,msg,options){
console.log("publishing",msg);

if (client.connected == true){
	// client.publish(topic,msg,options);
}
count+=1;
if (count==-1) //end script
	clearTimeout(timer_id); //stop timer
	client.end();	
}
//////////////



var options={
retain:true,
qos:1};
var topic="camflow/provenance/#";
var message="eJztWGtv2jAU/Sson7fixHlL+2BIp3Zbu6FN07RpqgJxQjZIWBJwq4r/PufFSAgFt4QENEugOLGv7XN8z7XvIzcLsO3ec/ojffIXXEfvcOMomundLiHkgsALP3C6XthNvr7qcCOb09dbjMypPfFJ3Ixb0u/Yi9zoIbY3snWELlFS+ugGDK7TZyTSn9G1CVovb7IurkXt86ooqSr3KpmTHj3MMH1puxNMX9E2Q9+P7uKGvJjUp+Zo7Ho4eRXXoaDIStp0gYPQ9T1OB0nVMqPYlAB4TQeqzktfeFUXZZ0X0ua/XNt2cUibiIImagrU+MwQnvmjMR1RSWrzZHQAUqtOoTb1rXgMcK/ytp12dj2f0yUow7TFPOnOgay8rvjLS47BxBziCe3zI0bhZwdQrEsAe1eIAWCoCorWDoDFQwEs8kBSagPY6F+Rm02ASTXAAhAVeNgdDJ8GGG4FWDvYDhaFbL4vBxhyy1guiBkaOHAX2Hob+NNcNpwUUecagdsVvvvsaiiLJcwz+O4yXWJF/xn7eRPuwvqrJmROqITiePQomON8BfMQW5eZnBb3Yh99qFJTZw2WzIaDPRzQNbAZIgVDtIc9MZ14kSCtRmb4O0WL5yVBVlfOgnopb72ot7KxB28a4Eu0heO7AJvWMfja1J8CX4WZsBJlLK6cCtFYx+FpotAgIyroDyoMDbYRpcauZw/LdAlAABrcoAu9c1Z7ZzddEApqOXYcjy8o18hXX3t/GL4QknOja4aMoofu5qvsXv2ML4FVFuVNvkjgRuzh6CDxp0zY2lT2ZexpoI8ghXsylgvinFEQhbodbDtftQri/DQE8ZZREDXYGF+1CmJPdsiOa0Wjgpi714LRvZqjq173ik7DvT6xupd0nu6FzO+70iJtcC/0mZWv8tX3TPgyxI8VfBlt46tHGOWwfGs+FzkMT0MOv7K5F6z/utzQaQPdtPr6lfP1jZWvMz0dGsMqOWwLX/+yiJD1uqwcKYv47EvzIbKIWzLa7FfnPVLjz8si3jOGseZOifWGseA0wpjJKosVWalzkEXk31bA3J5TYp5FlFhlsSLr+z+L+CIpZDx4WKweVnuevqm0VCXMrfGwPIA9MAaw5gSx3gD2p50BbLn8CwahHI4=";
var topic_list=["topic2","topic3","topic4"];
var topic_o={"topic22":0,"topic33":1,"topic44":1};
console.log("subscribing to topics");
client.subscribe(topic,{qos:1}); //single topic
// client.subscribe(topic_list,{qos:1}); //topic list
// client.subscribe(topic_o); //object

// var timer_id=setInterval(function(){publish(topic,message,options);},5000);
// notice this is printed even before we connect
console.log("end of script");







function inflateB64( str){
	/* convert from B64 to byteArray */
	// str = 'data:text/plain;base64,' + str ;
	var byteCharacters = atob( str);
	// console.log(byteCharacters);
	var byteNumbers = new Array(byteCharacters.length);
	// for (var i = 0; i < byteCharacters.length; i++) {
	// 	byteNumbers[i] = byteCharacters.charCodeAt(i);
	// }
	// var byteArrayok = new Uint8Array(byteNumbers);
	// 
	// console.log("in:#" + byteArrayok + "#");
	
	
	
	
	var fs = require("fs");
	
	const b64File = require('base64-file-encoder');
	
	var returnstring = "";
	
	
	
	fs.writeFile('base64_2'    ,  new Buffer.from( str , 'base64' ), "binary", (err) => {
		if (err) throw err;
	  	
		// base64 decodes the content of bar.txt and outputs it to foo.txt
		b64File.decode( "base64_2").then(function(){
			  
			// if bar.txt content was 'Zm9v', foo.txt content will be 'foo'
			// console.log('file was decoded');
			
			//console.log('It\'s saved!');
			fs.readFile("base64_2", function (err, data) {
				if (err) throw err;
				// console.log(data.toString());
				zlib.inflate(data, (err, buffer) => {
				if (!err) {
					//console.log(buffer.toString());
					returnstring = buffer.toString() ;
					// console.log( returnstring );
					// return returnstring;


				        var optionsresend={
        				retain:true,
        				qos:1};

				        client2retransmit.publish("/converted/1",  returnstring   ,optionsresend);



				  } else {
					console.log(err);
				  }
				});
			}  );			
		  })
		  .catch(function(error){
			console.log(error);
		  });		
	});
	
	
	/*
	const buffer = Buffer.from( byteArray );
	zlib.inflate(buffer, (err, buffer) => {
	  if (!err) {
		console.log(buffer.toString());
	  } else {
		console.log(err);
	  }
	});
	*/
	
	// return returnstring ;
}




