const {Schema, model} = require('mongoose')

const plantSchema = new Schema ({
    id: {
        type:String,
        required:true,
        unique:true
    },
    name: {
        type:String,
        required:true,
        unique:true
    },
    latin_name: {
        type:String,
    },
    description: {
        type:String,
        required:true,
    },
    care_detail: {
        type:String,
        required:true,
    },
    ease_of_care: {
        type: String,
        enum: ["Easy", "Medium", "Difficult"],
        required:true,
    },
    outdoor_or_indoor: {
        type: String,
        enum: ["Indoor", "Outdoor", "Outdoor/Indoor"],
        required:true,
    },
    origin: {
        type:String,
        required:true,
    },
    image: {
        type:String,
        required:true,
    }

})

const Plant = model("Plant", plantSchema)

module.exports = Plant