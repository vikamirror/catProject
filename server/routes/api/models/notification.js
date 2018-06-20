import mongoose from 'mongoose';

mongoose.Promise = global.Promise;

const schemaOptions = { _id: false, capped: {size: 1024, max: 50} };

const NotifyItemSchema = new mongoose.Schema({
    cuid: {type: String, required: true, unique: true},
    // messageFrom: {
    //     memberCuid: {type: String, required: true},
    //     name: {type: String, required: true},
    //     avatar: {type: String, required: true},
    // },
    messageFrom: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Member',
        required: true,
    },
    message: {type: String, required: true},
    link: {
        pathname: {type: String},
        state: {type: Object}
    },
    dateAdded: {type: Date, default: Date.now, required: true},
}, schemaOptions);

const NotificationSchema = new mongoose.Schema({
    memberCuid: {type: String, required: true},
    notifications: [NotifyItemSchema],
});

export default mongoose.model('Notification', NotificationSchema);