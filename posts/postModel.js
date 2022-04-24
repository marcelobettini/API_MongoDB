const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PostSchema = new Schema({
    title: { type: String, required: true },
    body: { type: String, required: true },
    date:
    {
        type: Date,
        default: Date.now
    },
    comments: [{
        body: String, date: Date
    }],
    hidden: Boolean,
    meta: {
        votes: Number,
        favs: Number
    }
},
    { timestamps: true },

);
PostSchema.index({ title: 'text' }) //create an index in order to "find by title" at posts/find/:query endpoint

const Post = mongoose.model("Post", PostSchema)
module.exports = Post



