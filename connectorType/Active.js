import { Socket } from 'net'

/**
 * Active connection mode
 * @class
 */
export default class Active extends ConnectorMode {

    /**
     * @param {ConnectionFTP} connection 
     */
    constructor(connection) {
        super(connection)
    }

    /**
     * Prepares new connection
     * @param {object} options {host, port} 
     */
    prepareConnection = ({ host, port }) => {
        this.dataSocket = new Socket();
        this.dataSocket.connect({ host, port }, () => {
            console.log("connected to active mode")
        });
    }

    waitConnection = () => { }

}