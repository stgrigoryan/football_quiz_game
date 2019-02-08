const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema ({
    content: {
        type: String
    },
    queueNumber: {
        type: Number
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;