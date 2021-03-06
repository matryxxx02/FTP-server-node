import {v4 as uuid} from 'uuid'
import CommandsFTP from './CommandsFTP.js'

export default class ConnectionFTP {
    constructor(server, socket) { 
        this.server = server;
        this.commandSocket = socket;
        this.id = uuid();
        this.commands = new CommandsFTP(this);
        this.authenticated = false;
        this.login = null;
        this.password = null;
        this.transferMode = "";

        //events : 
        this.commandSocket.on('data', (data) => this.commands.executeCommand(data))
    }
    
    authent = (login, pwd) => {
        this.authenticated = true;
        this.login = login;
        this.password = pwd;
    }

}