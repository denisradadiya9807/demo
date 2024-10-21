let mongoose = require('mongoose')

const passwordResetSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
    },
    resetToken: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        expires: '1h' // Token will expire after 1 hour
    }
});

module.exports = passwordResetSchema;
