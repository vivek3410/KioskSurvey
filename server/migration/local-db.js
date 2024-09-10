const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Define your MongoDB URIs and dump paths
const stagingMongoURI = 'mongodb+srv://mamidivivek3410:1iUQA2449snpKD3h@cluster0.oya4m.mongodb.net/';
const localMongoURI = 'mongodb://127.0.0.1:27017/survey';
const dumpPath = path.join(__dirname, 'mongo_dump');

// Function to execute shell commands
const runCommand = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout, stderr) => {
            if (error) {
                reject(`Error: ${stderr}`);
            } else {
                resolve(stdout);
            }
        });
    });
};

// Function to delete the dump directory
const deleteDumpDirectory = (directoryPath) => {
    return new Promise((resolve, reject) => {
        fs.rm(directoryPath, { recursive: true, force: true }, (error) => {
            if (error) {
                reject(`Error deleting dump directory: ${error}`);
            } else {
                resolve();
            }
        });
    });
};

const dumpDatabase = async () => {
    try {
        console.log('Starting database dump from staging...');
        // Step 1: Export data from staging MongoDB
        const dumpCommand = `mongodump --uri="${stagingMongoURI}" --out="${dumpPath}"`;
        await runCommand(dumpCommand);
        console.log('Database dump completed.');

        console.log('Cleaning previous data from local MongoDB...');
        // Step 2: Drop the local database
        const dropCommand = `mongosh ${localMongoURI} --eval "db.dropDatabase()"`;
        await runCommand(dropCommand);
        console.log('Previous data cleaned from local MongoDB.');

        console.log('Starting database import to local MongoDB...');
        // Step 3: Import data to local MongoDB
        const restoreCommand = `mongorestore --uri="${localMongoURI}" --nsInclude=survey.* "${dumpPath}/test"`;
        console.log(restoreCommand);
        await runCommand(restoreCommand);
        console.log('Database import completed.');

        console.log('Deleting dump directory...');
        // Step 4: Delete the dump directory
        // await deleteDumpDirectory(dumpPath);
        console.log('Dump directory deleted.');
    } catch (error) {
        console.error(error);
    }
};

// Execute the database dump and import process
dumpDatabase();
