const router = require("express").Router();
const {
    getAllUsers,
    getUserById,
    updateUser,
    deleteUser,
    createUser,
    loginUser,
    verifyAccessToken
} = require("./usersController");

router.get("/", verifyAccessToken, getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
module.exports = router;