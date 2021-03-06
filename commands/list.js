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
        console.log(commands.connector.dataSocket);
        await commands.connector.dataSocket.write("drwxr-xr-x   31 997      997          4096 Mar 06 11:47 cdimage\r\n", () => {
            console.log("send")
        });
        //setTimeout(()=> commands.connector.dataSocket.write(res + "\r\n"), 1000)
        //write(socket, "226 Directory send OK.");
        // commands.connector.dataSocket.write(res+"\r\n");
        await write(socket, "226 Directory send OK.");
    }
}