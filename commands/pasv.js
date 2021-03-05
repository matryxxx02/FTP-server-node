import Passive from '../connectorType/Passive.js'
export default {
    commandName:'PASV',
    handler: ( { socket }, write ) => {
        const passiveConnector = new Passive();
        write(socket, passiveConnector.pasv());
    }
}