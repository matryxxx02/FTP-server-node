export default {
    commandName: 'RETR',
    handler: async ({ socket, message, fs, commands }, write) => {
        let res;
        try {
            res = await fs.retr(message);
        } catch (error) {
            res = error;
        }

        socket.write(`150 Opening BINARY mode data connection for filename (sizeoffile)\r\n`);
        await commands.connector.dataSocket.write(res);
        await commands.connector.destroyDataSocket();
        await write(socket, "226 Directory send OK.");
    }
}