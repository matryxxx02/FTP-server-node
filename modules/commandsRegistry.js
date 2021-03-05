import fs from 'fs/promises';

let registry;

try {
    const files = await fs.readdir('commands');
    const modules = new Map(await Promise.all(files.map(async filename => {
        const mod = await import(`../commands/${filename}`);
        return [filename.split('.')[0], mod.default];
    })));
    registry = Object.fromEntries(modules);
    
} catch (error) {
    console.error(error);
}

export default registry;