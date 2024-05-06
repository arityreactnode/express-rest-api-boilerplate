const mongoose = require('mongoose');

const { Schema } = mongoose;

const TokenSchema = new Schema(
    {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        token: { type: String, required: true },
        createdAt: {
            type: Date, default: Date.now, expires: 10
        }
    }
);


const Token = mongoose.model("Token", TokenSchema);

module.exports = Token;