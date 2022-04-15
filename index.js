const http = require("http");
const app = require("./src");

//create a server object:
http.createServer(app).listen(8080); //the server object listens on port 8080
