export default {
    commandName: 'PWD',
    handler: async ({ socket, fs }, write) => {
        write(socket, fs.pwd());
    }
}