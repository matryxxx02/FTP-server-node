import { createServer } from 'net';

export default class Server {

    constructor() {
        this.server = createServer(socket => this.init(socket));
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    init(socket) {
        this.socket = socket;
        console.log('Client connected');
        socket.on('data', (data) => {
            console.log('Data sent to server : ' + data);

            //echo data
            const is_kernel_buffer_full = socket.write('Data ::' + data);
            if(is_kernel_buffer_full){
                console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
            }else{
                socket.pause();
            }
        })
        socket.on('end', () => console.log('Closed'));
        this.handShake(socket);
    }

    async handShake(socket) {
        socket.write('220 FTP server (vsftpd)\n');
    }
}