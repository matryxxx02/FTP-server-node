export default {
    commandName: 'LIST',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.list(message);
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}