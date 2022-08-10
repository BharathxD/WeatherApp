const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const session = require("express-session");
const flash = require("connect-flash");
const port = process.env.PORT || 3000;
const results = require("./routes/result.js");

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use(
  session({
    secret: "Secret",
    resave: false,
    saveUninitialized: false,
    maxAge: 1000 * 60 * 10, // 10 Minutes
  })
);
app.use(flash());
app.use((req, res, next) => {
  res.locals.error = req.flash("error");
  res.locals.success = req.flash("success");
  next();
});

/* Result Route */

app.use(results);

/* Server */

let http = require("http");
let server = express().use("/", app);
http.createServer(server).listen(port, () => {
  console.log("Listening on " + port);
});
