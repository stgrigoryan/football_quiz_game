const mongoose = require('mongoose');

const AnswerSchema = new mongoose.Schema ({
    question: {
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'question'
    },
    answer: {
        type: String
    },
    correct: {
        type: Boolean
    }
});

const Answer = mongoose.model('Answer', AnswerSchema);

module.exports = Answer;