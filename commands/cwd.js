export default {
    commandName: 'CWD',
    handler: async ({ socket, message, fs }, write) => {
        let res;
        try {
            res = await fs.cwd(message);
        } catch (error) {
            res = error;
        }
        write(socket, res);
    }
}