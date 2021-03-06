export default {
    commandName: 'TYPE',
    handler: async ({ socket, message, connection }, write) => {
        if (/^I$/i.test(message)) {
            connection.transferMode = 'Binary';
        } else if (/^A[0-9]?$/i.test(message)) {
            connection.transferMode = 'ASCII';
        } else {
            return write(socket, `501 Syntax error in parameters or arguments`);
        }
        
        write(socket, `200 Switching to ${connection.transferMode} mode.`);
    }
}