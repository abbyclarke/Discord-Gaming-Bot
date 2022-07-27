import mongoose from 'mongoose'

const gameSchema = new mongoose.Schema({
    name: {type: String, required: true},
    numPlayers: {type: Number, required: true, min: 1},
    vs: {type: String, required: true, enum: ["pvp", "pve", "both"]}
})

export default mongoose.model('games', gameSchema)