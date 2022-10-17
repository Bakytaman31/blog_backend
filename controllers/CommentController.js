import CommentModel from "../models/Comment.js";

export const getComments = async (req, res) => {
    try {
        const comments = await CommentModel.find({post: req.params.id}).populate("user").exec();
        res.json(comments);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: 'Не удалось получить комментарии',
    });
    }
};

export const createComment = async (req, res) => {
    console.log(req.userId)
    try {

        const doc = new CommentModel({
            text: req.body.text,
            post: req.params.id,
            user: req.userId,
        });

        const comment = await doc.save();
        
        res.json(comment);
    } catch (err) {
        console.log(err);
        res.status(500).json({
        message: 'Не удалось создать комментарии',
    });
    }
};