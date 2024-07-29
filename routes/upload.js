let express = require('express');
let router = express.Router();
let fs = require('fs')

/* GET upload page. */
router.get('/', function (req, res, next) {
    res.render('upload');
})

router.post('/', function (req, res, next) {
    if (isAuthor) {
        if (!req.files) {
            res.send('File not found')
        }

        // Get cover and album image
        let cover = req.files.cover
        let album = req.files.album

        // Adding a cover and album
        fs.readdir(__dirname + '/../public/images', (err, files) => {
            if (err || files == undefined) {
                res.status(500).send('Images folder is not found')
            }

            // If there are no albums
            if (files.length == 0 && cover !== undefined && album !== undefined) {
                // Upload cover
                fs.mkdirSync(__dirname + '/../public/images/1')
                fs.mkdirSync(__dirname + '/../public/images/1/cover')
                cover.mv(__dirname + '/../public/images/1/cover/cover.jpg')
                // Upload album image
                if (Array.isArray(album)) {
                    for (let i = 0; i < album.length; i++) {
                        album[i].mv(__dirname + '/../public/images/1/' + (i + 1) + '.jpg')
                    }
                } else {
                    album.mv(__dirname + '/../public/images/1/1.jpg')
                }
            }

            // If there are one or more albums
            if (files.length > 0 && cover !== undefined && album !== undefined) {
                let maxAlbumNumber = Math.max(...files)
                let nextAlbumNumber = maxAlbumNumber + 1
                // Upload cover
                fs.mkdirSync(__dirname + '/../public/images/' + nextAlbumNumber)
                fs.mkdirSync(__dirname + '/../public/images/' + nextAlbumNumber + '/cover')
                cover.mv(__dirname + '/../public/images/' + nextAlbumNumber + '/cover/cover.jpg')

                if (Array.isArray(album)) {
                    // Upload album image
                    for (let i = 0; i < album.length; i++) {
                        album[i].mv(__dirname + '/../public/images/' + nextAlbumNumber + '/' + (i + 1) + '.jpg')
                    }
                } else {
                    album.mv(__dirname + '/../public/images/' + nextAlbumNumber + '/1.jpg')
                }
            }

            res.redirect('/')
        })
    } else {
        res.send('bad')
    }
})

module.exports = router;