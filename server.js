// HTTP Portion
var http = require('http');
var fs = require('fs'); // Using the filesystem module
var httpServer = http.createServer(requestHandler);
httpServer.listen(8080);

function requestHandler(req, res) {
	// Read index.html
	fs.readFile(__dirname + '/index.html', 
		// Callback function for reading
		function (err, data) {
			// if there is an error
			if (err) {
				res.writeHead(500);
				return res.end('Error loading canvas_socket.html');
			}
			// Otherwise, send the data, the contents of the file
			res.writeHead(200);
			res.end(data);
  		}
  	);
}


// WebSocket Portion
// WebSockets work with the HTTP server
var io = require('socket.io').listen(httpServer);

// Register a callback function to run when we have an individual connection
// This is run for each individual user that connects
io.sockets.on('connection', 
	// We are given a websocket object in our function
	function (socket) {
	
		console.log("We have a new client: " + socket.id);
		
		// When this user emits, client side: socket.emit('otherevent',some data);
		socket.on('chatmessage', function(data) {
			// Data comes in as whatever was sent, including objects
			console.log("Received: 'chatmessage' " + data);
			
			// Send it to all of the clients
			socket.broadcast.emit('chatmessage', data);
		});

		socket.on('data', function(data) {
			console.log(data);
			if (data == 0) {
				myPort.write('0');
			} else if (data == 1) {
				myPort.write('1');
			}
		})
		
		
		socket.on('disconnect', function() {
			console.log("Client has disconnected " + socket.id);
		});
	}
);

var serialport = require('serialport');
   SerialPort = serialport.SerialPort;
   portName = '/dev/cu.usbmodem1411';
var myPort = new SerialPort(portName, {
   baudRate: 9600,
   // look for return and newline at the end of each data packet:
   parser: serialport.parsers.readline("\n")
 });

myPort.on('open', showPortOpen);
myPort.on('data', sendSerialData);
myPort.on('close', showPortClose);
myPort.on('error', showError);

function showPortOpen() {
  console.log('port open. Data rate: ' + myPort.options.baudRate);
}

function sendSerialData(data) {

}

function showPortClose() {
  console.log('port closed.');
}

function showError(error) {
  console.log('Serial port error: ' + error);
}