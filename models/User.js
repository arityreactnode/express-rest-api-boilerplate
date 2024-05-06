const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { toJSON, paginate } = require('./plugins');

const { Schema } = mongoose;

const userSchema = new Schema(
    {
        email: {
            type: String,
            unique: true,
            required: true,
            trim: true,
            lowercase: true,
        },
        password: {
            type: String,
            required: false,
            trim: true,
            minlength: 8,
            private: true,
        },
        fullname: {
            type: String,
            required: false,
        },
        verify: {
            type: Boolean,
            default: false,
            private: true
        },
        profile: {
            type: String,
        },
        active: {
            type: Boolean,
            default: false,
            private: true
        },
        gender: {
            type: String,
            enum: ['male', 'female', 'other'],
        },
        dob: {
            type: Date,
            default: null,
        },
        phone: {
            type: String,
        },

    },
    { timestamps: true }
);

userSchema.plugin(toJSON);
userSchema.plugin(paginate);

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 10);
    }
    next();
});

module.exports = mongoose.model('User', userSchema);