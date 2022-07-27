import { Client } from 'discord.js'
import getFiles from './get-files'

export default (client: Client) => {
    const commands = {} as {
        [key: string]: any
    }
    const suffix = '.ts'

    // get command files in an array
    const commandFiles = getFiles('./commands', suffix)
    console.log(commandFiles)

    for (const command of commandFiles) {
        let commandFile = require(command)
        // check if default property exists
        if (commandFile.default) commandFile = commandFile.default

        //command file path from handler to command, globally replacing \\ with /
        const split = command.replace(/\\/g, '/').split('/')
        // name of file at end of path, allows user to make commands without typing .js/.ts
        const commandName = split[split.length - 1].replace(suffix, '')

        commands[commandName.toLowerCase()] = commandFile
    }

    console.log(commands)

    client.on('messageCreate', (message) => {
        if (message.author.bot || !message.content.startsWith('!')) {
            return
        }

        // splits words into string array, removes first element (!)
        const args = message.content.slice(1).split(/ +/)
        // takes first element of string array out and returns, ensures lower case
        const commandName = args.shift()!.toLowerCase()

        // check commands object to see if command exists
        if (!commands[commandName]) {
            return
        }

        try {
            commands[commandName].callback(message, ...args)
        } catch (error) {
            console.error(error)
        }
    })
}

