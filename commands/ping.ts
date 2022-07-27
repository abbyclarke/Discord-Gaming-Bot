import { Message } from 'discord.js'


export default {
    callback: ( message: Message ) => {
        message.reply('pong!')
        
    }
}


