import { cdup } from '../commands/cdup.js'
import { list } from '../commands/list.js'
import { mkd } from '../commands/mkd.js'
import { pasv } from '../commands/pasv.js'
import { pwd } from '../commands/pwd.js'
import { retr } from '../commands/retr.js'
import { rmd } from '../commands/rmd.js'

const registry = {
    cdup,
    list,
    mkd,
    pasv,
    pwd,
    retr,
    rmd
}

export default registry; 
