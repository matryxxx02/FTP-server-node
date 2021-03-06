# 💻 Serveur FTP • Nicolas Fernandes & Mickael Gomez • 23/02/2021

Serveur FTP en [Node.js](https://nodejs.org).

[Voici une vidéo résumant les fonctionnalités principales du Serveur](https://youtu.be/OSJTLXp5hAc)

## Architecture

Voici l'architecture du projet :
![architecture-projet](./archi-project.png)

### Classes

**Server** représente le serveur principal qui va se charger de gérer toutes les connections FTP :

![](https://cdn.discordapp.com/attachments/437349025663025154/817808310942171156/4b7a7f7d-dee7-4d41-b77e-e29be39dfe44.png)

**ConnectionFTP** enregistre l'état de chaque connection et instancie un handler de commandes :

![](https://cdn.discordapp.com/attachments/437349025663025154/817808802731786260/448db561-3f07-4d22-aac7-f5e314e63be6.png)

**CommandsFTP** se charge de gérer le flow d'exécution des commandes reçues et de vérifier leur validité :

![](https://cdn.discordapp.com/attachments/437349025663025154/817809260934463518/a059f506-d0bc-4fff-8ad8-89c11919a753.png)

**Passive** dans `/connectorType` permet d'instancier un nouveau channel de communication en mode passif :

![](https://cdn.discordapp.com/attachments/437349025663025154/817809662693998592/cfc25151-a5a7-4933-bb26-9d768ee630e8.png)

**FileSystem** s'occupe de gérer toutes les interractions avec le système de fichiers, que ce soit l'ajout, la suppression et la modification de noeuds, ou encore le déplacement du client dans la hiérarchie :

![](https://cdn.discordapp.com/attachments/437349025663025154/817807490464350218/1516c85f-4448-419d-81c3-462668474a6c.png)

### Gestion d'erreurs

Pour toutes les classes, la gestion des erreurs se fait simplement par try/catch, étant donné que les promesses sont gérées dans des fonctions asynchrones, utilisant async/await :

![](https://cdn.discordapp.com/attachments/437349025663025154/817806933708242964/224fd5e2-4b9e-4258-b3ba-a5cd56907234.png)

## Code Samples

```js
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
```
Voici le module commandsRegistry qui permet de créer un objet registry qui contient toutes les implémentations des commandes du repertoires commands.
Grâce à ce bout de code, pour ajouter une nouvelle commande, il suffit d'ajouter un fichier avec la même structure que les autres commandes.<br>

Voici la structure d'une commande :<br>
- commandName : représente le nom de la commande FTP.
- handler : c'est la fonction qui contient le code de la commande pour pouvoir l'executer. 

```js
export default {
    commandName: 'LIST',
    handler: async ({ socket, message, fs, commands}, write) => {
        let res;
        try {
            res = await fs.list(message);
        } catch (error) {
            res = error;
        }

        socket.write(`150 Here comes the directory listing.\r\n`);
        await commands.connector.dataSocket.write(res);
        await commands.connector.destroyDataSocket();
        await write(socket, "226 Transfer complete.");
    }
}
```

## Installation & Exécution

Avant d'éxécuter le serveur veuillez renseigner le port (21 par défaut) et le répertoire racine du serveur FTP
Exécuter la commande suivante permet d'installer toutes les dépences nécessaires :

```bash
npm install
```

Puis pour lancer le serveur :

```bash
npm run start
```

## Documentation

La documentation est disponible dans ```/doc``` et couvre l'essentiel du fonctionnement de l'application.