import registry from "./commandsRegistry"
import { write } from '../utils/responseUtils.js'
import FileSystem from "./FileSystem";

export default class CommandsFTP {
    constructor(connection) {
        this.commandHistory = {}
        this.connection = connection;
        this.fs = new FileSystem()
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

        if (command) command.handler({
            socket: this.connection.commandSocket,
            connection: this.connection,
            message: clientRequest.message,
            fs: this.fs
        }, write);
        else write(this.connection.commandSocket, "530 notexist")
    }
}