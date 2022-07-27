import { Message } from 'discord.js'
import gameSchema from '../../schema'


export default {
    callback: ( message: Message ) => {
        message.reply('How many players? Would you like PVP, PVE, or both?')
        let channel = message.channel

        let filter = (newMessage: Message) => {
            return newMessage.author.id === message.author.id
        }
        
        const collector = channel.createMessageCollector({
            filter,
            max: 1,
            time: 1000 * 20
        })

        collector.on('collect', message => {
            console.log(message.content)
        })

        collector.on('end', async collected => {
            if (collected.size === 0) {
              message.reply('You did not answer.')  
              return
            }

            let response = ''

            collected.forEach((message) => {
                response += `${message.content}\n`
            })

            let responseLower = response.toLowerCase()
            let responseInt = parseInt(response)
            if (isNaN(responseInt)) {
                for (let i = 0; i < response.length; i++) {
                    if (response[i] !== ' ' && !isNaN(parseInt(response[i]))) {
                        responseInt = parseInt(response[i])
                    }
                }
            }
            
            
            
            let gameType = ''
            let gameType2 = ''

            if (responseLower.includes('pvp')) {
                console.log('pvp!')
                gameType = 'pvp'
                gameType2 = 'pvp'
            } else if (responseLower.includes('pve')) {
                console.log('pve!')
                gameType = 'pve'
                gameType2 = 'pve'
            } else if (responseLower.includes('both')) {
                gameType = 'pvp'
                gameType2 = 'pve'
            } 
            
            
            try {
            let findGame = await gameSchema.find({
                $and: [
                    {numPlayers: {$gte: responseInt}},
                    {vs: { $in: [gameType, gameType2]}}
                ]
                })
            let numberMatched = findGame.length
            
            if(numberMatched === 0){
                message.reply('Could not find a match.')
            } else {

            let randomNum = Math.floor(Math.random() * numberMatched)
            console.log(findGame)
            message.reply(findGame[randomNum].name) 
            }
            } catch (err) {
                console.log(err)
            }
        })

        
    }
}
