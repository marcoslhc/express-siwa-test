var express = require("express");
var path = require("path");

const app = express();

const middleware = [
  express.static("public", {
    setHeaders: (res, path, stat) => {
      console.log(express.static);
    }
  }),
  express.json({
    type: "application/json"
  }),
  express.urlencoded({ extended: true })
];

const routes = [
  ["/", require("./routes/home")],
  ["/oauth", require("./routes/oauth")],
  ["/loggedIn", require("./routes/loggedIn")]
];

app.set("view engine", "ejs");
app.set("views", "./src/views");
app.engine("html", require("ejs").renderFile);

middleware.reduce((server, mw) => server.use(mw), app);
routes.reduce((server, [path, router]) => server.use(path, router), app);

module.exports = app;
