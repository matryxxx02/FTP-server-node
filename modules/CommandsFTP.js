import registry from "./commandsRegistry"
import { write } from '../utils/responseUtils.js'
import FileSystem from "./FileSystem";

/**
 * Creates a new FTP commands manager
 * @class
 */
export default class CommandsFTP {

    /**
     * @param {ConnectionFTP} connection 
     */
    constructor(connection) {
        this.commandHistory = {};
        this.connection = connection;
        this.fs = new FileSystem();
        this.commandWithoutAuthent = ["user", "pass"];
    }

    /**
     * Parsing client responses and returning custom object representation
     * @param {buffer} data 
     * @returns {object} {command, message}
     */
    parseClientResponse = (data) => {
        const dataArray = data.toString().replace(/\n|\r/g, '').split(" ");
        return {
            command: dataArray[0].toLowerCase(),
            message: dataArray.length > 1 ? dataArray[1] : ""
        }
    }

    /**
     * Executes command received and parsed from the client
     * @param {string} req 
     */
    executeCommand = (req) => {
        const clientRequest = this.parseClientResponse(req);
        const command = registry[clientRequest.command];

        if (this.canExecute(clientRequest) && command) command.handler({
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

    canExecute = (clientRequest) => {
        return (this.connection.authenticated || this.commandWithoutAuthent.includes(clientRequest.command))
    }
}