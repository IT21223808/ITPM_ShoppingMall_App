const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    uid: {
        type: String
    },
    userName: {
        type: String,
        required: true
    },
    feedback: {
        type: String,
        required: true
    },
    rating: {
        type: Number
    }
}, {
    timestamps: true
});

const Feedback = mongoose.model("Feedback", feedbackSchema);

module.exports = Feedback;
