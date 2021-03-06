export default {
    commandName: 'LIST',
    handler: async ({ socket, message, fs, commands}, write) => {
        let res;
        try {
            res = await fs.list(message);
        } catch (error) {
            res = error;
        }
        //await write(socket, "150 Here comes the directory listing.");
        socket.write(`150 Here comes the directory listing.\r\n`);
        console.log("ojfgidghdjgkfdghdfjk");
        //await write(commands.connector.dataSocket, res);
        setTimeout(()=> commands.connector.dataSocket.write(res + "\r\n"), 1000)
        //write(socket, "226 Directory send OK.");
        // commands.connector.dataSocket.write(res+"\r\n");
        // await write(socket, "226 Directory send OK.");
    }
}