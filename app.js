const fs = require('fs');

/**
 * checking if we got a filename and a separator on the command line
 */
if (process.argv.length < 3 && process.argv.length > 4) {
    console.log('Usage: node app.js FILENAME SEPARATOR');
    process.exit(1);
}

const file = process.argv[2];
let separator = process.argv[3];

/**
 * solution for a whitespace separator
 */
if (separator === undefined) {
    separator = ' ';
}

/**
 * reading the file's data
 */
fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;

    /**
     * transforming data into an array
     */
    const array = data.split(separator).map(i => i);

    /**
    * writing the transformed data into a file
    */
    const stream = fs.createWriteStream('new_list.txt');

    stream.once('open', () => {
        array.forEach(e => {
            stream.write(`${e} \n`);
        });
        stream.end();
        console.log('job done');
    });
});