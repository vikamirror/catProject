import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const Schema = mongoose.Schema;

// const arrayLimit = val => val.length <= 50;

const LatestMsgTagsSchema = new mongoose.Schema({
    memberCuid: {type: String, required: true},
    tagged: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        required: true,
        unique: true,
        capped : true, size : 42880, max : 50
    }]
});

export default mongoose.model('LatestMsgTags', LatestMsgTagsSchema);
