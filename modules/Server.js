import { createServer } from 'net';
import { write } from "../utils/responseUtils";
import ConnectionFTP from './ConnectionFTP.js';

/**
 * Creates a new Server instance
 * @class
 */
export default class Server {

    constructor() {
        this.server = createServer(socket => this.initConnection(socket));
        this.connections = {}
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    /**
     * Intialize a new socket connection
     * @param {Socket} socket 
     */
    async initConnection(socket) {
        console.log('Client connected');
        socket.write('220 FTP server (vsftpd)\r\n');
        const connection = new ConnectionFTP(this, socket);
        this.connections[connection.id] = connection;
        socket.on('end', () => console.log('Closed'));
    }

}