export default class ConnectorMode {
    constructor(connection) {
        this.connection = connection
    }
    
    prepareConnection = () => { }
    
    waitConnection = () => { }
    
    destroyDataSocket = () => {
        if(this.dataSocket) this.dataSocket.destroy()
    }
}