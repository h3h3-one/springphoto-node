let fs = require('fs')
let configure = require('./getConfigure')

function isAuthorization(cookie) {
    // if cookie not found
    if (!cookie) {
        return false
    }

    // Read sessions from file
    let sessions = fs.readFileSync(configure().sessionsPath, { encoding: 'UTF-8', flag: 'r' })

    if (!sessions) {
        console.log(err)
        res.render("error", {
            message: err
        })
    }

    // Parse sessions
    let sessionsJSON = JSON.parse(sessions)
    let sessionsArray = sessionsJSON.sessions

    if (sessionsArray.length === 0) {
        return false
    }

    // Search my session
    for (let i = 0; i < sessionsArray.length; i++) {
        if(sessionsArray[i] === cookie){
            return true
        }
    }
    return false // If session is not found
}

module.exports = isAuthorization