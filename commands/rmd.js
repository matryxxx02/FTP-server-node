export default {
    commandName: 'RMD',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.rmd(message);
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}