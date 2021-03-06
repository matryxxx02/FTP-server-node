/**
 * Represents connection mode
 * @class
 */
export default class ConnectorMode {

    /**
     * @param {ConnectionFTP} connection 
     */
    constructor(connection) {
        this.connection = connection
    }

    prepareConnection = () => { }

    waitConnection = () => { }

    destroyDataSocket = () => {
        if (this.dataSocket) this.dataSocket.destroy()
    }
}