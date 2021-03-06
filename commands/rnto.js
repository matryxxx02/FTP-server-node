export default {
    commandName: 'RNTO',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.rnto(message);
        } catch (error) {
            res = error;
        }
        write(socket, "250 Rename successful");
    }
}