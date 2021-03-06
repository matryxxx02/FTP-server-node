import { v4 as uuid } from 'uuid'
import CommandsFTP from './CommandsFTP.js'

/**
 * Creates a new FTP connection handler
 * @class
 */
export default class ConnectionFTP {

    /**
     * @param {Server} server 
     * @param {Socket} socket 
     */
    constructor(server, socket) {
        this.server = server;
        this.commandSocket = socket;
        this.id = uuid();
        this.commands = new CommandsFTP(this);
        this.transferMode = "";

        this.authenticated = false;
        this.login = null;
        this.password = null;

        //events : 
        this.commandSocket.on('data', (data) => this.commands.executeCommand(data))
    }

    /**
     * Manages FTP authentication state
     * @param {string} login 
     * @param {string} pwd 
     */
    authent = (login, pwd) => {
        this.authenticated = true;
        this.login = login;
        this.password = pwd;
    }

}