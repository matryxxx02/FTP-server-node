
export default {
    commandName: 'RNFR',
    handler: async ({ socket, message, fs }, write) => {
        const res = fs.rnfr(message);
        write(socket, "350 File or directory exists, ready for destination name");
    }
}