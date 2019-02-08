const mongoose = require('mongoose');

const QuestionSchema = new mongoose.Schema ({
    content: {
        type: String
    }
});

const Question = mongoose.model('Question', QuestionSchema);

module.exports = Question;