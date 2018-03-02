import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const MemberSchema = new mongoose.Schema({
    email: { type: 'String' },
    facebookID: { type: 'String' },
    password: { type: 'String' },
    name: { type: 'String' },
    mobile: { type: 'String' },
    address: { type: 'String' },
    avatar: { type: 'String' },
    cuid: { type: 'String', required: true },
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Member', MemberSchema);