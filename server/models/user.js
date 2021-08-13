import mongoose from 'mongoose';

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    username: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    profileImg: {type: String},
    galleryImg: {type:[]}
})

export default mongoose.model('User', userSchema);