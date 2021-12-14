import comment from '../schema/commentSchema.js'

export const newComment = async (req, res) =>
{
    try {
        const data = comment.create(req.body);
        res.status(200).json(data);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

export const getComments = async (req, res) =>
{
    try {
        const id = req.params.id;
        const comments = await comment.find({ postId: id });
        console.log(comments);
        res.status(200).json(comments);
    } catch (err) {
        return res.status(500).json(err.message);
    }
}

export const deleteComment = async (req, res) =>
{
    try {
        const data = await comment.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err.message);
    }
}