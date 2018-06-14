import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const requirementsSchema = new mongoose.Schema({
    name: {type: String, required: true},
    desc: {type: String, required: true},
    value: {type: Boolean, required: true}
}, { _id : false });

const PostSchema = new mongoose.Schema({
    cuid: {type: String, required: true, unique: true},
    title: {type: String, required: true},
    cover: {type: String, required: true},
    story: {type: String},
    charactor: {type: String, required: true},
    city: {type: String, required: true},
    district: {type: String, required: true},
    age: {type: String, required: true},
    gender: {type: String, required: true},
    isSpay: {type: Boolean, required: true},
    requirements: [requirementsSchema],
    remark: {type: String},
    contact: {type: String, required: true},
    contactInfo: {type: String, required: true},
    author: {
        name: {type: String, required: true},
        avatar: {type: String, required: true},
        cuid: {type: String, required: true}
    },
    isDeleted: {type: Boolean, default: false, required: true},
    dateAdded: {type: Date, default: Date.now, required: true},
    lastModify: {type: Date, default: Date.now, required: true},
});

export default mongoose.model('Post', PostSchema);