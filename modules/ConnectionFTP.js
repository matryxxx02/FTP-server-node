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

        //events : 
        this.commandSocket.on('data', () => this.commands.executeCommand())
    }
    
    authent = (login, pwd) => {
        this.authenticated = true;
        this.login = login;
        this.password = pwd;
    }

}