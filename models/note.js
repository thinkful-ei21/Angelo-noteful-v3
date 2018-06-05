const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title: {type: String, required: true},
    content: {type: String}
});

noteSchema.set('timestamps', true);

noteSchema.set('toObject', {
    transform: function(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
    }
});

const Note = mongoose.model('Note', noteSchema, 'notes');

module.exports = { Note };