import mongoose from "mongoose";

const {Schema} = mongoose;

const stepSchema = new Schema({
    description: String,
    image: String,
}, {_id: false});

const recipeSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    category : {
        type: String,
        required: true,
    },
    description:{
        type: String,
    },
    mainImage:{
        type: String,
    },
    steps: [stepSchema],
    createAt:{
        type: Date,
        default: Date.now,
    }
});


export default mongoose.model('Recipe', recipeSchema);