export default {
    commandName: 'STOR',
    handler: async ({ socket, message, fs, commands}, write) => {
        
        socket.write(`150 Opening ASCII mode data connection for ${message}.\r\n`);
        setTimeout( async () => {
            //console.log(commands.connector.dataSocket);
            // await write(commands.connector.dataSocket,"")
            commands.connector.dataSocket.on('data', buffer => {
                //console.log(buffer)
                fs.stor(message, buffer).then((res) => {
                    console.log(res)
                    write(socket, "226 Transfer complete.");
                }).catch((err) => {
                    console.error(err)
                });
            });
            // commands.connector.destroyDataSocket()
        }, 500);
    }
}