import { workerData } from 'worker_threads';

function serverResponse(data, socket) {
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

async function handShake(socket) {
    socket.write('220 FTP server (vsftpd)\n');
}

console.log('Client connected');
console.log(TAMERE)
workerData.on('data', (data) => {
    const is_kernel_buffer_full = serverResponse(data, workerData);
    if (is_kernel_buffer_full) {                
        console.log('Data was flushed successfully from kernel buffer i.e written successfully!');
    }else{
        workerData.pause();
    }
})
workerData.on('end', () => console.log('Closed'));
handShake(workerData);

