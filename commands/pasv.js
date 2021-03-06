import Passive from '../connectorType/Passive.js'
export default {
    commandName:'PASV',
    handler: ( { socket, commands, connection }, write ) => {
        commands.connector = new Passive(connection);
    }
}