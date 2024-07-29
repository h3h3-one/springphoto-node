let express = require('express');
let router = express.Router();
let fs = require('fs')

/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readdir(__dirname + '/../public/images/', (err, files) => {
    if (err) {
      console.log(err)
      res.render('error', { message: err })
      return
    }
    // Sorted and reverse albums array
    let albumsPreparation = files.sort().reverse()
    res.render('index', { albums: albumsPreparation });
  })
});

// POST Album delete
router.post('/delete-album', function (req, res, next) {
  try {
    if (isAuthor) {
      // Get album number
      let albumNumber = req.body.albumDelete

      // Recursive delete album
      // fs.rmdirSync(__dirname + '/../public/images/' + albumNumber, { recursive: true })
      fs.rmdir(__dirname + '/../public/images/' + albumNumber, { recursive: true }, (err) => { if (err) { console.log(err) } })

      res.send('good')
    } else {
      res.send('bad')
    }
  } catch (error) {
    console.log(error)
    res.send('bad')
  }
})

module.exports = router;
