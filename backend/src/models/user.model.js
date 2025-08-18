const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    username: {
        type:String,
        required: true,
        unique:true,
        trim: true
    },
    password: {
        type: String,
        required:true,
        minLength:6
    }, 
    // token:{
    //     type: String
    // }
});

//Password Hashed middleware

userSchema.pre("save", async function (next) {
    if(!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(5);
    this.password = await bcrypt.hash(this.password, salt);
    next();
});

//Match User Password with the hashed password

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password); 
      
};

userSchema.set("toJSON", {
    virtuals: true,
    transform: function (doc, ret) {
        delete ret.password;
        delete ret.__v;
        return ret;
    }
});

userSchema.set("toObject", { virtuals: true });

module.exports = mongoose.model("User", userSchema);