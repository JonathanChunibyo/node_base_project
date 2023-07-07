const fs = require('fs');
const path = require('path');

const name = process.argv[2];
const structureRoute = [
    {
        path: path.join(`${path.dirname(__dirname)}/routes`, `${name}.route.js`),
        code: `
        var express = require('express');
        var router = express.Router();
        var middleware = require('${ `../middlewares/${name}.middleware.js` }')
        var controller = require('${ `../controllers/${name}.controller.js` }')
        
        /* GET home page. */
        router.get('/');
        
        module.exports = router;
        `
    },
    {
        path: path.join(`${path.dirname(__dirname)}/middlewares`, `${name}.middleware.js`),
        code: `
        module.exports = {
        }
        `
    },
    {
        path: path.join(`${path.dirname(__dirname)}/controllers`, `${name}.controller.js`),
        code: `
        module.exports = {
        }
        `
    }
];

structureRoute.forEach(({path, code}) => {
    fs.writeFile(path, code, (err) => {
        if (err) {
          console.error(`error when generating route {{${name}}}:`, err);
        } else {
          console.log(`path generated with file name {{${name}}} in the path {{${path}}}`);
        }
      });
});
