import { write } from "../utils/responseUtils";

export default class AuthentFTP {
    constructor(){
        this.login = null;
        this.password = null;
    }

    async serverResponse(data, socket) {
        let response;
        const dataArray = data.toString().replace(/\n|\r/g, '').split(" ");
        switch (dataArray[0]) {
            case "AUTH":
                response = "530 Please FTPConnection with USER and PASS.";
                break;
            case "USER":
                response = this.userCmd(dataArray);
                break;
            case "PASS":
                response = this.passCmd();
                if (response === true)
                    return;
                break;
            default:
                response = "530 Please FTPConnection with USER and PASS.";
        }
        const clientResponse = await write(socket, response);
        this.serverResponse(clientResponse, socket);
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
}