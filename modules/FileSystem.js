import fs from 'fs/promises';
import { exec } from 'child_process';

export default class FileSystem {

    constructor() {
        this.path = [];
        this.nodeName = "";
    }

    /**
     * 
     * @param {*} path 
     * @returns 
     */
    buildPath(path) {
        const curPath = this.path.length > 0 ? `/${this.path.join('/')}` : '';
        const endPath = path ? `/${path}` : '';
        return `root${curPath}${endPath}`;
    }

    /**
     * 
     * @returns 
     */
    pwd() {
        const path = this.buildPath().slice(4);
        return `257 "${path ? path : '/'}" is the current directory`;
    }

    /**
     * 
     * @param {*} path 
     * @returns 
     */
    cwd(path) {
        return new Promise((resolve, reject) => {
            exec(`cd ${this.buildPath(path)}`, err => {
                if (err) return reject('550 Failed to change directory.');
                this.path.push(path);
                return resolve('250 Directory successfully changed.');
            });
        });
    }

    /**
     * 
     * @returns 
     */
    cdup() {
        if (this.path.length > 0) {
            this.path.pop();
            return '250 Directory successfully changed.';
        }
        throw new Error('550 Failed to change directory.');
    }

    /**
     * 
     * @param {*} args 
     * @returns 
     */
    list(args = '') {
        return new Promise((resolve, reject) => {
            exec(`ls -l ${args} ${this.buildPath()}`, (err, stdout) => {
                if (err) return reject('550 Failed to retrieve directory listing.');
                const ls = stdout.split('\n').slice(1).join('\n');
                return resolve(ls.normalize('NFD').replace(/[\u0300-\u036f]/g, ""));
            });
        });
    }

    /**
     * 
     * @param {*} nodeName 
     * @returns 
     */
    mkd(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`mkdir ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly created.');
            });
        });
    }

    rnfr(nodeName) {
        this.nodeName = nodeName;
    }

    /**
     * 
     * @param {*} oldName 
     * @param {*} newName 
     * @returns 
     */
    rnto(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`mv ${this.buildPath(this.nodeName)} ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                this.nodeName = '';
                return resolve('250 Successfuly renamed.');
            });
        });
    }

    /**
     * 
     * @param {*} nodeName 
     * @returns 
     */
    rmd(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`rm -rf ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly deleted.');
            });
        });
    }

    /**
     * 
     * @param {*} nodeName 
     * @returns 
     */
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

    /**
     * 
     * @param {*} nodeName 
     * @param {*} nodeBuffer 
     * @returns 
     */
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