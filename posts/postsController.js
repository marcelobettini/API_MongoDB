const Post = require("./postModel")

//POST NEW BLOG ENTRY
const createPost = (req, res, next) => {
    const newPost = new Post({ ...req.body }); //nueva instancia del modelo de User
    newPost.save((error) => {
        if (error) {
            next(error);
        } else res.status(200).send("new post saved");
    });
};

//find by title (option 1)
const searchTitleByText = (req, res) => {
    const { query } = req.params
    Post.find({ $text: { $search: query } }, (err, result) => {
        if (err) return res.send(err)
        return res.send(result)
    })
}


module.exports = { createPost, searchTitleByText }