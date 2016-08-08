/*const path = require('path');
const Runner = require('jscodeshift/dist/Runner');


const options = {
    transform: './t3.js',
    dry: true,
    print: true,
    path: ['./src'],
    verbose: 0,
    babel: true,
    extension: 'js',
    runInBand: true,
    silent: false,
    parse: 'babel'
};

const transformFilePath = path.resolve(options.transform);
// const srcPath = path.resolve(options.path);



Runner.run(transformFilePath, options.path, options);
*/
const path = require('path');
const transformFile = path.resolve('./t3.js');
const args = [transformFile, 'babel'];

const workers = [];
workers.push(require('jscodeshift/dist/Worker')(args));

workers.map(child => {
          child.send({files: next(), options});
          child.on('message', message => {
            switch (message.action) {
              case 'status':
                fileCounters[message.status] += 1;
                log[message.status](lineBreak(message.msg), options.verbose);
                break;
              case 'update':
                if (!statsCounter[message.name]) {
                  statsCounter[message.name] = 0;
                }
                statsCounter[message.name] += message.quantity;
                break;
              case 'free':
                child.send({files: next(), options});
                break;
            }
          });
          return new Promise(resolve => child.on('disconnect', resolve));
        });
    
