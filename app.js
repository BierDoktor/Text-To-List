const fs = require('fs');
const args = require('minimist')(process.argv.slice(2));

/**
 * checking if we got a filename and a separator on the command line
 */
if (args.file === undefined) {
    console.log('Usage: node app.js --file filename --separator separator --duplicates boolean');
    process.exit(1);
}

const file = args.file;
let separator = args.separator;
let keepDuplicates = true;

/**
 * solution for a whitespace separator
 */
if (separator === undefined) {
    separator = ' ';
}

/**
 * allowing to remove duplicates if wanted
 */
if (args.duplicates === 'false') {
    keepDuplicates = false;
}

/**
 * reading the file's data
 */
fs.readFile(file, 'utf8', (err, data) => {
    if (err) throw err;

    /**
     * transforming data into an array
     */
    let array = data.split(separator).map(i => i);

    /**
     * removing duplicates
     */
    if (!keepDuplicates) {
        let unique = {};

        array.forEach((i) => {
            /**
             * removing line breaks
             */
            i = i.replace('\n', '');

            /**
             * make sure to ignore case
             */
            i = i.toLowerCase();

            if (!unique[i]) {
                unique[i] = true;
            }
        });
        array = Object.keys(unique);
    }

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