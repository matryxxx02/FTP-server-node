/**
 * Write data to the socket buffer to execute the provided command
 * @param {string} command
 * @return {Promise<String>} Resolving on response from the server
 */
export function write(socket, command) {
    return new Promise(resolve => {
        socket.once('data', buffer => resolve(buffer.toString()));
        socket.write(`${command}\r\n`);
    });
}