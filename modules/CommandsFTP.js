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

        if (command) command.handler({ socket: this.connection.commandSocket, connection : this.connection, message: clientRequest.message }, write);
        else write(this.connection.commandSocket, "530 notexist")
    }
}