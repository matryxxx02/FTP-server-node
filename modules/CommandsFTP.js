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
        console.log(clientRequest)
        if (command) command.handler({
            socket: this.connection.commandSocket,
            connection: this.connection,
            message: clientRequest.message,
            fs: this.fs,
            commands: this,
            dataSocket: this.dataSocket
        }, write);
        else if (!this.connection.authenticated) write(this.connection.commandSocket, "530 Please login with USER and PASS.")
        else write(this.connection.commandSocket, "500 Unknown command.")
    }
}