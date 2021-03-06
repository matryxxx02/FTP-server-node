import fs from 'fs/promises';
import { exec } from 'child_process';

export default class FileSystem {

    constructor() {
        this.path = [];
    }

    buildPath(path) {
        const curPath = this.path.length > 0 ? `/${this.path.join('/')}` : '';
        const endPath = path ? `/${path}` : '';
        return `root${curPath}${endPath}`;
    }

    pwd() {
        return `257 "${this.buildPath().slice(4)==="" ? "/": this.buildPath().slice(4)}" is the current directory`;
    }

    cwd(path) {
        return new Promise((resolve, reject) => {
            exec(`cd ${this.buildPath(path)}`, err => {
                if (err) return reject('550 Failed to change directory.');
                this.path.push(path);
                return resolve('250 Directory successfully changed.');
            });
        });
    }

    cdup() {
        if (this.path.length > 0) {
            this.path.pop();
            return '250 Directory successfully changed.';
        }
        throw new Error('550 Failed to change directory.');
    }

    list(args = '') {
        return new Promise((resolve, reject) => {
            exec(`ls -l ${args} ${this.buildPath()}`, (err, stdout) => {
                if (err) return reject('550 Failed to retrieve directory listing.');
                return resolve(stdout.split('\n').slice(1).join('\n'));
            });
        });
    }

    mkd(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`mkdir ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly created.');
            });
        });
    }

    rnto(oldName, newName) {
        return new Promise((resolve, reject) => {
            exec(`mv ${this.buildPath(oldName)} ${this.buildPath(newName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly renamed.');
            });
        });
    }

    rmd(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`rm -rf ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly deleted.');
            });
        });
    }

    async retr(nodeName) {
        const nodePath = this.buildPath(nodeName);
        try {
            const node = await fs.lstat(nodePath);
            if (node.isFile()) {
                return await fs.readFile(nodePath);
            } else {
                throw new Error('550 Requested node must be a file');
            }
        } catch (error) {
            throw new Error('550 This file does not exist or is not accessible');
        }
    }

    async stor(nodeName, nodeBuffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.buildPath(nodeName), nodeBuffer, err => {
                if (err) return reject(err);
                console.log(nodeName, nodeBuffer)
                return resolve(true);
            });
        });
    }
}

/* TESTS */
// const f = new FileSystem();

// (async () => {
//     const test = await f.retr('image.png');
//     console.log(test)
//     const doIt = await f.stor('hello_test', test);
//     console.log(doIt)
// })();