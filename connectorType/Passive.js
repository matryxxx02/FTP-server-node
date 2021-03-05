export default class Passive extends ConnectorMode {
    constructor(socket) {
        this.socket = socket
        const serverData = createServer(socket => write(socket, this.data));
        serverData.listen(0, () => console.log('Server data created'));
        const portData = serverData.address().port;
        this.pasv = `227 Entering passive mode (127,0,0,1,${Math.floor(portData / 256).toString()},${Math.floor(portData % 256).toString()})`
        console.log(portData, response);
    }

    get pasv() { return this.pasv; }

    get pasvSocket() { return this.dataSocket; }
    
}