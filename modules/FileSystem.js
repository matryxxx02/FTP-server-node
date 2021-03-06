import fs from 'fs/promises';
import { exec } from 'child_process';

/**
 * Creates a new File System manager
 * @class
 */
export default class FileSystem {

    constructor() {
        this.root = process.env.HOME_DIR || "root";
        this.path = [];
        this.nodeName = "";
    }

    /**
     * Returns a formatted local path including the new provided one
     * @private
     * @param {string} path 
     * @returns {string} Local path
     */
    buildPath(path) {
        const curPath = this.path.length > 0 ? `/${this.path.join('/')}` : '';
        const endPath = path ? `/${path}` : '';
        return `${this.root}${curPath}${endPath}`;
    }

    /**
     * Returns the current working directory
     * @returns {string} Result FTP code and message
     */
    pwd() {
        const path = this.buildPath().slice(4);
        return `257 "${path ? path : '/'}" is the current directory`;
    }

    /**
     * Changes the current working directory
     * @param {string} path 
     * @returns {string} Result FTP code and message
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
     * Changes to parent directory
     * @returns {string} Result FTP code and message
     */
    cdup() {
        if (this.path.length > 0) {
            this.path.pop();
            return '250 Directory successfully changed.';
        }
        throw new Error('550 Failed to change directory.');
    }

    /**
     * Returns information of a file or directory if specified, 
     * else information of the current working directory is returned
     * @param {string} args Any generic linux ls arguments
     * @returns {string} List result or FTP error code and message
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
     * Creates a new directory
     * @param {string} nodeName 
     * @returns {string} Result FTP code and message
     */
    mkd(nodeName) {
        return new Promise((resolve, reject) => {
            exec(`mkdir ${this.buildPath(nodeName)}`, err => {
                if (err) return reject('550 Permission denied.');
                return resolve('250 Successfuly created.');
            });
        });
    }

    /**
     * Saves node name to rename in memory
     * rnto() should be called right after
     * @param {String} nodeName 
     */
    rnfr(nodeName) {
        this.nodeName = nodeName;
    }

    /**
     * Renames corresponding node according to previous rnfr() call
     * @param {string} nodeName 
     * @returns {string} Result FTP code and message
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
     * Removes a node
     * @param {string} nodeName 
     * @returns {string} Result FTP code and message
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
     * Retrieves a node
     * @param {string} nodeName 
     * @returns {buffer|string} Node buffer or FTP error code and message
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
     * Stores a new node
     * @param {string} nodeName 
     * @param {buffer} nodeBuffer 
     * @returns {boolean}  
     */
    async stor(nodeName, nodeBuffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(this.buildPath(nodeName), nodeBuffer, err => {
                if (err) return reject(err);
                return resolve(true);
            });
        });
    }
}