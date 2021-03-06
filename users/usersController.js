const User = require("./usersModel");
const bcrypt = require("bcrypt")
const saltRounds = 10;
const jwt = require("jsonwebtoken");

//GET ALL USERS
const getAllUsers = (req, res, next) => {
    User.find()
        .then((data) => {
            res.json(data);
            // res.status(500).next(error);
        })
        .catch((error) => next(error));
};

// ---------------------------------------------------
//GET USER BY ID
//async/await function
const getUserById = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id);
        res.json(user);
    } catch (err) {
        err.status = 404;
        next(err);
    }
};
//Promise based function
// const getUserById = (req, res, next) => {
//   User.findById(req.params.id)
//     .then((data) => {
//       res.send(data);
//     })
//     .catch((error) => {
//       error.status = 404;
//       next(error);
//     });
// };
// ----------------------------------------------------------

//POST NEW USER
const createUser = async (req, res, next) => {
    const { fullName, userName, email } = req.body;
    const password = await bcrypt.hash(req.body.password, saltRounds);
    const data = { fullName, userName, email, password };
    console.log(password)
    const newUser = new User(data); //nueva instancia del modelo de User
    newUser.save((error) => {
        if (error) {
            next(error);
        } else res.status(200).send("new user saved");
    });
};

// ----------------------------------------------------------

//UPDATE USER
const updateUser = async (req, res, next) => {
    try {
        await User.findByIdAndUpdate(req.params.id, req.body, { new: true }); //recibe el id y los campos que deseo actualizar devuelve el nuevo
        res.json({ message: "Usuario actualizado" });
    } catch (error) {
        res.status(404).next(error);
    }
};

//---------------------------------------------------------

//DELETE USER
const deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id);
        res.status(202).json({ user: user.id, message: "Usuario borrado" });
    } catch (error) {
        error.status = 404;
        next(error);
    }
};

//---------------------------------------------------------

//LOGIN USER
const loginUser = async (req, res, next) => {
    const user = await User.find().where({ userName: req.body.userName })

    if (!user.length) {
        return res.status(401).json({ access: "rejected" })
    }
    const hashedPassword = user[0].password;
    const match = await bcrypt.compare(req.body.password, hashedPassword)
    //as?? estar?? antes de usar auth con JWT... solo comprobar?? login correcto
    // match ? res.json({ access: "granted" }) : res.status(401).json({ access: "rejected" });
    //no damos info sobre el campo del error, para darle m??s trabajo a los hackers, por eso
    // suele verse "usuario o contrase??a incorrectos" en vez de dar m??s precisiones

    //Aqu?? entra JWT auth
    if (!match) {
        return res.status(401).json({ access: "rejected" })
    }
    const accessToken = generateAccessToken(user[0])
    res.status(200).send({ accessToken, user: user[0].userName, access: "granted with Token" })

}

const generateAccessToken = (user) => {
    const userForToken = {
        userName: user.userName,
        id: user.id
    }
    return jwt.sign(userForToken, process.env.JWT_SECRET, { expiresIn: '1h' });

}

const verifyAccessToken = (req, res, next) => {
    const token = req.headers.authorization.split(" ").pop()
    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
            if (err) return res.status(401).json({ access: "rejected- invalid token" })
            req.decoded = decoded;
            next()
        })
    } else {
        res.status(401).json({ message: "no token provided" })
    }
}


module.exports = {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser,
    loginUser,
    verifyAccessToken
};