export default {
    commandName: 'CDUP',
    handler: ({ socket, fs }, write) => {
        let res;
        try {
            res = fs.cdup();
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}