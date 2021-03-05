export default class Passive extends ConnectorMode {
    constructor(socket) {
        this.socket = socket
    }

    pasv = () => {
        //serveur qui ecoute sur le portData
        const serverData = createServer(socket => write(socket, this.data));
        serverData.listen(0, () => console.log('Server data created'));
        const portData = serverData.address().port;
        const response = `227 Entering passive mode (127,0,0,1,${Math.floor(portData / 256).toString()},${Math.floor(portData % 256).toString()})`
        console.log(portData, response);
        return response;
    }
    
}