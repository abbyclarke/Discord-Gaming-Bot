import DiscordJS, { Intents } from 'discord.js'
import mongoose from 'mongoose'
import 'dotenv/config'


export const client = new DiscordJS.Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.on('ready', () => {
    console.log('The bot is ready')
})

client.on('ready', async() => {
    await mongoose.connect(process.env.MONGODB_CONNECT_STRING || '', {
        keepAlive: true,
        
    })
    
    let handler = require('./command-handler')
    if (handler.default) handler = handler.default
    handler(client)
})




client.login(process.env.TOKEN)