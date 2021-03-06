export default {
    commandName:'PASS',
    handler: ({socket, connection, message}, write) => {
        let response;
        if (connection.authenticated) {
            response = '230 Already logged in.';
        } else {
            response = '503 Login with USER first.';
        }
        write(socket, response);
    }
}