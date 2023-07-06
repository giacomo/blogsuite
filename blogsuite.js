// this file contains the javascript cli functions for the blog suite
// command line interface
const availableCommands = [
    {
        name: 'help',
        description: 'displays this help message',
        usage: 'help'
    },
    {
        name: 'create',
        description: 'creates a new blog article',
        usage: 'create'
    },
    {
        name: 'list',
        description: 'lists all blog articles',
        usage: 'list'
    },
    {
        name: 'delete',
        description: 'deletes one blog article',
        usage: 'delete'
    },
    {
        name: 'generate-list',
        description: 'generates a list of all blog articles',
        usage: 'generate-list'
    }
];

const help = () => {
    console.log('Available commands:');
    availableCommands.forEach((command) => {
        console.log(`${command.name}: ${command.description}`);
        console.log(`Usage: ${command.usage}`);
    });
};

const create = () => {
    console.log(`Creating blog article:`);
    const date = new Date();
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();

    // add a 0 in front of the month and day if they are smaller than 10
    if (month < 10) {
        month = `0${month}`;
    }

    if (day < 10) {
        day = `0${day}`;
    }

    // get the title of the blog article
    const readline = require('readline-sync');
    const title = readline.question('Enter the title of the blog article: ');

    // read the short description of the blog article
    const description = readline.question('Enter a short description of the blog article: ');

    // convert the title to lowercase and replace spaces with undescores
    const fileTitle = title.toLowerCase().replace(/ /g, '_');
    const fileName = `${day}-${month}-${year}-${fileTitle}.md`;

    const fs = require('fs');
    const path = require('path');
    const filePath = path.join(__dirname, 'src/assets/articles', fileName);

    const fileContent =
        `Title: ${title}` + '\n' +
        `Description: ${description}` + '\n' +
        `Date: ${day}-${month}-${year}` + '\n' +
        `Author: Not specified` + '\n' +
        `---` + '\n' +
        `Change this content to your liking` + '\n';

    fs.writeFile(filePath, fileContent, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Successfully created file: ${fileName}`);

        // check if the user wants to update the list.json file
        const updateList = readline.question('Do you want to update the list.json file? (y/n): ');
        if (updateList === 'y') {
            generateList();
        }
    });
};

const list = () => {
    console.log('Listing all blog articles:');
    const fs = require('fs');
    const path = require('path');
    const articlesPath = path.join(__dirname, 'src/assets/articles');
    const files = fs.readdirSync(articlesPath);

    // exclude the list.json file
    files.splice(files.indexOf('list.json'), 1);

    files.forEach((file) => {
        console.log(file);
    });
};


const deleteArticle = () => {
    console.log(`Choose blog article to delete:`);
    const fs = require('fs');
    const path = require('path');
    const articlesPath = path.join(__dirname, 'src/assets/articles');
    const files = fs.readdirSync(articlesPath);

    // exclude the list.json file
    files.splice(files.indexOf('list.json'), 1);

    // display all files with their index
    files.forEach((file, index) => {
        console.log(`${index}: ${file}`);
    });

    // get the id of the file to delete
    const readline = require('readline-sync');
    const id = readline.question('Enter the id of the file to delete: ');

    // delete the file with the given id
    const fileToDelete = files[id];
    const filePath = path.join(articlesPath, fileToDelete);
    fs.unlink(filePath, (err) => {
        if (err) {
            console.log(err);
        }
        console.log(`Successfully deleted file: ${fileToDelete}`);
    });
};

const generateList = () => {
    console.log('Generating list of all blog articles:');
    const fs = require('fs');
    const path = require('path');
    const articlesPath = path.join(__dirname, 'src/assets/articles');
    const files = fs.readdirSync(articlesPath);
    files.splice(files.indexOf('list.json'), 1);

    const listPath = path.join(__dirname, 'src/assets/articles/list.json');
    const list = [];
    files.forEach((file) => {
        // open the file and read the title and 120 first characters of the content
        const filePath = path.join(articlesPath, file);
        const fileContent = fs.readFileSync(filePath, 'utf8');
        const title = fileContent.split('\n')[0].split(':')[1].trim();
        const description = fileContent.split('\n')[1].split(':')[1].trim();
        list.push({
            title,
            description,
            slug: file.replace('.md', '')
        });
    });

    // write the list to the list.json file
    fs.writeFile(listPath, JSON.stringify(list, null, 2), (err) => {
        if (err) {
            console.log(err);
        }
        console.log('Successfully generated list');
    });
};

const command = process.argv[2];
switch (command) {
    case 'help':
        help();
        break;
    case 'create':
        create();
        break;
    case 'list':
        list();
        break;
    case 'delete':
        deleteArticle();
        break;
    case 'generate-list':
        generateList();
        break;
    default:
        console.log(`Unknown command: ${command} please use the help command to see all available commands`);
        break;
}
