import FileSystem from '../modules/FileSystem.js'
import chai from 'chai'

const expect = chai.expect;

describe('test file system commands', () => {
    const fs = new FileSystem()
    let buffer;

    it('PWD', () => {
        const path = fs.pwd()
        return expect(path).to.equal('257 "/" is the current directory.');
    });

    it('CWD', () => {
        return fs.cwd("/pleaseDontDelete").then((path) => {
            expect(path).to.equal('250 Directory successfully changed.');
        })
    });

    it('LIST', () => {
        return fs.list().then((ls) => {
            expect(ls).to.equal('-rw-r--r--  1 nicolasfernandes  staff  0  7 mar 17:40 test.txt\n');
        });
    });

    it('CDUP', () => {
        const path = fs.cdup()
        return expect(path).to.equal('250 Directory successfully changed.');
    });

    it('MKD', () => {
        return fs.mkd('testDirectory').then((mkd) => {
            expect(mkd).to.equal('250 Successfuly created.');
        });
    });

    it('RNFR and RNTO', () => {
        fs.rnfr("testDirectory");
        return fs.rnto('testDir').then((res) => {
            expect(res).to.equal('250 Successfuly renamed.');
        });
    });

    it('RETR', async () => {
        buffer = await fs.retr('alice')
        return expect(buffer).to.be.instanceof(Buffer)
    });

    it('RMD', () => {
        return fs.rmd('testDir').then((rmd) => {
            expect(rmd).to.equal('250 Successfuly deleted.');
        });
    });

    it('STOR', async () => {
        await fs.cwd("/pleaseDontDelete")
        return fs.stor('aliceTest', buffer).then((res) => {
            fs.rmd('aliceTest')
            return expect(res).to.equal(true);
        })
    });

});
