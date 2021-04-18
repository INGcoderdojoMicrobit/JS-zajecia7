var express = require("express");
const { symlinkSync } = require("fs");
var app = express();
const path = require('path');
const router = express.Router();



router.get("/url", (req, res, next) => {
    res.json(["Tony","Lisa","Michael","Ginger","Food","Anna","Dala"]);
   });

router.get('/',function(req,res){
  let date_ob = new Date();

  // current date
  // adjust 0 before single digit date
  let date = ("0" + date_ob.getDate()).slice(-2);

  // current month
  let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

  // current year
  let year = date_ob.getFullYear();

  // current hours
  let hours = date_ob.getHours();

  // current minutes
  let minutes = date_ob.getMinutes();

  // current seconds
  let seconds = date_ob.getSeconds();

  console.log(`get/ -> wysyłam plik index.html ${year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds}`) 
  res.sendFile(path.join(__dirname+'/index.html'));
  //__dirname : It will resolve to your project folder.
});

app.use('/', router);

app.use(function(err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.listen(3000, () => {
    console.log("Server running on port 3000");
   });
   