export default {
    commandName:'USER',
    handler: ({socket, message, connection}, write) => {
        let response;
        if (message && message.toLowerCase() === 'anonymous') {
            connection.authent("anonymous", "");
            response = '230 Login successful.';
        } else {
            response = '530 This FTP server is anonymous only.';
        }
        write(socket, response);
    }
}