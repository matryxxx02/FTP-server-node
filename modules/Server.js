import { createServer } from 'net';

export default class Server {

    constructor() {
        this.server = createServer(socket => this.init(socket));
        this.server.listen(21, () => console.log('Server created'));
    }

    init(socket) {
        console.log('Server connected');
        socket.on('end', () => console.log('Closed'));
        this.handShake(socket);
    }

    async handShake(socket) {
        socket.write('220 FTP server (vsftpd)\n');
    }
}