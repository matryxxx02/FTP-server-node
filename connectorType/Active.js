import { Socket } from 'net'
export default class Active extends ConnectorMode {
    constructor(connection) {
        super(connection)
    }

    prepareConnection = ({host, port}) => {
        this.dataSocket = new Socket();
        this.dataSocket.connect({ host, port }, () => {
            console.log("connected to active mode")
        })
    }
    
    waitConnection = () => {}
    
}