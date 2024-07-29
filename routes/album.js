let express = require('express')
let router = express.Router()
let fs = require('fs')

router.get('/:id', function (req, res, next) {
    //Get id album
    let idAlbum = req.params.id

    fs.readdir(__dirname + '/../public/images', (err, files) => {
        if (err) {
            console.log(err)
            res.render('error', { message: err })
            return
        }

        let albumsArray = files

        // If albums undefined
        if (albumsArray === undefined) {
            res.render('error', { message: 'Album not found' })
            return
        }

        // If albums not found
        let isEmptyAlbum = false
        for (let i = 0; i < albumsArray.length; i++) {
            if (idAlbum === albumsArray[i]) {
                isEmptyAlbum = true
            }
        }

        // If albums dont empty elements 
        if (albumsArray === [] || isEmptyAlbum === false) {
            res.render('error', { message: 'Album not found' })
        }

        // Get album elements
        fs.readdir(__dirname + '/../public/images/' + idAlbum, (err, files) => {
            if (err) {
                console.log(err)
                res.render('error', { message: err })
                return
            }

            // Delete folder "cover" in array
            let albumArray = files.filter((elem) => {
                return elem !== 'cover'
            })
            res.render('album', { idAlbum: idAlbum, albums: albumArray })
        })

    })
})

module.exports = router