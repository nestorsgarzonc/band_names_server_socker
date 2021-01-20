const { Schema, model } = require('mongoose')

const MessageSchema = Schema({
    message: {
        type: String,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true });

MessageSchema.method('toJSON', function () {
    const { __v, _id, ...object } = this.toObject();
    return object
})
module.exports = model('Message', MessageSchema)