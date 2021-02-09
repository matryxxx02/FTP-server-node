import { createServer } from 'net';
import { Worker } from 'worker_threads';


export default class Server {

    constructor() {
        this.server = createServer(async socket => await this.clientConnected(socket).catch(err => console.error({err})));
        this.server.listen(process.env.PORT, () => console.log('Server created'));
    }

    clientConnected(socket) {
        return new Promise((resolve, reject) => {
            const worker = new Worker('./modules/clientConnected.js', { workerData });
            worker.on('message', resolve);
            worker.on('error', reject);
            worker.on('exit', (code) => {
                if (code !== 0)
                    reject(new Error(`Worker stopped with exit code ${code}`));
            })
        })
    }

    init(socket) {
        this.socket = socket;
        console.log('Client connected');
        socket.on('data', (data) => {
            
            const is_kernel_buffer_full = this.serverResponse(data, socket);
            if (is_kernel_buffer_full) {                
                console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
            }else{
                socket.pause();
            }
        })
        socket.on('end', () => console.log('Closed'));
        this.handShake(socket);
    }

    serverResponse(data, socket) {
        let response;
        console.log(data.toString());
        switch (data.toString().split(" ")[0]) {
            case "AUTH":
                response = "530 Please login with USER and PASS.\n";
                break;
            case "USER":
                
            case "PASS" :
            case "PWD" :
            case "CWD" :
            case "CDUP":
            case "LIST":
            default:
                response = "530 Oh shit ."
                
        }
        return socket.write(response);
    }

    async handShake(socket) {
        socket.write('220 FTP server (vsftpd)\n');
    }
}