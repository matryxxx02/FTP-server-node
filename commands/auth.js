export const auth = {
    commandName:'AUTH',
    handler: (socket, write) => {
        write(socket, "530 Please FTPConnection with USER and PASS.");
    }
}