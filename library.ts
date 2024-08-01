import inquirer from 'inquirer';
import chalk from 'chalk';

//-----------LIBRARY MANAGEMENT SYSTEM---------------

class Book {
    title: string;
    author: string;
    ISBN: string;
    copies: number;

    constructor(title: string, author: string, ISBN: string, copies: number) {
        this.title = title;
        this.author = author;
        this.ISBN = ISBN;
        this.copies = copies;
    }
}

// Common book choices
const bookChoices = [
    "Don Quixote", 
    "Pride and Prejudice", 
    "The Great Gatsby", 
    "The Hobbit", 
    "Hamlet"
];

// Main menu
async function mainMenu() {
    const answer = await inquirer.prompt([
        {
            type: 'list',
            name: 'action',
            message: 'Choose an action:',
            choices: ['Add Book📗', 'Remove Book📕', 'Add Member🙍', 'Remove Member🙍', 'Borrow Book📚', 'Return Book📚', 'Exit'],
        }
    ]);

    switch(answer.action) {
        case 'Add Book📗':
            await manageBook('Add');
            break;
        
        case 'Remove Book📕':
            await manageBook('Remove');
            break;

        case 'Add Member🙍':
            await manageMember('add');
            break;

        case 'Remove Member🙍':
            await manageMember('remove');
            break;

        case 'Borrow Book📚':
            await manageBookAction('borrow');
            break;

        case 'Return Book📚':
            await manageBookAction('return');
            break;

        case 'Exit':
            console.log(chalk.green("Goodbye!!👋"));
            process.exit();
    }

    mainMenu();
}

// Manage book addition/removal
async function manageBook(action: 'Add' | 'Remove') {
    const answer = await inquirer.prompt([
        {
            name: "actions",
            type: "list",
            message: `Select the book you want to ${action.toLowerCase()}`,
            choices: bookChoices,
        },
    ]);
    console.log(`Your book ${action.toLowerCase()}ed: ${answer.actions}`);
    console.log(chalk.green(`Book ${action.toLowerCase()}ed successfully!!📚`));
}

// Manage member addition/removal
async function manageMember(action: 'add' | 'remove') {
    if (action === 'add') {
        const answer = await inquirer.prompt([
            { type: 'input', name: 'name', message: 'Enter member name📝' },
            { type: 'input', name: 'ID', message: 'Enter member ID📝' },
        ]);

        console.log(`Added Successfully Name: ${answer.name}`);
        console.log(chalk.green('Member added successfully!!🙍'));
    } else {
        const answer = await inquirer.prompt([
            { type: 'input', name: 'ID', message: 'Enter member ID to remove' },
        ]);

        console.log(`Member with ID ${answer.ID} removed successfully`);
        console.log(chalk.green("Member ID removed successfully!!➡"));
    }
}

// Manage book borrowing/returning
async function manageBookAction(action: 'borrow' | 'return') {
    const answer = await inquirer.prompt([
        {
            name: "action",
            type: "list",
            message: `Select the book you want to ${action.toLowerCase()}`,
            choices: bookChoices,
        },
    ]);
    console.log(`Your book ${action.toLowerCase()}ed: ${answer.action}`);
    console.log(chalk.green(`Book ${action}ed successfully!!📚`));
}

// Start the program
mainMenu();
