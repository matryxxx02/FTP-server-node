export default {
    commandName: 'STOR',
    handler: async ({ socket, message, fs, commands}, write) => {
        
        //await write(socket, "150 Here comes the directory listing.");
        socket.write(`150 Opening ***** mode data connection for world_bob.\r\n`);
        //await commands.connector.dataSocket.write(res);
        //listen
        const fileBuffer = commands.connector.dataSocket.once('data', buffer => console.log(buffer.toString()));
        // let res;
        // try {
        //     res = await fs.stor(message, fileBuffer);
        // } catch (error) {
        //     res = error;
        // }
        // await commands.connector.destroyDataSocket();
        // await write(socket, "226 Transfer complete.");
    }
}