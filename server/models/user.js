const Mongoose = require('../database').Mongoose;

const userSchema = new Mongoose.Schema({
    username: {
        type: String,
        required: true,
        index: {
            unique: true,
        },
    },
    description: {
        type: String,
        required: false,
    },
});
const User = Mongoose.model('User', userSchema);
exports.User = User;
