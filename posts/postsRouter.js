const { createPost, searchTitleByText } = require("./postsController")

const router = require("express").Router()
router.post("/", createPost)
router.get("/find/:query", searchTitleByText)

module.exports = router