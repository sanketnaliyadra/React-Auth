import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profilePicture: {
        type: String,
        default: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fstock.adobe.com%2Fsearch%3Fk%3Duser&psig=AOvVaw2EpogSPy8DHcC5sR_yR0z9&ust=1705476072728000&source=images&cd=vfe&ved=0CBMQjRxqFwoTCLCX9c2v4YMDFQAAAAAdAAAAABAE'
    }
}, {timestamps: true});

const User = mongoose.model('User', userSchema);

export default User;