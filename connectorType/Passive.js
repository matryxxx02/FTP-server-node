import ConnectorMode from './ConnectorMode'
import { createServer } from 'net';

export default class Passive extends ConnectorMode {
    constructor(connection) {
        super(connection)
        this.prepareConnection()
    }

    prepareConnection = () => {
        const serverData = createServer(socket => this.setupDataSocket(socket));
        serverData.listen(0, () => console.log('Server data created'));
        const portData = serverData.address().port;
        this.pasv = `227 Entering passive mode (127,0,0,1,${Math.floor(portData / 256).toString()},${Math.floor(portData % 256).toString()})`
        console.log(portData);
    }

    setupDataSocket = (socket) => {
        console.log('client connected to data pipe')
        this.dataSocket = socket;
    }

    waitConnection = () => {
        setTimeout(() => {
            
        }, 5000)
    }

    checkSocket = () => {
        if (this.dataSocket) {
            return this.dataSocket
            clearInterval(this.pendingConnection)
        }

    }
}