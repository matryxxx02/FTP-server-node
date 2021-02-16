import { createServer } from 'net';
import FileSystem from './FileSystem';

export default class Server {

    constructor() {
        this.server = createServer(socket => this.init(socket));
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    async init(socket) {
        console.log('Client connected');
        const data = await this.write(socket, '220 FTP server (vsftpd)');
        const fs = new FileSystem();
        this.serverResponse(data, socket, fs);
        socket.on('end', () => console.log('Closed'));
    }

    async serverResponse(data, socket, fs) {
        let response;
        switch (data.toString().split(" ")[0]) {
            case "AUTH":
                response = "530 Please login with USER and PASS.";
                break;
            case "USER":
                response = "331 Please specify the password."
            case "PASS":
                response = "230 Login successful."
            case "PWD":
            case "CWD":
            case "CDUP":
            case "LIST":
                response = await fs.list();
            default:
                response = "Server error"

        }
        const clientResponse = await this.write(socket, response);
        this.serverResponse(clientResponse, socket);
    }

    /**
     * Write data to the socket buffer to execute the provided command
     * @param {string} command
     * @return {Promise<String>} Resolving on response from the server
     */
    write(socket, command) {
        return new Promise(resolve => {
            socket.once('data', buffer => resolve(buffer.toString()));
            socket.write(`${command}\r\n`);
        });
    }
}