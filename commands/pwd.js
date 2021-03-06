export default {
    commandName: 'PWD',
    handler: async ({ socket, fs }, write) => {
        console.log(fs.pwd());
        write(socket, fs.pwd());
    }
}