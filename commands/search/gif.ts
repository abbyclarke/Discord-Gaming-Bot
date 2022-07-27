import { Message } from 'discord.js'
import axios from 'axios'
import 'dotenv/config'

export default {
    callback: async (message: Message, ...args: string[]) => {
        let length:number = args.length
        let searchQuery:string = ''
        for (let index = 0; index < length; index++) {
            if (index === length - 1) {
                searchQuery += args[index]
            } else {
                searchQuery += args[index]
                searchQuery += ' '
            }
        }
        if (searchQuery.length === 0) {
            message.reply('Tell me what you want to search for after "gif!" command.')
        }

        let apiKey = process.env.GIPHYKEY
        let base = 'http://api.giphy.com/v1/gifs/search'
        let uri = `${base}?api_key=${apiKey}&q=${encodeURIComponent(searchQuery)}`
        let response = await axios.get(uri)
        let gif = response.data.data

        
        if (gif && searchQuery.length > 0) {  
            
            let truncated = false
            if (gif.length > 20) {
                gif.length = 20
                truncated = true
            }

            let randomNum: number = Math.floor(Math.random() * (gif.length))

            message.reply(gif[randomNum].url)
            
        }
              
     
    }
}