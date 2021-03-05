import registry from "./commandsRegistry"
import { write } from '../utils/responseUtils.js'
export default class CommandsFTP {
    constructor(connection) {
        this.commandHistory = {}
        this.connection = connection;
    }

    parseClientResponse = (data) => {
        const dataArray = data.toString().replace(/\n|\r/g, '').split(" ");
        return {
            command: dataArray[0].toLowerCase(),
            message: dataArray.length > 1 ? dataArray[1] : "" 
        }
    }

    executeCommand = (req) => {
        const clientRequest = this.parseClientResponse(req);
        const command = registry[clientRequest.command];
        console.log(command)
        if (command) command.handler({ socket: this.connection.commandSocket, message: command.message }, write);
        //TODO: reponse si la commande n'existe pas  
        //else write()
    }
}