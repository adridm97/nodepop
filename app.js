var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const utils = require("./lib/utils");
var indexRouter = require("./routes/index");
var usersRouter = require("./routes/users");
const session = require("express-session");
const LoginController = require("./controllers/loginController");
const jwtAuth = require("./lib/jwtAuthMiddleware");
const MongoStore = require("connect-mongo");
var app = express();
//Conectamos a la base de datos:
require("./lib/connectMongoose");
require("dotenv").config();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "html");
app.engine("html", require("ejs").__express);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

const loginController = new LoginController();
// Setup de i18n
const i18n = require("./lib/i18nConfigure");
app.use(i18n.init);
// Setup de sesiones del Website
app.use(
  session({
    name: "nodeapi-session",
    secret: "C2=2]Apw`PbSn*7)`UfrLPELHhd%f",
    saveUninitialized: true,
    resave: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2 dias de inactividad
    },
    store: MongoStore.create({
      mongoUrl: process.env.MONGODB_CONNECTION_STRING,
    }),
  })
);

// hacemos disponible la sesión en todas las vistas
app.use((req, res, next) => {
  res.locals.session = req.session;
  next();
});

/**
 * Rutas de mi API
 */

app.use(express.static(__dirname + "/public"));
app.use("/images", express.static("images"));
app.use("/api/anuncios", jwtAuth, require("./routes/api/anuncios"));
app.post("/api/anuncios", require("./routes/api/anuncios"));

app.post("/api/login", loginController.postJWT);
app.use("/change-locale", require("./routes/change-locale"));
app.use("/tags", require("./routes/api/tags"));
app.use("/", indexRouter);
app.use("/users", usersRouter);

// Usamos el concepto de controladores
app.get("/login", loginController.index);
app.post("/login", loginController.post);
app.get("/logout", loginController.logout);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404)); // paso
});

// error handler
app.use(function (err, req, res, next) {
  // es un error de validación?
  if (err.array) {
    const errorInfo = err.array({ onlyFirstError: true })[0];
    err.message = `Not valid - ${errorInfo.param} ${errorInfo.msg}`;
    err.status = 422;
  }

  res.status(err.status || 500);

  if (isAPIRequest(req)) {
    res.json({ error: err.message });
    return;
  }

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.render("error");
});

function isAPIRequest(req) {
  return req.originalUrl.indexOf("/api/") === 0;
}

module.exports = app;
