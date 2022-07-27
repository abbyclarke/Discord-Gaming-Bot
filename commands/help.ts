import { Message } from 'discord.js'


export default {
    callback: (message: Message, ...args: string[]) => {
        
        message.reply('!help\n!hello\n!add\n!ping\n!gif\n!game')
    }
}