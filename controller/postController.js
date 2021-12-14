import post from "../schema/postSchema.js";

export const createPost = async (req, res) =>
{
    try {
        const data = await post.create(req.body);
        res.status(200).json('blog saved successfully');
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getAllPosts = async (req, res) =>
{
    const username = req.query.username;
    const category = req.query.category;
    let posts;
    try {
        if (username)
            posts = await post.find({ username: username });
        else if (category)
            posts = await post.find({ categories: category });
        else
            posts = await post.find();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const getPost = async (req, res) =>
{
    try {
        const postData = await post.findById(req.params.id);
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const updatePost = async (req, res) =>
{
    try {
        const updatedData = await post.findByIdAndUpdate(req.params.id, { $set: req.body });
        res.status(200).json(updatedData);
    } catch (err) {
        res.status(500).json(err.message);
    }
}

export const deletePost = async (req, res) =>
{
    try {
        const data = await post.findByIdAndDelete(req.params.id);
        res.status(200).json(data);
    } catch (err) {
        res.status(500).json(err.message);
    }
}
