import FileSystem from '../modules/FileSystem.js'
import chai from 'chai'

const expect = chai.expect;

describe('test file system commands', () => {
    const fs = new FileSystem()
    
    it('CWD', () => {
        return fs.cwd().then((path) => {
            expect(path).to.equal('250 Directory successfully changed.');
        })
    });

    it('PWD', () => {
        const path = fs.pwd()
        console.log(path)
        return expect(path).to.equal('257 "/" is the current directory.');
    });

    it('CDUP', () => {
        const path = fs.cdup()
        console.log(path)
        return expect(path).to.equal('250 Directory successfully changed.');
    });

    it('LIST', () => {
        return fs.list().then((ls) => {
            console.log(ls)
            expect(ls).to.equal('250 Directory successfully changed.');
        });
    });

    it('MKD', () => {
        return fs.mkd('testDirectory').then((mkd) => {
            console.log(mkd)
            expect(mkd).to.equal('250 Successfuly created.');
        });
    });

    it('RNFR and RNTO', () => {
        fs.rnfr("testDirectory");
        return fs.rnto('testDir').then((res) => {
            console.log(res)
            expect(res).to.equal('250 Successfuly renamed.');
        });
    });

    it('RMD', () => {
        return fs.rmd('testDir').then((rmd) => {
            console.log(rmd)
            expect(rmd).to.equal('250 Successfuly deleted.');
        });
    });

    it('RETR', () => {
        const path = fs.pwd()
        console.log(path)
        return expect(path).to.equal('');
    });

    it('STOR', () => {
        return fs.stor('testDir').then((rmd) => {
            console.log(rmd)
            expect(rmd).to.equal('');
        });
    });

});
