export const pass = {
    commandName:'PASS',
    handler: ({socket, message}, write) => {
        let response;
        if (this.authenticated) {
            response = '230 Already logged in.';
        } else {
            response = '503 Login with USER first.';
        }
        write(socket, response);
    }
}