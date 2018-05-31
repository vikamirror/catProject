import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const MessageSchema = new mongoose.Schema({
    cuid: {type: String, required: true},
    postCuid: {type: String, required: true},
    member: {
        cuid: {type: String, required: true},
        name: {type: String, required: true},
        avatar: {type: String, required: true},
    },
    tag: {
        name: {type: String, required: true},
        memberCuid: {type: String, required: true},
    },
    message: {type: String, required: true},
    dateAdded: {type: Date, default: Date.now, required: true}
});

export default mongoose.model('Message', MessageSchema);