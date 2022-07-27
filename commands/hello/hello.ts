import { Message } from 'discord.js'

export default {
    callback: (message: Message, ...args: string[]) => {
        let someMessages:string[] = ["Hello", "Hi", "Howdy", "Hey", "Oh look who it is...", "Stop pinging me,", "Yes, I'm here"]
        let randomMessage = someMessages[Math.floor(Math.random() * someMessages.length)]

        let gif:string[] = ['https://giphy.com/embed/vFKqnCdLPNOKc', 'https://giphy.com/embed/Cmr1OMJ2FN0B2', 'https://giphy.com/embed/dzaUX7CAG0Ihi']
        let randomGif = gif[Math.floor(Math.random() * gif.length)]

        message.reply(`${randomMessage} ${message.author} ${randomGif}`)
    }
}