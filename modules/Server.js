import { createServer } from 'net';
import FileSystem from './FileSystem.js';
import { write } from "../utils/responseUtils";
import authent from './AuthentFTP.js'

export default class Server {

    constructor() {
        this.server = createServer(socket => this.init(socket));
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    async init(socket) {
        console.log('Client connected');
        const data = await write(socket, '220 FTP server (vsftpd)');
        const fs = new FileSystem();
        this.connected = await authent.serverResponse(data, socket)
        this.serverResponse(data, socket, fs);
        socket.on('end', () => console.log('Closed'));
    }

    async serverResponse(data, socket, fs) {
        let response;
        const dataArray = data.toString().replace(/\n|\r/g, '').split(" ");
        //TODO : FTP commands
        switch (dataArray[0]) {
            case "AUTH":
                response = "530 Please FTPConnection with USER and PASS.";
                break;
            case "USER":
                response = this.userCmd(dataArray);
                break;
            case "PASS":
                response = this.passCmd();
                break;
            case "PWD":
            case "CWD":
            case "CDUP":
            case "LIST":
                response = await fs.list();
            case "PASV":
                response = this.pasv();
                break;
            default:
                response = "Server error"
                break;

        }
        const clientResponse = await write(socket, response);
        this.serverResponse(clientResponse, socket);
    }

    pasv() {
        //serveur qui ecoute sur le portData
        const serverData = createServer(socket => write(socket, this.data));
        serverData.listen(0, () => console.log('Server data created'));
        const portData = serverData.address().port;
        const response = `227 Entering passive mode (127,0,0,1,${Math.floor(portData / 256).toString()},${Math.floor(portData % 256).toString()})`
        console.log(portData, response);
        return response;
    }
}