//todo : implement with registry of command
import registry from "./commandsRegistry"

class CommandsFTP {
    constructor() {
    }

    parseClientResponse(){
        const dataArray = data.toString().replace(/\n|\r/g, '').split(" ");
        return {
            command: dataArray[0],
            message: dataArray.length > 1 ? dataArray[1] : "" 
        }
    }

    executeCommand(req) {
        const clientRequest = this.parseClientResponse(req);
        const command = registry[clientRequest.command];
        console.log(command)
        command.executeCommand();
    }
}