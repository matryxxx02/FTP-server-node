export const user = {
    commandName:'USER',
    handler: ({socket, message}, write) => {
        let response;
        if (this.authenticated) {
            response = `530 Can't change from guest user.`;
        } else if (message && message.toLowerCase() === 'anonymous') {
            this.authent("anonymous", "");
            response = '230 Login successful.';
        } else {
            response = '530 This FTP server is anonymous only.';
        }
        write(socket, response);
    }
}