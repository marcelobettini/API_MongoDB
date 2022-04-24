const mongoose = require("mongoose");
// Mongo DB create Schema
// asigning Schema constructor
const Schema = mongoose.Schema;
//creating instance of Schema
const UserSchema = new Schema({
    fullName: { type: String, required: true },
    userName: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
}, {
    timestamps: true, //created & updated At
});

//--------------------------------------
//Luego agregaremos esto, sin borrar nada
//además, instalaremos bcrypt para hacer un hash de cada
//password de los registros (documentos) eso lo vamos a requerir
//en usersController
//No es buena práctica exponer la contraseña...
//_id se mostrará como id... no se mostrará la prop __v
//Reformateamos la response que expone el endpoint
UserSchema.set("toJSON", {
    transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.password;
        delete ret.__v;
    },
});

//-------------------------------------

//Mongo DB model
const User = mongoose.model("User", UserSchema);

module.exports = User;