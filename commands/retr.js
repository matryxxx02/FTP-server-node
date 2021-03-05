export default {
    commandName: 'RETR',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.retr(message);
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}