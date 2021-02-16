import fs from 'fs/promises';

export default class FileSystem {

    constructor() {
        this.path = './root/';
    }

    pwd() {
        return this.path.slice(6);
    }

    async list() {
        try {
            const nodes = await fs.readdir(this.path);
            const formatted = await Promise.all(nodes.map(async node => {
                const stat = await fs.stat(`${this.path}${node}`);
                const permissions = '0' + (stat.mode & parseInt('777', 8)).toString(8);
                const type = stat.isDirectory() ? 'd' : '-';
                return `${type} ${permissions} ${node}`;
            }));
            return formatted.join('\n');
        } catch ({ message }) {
            console.log(message);
        }
    }
}

// const f = new FileSystem();

// (async () => {
//     console.log(await f.list())
// })();