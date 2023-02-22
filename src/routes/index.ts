import {NextFunction, Request, Response} from "express";

const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function (req: Request, res: Response, next: NextFunction) {
    console.log('Cookies: ', req.cookies)
    // Cookies that have been signed
    console.log('Signed Cookies: ', req.signedCookies)
    res.render('index', {title: 'Express'});
});

module.exports = router;