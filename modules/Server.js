import { createServer } from 'net';
import { write } from "../utils/responseUtils";

export default class Server {

    constructor() {
        this.server = createServer(socket => this.initConnection(socket));
        this.connections = {}
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    async initConnection(socket) {
        console.log('Client connected');
        const data = await write(socket, '220 FTP server (vsftpd)');
        const connection = new ConnectionFTP(this, socket);
        this.connections[connection.id] = connection;
        socket.on('end', () => console.log('Closed'));
    }
    
}