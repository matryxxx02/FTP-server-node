import Passive from '../connectorType/Passive.js'
export default {
    commandName:'PASV',
    handler: ( { socket, commands }, write ) => {
        commands.connector = new Passive();
        write(socket, commands.connector.pasv);
    }
}