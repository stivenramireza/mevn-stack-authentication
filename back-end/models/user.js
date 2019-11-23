import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const uniqueValidator = require('mongoose-unique-validator');

const roles = {
    values: ['ADMIN', 'USER'],
    message: '{VALUE} role is not valid'
}

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name is required']
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'Password is required']
    },
    date: {
        type: Date,
        default: Date.now
    },
    role: {
        type: String,
        default: 'USER',
        enum: roles
    },
    active: {
        type: Boolean,
        default: true
    }
})

userSchema.plugin(uniqueValidator, { message: 'Error, expected {PATH} to be unique.' });

userSchema.methods.toJSON = function () {
    const obj = this.toObject();
    delete obj.password;
    return obj;
}

const User = mongoose.model('User', userSchema);

export default User;