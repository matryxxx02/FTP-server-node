import fs from 'fs/promises';
import { exec } from 'child_process';

export default class FileSystem {

    constructor() {
        this.path = [];
    }

    buildPath(path) {
        return `root/${this.path.join('/')}${path ? `/${path}` : ''}`;
    }

    pwd() {
        return `257 "${this.buildPath().slice(4)}" is the current directory`;
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

    mkd(dirname) {
        return new Promise((resolve, reject) => {
            exec(`mkdir ${this.buildPath(dirname)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Directory successfuly created.');
            });
        });
    }

    rmd(dirname) {
        return new Promise((resolve, reject) => {
            exec(`rm -rf ${this.buildPath(dirname)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Directory successfuly deleted.');
            });
        });
    }

    async retr(filename) {
        const filepath = this.buildPath(filename);
        try {
            await fs.stat(filepath);
            const data = await fs.readFile(filepath);
            return data;
        } catch (error) {
            throw new Error('550 This file does not exists or is not accessible');
        }
    }
}

/* TESTS */
// const f = new FileSystem();

// (async () => {
//     console.log(await f.mkd('test'))
// })();