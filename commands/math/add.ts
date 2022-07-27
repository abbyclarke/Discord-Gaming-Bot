import { Message } from 'discord.js'

export default {
    callback: (message: Message, ...args: string[]) => {
        let sum = 0

        for (let arg of args) {
            if (!isNaN(parseInt(arg))) {
                sum += parseInt(arg)
            }
        }

        message.reply(`The sum is ${sum}`)
    }
}