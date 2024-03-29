import express, {NextFunction, Request, Response} from "express";
import HttpStatusCodes from "./constants/HttpStatusCodes";
import {RouteError} from "./errors/RouteError";
import {deserializeUser} from "./middleware";

const createError = require('http-errors');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require("body-parser");
const rateLimit = require("express-rate-limit");
const indexRouter = require('./routes/index');
const api = require("./routes/api");

const app = express();
app.use(deserializeUser);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use('/uploads', express.static('uploads'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
if (typeof bodyParser.urlencoded !== "undefined") app.use(bodyParser.urlencoded({extended: true}));
if (typeof bodyParser.raw !== "undefined") app.use(bodyParser.raw({}));
if (typeof bodyParser.json !== "undefined") app.use(bodyParser.json({}));
if (typeof bodyParser.text !== "undefined") app.use(bodyParser.text({}));

//Implement rate limiting
app.use(
    rateLimit({
        windowMs: 60 * 1000, // 12 hour duration in milliseconds
        max: 5,
        message: "You exceeded 5 requests in 60 seconds!",
        standardHeaders: true,
        legacyHeaders: false,
    })
);


// Routes which should handle requests
app.use('/', indexRouter);
app.use("/api", api);

app.use((req: Request, res: Response, next: NextFunction) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
        return res.status(200).json({});
    }
    next();
});

app.use((req: Request, res: Response, next: NextFunction) => {
    next(createError(404));
});

app.use((error: Error, req: Request, res: Response, next: NextFunction) => {
    let status = HttpStatusCodes.BAD_REQUEST;
    if (error instanceof RouteError) status = error.status;

    // set locals, only providing error in development
    res.locals.message = error.message;
    res.locals.error = req.app.get('env') === 'development' ? error : {};

    // render the error page
    if (!req.xhr) res.render('error');
    if (req.xhr) res.status(status).json({message: error.message})

});

module.exports = app;
