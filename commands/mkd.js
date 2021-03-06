export default {
    commandName: 'MKD',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.mkd(message);
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}
