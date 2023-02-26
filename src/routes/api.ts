import express, {NextFunction, Request, Response} from "express";

const router = express.Router();

//router.use('/', require('./auth'));
// router.use('/conversations', require('./conversation'));
// router.use('/messages', require('./message'));

const posts = [
    {
        id: 1,
        author: "Lilian",
        title: "Stock market",
        body: "Post 1",
    },

    {
        id: 2,
        author: "Tom",
        title: "Covid 19",
        body: "Post 2",
    },

    {
        id: 3,
        author: "Vincent",
        title: "Django APIs",
        body: "Post 3",
    },

    {
        id: 4,
        author: "Cindy",
        title: "Node.js Streams",
        body: "Post 4",
    },
];
router.get("/posts", function (req: Request, res: Response, next: NextFunction) {
    res.json({"status": "success", data: posts});
});

module.exports = router;