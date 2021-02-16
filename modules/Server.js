import { createServer } from 'net';


export default class Server {

    constructor() {
        this.server = createServer(socket => this.init(socket));
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    async init(socket) {
        console.log('Client connected');
        this.login = null;
        this.password = null;
        this.connected = false;
        const data = await this.write(socket, '220 FTP server (vsftpd)');
        this.serverResponse(data, socket);
        socket.on('end', () => console.log('Closed'));
    }

    async serverResponse(data, socket) {
        let response;
        const dataArray = data.toString().replace(/\n|\r/g,'').split(" ");
        switch (dataArray[0]) {
            case "AUTH":
                response = "530 Please login with USER and PASS.";
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
                this.data = "COUCOUC";
                response = "150 Here comes the directory listing."
                break;
            case "PASV":
                response = this.pasv();
                break;
            default:
                response = "Server error"
                break;

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

    userCmd(data) {
        if (this.connected) {
            return `530 Can't change from guest user.`;
        } else if (data[1] && data[1].toLowerCase() === 'anonymous') {
            this.login = data[1].toLowerCase();
            return '331 Please specify the password.';
        } else {
            return '530 This FTP server is anonymous only.';
        }
    }

    passCmd() {
        if (this.connected) {
            return '230 Already logged in.';
        } else if (this.login == null) {
            return '503 Login with USER first.';
        } else if (this.login == 'anonymous') {
            this.connected = true;
            this.password = "";
            return '230 Login successful.';
        }
    }

    pasv() {
        const portData = Math.floor((Math.random() * (5543)) + 60000);
        const response = `227 Entering passive mode (127,0,0,1,${Math.floor(portData / 256).toString()},${Math.floor(portData % 256).toString()})`
        //serveur qui ecoute sur le portData
        const serverData = createServer(socket => this.write(socket, this.data));
        serverData.listen(portData, () => console.log('Server data created'));
        return response;
        
    }
}