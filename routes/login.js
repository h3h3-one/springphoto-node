let express = require('express')
let fs = require("fs")
const { v4: uuidv4 } = require('uuid')
let router = express.Router()
let configure = require('../middleware/getConfigure')

/* GET login page. */
router.get('/', function (req, res, next) {
    res.render('login')
});

// POST Authentication
router.post("/", function (req, res, next) {
    // Get client side login and password
    let loginClientSide = req.body.login
    let passwordClientSide = req.body.pwd

    // Read file to login and password
    fs.readFile(configure().pwdPath, (err, data) => {
        if (err) {
            console.log(err)
            res.render("error", { message: err })
            return
        }

        let sessionsJSON = JSON.parse(fs.readFileSync(configure().sessionsPath, { encoding: "utf8", flag: "r" }))
        let pwdJSON = JSON.parse(data.toString())
        // Get server side login, password
        let loginServerSide = pwdJSON.login
        let passwordServerSide = pwdJSON.password
        let sessionsServerSide = sessionsJSON.sessions

        // Authentication good
        if (loginClientSide === loginServerSide && passwordClientSide === passwordServerSide) {
            let uuid = uuidv4()
            // Adding new uuid
            sessionsServerSide.push(uuid)
            let sessionsSave = {
                sessions: sessionsServerSide
            }
            // Write new uuid
            fs.writeFileSync(configure().sessionsPath, JSON.stringify(sessionsSave))
            // Setting a cookie for the client
            res.cookie("uuid", uuid)
            res.send("good")
        }
        // Authentication bad
        else {
            res.send("bad")
        }
    })

})

module.exports = router;