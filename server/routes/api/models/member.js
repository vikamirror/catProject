import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

// const Schema = mongoose.Schema;

// const favoritePostsSchema = new mongoose.Schema({
//     postCuid: { type: String, required: true },
//     dateAdded: { type: Date, default: Date.now, required: true },
// }, { _id : false});

const MemberSchema = new mongoose.Schema({
    email: { type: 'String' },
    facebookID: { type: 'String' },
    password: { type: 'String' },
    name: { type: 'String' },
    mobile: { type: 'String' },
    address: { type: 'String' },
    avatar: { type: 'String' },
    cuid: { type: 'String', required: true, unique: true },
    // favoritePosts: [favoritePostsSchema],
    favoritePosts: [
        { type: mongoose.Schema.Types.ObjectId, ref: 'Post',required: true },
    ],
    dateAdded: { type: 'Date', default: Date.now, required: true },
});

export default mongoose.model('Member', MemberSchema);