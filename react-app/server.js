const express = require('express');
const app =express();
const multer = require('multer');
const cors = require('cors');


app.use(cors());


let storage = multer.diskStorage({
  destination : (req,file,cb)=>{
    cb(null,'public');
  },
  filename: (req,file,cb)=>{
      cb(null, Date.now() + '-' +file.originalname )
  }
})


var upload = multer({ storage: storage }).array('file')


app.post('/upload',function(req, res) {

    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
      return res.status(200).send(req.file)

    })

});


app.listen(8000, function() {

    console.log('App running on port 8000');

});
