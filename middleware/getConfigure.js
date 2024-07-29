let fs = require('fs')

// Get configure file
function getConfigure() {
     //Read configure file
     let configure = fs.readFileSync(__dirname + "/../config/configure.json", { encoding: "utf8", flag: "r" })
     return  JSON.parse(configure)
}

module.exports = getConfigure